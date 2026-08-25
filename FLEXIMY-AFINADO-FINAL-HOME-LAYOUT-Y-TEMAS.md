# FLEXIMY — AFINADO FINAL DEL HOME

## Revisión de producción, corrección de layout, rediseño de cards y paridad light/dark

Este documento es una instrucción de implementación para OpenCode. Debe trabajar sobre la versión actual de `https://fleximy.com/`, conservar su identidad visual y corregir el sistema de composición completo. No se busca agregar más contenido ni más efectos. Se busca que lo existente se vea preciso, espacioso, legible y profesional en todos los tamaños.

---

## 1. Diagnóstico neutral de la versión publicada

La dirección estética general es buena. La paleta, la tipografía, la oscuridad del fondo y la idea de mostrar website + app + dashboard ya construyen una identidad reconocible. El problema actual no es conceptual: es de layout, densidad y consistencia.

### Observaciones confirmadas

1. **El hero está demasiado comprimido en desktop medio.**
   - En un viewport aproximado de 1366 px, el contenedor útil mide cerca de 1280 px, pero incluye gutters laterales grandes.
   - La columna izquierda termina en aproximadamente 416 px.
   - El H1 se limita a unos 403 px y forma demasiadas líneas.
   - El botón principal mide cerca de 264 px. Junto al secundario ya no entra con comodidad y ambos se apilan.
   - Ampliar solamente el `max-width` global no alcanza: hay que cambiar la proporción de columnas, el ancho del copy, el tamaño fluido del H1 y la conducta de los CTAs.

2. **Las cuatro cards del módulo 2 no están técnicamente rotas, pero sí están sobrecargadas.**
   - En desktop medio, cada card ocupa alrededor de 712 px de ancho.
   - El copy y la escena visual compiten dentro de esa superficie.
   - Los pills, estados, etiquetas y paneles secundarios no tienen suficiente separación jerárquica.
   - El resultado se percibe como superposición aunque algunos elementos no se estén solapando geométricamente.

3. **El encabezado de rubros sí tiene `text-align: center`, pero eso no garantiza centrado visual.**
   - Su bloque de 860 px está centrado en la página, pero los saltos de línea, el ancho del párrafo y las cintas animadas generan una lectura desbalanceada.
   - La solución es una composición centrada coherente, no volver a aplicar `text-align:center` indiscriminadamente.

4. **El encabezado de FAQ también tiene texto centrado, pero el bloque está pegado al borde izquierdo del contenedor principal.**
   - El header mide aproximadamente 700 px y comienza en el gutter izquierdo.
   - Por eso el texto está centrado dentro de un bloque que no está centrado en la página.
   - Hay que usar `margin-inline:auto` y mantener el acordeón alineado a la izquierda.

5. **El formulario tiene una grilla válida, pero la proporción actual hace que el título sea una columna angosta y excesivamente vertical.**
   - La columna de copy ronda los 493 px, pero el H2 está limitado a aproximadamente 318 px.
   - Eso multiplica las líneas y deja aire muerto dentro de la columna.
   - El panel de formulario necesita una estructura interna y paddings constantes, no ajustes aislados por campo.

6. **La falta de versiones light reales es un problema de sistema.**
   - No debe resolverse invirtiendo colores ni bajando opacidad.
   - Cada demo, gráfico y panel necesita tokens semánticos para superficies, bordes, texto, sombras y acentos en ambos temas.

### Conclusión

Las observaciones del cliente son mayormente correctas. La única corrección importante es esta: varios títulos ya están técnicamente centrados. El defecto real es que sus contenedores no comparten un eje central claro. Hay que corregir geometría, no acumular reglas de alineación.

---

## 2. Objetivo de esta intervención

Al terminar:

- El hero debe leerse en menos de cinco segundos.
- El H1 no debe parecer una columna angosta.
- Los dos CTAs deben permanecer en una sola fila en desktop y tablet horizontal.
- Ningún gráfico del módulo 2 debe invadir o competir con el copy.
- Cada card debe comunicar una sola idea visual principal.
- Rubros y FAQ deben tener encabezados realmente centrados en la página.
- El formulario debe sentirse diseñado como un único componente.
- Light y dark mode deben tener la misma calidad.
- No debe existir overflow horizontal en ningún ancho.
- No se debe esconder un problema mediante `overflow:hidden` aplicado al body.

---

## 3. Regla general: corregir el sistema, no parchear cada pantalla

Crear un único sistema de contenedores:

```css
:root {
  --container-wide: 1480px;
  --container-main: 1280px;
  --container-copy: 760px;
  --page-gutter: clamp(20px, 4vw, 72px);
  --section-space: clamp(88px, 9vw, 152px);
  --section-space-compact: clamp(64px, 7vw, 112px);
  --grid-gap: clamp(28px, 4vw, 72px);
}

.container-wide,
.container-main {
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--page-gutter);
}

.container-wide { max-width: calc(var(--container-wide) + 2 * var(--page-gutter)); }
.container-main { max-width: calc(var(--container-main) + 2 * var(--page-gutter)); }
```

No mezclar contenedores Tailwind arbitrarios, `max-w-*` locales y gutters distintos dentro de la misma sección. El hero puede usar `container-wide`; el resto debe usar `container-main` salvo una razón explícita.

---

## 4. Hero — corrección completa de proporciones

### Qué conservar

- Copy actual.
- Demo WEB / APP / DASHBOARD.
- Fondo y lenguaje visual.
- Dos CTAs.
- Indicador “Website · App de gestión · Dashboard”.

### Qué cambiar

Usar una grilla más generosa:

```css
.hero__inner {
  display: grid;
  grid-template-columns: minmax(500px, 0.88fr) minmax(650px, 1.12fr);
  align-items: center;
  gap: clamp(48px, 5vw, 96px);
  min-height: calc(100svh - var(--header-height));
}

.hero__copy {
  width: 100%;
  max-width: 620px;
}

.hero h1 {
  max-width: 11.5ch;
  font-size: clamp(52px, 4.65vw, 82px);
  line-height: 0.96;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.hero__lead {
  max-width: 54ch;
  font-size: clamp(17px, 1.25vw, 20px);
  line-height: 1.55;
}

.hero__actions {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;
}

.hero__actions > * {
  width: auto;
  min-width: max-content;
}
```

### Comportamiento por breakpoint

- **≥ 1280 px:** grilla 42/58 aproximadamente, botones en fila.
- **1024–1279 px:** grilla 44/56, demo ligeramente reducida, botones en fila.
- **768–1023 px:** una columna; copy primero, demo debajo; botones en fila mientras entren.
- **< 640 px:** una columna; botones pueden apilarse y ocupar 100%.

No apilar CTAs en desktop por una clase genérica tipo `flex-wrap`. El wrap debe activarse solo bajo un breakpoint real.

### Restricciones del demo

```css
.hero__demo {
  width: min(100%, 820px);
  justify-self: end;
  min-width: 0;
  aspect-ratio: 16 / 10;
}
```

- Nada del demo debe salir de su caja.
- Las imágenes de producto pueden sobresalir dentro del frame visual, pero nunca fuera del contenedor del hero.
- Evitar elementos decorativos con offsets negativos mayores a 24 px.

---

## 5. Módulo 2 — rediseño de las cuatro cards

### Decisión de diseño

No convertir las cards en mini dashboards completos. Ese enfoque introduce demasiada información y repite la demostración del hero.

Cada card debe tener:

- un número y un título;
- un texto corto;
- una línea de beneficio;
- una única escena visual dominante;
- como máximo dos elementos secundarios.

### Layout de cards

```css
.pg-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.pg-panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(280px, 1.08fr);
  align-items: center;
  gap: clamp(24px, 3vw, 48px);
  min-height: 500px;
  padding: clamp(32px, 3.2vw, 52px);
  overflow: clip;
}

.pg-copy,
.pg-scene {
  position: relative;
  inset: auto;
  min-width: 0;
  z-index: 1;
}
```

Prohibido usar `.pg-scene { position:absolute; inset:0; }` cuando la misma card contiene copy. Solo los elementos decorativos internos de `.pg-scene` pueden ser absolutos.

### Card 01 · Tu web

Representar una web inmobiliaria simplificada:

- Una ventana browser clara.
- Una propiedad protagonista.
- Un botón de consulta.
- Dos estados pequeños: “Nueva consulta” y “Visita agendada”.

Eliminar pills sueltos flotando sobre el copy. Los estados deben vivir dentro del browser o en una bandeja lateral con espacio propio.

### Card 02 · Tus clientes

Representar una bandeja unificada:

- Lista corta de tres contactos.
- Conversación seleccionada.
- Un único badge “En seguimiento”.
- Un CTA pequeño “Agendar”.

No mostrar al mismo tiempo WhatsApp, formulario, reserva, pedido, historial, KPI y múltiples badges. La idea comercial es “todo llega al mismo lugar”, no “mirá cuántos componentes dibujamos”.

### Card 03 · Tu operación

Representar un flujo simple de tres columnas:

- Nuevo.
- En preparación.
- Listo.

Agregar solamente una alerta de stock y un avatar de responsable. El tablero debe ser entendible sin leer etiquetas pequeñas.

### Card 04 · Tus números

Representar un dashboard ejecutivo:

- Una cifra principal: ventas del mes.
- Una curva simple.
- Dos KPIs secundarios.
- Una recomendación automática breve.

No usar tres gráficos diferentes, donuts, barras y tablas simultáneamente.

### Versión mobile del módulo 2

```css
@media (max-width: 900px) {
  .pg-grid { grid-template-columns: 1fr; }
  .pg-panel { grid-template-columns: 1fr; min-height: auto; }
  .pg-scene { aspect-ratio: 16 / 10; }
}

@media (max-width: 640px) {
  .pg-panel { padding: 24px; }
  .pg-scene { aspect-ratio: 4 / 3; }
}
```

---

## 6. Encabezado “Una plataforma distinta para cada negocio”

Mantener el contenido, pero corregir su eje:

```css
.rib-header {
  width: min(100%, 920px);
  margin-inline: auto;
  padding-inline: 20px;
  text-align: center;
}

.rib-header > * {
  margin-inline: auto;
}

.rib-title {
  max-width: 18ch;
  text-wrap: balance;
}

.rib-intro {
  max-width: 62ch;
  text-wrap: pretty;
}
```

La eyebrow, el título y el párrafo deben compartir el mismo eje central. Dar al título un ancho menor que al párrafo ayuda a que el corte sea intencional.

Reducir el ruido de las marquesinas:

- máximo tres líneas;
- velocidad lenta y distinta por línea;
- contraste secundario;
- pausa de movimiento con `prefers-reduced-motion`;
- separación mínima de 48 px entre header y cintas.

---

## 7. Formulario “Empecemos por tu negocio”

### Problema actual

El formulario no necesita más decoración. Necesita una composición más clara. El H2 tiene un ancho artificialmente estrecho dentro de una columna que ya es limitada.

### Nueva grilla

```css
.cs-inner {
  display: grid;
  grid-template-columns: minmax(360px, 0.78fr) minmax(580px, 1.22fr);
  align-items: start;
  gap: clamp(56px, 7vw, 112px);
}

.cs-left {
  position: sticky;
  top: calc(var(--header-height) + 40px);
}

.cs-title {
  max-width: 13ch;
  font-size: clamp(42px, 4vw, 64px);
  line-height: 1.02;
  text-wrap: balance;
}

.cs-form {
  padding: clamp(28px, 4vw, 56px);
  border-radius: 28px;
}
```

### Reglas internas

- Dos campos por fila solo cuando cada campo conserve al menos 260 px.
- Altura uniforme de inputs: 54 px.
- Separación vertical entre grupos: 22–28 px.
- Chips de necesidades con `display:flex; flex-wrap:wrap; gap:10px`.
- Ningún chip debe cortarse ni tener altura variable por falta de ancho.
- Textarea mínimo 140 px.
- CTA final ancho completo.
- El texto legal y la microcopy final deben alinearse con el CTA.

### Responsive

- Bajo 1024 px: grilla de una columna y quitar `sticky`.
- Bajo 640 px: todos los campos en una columna, padding de panel 22 px.

---

## 8. FAQ — centrado correcto

No centrar preguntas ni respuestas. Solo el encabezado.

```css
.faq-header {
  width: min(100%, 760px);
  margin-inline: auto;
  text-align: center;
}

.faq-title {
  text-wrap: balance;
}

.faq-list {
  width: min(100%, 960px);
  margin: clamp(48px, 6vw, 80px) auto 0;
  text-align: left;
}
```

Esto corrige la percepción actual: el texto ya estaba centrado, pero dentro de un bloque ubicado a la izquierda.

---

## 9. Paridad real entre light y dark mode

### Tokens obligatorios

```css
:root,
[data-theme="light"] {
  --ui-canvas: #f6f7fb;
  --ui-surface-1: #ffffff;
  --ui-surface-2: #eef1f8;
  --ui-surface-3: #e6eaf4;
  --ui-border: rgba(26, 31, 54, 0.12);
  --ui-border-strong: rgba(26, 31, 54, 0.2);
  --ui-text: #121527;
  --ui-muted: #687088;
  --ui-shadow: 0 24px 70px rgba(33, 40, 78, 0.14);
  --ui-glow: rgba(105, 89, 255, 0.18);
}

[data-theme="dark"] {
  --ui-canvas: #090b18;
  --ui-surface-1: #111526;
  --ui-surface-2: #171c31;
  --ui-surface-3: #202640;
  --ui-border: rgba(170, 180, 225, 0.14);
  --ui-border-strong: rgba(170, 180, 225, 0.24);
  --ui-text: #f5f6ff;
  --ui-muted: #a6aec8;
  --ui-shadow: 0 28px 90px rgba(0, 0, 0, 0.38);
  --ui-glow: rgba(115, 96, 255, 0.25);
}
```

### Componentes que deben migrarse a tokens

- Hero demo y sus tres vistas.
- Las cuatro escenas del módulo 2.
- Diagrama de proceso del módulo 3.
- Cintas de rubros.
- Formulario y todos sus estados.
- FAQ.
- Footer.

### Qué evitar

- `filter: invert()`.
- Aplicar `opacity` al contenedor completo.
- Conservar fondos navy en light mode porque “es un dashboard”.
- Texto gris claro sobre blanco.
- Bordes blancos en light mode.
- Sombras negras duras.

Los dashboards pueden seguir siendo oscuros en light mode solo si se presentan explícitamente como una captura de producto encerrada en un frame. En ese caso, el frame, la sombra y el entorno sí deben adaptarse al tema claro.

---

## 10. Movimiento y robustez

- Animar solamente `transform`, `opacity` y variables CSS eficientes.
- No animar tamaños de grilla, `width`, `height`, `top` o `left` durante scroll.
- Las escenas de cards no deben depender de hover para comprenderse.
- Mantener microanimaciones de 180–320 ms.
- Entradas por scroll: desplazamiento máximo 24 px.
- Evitar pinning largo y stacked cards.
- Respetar `prefers-reduced-motion: reduce`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 11. Pruebas obligatorias

Verificar manualmente en:

- 1920 × 1080.
- 1440 × 900.
- 1366 × 768.
- 1024 × 768.
- 768 × 1024.
- 390 × 844.
- 360 × 800.

En cada viewport, probar light y dark.

### Checklist visual

- [ ] El H1 del hero no supera cuatro líneas en 1366 px.
- [ ] En 1440 px o más, idealmente ocupa tres líneas.
- [ ] Los CTAs están en fila desde 768/900 px en adelante, según espacio real.
- [ ] El demo no sale del viewport.
- [ ] Ninguna card tiene pills flotando sobre el copy.
- [ ] Ninguna escena usa `position:absolute; inset:0` sobre toda la card.
- [ ] Rubros está centrado óptica y geométricamente.
- [ ] FAQ header está centrado; acordeón permanece alineado a la izquierda.
- [ ] Formulario no tiene campos o chips cortados.
- [ ] No existe scroll horizontal.
- [ ] No hay saltos de layout al cambiar de tema.
- [ ] Todos los gráficos son legibles en light mode.
- [ ] No hay warnings ni errores en consola.

---

## 12. Orden de implementación

1. Unificar tokens y contenedores.
2. Corregir hero y CTAs.
3. Simplificar y reconstruir las cuatro cards.
4. Centrar geométricamente rubros y FAQ.
5. Rehacer la grilla y paddings del formulario.
6. Implementar paridad light/dark por componente.
7. Revisar responsive en todos los breakpoints.
8. Ejecutar QA visual y corregir regresiones.

No avanzar agregando nuevas secciones, copy, dashboards o efectos hasta que esta lista esté completa.

---

## 13. Prompt directo para OpenCode

Implementá un afinado integral del Home actual de Fleximy siguiendo exactamente este documento. Conservá el contenido, la identidad visual, la paleta, la estructura narrativa y los componentes conceptuales existentes. No hagas otro rework estético ni agregues módulos.

La prioridad es corregir el sistema de layout: hero más ancho y equilibrado, CTAs en una fila en desktop, H1 menos vertical, cuatro cards del módulo 2 simplificadas y sin superposiciones, encabezados de rubros y FAQ centrados geométricamente, formulario con paddings y grilla consistentes, y paridad visual completa entre light y dark mode.

Antes de editar, inspeccioná las clases existentes y reutilizá los componentes cuando sea seguro. Si una regla actual produce solapamientos o limita artificialmente el ancho —por ejemplo escenas absolutas sobre una card completa, `max-width` locales contradictorios o `flex-wrap` prematuro— reemplazala por una solución estructural.

No tapes overflow con `body { overflow-x:hidden }`. No reduzcas todo indiscriminadamente. No agregues más pills, badges o microinterfaces. La calidad debe venir de la composición, la jerarquía y la precisión.

Al finalizar, verificá 1920, 1440, 1366, 1024, 768, 390 y 360 px en ambos temas. Entregá un resumen de archivos modificados, decisiones tomadas y checklist de validación.

---

## Criterio final

La web ya tiene una buena idea y una identidad fuerte. Para llegar a una terminación realmente profesional no necesita más espectáculo: necesita menos densidad, mejores proporciones y un sistema visual coherente. El objetivo de esta pasada es que nada parezca accidental.
