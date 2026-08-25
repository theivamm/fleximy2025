# FLEXIMY — REPARACIÓN VISUAL Y ESTABILIZACIÓN DE LA HOME

## Auditoría de la versión publicada y especificación correctiva

Sitio revisado: `https://fleximy.com/`

Este documento no solicita un nuevo rework conceptual. La dirección visual, el contenido y la arquitectura general ya están definidos. El problema actual es de ejecución: superposiciones, capas mal resueltas, escenas absolutas que invaden textos, márgenes inconsistentes, animaciones que oscurecen contenido y módulos con una escala excesiva.

La prioridad es **estabilizar el layout**, recuperar legibilidad y conservar solamente los efectos que funcionan correctamente.

> No agregar nuevos módulos, nuevas animaciones ni nuevas ideas hasta terminar esta reparación.

---

## 1. Diagnóstico confirmado en producción

La versión publicada tiene aproximadamente `8.332px` de alto en un viewport desktop de `1363 × 936px`.

Alturas observadas:

| Sección | Altura aproximada |
|---|---:|
| Hero | 864px |
| Módulo 2 / Product Gallery | 1.774px |
| Accesibilidad | 562px |
| Módulo 3 / Proceso | 1.850px |
| Rubros | 831px |
| Contacto | 1.013px |
| FAQ | 905px |

No existe overflow horizontal global en el desktop revisado, pero sí hay solapamientos internos y composiciones que se perciben cortadas o fuera de lugar.

---

## 2. Error crítico comprobado en el módulo 2

Los paneles `03 · Tu operación` y `04 · Tus números` tienen esta estructura efectiva:

```text
.pg-panel
├── .pg-copy
└── .pg-scene.pg-ops / .pg-scene.pg-ins
```

Actualmente las escenas problemáticas usan:

```css
position: absolute;
inset: 0;
width: 100%;
height: 100%;
```

Como resultado, la escena ocupa exactamente el mismo rectángulo que el panel completo y se dibuja encima de `.pg-copy`.

Esto produce:

- tarjetas de pedidos sobre el título;
- textos duplicados visualmente;
- gráficos atravesando párrafos;
- indicadores encima de descripciones;
- contraste roto;
- sensación de sitio incompleto o con CSS sin terminar.

No es una decisión estética. Es un error estructural.

---

## 3. Estrategia elegida

### Pasada de estabilización visual

No intentar “arreglar” cada superposición moviendo elementos algunos píxeles mediante `top`, `left` o nuevos transforms.

Reconstruir la distribución interna de los paneles con layout normal:

- CSS Grid;
- Flexbox;
- áreas de contenido explícitas;
- escenas relativas;
- alturas controladas;
- overflow usado solo como recorte decorativo;
- posicionamiento absoluto reservado para elementos pequeños.

### Principio

> Ninguna escena principal puede ocupar el mismo espacio que el copy.

---

## 4. Orden obligatorio de trabajo

### Fase 1 — Congelar efectos

Antes de modificar el layout:

- desactivar temporalmente timelines GSAP de la home;
- desactivar transforms reactivos al mouse;
- desactivar blur animado;
- eliminar estados iniciales `opacity: 0` del contenido;
- renderizar todos los módulos en su estado final estático;
- tomar capturas desktop y mobile.

### Fase 2 — Corregir estructura

- reparar grids;
- reparar alturas;
- corregir márgenes;
- eliminar superposiciones;
- corregir clipping;
- verificar responsive sin animaciones.

### Fase 3 — Recuperar movimiento

Reactivar únicamente:

- reveals simples;
- microactividad interna;
- líneas SVG;
- cintas tipográficas;
- halo de cursor moderado.

Si una animación vuelve a romper el layout, eliminarla. No crear otra capa para compensarla.

---

## 5. Sistema global de contenedores

Actualmente algunas secciones utilizan anchos diferentes, lo que genera saltos visuales entre módulos.

Definir un único sistema:

```css
:root {
  --container-max: 1280px;
  --gutter: clamp(20px, 4vw, 56px);
  --section-y: clamp(88px, 8vw, 144px);
  --section-y-compact: clamp(64px, 6vw, 104px);
}

.site-container {
  width: min(
    var(--container-max),
    calc(100% - (var(--gutter) * 2))
  );
  margin-inline: auto;
}
```

### Reglas

- header, hero, Product Gallery, módulo 3, contacto, FAQ y footer deben compartir este eje;
- ningún contenedor desktop debe usar un gutter menor a 40px;
- ningún contenedor mobile debe usar un gutter menor a 20px;
- no mezclar `max-width: 900px`, `1239px`, `1267px` y `1440px` para bloques equivalentes;
- los títulos centrados pueden usar un ancho interno menor sin alterar el eje general.

---

## 6. Escala tipográfica consistente

El sitio se siente tosco porque cada módulo parece competir por tener el título más grande.

Definir una escala única:

```css
--text-display: clamp(52px, 5.4vw, 82px);
--text-h2: clamp(40px, 4.2vw, 64px);
--text-h3: clamp(26px, 2.2vw, 36px);
--text-lead: clamp(18px, 1.45vw, 22px);
--text-body: clamp(16px, 1.1vw, 18px);
--text-small: 14px;
--text-label: 11px;
```

### Reglas

- solo el hero usa `--text-display`;
- títulos de sección usan `--text-h2`;
- títulos internos usan `--text-h3`;
- no usar `font-size` mayor a 82px;
- evitar letter-spacing exagerado en labels de formularios;
- no usar párrafos con menos de 15px en desktop;
- limitar párrafos a `48–64ch` según contexto.

---

## 7. Header

### Problemas observados

- decoraciones oscuras del hero aparecen detrás del sector derecho del header;
- el header pierde separación con el contenido cuando el fondo es oscuro;
- algunos elementos parecen demasiado cerca del borde superior;
- la zona de navegación central tiene contraste bajo.

### Corrección

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 72px;
  isolation: isolate;
}

.site-header::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(18px);
}
```

### Decoraciones del hero

```css
.hero-decoration {
  z-index: 0;
  pointer-events: none;
}

.hero-content,
.hero-demo {
  position: relative;
  z-index: 2;
}
```

- limitar toda decoración a la caja del hero;
- usar `overflow: clip` en el hero;
- ninguna decoración debe dibujarse dentro de los primeros 72px;
- navegación con contraste AA en ambos temas.

---

## 8. Hero

### Problemas observados

- contenido excesivamente oscuro al cargar;
- demo desenfocada durante demasiado tiempo;
- título y párrafos pierden contraste;
- rectángulos decorativos superiores invaden visualmente el header;
- el gráfico se percibe más dominante que la propuesta comercial.

### Corrección de animación

Eliminar entradas desde:

```css
opacity: 0;
filter: blur(18px);
```

Usar como máximo:

```css
opacity: 0.88;
filter: blur(3px);
transform: translateY(12px);
```

Estado final antes de `1s`:

```css
opacity: 1;
filter: none;
transform: none;
```

### Visual derecho

- reducir aproximadamente 6–10% su escala en desktop;
- asegurar un mínimo de 48px respecto del header y el borde derecho;
- no aplicar blur al contenedor completo;
- si un producto cambia, animar únicamente el producto y sus datos;
- mantener marco e interfaz siempre nítidos;
- limitar inclinación a 1.5 grados;
- sombra menos extensa.

### Copy

Mantener el contenido ya corregido. No modificar nuevamente el concepto comercial.

---

## 9. Product Gallery — estructura general

Conservar el formato editorial 2 × 2, pero reconstruir su implementación interna.

### Grid estable

```css
.pg-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

.pg-panel--01,
.pg-panel--04 {
  grid-column: span 7;
}

.pg-panel--02,
.pg-panel--03 {
  grid-column: span 5;
}

.pg-panel {
  min-width: 0;
  min-height: 560px;
  position: relative;
  overflow: clip;
  isolation: isolate;
}
```

Eliminar offsets permanentes como:

```css
transform: translateY(14px);
transform: translateY(-10px);
```

Las diferencias editoriales deben surgir de la composición interna, no de mover paneles hacia filas vecinas.

---

## 10. Paneles 01 y 02

Los paneles 01 y 02 ya utilizan escenas relativas y no presentan el mismo error crítico. Aun así deben normalizarse.

```css
.pg-panel--01,
.pg-panel--02 {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.pg-copy {
  position: relative;
  z-index: 3;
}

.pg-scene {
  position: relative;
  z-index: 2;
  min-width: 0;
  min-height: 0;
}
```

### Reglas

- padding consistente de 32–40px;
- separación de 20–28px entre copy y escena;
- la escena no puede cubrir el título;
- las etiquetas flotantes deben quedar dentro del panel;
- limitar sombras para que no ensucien el panel vecino.

---

## 11. Reparación exacta del panel 03

### Selector afectado

`.pg-scene.pg-ops`

### Eliminar

```css
position: absolute;
inset: 0;
width: 100%;
height: 100%;
```

### Nueva estructura

```css
.pg-panel--03 {
  display: grid;
  grid-template-rows: auto minmax(260px, 1fr);
  gap: 24px;
  padding: 36px;
}

.pg-panel--03 .pg-copy {
  position: relative;
  z-index: 3;
  max-width: 42ch;
}

.pg-panel--03 .pg-ops {
  position: relative;
  inset: auto;
  width: auto;
  height: auto;
  min-height: 280px;
  z-index: 2;
  overflow: clip;
}
```

### Composición de escena

- pedidos en una grilla interna debajo del texto;
- máximo tres columnas en desktop;
- alertas de stock debajo de los pedidos;
- equipo y turnos en una fila final;
- nada puede comenzar antes del final de `.pg-copy`;
- eliminar tarjetas que salen del panel superior;
- mantener un mínimo de 24px entre bloques.

---

## 12. Reparación exacta del panel 04

### Selector afectado

`.pg-scene.pg-ins`

### Eliminar

```css
position: absolute;
inset: 0;
width: 100%;
height: 100%;
```

### Nueva estructura

```css
.pg-panel--04 {
  display: grid;
  grid-template-rows: auto minmax(260px, 1fr);
  gap: 24px;
  padding: 36px;
}

.pg-panel--04 .pg-copy {
  position: relative;
  z-index: 3;
  max-width: 54ch;
}

.pg-panel--04 .pg-ins {
  position: relative;
  inset: auto;
  width: auto;
  height: auto;
  min-height: 280px;
  z-index: 2;
  overflow: clip;
}
```

### Composición de escena

- indicadores en una línea debajo del copy;
- gráfico dentro de una caja con altura máxima de 140px;
- insight debajo del gráfico;
- ningún SVG debe cruzar el título;
- evitar líneas que atraviesen párrafos;
- no usar cifras ficticias con apariencia de caso real.

---

## 13. Altura final del módulo 2

Reducir de aproximadamente `1.774px` a un rango de `1.400–1.600px` en desktop.

```css
.pg {
  padding-block: var(--section-y);
}

.pg-header {
  margin-bottom: clamp(48px, 5vw, 72px);
}
```

- no agregar separadores vacíos;
- no usar margin-top mayor a 96px;
- no reservar espacio para escenas absolutas;
- toda altura debe provenir del contenido real.

---

## 14. Módulo de accesibilidad

### Problemas

- se percibe más sólido que los módulos vecinos, pero la tarjeta derecha queda demasiado aislada;
- la palabra outline `ACCESIBLE` puede competir con los botones;
- el margen entre el módulo 2 y este bloque debe normalizarse.

### Corrección

- usar el mismo contenedor global;
- reducir el outline al 70% de su opacidad actual;
- alinear verticalmente copy y tarjeta;
- ancho máximo de tarjeta: 520px;
- no usar desplazamientos negativos;
- separar CTA principal y secundario por 12px;
- en mobile apilar copy, tarjeta y CTAs.

---

## 15. Módulo 3 / Proceso

### Problemas observados

- altura aproximada de `1.850px` para una idea de tres pasos;
- demasiado aire entre apertura, máquina, pasos y cierre;
- título puede quedar invisible o tardar en aparecer durante la animación;
- la máquina ocupa casi un viewport completo;
- textos outline compiten con elementos de interfaz;
- la plataforma del lado derecho tiene contraste insuficiente en light mode.

### Nueva altura objetivo

Entre `1.350px` y `1.550px` en desktop.

### Distribución

```css
.m3p {
  padding-block: var(--section-y);
}

.m3p-container {
  min-height: 0;
  height: auto;
}

.m3p-header {
  min-height: 0;
  margin-bottom: 64px;
}

.m3p-machine {
  height: clamp(400px, 38vw, 500px);
  margin-bottom: 72px;
}

.m3p-steps {
  margin-bottom: 72px;
}
```

### Título

- renderizar visible por defecto;
- animar desde 12px, no desde fuera de viewport;
- no aplicar `clip-path` si la línea ocupa más de una fila;
- duración máxima de reveal: 700ms;
- sin blur.

### Máquina

- bajar tamaño del isotipo central entre 10–15%;
- reducir opacidad de `HECHO PARA VOS`;
- aumentar contraste de `TU PLATAFORMA`;
- máximo seis palabras flotantes;
- no duplicar permanentemente `clientes`, `equipo`, `ventas`;
- evitar elementos que se cruzan con el outline de fondo;
- un solo ciclo de ENTENDER → DISEÑAR → CREAR.

### Pasos

- tres columnas iguales;
- padding superior de 24px;
- líneas alineadas;
- remates con contraste legible;
- no usar opacity menor a 0.65 para texto informativo.

---

## 16. Rubros / Industry Ribbon

### Problemas observados

- palabras cortadas abruptamente en los laterales;
- escalas demasiado grandes;
- tres líneas compiten simultáneamente;
- el comienzo o final de una palabra puede parecer un error de overflow;
- la sección tiene más altura de la necesaria.

### Corrección

- reducir tipografía entre 12–18%;
- usar máscara lateral progresiva;
- aumentar separación vertical entre cintas;
- una sola palabra en gradiente por línea;
- velocidad más lenta;
- evitar que dos palabras destacadas coincidan verticalmente;
- reducir altura total a `640–720px`.

```css
.rib-viewport {
  overflow: clip;
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 7%,
    #000 93%,
    transparent 100%
  );
}
```

En mobile, reemplazar marquee infinito por una grilla tipográfica estática de términos.

---

## 17. Formulario de contacto

El módulo funciona visualmente mejor que Product Gallery, pero necesita refinamiento.

### Problemas

- título izquierdo demasiado grande y fragmentado;
- labels demasiado pequeños y espaciados;
- inputs altos para la cantidad de información solicitada;
- chips muy numerosos en una sola masa visual;
- el divisor superior derecho no aporta información;
- la sección supera un viewport completo.

### Corrección

```css
.cs {
  padding-block: clamp(88px, 8vw, 128px);
}

.cs-grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(56px, 6vw, 96px);
  align-items: start;
}
```

### Título

- máximo 4 líneas en 1366px;
- tamaño máximo 52px;
- line-height 1.04;
- ancho máximo 12ch;

### Labels

```css
font-size: 12px;
letter-spacing: .10em;
line-height: 1.3;
```

### Inputs

- altura 52px;
- padding horizontal 16px;
- textarea 112–128px;
- border-radius 14px;
- no usar sombras internas pesadas.

### Chips

- gap de 8px;
- fuente mínima de 13px;
- estado seleccionado evidente;
- wrap natural;
- no animar el tamaño del chip;
- máximo dos filas antes del textarea en desktop.

### Altura objetivo

Entre `820px` y `940px` en desktop.

---

## 18. FAQ

### Problemas observados

- todas las respuestas parecen visibles al mismo tiempo;
- las respuestas se cortan lateralmente en la vista;
- falta una señal clara de interacción;
- demasiado espacio vertical;
- alineación de números y preguntas no está completamente resuelta.

### Corrección

- acordeón real;
- solo la primera pregunta abierta inicialmente;
- una sola pregunta abierta por vez;
- ancho máximo 960px;
- número en columna de 64px;
- pregunta y respuesta en columna flexible;
- botón completo de al menos 64px de alto;
- indicador `+` / `−` alineado a la derecha;
- respuesta con máximo 65ch;
- altura objetivo total: `650–760px`.

```css
.faq-item {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) 44px;
  column-gap: 20px;
  border-top: 1px solid var(--line);
}
```

No animar `height:auto` de forma improvisada. Usar una solución accesible y estable mediante grid rows o una timeline medida correctamente.

---

## 19. Footer

### Corrección

- reducir padding superior;
- usar el mismo contenedor global;
- completar enlaces de navegación;
- verificar que ninguna columna esté vacía;
- alinear baseline de títulos;
- reducir outline `FLEXIMY` si invade enlaces;
- mantener selector de tema en un lugar único: header o footer, no duplicarlo visualmente sin necesidad.

---

## 20. Reglas de posicionamiento

### Permitido usar `position:absolute` para

- glows;
- fondos;
- pequeñas etiquetas flotantes;
- iconos decorativos;
- líneas SVG;
- elementos que no contienen copy esencial.

### Prohibido usar `position:absolute` para

- el título de una sección;
- un párrafo comercial;
- una escena completa que comparte panel con copy;
- el formulario;
- preguntas frecuentes;
- cards principales;
- estructura responsive.

### Regla técnica

Todo componente absoluto debe tener:

- un contenedor `position:relative` explícito;
- límites definidos;
- `pointer-events:none` si es decorativo;
- z-index documentado;
- comportamiento definido en mobile;
- prueba de que no cubre contenido.

---

## 21. Sistema de capas

Definir una escala única de z-index:

```css
--z-base: 0;
--z-decoration: 1;
--z-scene: 2;
--z-content: 3;
--z-header: 100;
--z-menu: 200;
--z-modal: 300;
```

No utilizar valores arbitrarios como 9999 salvo una razón documentada.

Cada panel complejo debe usar `isolation:isolate`.

---

## 22. Animación segura

### Estado inicial

El DOM debe renderizar en estado legible.

JavaScript agrega una clase como `.motion-ready` únicamente después de inicializar la animación.

```css
.reveal {
  opacity: 1;
  transform: none;
}

.motion-ready .reveal {
  will-change: transform, opacity;
}
```

No definir contenido crítico invisible en CSS base.

### GSAP

- usar `gsap.context()`;
- revertir al desmontar;
- evitar timelines duplicadas en React Strict Mode;
- no crear ScrollTriggers en cada render;
- refrescar después de cargar fuentes e imágenes;
- usar `invalidateOnRefresh:true` en medidas responsivas;
- usar `gsap.matchMedia()`;
- no compartir medidas desktop con mobile.

### Scroll

- no usar pin en esta versión;
- no usar scroll-jacking;
- no usar Lenis o smooth-scroll hasta completar QA nativo;
- los anchors deben respetar el header:

```css
section[id] {
  scroll-margin-top: 88px;
}
```

---

## 23. Responsive desktop intermedio

La falla actual es especialmente probable entre `1024px` y `1440px`, donde los paneles siguen intentando comportarse como desktop amplio.

### Breakpoint recomendado

```css
@media (max-width: 1180px) {
  .pg-panel--01,
  .pg-panel--02,
  .pg-panel--03,
  .pg-panel--04 {
    grid-column: span 6;
  }
}
```

### Entre 900px y 1180px

- todos los paneles 50/50;
- copy máximo 100%;
- escenas debajo del copy;
- alturas automáticas con mínimo 620px;
- hero con proporción 45/55;
- contacto puede mantenerse en dos columnas solo si cada columna supera 420px.

---

## 24. Mobile

### Reglas globales

```css
@media (max-width: 767px) {
  :root {
    --gutter: 20px;
    --section-y: 80px;
  }
}
```

- una sola columna;
- no usar transform para reducir desktop;
- no usar escenas absolutas de ancho completo;
- todos los paneles con `height:auto`;
- copy antes de escena;
- títulos alineados a la izquierda salvo aperturas específicas;
- CTA principal de ancho completo cuando sea necesario;
- inputs en una sola columna;
- chips de ancho natural;
- FAQ con números de 40px;
- ribbon estático;
- máquina del módulo 3 reconstruida verticalmente;
- no usar hover como requisito;
- desactivar parallax y seguimiento del cursor.

### QA obligatorio

- 320 × 568;
- 360 × 800;
- 375 × 812;
- 390 × 844;
- 430 × 932;
- 768 × 1024.

---

## 25. Light mode

En la revisión publicada, algunos textos y escenas tienen contraste demasiado bajo.

### Ajustes

- texto principal: mínimo `#111426`;
- texto secundario: no más claro que `#5f667a`;
- labels: mínimo `#454d66`;
- bordes: mínimo `rgba(35,45,88,.14)`;
- escenas técnicas: opacidad mínima 0.7 para elementos informativos;
- outlines decorativos: máximo 0.08;
- no aplicar opacity al contenedor completo;
- aplicar opacidad individual solo a decoración.

---

## 26. Dark mode

- eliminar velo oscuro global del hero;
- texto principal siempre por encima de 90% de opacidad;
- no usar `opacity` sobre padres que contienen copy;
- evitar superficies negras pegadas sin separación;
- bordes de paneles visibles;
- glows de opacidad máxima 0.14;
- limitar blur a superficies pequeñas.

---

## 27. QA visual automatizable

Crear una ruta o modo interno de revisión:

`?qa=1`

En este modo:

- desactivar animaciones;
- mostrar outlines de contenedores;
- marcar elementos que exceden su padre;
- mostrar nombre de cada breakpoint;
- permitir capturas estables.

### Test de overflow

```js
const offenders = [...document.querySelectorAll('*')].filter((el) => {
  const rect = el.getBoundingClientRect();
  return rect.left < -1 || rect.right > window.innerWidth + 1;
});
```

No aceptar el sitio con offenders no decorativos.

### Test de solapamiento

Comprobar específicamente:

- `.pg-copy` vs `.pg-scene`;
- header vs hero decorations;
- títulos vs SVG;
- labels vs inputs;
- FAQ answers vs siguiente item;
- footer outline vs links.

---

## 28. Capturas obligatorias antes de publicar

Generar y revisar:

### Desktop

- hero;
- Product Gallery completa;
- panel 03;
- panel 04;
- módulo 3;
- ribbon;
- formulario;
- FAQ;
- página completa.

### Mobile

- hero;
- cada panel del módulo 2;
- módulo 3;
- formulario;
- FAQ;
- página completa.

No publicar solamente porque el servidor compila. La aprobación requiere inspección visual.

---

## 29. Objetivos de altura después de reparar

| Sección | Actual aprox. | Objetivo desktop |
|---|---:|---:|
| Hero | 864px | 800–900px |
| Product Gallery | 1.774px | 1.400–1.600px |
| Accesibilidad | 562px | 520–600px |
| Módulo 3 | 1.850px | 1.350–1.550px |
| Rubros | 831px | 640–720px |
| Contacto | 1.013px | 820–940px |
| FAQ | 905px | 650–760px |

Altura esperada total de contenido: aproximadamente `6.500–7.200px`, sin comprimir textos ni sacrificar aire.

---

## 30. Qué no hacer

- no rediseñar nuevamente el hero;
- no cambiar todos los colores;
- no agregar otra librería de animación;
- no sumar WebGL;
- no crear nuevos dashboards;
- no mover superposiciones con offsets arbitrarios;
- no usar `transform:scale()` para responsive;
- no ocultar overflow global para disimular errores;
- no usar `!important` como estrategia general;
- no fijar alturas gigantes para contener escenas;
- no modificar copy salvo errores tipográficos;
- no publicar sin capturas comparativas.

---

## 31. Prompt listo para OpenCode

Realizá una pasada de reparación visual y estabilización sobre la home publicada de Fleximy. No hagas otro rework conceptual, no agregues módulos y no cambies la identidad visual ni los textos comerciales. El objetivo es corregir la implementación actual, que presenta superposiciones, márgenes inconsistentes, escenas invadiendo el copy, exceso de blur y módulos demasiado altos.

Primero desactivá temporalmente todas las animaciones GSAP, parallax y efectos reactivos. Renderizá la home completa en estado estático y corregí el layout antes de volver a activar movimiento.

El error crítico está en Product Gallery. Las escenas `.pg-scene.pg-ops` y `.pg-scene.pg-ins` usan `position:absolute; inset:0` y ocupan el panel completo, quedando encima de `.pg-copy`. Eliminá ese posicionamiento. Reconstruí los paneles 03 y 04 mediante CSS Grid con dos filas reales: copy arriba y escena debajo. Usá exactamente las reglas, proporciones y selectores definidos en este documento.

Normalizá toda la home con un contenedor máximo de 1280px y gutters fluidos. Eliminá offsets verticales permanentes entre paneles. Definí una escala tipográfica única y reducí la competencia entre títulos.

En el hero, eliminá el oscurecimiento y blur prolongados. El contenido debe ser legible desde el primer frame y alcanzar su estado final antes de un segundo. Las decoraciones no pueden invadir el header. Reducí ligeramente la demo derecha y mantené nítido su marco; solo deben animarse los contenidos internos.

Reducí el módulo 3 de aproximadamente 1850px a 1350–1550px. Compactá apertura, máquina, pasos y cierre. El título debe renderizar visible por defecto y no depender de clip-path problemáticos. Aumentá el contraste de la plataforma del lado derecho y reducí palabras duplicadas.

En Industry Ribbon, reducí tipografía y altura, agregá máscaras laterales suaves y reemplazá el marquee por una grilla estática en mobile.

En contacto, reducí el tamaño del título, normalizá labels e inputs, ordená chips y llevá la sección a 820–940px en desktop. En FAQ, implementá un acordeón real: solo la primera respuesta abierta, una abierta por vez y alineación estable de número, pregunta e indicador.

Usá posicionamiento absoluto únicamente para decoración menor. Ningún copy, escena completa, formulario, FAQ o estructura responsive puede depender de absolute positioning.

Reactivá animaciones una por una después de validar el layout estático. El contenido debe seguir visible si JavaScript falla. Implementá `gsap.context()`, limpieza de timelines, `gsap.matchMedia()`, `prefers-reduced-motion` y medidas independientes por breakpoint.

Creá o activá un modo `?qa=1` sin animaciones para obtener capturas estables. Revisá overflow y solapamientos mediante scripts. Generá capturas de cada módulo y de la página completa en desktop y mobile antes de publicar.

Verificá expresamente 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844, 375×812, 360×800 y 320×568. No debe existir overflow horizontal, copy tapado, elementos cortados ni espacios creados artificialmente por animaciones.

No consideres terminado el trabajo porque compile. Solo está terminado cuando todas las capturas muestran una composición limpia y estable en dark y light mode.

---

## 32. Criterios de aceptación

### Product Gallery

- panel 03 sin tarjetas sobre el título;
- panel 04 sin gráfico atravesando el copy;
- escenas debajo de los textos;
- cuatro paneles alineados;
- sin transforms verticales permanentes;
- sin elementos saliendo hacia paneles vecinos.

### Hero

- legible desde el primer frame;
- sin blur persistente;
- sin decoraciones dentro del header;
- demo nítida;
- proporciones equilibradas.

### Módulo 3

- título siempre visible;
- altura reducida;
- máquina legible;
- sin duplicaciones visuales innecesarias;
- pasos alineados;
- light mode con contraste suficiente.

### Rubros

- palabras no cortadas abruptamente;
- máscara lateral;
- menor altura;
- mobile estático.

### Contacto

- título proporcionado;
- labels legibles;
- inputs compactos;
- chips ordenados;
- formulario sin overflow;
- estados funcionales preservados.

### FAQ

- acordeón real;
- una respuesta abierta;
- respuestas completas;
- indicadores visibles;
- sin cortes laterales.

### Global

- un sistema único de contenedores;
- un sistema tipográfico consistente;
- sin overflow horizontal;
- sin copy cubierto;
- sin layout shift visible;
- sin contenido crítico invisible sin JavaScript;
- dark y light mode correctos;
- responsive específico;
- capturas QA aprobadas.

---

## 33. Resultado esperado

La home debe conservar su personalidad, pero dejar de sentirse como una suma de experimentos independientes.

El resultado correcto será:

- más compacto;
- más limpio;
- más legible;
- visualmente potente;
- técnicamente estable;
- sin efectos compitiendo con el contenido;
- consistente entre módulos;
- profesional en todas las resoluciones.

El objetivo no es que tenga menos diseño. El objetivo es que el diseño deje de parecer roto.
