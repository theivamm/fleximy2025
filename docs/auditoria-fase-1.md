# Auditoría y plan de limpieza — Fase 1

Rama: `rework/fleximy-website-v2`. Fecha: 2026-08-08.

## 1. Mapa de rutas

### Rutas actuales (App.jsx)

| Ruta | Página | Estado |
|---|---|---|
| `/` | Home | Refactor (Fase 3) |
| `/services` | Services | Reemplazar por `/soluciones` |
| `/why-us` | WhyUs | Eliminar o integrar a Nosotros |
| `/gastronomia` | Gastronomia | Renombrar a `/soluciones/gastronomia` |
| `/gestion-pymes` | GestionPymes | Renombrar a `/soluciones/gestion-pymes` |
| `/turnos` | Turnos | Renombrar a `/soluciones/servicios-turnos` |
| `/demos` | Demos | Conservar y rehacer (Fase 5) |
| `/precios` | Precios | Conservar y rehacer (Fase 6) |
| `/nosotros` | Nosotros | Conservar y rehacer (Fase 6) |
| `/blog` | Blog | Mantener en pausa; Recursos la reemplaza |
| `/contact` | Contact | Reemplazar por `/contacto` (diagnóstico) |

### Rutas del dashboard (a aislar y conservar)

| Ruta | Página |
|---|---|
| `/login` | Login |
| `/dashboard` | DashboardHome |
| `/dashboard/ai-images` | AiImages |
| `/dashboard/crear-imagen` | CrearImagen |
| `/dashboard/mis-disenos` | MisDisenos |

### Rutas nuevas previstas (por fase)

`/soluciones` (+7 páginas por industria), `/como-funciona`, `/preguntas-frecuentes`, `/seguridad`,
`/recursos`, `/casos-de-uso`, `/privacidad`, `/terminos`, `/gracias-diagnostico`, `/404`.

### Problemas detectados

- No existe ruta 404 ni wildcard `*`.
- Todas las páginas importadas estáticamente en `App.jsx` → bundle único de 1.2 MB.
- `GlobalCTA` y `BackgroundOrbs` se montan en todas las rutas públicas.

## 2. Inventario de componentes

### Públicos en uso (conservar o refactorizar)

`Navbar`, `Footer`, `GlobalCTA`, `InteractiveBackground`, `GlassCard`, `BackgroundOrbs`,
`IndustryCards`, `ComparisonTable`, `ProcessSteps`, `ModuleShowcase`, `ManifestoBanner`,
`SectionWrapper`, `FAQ`, `WhyUsProcess`, `WhyUsStats`, `Button`, `BlogCard`, `CostBreakdown`,
`PlanAllInOne`, `PlanGastronomico`, `PlanTurnos`, `PlanGestionPymes`, `PilaresGastronomia`,
`PilaresTurnos`, `PilaresGestionPymes`, `GarantiasGastronomia`, `GarantiasTurnos`,
`GarantiasGestionPymes`, `FaqGastronomia`, `FaqTurnos`, `FaqGestionPymes`,
`SimuladorGastronomia`, `SimuladorTurnos`, `SimuladorGestionPymes`.

### Dashboard (conservar, aislar)

`DashboardLayout` (usa AuthContext y supabase).

### Sin uso (eliminar tras verificación)

`CapabilitiesGrid`, `EcosystemTabs`, `FinalCTA`, `PricingCards`, `StatsCounter`,
`TestimonialsCarousel`, `ParticlesBackground`.

> Nota: `EcosystemTabs`, `StatsCounter`, `TestimonialsCarousel` y `PricingCards` contienen
> métricas no verificadas (50+, 99.9% SLA, 40%, 3x) que el plan de contenido prohíbe.

### Con deuda (warnings de lint)

`WhyUsStats`, `Contact`, `DashboardLayout`, `FAQ`, `ModuleShowcase`, `EcosystemTabs`,
`Demos`, `PlanAllInOne`, `ParticlesBackground`, `ProcessSteps`, `Nosotros`, `IndustryCards`,
`MisDisenos`, `Navbar`, `AiImages` → imports sin uso y deps de hooks.

## 3. Inventario de dependencias

| Paquete | Uso real | Acción |
|---|---|---|
| react, react-dom | Sí | Conservar |
| react-router-dom | Sí | Conservar |
| @supabase/supabase-js | Dashboard (AuthContext, AiImages, CrearImagen, MisDisenos) | Conservar; lazy en público |
| @tailwindcss/vite, tailwind v4 | Sí | Conservar |
| gsap | ComparisonTable, EcosystemTabs, ProcessSteps | Conservar; centralizar en Fase 2 |
| framer-motion | 50+ archivos | Conservar; limitar a transiciones/menús |
| lucide-react | 22+ archivos | Conservar |
| react-dropzone | CrearImagen | Conservar (dashboard) |
| html-to-image | **Sin uso en `src`** | Eliminar |
| oxlint, vite, @vitejs/plugin-react, @types/react | Build | Conservar |

## 4. Código del starter a eliminar

- `README.md`: contenido genérico de React + Vite. Reemplazar por documentación del proyecto
  (stack, variables, proceso de validación, rama de rework).
- `src/assets/react.svg` y `src/assets/vite.svg`: logos del starter, no usados.
- `src/App.css`: no importado por ningún módulo (solo `index.css`). Eliminar.
- `index.html`: título global en inglés (`Your Business Operating System`), `lang="en"`,
  sin meta description, sin OG/canonical. Refactor completo en Fase 9.

## 5. Componentes exclusivos del dashboard

`DashboardLayout.jsx` es el único contenedor privado. Las páginas `Login`, `DashboardHome`,
`AiImages`, `CrearImagen`, `MisDisenos` dependen de `AuthContext` y `supabase`.

Estrategia: extraer a un subárbol `src/pages/dashboard/` con lazy loading y ruta propia,
de modo que Supabase no se cargue en las páginas públicas (impacto de bundle y penalización
de Home).

## 6. Revisión de Netlify

`netlify.toml` actual: build `npm run build`, publish `dist`, fallback SPA `/* → /index.html`,
headers básicos (nosniff, XFO, Referrer-Policy) y caché de assets.

Pendiente:
- CSP compatible con el stack (fuentes de Google, Supabase).
- Strict-Transport-Security.
- Permissions-Policy.
- Headers diferenciados para documentos y assets.
- Deploy previews por PR.
- `.htaccess` queda solo para hosting Apache/LiteSpeed alternativo (no se usa en Netlify).

## 7. Revisión de SEO actual

- Title global único en `index.html`, en inglés.
- Sin meta description, canonical, Open Graph ni Schema por página.
- Sin sitemap ni robots.txt.
- Sin 404 real (fallback SPA responde 200).
- `lang="en"` cuando el sitio debe ser `es`.
- `translations.js` contiene contenido en inglés + texto corrupto (encoding "Ã±", "A?").
- El plan exige: metadatos por ruta, sitemap, robots, schema, canonicals, OG, noindex en
  gracias/404. (Fase 9)

## 8. Plan de conservación, refactor y eliminación

### Conservar (tal cual o con ajuste mínimo)

- `AuthContext`, `supabase.js`, páginas y `DashboardLayout` del área privada.
- `react-dropzone` (solo dashboard), `@supabase/supabase-js` (dashboard).
- Logos reales (`logo-fleximy.svg`), assets de hero (`img-01-hero*.png`).
- `sql/` (esquema del dashboard de imágenes).
- `netlify.toml` (base SPA + headers; se amplía).
- Lógica de simuladores: `SimuladorGastronomia`, `SimuladorTurnos`, `SimuladorGestionPymes`
  (reestilizar según "minimalismo operativo").

### Refactorizar (Fase 2–6)

- `App.jsx`: dividir público/dashboard, `React.lazy` + `Suspense`, ruta 404.
- Tokens y CSS: reemplazar paleta dark-slate/neones por tinta/papel + acento `#c8ff3d` y `#52d6d1`.
- `Navbar` (mega menú soluciones), `Footer`, `GlobalCTA`, `Button`, `SectionWrapper`.
- `translations.js`: purgar contenido en inglés corrupto; el sitio será solo español en v1.
- Rutas de soluciones: renombrar y agregar Comercio/Retail, Inmobiliarias, Educación, Talleres.
- `Contact` → formulario de diagnóstico multipaso con `/gracias-diagnostico`.
- SEO: metadatos por ruta, sitemap, robots, schema, OG, 404 real.

### Eliminar (después de verificar imports, dentro de esta rama)

- `html-to-image` de `package.json`.
- `src/assets/react.svg`, `src/assets/vite.svg`, `src/App.css`.
- Componentes sin uso: `CapabilitiesGrid`, `EcosystemTabs`, `FinalCTA`, `PricingCards`,
  `StatsCounter`, `TestimonialsCarousel`, `ParticlesBackground`.
- Contenido en inglés de `translations.js`.
- README genérico del starter.

### Prohibido

- Borrar componentes del dashboard sin revisar `App.jsx` y rutas privadas.
- Publicar métricas no verificadas (50+, 99.9%, 40%, 3x) ni testimonios ficticios.
- Tocar `main`; todo el rework vive en `rework/fleximy-website-v2`.
