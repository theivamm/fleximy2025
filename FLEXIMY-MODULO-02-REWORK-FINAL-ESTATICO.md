# FLEXIMY — MÓDULO 02 / REWORK FINAL

## 0. Carácter de esta especificación

Este documento es una instrucción de implementación completa y vinculante.

Debe reemplazarse **todo el módulo 02 actual**. No se debe corregir, adaptar, conservar ni reinterpretar la implementación existente.

OpenCode debe trabajar sobre el proyecto real, identificar el componente que actualmente contiene el título:

> Lo que ven tus clientes. Todo lo que necesitás para trabajar.

y sustituir ese módulo completo por la sección definida a continuación.

No modificar:

- header;
- hero;
- módulo de costos;
- módulos posteriores;
- formulario;
- FAQ;
- footer;
- rutas;
- contenido global no relacionado;
- sistema tipográfico global, salvo ajustes estrictamente locales del nuevo módulo.

---

# 1. Decisión de diseño

## Eliminar completamente el módulo actual

Eliminar:

- el selector vertical de cuatro opciones;
- el autoplay entre cuatro dashboards;
- las cuatro vistas intercambiables;
- tabs, indicadores de estado y progreso del módulo;
- textos que cambian automáticamente;
- cualquier temporizador asociado;
- controles interactivos del módulo;
- mockups separados;
- alturas mínimas o fijas heredadas;
- estilos y clases que queden sin uso;
- listeners, estados y efectos React asociados a la versión anterior.

No esconder el módulo viejo con CSS. Remover su markup, lógica y estilos específicos.

## Nueva idea

Crear una sección estática, panorámica y contundente que explique en una sola mirada:

1. Fleximy crea el website que usan los clientes.
2. Fleximy crea la aplicación que usa el negocio.
3. Fleximy crea el dashboard que muestra los resultados.

Las tres partes deben verse dentro de **una única plataforma visual conectada**.

No son tres cards independientes. No son tres capturas. No es un carrusel. No es una demo navegable.

Es una única composición editorial que muestra el recorrido:

`WEBSITE → APP DE GESTIÓN → DASHBOARD`

---

# 2. Objetivo comercial

Una persona que no conoce Fleximy debe comprender el servicio en menos de cinco segundos.

El módulo debe responder visualmente:

- qué crea Fleximy;
- qué ve el cliente del negocio;
- qué usa internamente el equipo;
- qué información obtiene el dueño;
- por qué no es solamente una página web.

La sección no debe obligar a leer párrafos largos ni aprender una interacción.

---

# 3. Copy obligatorio

No inventar textos alternativos y no agregar párrafos.

## Eyebrow

`TODO EN UNA SOLA PLATAFORMA`

## Título principal

# Tu web vende. Tu aplicación organiza. Tu dashboard te muestra qué sigue.

Aplicar el gradiente de marca exclusivamente a:

`Tu aplicación organiza.`

El resto del título debe usar el color principal del theme.

## Bajada

Creamos las tres partes alrededor de tu negocio para que tus clientes, tu equipo y tu información trabajen en el mismo sistema.

## Etiquetas dentro de la composición

### 01 — Website

**Lo que ven tus clientes**

Mostrá, vendé y recibí consultas.

### 02 — App de gestión

**Donde trabaja tu equipo**

Clientes, pedidos y tareas en un solo lugar.

### 03 — Dashboard

**Donde ves qué está pasando**

Resultados y pendientes listos para decidir.

## Cierre del módulo

**Todo empieza en tu website. Todo continúa dentro de tu plataforma.**

---

# 4. Estructura visual general

La sección está formada por cuatro niveles:

1. encabezado editorial;
2. escenario panorámico principal;
3. frase de cierre;
4. transición visual hacia el módulo siguiente.

## Altura objetivo

En desktop, la sección completa debe medir aproximadamente entre `900px` y `1080px`.

No superar `1150px` en 1920 × 1080.

No usar `min-height: 100vh`.

No generar espacios vacíos artificiales para producir una sensación premium.

## Fondo

La sección debe funcionar como una pausa visual respecto del hero.

### Dark mode

- fondo base: azul negro profundo;
- gradiente radial violeta muy tenue desde el centro superior;
- segundo halo cyan muy tenue detrás del escenario;
- textura de grano opcional, opacidad máxima `0.025`;
- nunca usar negro puro `#000`.

Referencia aproximada:

```css
background:
  radial-gradient(circle at 48% 42%, rgba(91, 83, 255, 0.12), transparent 38%),
  radial-gradient(circle at 78% 58%, rgba(24, 211, 215, 0.07), transparent 32%),
  #080b18;
```

### Light mode

- fondo base gris frío muy claro;
- halo violeta/cyan todavía más tenue;
- contraste limpio, no blanco quemado;
- nunca resolver light mode aplicando `filter`, `invert()` o una simple inversión de variables.

Referencia aproximada:

```css
background:
  radial-gradient(circle at 48% 42%, rgba(100, 91, 255, 0.09), transparent 40%),
  radial-gradient(circle at 78% 58%, rgba(25, 195, 202, 0.06), transparent 34%),
  #f5f6fb;
```

---

# 5. Contenedor y grilla

## Contenedor principal

```css
width: min(1480px, calc(100% - 64px));
margin-inline: auto;
padding-block: clamp(96px, 8vw, 144px);
min-width: 0;
```

En pantallas mayores a 1800 px puede utilizarse un ancho máximo de `1520px`, pero no más.

No usar:

- `width: 100vw`;
- márgenes negativos para ampliar la sección;
- elementos posicionados fuera del contenedor;
- escalado global con `transform: scale()`;
- `overflow-x: hidden` para ocultar errores.

## Encabezado

Debe estar centrado y separado del escenario.

- eyebrow centrado;
- título centrado;
- bajada centrada;
- ancho máximo del título: `1120px`;
- ancho máximo de la bajada: `760px`;
- separación entre eyebrow y título: `22px`;
- separación entre título y bajada: `28px`;
- separación entre bajada y escenario: `64px` a `80px`.

### Tamaños

```css
.module02-title {
  font-size: clamp(44px, 4.35vw, 78px);
  line-height: 0.98;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.module02-description {
  font-size: clamp(17px, 1.3vw, 21px);
  line-height: 1.55;
}
```

En 1920 px, el título debe ocupar un máximo de tres líneas:

```text
Tu web vende.
Tu aplicación organiza.
Tu dashboard te muestra qué sigue.
```

No forzar estos saltos con `<br>` si el ancho permite un balance mejor. Usar un wrapper semántico para aplicar el gradiente únicamente a la segunda oración.

---

# 6. Escenario panorámico

## Forma general

Crear un único componente visual llamado conceptualmente `PlatformJourney`.

Debe ser una superficie horizontal con tres sectores integrados:

```text
┌──────────────────────────────────────────────────────────────────┐
│  01 WEBSITE       →       02 APP DE GESTIÓN      →  03 DASHBOARD│
│                                                                  │
│  experiencia              centro operativo            resultados │
│  del cliente              del negocio                 y alertas  │
└──────────────────────────────────────────────────────────────────┘
```

### Dimensiones desktop

- ancho: 100% del contenedor;
- altura ideal: `clamp(500px, 32vw, 610px)`;
- relación visual aproximada: `2.45 / 1`;
- radio exterior: `28px`;
- padding interno: `clamp(20px, 2vw, 32px)`;
- borde: `1px` con contraste muy sutil;
- sombra amplia y difusa;
- `overflow: clip` únicamente en el marco visual;
- ningún contenido importante debe depender del recorte.

## Barra superior

Incluir una barra superior de 52–58 px, integrada dentro del escenario:

- tres puntos pequeños a la izquierda;
- texto `FLEXIMY / PLATAFORMA DE NEGOCIO`;
- a la derecha: punto verde y texto `SISTEMA ACTIVO`;
- no simular una URL;
- no usar tabs;
- no colocar botones.

La barra existe para dar contexto de producto, no para imitar un navegador específico.

## División interna

Debajo de la barra, dividir la superficie en tres columnas:

```css
grid-template-columns: minmax(0, 0.94fr) minmax(0, 1.16fr) minmax(0, 0.9fr);
gap: 1px;
height: calc(100% - 56px);
```

Usar separadores de `1px`. Las columnas comparten el mismo fondo estructural. No deben parecer tres cards pegadas.

Cada sector contiene:

1. cabecera comercial breve;
2. interfaz CSS representativa;
3. un estado o resultado;
4. un nodo de conexión hacia el siguiente sector.

---

# 7. Sector 01 — Website

## Objetivo

Debe entenderse como la experiencia pública que ve un cliente.

## Encabezado

- número `01`;
- etiqueta `WEBSITE`;
- título `Lo que ven tus clientes`;
- texto `Mostrá, vendé y recibí consultas.`

## Interfaz visual

Crear una landing compacta de un negocio gastronómico ficticio.

Debe mostrar:

- mini navegación con marca `BRUMA`;
- título principal `Algo bueno está por pasar`;
- CTA `Ver el menú`;
- producto protagonista creado con CSS o un asset transparente ya disponible;
- dos productos pequeños con nombre y precio;
- una acción de pedido visible;
- sello `Abierto ahora`.

La mini web debe verse terminada, no como wireframe.

Usar:

- fondos oscuros o crema según el theme;
- una imagen/producto con volumen;
- tipografía legible;
- precios y CTA con contraste;
- escala coherente.

No usar:

- fotos rectangulares genéricas;
- esqueletos;
- bloques sin contenido;
- textos ilegibles por ser demasiado pequeños;
- más de tres productos.

## Evento visual

En la parte inferior derecha del sector mostrar una pequeña confirmación:

`Nueva consulta · Mesa para 4`

Esta notificación debe dirigirse visualmente hacia el sector 02 mediante la línea de conexión.

---

# 8. Sector 02 — App de gestión

## Objetivo

Debe ser el centro visual del escenario y la columna más importante.

## Encabezado

- número `02`;
- etiqueta `APP DE GESTIÓN`;
- título `Donde trabaja tu equipo`;
- texto `Clientes, pedidos y tareas en un solo lugar.`

## Interfaz visual

Crear un centro operativo compacto con tres áreas claramente jerarquizadas:

### A. Bandeja

Mostrar tres entradas:

- `Marina · Reserva web`;
- `Lucas · Pedido nuevo`;
- `Sofía · WhatsApp`.

Cada entrada tiene:

- avatar con inicial;
- canal;
- hora;
- estado.

### B. Pedido o consulta activa

Mostrar el caso seleccionado:

- `Mesa para 4`;
- `Hoy · 21:00`;
- `Confirmada`;
- cliente `Marina López`;
- acción interna `Asignado a Lucía`.

### C. Próximas acciones

Mostrar solamente dos:

- `Preparar mesa 04`;
- `Enviar confirmación`.

La interfaz debe sentirse operativa, pero no debe estar saturada.

## Evento visual

Mostrar un estado breve:

`Consulta convertida en reserva`

Desde este estado sale una segunda conexión visual hacia el sector 03.

---

# 9. Sector 03 — Dashboard

## Objetivo

Debe mostrar que la actividad del website y de la aplicación termina convertida en información útil.

## Encabezado

- número `03`;
- etiqueta `DASHBOARD`;
- título `Donde ves qué está pasando`;
- texto `Resultados y pendientes listos para decidir.`

## Interfaz visual

Mostrar:

### KPIs

- `Ventas hoy` — `$184.500` — `+18%`;
- `Reservas` — `12` — `+3`;
- `Clientes nuevos` — `8` — `+12%`.

### Gráfico

- un gráfico de línea o área de siete puntos;
- construido con SVG inline o CSS;
- curva legible;
- gradiente sutil bajo la línea;
- una marca destacada en el último punto;
- no usar una librería de charts para este gráfico.

### Insight

Mostrar:

`Tu horario con más actividad es de 19 a 21 h.`

### Pendiente

Mostrar una sola alerta:

`Stock bajo · Café Brasil`

No agregar más métricas ni mini paneles.

---

# 10. Conexión visual entre sectores

Las tres partes deben sentirse conectadas.

## Línea

- línea horizontal sutil;
- ubicada aproximadamente al 68% de la altura útil;
- atraviesa los tres sectores;
- gradiente violeta → azul → cyan;
- opacidad base baja;
- interrumpida por tres nodos circulares;
- los nodos corresponden a consulta, gestión y resultado.

## Animación

Animar un pulso luminoso que recorra la línea:

1. aparece en Website;
2. llega a App de gestión;
3. termina en Dashboard;
4. actualiza visualmente el último punto del gráfico;
5. espera;
6. reinicia.

Duración total: `8s` a `10s`.

La animación debe ser ambiental, no narrativa obligatoria. El módulo debe comprenderse perfectamente congelado.

Usar solamente:

- `transform`;
- `opacity`;
- cambios suaves de `box-shadow`;
- `stroke-dashoffset` si se utiliza SVG.

No animar:

- width;
- height;
- top/left;
- grid columns;
- propiedades que generen reflow continuo;
- toda la ventana con zoom;
- componentes con movimientos bruscos.

Con `prefers-reduced-motion: reduce`:

- detener el pulso;
- mantener visibles la línea y los tres nodos;
- no ocultar ningún dato.

---

# 11. Frase de cierre

Debajo del escenario, centrada:

> **Todo empieza en tu website. Todo continúa dentro de tu plataforma.**

Estilo:

- margen superior: `40px` a `52px`;
- tamaño: `clamp(20px, 1.8vw, 28px)`;
- peso 600 o 650;
- ancho máximo: `780px`;
- segunda oración con un gradiente sutil o color de acento;
- no convertirla en botón;
- no sumar CTA en este módulo.

El CTA ya existe en otras partes del inicio. Aquí la función es explicar, no volver a pedir una acción.

---

# 12. Dark mode

## Escenario

- superficie principal: `#0d1224` aproximado;
- sectores internos: variaciones entre `#10162b` y `#0b1020`;
- bordes: `rgba(155, 170, 220, 0.14)`;
- texto primario: `#f3f5ff`;
- texto secundario: no más oscuro que `#aeb7cf`;
- violeta, azul y cyan utilizados en estados y conexiones;
- verde reservado para estados positivos;
- naranja reservado para alertas.

No usar transparencias tan bajas que vuelvan ilegibles las interfaces.

## Profundidad

Usar una sombra exterior equivalente a:

```css
box-shadow:
  0 42px 100px rgba(1, 5, 18, 0.48),
  0 0 0 1px rgba(135, 150, 215, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.04);
```

---

# 13. Light mode

Debe diseñarse como una versión real y no como una adaptación automática.

## Escenario

- marco general blanco frío;
- barra superior gris azulada muy clara;
- sectores con variaciones sutiles de blanco y gris;
- texto primario azul negro;
- texto secundario gris azulado con contraste AA;
- líneas divisorias visibles pero suaves;
- gráficos y estados mantienen sus colores;
- sombras tenues y limpias.

Referencia de sombra:

```css
box-shadow:
  0 32px 80px rgba(45, 53, 90, 0.13),
  0 0 0 1px rgba(48, 57, 95, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.8);
```

No usar:

- interfaz oscura incrustada dentro del light mode;
- texto gris al 30%;
- superficies blancas sin separación;
- filtros CSS sobre el escenario completo.

---

# 14. Responsive exacto

## Desktop grande — 1600 px o más

- mantener encabezado centrado;
- escenario de tres columnas;
- altura entre 560 y 610 px;
- los tres sectores deben verse completos;
- ningún texto de interfaz puede ser inferior a 11 px renderizados;
- no aumentar el ancho del escenario más allá del contenedor.

## Desktop estándar — 1280 a 1599 px

- mantener las tres columnas;
- altura entre 520 y 570 px;
- reducir paddings internos antes que reducir tipografía;
- cada sector debe conservar su jerarquía;
- ocultar detalles decorativos secundarios si no entran;
- nunca comprimir la interfaz con `scale()`.

## Tablet horizontal — 1024 a 1279 px

Cambiar la composición a:

- Website ocupando 40%;
- App de gestión ocupando 60%;
- Dashboard debajo ocupando 100%;
- grid de dos columnas y dos filas;
- la línea de conexión se adapta en forma de recorrido angular;
- altura automática;
- escenario aproximado de 760–840 px.

No permitir que las tres columnas queden microscópicas.

## Tablet vertical — 768 a 1023 px

- una sola superficie;
- tres sectores apilados;
- cada sector conserva su etiqueta, copy e interfaz;
- conectarlos con una línea vertical central desplazada hacia la izquierda;
- separación interna de 1px;
- no crear tres cards flotantes;
- siguen formando un único contenedor.

## Mobile — hasta 767 px

La prioridad es comprensión y legibilidad.

### Contenedor

```css
width: min(100% - 40px, 540px);
padding-block: 80px;
```

### Título

- tamaño entre 38 y 48 px según el ancho;
- line-height entre 0.98 y 1.03;
- no superar cinco líneas;
- bajada entre 16 y 18 px.

### Escenario

- sectores apilados;
- barra superior simplificada;
- cada sector ocupa entre 310 y 390 px de alto;
- eliminar detalles secundarios, no reducirlos a tamaños ilegibles;
- Website muestra título, CTA y un producto;
- App muestra dos consultas y una reserva activa;
- Dashboard muestra dos KPIs, gráfico e insight;
- conexión vertical entre sectores;
- sin scroll interno;
- sin carrusel;
- sin swipe;
- sin tabs;
- sin autoplay;
- sin elementos que salgan del viewport.

### Frase final

- alineada a la izquierda en mobile;
- tamaño 21–24 px;
- máximo cuatro líneas.

---

# 15. Arquitectura de componentes

La implementación puede adaptarse a la estructura actual del proyecto, pero conceptualmente debe separarse así:

```text
Module02Platform
├── Module02Header
├── PlatformJourney
│   ├── PlatformTopbar
│   ├── WebsitePanel
│   ├── ManagementPanel
│   ├── DashboardPanel
│   └── JourneyConnection
└── Module02ClosingStatement
```

## Reglas

- mantener los datos visuales en objetos/arrays locales cuando sea útil;
- no crear abstracciones genéricas innecesarias;
- no transformar cada fila diminuta en un componente independiente;
- evitar un único componente monolítico de cientos de líneas;
- usar nombres semánticos;
- evitar clases heredadas de la versión anterior;
- utilizar los design tokens existentes para colores globales cuando coincidan;
- crear variables locales del módulo para medidas y superficies específicas;
- todos los estilos deben quedar acotados al módulo;
- no alterar selectores genéricos como `h2`, `section`, `button`, `.container` o `body`.

---

# 16. Prohibiciones técnicas

No hacer ninguna de estas cosas:

- instalar GSAP, Framer Motion o una librería nueva para este módulo;
- usar canvas;
- usar WebGL;
- usar videos;
- usar screenshots rasterizadas de dashboards;
- insertar imágenes generadas con texto ilegible;
- crear controles que no funcionan;
- simular un mouse;
- utilizar autoplay de slides;
- usar un carrusel;
- usar sticky scroll;
- usar stack cards;
- usar scroll snapping;
- usar `position: absolute` como sistema principal de layout;
- usar coordenadas rígidas para ubicar las tres columnas;
- usar anchos fijos mayores al viewport;
- usar `100vw` dentro del módulo;
- usar `overflow-x: hidden` en `body` o `html`;
- esconder errores responsive mediante recortes;
- usar `transform: scale()` para adaptar el dashboard;
- duplicar todo el DOM para dark y light mode;
- colocar un dashboard oscuro sin adaptar dentro de light mode;
- agregar nuevas dependencias sin necesidad;
- cambiar el copy establecido;
- sumar slogans o CTAs;
- modificar otros módulos.

---

# 17. Accesibilidad

- usar `<section>` con `aria-labelledby` apuntando al título principal;
- mantener orden DOM: header, Website, App, Dashboard, cierre;
- los gráficos decorativos deben usar `aria-hidden="true"`;
- los datos relevantes deben existir como texto real;
- no usar botones porque el módulo no es interactivo;
- no agregar elementos al tab order;
- contraste mínimo WCAG AA;
- respetar `prefers-reduced-motion`;
- no depender del color para diferenciar estados;
- agregar texto o ícono a estados positivos y alertas.

---

# 18. Rendimiento

- animaciones únicamente con transform y opacity;
- sin timers JavaScript;
- sin listeners de mousemove;
- sin efectos reactivos al cursor;
- sin imágenes de gran peso;
- si se reutiliza un PNG transparente, optimizarlo y definir `width` y `height`;
- evitar layout shift;
- no importar componentes del hero si arrastran lógica innecesaria;
- retirar imports muertos después de eliminar el módulo anterior.

---

# 19. Integración con módulos vecinos

## Entrada desde el hero

La separación entre el final del hero y el inicio del módulo 02 debe ser clara, pero no excesiva.

- no superponer el escenario con el hero;
- no usar margen negativo;
- no duplicar el mismo fondo exacto del hero si ambos quedarían visualmente fusionados;
- usar el cambio tonal del fondo para marcar un nuevo argumento.

## Salida hacia el módulo de costos

- dejar entre 96 y 140 px desde la frase final hasta el comienzo del módulo siguiente;
- no dejar un vacío de 300 px o más;
- no superponer halos, sombras o elementos absolutos sobre el módulo siguiente;
- la transición de fondo debe ser suave.

---

# 20. Criterios visuales de aprobación

No considerar terminado el trabajo si no se cumplen todos estos puntos:

1. El módulo anterior fue eliminado realmente.
2. No existe selector ni cambio automático de dashboards.
3. La sección completa se entiende en una captura estática.
4. Website, App de gestión y Dashboard se ven simultáneamente en desktop.
5. Las tres partes parecen una única plataforma.
6. El sector central tiene mayor jerarquía visual.
7. Ninguna interfaz parece un wireframe vacío.
8. Ningún texto importante es microscópico.
9. El módulo no supera aproximadamente 1.150 px en desktop.
10. No hay grandes vacíos sin función.
11. No existe scroll horizontal global ni interno.
12. La composición está centrada dentro del mismo sistema de contenedores del sitio.
13. Dark mode tiene profundidad y contraste.
14. Light mode está diseñado de manera específica.
15. En tablet no se comprimen tres columnas ilegibles.
16. En mobile todo se apila y se comprende sin interacción.
17. La animación es ambiental y no mueve el layout.
18. Con reduced motion, todo sigue siendo comprensible.
19. No existen errores ni warnings en consola.
20. El hero y los módulos posteriores permanecen intactos.

---

# 21. QA obligatorio

Probar visualmente:

- `1920 × 1080` — dark;
- `1920 × 1080` — light;
- `1440 × 900` — dark;
- `1440 × 900` — light;
- `1366 × 768` — dark y light;
- `1280 × 800`;
- `1024 × 768`;
- `768 × 1024`;
- `430 × 932`;
- `390 × 844`;
- `360 × 800`.

En cada resolución revisar:

- ancho real del contenedor;
- cantidad de líneas del título;
- legibilidad de cada panel;
- separación entre paneles;
- continuidad de la línea;
- ausencia de clipping;
- ausencia de overflow;
- contraste;
- transición con los módulos vecinos;
- versión dark;
- versión light.

Realizar también:

- revisión de consola;
- revisión de imports sin uso;
- prueba con `prefers-reduced-motion`;
- prueba con zoom del navegador al 100%;
- prueba con contenido cargado desde cero, sin depender de una interacción previa.

---

# 22. Orden exacto de implementación

1. Localizar el módulo actual por su título.
2. Identificar sus componentes, estados, estilos e imports exclusivos.
3. Eliminar la implementación y la lógica anterior.
4. Crear la estructura semántica nueva.
5. Implementar primero el layout estático desktop.
6. Construir WebsitePanel.
7. Construir ManagementPanel.
8. Construir DashboardPanel.
9. Crear la línea y nodos de conexión.
10. Implementar la animación ambiental.
11. Diseñar dark mode.
12. Diseñar light mode de manera específica.
13. Resolver tablet.
14. Resolver mobile sin escalar desktop.
15. Verificar integración con los módulos vecinos.
16. Ejecutar QA en todas las resoluciones.
17. Corregir problemas encontrados antes de entregar.
18. Eliminar código muerto.

---

# 23. Entrega esperada de OpenCode

Al terminar, informar:

1. archivos modificados;
2. componentes eliminados;
3. componentes creados;
4. lógica anterior retirada;
5. comportamiento responsive implementado;
6. solución de dark y light mode;
7. animaciones implementadas;
8. resoluciones verificadas;
9. resultado de la revisión de overflow;
10. resultado de la consola y del build.

No responder solamente “implementado”.

---

# Instrucción final

Implementar esta especificación de forma literal como un reemplazo integral del módulo 02.

La prioridad no es conservar código anterior. La prioridad es obtener una sección comercial, clara, proporcionada, visualmente potente y técnicamente robusta.

Si alguna decisión del código existente entra en conflicto con esta especificación, esta especificación tiene prioridad dentro del alcance exclusivo del módulo 02.

No entregar una aproximación. No conservar la arquitectura anterior. No agregar interacciones no solicitadas. No modificar el resto del sitio.
