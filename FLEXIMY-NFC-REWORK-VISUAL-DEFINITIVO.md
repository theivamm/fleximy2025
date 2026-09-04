# FLEXIMY NFC — REWORK VISUAL Y TÉCNICO DEFINITIVO

## 0. Cómo debe usarse este documento

Este archivo es la única fuente de instrucciones para corregir la página:

`/soluciones/nfc`

La implementación debe realizarse sobre la página existente, conservando su propuesta comercial, sus textos principales, sus modos dark/light y la identidad visual de Fleximy.

No hacer un cambio cosmético. Corregir la arquitectura vertical, el sistema de contenedores, la grilla de casos, las alturas, los espacios, las alineaciones, la jerarquía tipográfica y el responsive.

No modificar el Home ni otras rutas.

---

# 1. Diagnóstico de la versión publicada

La página tiene una base conceptual correcta, pero actualmente se percibe extensa, irregular y parcialmente rota.

## Problemas verificados

1. La página supera aproximadamente los `12.150px` de alto en una ventana desktop de 1366px.
2. Hay doce secciones antes del footer, varias de ellas con más espacio vacío que contenido.
3. Se acumulan paddings superiores e inferiores entre módulos consecutivos.
4. Después del hero queda una franja vacía demasiado grande antes del siguiente título.
5. La introducción `Hoy abre tus reseñas...` ocupa aproximadamente 570px aunque contiene poco contenido.
6. La sección de casos ocupa aproximadamente 1.840px.
7. La card `Reseñas de Google` hereda una altura equivalente a dos filas y deja un vacío vertical enorme.
8. Las cards de casos tienen alturas diferentes y sus CTAs quedan en posiciones inconsistentes.
9. Algunas interfaces simuladas son demasiado pequeñas o parecen formularios incompletos.
10. El proceso de cuatro pasos ocupa casi una pantalla completa para contenido muy breve.
11. Los títulos se repiten con una escala excesiva y hacen que todas las secciones compitan por la misma jerarquía.
12. El bloque de formulario presenta una estructura de contenedor inconsistente respecto del resto de la página.
13. Light mode usa demasiado gris claro y poco contraste entre fondo, cards e interfaces.
14. Hay demasiadas superficies rectangulares grandes con poco contenido.
15. La navegación fija reduce el área útil, pero algunos anclajes no compensan correctamente su altura.
16. La página demuestra muchas posibilidades, pero tarda demasiado en llegar a la conversión.

## Conclusión

No resolver estos problemas agregando `overflow: hidden`, alturas arbitrarias o márgenes negativos. La causa es una arquitectura vertical sobredimensionada y una grilla de casos incorrecta.

---

# 2. Objetivo final

La página debe sentirse:

- directa;
- comercial;
- tecnológica;
- clara para una persona no técnica;
- visualmente sofisticada;
- consistente con el Home de Fleximy;
- rápida de recorrer;
- sólida en dark y light mode;
- completamente estable entre 360px y 1920px.

## Altura objetivo

En desktop de 1366–1440px, la página completa —desde debajo del header hasta antes del footer— debería medir aproximadamente entre `8.000px` y `9.200px`.

No perseguir una cifra mediante recortes. Alcanzarla eliminando padding redundante, corrigiendo la grilla y fusionando contenido relacionado.

---

# 3. Orden definitivo de la página

Mantener esta historia:

1. Hero — qué es Fleximy NFC.
2. Problema — demasiados pasos frente a una acción directa.
3. Posibilidades — una misma pieza puede abrir distintos destinos.
4. Casos principales — reseñas, WhatsApp, menú y reservas.
5. Implementación — elegís, configuramos, ubicás, actualizás.
6. Destino configurable — la pieza queda y el enlace cambia.
7. Aplicaciones — rubros y formatos físicos en un único módulo.
8. Escala — una acción, negocio o multipunto.
9. Confianza técnica — simple para el usuario y flexible para el negocio.
10. Conversión — formulario.
11. FAQ.
12. Footer.

No agregar nuevas secciones.

---

# 4. Sistema global de contenedores

Definir y reutilizar tres anchos locales para esta ruta:

```css
.nfc-container {
  width: min(1240px, calc(100% - 48px));
  margin-inline: auto;
  min-width: 0;
}

.nfc-container--wide {
  width: min(1440px, calc(100% - 64px));
  margin-inline: auto;
  min-width: 0;
}

.nfc-container--text {
  width: min(820px, calc(100% - 48px));
  margin-inline: auto;
  min-width: 0;
}
```

## Mobile

```css
@media (max-width: 767px) {
  .nfc-container,
  .nfc-container--wide,
  .nfc-container--text {
    width: min(100% - 40px, 560px);
  }
}
```

## Reglas obligatorias

- Todos los módulos deben usar uno de estos contenedores.
- No mezclar `container`, `container-wide` y anchos locales sin una razón documentada.
- No usar `width: 100vw` dentro de la página.
- No usar márgenes negativos para alcanzar los bordes.
- Aplicar `min-width: 0` a todos los hijos de grids y flex layouts.
- Aplicar `max-width: 100%` a imágenes, SVG e interfaces simuladas.
- No aplicar `overflow-x: hidden` a `html` o `body` para disimular errores.

---

# 5. Ritmo vertical general

Reemplazar paddings independientes y descontrolados por un sistema consistente:

```css
:root {
  --nfc-section-space: clamp(88px, 8vw, 132px);
  --nfc-section-space-compact: clamp(64px, 6vw, 96px);
  --nfc-heading-gap: clamp(40px, 4vw, 64px);
}
```

## Aplicación

- Hero: tratamiento propio.
- Secciones principales: `padding-block: var(--nfc-section-space)`.
- Secciones compactas: `padding-block: var(--nfc-section-space-compact)`.
- Nunca sumar un `margin-bottom` grande al último hijo y otro `padding-top` grande a la sección siguiente.
- El espacio entre dos módulos debe pertenecer a uno solo de ellos.
- No usar `min-height: 100vh` salvo en el hero, y solo si no produce huecos.
- No usar alturas fijas para secciones de contenido.

---

# 6. Escala tipográfica

La página actual utiliza títulos demasiado similares entre sí. Crear tres niveles reales.

```css
.nfc-display {
  font-size: clamp(54px, 6.1vw, 108px);
  line-height: 0.92;
  letter-spacing: -0.065em;
  text-wrap: balance;
}

.nfc-section-title {
  font-size: clamp(40px, 4.2vw, 68px);
  line-height: 0.98;
  letter-spacing: -0.052em;
  text-wrap: balance;
}

.nfc-subsection-title {
  font-size: clamp(28px, 2.5vw, 42px);
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.nfc-lead {
  font-size: clamp(18px, 1.45vw, 22px);
  line-height: 1.55;
}
```

## Reglas

- Solo el H1 puede usar `.nfc-display`.
- Los H2 usan `.nfc-section-title`.
- Los H3 usan `.nfc-subsection-title`, pero dentro de cards no deben superar 32px.
- Limitar párrafos a `60–70ch`.
- No usar `<br>` manuales para resolver saltos responsive.
- Usar `text-wrap: balance` en títulos y `text-wrap: pretty` en párrafos cuando esté soportado.

---

# 7. Header

Mantener el header actual, pero verificar:

- altura entre `68px` y `76px`;
- logo alineado al mismo eje del contenido;
- navegación centrada;
- selector de theme y CTA alineados;
- fondo con blur moderado, no completamente opaco;
- `position: sticky; top: 0`;
- `z-index` suficiente;
- borde inferior sutil;
- anclajes con `scroll-margin-top: 96px`.

No modificar el contenido del header.

---

# 8. Módulo 01 — Hero

## Mantener

- eyebrow `FLEXIMY NFC · DEL MUNDO FÍSICO AL DIGITAL`;
- H1 actual;
- bajada;
- claim verde;
- dos CTAs;
- soporte NFC y teléfono;
- texto dinámico inferior.

## Corregir composición

```css
.nfc-hero {
  min-height: calc(100svh - 72px);
  padding-block: clamp(72px, 8vh, 112px);
  display: flex;
  align-items: center;
}

.nfc-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(480px, 1.08fr);
  gap: clamp(48px, 6vw, 96px);
  align-items: center;
}
```

## Texto

- H1 máximo `650px`.
- En 1366px debe ocupar entre cuatro y cinco líneas, no más.
- Bajada máximo `620px`.
- CTAs en una misma fila mientras existan al menos 720px de ancho útil.
- Separación entre párrafo, claim y botones: 18px / 24px / 30px.

## Visual NFC

- Centrar tarjeta y teléfono como una sola composición.
- El teléfono no debe tocar el borde derecho.
- Evitar que la sombra inferior parezca una mancha gris desconectada.
- El texto dinámico debe quedar inmediatamente debajo de la composición, no a más de 40px.
- Ningún elemento absoluto puede ampliar el ancho del documento.

## Transición al módulo siguiente

- El hero debe terminar sin una franja vacía superior a 96px.
- El texto `NFC + QR · CONFIGURABLE · LISTO PARA USAR` debe permanecer dentro del bloque de contenido y no quedar aislado arriba de un vacío.

## Mobile

- Una columna.
- Texto primero, visual después.
- H1 entre 48px y 62px.
- Botones apilados y de ancho completo.
- Teléfono y pieza con ancho máximo de 340px.
- Hero sin `100vh` rígido.

---

# 9. Módulo 02 — Menos pasos

## Objetivo

Mostrar la diferencia entre una experiencia complicada y una acción directa.

## Altura objetivo

Entre `520px` y `650px` en desktop, incluyendo padding.

## Layout

```css
.nfc-friction__header {
  display: grid;
  grid-template-columns: minmax(0, 0.62fr) minmax(320px, 0.38fr);
  gap: 64px;
  align-items: end;
}
```

- Título a la izquierda.
- Párrafo a la derecha o debajo si el ancho no alcanza.
- Comparación inmediatamente debajo, con margen superior de 48–56px.

## Comparación

- Dos paneles alineados y de igual altura: 160–190px.
- Izquierda: `Buscar → Escribir → Elegir → Encontrar → Actuar`.
- Derecha: `Acercar → Listo`.
- El panel derecho debe tener mayor contraste y un halo controlado.
- No dejar 200px vacíos antes ni después de la comparación.

---

# 10. Módulo 03 — Introducción a posibilidades

## Problema actual

El título y la bajada ocupan una sección independiente de aproximadamente 570px, generando un corte innecesario antes de los casos.

## Solución

Fusionar visualmente esta introducción con la grilla de casos. Deben pertenecer al mismo `<section id="nfc-posibilidades">`.

El encabezado no debe existir como sección aislada.

## Encabezado

- Eyebrow centrado.
- H2 centrado, máximo 900px.
- Bajada máximo 720px.
- Claim monoespaciado debajo.
- Margen hasta las cards: 64–72px.

## Fondo

Un único fondo continuo debe envolver encabezado y casos.

No insertar una franja de 200px entre el claim y las cards.

---

# 11. Módulo 04 — Casos principales

## Reemplazo obligatorio de la grilla actual

Eliminar la composición asimétrica que hace que `Reseñas de Google` ocupe la altura de dos filas.

No usar `grid-row: span 2`, `grid-template-areas` asimétricas ni una altura heredada del track más alto.

## Nueva grilla desktop

```css
.nfc-use-cases {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

.nfc-use-case {
  min-height: 470px;
  height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  padding: clamp(28px, 3vw, 42px);
}
```

Las cuatro cards deben tener la misma altura dentro de cada fila. La segunda fila no debe depender de la primera.

## Estructura interna exacta

Cada card contiene:

1. número de caso;
2. título y explicación;
3. interfaz demostrativa;
4. enlace o botón final.

El CTA debe quedar alineado en el borde inferior gracias al grid interno, no mediante `position: absolute`.

## Cards

### Caso 01 — Reseñas de Google

- Mostrar estrellas.
- Campo de comentario con una línea de texto simulada, no una barra vacía.
- Botón `Publicar reseña`.
- Confirmación verde.
- La interfaz debe ocupar máximo 170px.

### Caso 02 — WhatsApp

- Mostrar mensaje inicial.
- Avatar/marca del negocio.
- Botón `Iniciar conversación`.
- Agregar una pequeña respuesta de ejemplo para que no parezca un formulario incompleto.

### Caso 03 — Menú o catálogo

- Mostrar tres productos.
- Nombre, categoría breve y precio.
- Agregar un pequeño thumbnail creado con CSS o asset optimizado.
- No usar tres filas blancas sin jerarquía.

### Caso 04 — Turnos y reservas

- Mostrar selector semanal compacto.
- Dos horarios disponibles.
- Estado seleccionado.
- CTA `Confirmar turno`.
- Evitar una grilla de letras sin contexto.

## CTA `Ver cómo funciona`

- Si abre un modal o cambia una demostración real, conservarlo y verificarlo.
- Si no ejecuta ninguna acción, eliminarlo.
- No debe existir ningún botón visible que no funcione.
- No repetir cuatro CTAs inactivos.

## Lista `También puede abrir`

Ubicarla debajo de las cuatro cards, dentro de la misma sección.

- margen superior: 56px;
- título breve centrado;
- chips con wrap natural;
- gap de 10–12px;
- sin marquee obligatorio;
- sin ancho mayor al viewport.

## Altura esperada

Encabezado + cards + lista: aproximadamente `1.350px–1.550px`, no 2.400px combinados.

---

# 12. Módulo 05 — Cómo funciona

## Copy

Mantener:

`Lo configuramos. Lo entregamos. Tus clientes lo usan.`

## Layout

- Encabezado a la izquierda, máximo 800px.
- Diagrama de proceso inmediatamente debajo.
- Cards de pasos debajo del diagrama.

## Proceso

Reemplazar la caja punteada de gran ancho por una línea de progreso integrada:

```text
01 Elegís → 02 Configuramos → 03 Lo ubicás → 04 Lo actualizás
```

- línea fina con gradiente;
- cuatro nodos;
- sin borde punteado exterior;
- altura total: 72–90px.

## Cards de pasos

```css
grid-template-columns: repeat(4, minmax(0, 1fr));
gap: 20px;
```

- altura mínima: 220px;
- padding: 26–30px;
- título: 24–28px;
- texto: 16–18px;
- sin enormes superficies vacías.

## Altura total objetivo

Entre `700px` y `820px`.

---

# 13. Módulo 06 — Destino configurable

## Mantener la idea

`La pieza queda. El destino evoluciona con tu negocio.`

Esta es una demostración importante y puede conservar interacción real.

## Nueva composición

```css
.nfc-configurable__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(480px, 1.12fr);
  gap: clamp(48px, 6vw, 84px);
  align-items: center;
}
```

### Izquierda

- eyebrow;
- título;
- bajada;
- selector de destino;
- botón Guardar;
- estado actualizado.

### Derecha

- soporte NFC;
- teléfono;
- preview del destino seleccionado.

## Interacción

- Radios reales y accesibles.
- Al elegir destino, actualizar preview.
- `Guardar cambio` debe generar un estado visual claro.
- No permitir múltiples controles con aspecto clickeable que no respondan.
- El preview no debe exceder el contenedor.

## Altura objetivo

Entre `760px` y `900px`, no más de 1.100px.

---

# 14. Módulo 07 — Rubros y formatos físicos

## Fusión recomendada

Unir visualmente:

- `Una solución diferente para cada negocio`;
- `En el mostrador, la mesa, la vidriera...`.

No deben funcionar como dos secciones gigantes consecutivas.

## Primera parte: rubros

- Eyebrow y título centrados.
- Bajada centrada.
- Lista de rubros en una línea con wrap o marquee CSS discreto.
- Debajo, una demostración pequeña:

```text
HOTEL → HABITACIÓN → CONECTAR WI-FI
```

- La demostración no debe ocupar más de 180px de alto.

## Segunda parte: formatos

- Subtítulo alineado a la izquierda.
- Descripción breve.
- Grid de formatos físicos.

```css
grid-template-columns: repeat(4, minmax(0, 1fr));
gap: 18px;
```

## Cantidad visible

Mostrar seis formatos, no siete cards gigantes:

1. soporte de mostrador;
2. sticker NFC + QR;
3. tarjeta personal;
4. display de mesa;
5. pieza para vidriera;
6. identificador de empleado o packaging.

El séptimo formato puede integrarse como texto secundario.

## Card de formato

- altura: 230–280px;
- iconografía CSS/SVG reconocible;
- título completo;
- badge `NFC + QR`;
- no repetir `Consultar` como falso CTA siete veces;
- usar un CTA único debajo: `Consultar formatos`.

## Altura total del módulo fusionado

Entre `1.000px` y `1.250px`.

---

# 15. Módulo 08 — Escala

## Mantener

`Una solución simple para un local. Una red para todos tus puntos de atención.`

## Cards

Conservar:

- Una acción;
- Negocio;
- Multipunto.

## Diseño

```css
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 22px;
align-items: stretch;
```

- altura uniforme: 420–480px;
- CTA alineado abajo;
- card central levemente destacada como opción recomendada;
- no simular una tabla de precios si no existen precios;
- usar títulos comerciales y listas breves;
- hover únicamente como realce visual, sin desplazar la card.

## Altura total objetivo

Entre `760px` y `880px`.

---

# 16. Módulo 09 — Confianza técnica

## Copy

`Tecnología simple para las personas. Flexible para tu negocio.`

## Rediseño

Este debe ser un módulo compacto, no otra pantalla completa.

```css
.nfc-trust {
  padding-block: var(--nfc-section-space-compact);
}

.nfc-trust__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
  gap: 72px;
  align-items: center;
}
```

- Título a la izquierda.
- Seis ventajas en una grilla 2×3 a la derecha.
- Compatibilidad NFC/QR como nota inferior.
- No crear seis cards grandes; usar filas compactas con ícono.

## Altura total objetivo

Entre `480px` y `620px`.

---

# 17. Módulo 10 — Formulario

## Problema

El módulo debe recuperar el sistema de ancho completo del sitio. No puede comportarse como una sección de aproximadamente 600px mientras el resto utiliza 1.200px.

## Estructura

```html
<section id="nfc-form" class="nfc-contact">
  <div class="nfc-container">
    <div class="nfc-contact__grid">
      <div class="nfc-contact__intro">...</div>
      <div class="nfc-contact__form">...</div>
    </div>
  </div>
</section>
```

```css
.nfc-contact__grid {
  display: grid;
  grid-template-columns: minmax(300px, 0.72fr) minmax(0, 1.28fr);
  gap: clamp(56px, 7vw, 104px);
  align-items: start;
}
```

## Intro izquierda

- eyebrow;
- H2;
- bajada;
- link WhatsApp;
- opcional: tres beneficios breves.

El H2 no debe quedar comprimido en una columna de 340px en desktop. Ancho mínimo recomendado: 380px.

## Formulario derecha

- una superficie clara y definida;
- padding: 36–44px;
- radio: 24px;
- dos columnas para campos cortos;
- una columna para selector de necesidad y textarea;
- labels visibles;
- estados focus claros;
- altura de input: 52–56px;
- textarea: 130–160px;
- botón principal de ancho completo o alineado a la izquierda;
- mensaje legal y respuesta esperada.

## Chips de selección

- botones reales;
- wrap natural;
- estado seleccionado visible en light y dark;
- `aria-pressed` correcto;
- no permitir que el texto desborde.

## Altura total objetivo

Entre `900px` y `1.050px` en desktop.

---

# 18. Módulo 11 — FAQ

## Diseño

- Contenedor de texto de máximo 900px.
- Título centrado.
- Acordeón debajo.
- Ocho preguntas actuales.
- Separación entre filas: 10–12px.
- Padding de cada pregunta: 22–26px.
- Respuesta con ancho máximo de 70ch.
- Solo una pregunta abierta por vez.
- Ícono con rotación suave.
- No reservar altura para respuestas cerradas.

## Altura

Automática. Con una sola respuesta abierta, el módulo debería medir entre `720px` y `900px`.

---

# 19. Footer

Mantener contenido, pero ajustar:

- mismo ancho que `.nfc-container`;
- grilla equilibrada de cuatro columnas;
- padding superior e inferior entre 72 y 96px;
- divisor antes del copyright;
- evitar una altura vacía excesiva debajo del copyright;
- en mobile, columnas apiladas con gaps de 32px.

Corregir enlaces del footer que apuntan a anchors inexistentes en esta ruta. Los enlaces deben ir al Home con su hash cuando corresponda, por ejemplo `/#que-hacemos`.

---

# 20. Dark y light mode

## Light mode

Actualmente demasiadas superficies se mezclan.

Crear cuatro niveles:

1. fondo de página: gris frío muy claro;
2. alternancia de sección: blanco frío o violeta casi imperceptible;
3. cards: blanco con borde visible;
4. interfaces internas: superficie ligeramente más oscura o contrastante.

Valores orientativos:

```css
--nfc-page: #f5f6fb;
--nfc-section: #fafbfe;
--nfc-card: #ffffff;
--nfc-interface: #f0f2f8;
--nfc-text: #111527;
--nfc-muted: #667087;
--nfc-border: rgba(39, 48, 84, 0.12);
```

No aplicar opacidad al contenedor completo de una card.

## Dark mode

Crear niveles equivalentes:

```css
--nfc-page: #080b18;
--nfc-section: #0b0f20;
--nfc-card: #10162a;
--nfc-interface: #0c1122;
--nfc-text: #f3f5ff;
--nfc-muted: #aeb6cc;
--nfc-border: rgba(151, 164, 215, 0.15);
```

- No usar negro puro.
- No dejar textos secundarios por debajo de contraste AA.
- Gradientes solo en acentos, CTAs y elementos activos.
- No convertir todas las cards en glassmorphism.

---

# 21. Animaciones y efectos

Mantener una sensación tecnológica sin afectar el layout.

## Permitido

- reveal suave al entrar al viewport;
- translateY máximo 20px;
- fade de 450–700ms;
- gradiente ambiental de baja opacidad;
- pulso NFC en el hero;
- transición del preview configurable;
- hover sutil en cards y CTAs;
- marquee CSS lento en rubros, con pausa en hover.

## Prohibido

- animar width o height;
- sticky sections prolongadas;
- stack cards;
- scroll horizontal;
- cursores falsos;
- elementos que persiguen al mouse;
- parallax que desplace texto;
- `transform: scale()` para adaptar interfaces;
- temporizadores que cambien el layout;
- efectos que generen CLS;
- movimientos continuos con alto consumo.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- desactivar marquee, pulsos y desplazamientos;
- mostrar todos los contenidos en estado final;
- conservar transiciones de color instantáneas o mínimas.

---

# 22. Responsive obligatorio

## 1280px–1599px

- mantener grillas desktop;
- ajustar gap y padding;
- no reducir interfaces por debajo de legibilidad;
- cards de casos 2×2;
- formatos físicos 3×2 si cuatro columnas resultan estrechas.

## 1024px–1279px

- hero aún puede usar dos columnas, con visual de mínimo 400px;
- casos 2×2;
- proceso 2×2;
- formatos 3×2;
- planes 3 columnas si cada card conserva mínimo 280px; de lo contrario 1+2;
- formulario dos columnas con intro de 34–38%.

## 768px–1023px

- hero en una columna;
- comparación en dos columnas;
- casos 2×2 si cada card mantiene mínimo 330px;
- proceso 2×2;
- configurable en una columna;
- formatos 2×3;
- planes en una columna o scroll no permitido: deben apilarse;
- confianza en una columna;
- formulario en una columna.

## Hasta 767px

- padding lateral: 20px;
- header compacto;
- navegación desktop reemplazada por menú accesible;
- hero en una columna;
- CTAs apilados;
- todas las grillas en una columna;
- casos con altura automática;
- interfaces simplificadas, no escaladas;
- cards de pasos compactas;
- radios y chips con targets mínimos de 44px;
- formulario en una columna;
- H1 máximo 62px;
- H2 entre 38px y 48px;
- sin texto menor a 14px, excepto eyebrow decorativo de 11–12px;
- ningún overflow horizontal;
- ningún elemento fijo tapa campos o CTAs.

---

# 23. HTML y accesibilidad

- Un solo `<h1>`.
- Cada sección con `<section>` y encabezado semántico.
- Cards de casos como `<article>`.
- Listas reales para beneficios y formatos.
- Botones solo para acciones.
- Links solo para navegación.
- Si `Ver cómo funciona` no funciona, eliminarlo.
- Radios reales en el configurador.
- Labels asociados a inputs.
- Estados seleccionados con `aria-pressed`.
- Acordeón con `aria-expanded` y región asociada.
- Focus visible.
- Contraste AA.
- Los SVG decorativos deben usar `aria-hidden="true"`.
- Los mensajes de éxito deben anunciarse mediante `aria-live="polite"`.
- Respetar `scroll-margin-top` para header sticky.

---

# 24. Reglas de código

## Debe hacer

- identificar qué selectores generan las alturas excesivas;
- eliminar grid spans de la sección de casos;
- usar CSS Grid/Flexbox para layout principal;
- usar `clamp()` para escalas fluidas;
- usar tokens locales;
- mantener estilos encapsulados en la ruta NFC;
- retirar CSS e imports muertos;
- conservar las funcionalidades existentes que sí funcionan;
- ejecutar build y revisar consola;
- verificar dark/light por separado.

## No debe hacer

- no parchear con márgenes negativos;
- no ocultar contenido;
- no aplicar `overflow: hidden` a secciones para cortar huecos;
- no fijar alturas sin comprobar contenido;
- no usar absolute positioning como sistema principal;
- no añadir nuevas dependencias;
- no instalar librerías de animación;
- no duplicar el DOM para themes;
- no cambiar todo el copy;
- no agregar nuevas secciones;
- no alterar componentes globales sin comprobar todas las rutas;
- no resolver mobile reduciendo el desktop con `scale()`;
- no dejar botones sin funcionalidad;
- no declarar la tarea finalizada solo porque compila.

---

# 25. QA visual obligatorio

Verificar manualmente:

- 1920 × 1080 — light;
- 1920 × 1080 — dark;
- 1440 × 900 — light;
- 1440 × 900 — dark;
- 1366 × 768 — light;
- 1366 × 768 — dark;
- 1280 × 800;
- 1024 × 768;
- 768 × 1024;
- 430 × 932;
- 390 × 844;
- 360 × 800.

## En cada resolución comprobar

1. ancho del documento igual al viewport;
2. ausencia de scroll horizontal;
3. header sin superposición;
4. hero equilibrado;
5. transición sin hueco después del hero;
6. módulo Menos pasos compacto;
7. introducción de posibilidades unida a las cards;
8. cuatro casos con alturas coherentes;
9. card de reseñas sin espacio vacío;
10. CTAs alineados;
11. proceso sin caja punteada gigante;
12. configurador dentro del contenedor;
13. formatos físicos compactos;
14. planes de igual altura;
15. bloque técnico compacto;
16. formulario usando el ancho correcto;
17. FAQ sin espacio reservado para respuestas cerradas;
18. footer sin anchors rotos;
19. contraste correcto en ambos themes;
20. foco visible y navegación por teclado.

## Validación técnica

- build exitoso;
- sin errores propios de la aplicación en consola;
- sin warnings React por keys o hydration;
- sin imports sin uso;
- sin listeners o timers acumulados;
- sin layout shift visible;
- sin imágenes sin dimensiones;
- sin controles inactivos con apariencia funcional.

---

# 26. Criterios de aprobación

La tarea se aprueba únicamente si:

1. la página mantiene su mensaje y se siente claramente más corta;
2. el alto total desktop queda aproximadamente entre 8.000px y 9.200px;
3. desaparece el gran hueco después del hero;
4. el encabezado de posibilidades y sus casos forman un único módulo;
5. la card de Reseñas ya no ocupa dos filas;
6. los cuatro casos tienen interfaces completas y proporcionadas;
7. no quedan CTAs falsos;
8. el proceso se lee rápido;
9. el configurador continúa funcionando;
10. rubros y formatos se perciben como una misma historia;
11. el bloque técnico es compacto;
12. el formulario usa una grilla de ancho completo;
13. dark y light tienen profundidad real;
14. no existe overflow horizontal;
15. mobile no es una versión miniaturizada del desktop;
16. Home y otras rutas no cambiaron accidentalmente;
17. build y consola están limpios.

---

# 27. Orden exacto de implementación

1. Auditar el componente y sus hojas de estilo actuales.
2. Registrar la altura actual de cada sección.
3. Implementar los tres contenedores NFC.
4. Normalizar el ritmo vertical.
5. Corregir hero y su transición inferior.
6. Compactar Menos pasos.
7. Fusionar introducción de posibilidades y casos.
8. Reemplazar la grilla asimétrica de casos por 2×2.
9. Completar interfaces internas y validar CTAs.
10. Compactar el proceso.
11. Ajustar el configurador sin romper su interacción.
12. Fusionar visualmente rubros y formatos.
13. Ajustar cards de escala.
14. Compactar confianza técnica.
15. Reconstruir la grilla del formulario.
16. Ajustar FAQ y footer.
17. Diseñar light y dark.
18. Implementar responsive.
19. Ejecutar QA en todas las resoluciones.
20. Corregir problemas encontrados.
21. Eliminar código muerto.
22. Ejecutar build final.

---

# 28. Entrega requerida de OpenCode

Al finalizar, informar obligatoriamente:

1. archivos modificados;
2. altura total antes y después en 1366px;
3. causa exacta del vacío de la card Reseñas;
4. reglas CSS eliminadas o reemplazadas;
5. nueva estructura de casos;
6. módulos fusionados;
7. corrección del formulario;
8. solución dark/light;
9. comportamiento tablet/mobile;
10. controles eliminados por no funcionar;
11. resoluciones verificadas;
12. resultado del build;
13. resultado de consola;
14. confirmación de ausencia de overflow horizontal.

No responder únicamente `implementado`.

---

# Instrucción final

Implementá esta especificación como una corrección integral de `/soluciones/nfc`.

No alteres la propuesta comercial ni conviertas la página en otro proyecto. El trabajo consiste en transformar la implementación actual —larga, irregular y con huecos visibles— en una landing compacta, elegante, clara y técnicamente sólida.

La prioridad es:

1. eliminar los espacios injustificados;
2. corregir la grilla rota de casos;
3. ordenar la jerarquía;
4. mejorar las interfaces CSS;
5. asegurar responsive real;
6. terminar ambos themes;
7. verificar visualmente antes de entregar.
