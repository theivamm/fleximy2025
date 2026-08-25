# FLEXIMY — REWORK TOTAL DEL MÓDULO 3

## Más ventas. Menos tareas. Todo bajo control.

Este documento reemplaza por completo el módulo 3 actual.

No corregir, compactar ni reutilizar la composición existente. El módulo actual basado en una frase configurable, selectores de industria y un dashboard lateral debe eliminarse entero. Su dinámica es difícil de interpretar, tiene demasiados controles, ocupa demasiado espacio y obliga al usuario a descubrir cómo funciona antes de comprender qué está vendiendo Fleximy.

El nuevo módulo debe ser inmediato, comercial, tipográfico y visualmente extraordinario. No debe necesitar instrucciones ni interacción para tener sentido.

---

## 1. Contexto dentro de la landing

Antes de este módulo ya existen:

1. Un hero que presenta la propuesta: web, aplicación y dashboard como una sola plataforma.
2. Un segundo módulo que explica los cuatro pilares del servicio:
   - una web preparada para convertir;
   - todas las consultas en un solo lugar;
   - una aplicación para operar;
   - información clara para decidir.

Por lo tanto, el módulo 3 no debe volver a explicar el producto ni mostrar otro dashboard completo.

Su trabajo comercial es traducir lo anterior en tres resultados simples y deseables:

- vender más;
- trabajar con menos tareas manuales;
- tener el negocio bajo control.

Debe funcionar como la primera gran síntesis de la landing.

---

## 2. Problema del módulo actual

Eliminar completamente:

- “Mi negocio recibe pedidos / trabaja con un equipo / vende productos…”;
- selects gigantes;
- botones de Café, Óptica, Inmobiliaria y Estudio creativo;
- botón de pausa;
- instrucciones del tipo “tocá cada fragmento”;
- dashboard de configuración activa;
- tabs, sidebar y grillas vacías;
- cualquier referencia a que el visitante debe configurar o probar una demo;
- cualquier bloque que parezca un formulario, constructor o software sin terminar.

El usuario no tiene que aprender a usar este módulo. Tiene que verlo, entenderlo y desear el resultado.

---

## 3. Nueva gran idea

### Concepto: “El pulso de un negocio que funciona”

Crear una pieza editorial animada donde tres beneficios comerciales aparezcan conectados por un flujo visual continuo.

No será un dashboard tradicional ni un conjunto de cards. Será una composición abstracta construida con HTML, CSS, SVG inline y animaciones, como si el visitante estuviera viendo el sistema nervioso de un negocio en funcionamiento.

La sección muestra tres estaciones:

1. **Vendé más**
2. **Trabajá menos**
3. **Controlá todo**

Una línea de energía atraviesa las tres estaciones y transporta pequeños eventos:

- “Nueva consulta”;
- “Pedido confirmado”;
- “Tarea asignada”;
- “Stock actualizado”;
- “Pago recibido”;
- “Reporte listo”.

Todo sucede automáticamente. No hay botones, tabs ni selects.

---

## 4. Mensaje comercial definitivo

### Eyebrow

`RESULTADOS, NO MÁS HERRAMIENTAS`

### Título principal

## Más ventas. Menos tareas. Todo bajo control.

### Bajada

Fleximy conecta tu web con la operación diaria para que cada consulta avance, cada tarea encuentre su lugar y vos sepas qué está pasando.

### Remate breve

**Tu negocio trabajando como un sistema.**

No agregar más explicación en la apertura.

---

## 5. Dirección visual general

La sección debe sentirse como una campaña de tecnología premium, no como la página de documentación de un SaaS.

Características:

- fondo oscuro consistente con el resto del sitio;
- gran jerarquía tipográfica;
- mucho aire y composición editorial;
- gradientes eléctricos usados con precisión;
- líneas finas, partículas y señales de actividad;
- microinterfaces abstractas, nunca un dashboard genérico;
- profundidad mediante blur, luz y transparencias;
- animación continua, lenta y elegante;
- lectura completa en menos de ocho segundos;
- cero imágenes reales;
- cero recursos raster obligatorios;
- cero dependencia de interacciones.

La espectacularidad debe estar en el movimiento y la composición, no en la cantidad de elementos.

---

## 6. Estructura desktop

### Dimensiones generales

- ancho del contenido: `min(1380px, calc(100vw - 96px))`;
- altura aproximada: entre `900px` y `1080px` en desktop;
- padding vertical: `clamp(112px, 10vw, 180px)`;
- nunca forzar exactamente `100vh`;
- no usar textos desproporcionados;
- no generar overflow horizontal.

### Composición

La sección tiene dos momentos visuales.

#### Momento A — Apertura editorial

Título centrado, máximo `980px`, con dos líneas en 1920 px:

`Más ventas. Menos tareas.`

`Todo bajo control.`

Aplicar gradiente únicamente a las palabras:

- `Más ventas`;
- `Menos tareas`;
- `bajo control`.

No convertir todo el título en gradiente.

Debajo, la bajada en un máximo de `720px`.

#### Momento B — Sistema visual de tres resultados

Debajo de la apertura crear una composición horizontal formada por tres estaciones conectadas. No deben parecer tres cards iguales.

La geometría general se puede resolver como una línea de producción digital:

```text
VENDÉ MÁS  ───────  TRABAJÁ MENOS  ───────  CONTROLÁ TODO
  eventos               automatización              claridad
```

Cada estación tiene una identidad visual distinta, pero todas pertenecen al mismo sistema.

---

## 7. Estación 01 — Vendé más

### Texto visible

`01`

## Cada consulta puede terminar en una venta.

Web, WhatsApp, reservas y pedidos conectados para que ninguna oportunidad quede en el camino.

### Microcopy

`CONSULTA → RESPUESTA → VENTA`

### Construcción visual CSS

Crear una entrada de señales desde el borde izquierdo:

- pequeñas etiquetas con íconos abstractos para Web, WhatsApp, Reserva y Pedido;
- las señales avanzan por líneas finas;
- las líneas convergen en un nodo luminoso central;
- el nodo se transforma en una píldora que dice `Venta confirmada`;
- aparece un contador que sube suavemente de `24` a `25`;
- un monto breve entra con blur y se estabiliza;
- un pequeño check dibujado con SVG confirma el evento.

No usar logos oficiales de plataformas. Resolver los canales con íconos simples o Lucide.

### Sensación buscada

Entrada, avance y conversión.

---

## 8. Estación 02 — Trabajá menos

### Texto visible

`02`

## Lo repetitivo puede hacerse solo.

Avisos, tareas, estados y actualizaciones avanzan automáticamente mientras tu equipo se ocupa del negocio.

### Microcopy

`MENOS CARGA MANUAL · MÁS TIEMPO ÚTIL`

### Construcción visual CSS

Crear una máquina visual abstracta en el centro:

- un evento entra como `Pedido recibido`;
- atraviesa tres módulos compactos: `Asignar`, `Actualizar`, `Avisar`;
- cada módulo se activa mediante un pulso de gradiente;
- al completar el recorrido aparece `Listo`;
- pequeñas tareas tachadas se deslizan hacia arriba y desaparecen;
- un indicador recupera tiempo: `+6 h esta semana`;
- un loop SVG muy sutil gira alrededor del núcleo.

No mostrar robots, engranajes cliché ni ilustraciones de inteligencia artificial.

### Sensación buscada

Movimiento automático, alivio y eficiencia.

---

## 9. Estación 03 — Controlá todo

### Texto visible

`03`

## Sabé qué pasa sin perseguir la información.

Ventas, clientes y operación reunidos en una vista clara para detectar oportunidades y decidir más rápido.

### Microcopy

`LO IMPORTANTE, LISTO PARA DECIDIR`

### Construcción visual CSS

Crear una composición de datos abstracta y limpia:

- tres números grandes aparecen desde distintas profundidades;
- `Ventas hoy`;
- `Clientes activos`;
- `Pendientes`;
- una línea luminosa conecta los tres valores;
- un mini gráfico de área se dibuja con SVG mediante `stroke-dashoffset`;
- una alerta se transforma en una recomendación concreta;
- el texto final dice `Todo en orden` con un punto verde respirando.

No crear un dashboard completo, sidebar, navegación ni ventanas de navegador.

### Sensación buscada

Claridad, calma y control.

---

## 10. Cómo evitar que parezcan tres cards

Este punto es obligatorio.

No encerrar cada estación en rectángulos idénticos. Construir una sola superficie continua con:

- una línea horizontal compartida;
- fondos de luz que atraviesan los límites;
- números `01`, `02`, `03` parcialmente fuera de la grilla;
- divisores incompletos;
- estaciones con alturas y densidades diferentes;
- elementos que cruzan de una zona a la siguiente;
- una única animación de flujo que conecte toda la escena.

El fondo puede tener una grilla técnica casi invisible, limitada a la parte inferior del módulo.

Debe parecer una pieza de dirección de arte, no un pricing table.

---

## 11. Gran recurso tipográfico

Detrás de las tres estaciones colocar texto outline de escala monumental:

`VENDE · FUNCIONA · CRECE`

Características:

- `font-size: clamp(90px, 11vw, 210px)`;
- peso 700 u 800;
- transparente;
- `-webkit-text-stroke: 1px rgba(255,255,255,.055)`;
- una única línea que exceda lateralmente la sección;
- movimiento horizontal automático muy lento;
- `pointer-events: none`;
- nunca debe competir con la lectura;
- ocultar o reemplazar en mobile.

Sobre el ingreso al viewport, las tres palabras principales del título pueden cambiar brevemente:

`VENDER → ORDENAR → DECIDIR`

y luego estabilizarse en el título definitivo.

Este efecto debe durar menos de `1.3s` y ejecutarse una sola vez.

---

## 12. Paleta y materiales

### Fondo

```css
--module-bg: #070916;
--module-surface: rgba(17, 21, 42, 0.58);
--module-line: rgba(151, 166, 214, 0.14);
--module-text: #f5f7ff;
--module-muted: #a8b0c7;
```

### Gradiente de marca

```css
--brand-gradient: linear-gradient(
  105deg,
  #745cff 0%,
  #477cff 30%,
  #18d7d0 67%,
  #f18bc2 100%
);
```

### Luces ambientales

- violeta detrás de la estación 01;
- cian detrás de la estación 02;
- rosa muy tenue detrás de la estación 03;
- opacidad máxima de cada glow: `0.16`;
- blur entre `90px` y `150px`;
- evitar manchas saturadas y grandes fondos planos de color.

### Material de interfaz

```css
background: linear-gradient(
  145deg,
  rgba(255,255,255,.055),
  rgba(255,255,255,.018)
);
border: 1px solid rgba(255,255,255,.10);
box-shadow:
  inset 0 1px 0 rgba(255,255,255,.07),
  0 24px 70px rgba(0,0,0,.24);
backdrop-filter: blur(18px);
```

Usar este material solo en pequeñas piezas funcionales, no como una gran caja exterior.

---

## 13. Tipografía y proporciones

El módulo actual se siente tosco porque demasiados elementos compiten en gran tamaño. La nueva escala debe ser controlada.

### Título principal

```css
font-size: clamp(46px, 5vw, 82px);
line-height: .98;
letter-spacing: -0.055em;
font-weight: 650;
```

### Títulos de estaciones

```css
font-size: clamp(27px, 2.1vw, 40px);
line-height: 1.04;
letter-spacing: -0.035em;
font-weight: 620;
```

### Descripciones

```css
font-size: clamp(16px, 1.1vw, 19px);
line-height: 1.55;
max-width: 38ch;
```

### Etiquetas técnicas

```css
font-size: 11px;
letter-spacing: .18em;
text-transform: uppercase;
```

No usar párrafos centrados de más de tres líneas.

---

## 14. Animación principal

La animación debe contar el módulo sin exigir interacción.

### Secuencia automática

1. La sección entra con una aparición suave del eyebrow.
2. El título revela cada línea mediante máscara vertical.
3. Se enciende la línea de flujo de izquierda a derecha.
4. Estación 01 recibe señales y confirma una venta.
5. El evento viaja a la estación 02 y activa la automatización.
6. El resultado llega a la estación 03 y actualiza los datos.
7. Aparece `Todo en orden`.
8. La secuencia descansa durante tres segundos.
9. Se repite solamente la microactividad interna, no toda la entrada del texto.

Duración narrativa completa: entre `8s` y `11s`.

### Movimiento

- usar `transform` y `opacity` como propiedades principales;
- evitar animar dimensiones o posiciones que provoquen layout shift;
- easing recomendado: `power3.out` para entradas y `sine.inOut` para loops;
- los eventos se mueven con baja velocidad;
- no usar rebotes, flashes ni zooms agresivos;
- el módulo debe seguir siendo perfectamente legible con animaciones desactivadas.

GSAP puede coordinar la entrada al viewport. Los loops sencillos deben resolverse en CSS.

---

## 15. Efecto reactivo al mouse

No convertirlo en una interacción necesaria.

En dispositivos con puntero fino, permitir únicamente:

- un halo radial muy tenue que siga el cursor dentro de la sección;
- desplazamiento máximo de `4px` en algunos nodos de profundidad;
- aumento mínimo de luminosidad al acercarse a una estación;
- ninguna pieza clickeable;
- ningún cursor especial;
- ninguna instrucción de uso.

En touch, desactivar completamente este comportamiento.

---

## 16. Cierre comercial del módulo

Debajo del sistema visual incluir un cierre breve, alineado horizontalmente en desktop.

### Texto

## No te damos otra herramienta. Te damos una forma más simple de trabajar.

### Apoyo

Creamos únicamente lo que tu negocio necesita y lo dejamos conectado desde el primer día.

### CTA principal

`Contanos cómo funciona tu negocio →`

### CTA secundario

`Conocé nuestros servicios`

El CTA principal usa el gradiente de marca. El secundario es un enlace textual, no otro botón grande.

---

## 17. Responsive tablet

Entre `768px` y `1100px`:

- mantener el título centrado;
- convertir las estaciones en una composición de dos filas;
- estación 01 y 02 comparten la primera fila;
- estación 03 ocupa el ancho de la segunda;
- la línea de flujo gira mediante un conector SVG;
- bajar la densidad de eventos secundarios;
- mantener el cierre en dos columnas si existe espacio;
- no escalar el bloque desktop con `transform: scale()`.

---

## 18. Responsive mobile

En mobile el módulo debe rediseñarse, no reducirse.

### Orden

1. eyebrow;
2. título;
3. bajada;
4. estación 01;
5. conector vertical;
6. estación 02;
7. conector vertical;
8. estación 03;
9. cierre comercial;
10. CTA.

### Reglas

- padding horizontal entre `20px` y `24px`;
- título entre `42px` y `54px` según viewport;
- estaciones de ancho completo;
- microinterfaces simplificadas, no minúsculas;
- reemplazar el gran texto outline por `VENDE / FUNCIONA / CRECE` en vertical y con baja opacidad;
- máximo cuatro señales visibles en la estación 01;
- máximo tres módulos en la estación 02;
- máximo tres métricas en la estación 03;
- CTA principal de ancho completo en 320–480 px;
- ningún texto cortado;
- ningún overflow horizontal;
- verificar expresamente en 320, 375, 390, 430 y 768 px.

---

## 19. Light mode

Mantener la misma composición.

```css
--module-bg: #f5f6ff;
--module-surface: rgba(255,255,255,.64);
--module-line: rgba(36,45,87,.13);
--module-text: #101329;
--module-muted: #59617a;
```

En light mode:

- reducir la opacidad de los glows;
- usar sombras azuladas muy suaves;
- conservar el gradiente de marca;
- asegurar contraste AA;
- evitar que el fondo se transforme en blanco puro;
- mantener visibles líneas, nodos y pequeñas interfaces.

---

## 20. Accesibilidad y rendimiento

- respetar `prefers-reduced-motion`;
- con movimiento reducido, mostrar todos los estados finales y eliminar loops;
- no depender del color para comunicar estados;
- CTA accesible por teclado y con foco visible;
- SVG decorativos con `aria-hidden="true"`;
- texto real en HTML, nunca texto dentro de imágenes;
- no usar canvas para contenido importante;
- no cargar fotografías, videos ni librerías 3D;
- reservar dimensiones para evitar CLS;
- no crear más de 20 partículas simultáneas;
- evitar filtros costosos sobre superficies de pantalla completa;
- lazy-init de GSAP mediante `IntersectionObserver`;
- destruir timelines y listeners al desmontar el componente.

---

## 21. Arquitectura sugerida

```text
ModuleThreeResults/
├── ModuleThreeResults.tsx
├── ModuleThreeResults.module.css
├── ResultsHeader.tsx
├── BusinessPulse.tsx
├── FlowConnector.tsx
├── SalesStation.tsx
├── AutomationStation.tsx
├── ControlStation.tsx
├── ResultEvent.tsx
├── ModuleClosing.tsx
└── useResultsTimeline.ts
```

### Principios

- contenido desacoplado de la animación;
- estaciones semánticas y reutilizables;
- conectores SVG responsivos;
- timeline principal centralizado;
- CSS custom properties para color, intensidad y progreso;
- sin lógica de selección de industrias;
- sin estado global;
- sin botones que simulen funciones inexistentes.

---

## 22. Implementación por fases

### Fase 1 — Reemplazo estructural

- eliminar íntegramente el módulo 3 anterior;
- construir el nuevo HTML semántico;
- implementar contenido definitivo;
- resolver desktop sin animaciones.

### Fase 2 — Dirección de arte

- aplicar tipografía, gradientes, grilla y profundidad;
- construir las tres microescenas con CSS y SVG;
- conectar visualmente las estaciones;
- verificar que no parezcan tres cards genéricas.

### Fase 3 — Movimiento

- implementar entrada GSAP;
- animar el flujo narrativo;
- agregar loops mínimos;
- implementar halo reactivo no esencial.

### Fase 4 — Responsive

- crear composición específica para tablet;
- crear secuencia vertical para mobile;
- ajustar microinterfaces en cada breakpoint;
- revisar overflow y legibilidad.

### Fase 5 — Calidad

- dark y light mode;
- reduced motion;
- performance;
- accesibilidad;
- QA visual a 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844, 375×812 y 320×568.

---

## 23. Prompt listo para OpenCode

Usá este documento como especificación vinculante para reemplazar por completo el módulo 3 actual de la home de Fleximy.

El módulo actual no debe ajustarse ni reutilizarse. Eliminá la frase configurable, los selects gigantes, las industrias, el botón de pausa, las instrucciones y el dashboard lateral. El visitante no debe hacer clic ni aprender una dinámica para comprender el mensaje.

Construí un nuevo módulo editorial y comercial bajo el concepto **“El pulso de un negocio que funciona”**. Su headline será **“Más ventas. Menos tareas. Todo bajo control.”** y deberá comunicar tres resultados: convertir consultas en ventas, automatizar tareas repetitivas y reunir la información necesaria para decidir.

La experiencia debe estar construida íntegramente con HTML semántico, CSS moderno, SVG inline, iconografía coherente y GSAP para la entrada al viewport. No uses fotografías, videos, mockups raster, canvas, WebGL, dashboards prefabricados ni imágenes generadas. Tampoco construyas otro dashboard completo.

Creá una sola superficie visual continua con tres estaciones conectadas por una línea de flujo. La primera recibe eventos desde Web, WhatsApp, reservas y pedidos y culmina en una venta confirmada. La segunda procesa automáticamente el evento mediante Asignar, Actualizar y Avisar. La tercera transforma el resultado en métricas claras y finaliza con “Todo en orden”. Todo debe reproducirse automáticamente en una narrativa de 8 a 11 segundos y comprenderse aun con las animaciones detenidas.

Las tres estaciones no pueden parecer cards iguales. Usá divisores incompletos, números fuera de grilla, luces que crucen los límites, una línea compartida y distintas densidades compositivas. Incorporá el texto outline monumental “VENDE · FUNCIONA · CRECE” en segundo plano, con movimiento casi imperceptible.

Mantené la estética dark premium de Fleximy, el gradiente violeta-azul-cian-rosa y una jerarquía tipográfica editorial. Evitá tamaños grotescos: el H2 debe usar `clamp(46px, 5vw, 82px)` y los títulos internos `clamp(27px, 2.1vw, 40px)`. Respetá el ancho máximo de 1380px y no fuerces 100vh.

El mouse puede producir un halo tenue y una profundidad máxima de 4px, pero la interacción no debe ser necesaria. En touch, desactivala.

Diseñá tablet y mobile como composiciones propias. En mobile, apilá las tres estaciones y conectalas verticalmente; no reduzcas el desktop con `transform: scale()`. Verificá 320, 375, 390, 430, 768, 1024, 1366, 1440 y 1920 px. No debe existir overflow horizontal.

Implementá dark mode, light mode, `prefers-reduced-motion`, estados accesibles, foco visible, limpieza de timelines y buena performance. No modifiques el hero, el módulo 2 ni sus textos. Trabajá exclusivamente sobre el módulo 3 y entregalo terminado, responsive y visualmente integrado con lo anterior.

---

## 24. Criterios de aceptación

El módulo solo se considera terminado si cumple todo lo siguiente:

- reemplaza por completo el módulo 3 anterior;
- el mensaje principal se entiende en menos de cinco segundos;
- no existe ninguna instrucción de uso;
- no hay selects, tabs, industrias ni botón de pausa;
- no utiliza imágenes reales;
- no muestra un dashboard completo;
- comunica claramente ventas, automatización y control;
- las tres estaciones forman una única composición;
- no se percibe como una fila de tres cards;
- el flujo se reproduce solo;
- la animación agrega sentido y no ruido;
- funciona sin interacción;
- sigue siendo comprensible sin movimiento;
- se integra con la estética del hero y módulo 2;
- tiene una versión mobile diseñada específicamente;
- funciona correctamente en dark y light mode;
- no produce saltos de layout;
- no produce overflow horizontal;
- no rompe el scroll;
- no usa `transform: scale()` para resolver responsive;
- no contiene botones falsos ni controles sin función;
- pasa una revisión visual en todas las resoluciones indicadas.

---

## 25. Resultado esperado

El visitante debe terminar este módulo pensando:

> “Entiendo qué gano: más oportunidades, menos trabajo manual y una visión clara del negocio.”

No debe pensar:

> “¿Qué tengo que tocar?”

El módulo tiene que demostrar capacidad de diseño sin convertir la demostración en un obstáculo. La forma debe sorprender; el mensaje debe ser extremadamente simple.
