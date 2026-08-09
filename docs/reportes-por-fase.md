# Fleximy Rework — Reportes por fase

Rama de trabajo: `rework/fleximy-website-v2`
Fuentes: `fleximy-rework-md/26-PLAN-DE-IMPLEMENTACION.md` y documentos de diseño.
Fecha de inicio: 2026-08-08.

---

## Reporte — Fase 0: Seguridad

**Estado:** Completada · **Commit:** `9ca961c` · **Criterio de cierre:** no quedan secretos nuevos en el diff ✔

### Qué se hizo

1. **Rama de rework creada:** `rework/fleximy-website-v2` desde `main`. El rework vive fuera de `main`.
2. **`.env` retirado del seguimiento:** se confirmó que `.env` estaba versionado en Git
   (`git rm --cached .env`). El archivo permanece en disco y queda ignorado por `.gitignore`.
3. **`.env.example` creado:** documenta las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
   sin valores reales.
4. **`.gitignore` verificado y ajustado:** `.env` y `.env.*` quedan ignorados; se agregó
   `!.env.example` para que el ejemplo sí se versionee.
5. **Rotación de credenciales documentada:** ver `docs/seguridad-rotacion-credenciales.md`.
6. **Historial intacto:** no se reescribió el historial; se requiere aprobación explícita del
   cliente para purgarlo.

### Validación

- `npm run build` → OK (1,2 MB bundle único; advertencia de chunk >500 kB).
- `npm run lint` → sin errores; solo warnings preexistentes.
- `git ls-files` → `.env` ya no figura.

### Hallazgos

- El repo es público (`github.com/theivamm/fleximy2025`) y el `.env` estuvo versionado en `main`.
  Los secretos permanecen en el historial de Git.

### Pendientes de esta fase (acción humana)

- [ ] Rotar `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` en Supabase y Netlify.
- [ ] Decidir y ejecutar purga de historial (`git filter-repo`) con aprobación.
- [ ] Configurar variables reales en Netlify (nunca en el repo).

---

## Reporte — Fase 1: Auditoría y limpieza

**Estado:** Completada · **Commit:** `82a6702` · **Criterio de cierre:** plan de conservación,
refactor y eliminación documentado ✔

### Qué se hizo

Auditoría completa del repositorio y documentación del plan en `docs/auditoria-fase-1.md`.

### 1. Mapa de rutas

**Actuales (públicas):** `/` Home, `/services`, `/why-us`, `/gastronomia`, `/gestion-pymes`,
`/turnos`, `/demos`, `/precios`, `/nosotros`, `/blog`, `/contact`.

**Dashboard (a aislar):** `/login`, `/dashboard`, `/dashboard/ai-images`,
`/dashboard/crear-imagen`, `/dashboard/mis-disenos`.

**Problemas:** no existe 404 ni wildcard; todas las páginas importadas estáticamente en
`App.jsx` (bundle único de 1.2 MB); `GlobalCTA` y `BackgroundOrbs` se montan en todas las
rutas públicas.

**Rutas nuevas previstas:** `/soluciones` + 7 industrias, `/como-funciona`,
`/preguntas-frecuentes`, `/seguridad`, `/recursos`, `/casos-de-uso`, `/privacidad`,
`/terminos`, `/gracias-diagnostico`, `/404`.

### 2. Inventario de componentes

**En uso (conservar o refactorizar):** Navbar, Footer, GlobalCTA, InteractiveBackground,
GlassCard, BackgroundOrbs, IndustryCards, ComparisonTable, ProcessSteps, ModuleShowcase,
ManifestoBanner, SectionWrapper, FAQ, WhyUsProcess, WhyUsStats, Button, BlogCard,
CostBreakdown, PlanAllInOne, PlanGastronomico, PlanTurnos, PlanGestionPymes,
PilaresGastronomia/Turnos/GestionPymes, GarantiasGastronomia/Turnos/GestionPymes,
FaqGastronomia/Turnos/GestionPymes, SimuladorGastronomia/Turnos/GestionPymes.

**Dashboard (conservar, aislar):** DashboardLayout (usa AuthContext y supabase).

**Sin uso (eliminar):** CapabilitiesGrid, EcosystemTabs, FinalCTA, PricingCards, StatsCounter,
TestimonialsCarousel, ParticlesBackground.

**Con deuda de lint:** 15+ archivos con imports sin uso y dependencias de hooks.

### 3. Inventario de dependencias

| Paquete | Uso real | Acción |
|---|---|---|
| react, react-dom, react-router-dom | Sí | Conservar |
| @supabase/supabase-js | Dashboard | Conservar; lazy en público |
| tailwind v4 + @tailwindcss/vite | Sí | Conservar |
| gsap | ComparisonTable, EcosystemTabs, ProcessSteps | Conservar; centralizar |
| framer-motion | 50+ archivos | Conservar; limitar uso |
| lucide-react | 22+ archivos | Conservar |
| react-dropzone | CrearImagen (dashboard) | Conservar |
| html-to-image | **Sin uso en `src`** | **Eliminar** |
| vite, oxlint, plugins, types | Build | Conservar |

### 4. Código del starter a eliminar

- `README.md` genérico de React + Vite → reemplazar con documentación del proyecto.
- `src/assets/react.svg`, `src/assets/vite.svg` → sin uso.
- `src/App.css` → no importado (solo se usa `index.css`).
- `index.html` → título en inglés, `lang="en"`, sin meta description/OG/canonical.

### 5. Componentes exclusivos del dashboard

`DashboardLayout`, `Login`, `DashboardHome`, `AiImages`, `CrearImagen`, `MisDisenos`
dependen de `AuthContext` y `supabase`. Estrategia: subárbol `src/pages/dashboard/` con
lazy loading para que Supabase no cargue en páginas públicas.

### 6. Revisión de Netlify

`netlify.toml` OK (build, publish `dist`, fallback SPA, headers y caché básicos).
Pendiente: CSP, HSTS, Permissions-Policy, headers por tipo de documento, deploy previews.

### 7. Revisión de SEO actual

Title único global en inglés; sin description, canonical, OG, schema, sitemap, robots ni
404 real (fallback SPA responde 200). `lang="en"` cuando el sitio debe ser `es`.
`translations.js` con contenido en inglés y texto corrupto (encoding roto).

### 8. Plan de conservación, refactor y eliminación

**Conservar:** AuthContext, supabase.js, dashboard completo, react-dropzone, logo-fleximy.svg,
assets de hero, `sql/`, base de netlify.toml, lógica de simuladores.

**Refactorizar (Fases 2–6):** App.jsx (público/dashboard + lazy + 404), tokens/CSS (paleta
tinta/papel + `#c8ff3d` y `#52d6d1`), Navbar/Footer/GlobalCTA/Button/SectionWrapper,
translations.js (solo español), rutas de soluciones (renombrar + 4 industrias nuevas),
Contact → diagnóstico multipaso + `/gracias-diagnostico`, SEO completo.

**Eliminar:** html-to-image, react.svg, vite.svg, App.css, 7 componentes sin uso, contenido
en inglés de translations.js, README del starter.

**Prohibido:** borrar componentes del dashboard sin revisar imports; publicar métricas no
verificadas (50+, 99.9%, 40%, 3x) ni testimonios ficticios; tocar `main`.

### Validación

- `npm run build` → OK.
- `npm run lint` → sin errores; solo warnings preexistentes.

---

## Reporte — Fase 2: Sistema global

**Estado:** Completada · **Commit:** `55e7f49` · **Criterio de cierre:** componentes globales
utilizables en desktop y mobile ✔

### Qué se hizo

1. **Tokens (`src/styles/tokens.css`):** paleta "minimalismo operativo" — ink `#151714`, paper
   `#f4f3ee`, paper-bright `#fafaf7`, acento lima `#c8ff3d`, cyan `#52d6d1`, líneas, sombras,
   radios, anchos máximos y duraciones de motion. Acentos por industria (gastro ámbar, turnos
   cian, gestión menta, comercio violeta, inmobiliarias coral, educación azul, talleres naranja).
2. **Tipografía y retícula (`src/styles/global.css`):** escala fluida con `clamp()` (hero, h1–h4,
   lead, body, small, micro), `container-site`/`container-narrow` (max 1280/960), `.measure`,
   `.kicker`, color-scheme y `prefers-reduced-motion` global.
3. **Button system (`ui/Button.jsx`):** variantes primary (lima/ink), secondary (outline),
   dark (ink), text; tamaños sm/md/lg con altura mínima 44 px; renderiza `Link`/`a`/`button`.
4. **Section header (`ui/SectionHeader.jsx`):** kicker + índice + titular editorial + descripción,
   con alineación configurable.
5. **Datos (`data/navigation.js`, `data/industries.js`):** 7 industrias con URLs finales
   `/soluciones/*` y navegación principal/secundaria/legal.
6. **Header (`navigation/Header.jsx`):** fijo, sólido al scroll, mega menú de Soluciones con vista
   previa (7 industrias + enlace al hub), CTA persistente, menú mobile accesible (Escape, aria,
   bloqueo de scroll, cierre en navegación).
7. **Footer (`Footer.jsx`):** propuesta resumida, navegación completa, soluciones, legal y contacto
   sobre fondo ink.
8. **Route loading:** `React.lazy` + `Suspense` con `RouteFallback` en todas las rutas; bundle
   principal bajó de 1,2 MB a ~575 KB con code splitting por página.
9. **404 real (`pages/NotFound.jsx`):** ruta catch-all con CTAs y accesos recomendados.

### Eliminado (orbs/partículas/glass heredados)

`BackgroundOrbs`, `ParticlesBackground`, `GlobalCTA`, `Navbar` (reemplazado por Header). Siguen
en uso para páginas antiguas: `InteractiveBackground`, `GlassCard`, etc., hasta su refactor.

### Validación

- `npm run build` → OK, code splitting por ruta verificado.
- `npm run lint` → sin errores; solo warnings preexistentes.
- `vite preview` → HTTP 200 en Home.
- Tokens verificados en CSS compilado (`bg-accent`, `bg-paper-bright`, `border-line`, `.kicker`,
  `.container-site`, `.text-hero`).

### Notas

- Las páginas antiguas aún usan la estética dark/glass; se migran por fase (3+). El header y
  footer nuevos ya usan el sistema global.
- Navegación apunta a rutas finales (`/soluciones/*`, `/como-funciona`, `/precios`, `/recursos`,
  `/contacto`) que se crean en Fases 4–6; el 404 evita pantallas rotas mientras tanto.

---

## Reporte — Fase 3: Inicio (Home)

**Estado:** Completada · **Criterio de cierre:** Home nueva montada según `01-INICIO.md` sobre el
sistema global, sin métricas inventadas, con revisión de QA visual pendiente ✔

### Qué se hizo

Home reconstruida de cero en `src/pages/Home.jsx`, compuesta por 11 secciones nuevas bajo
`src/components/home/`:

1. **Hero (`HomeHero.jsx`):** titular "Tu web también puede **operar** tu negocio" con reveal de
   líneas por máscara (GSAP) y cambio de color sutil en "operar" (cyan → cyan-deep), kicker, CTAs
   a `/contacto` (diagnóstico) y `/demos`, microcopy de confianza. Parallax suave del simulador al
   hacer scroll (ScrollTrigger, respeta `prefers-reduced-motion` vía `gsap.matchMedia`).
2. **Simulador Sitio/Panel (`SimuladorHero.jsx`):** escena en dos planos (web de "Panadería La
   Espiga" a la izquierda, panel interno a la derecha) que cicla sola: una consulta entra desde la
   web → se confirma → aparece en el panel como "Nueva" → pasa a "Asignada". Sin métricas falsas;
   datos ilustrativos de ejemplo.
3. **Franja de identificación (`Franja.jsx`):** banda ink — "Si hoy tu negocio depende de WhatsApp,
   Excel y tareas manuales, Fleximy puede ayudarte" + 5 beneficios operativos.
4. **Qué es Fleximy — dos lados (`DosLados.jsx`):** selector cliente/equipo con transición
   sincronizada entre vista de web pública y vista de panel, listas de qué ve cada lado.
5. **Soluciones por rubro (`SelectorIndustrias.jsx`):** selector de las 7 industrias con vista
   previa que cambia de acento/ícono según el rubro activo y CTA a cada `/soluciones/*`.
6. **La diferencia (`Transformacion.jsx`):** Antes (herramientas sueltas, caos) vs. Con Fleximy
   (operación conectada) con animación de aparición al scrollear.
7. **Cómo funciona (`Proceso.jsx`):** 4 pasos (diagnóstico gratuito, base diseñada, carga y puesta
   en marcha, activación) sobre fondo ink + barra de progreso que avanza con el scroll.
8. **Demo (`DemoSeccion.jsx`):** tarjeta ink "Miralo funcionar" — demos reales, no capturas; CTA a
   `/demos` y a demo personalizada.
9. **Confianza (`Confianza.jsx`):** 6 ítems (alojamiento y dominio, datos con respaldo, capacitación
   incluida, soporte humano, actualizaciones, sin permanencia) + CTA a `/seguridad`.
10. **Precios (`PrecioIntro.jsx`):** "Una base clara y un alcance definido antes de comenzar" — sin
    número de precio publicado (pendiente de validación según `28-DECISIONES.md`), con CTA a
    `/precios`.
11. **FAQ breve (`FaqBreve.jsx`):** 4 preguntas en acordeón accesible (aria-expanded/controls) +
    CTA a `/preguntas-frecuentes`.
12. **CTA final (`CtaFinal.jsx`):** banda ink con diagnóstico gratuito + WhatsApp.

Detalles del sistema: se agregó el token `--color-cyan-deep` (`#2f8f8b`) para el resaltado del
verbo "operar" con contraste suficiente sobre papel.

### Reglas respetadas

- Cero métricas inventadas, cero testimonios ficticios.
- Solo sistema global de Fase 2 (`Button`, `SectionHeader` no usado en Home, tokens, `container-site`,
  `.kicker`, monoespaciados del sistema).
- Se reemplazó la Home antigua (hero con parallax, `InteractiveBackground`, `ProcessSteps`,
  `ComparisonTable`, `PlanAllInOne`, `IndustryCards`, `FAQ` viejos). Esos componentes quedan sin uso
  de Home; se revisan para su eliminación en Fases 4+.

### Validación

- `npm run build` → OK (Home ~37 kB / 9,5 kB gzip, code splitting intacto).
- `npm run lint` → sin errores; solo warnings preexistentes (ninguno en los archivos nuevos).
- `vite preview` → HTTP 200 en `/`.
- Clases críticas verificadas en el CSS compilado (`text-cyan-deep`, `bg-cyan/15`, `bg-accent-soft`,
  `bg-line-dark`, `text-text-invert`, `shadow-lift`, `container-site`).

### Pendientes de esta fase (acción humana / QA)

- [ ] Revisión visual en desktop y mobile (composición del simulador, selector de industrias).
- [ ] Validar ritmo de animación del hero y del ciclo del simulador.
- [ ] Aprobación del punto de control obligatorio (paleta, tipografía, hero, ritmo, mobile) antes de
      la Fase 4.

---

## Reporte — Fase 4: Soluciones

**Estado:** Completada · **Commit:** `e60095a` · **Criterio de cierre:** hub + 7 páginas por
industria funcionando con escenas simuladas y contenido alineado a los MD ✔

### Qué se hizo

1. **Hub (`src/pages/Soluciones.jsx`):**
   - Hero GSAP (máscara de líneas + fade, respeta `prefers-reduced-motion` vía `gsap.matchMedia`).
   - Selector "¿Qué necesitás ordenar primero?" con preguntas literales de los MD que filtran y
     desplazan al catálogo.
   - Catálogo con `Workbench` por industria (módulos + filas de panel + acento de industria) y barra
     de progreso animada; sticky en desktop.
   - Arquitectura modular (11 módulos transversales), "Incluye normalmente" vs "Se cotiza por
     separado", CTA final sobre ink.
2. **Datos (`src/data/soluciones.js`):** `SOLUCIONES` con 7 soluciones completas (eyebrow, h1, hero,
   CTAs, problema, experiencia/grupos, panel, módulos/automatizaciones/modalidades/integraciones,
   recorrido, audiencia, FAQ, CTA) + `whatsapp` por industria vía `wa.me/541111111111`.
3. **Primitivas mock UI (`src/components/soluciones/Primitives.jsx`):** `Chrome`, `Status`,
   `CheckDot`, `Bullet`, `Avatar`, `PanelTitle`.
4. **Hero de solución (`SolutionHero.jsx`):** máscara de líneas + fade + parallax de escena.
5. **Bloques (`Blocks.jsx`):** `SectionHead`, `Problem`, `Duo`, `FeatureList`, `Groups`,
   `ModuleChips`, `Automations`, `Reports`, `Modalidades`, `Integraciones`, `Recorrido`, `Audience`,
   `FaqBlock` (acordeón accesible), `CtaBlock` (primario + WhatsApp + otras soluciones), `CrossLink`.
6. **Escenas simuladas (`scenes/`):** cada industria con un micro-interfaz distinta y datos
   coherentes, marcadas como "demo · datos ilustrativos":
   - `GastroScene`: menú QR por categorías → comandas en cocina con avance de estado.
   - `TurnosScene`: reserva servicio/profesional/día/horario → la agenda bloquea el horario.
   - `GestionScene`: pipeline Nueva→En contacto→Propuesta→Proyecto + tareas al crear proyecto.
   - `ComercioScene`: ficha pública con precio/stock editables desde el panel + switch agotado.
   - `InmobScene`: buscador de 4 propiedades + mapa SVG + lead que ingresa al CRM.
   - `EducacionScene`: curso → "Inscribirme" → portal del estudiante con tabs.
   - `TalleresScene`: OT #1042 con wizard de 7 estados, repuestos y consulta del cliente.
7. **Páginas (`src/pages/soluciones/`):** `Gastronomia`, `ServiciosTurnos`, `GestionPymes`,
   `ComercioRetail`, `Inmobiliarias`, `Educacion`, `TalleresReparaciones` — cada una compone el
   layout con una secuencia propia de bloques y escena.
8. **Rutas (`src/App.jsx`):** `/soluciones` y las 7 rutas `/soluciones/*`. Las rutas viejas
   `/gastronomia`, `/gestion-pymes` y `/turnos` ahora sirven las páginas nuevas (sin enlaces rotos).
   Se eliminaron las páginas legacy huérfanas `src/pages/Gastronomia.jsx`, `GestionPymes.jsx` y
   `Turnos.jsx` (solo referenciadas desde App.jsx).

### Reglas respetadas

- Cero métricas inventadas y cero testimonios ficticios.
- Sin promesas no soportadas: no "LMS completo" en educación, no "ERP" en gestión, integración/stock/
  pago siempre con nota de evaluación.
- Datos simulados identificados ("demo · datos ilustrativos").
- Todas las escenas usan interfaces diferentes entre sí.
- CTA de "¿No sabés qué solución elegir?" revisado: son dos acciones distintas (diagnóstico →
  `/contacto`, demos → `/demos`), no un duplicado literal.

### Validación

- `npm run build` → OK; las 7 páginas como chunks lazy separados (6–8 kB gzip c/u; hub ~4 kB gzip).
- `npm run lint` → sin errores; sin warnings en los archivos nuevos (se limpió un `Icon` sin uso en
  el hub).
- `vite preview` → HTTP 200 en `/soluciones`, las 7 rutas `/soluciones/*` y los alias
  `/gastronomia`, `/gestion-pymes`, `/turnos`.
- Campos de datos verificados contra los bloques que consumen cada página (agenda/gestion,
  automatizaciones, reportes, modalidades, integraciones).

### Pendientes de esta fase (acción humana / QA)

- [ ] Revisión visual en desktop y mobile de las 7 páginas y el hub.
- [ ] Verificar el paso 2 (Mega menú) apunte a `/soluciones` correctamente.
- [ ] Aprobar la Fase 4 antes de avanzar a Demos (Fase 5).

---

## Próximas fases

| Fase | Descripción | Estado |
|---|---|---|
| 2 | Sistema global (tokens, tipografía, header, footer, motion) | ✔ Completada |
| 3 | Inicio (Home completa según `01-INICIO.md`) | ✔ Completada |
| 4 | Soluciones (hub + 7 industrias) | ✔ Completada |
| 5 | Demos (laboratorio interactivo) | Pendiente |
| 6 | Comercial (cómo funciona, precios, nosotros, contacto, FAQ) | Pendiente |
| 7 | Confianza y recursos (seguridad, recursos, casos de uso) | Pendiente |
| 8 | Legales y estados (privacidad, términos, gracias, 404) | Pendiente |
| 9 | SEO y analítica | Pendiente |
| 10 | QA final | Pendiente |

> **Punto de aprobación obligatorio** antes de la Fase 4: paleta, tipografía, hero, dashboard CSS,
> ritmo de animación, composición mobile, header y footer.
