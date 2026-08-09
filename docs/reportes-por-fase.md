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

## Reporte — Fase 5: Demos

**Estado:** Completada · **Commit:** `cafa955` · **Criterio de cierre:** todos los botones
producen una acción visible ✔

### Qué se hizo

1. **Registro (`src/data/demos.js`):** `DEMOS` con las 7 demos (rubro, estado, descripción,
   pasos por modo según las "acciones mínimas" del `10-DEMOS.md`, guía opcional).
2. **Laboratorio (`src/components/demos/DemoLab.jsx`):**
   - Superficie central donde se cargan las interfaces reales de las escenas de Fase 4.
   - Selector de rubro en la página + tarjetas de catálogo con estado real (Disponible /
     Recorrido guiado / Próximamente).
   - Conmutador **Cliente/Equipo** en las 3 demos principales: el cambio de modo conserva el
     mismo dato de la escena (no se remonta), demostrando la conexión.
   - **Reiniciar demo** (remonta la escena con estado inicial) y **Salir** (vuelve al catálogo,
     salida visible).
   - Estado de avance: barra de progreso que cuenta las acciones reales realizadas contra los
     pasos del MD ("X de Y acciones").
   - **Recorrido guiado** opcional (solo cuando el usuario lo pide): tarjeta de pasos con
     Anterior/Siguiente/Terminar que resalta el elemento objetivo con un anillo
     (`.demo-guia-active`) y cambia de modo automáticamente entre cliente y equipo.
   - Transiciones GSAP en el hero y framer-motion (AnimatePresence) entre demos.
   - Nota de pie que identifica que no se genera una compra o reserva real.
3. **Escenas adaptadas (retrocompatibles con las páginas de Fase 4):**
   - `GastroScene`: prop `mode` (cliente→menú, equipo→cocina + control de menú con precio y
     disponibilidad que se reflejan al instante) + `onAction`.
   - `TurnosScene`: modo equipo con bloquear horario, reprogramar y historial del cliente;
     `onAction` por acción.
   - `GestionScene`: vista cliente nueva (portal con avances, próximas entregas, archivos y
     comentario) que comparte el mismo estado del pipeline; vista equipo con mover tarea,
     asignar responsable y cambiar fecha.
   - Comercio / Inmob / Educación / Talleres: reciben `onAction` para reportar sus acciones
     (vista integrada, ya que muestran cliente y equipo en la misma superficie).
4. **Página (`src/pages/Demos.jsx`):** hero GSAP ("Probá Fleximy antes de imaginarlo") +
   filtros (Todas + 7 rubros) + catálogo o laboratorio + banda "¿Preferís que te lo mostremos?"
   (Agendar demostración → `/contacto`) + CTA final "¿Querés ver Fleximy con la lógica de tu
   negocio?" (Solicitar demo personalizada → `/contacto`, Ver soluciones → `/soluciones`).
   Reemplaza la página legacy (glows, `InteractiveBackground`, `SectionWrapper`).

### Reglas respetadas

- Todos los botones abren una interacción o página real (ningún botón sin acción).
- Datos ficticios identificados en todas las superficies ("demo · datos ilustrativos").
- Sin registro previo para probar.
- Cliente y equipo comparten el mismo dato en las vistas conmutables.
- Medición de acciones centralizada en `onAction`: punto de enganche listo para eventos de
  analítica (se conecta en Fase 9).
- Hero con `prefers-reduced-motion` vía `gsap.matchMedia`.

### Validación

- `npm run build` → OK (Demos ~5,7 kB gzip; escenas compartidas con Fase 4 en chunks propios).
- `npm run lint` → sin errores; sin warnings en los archivos nuevos.
- `vite preview` → HTTP 200 en `/demos`, `/soluciones` y `/`.
- Retrocompatibilidad verificada: las páginas de solución siguen renderizando las escenas en
  vista completa (mode indefinido).

### Pendientes de esta fase (acción humana / QA)

- [ ] Revisión visual e interacción en desktop y mobile del laboratorio (7 demos + guiado).
- [ ] Validar el ritmo del recorrido guiado y el comportamiento de la barra de avance.
- [ ] Conectar la medición de inicio/interacción/finalización/CTA en Fase 9.

---

## Reporte — Fase 6: Comercial

**Estado:** Completada · **Criterio de cierre:** Cómo funciona, Precios, Nosotros, Contacto, FAQ
montadas sobre el sistema global, sin precios ni métricas inventados ✔

### Qué se hizo

1. **Datos (`src/data/comercial.js`):** etapas de `11-COMO-FUNCIONA.md` (6 con "qué
   hacemos/acordamos/configuramos" + "qué recibís" + notas), factores de plazo, responsabilidades
   Fleximy/Cliente, `PLANES` (3 niveles), incluidos/costos adicionales, comparación con mensaje,
   `PRECIO_FAQ`, `PRINCIPIOS`, `COMO_TRABAJAMOS`, `FAQ_CATEGORIAS` (7 categorías), opciones de
   contacto (rubros, necesidades, usuarios, plazos, inversión, pasos posteriores, expectativas).
2. **Acordeón reutilizable (`components/comercial/Accordion.jsx`):** acordeón accesible con
   animación de altura controlada, usado por Precios.
3. **Cómo funciona (`pages/ComoFunciona.jsx`):** hero GSAP, principio de trabajo, 6 etapas en
   columna editorial + **escena sticky en desktop** que arma el sistema capa por capa según la
   etapa en vista (IntersectionObserver; capas: mapa de proceso → módulos → identidad → revisión →
   publicación → soporte; en mobile las etapas quedan como capítulos sin pin), tiempos con
   `[PLAZO VALIDADO]`, responsabilidades sobre ink y CTA final.
4. **Precios (`pages/Precios.jsx`, reescrito):** hero, tres planes "de la misma arquitectura" sin
   badges "más popular", con placeholders `[PRECIO ESENCIAL]` / `[PRECIO OPERACIÓN]` /
   "Cotización personalizada" y nota de que el monto se confirma en el diagnóstico (no se publica
   un precio inventado), "toda suscripción incluye" vs "se cotiza por separado", comparación
   realista (tabla con encabezado sticky), mensaje de ahorro, FAQ de precio con `[RESPUESTA
   CONTRACTUAL VALIDADA]` y CTA final. **Eliminado** el pricing falso del legacy ($150.000 ARS/mes,
   tabla de ahorro inventada, "sin costos de setup", "sin permanencia" sin validar).
5. **Nosotros (`pages/Nosotros.jsx`, reescrito):** manifiesto, razón de ser (web estática ↔
   sistema complejo → Fleximy), misión y visión, 5 principios en composición de grilla asimétrica,
   **sección Equipo en borrador explícito** (sin identidades ficticias), experiencia y respaldo
   "pendiente de validación" (sin contadores de relleno; se eliminó el "99.9% uptime" del legacy),
   cómo trabajamos (6 pasos) y CTA final.
6. **Contacto y diagnóstico (`pages/Contacto.jsx`):** formulario multipaso (Identificación →
   Situación → Detalle opcional) con barra de progreso sobria, campos obligatorios según el MD
   (sin CUIT/facturación), campos opcionales progresivos, validación con mensajes específicos y
   foco dirigido al primer error, resumen dinámico a la derecha con "módulos posibles" por rubro
   (con aclaración "no es una propuesta definitiva"), expectativas, "qué sucede después" y canales
   alternativos (WhatsApp real vía `CONTACT`, reunión y email como pendientes). El envío redirige a
   `/gracias-diagnostico`.
7. **Gracias (`pages/GraciasDiagnostico.jsx`):** página posterior obligatoria con mensaje
   `[PLAZO VALIDADO]` y botones a Demos, Soluciones y WhatsApp.
8. **Preguntas frecuentes (`pages/PreguntasFrecuentes.jsx`):** buscador con resaltado de
   coincidencias, filtros por categoría + índice lateral sticky, acordeones accesibles que
   actualizan la URL con ancla compartible (`#pregunta-<id>`), "más consultadas" destacadas por
   tipografía y CTA final (Consultar con el equipo → `/contacto`, WhatsApp como secundario).
9. **Rutas (`src/App.jsx`):** agregadas `/como-funciona`, `/contacto`, `/gracias-diagnostico`,
   `/preguntas-frecuentes`; `/precios` y `/nosotros` pasan a servir las páginas nuevas. Se
   **eliminaron** las páginas huérfanas `Services.jsx`, `WhyUs.jsx`, `Blog.jsx` y `Contact.jsx`
   (rutas `/services`, `/why-us`, `/blog`, `/contact` → caen en el 404). Verificado que ninguna
   parte del sitio las referenciaba.

### Reglas respetadas

- Cero métricas inventadas, cero precios falsos, cero testimonios ficticios.
- Equipo y experiencia de Nosotros sin identidades ni números ficticios (borrador explícito).
- Precios con placeholders `[PRECIO ESENCIAL]`/`[PRECIO OPERACIÓN]` y nota de validación, según la
  decisión de `12-PRECIOS.md` y `28-DECISIONES.md`; no se comunican "sin costo inicial" ni
  "sin permanencia" (pendientes de validación contractual).
- Formulario sin campos sensibles (sin CUIT/facturación) y sin chatbots falsos; HTML nativo.
- Todos los botones producen una acción visible o son información explícita (la reunión no es un
  enlace muerto: se muestra como dato con "agenda por WhatsApp o email").
- GSAP acotado al hero en estas páginas; la escena de Cómo funciona usa IntersectionObserver
  (sin `pin` frágil), respetando `prefers-reduced-motion` en los reveals.

### Validación

- `npm run build` → OK; páginas nuevas como chunks lazy (`ComoFunciona` 3,4 kB gzip,
  `Precios` 2,6 kB, `Nosotros` 2,6 kB, `Contacto` 4,9 kB, `PreguntasFrecuentes` 2,9 kB,
  `GraciasDiagnostico` 0,65 kB).
- `npm run lint` → sin errores; sin warnings en los archivos nuevos.
- `vite preview` → HTTP 200 en `/`, `/soluciones`, `/demos`, `/como-funciona`, `/precios`,
  `/nosotros`, `/contacto`, `/gracias-diagnostico`, `/preguntas-frecuentes`.
- Verificado que ninguna página huérfana eliminada sigue siendo importada.

### Pendientes de esta fase (acción humana / QA)

- [ ] Validar valores de precios (`[PRECIO ESENCIAL]`, `[PRECIO OPERACIÓN]`) y política de
      actualización/permanencia/implementación antes de publicar números.
- [ ] Validar plazo real de implementación (`[PLAZO VALIDADO]`) y reemplazar en Cómo funciona,
      Gracias y FAQ.
- [ ] Completar Equipo (fotografías y biografías reales) y datos verificables de experiencia.
- [ ] Conectar el formulario a backend/email y la agenda de reuniones con disponibilidad real.
- [ ] Consistencia pendiente en Home (Fase 3): `PrecioIntro` aún afirma "sin permanencia" sin
      validación contractual; revisar junto con la política de precios.
- [ ] Enlaces a `/seguridad`, `/recursos`, `/privacidad`, `/terminos` se completan en Fases 7 y 8.

---

## Reporte — Fase 7: Confianza y recursos

**Estado:** Completada · **Criterio de cierre:** Seguridad, Recursos y Casos de uso montados sobre
el sistema global; sin casos ilustrativos presentados como clientes reales ✔

### Qué se hizo

1. **Datos (`src/data/confianza.js`):** capas de seguridad, accesos, protección de datos,
   respaldos, disponibilidad, terceros, incidentes y cobertura de privacidad; categorías y
   contenidos de recursos; descargables y newsletter; 4 casos de uso con situación/dispersión/
   configuración/indicadores y estructura de caso real futuro.
2. **Seguridad (`pages/Seguridad.jsx`, `/seguridad`):** hero, diagrama de flujo
   "cliente → plataforma → infraestructura → respaldo" (4 capas con etiquetas textuales, sin
   escudos ni candados decorativos), accesos con responsabilidad del cliente, protección de datos
   con la advertencia sobre AES-256, tabla de respaldos con `[DEFINIR]` y nota de recuperación,
   disponibilidad solo con compromisos `[DEFINIR]` (sin usar "SLA" sin acuerdo), dependencias de
   terceros, proceso de incidentes (6 pasos), privacidad con enlace a `/privacidad` (se resuelve
   en Fase 8) y CTA final. Advertencia de revisión técnica/legal registrada en el reporte.
3. **Recursos (`pages/Recursos.jsx`, `/recursos`):** hero, recurso destacado con arte tipográfico,
   filtros por las 7 categorías con transición suave, grilla editorial de guías/checklists/
   comparativas (todas marcadas "en preparación" — sin enlaces muertos; los artículos se publican
   al completarse), banda a `/casos-de-uso`, 4 descargables "en preparación", newsletter como
   bloque informativo (no activado, sin formulario falso) y CTA final.
4. **Casos de uso (`pages/CasosDeUso.jsx`, `/casos-de-uso`):** hero con aviso visible "escenarios
   ilustrativos · no representan clientes ni resultados comprobados", 4 casos (Restaurante,
   Servicios, B2B, Inmobiliaria) como historias operativas: situación → configuración →
   indicadores, vista "cómo operás hoy (información dispersa)" vs "con Fleximy (flujo conectado)"
   con datos específicos de cada rubro, CTA a la solución correspondiente; sección de estructura
   de caso real futuro (9 ítems) y CTA final.
5. **Rutas (`src/App.jsx`):** `/seguridad`, `/recursos`, `/casos-de-uso`. El enlace de Home
   ("Conocer seguridad y continuidad") y el ítem del nav "Recursos" ahora resuelven. `/casos-de-uso`
   es alcanzable desde Recursos (no está en el header, según el mapa de navegación).

### Reglas respetadas

- Cero casos presentados como clientes reales; aviso de escenario ilustrativo siempre visible.
- Cero logos, personas, métricas, testimonios o certificaciones inventadas (no se dibujan sellos
  ni "AES-256" sin validación).
- Afirmaciones de seguridad solo como prácticas reales implementadas/documentadas; lo pendiente
  queda como `[VALIDAR]`/`[DEFINIR]`/`[CONFIRMAR DISPONIBILIDAD]`.
- Sin términos inflados: no se usa "SLA" sin acuerdo de nivel de servicio aplicable.
- Recursos y newsletter sin falsos formularios ni descargas inexistentes ("en preparación").
- GSAP acotado al hero con `prefers-reduced-motion` vía `gsap.matchMedia`.

### Validación

- `npm run build` → OK; `Seguridad` 3,0 kB gzip, `Recursos` 2,9 kB, `CasosDeUso` 2,3 kB, `confianza`
  3,1 kB (chunks lazy).
- `npm run lint` → sin errores; sin warnings en los archivos nuevos (se corrigió un parámetro sin
  uso en `CasosDeUso.jsx`).
- `vite preview` → HTTP 200 en `/seguridad`, `/recursos`, `/casos-de-uso` (más `/contacto` y
  `/preguntas-frecuentes` de regresión).

### Pendientes de esta fase (acción humana / QA)

- [ ] Revisión técnica y legal de la página de Seguridad antes de publicar; eliminar todo control
      no implementado (`[CONFIRMAR DISPONIBILIDAD]`, `[VALIDAR ARQUITECTURA/TECNOLOGÍA]`,
      `[DEFINIR]` en respaldos y disponibilidad).
- [ ] Redactar y publicar los artículos de Recursos (6 iniciales) y los 4 descargables reales.
- [ ] Decidir la activación de la newsletter con capacidad editorial.
- [ ] Cuando existan clientes autorizados, evolucionar "Casos de uso" → "Casos de éxito".
- [ ] `/privacidad` (enlazado desde Seguridad) se publica en Fase 8.

---

## Reporte — Fase 8: Legales y estados

**Estado:** Completada · **Commit:** `2ed7951` · **Criterio de cierre:** privacidad, términos,
gracias y 404 montados según `18`, `19`, `21` y `22`; textos legales marcados como borrador sujeto
a validación profesional ✔

### Qué se hizo

1. **Datos (`src/data/legal.js`):** `PRIVACIDAD` (13 secciones) y `TERMINOS` (18 secciones) con el
   contenido estructural literal de los MD (`[RAZÓN SOCIAL]`, `[CUIT]`, `[DOMICILIO]`, `[EMAIL]`,
   `[FECHA DE ACTUALIZACIÓN]`, etc.) y `LEGAL_NOTA` de borrador. Bloques tipados: párrafos,
   listas viñeta y listas numeradas.
2. **Componente documental (`src/components/legal/LegalDoc.jsx`):** página documental con ancho de
   lectura contenido, índice lateral sticky con anclas en desktop, selector desplegable en mobile,
   fecha de actualización visible, botón "Imprimir o guardar como PDF" (funcional vía
   `window.print()`), secciones numeradas con `id` navegable, nota de borrador y bloque de versión.
   Aplica el mismo sistema documental a Privacidad y Términos.
3. **Privacidad (`pages/Privacidad.jsx`, `/privacidad`):** 13 secciones del `18-POLITICA.md`
   (Responsable, Alcance, Datos, Finalidades, Base legal, Proveedores, Conservación, Derechos,
   Seguridad, Cookies, Menores, Cambios, Contacto). Resuelve el enlace de Seguridad (`/privacidad`)
   y del footer/nav.
4. **Términos (`pages/Terminos.jsx`, `/terminos`):** 18 secciones del `19-TERMINOS.md`
   (Identificación, Objeto, Prelación, Alcance, Implementación, Suscripción, Plazo, Uso permitido,
   Datos, Propiedad intelectual, Disponibilidad, Soporte, Integraciones, Responsabilidad,
   Confidencialidad, Modificaciones, Ley y jurisdicción, Contacto).
5. **Gracias (`pages/GraciasDiagnostico.jsx`, rework):** H1 "Recibimos tu solicitud", texto con
   `[PLAZO VALIDADO]`, sección "Mientras tanto" con 3 tarjetas (Mirá Fleximy en acción → `/demos`;
   **Conocé la solución de tu rubro** → CTA dinámico según la selección del formulario persistida
   en `sessionStorage` (`fleximy_rubro`) mapeando rubro → ruta de solución, con fallback a
   `/soluciones`; ¿Tu consulta es urgente? → WhatsApp con `[HORARIO REAL]`). Confirmación con check
   SVG sin confeti, aparición escalonada con framer-motion (stagger ≤ 1,2 s) y `useReducedMotion`
   para omitir la animación.
6. **Contacto (`pages/Contacto.jsx`):** guarda el rubro en `sessionStorage` al enviar para
   personalizar Gracias.
7. **404 (`pages/NotFound.jsx`, rework):** H1 "Esta página no está disponible", CTAs Volver al
   inicio / Ver soluciones, accesos recomendados (demos, precios, FAQ, contacto) y **escena propia
   Sitio → 404 → Panel**: SVG con nodos "Sitio" y "Panel" y la conexión interrumpida en el nodo
   404; al pasar el cursor o enfocar el nodo la conexión se recompone (línea lima + estado
   "reconectado"). Mensaje y CTAs visibles desde el primer frame; sin juegos que bloqueen la
   salida; en mobile es una interacción simple por toque.
8. **404 real (HTTP):** `scripts/generate-404.mjs` copia `dist/index.html` a `dist/404.html`
   después del build; `netlify.toml` reemplaza el catch-all `/* → index.html 200` por reglas
   explícitas de cada ruta del SPA (HTTP 200) y un fallback `/* → /404.html` con **status 404**
   real para rutas inexistentes (se conservan headers de seguridad y caché de assets).
9. **Rutas (`src/App.jsx`):** `/privacidad` y `/terminos` lazy. Enlaces de navegación secundaria,
   footer y Seguridad a `/privacidad` ahora resuelven.

### Reglas respetadas

- Textos legales son **borrador estructural** con nota visible y placeholders `[RAZÓN SOCIAL]`,
  `[CUIT]`, `[EMAIL]`, `[FECHA DE ACTUALIZACIÓN]` — sin inventar datos de la empresa.
- Sin SLA, sin porcentajes de disponibilidad, sin promesas no validadas en textos legales.
- 404 sin ilustración espacial, robot triste ni gráfico genérico; escena de marca con salida clara.
- Gracias sin confeti, animación corta, omitida con `prefers-reduced-motion`.
- Datos legales como contenido estructurado (imprimibles y con jerarquía sin estilos).

### Validación

- `npm run build` → OK; `LegalDoc` 4,2 kB gzip, `Privacidad`/`Terminos` 0,15 kB, `NotFound` 1,6 kB,
  `GraciasDiagnostico` 1,75 kB (chunks lazy). `dist/404.html` generado correctamente.
- `npm run lint` → sin errores; solo warnings preexistentes (ninguno en archivos nuevos).
- `vite preview` → HTTP 200 en `/`, `/privacidad`, `/terminos`, `/gracias-diagnostico`,
  `/soluciones`, `/seguridad` y ruta inexistente (el status 404 real lo aplica Netlify).

### Pendientes de esta fase (acción humana / QA)

- [ ] Redactar y validar profesionalmente los textos de privacidad y términos antes de publicar;
      completar razón social, CUIT, domicilio y emails.
- [ ] Validar plazo real de implementación (`[PLAZO VALIDADO]`) y horario de WhatsApp
      (`[HORARIO REAL]`).
- [ ] Confirmar el dominio definitivo para canónicos/OG/sitemap (ver Fase 9).
- [ ] Verificar el comportamiento del 404 real en el preview de Netlify tras el deploy.

---

## Reporte — Fase 9: SEO y analítica

**Estado:** Completada · **Commit:** `dc4beab` · **Criterio de cierre:** metadatos por ruta,
sitemap, robots, schema, canonicals, Open Graph, eventos y tracking de formularios ✔

### Qué se hizo

1. **`index.html`:** `lang="es"`, title y meta description en español, `theme-color`, canonical
   base, Open Graph (og:type/site_name/locale/title/description/url/image), Twitter Card y
   **schema JSON-LD** (`Organization` + `WebSite` con `@id`, url, idioma y publisher).
2. **`public/robots.txt`:** permite todo, excluye `/login`, `/dashboard` y `/gracias-diagnostico`,
   referencia el sitemap.
3. **`public/sitemap.xml`:** 20 URLs públicas con `lastmod` (2026-08-08), `changefreq` y
   `priority`; excluye el área privada y la página de gracias (noindex).
4. **`public/og-default.svg`:** imagen social 1200×630 con marca (ink + lima) como placeholder.
5. **Sistema SEO por ruta (`src/data/seo.js` + `src/components/seo/Seo.jsx`):** `SITE_URL`
   centralizado, mapa `SEO_META` con title/description/robots para las 20 rutas públicas + área
   privada (noindex) + catch-all 404 (`noindex,follow`). El componente `Seo` se monta en
   `AppContent` y actualiza `document.title`, meta description, robots, canonical (absoluta salvo
   noindex), og:title/description/url/type y twitter card en cada navegación.
6. **Analítica (`src/lib/analytics.js`):** `track(event, props)` emite un `CustomEvent`
   `fleximy:analytics` (log en consola solo en dev) e `initAnalytics()` como listener global de
   clicks que captura `[data-track]` (+ `data-track-props` JSON) y enlaces `wa.me` automáticos
   (`click_whatsapp`). Sin herramienta de terceros cargada (pendiente decisión y consentimiento).
7. **Eventos conectados:**
   - `cta_diagnostico`: Header (desktop y mobile), Home hero y CTA final.
   - `cta_demo`: Home hero.
   - `click_whatsapp`: cualquier enlace `wa.me` del sitio (auto).
   - `formulario_iniciado` (primer avance de paso en Contacto), `rubro_seleccionado` (chip de
     rubro), `formulario_enviado` (submit con rubro y necesidad).
   - `gracias_visto` (con rubro) y `gracias_click_demo`.
   - `404_visto` (URL solicitada y página de origen, una sola vez por visita) y `404_cta`
     (cuál acceso se usó).
   - `demo_iniciada` (al abrir cada demo), `demo_completada` (100% de acciones, reseteable) y
     `vista_sitio_panel` (cambio cliente/equipo en el laboratorio y en el selector de Home).
8. **`App.jsx`:** se extrae `renderShell(location, isDashboard)` y se monta `<Seo />` para todas
   las rutas (públicas y del dashboard).

### Reglas respetadas

- Sin analítica de terceros cargada sin consentimiento: el track es un evento propio sin red, listo
  para conectar la herramienta definitiva (pendiente de `28-DECISIONES.md`).
- Descripciones sin métricas ni promesas no verificadas.
- Canonical absoluto centralizado en `SITE_URL` (único punto a confirmar con el dominio final).
- Página de gracias y área privada en noindex; 404 en `noindex,follow`.
- Gracias sigue sin volver a disparar la conversión al recargar (evento de vista informativo).

### Validación

- `npm run build` → OK; `404.html` regenerado; robots/sitemap/og copiados a `dist`.
- `npm run lint` → sin errores; se limpió el único warning nuevo (deps de `Seo.jsx`).
- `dist/index.html` verificado: `lang="es"`, og:title, canonical y JSON-LD presentes.
- `vite preview` → HTTP 200 en rutas nuevas y `robots.txt`, `sitemap.xml`, `og-default.svg`.

### Pendientes de esta fase (acción humana / QA)

- [ ] Confirmar dominio definitivo y reemplazar `SITE_URL` en `src/data/seo.js`, `sitemap.xml`,
      `robots.txt`, `index.html` y `og-default.svg` (hoy asume `fleximy2025.netlify.app`).
- [ ] Generar imagen social real (OG/Twitter 1200×630, PNG/JPG) en lugar del placeholder SVG.
- [ ] Decidir herramienta de analítica y condiciones de consentimiento; conectar al CustomEvent
      `fleximy:analytics`.
- [ ] Validar en Netlify la respuesta 404 real y los canonicals servidos.

---

## Próximas fases

| Fase | Descripción | Estado |
|---|---|---|
| 2 | Sistema global (tokens, tipografía, header, footer, motion) | ✔ Completada |
| 3 | Inicio (Home completa según `01-INICIO.md`) | ✔ Completada |
| 4 | Soluciones (hub + 7 industrias) | ✔ Completada |
| 5 | Demos (laboratorio interactivo) | ✔ Completada |
| 6 | Comercial (cómo funciona, precios, nosotros, contacto, FAQ) | ✔ Completada |
| 7 | Confianza y recursos (seguridad, recursos, casos de uso) | ✔ Completada |
| 8 | Legales y estados (privacidad, términos, gracias, 404) | ✔ Completada |
| 9 | SEO y analítica | ✔ Completada |
| 10 | QA final | Pendiente |

> **Punto de aprobación obligatorio** antes de la Fase 4: paleta, tipografía, hero, dashboard CSS,
> ritmo de animación, composición mobile, header y footer.
