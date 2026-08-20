# FLEXIMY — Hero “Product Story”

## Brief maestro para reconstruir únicamente el hero

Este documento reemplaza por completo la demostración actual de **Nómada Coffee**. No se debe conservar su nombre, packaging, paleta marrón, textos, productos ni composición.

El objetivo es mantener las proporciones generales que ya funcionan en el hero, pero sustituir el gráfico derecho por una experiencia mucho más impactante, comprensible y memorable: una demostración continua de cómo Fleximy diseña un ecosistema digital completo para un negocio real.

---

## 1. La gran idea

Crear una marca gastronómica ficticia de alto nivel llamada provisionalmente:

# BRUMA

**All day café · bakery · kitchen**

BRUMA no es un cliente real ni una plantilla. Es un caso conceptual creado para demostrar el potencial de Fleximy.

La demostración debe contar una historia completa mediante tres productos conectados:

1. **WEB** — un cliente descubre el local y explora sus productos.
2. **APP** — el cliente arma y confirma un pedido.
3. **DASHBOARD** — el negocio recibe el pedido, actualiza ventas e inventario y prepara la entrega.

La idea central es:

> Una misma operación vista desde tres productos digitales.

Esto permite comunicar visualmente que Fleximy no hace solamente “páginas lindas”: crea sistemas digitales conectados que ayudan a vender y operar un negocio.

---

## 2. Sensación visual buscada

La experiencia debe sentirse como la combinación de:

- una campaña editorial gastronómica premium;
- una interfaz SaaS de alto nivel;
- una presentación de producto de Apple o Linear;
- una demostración interactiva breve;
- una pieza de motion design integrada al sitio.

Debe ser sofisticada, limpia y tecnológica, pero no fría ni genérica.

La interfaz debe convivir con fotografías hiperrealistas y apetitosas. Algunos productos deben **salir parcialmente de los límites de la ventana**, creando profundidad y rompiendo la rigidez del dashboard tradicional.

No crear otro rectángulo oscuro lleno de tarjetas pequeñas.

---

## 3. Principio narrativo

La demo debe poder entenderse en menos de 12 segundos sin tocar nada:

```text
Descubrimiento → Selección → Pedido → Operación
     WEB           APP       APP       DASHBOARD
```

El recorrido automático debe mostrar que las tres vistas pertenecen al mismo negocio y comparten información.

Ejemplo de historia:

1. El usuario descubre el “Croissant Pistacho” en la web.
2. Abre su detalle y lo agrega al pedido.
3. La experiencia cambia a la app móvil y confirma el pedido #184.
4. El dashboard recibe el nuevo pedido.
5. El stock de croissants cambia de 12 a 11.
6. El ingreso del día aumenta.
7. El pedido avanza de “Nuevo” a “Preparando”.

Esta secuencia demuestra diseño, ecommerce, aplicaciones, automatización y dashboards sin explicarlo mediante párrafos largos.

---

## 4. Estructura general del hero

Mantener una composición de dos columnas en escritorio:

- **Columna izquierda:** propuesta de valor, descripción y CTA.
- **Columna derecha:** Product Stage de BRUMA.

### Distribución en 1920 × 1080

```css
.hero__container {
  width: min(calc(100% - 96px), 1480px);
  min-height: calc(100svh - var(--header-height));
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.38fr);
  gap: clamp(52px, 4vw, 84px);
  align-items: center;
}
```

Referencias:

- ancho aproximado del bloque de texto: **500–560 px**;
- ancho aproximado de la demostración: **860–940 px**;
- el centro visual de ambas columnas debe quedar alineado;
- no dejar un gran vacío debajo del hero;
- el contenido principal debe entrar completo en 1080 px de alto.

---

## 5. Contenido de la columna izquierda

### Eyebrow

`DISEÑO · DESARROLLO · PRODUCTO DIGITAL`

### H1 recomendado

# Diseñamos productos digitales que hacen crecer negocios.

Aplicar gradiente solamente a:

`productos digitales`

No usar seis líneas. En 1920 px debe ocupar idealmente tres o cuatro líneas como máximo.

```css
.hero__title {
  max-inline-size: 12.5ch;
  font-size: clamp(58px, 3.65vw, 72px);
  line-height: 0.97;
  letter-spacing: -0.052em;
  text-wrap: balance;
}
```

### Descripción

> Creamos webs, aplicaciones y dashboards conectados para vender más, ordenar procesos y hacer avanzar tu negocio.

Máximo 2–3 líneas en escritorio.

### CTA primario

`Contanos tu idea →`

### CTA secundario

`Ver nuestros servicios`

### Línea inferior

`Estrategia · UX/UI · Desarrollo · Automatización`

---

## 6. El Product Stage: no debe parecer un mockup genérico

La demostración derecha debe vivir dentro de un escenario visual propio y no dentro de una simple captura rectangular.

### Composición

Crear un contenedor principal con:

- proporción aproximada **16:10**;
- ancho de 860–940 px en 1920;
- profundidad mediante sombras suaves y halos;
- un frame de navegador mínimo;
- una superficie interna con layout editorial;
- capas de fotografías con recortes transparentes;
- elementos que sobresalen entre 24 y 70 px del frame;
- controles WEB / APP / DASHBOARD integrados en la parte superior.

```css
.product-stage {
  position: relative;
  width: min(100%, 920px);
  aspect-ratio: 16 / 10;
  isolation: isolate;
  border: 1px solid color-mix(in srgb, var(--line) 72%, transparent);
  border-radius: 22px;
  background: var(--stage-bg);
  box-shadow:
    0 35px 90px rgba(0, 0, 0, .35),
    0 0 90px rgba(79, 70, 229, .12),
    0 0 120px rgba(20, 184, 166, .08);
  overflow: visible;
}
```

El contenido interno sí puede usar `overflow: hidden`, pero las fotografías decorativas y elementos flotantes deben colocarse en una capa exterior controlada.

---

## 7. Identidad visual de BRUMA

BRUMA debe diferenciarse claramente de Fleximy.

### Dirección de marca

- contemporánea;
- gastronómica;
- urbana;
- artesanal sin verse rústica;
- editorial;
- orientada a jóvenes profesionales.

### Paleta interna

- crema cálido: `#F3EBDD`;
- espresso: `#241712`;
- verde salvia: `#A8B89A`;
- pistacho: `#C7D86D`;
- coral suave: `#E47B62`;
- tinta: `#171717`.

La paleta de BRUMA debe aparecer solamente dentro de la demostración. El hero general debe conservar el sistema visual oscuro de Fleximy.

### Tipografía interna

- títulos editoriales: serif moderna o display de alto contraste;
- interfaz y datos: sans serif neutral;
- nunca usar el mismo tratamiento tipográfico del H1 de Fleximy para BRUMA.

---

## 8. Vista WEB — descubrimiento y ecommerce

Esta vista debe parecer una home real de restaurante/café, no un dashboard.

### Layout

- navegación superior con logo BRUMA;
- enlaces: `Menú`, `Locales`, `Nosotros`;
- acción: `Pedir ahora`;
- hero interno dividido 52/48;
- texto editorial a la izquierda;
- fotografía protagonista a la derecha;
- carrusel corto de productos en la zona inferior.

### Copy interno

**Eyebrow**

`HORNEADO HOY · BUENOS AIRES`

**Título**

`Algo rico está por pasar.`

**Descripción**

`Café de especialidad, cocina simple y pastelería hecha cada mañana.`

**CTA**

`Explorar el menú`

### Producto protagonista

`Croissant Pistacho`

`Masa laminada · crema de pistacho · frambuesa`

`$8.900`

### Productos secundarios

- Roll de canela — `$6.500`
- Focaccia mortadela — `$12.800`
- Iced matcha — `$5.900`

### Imagen real principal

Dejar el siguiente placeholder semántico:

```text
[IMAGE_WEB_HERO]
Foto hiperrealista horizontal de un croissant de pistacho sobre plato de cerámica,
luz lateral natural, mesa de piedra clara, encuadre editorial, sombras suaves,
alta definición, sin texto, fondo recortable o limpio.
Formato recomendado: WebP/AVIF, 1600 × 1200, fondo transparente si es posible.
```

### Imágenes de productos

```text
[IMAGE_PRODUCT_CROISSANT]
[IMAGE_PRODUCT_CINNAMON_ROLL]
[IMAGE_PRODUCT_FOCACCIA]
[IMAGE_PRODUCT_MATCHA]
```

Todas deben mantener la misma luz, dirección fotográfica y temperatura de color.

### Efecto especial

El croissant protagonista debe romper parcialmente el borde derecho e inferior del frame. Puede usarse una imagen recortada en PNG/WebP transparente con una sombra realista.

No hacerlo gigantesco. Debe complementar a la interfaz, no taparla.

---

## 9. Vista APP — pedido móvil

Esta vista no debe limitarse a mostrar un teléfono centrado. Debe ser una composición de producto.

### Layout

- teléfono principal levemente desplazado a la derecha;
- panel lateral contextual a la izquierda;
- ticket flotante o resumen del pedido;
- fotografía del producto atravesando parcialmente ambas capas;
- fondo con gradiente gastronómico sutil.

### Pantallas de la app

#### Estado A — detalle del producto

- imagen Croissant Pistacho;
- selector de cantidad;
- opciones `Clásico`, `Extra pistacho`, `Sin frambuesa`;
- precio;
- botón `Agregar al pedido`.

#### Estado B — carrito

- producto seleccionado;
- horario estimado;
- opción retirar/envío;
- resumen;
- botón `Confirmar pedido`.

#### Estado C — confirmación

`Pedido #184 confirmado`

`Listo para retirar en 18–22 min`

Mostrar un indicador de progreso:

`Confirmado → Preparando → Listo`

### Placeholder de fotografía

```text
[IMAGE_APP_PRODUCT]
Vista cenital hiperrealista de croissant relleno de pistacho abierto,
migas visibles, crema realista, plato artesanal, iluminación premium,
recorte transparente para superponer sobre la interfaz.
```

---

## 10. Vista DASHBOARD — operación real

Este dashboard debe ser robusto, claro y creíble. No llenar el espacio con cajas vacías o gráficos decorativos.

### Arquitectura

#### Sidebar

- Resumen
- Pedidos
- Menú
- Inventario
- Clientes
- Reportes

#### Barra superior

- búsqueda;
- local activo: `Palermo`;
- estado: `Operando`;
- perfil de usuario.

#### Métricas superiores

- Ventas hoy: `$1.284.600`
- Pedidos: `86`
- Ticket promedio: `$14.937`
- Tiempo medio: `14 min`

#### Bloque principal

Columna izquierda:

- cola de pedidos en tiempo real;
- pedido #184 destacado;
- estados Nuevo / Preparando / Listo;
- hora y canal.

Columna central:

- evolución de ventas por hora;
- gráfico con escala, etiquetas y tooltip;
- comparación con ayer `+18%`.

Columna derecha:

- productos más vendidos;
- alertas de inventario;
- stock del Croissant Pistacho: `12 → 11`;
- indicador “Pistacho bajo: 18%”.

### Pedido que conecta la historia

```text
#184 · Nuevo
1 × Croissant Pistacho
1 × Iced Matcha
Retiro · 12:42
$14.800
```

Cuando la reproducción automática llega al dashboard:

- entra una notificación;
- aparece el pedido #184;
- la métrica Pedidos pasa de 85 a 86;
- Ventas hoy se actualiza suavemente;
- stock cambia de 12 a 11;
- la fila se mueve a “Preparando”.

La animación debe reforzar causalidad. No animar números sin motivo.

---

## 11. Navegación manual

La demo debe ser navegable sin convertirse en una miniapp imposible de mantener.

### Controles globales

Tabs superiores:

- WEB
- APP
- DASHBOARD

Cada tab debe:

- cambiar la vista;
- actualizar el indicador activo;
- reiniciar la secuencia interna correspondiente;
- ser accesible mediante teclado;
- usar botones reales, no `div` con click;
- exponer `aria-selected` y roles apropiados.

### Interacciones permitidas por vista

WEB:

- cambiar entre cuatro productos;
- abrir el producto protagonista;
- agregarlo al pedido.

APP:

- cambiar cantidad;
- elegir una variante;
- confirmar pedido.

DASHBOARD:

- seleccionar pedido #184;
- cambiarlo a Preparando;
- abrir una alerta de inventario.

No crear enlaces o botones falsos. Todo elemento que parezca interactivo debe responder.

No hace falta implementar todas las funciones de un ecommerce real. La navegación es una simulación local, controlada y coherente.

---

## 12. Reproducción automática

Si el usuario no interactúa, la demostración debe reproducirse sola.

### Timeline sugerido — 16 segundos

```text
0.0 s   WEB aparece
1.5 s   Cursor se desplaza al Croissant Pistacho
2.5 s   Producto se expande y fotografía gana profundidad
4.0 s   Click en “Agregar al pedido”
5.0 s   Transición a APP
6.5 s   Se configura “Extra pistacho”
8.0 s   Click en “Confirmar pedido”
9.0 s   Aparece “Pedido #184 confirmado”
10.5 s  Transición a DASHBOARD
12.0 s  Entra notificación del pedido #184
13.0 s  Contadores y stock se actualizan
14.5 s  Pedido cambia a “Preparando”
16.0 s  Pausa breve y reinicio suave
```

### Reglas de autoplay

- pausar al hacer hover prolongado;
- pausar cuando el usuario interactúa;
- reanudar después de 8 segundos de inactividad;
- pausar cuando la pestaña del navegador pierde visibilidad;
- no reiniciar abruptamente;
- no reproducir sonidos;
- respetar `prefers-reduced-motion`;
- en reduced motion, cambiar vistas mediante crossfade sin cursor simulado.

### Cursor simulado

Usar un cursor pequeño, elegante y claramente perteneciente a la demo.

- debe permanecer dentro del Product Stage;
- no perseguir el mouse real;
- no interferir con clicks;
- `pointer-events: none`;
- mostrar un pequeño ripple al hacer click;
- ocultarse inmediatamente cuando el usuario toma control manual.

---

## 13. Transiciones entre vistas

No usar carrusel lateral clásico ni stack cards.

Aplicar una transición compartida:

- el producto fotografiado conserva continuidad;
- la interfaz se recompone mediante opacity, clip-path y desplazamientos cortos;
- duración total: 550–750 ms;
- easing suave y preciso;
- la foto puede desplazarse del hero de la web al teléfono y luego reducirse al thumbnail del dashboard.

Esto debe hacer sentir que el mismo pedido atraviesa distintos sistemas.

GSAP puede utilizarse para orquestar la secuencia, pero los estados finales, responsive y accesibilidad no deben depender de GSAP.

---

## 14. Fondos y profundidad

Mantener el fondo oscuro de Fleximy, pero darle profundidad controlada:

- halo azul/violeta detrás del bloque de texto;
- halo cian muy suave detrás del Product Stage;
- grano sutil mediante CSS o textura optimizada;
- líneas de grid casi imperceptibles;
- gradiente radial que responda suavemente al mouse solamente en escritorio.

No usar:

- partículas flotantes;
- auroras saturadas en todo el viewport;
- blobs grandes;
- estrellas;
- glassmorphism excesivo;
- docenas de sombras;
- movimiento permanente sin propósito.

---

## 15. Light mode

La composición también debe funcionar en modo claro.

### Fondo general

- gris azulado muy claro, nunca blanco puro;
- gradientes suaves;
- texto en azul noche;
- stage con superficie clara o tinta según la vista.

### Regla importante

La identidad de BRUMA debe conservarse. No invertir fotografías ni alterar los colores del producto.

El dashboard puede usar una versión clara especialmente diseñada; no aplicar simplemente `filter: invert()`.

---

## 16. Mobile: rediseño real, no reducción del escritorio

En mobile el orden debe ser:

1. navbar compacta;
2. eyebrow;
3. H1;
4. descripción;
5. CTA primario y secundario;
6. Product Stage;
7. línea de especialidades.

### H1 mobile

```css
@media (max-width: 640px) {
  .hero__title {
    max-inline-size: 10.5ch;
    font-size: clamp(43px, 13vw, 54px);
    line-height: .98;
    letter-spacing: -.048em;
  }
}
```

No superar cinco líneas en 390 px.

### Product Stage mobile

No mostrar la interfaz desktop encogida.

Crear composiciones específicas:

- WEB: home mobile con producto protagonista;
- APP: detalle y confirmación a pantalla completa;
- DASHBOARD: resumen operativo móvil con métricas, pedidos y alerta;
- tabs horizontales compactas y visibles;
- textos internos mínimos de 12 px;
- targets táctiles mínimos de 44 × 44 px;
- sin hover obligatorio;
- sin contenido cortado;
- sin overflow horizontal.

### Autoplay en mobile

- secuencia más lenta y simple;
- sin cursor simulado;
- indicador de progreso discreto;
- pausar al tocar la demo;
- no bloquear el scroll;
- no usar animaciones ligadas al movimiento del dispositivo.

### Breakpoints mínimos a verificar

- 1920 × 1080;
- 1440 × 900;
- 1366 × 768;
- 1024 × 768;
- 768 × 1024;
- 430 × 932;
- 390 × 844;
- 375 × 812;
- 320 × 568.

---

## 17. Placeholders y estrategia de imágenes

Crear una carpeta clara:

```text
/public/images/hero/bruma/
  web-hero-croissant.webp
  croissant-cutout.webp
  cinnamon-roll.webp
  focaccia.webp
  matcha.webp
  app-product-cutout.webp
```

Mientras no existan las fotografías definitivas:

- usar placeholders con relación de aspecto correcta;
- mostrar el nombre del asset requerido en desarrollo;
- no usar rectángulos marrones o cajas vacías como producto;
- se puede crear una abstracción CSS temporal, pero debe quedar claramente separada del componente final;
- todas las imágenes deben tener `alt` útil cuando aportan contenido;
- las imágenes puramente decorativas deben usar `alt=""`.

### Rendimiento

- AVIF o WebP;
- `srcset` y `sizes`;
- precargar solamente la imagen inicial crítica;
- lazy load para imágenes de estados posteriores;
- evitar imágenes base64 gigantes dentro del código;
- reservar dimensiones para impedir layout shift;
- objetivo de peso inicial del hero: menos de 450 KB en desktop y 280 KB en mobile.

---

## 18. Arquitectura técnica sugerida

```text
Hero/
  Hero.tsx
  HeroCopy.tsx
  ProductStory.tsx
  ProductTabs.tsx
  DemoCursor.tsx
  views/
    WebExperience.tsx
    AppExperience.tsx
    DashboardExperience.tsx
  data/
    brumaProducts.ts
    brumaOrders.ts
  hooks/
    useProductStory.ts
    useAutoplay.ts
    useReducedMotion.ts
  hero.css
```

### Estado mínimo

```ts
type StoryView = 'web' | 'app' | 'dashboard';

type StoryState = {
  view: StoryView;
  productId: string;
  quantity: number;
  variant: string;
  orderStatus: 'draft' | 'confirmed' | 'preparing' | 'ready';
  autoplay: boolean;
  userHasControl: boolean;
};
```

Mantener una única fuente de verdad. La selección de producto realizada en WEB debe aparecer en APP y DASHBOARD.

No duplicar estados desconectados en cada componente.

---

## 19. Accesibilidad

- navegación completa mediante teclado;
- foco visible y coherente;
- tabs con semántica correcta;
- labels accesibles en iconos;
- contraste WCAG AA;
- no comunicar estados solamente mediante color;
- autoplay pausables;
- reduced motion funcional;
- fotografías con texto alternativo apropiado;
- no mover el foco automáticamente al cambiar una vista.

---

## 20. Qué se debe eliminar

- todo rastro de Nómada Coffee;
- el packaging marrón actual;
- tarjetas vacías o irrelevantes;
- gráficos sin etiquetas;
- dashboards genéricos;
- información demasiado pequeña;
- tabs o botones que no funcionan;
- falso ecommerce sin continuidad;
- cursores que se salen del módulo;
- stack cards;
- demos diferentes sin una historia común;
- exceso de microtextos técnicos debajo del stage.

---

## 21. Orden de implementación

### Fase 1 — estructura

- limpiar por completo la demo actual;
- crear el estado compartido;
- construir el Product Stage estable;
- implementar tabs accesibles;
- ajustar el hero en desktop y mobile.

### Fase 2 — vistas

- construir WEB con contenido completo;
- construir APP con sus tres estados;
- construir DASHBOARD con métricas, pedidos e inventario;
- garantizar que todos los datos coincidan.

### Fase 3 — interacción

- navegación manual;
- estados y controles reales;
- autoplay;
- cursor simulado;
- pausa y reanudación.

### Fase 4 — dirección visual

- integrar fotografías definitivas;
- recortes que sobresalen del frame;
- sombras, halos y gradientes;
- transiciones compartidas;
- dark y light mode.

### Fase 5 — QA

- responsive completo;
- accesibilidad;
- rendimiento;
- reduced motion;
- verificar que cada control visible funcione;
- probar 3 ciclos completos del autoplay sin desincronización.

No avanzar a la siguiente fase si la anterior tiene overflow, elementos rotos o controles sin respuesta.

---

## 22. Prompt listo para OpenCode

```text
Trabajá únicamente sobre el HERO de Fleximy.

Eliminá por completo la demostración actual de Nómada Coffee: nombre, copy, packaging, colores marrones, productos y componentes asociados. No intentes reciclar visualmente esa demo.

Leé y ejecutá en su totalidad el archivo FLEXIMY-HERO-PRODUCT-STORY.md.

La nueva demostración se llamará BRUMA y debe contar una única historia conectada mediante tres vistas: WEB, APP y DASHBOARD. El cliente descubre un Croissant Pistacho en la web, lo configura y compra en la app y el pedido #184 aparece después en el dashboard, actualizando ventas, cantidad de pedidos e inventario.

La experiencia debe ser navegable manualmente y también reproducirse automáticamente. Implementá solamente las interacciones explícitamente definidas en el documento. No agregues botones falsos ni controles sin función. Si un elemento parece clickeable, debe responder.

No construyas tres mockups aislados. Los tres productos deben compartir estado y datos. El producto elegido en WEB debe mantenerse en APP y DASHBOARD.

Combiná UI construida con HTML/CSS con placeholders preparados para fotografías hiperrealistas. Las imágenes de productos deben poder sobresalir del frame para generar profundidad. Hasta que existan los assets definitivos, respetá sus proporciones, rutas y nombres; no los reemplaces por rectángulos genéricos.

Priorizá primero estructura, legibilidad, navegación, estado y responsive. Agregá animación solamente después de que todo funcione.

Usá GSAP únicamente para orquestar transiciones y autoplay si ya está disponible en el proyecto. No hagas depender el layout ni los estados finales de GSAP. Respetá prefers-reduced-motion.

Mobile requiere composiciones específicas; no reduzcas el dashboard de escritorio con transform: scale(). Verificá 430, 390, 375 y 320 px. No debe existir overflow horizontal ni texto ilegible.

Conservá el header, la identidad general de Fleximy, el sistema dark/light y el contenido exterior del hero definido en el MD. No modifiques ninguna sección posterior de la landing.

Antes de terminar:
1. ejecutá build y lint;
2. corregí todos los errores;
3. comprobá cada botón y tab;
4. probá autoplay, pausa y control manual;
5. revisá dark/light;
6. verificá desktop y mobile;
7. confirmá que Nómada Coffee ya no exista en el código visible;
8. entregá un resumen de archivos modificados y decisiones tomadas.
```

---

## 23. Criterios de aceptación

El hero estará terminado solamente si:

- en 1920 × 1080 se ve completo y equilibrado;
- el H1 no domina ni compite con la demostración;
- BRUMA reemplazó completamente a Nómada Coffee;
- WEB, APP y DASHBOARD parecen productos reales;
- las fotografías están preparadas para integrarse sin romper el layout;
- al menos un producto puede explorarse y agregarse;
- el pedido #184 conecta las tres vistas;
- todos los controles visibles funcionan;
- el autoplay cuenta la historia completa sin intervención;
- la interacción manual detiene correctamente el autoplay;
- los datos del dashboard cambian por una causa visible;
- las vistas mantienen el mismo tamaño exterior;
- no existen cajas vacías ni gráficos decorativos sin contexto;
- dark y light mode tienen diseño propio;
- mobile no es una reducción del escritorio;
- no hay overflow horizontal;
- reduced motion funciona;
- el hero carga rápido y no produce layout shift;
- ninguna sección posterior fue modificada.

---

## Resultado esperado

La persona debe entender en pocos segundos:

> Fleximy puede diseñar la experiencia que ve tu cliente y el sistema que usa tu negocio para operarla.

El hero no debe decir solamente que Fleximy crea webs, apps y dashboards. Debe demostrar cómo esos tres productos trabajan juntos.
