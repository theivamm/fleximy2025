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

## Próximas fases

| Fase | Descripción | Estado |
|---|---|---|
| 2 | Sistema global (tokens, tipografía, header, footer, motion) | ✔ Completada |
| 3 | Inicio (Home completa según `01-INICIO.md`) | Pendiente |
| 4 | Soluciones (hub + 7 industrias) | Pendiente |
| 5 | Demos (laboratorio interactivo) | Pendiente |
| 6 | Comercial (cómo funciona, precios, nosotros, contacto, FAQ) | Pendiente |
| 7 | Confianza y recursos (seguridad, recursos, casos de uso) | Pendiente |
| 8 | Legales y estados (privacidad, términos, gracias, 404) | Pendiente |
| 9 | SEO y analítica | Pendiente |
| 10 | QA final | Pendiente |

> **Punto de aprobación obligatorio** antes de la Fase 4: paleta, tipografía, hero, dashboard CSS,
> ritmo de animación, composición mobile, header y footer.
