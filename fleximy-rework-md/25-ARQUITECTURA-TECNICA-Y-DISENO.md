# Arquitectura técnica y sistema de diseño

## Objetivo

Definir una base consistente para desarrollar todas las páginas sin convertir el sitio en una colección repetitiva de componentes genéricos.

## Capas del proyecto

```text
Website público
├── Layout global
├── Páginas comerciales
├── Soluciones por industria
├── Demos públicas aisladas
└── Formularios y analítica

Área privada
├── Autenticación
├── Dashboard
├── Supabase
└── Herramientas internas
```

La carga pública no debe depender del estado de Supabase.

## Estructura sugerida

```text
src/
  app/
    routes.jsx
    seo.jsx
  components/
    global/
    navigation/
    ui/
    motion/
    dashboards/
    demos/
  data/
    navigation.js
    industries.js
    faqs.js
  layouts/
    PublicLayout.jsx
    DashboardLayout.jsx
  pages/
    public/
    solutions/
    legal/
    dashboard/
  styles/
    tokens.css
    global.css
    motion.css
  lib/
    supabase.js
    analytics.js
```

No es obligatorio mover todo de inmediato. La migración puede realizarse por fases.

## Tokens visuales

Definir variables CSS para:

- Fondo oscuro principal.
- Fondo claro cálido.
- Texto primario.
- Texto secundario.
- Líneas y bordes.
- Acento principal Fleximy.
- Acentos por industria.
- Espaciado.
- Radios.
- Sombras.
- Anchos máximos.
- Duraciones y curvas de movimiento.

Ejemplo conceptual:

```css
:root {
  --color-ink: #151714;
  --color-paper: #f4f3ee;
  --color-paper-bright: #fafaf7;
  --color-accent: #c8ff3d;
  --color-cyan: #52d6d1;
  --color-line: rgba(21, 23, 20, 0.14);
  --content-max: 1280px;
  --motion-fast: 180ms;
  --motion-base: 500ms;
}
```

Los valores finales pueden ajustarse después del primer QA visual.

## Tipografía

- Sans variable para UI y lectura.
- Display opcional para acentos editoriales.
- Máximo dos familias.
- Escala fluida mediante `clamp()`.
- Cuerpo limitado a 60–70 caracteres.
- Titulares con cortes de línea diseñados.
- Fallback seguro si falla la fuente.

## Componentes globales

### Header

- Integrado al hero al inicio.
- Fondo sólido al hacer scroll.
- Mega menú de Soluciones.
- CTA persistente.
- Menú mobile accesible.

### Footer

- Propuesta resumida.
- Navegación completa.
- Contacto.
- Legales.
- Ubicación real cuando se valide.

### Botones

- Primario.
- Secundario.
- Texto.
- Estados hover, focus, active y disabled.
- Área mínima 44 px.

### Encabezado de sección

- Índice pequeño.
- Kicker técnico.
- Titular editorial.
- Texto opcional.

No usar este patrón de manera idéntica en todas las secciones.

## Dashboards CSS

Crear primitives reutilizables:

- `DashboardShell`.
- `DashboardSidebar`.
- `MetricCard`.
- `StatusBadge`.
- `DataTable`.
- `ActivityFeed`.
- `CalendarGrid`.
- `KanbanColumn`.
- `ProductRow`.
- `PropertyCard`.
- `OrderTimeline`.
- `CourseProgress`.

Cada solución combina primitives, pero conserva una escena específica.

## Acentos por solución

- Gastronomía: ámbar controlado.
- Turnos: cian.
- Gestión: verde menta.
- Comercio: violeta.
- Inmobiliaria: rosa o coral sobrio.
- Educación: azul.
- Talleres: naranja técnico.

La marca principal sigue siendo dominante. Los acentos no deben convertir cada página en una identidad separada.

## Arquitectura de motion

### GSAP

- Hero reveal.
- ScrollTrigger.
- Cambio de estados de dashboards.
- Pin controlado.
- Secuencias de proceso.

### Framer Motion

- Menús.
- Acordeones.
- Modal de demo.
- Transiciones de ruta.
- Estados React simples.

### CSS

- Hover.
- Focus.
- Pequeños loaders.
- Transiciones de color.

## Reduced motion

Cuando `prefers-reduced-motion: reduce`:

- No usar pins.
- No utilizar parallax.
- Mostrar estados finales.
- Mantener transiciones menores a lo necesario.
- Evitar desplazamientos grandes.

## SEO técnico

- Gestión por página de title y description.
- Canonical.
- Open Graph.
- Twitter Card.
- Schema.
- Sitemap.
- Robots.
- 404.
- Enlaces internos.

## Analítica

Eventos mínimos:

- Click CTA diagnóstico.
- Click WhatsApp.
- Demo iniciada.
- Demo completada.
- Rubro seleccionado.
- Vista Sitio/Panel.
- Formulario iniciado.
- Formulario enviado.
- Agenda confirmada.

No cargar analítica sin revisar consentimiento aplicable.

## Rendimiento

- Lazy loading por rutas.
- Supabase solo en área privada.
- CSS crítico limitado.
- Fuentes optimizadas.
- SVG en lugar de video cuando sea suficiente.
- Imágenes responsive.
- Pausar animaciones fuera de viewport.
- Medir mobile medio, no solo desktop potente.

