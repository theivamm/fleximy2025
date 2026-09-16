# FLEXIMY — REVISIÓN DEFINITIVA DE `/soluciones/web`

## Instrucción principal para OpenCode

Implementá este documento completo sobre la página existente:

`/soluciones/web`

Esta tarea es una **corrección integral de producción**, no un rediseño conceptual y no una nueva exploración estética.

La dirección visual actual de Fleximy está aprobada. Deben conservarse:

- El fondo oscuro y su versión light.
- La identidad violeta, azul, cyan y rosa.
- Los gradientes de marca.
- La tipografía y el tono general.
- El concepto comercial `Web + App + Dashboard`.
- El hero gastronómico y sus tres vistas.
- La historia y el orden general de la página.
- Los textos existentes, salvo las correcciones expresamente indicadas aquí.
- El módulo global de contacto por WhatsApp.

El objetivo es que la página deje de sentirse experimental o frágil y pase a verse como un producto digital terminado, preciso, ágil y profesional.

No agregues testimonios, logos de clientes, métricas inventadas, portfolio ni evidencia comercial. Esa etapa queda fuera de este trabajo.

---

# 1. PRIORIDADES OBLIGATORIAS

Trabajar en este orden:

1. Eliminar cualquier CSS o código fuente que se esté renderizando como texto.
2. Eliminar desbordes horizontales en toda la página.
3. Reconstruir la adaptación mobile en **una única columna real**.
4. Corregir la escala, el ancho y la altura del hero.
5. Simplificar y estabilizar el módulo `Web + App + Dashboard`.
6. Revisar todos los espacios, contenedores y alineaciones.
7. Hacer coherentes las versiones dark y light.
8. Revisar accesibilidad, movimiento reducido y navegación por teclado.
9. Verificar visualmente en todos los tamaños definidos al final.

No empieces agregando animaciones. Primero debe quedar perfecta la composición estática.

---

# 2. ERROR TÉCNICO CRÍTICO: CSS VISIBLE EN EL HTML

En el módulo 02 aparece contenido similar a:

```css
/* ===== MODULE 02 ===== */
.m02 {
  position: relative;
  ...
}
```

Ese CSS está siendo interpretado como contenido textual dentro del documento.

## Corrección obligatoria

- Buscar el origen exacto del bloque.
- Mover esos estilos a la hoja de estilos, CSS Module, styled component o sistema de estilos que ya utilice el proyecto.
- No ocultarlo con `display: none`, `font-size: 0`, `visibility: hidden`, posiciones negativas ni hacks similares.
- No dejar CSS como string dentro del JSX.
- No utilizar `<style>` dentro del contenido del módulo salvo que la arquitectura existente lo requiera de manera justificada.
- Comprobar que el texto del CSS no aparezca en el DOM visible, en la selección de texto ni en el contenido que interpretan lectores de pantalla.

Este punto debe resolverse antes de modificar el layout.

---

# 3. SISTEMA GENERAL DE CONTENEDORES

La página debe utilizar un único criterio de alineación horizontal.

## Contenedor principal

```css
--page-max: 1440px;
--page-gutter: clamp(20px, 4vw, 72px);
--section-space: clamp(88px, 10vw, 160px);
```

Aplicar una clase reutilizable equivalente a:

```css
.page-container {
  width: min(100% - (var(--page-gutter) * 2), var(--page-max));
  margin-inline: auto;
}
```

## Reglas

- Header, hero y módulos deben compartir los mismos bordes ópticos.
- Ningún contenido principal debe pegarse al viewport.
- No usar anchos diferentes de manera arbitraria en cada sección.
- Los fondos decorativos pueden ocupar todo el viewport, pero su contenido debe quedar dentro del contenedor.
- No utilizar `100vw` en elementos interiores. Usar `width: 100%`.
- No compensar alineaciones mediante márgenes negativos.
- No posicionar contenido estructural con coordenadas absolutas.
- `position: absolute` queda reservado para decoración que no afecte el flujo.

## Anchuras por viewport

- Más de 1600 px: contenido máximo 1440 px.
- 1280–1599 px: gutter de 48–64 px.
- 1024–1279 px: gutter de 32–40 px.
- 768–1023 px: gutter de 28–32 px.
- Menos de 768 px: gutter de 20 px.
- Menos de 390 px: gutter de 16 px.

---

# 4. REGLA GLOBAL DE MOBILE: UNA SOLA COLUMNA

Esta regla es obligatoria y debe aplicarse a **todos los módulos** por debajo de `768px`.

```css
@media (max-width: 767px) {
  .section-layout,
  .hero-layout,
  .feature-layout,
  .process-layout,
  .industry-layout,
  .contact-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
}
```

## Qué significa una columna real

- Texto, visual, tarjetas, controles y CTA se apilan verticalmente.
- Ningún módulo mantiene dos columnas comprimidas.
- Ninguna demo queda a la derecha del texto.
- Ningún elemento se desplaza fuera del viewport para simular una composición desktop.
- Ninguna imagen o interfaz debe usar un ancho intrínseco mayor al contenedor.
- Todas las tarjetas ocupan `width: 100%`.
- Todo hijo directo de grid o flex debe poder contraerse con `min-width: 0`.
- Los textos largos deben envolver normalmente.
- Las filas de chips deben envolver o convertirse en scroll interno claramente controlado; nunca agrandar el documento.

## Reset de seguridad

Aplicar donde corresponda:

```css
html,
body,
#root {
  width: 100%;
  max-width: 100%;
}

body {
  overflow-x: clip;
}

img,
svg,
video,
canvas {
  display: block;
  max-width: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.grid-child,
.flex-child {
  min-width: 0;
}
```

`overflow-x: clip` es una protección final, no una solución para esconder elementos mal dimensionados. Primero corregir la causa de cada overflow.

---

# 5. HEADER

## Desktop

- Altura visual aproximada: 72–80 px.
- Logo alineado con el contenedor principal.
- Navegación centrada sin separaciones exageradas.
- Theme switch y CTA alineados a la derecha.
- No aumentar nuevamente el tamaño del header.

## Mobile

- Altura: 64–68 px.
- Mostrar isotipo de Fleximy a la izquierda.
- Mostrar switch de tema compacto y botón de menú a la derecha.
- El CTA principal no debe quedar comprimido dentro de la barra.
- Llevar el CTA al menú desplegable si no entra con comodidad.
- El menú móvil debe abrir un panel claro y estable; no una lista flotante angosta.
- Mantener targets táctiles mínimos de `44 × 44 px`.
- Bloquear correctamente el scroll del body mientras el menú está abierto.

---

# 6. HERO — AJUSTE DEFINITIVO

## Objetivo

El hero debe mostrar la promesa y la demostración sin obligar al usuario desktop a desplazarse para entender la propuesta. En mobile debe narrarse en el orden natural: texto primero, demostración después.

## Desktop, desde 1200 px

Usar una grilla estable:

```css
.hero-layout {
  display: grid;
  grid-template-columns: minmax(390px, 0.82fr) minmax(600px, 1.18fr);
  gap: clamp(48px, 6vw, 96px);
  align-items: center;
}
```

- El hero no debe comenzar demasiado lejos del header.
- Separación superior desde el final del header: 56–88 px.
- Altura mínima útil: `calc(100svh - var(--header-height))`.
- No forzar `height: 100vh` si corta el contenido.
- H1 máximo aproximado: 5 líneas en desktop.
- H1 con `font-size: clamp(56px, 5vw, 82px)` y `line-height: 0.96–1.02`.
- Texto descriptivo con máximo de 560 px y 18–20 px.
- Los dos CTA deben permanecer en una misma fila desde 1024 px, siempre que entren.
- No permitir que los botones se transformen en una columna en desktop.

## Tablet, 768–1199 px

- Cambiar a una columna desde el momento en que la demo ya no pueda conservar al menos 560 px útiles.
- No comprimir artificialmente dos columnas.
- Texto primero y demo después.
- H1 máximo 64 px.
- Demo centrada con ancho máximo de 900 px.

## Mobile, menos de 768 px

Orden exacto:

1. Eyebrow `MÁS QUE UNA WEB`.
2. H1.
3. Descripción.
4. CTA principal.
5. CTA secundario.
6. Leyenda `Web · App · Dashboard · Todo conectado`.
7. Demo visual.

Especificaciones:

```css
.hero-layout {
  grid-template-columns: minmax(0, 1fr);
  gap: 40px;
}

.hero-actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
}

.hero-demo {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}
```

- H1: `clamp(42px, 12vw, 58px)`.
- Line-height: `0.98–1.04`.
- Párrafo: 17–18 px, line-height 1.55.
- Botones a todo el ancho.
- Alto mínimo de cada botón: 52 px.
- No centrar el texto: mantener alineación izquierda.
- No cortar manualmente las líneas con `<br>` pensados para desktop.
- El visual debe aparecer completo debajo del texto.

## Demo Web / App / Dashboard

- Conservar las tres vistas.
- El marco completo debe usar `aspect-ratio: 16 / 10` o una relación consistente cercana.
- No permitir barras de desplazamiento horizontales.
- No cortar navegación, botones ni productos.
- Para mobile no intentar mostrar cada microtexto con el mismo tamaño que desktop.
- Crear una variante responsiva real del mockup: simplificar contenido secundario manteniendo la idea principal.
- Las tabs WEB, APP y DASHBOARD deben permanecer visibles arriba del mockup.
- Pueden ser tocadas y deben cambiar de estado correctamente.
- El autoplay puede cambiar la vista cada 5–6 segundos.
- Si el usuario toca una tab, pausar el autoplay al menos 10 segundos.
- Incluir indicador de progreso discreto.
- No reiniciar animaciones de forma brusca.
- No simular un cursor en mobile.

## Botones internos del mockup

No dejar controles engañosos.

- Si un botón tiene una acción demostrable, implementarla.
- Si no tiene una acción, renderizarlo como elemento visual sin semántica de botón, sin hover y sin cursor pointer.
- No llenar la demo con interacciones inconclusas.
- El objetivo es comunicar las tres capas del producto, no construir una aplicación completa dentro del hero.

## Notificación flotante

- No dejar una tarjeta flotante fuera del marco y cerca del borde inferior del viewport.
- Integrar la notificación dentro del mockup.
- Debe aparecer y desaparecer suavemente sin cambiar el layout.
- En mobile puede eliminarse si resta legibilidad.

---

# 7. MÓDULO 02 — WEB + APP + DASHBOARD

## Objetivo

Explicar las tres capas del producto sin repetir la demostración del hero y sin crear una experiencia difícil de navegar.

## Estructura desktop

Conservar el encabezado:

`Tu web vende. Tu aplicación organiza. Tu dashboard te muestra qué sigue.`

Debajo usar tres paneles de igual jerarquía:

1. Website público.
2. Aplicación de gestión.
3. Dashboard y decisiones.

Distribución desde 1100 px:

```css
.platform-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}
```

Cada panel debe contener:

- Número pequeño.
- Título breve.
- Una sola frase explicativa.
- Un visual CSS propio y simple.
- Una consecuencia comercial de una línea.

No convertir cada panel en una miniapp completa. Ya existe una demo principal en el hero.

## Dirección visual de los tres paneles

### 01 — Website público

Visual CSS:

- Marco de navegador pequeño.
- Cabecera comercial.
- Hero sintético.
- CTA visible.
- Tres tarjetas de producto o servicio.

Debe transmitir: `tu negocio se presenta y convierte`.

### 02 — Aplicación de gestión

Visual CSS:

- Sidebar compacta.
- Lista de pedidos, consultas o turnos.
- Dos estados claramente diferenciados.
- Pequeña notificación de actividad.

Debe transmitir: `todo el trabajo diario vive en un solo lugar`.

### 03 — Dashboard

Visual CSS:

- Tres KPI.
- Un gráfico sencillo.
- Un bloque de alertas o prioridades.
- No más de cuatro colores de datos.

Debe transmitir: `podés entender qué pasa y decidir qué sigue`.

## Mobile

Los tres paneles deben convertirse en una lista vertical. No carrusel.

Orden:

1. Website.
2. Aplicación.
3. Dashboard.

```css
.platform-grid {
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
}
```

- Cada panel debe ocupar todo el ancho.
- El texto debe aparecer antes del visual dentro de cada panel.
- Padding interno: 20–24 px.
- Visual con relación aproximada 4:3.
- No usar scroll lateral, snapping, cards apiladas ni sticky.
- No ocultar paneles detrás de tabs.
- El usuario debe comprender los tres conceptos mediante scroll normal.

---

# 8. MÓDULO DE COSTO

Mantener el mensaje de accesibilidad económica sin sugerir que el servicio es barato o genérico.

## Desktop

- Dos columnas equilibradas solamente cuando exista espacio real.
- Título y explicación a la izquierda.
- Beneficios o esquema de inversión a la derecha.
- Evitar una caja blanca o violeta excesivamente grande.

## Mobile

Una sola columna:

1. Eyebrow.
2. Título.
3. Explicación.
4. Beneficios.
5. CTA.

- Los beneficios deben ser tres filas, no tres columnas comprimidas.
- Quitar decoraciones que obliguen a aumentar la altura.
- No utilizar texto menor a 15 px.

---

# 9. PROCESO — SIMPLIFICAR SIN PERDER IDENTIDAD

La sección actual es demasiado extensa para una idea que puede comprenderse rápidamente.

Conservar solamente tres etapas:

1. Entendemos tu negocio.
2. Diseñamos la plataforma.
3. La ponemos en marcha.

## Desktop

- Encabezado centrado con máximo de 900 px.
- Tres pasos en una grilla horizontal desde 1024 px.
- Una línea o gradiente puede conectar visualmente los pasos.
- El gráfico central `Tu negocio → Fleximy → Tu plataforma` debe ser una composición compacta, no otra aplicación compleja.

## Mobile

- Una sola columna.
- Encabezado alineado a la izquierda.
- Gráfico conceptual apilado verticalmente.
- Pasos en orden natural, uno debajo del otro.
- No utilizar línea de tiempo sticky.
- No revelar un paso a la vez bloqueando el scroll.
- No dejar contenido semitransparente esperando una animación.
- Separación entre pasos: 20–24 px.

Reducir la altura total de este módulo aproximadamente un 25–30 % respecto de la versión actual.

---

# 10. SOLUCIONES POR RUBRO

## Objetivo

Mostrar adaptación sin convertir la sección en un catálogo interminable.

## Desktop

- Encabezado centrado correctamente mediante un contenedor, no con espacios manuales.
- Máximo de texto: 780 px.
- Rubros en una grilla de tarjetas compactas.
- Cada tarjeta debe tener icono, nombre y tres capacidades como máximo.
- Evitar dashboards nuevos dentro de cada rubro.

## Mobile

- Encabezado alineado a la izquierda.
- Una tarjeta por fila.
- No usar carrusel horizontal.
- No usar tabs que reemplacen contenido fuera del viewport.
- Mostrar inicialmente cuatro rubros y un botón accesible `Ver más soluciones` para revelar el resto dentro del flujo.
- El botón debe actualizar `aria-expanded`.

## Posicionamiento de las soluciones

Presentar la oferta bajo una lógica común:

- **Web + App:** presencia y administración completa.
- **NFC:** interacción rápida con el cliente.
- **Fidelización:** recurrencia y conocimiento del cliente.

No presentar estas soluciones como experimentos aislados. Deben sentirse como diferentes formas de mejorar la relación entre el negocio, su operación y sus clientes.

---

# 11. FAQ

## Desktop

- Encabezado centrado con `text-align: center` y `margin-inline: auto`.
- Ancho máximo: 760–840 px.
- Acordeón máximo: 900 px.
- Filas con altura cómoda y separación consistente.

## Mobile

- Encabezado alineado a la izquierda.
- Acordeón a todo el ancho.
- Padding por pregunta: 18–20 px.
- Icono expandir/contraer siempre visible.
- Respuesta con 16 px y line-height mínimo 1.55.
- Solo una pregunta abierta por vez, salvo que la implementación actual tenga una razón clara para permitir varias.
- La apertura no debe producir saltos bruscos ni hacer desaparecer el foco.

---

# 12. MÓDULO GLOBAL DE WHATSAPP

Mantener el componente global, pero asegurar que funcione como cierre de conversión y no como otra demostración tecnológica.

## Contenido

- Mensaje directo.
- Una frase aclaratoria.
- CTA principal a WhatsApp.
- Número: `+54 9 11 6112 0433`.
- Enlace técnico: `https://wa.me/5491161120433`.

## Desktop

- Puede utilizar una composición de dos columnas.
- El elemento visual no debe competir con el CTA.

## Mobile

Orden obligatorio:

1. Mensaje.
2. Aclaración.
3. CTA de WhatsApp.
4. Visual decorativo.

- Una sola columna.
- Botón a todo el ancho.
- No mostrar chat falso con textos diminutos.
- No superponer burbujas sobre el texto.
- Reducir o eliminar efectos reactivos al mouse, porque no existen en touch.

---

# 13. FOOTER

## Mobile

- Una sola columna real.
- Logo y claim primero.
- Enlaces agrupados en acordeones o bloques verticales.
- CTA o datos de contacto antes de legales.
- No utilizar cuatro columnas comprimidas.
- Separación vertical mínima de 28 px entre grupos.
- Todos los enlaces deben tener al menos 44 px de área táctil o suficiente espacio entre sí.

---

# 14. DARK MODE Y LIGHT MODE

Todo componente nuevo o corregido debe tener ambas versiones. No alcanza con invertir el fondo general.

Definir tokens semánticos:

```css
:root {
  --bg: #f6f7fb;
  --surface-1: #ffffff;
  --surface-2: #eef1f8;
  --text-1: #0c1020;
  --text-2: #586076;
  --border: rgba(20, 30, 60, 0.12);
  --shadow: 0 24px 70px rgba(30, 40, 80, 0.12);
}

[data-theme='dark'] {
  --bg: #070a18;
  --surface-1: #0d1124;
  --surface-2: #121831;
  --text-1: #f7f8ff;
  --text-2: #aeb6ce;
  --border: rgba(170, 185, 255, 0.14);
  --shadow: 0 28px 90px rgba(0, 0, 0, 0.38);
}
```

## Reglas

- No usar textos grises con contraste insuficiente en light.
- No mantener fondos casi negros dentro de tarjetas light sin una intención clara.
- Gráficos, ejes, labels, tabs y estados deben cambiar de tema.
- Los mockups pueden conservar identidad propia, pero su marco exterior debe integrarse con el tema.
- Comprobar contraste WCAG AA para textos funcionales.
- Persistir la selección del usuario.
- Respetar inicialmente `prefers-color-scheme`.
- Evitar flash de tema incorrecto al cargar.

---

# 15. ANIMACIONES

La sofisticación debe surgir de la precisión, no de la cantidad de movimiento.

## Permitido

- Apariciones con opacidad y desplazamiento máximo de 16–24 px.
- Gradientes ambientales lentos.
- Cambios suaves entre vistas del hero.
- Barras de KPI o gráficos que se dibujan una sola vez.
- Hover de 2–4 px en tarjetas desktop.
- Brillos localizados y sutiles.

## Prohibido

- Stack cards.
- Scroll hijacking.
- Secciones sticky largas en mobile.
- Parallax intenso.
- Elementos que sigan el mouse sobre textos o botones.
- Cursor personalizado.
- Inclinación 3D en dispositivos táctiles.
- Animaciones infinitas llamativas.
- Contenido fundamental oculto hasta que GSAP lo active.
- Transformaciones que provoquen overflow.

## Movimiento reducido

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

La página debe quedar completa y comprensible con JavaScript desactivado o antes de ejecutar animaciones.

---

# 16. TIPOGRAFÍA Y ESCALA

## Reglas generales

- Evitar títulos gigantes que ocupen casi toda la pantalla.
- No usar más de dos tamaños de título dominantes dentro del mismo viewport.
- No justificar texto.
- No crear saltos mediante espacios, `&nbsp;` o múltiples `<br>`.
- Controlar el ancho con `max-width` y `text-wrap: balance` en títulos.
- Usar `text-wrap: pretty` en párrafos cuando sea compatible.

Escala sugerida:

```css
--display: clamp(48px, 5.4vw, 84px);
--h2: clamp(36px, 4vw, 64px);
--h3: clamp(26px, 2.4vw, 38px);
--body-lg: clamp(18px, 1.4vw, 21px);
--body: 16px;
--small: 14px;
```

En mobile:

- H1: 42–58 px.
- H2: 34–44 px.
- H3: 26–32 px.
- Body: mínimo 16 px.
- Microcopy: mínimo 12 px solo dentro de mockups; nunca para información comercial esencial.

---

# 17. HTML Y ACCESIBILIDAD

- Utilizar un solo `<h1>`.
- Mantener jerarquía real `h1 → h2 → h3`.
- No usar `<section>` para pequeños componentes internos que no constituyen una región temática.
- Cada sección principal debe tener un encabezado accesible.
- Tabs del hero con `role="tablist"`, `role="tab"`, `aria-selected` y paneles relacionados.
- Botones deben ser `<button>` y enlaces de navegación deben ser `<a>`.
- No aplicar `cursor: pointer` a elementos sin acción.
- Mantener foco visible.
- Permitir operar tabs, acordeones, theme switch y menú con teclado.
- Decoraciones deben llevar `aria-hidden="true"`.
- No poner textos comerciales importantes dentro de SVG o canvas.

---

# 18. PERFORMANCE

- No incorporar nuevas librerías para resolver layouts que CSS puede resolver.
- Evitar múltiples listeners de mouse por componente.
- Usar `transform` y `opacity` para animaciones.
- Lazy-load de contenido bajo el fold.
- Reservar dimensiones de imágenes y mockups para evitar CLS.
- No cargar tres demos pesadas simultáneamente si solo una está visible.
- Evitar blur gigantes en mobile; reducir radios y cantidad de capas.
- Revisar que el cambio de tema no repinte innecesariamente todos los gráficos.

Objetivos mínimos:

- Sin desplazamiento horizontal.
- CLS menor a 0.1.
- LCP razonable en red móvil.
- Ningún error en consola provocado por la página.
- Ningún warning de claves React faltantes.

---

# 19. QUÉ NO HACER

No hacer ninguna de estas cosas:

- No rehacer el branding.
- No cambiar la paleta principal.
- No reemplazar el hero con otro concepto.
- No agregar imágenes de stock de personas.
- No agregar evidencia inventada.
- No escribir textos nuevos largos.
- No sumar más módulos.
- No crear nuevas miniapps complejas.
- No usar cards apiladas.
- No utilizar scroll horizontal como navegación principal.
- No mantener dos columnas por debajo de 768 px.
- No ocultar overflows para disimular un layout roto.
- No usar tamaños fijos de 1920 px dentro de la web.
- No usar `left`, `right` o `translateX` arbitrarios para acomodar contenido.
- No dejar botones falsos.
- No sacrificar legibilidad para mostrar más detalles en los mockups.
- No cambiar los textos aprobados salvo errores ortográficos o instrucciones expresas de este documento.

---

# 20. MATRIZ DE VERIFICACIÓN OBLIGATORIA

Revisar manualmente la página completa en:

| Dispositivo | Viewport |
|---|---:|
| Mobile pequeño | 320 × 568 |
| iPhone estándar | 390 × 844 |
| Mobile grande | 430 × 932 |
| Tablet vertical | 768 × 1024 |
| Tablet horizontal | 1024 × 768 |
| Laptop | 1366 × 768 |
| Desktop | 1440 × 900 |
| Full HD | 1920 × 1080 |

En cada viewport verificar dark y light mode.

## Checklist visual

- [ ] No existe scroll horizontal en `html`, `body` ni `#root`.
- [ ] En mobile todos los módulos están en una sola columna.
- [ ] Ningún texto, botón, chip o visual sale del viewport.
- [ ] El header no tapa el contenido al navegar por anclas.
- [ ] El hero comienza a una distancia razonable del header.
- [ ] El H1 no domina excesivamente la pantalla.
- [ ] Los CTA se ven completos.
- [ ] La demo del hero conserva sus bordes completos.
- [ ] WEB, APP y DASHBOARD cambian correctamente.
- [ ] No hay botones visualmente activos sin función.
- [ ] El módulo 02 no muestra CSS como texto.
- [ ] Las tres capas se comprenden sin interactuar.
- [ ] El proceso no se siente interminable.
- [ ] Los encabezados centrados están centrados realmente.
- [ ] Las versiones light de gráficos y módulos son legibles.
- [ ] FAQ, menú y tabs funcionan con teclado.
- [ ] WhatsApp abre el número correcto.
- [ ] No hay errores ni warnings relevantes en consola.

## Comprobación técnica de overflow

Ejecutar temporalmente en desarrollo:

```js
const offenders = [...document.querySelectorAll('*')].filter((element) => {
  const rect = element.getBoundingClientRect();
  return rect.left < -1 || rect.right > document.documentElement.clientWidth + 1;
});

console.table(
  offenders.map((element) => ({
    tag: element.tagName,
    class: element.className,
    left: element.getBoundingClientRect().left,
    right: element.getBoundingClientRect().right,
  }))
);
```

No dar por terminada la tarea si quedan elementos estructurales en esta lista.

---

# 21. CRITERIO DE TERMINACIÓN

La tarea estará terminada solamente cuando:

1. La página conserve la estética actual pero se sienta más precisa y liviana.
2. El CSS no aparezca como contenido en ningún punto.
3. Desktop conserve la riqueza visual sin desbordes ni espacios arbitrarios.
4. Mobile sea una experiencia diseñada específicamente, no una versión desktop encogida.
5. Todos los módulos mobile sigan una sola columna y un orden narrativo natural.
6. Las demos comuniquen sin pretender ser aplicaciones completas.
7. Dark y light mode estén resueltos en todos los componentes.
8. No existan controles falsos, elementos superpuestos ni barras horizontales.
9. La página pueda recorrerse rápido y la propuesta se comprenda sin esfuerzo.
10. Se haya verificado manualmente toda la matriz de viewports.

Antes de finalizar, comparar capturas completas de 390 × 844, 1366 × 768 y 1920 × 1080. Si alguna composición parece demasiado alta, vacía, comprimida o cortada, corregirla antes de entregar.

