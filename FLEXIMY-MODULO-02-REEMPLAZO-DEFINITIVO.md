# FLEXIMY — MÓDULO 02 / REEMPLAZO DEFINITIVO

## Objetivo

Reemplazar por completo el módulo actual de cuatro cards gigantes. No corregirlo, no reutilizar su grid y no hacer una variación visual de las mismas cards.

El módulo nuevo debe explicar en pocos segundos una sola idea:

> Fleximy crea el website que usan tus clientes y la aplicación con la que administrás tu negocio.

Debe sentirse como una demostración clara de un producto digital real: sofisticada, comercial, compacta y fácil de entender. La persona no debe leer cuatro bloques largos ni aprender a usar una demo.

---

## Diagnóstico vinculante

El módulo actual falla por razones estructurales:

- ocupa más de 2.000 px de alto;
- repite cuatro veces la misma fórmula “texto arriba + interfaz abajo”;
- las cards son demasiado grandes para el contenido que contienen;
- las interfaces quedan pequeñas, vacías y parecen wireframes;
- los cuatro beneficios compiten entre sí en lugar de construir una sola historia;
- la lectura se vuelve lenta después de un hero que ya explicó el concepto;
- agregar más sombras, gradientes o detalles no corrige este problema.

Por lo tanto, eliminar completamente:

- el grid 2 × 2 actual;
- las cuatro cards altas;
- los mockups independientes dentro de cada card;
- cualquier altura forzada heredada;
- pills flotantes, elementos superpuestos y decoraciones del módulo actual;
- cualquier carrusel horizontal o contenido que genere overflow;
- cualquier “mini app” llena de controles que aparenten funcionar.

---

## Nuevo concepto

### Un producto. Cuatro vistas.

Construir un único escenario de producto grande y de proporción estable. A la izquierda habrá cuatro mensajes breves. A la derecha habrá una sola ventana de aplicación, grande y robusta, cuyo contenido cambia entre cuatro vistas.

No son cuatro productos distintos. Son cuatro momentos de la misma plataforma:

1. el website que ve el cliente;
2. las consultas y los clientes que recibe el negocio;
3. la operación diaria dentro de la app;
4. los resultados dentro del dashboard.

Esta continuidad es la idea comercial central del módulo.

---

## Copy definitivo

**Eyebrow**

`WEBSITE + APP DE GESTIÓN`

**Título**

## Lo que ven tus clientes. Todo lo que necesitás para trabajar.

**Bajada**

Creamos tu website y la aplicación con la que administrás clientes, ventas y operación. Todo diseñado a medida como una sola plataforma.

No agregar otro subtítulo, claim en itálica ni párrafo introductorio.

### Mensajes del selector

#### 01 — Tu website

**Mostrá, vendé y recibí consultas.**

Una experiencia profesional, creada alrededor de tu negocio y disponible las 24 horas.

#### 02 — Tus clientes

**Cada consulta, en su lugar.**

WhatsApp, formularios, reservas y pedidos con el historial de cada cliente.

#### 03 — Tu operación

**Todo tu negocio en una sola app.**

Pedidos, tareas, turnos, equipo y stock organizados para trabajar con claridad.

#### 04 — Tus resultados

**Lo importante, siempre a la vista.**

Ventas, clientes y pendientes reunidos para decidir sin armar reportes.

No usar textos adicionales dentro del sector izquierdo.

---

## Arquitectura de escritorio

### Contenedor

- `max-width: 1440px`;
- ancho disponible: `calc(100% - 64px)`;
- centrado con `margin-inline: auto`;
- padding vertical del módulo: entre `clamp(96px, 9vw, 150px)`;
- el módulo completo debe ocupar aproximadamente entre 900 y 1.100 px, nunca 2.000 px;
- no usar `100vw` en ningún descendiente;
- todo elemento visual debe respetar `max-width: 100%` y `min-width: 0`.

### Encabezado

- alineado a la izquierda, no centrado;
- ancho máximo del título: `850px`;
- título: `clamp(42px, 4.4vw, 72px)`;
- bajada: `clamp(17px, 1.35vw, 21px)` y ancho máximo `720px`;
- separación hasta el escenario: 56–72 px.

### Escenario principal

Usar un grid de dos columnas:

```css
grid-template-columns: minmax(280px, 0.34fr) minmax(0, 0.66fr);
gap: clamp(40px, 5vw, 88px);
align-items: center;
```

#### Columna izquierda

- cuatro elementos compactos en una lista vertical;
- no convertirlos en cards flotantes;
- cada elemento tiene número, título y descripción;
- una línea vertical muy sutil conecta los cuatro pasos;
- el activo usa una línea o punto con gradiente Fleximy, no un gran fondo sólido;
- los inactivos mantienen contraste legible, nunca opacidad inferior a 0.55;
- alto aproximado por elemento: 100–124 px;
- el selector completo no debe superar los 520 px.

#### Columna derecha

- una única ventana de producto;
- relación de aspecto estable `16 / 10`;
- ancho: 100%;
- alto máximo aproximado en desktop: 620 px;
- nunca cambiar de tamaño cuando cambia la vista;
- radio exterior: 22–28 px;
- borde fino y sombra amplia, elegante y de baja opacidad;
- barra superior compacta con tres puntos, nombre de la vista y estado `EN VIVO`;
- debajo, un canvas de interfaz completo y denso, pero ordenado;
- todas las vistas deben compartir exactamente el mismo marco, padding y escala.

---

## Las cuatro vistas

Las interfaces deben construirse con HTML y CSS. Los datos son ficticios. Deben parecer interfaces terminadas, no esqueletos ni cajas vacías.

### Vista 01 — Website

Negocio de gastronomía contemporánea.

Mostrar:

- navegación con marca ficticia;
- hero compacto con título, descripción y CTA;
- un producto visual protagonista;
- tres productos secundarios con nombre y precio;
- indicador de pedido o reserva;
- composición editorial cuidada.

Puede reutilizarse un asset de producto transparente ya existente en el proyecto. No crear un collage ni colocar imágenes fuera del marco.

Objetivo visual: que se entienda inmediatamente “esto es lo que ven tus clientes”.

### Vista 02 — Clientes

Centro de consultas y clientes.

Mostrar:

- bandeja de 4 conversaciones;
- canal de origen: WhatsApp, website, reserva y pedido;
- conversación activa con respuesta;
- ficha lateral pequeña con nombre, última actividad y próximo paso;
- acción visible: `Agendar`, `Responder` o `Crear pedido`;
- notificación discreta de nueva consulta.

No dejar grandes superficies vacías. La interfaz debe usar bien el canvas.

Objetivo visual: que se entienda “todo lo que llega desde el website queda organizado”.

### Vista 03 — Operación

Centro de trabajo diario.

Mostrar:

- pedidos o tareas distribuidos en tres estados;
- agenda/timeline breve del día;
- equipo activo;
- alerta pequeña de stock;
- dos actualizaciones recientes;
- navegación lateral compacta.

No llenar la pantalla con veinte mini paneles. Usar una jerarquía clara: tablero principal + dos apoyos secundarios.

Objetivo visual: que se entienda “la app organiza lo que el negocio tiene que hacer”.

### Vista 04 — Resultados

Dashboard ejecutivo.

Mostrar:

- cuatro KPIs: ventas, clientes, pedidos y pendientes;
- un gráfico principal de evolución;
- comparación con el período anterior;
- bloque de productos o servicios destacados;
- insight automático: `El horario con más actividad es de 17 a 19 h`;
- máximo dos alertas accionables.

Objetivo visual: que se entienda “la información importante ya está preparada”.

---

## Dinámica permitida

El módulo no es una mini app. Es una presentación controlada.

- cambio automático de vista cada 6 segundos;
- transición con crossfade, leve desplazamiento vertical de 10–14 px y desenfoque inicial máximo de 4 px;
- duración: 500–700 ms;
- el indicador activo de la izquierda funciona como progreso;
- los cuatro elementos izquierdos pueden ser botones para seleccionar una vista;
- al hacer hover o foco dentro del módulo, pausar el autoplay;
- al salir, retomarlo sin saltos;
- no reiniciar el temporizador de forma errática;
- respetar `prefers-reduced-motion`: sin autoplay y sin desplazamiento; mostrar la primera vista y permitir selección manual;
- ningún botón dibujado dentro de la interfaz simulada debe ser foco real ni prometer navegación;
- usar `pointer-events: none` y `aria-hidden="true"` en los controles puramente decorativos;
- si un elemento real tiene apariencia de botón, debe funcionar.

No usar:

- drag;
- scroll horizontal;
- scroll interno;
- stack cards;
- sticky prolongado;
- cursor falso;
- parallax agresivo;
- zoom de toda la interfaz;
- transformación 3D que reduzca la legibilidad.

---

## Tratamiento visual

Mantener el lenguaje actual de Fleximy, pero hacerlo más preciso:

- gradiente de marca violeta → azul → cyan solamente en acentos;
- superficies con profundidad tonal, no grandes fondos lavados;
- un halo radial suave detrás de la ventana;
- textura de grano casi imperceptible, opcional;
- bordes internos sutiles;
- contraste AA para todos los textos reales;
- tipografía de interfaz más pequeña que la tipografía comercial;
- íconos consistentes, lineales y simples;
- los gráficos deben usar datos coherentes y etiquetas legibles;
- evitar glassmorphism excesivo;
- evitar convertir cada bloque en una cápsula.

### Dark mode

- fondo de sección: azul negro profundo;
- ventana: un tono ligeramente más claro que el fondo;
- texto principal casi blanco, nunca blanco puro;
- bordes azulados de baja opacidad;
- colores de estado con saturación controlada.

### Light mode

- fondo gris frío muy claro, no blanco puro;
- ventana blanca o azul grisáceo muy tenue;
- texto azul negro;
- sombras más suaves que en dark;
- no usar texto gris con poco contraste;
- todas las vistas deben conservar jerarquía, gráficos y estados; no limitarse a invertir colores.

---

## Responsive obligatorio

### Entre 1024 y 1279 px

- conservar las dos columnas;
- reducir el gap;
- selector izquierdo entre 270 y 310 px;
- ventana siempre dentro del contenedor;
- no recortar textos ni esconder partes de la interfaz.

### Entre 768 y 1023 px

- pasar a una sola columna;
- encabezado arriba;
- selector horizontal compacto con cuatro tabs, sin overflow y permitiendo wrap en dos filas si hace falta;
- ventana debajo, a ancho completo;
- mantener `aspect-ratio: 16 / 10`.

### Mobile, hasta 767 px

No reproducir el montaje de escritorio a escala microscópica.

- desactivar autoplay;
- ocultar la lista/tabs de control;
- mostrar cuatro bloques estáticos y consecutivos;
- cada bloque: número + título + descripción + una versión simplificada de su vista;
- ancho: 100%;
- relación visual aproximada `4 / 3`;
- padding lateral: 20–24 px;
- separación entre bloques: 48–64 px;
- dentro de cada vista móvil, mostrar solo los 3–4 elementos que explican el beneficio;
- ninguna captura o interfaz puede desbordar horizontalmente;
- no usar carrusel swipe como única forma de acceder al contenido.

---

## Accesibilidad y calidad técnica

- HTML semántico;
- tabs reales solamente en desktop/tablet si son interactivas;
- navegación por teclado completa;
- estados `aria-selected` correctos;
- foco visible;
- no duplicar contenido audible durante las transiciones;
- sin CLS al cambiar de vista;
- sin timers acumulados al desmontar el componente;
- sin errores ni warnings en consola;
- sin barras de desplazamiento internas;
- sin `overflow-x: hidden` usado para esconder un layout roto;
- no instalar una librería pesada para resolver esta sección;
- preferir CSS transitions y un controlador pequeño en React;
- respetar el sistema de theme existente.

---

## Criterios de aprobación

El módulo se aprueba únicamente si:

1. el grid viejo de cuatro cards dejó de existir;
2. en 1920 × 1080 se ve el encabezado, la lista de beneficios y la ventana principal como una composición equilibrada;
3. la interfaz ocupa el protagonismo y puede leerse sin hacer zoom;
4. el módulo completo no supera aproximadamente 1.100 px de alto en desktop;
5. las cuatro vistas usan el mismo marco y no cambian la altura;
6. no existe scroll horizontal global ni interno;
7. las vistas parecen producto terminado, no wireframes;
8. dark y light mode están diseñados y verificados por separado;
9. el contenido se entiende aunque las animaciones estén desactivadas;
10. mobile no es una reducción microscópica del desktop;
11. ningún control visible queda sin respuesta;
12. no se alteran el hero, los módulos posteriores, el header ni el footer.

---

## Verificación antes de entregar

Probar y documentar visualmente:

- 1920 × 1080 en dark;
- 1920 × 1080 en light;
- 1440 × 900 en dark y light;
- 1024 × 768;
- 768 × 1024;
- 390 × 844;
- 360 × 800.

En cada ancho revisar:

- límites del contenedor;
- wrapping de títulos;
- escala y legibilidad de interfaces;
- estabilidad al cambiar de vista;
- contraste;
- foco por teclado;
- `prefers-reduced-motion`;
- ausencia total de overflow horizontal.

---

## Instrucción final para implementación

Implementá esta especificación como reemplazo total del módulo 02 actual. No adaptes las cuatro cards existentes y no conserves su estructura por conveniencia. Eliminá su markup y sus estilos obsoletos, construí el nuevo escenario desde cero y reutilizá únicamente tokens globales, tipografías, componentes genéricos y assets que sean coherentes con el resultado.

Antes de dar por terminado el trabajo, inspeccioná el módulo renderizado en todas las resoluciones indicadas. Si una interfaz se ve pequeña, vacía, cortada o genérica, no la entregues: corregí su composición. La prioridad es claridad comercial, escala visual, robustez responsive y terminación profesional.
