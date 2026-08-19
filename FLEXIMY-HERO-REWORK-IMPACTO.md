# FLEXIMY — Rework definitivo del Hero

## Documento de implementación exclusivo

Este archivo define el rediseño completo del **Hero del Home de Fleximy**.

### Alcance cerrado

- Modificar únicamente el header visible y el hero inicial cuando sea necesario para lograr una composición coherente.
- No cambiar Servicios, Nosotros, Por qué Fleximy, CTA, Footer, Contacto ni otras rutas.
- No reutilizar el dashboard actual.
- No reinterpretar este pedido como un rework general del sitio.

---

## 1. Diagnóstico del hero actual

El mensaje es claro, pero la ejecución no demuestra la capacidad que Fleximy vende.

Problemas actuales:

- El H1 ocupa demasiadas líneas y domina toda la pantalla.
- El degradado aplicado sobre varias palabras fragmenta la lectura.
- La interfaz derecha parece un wireframe o skeleton sin terminar.
- Los gráficos son bloques genéricos sin datos, contexto ni profundidad.
- Las vistas `Web`, `App` y `Dashboard` no parecen productos reales.
- El fondo claro y homogéneo genera una estética demasiado lavada.
- Hay mucho espacio vacío, pero poca tensión visual.
- No existe una historia que conecte web, aplicación y dashboard.
- El hero no produce una primera impresión memorable.

El nuevo hero debe seguir siendo fácil de entender, pero debe mostrar inmediatamente diseño, producto y tecnología de alto nivel.

---

## 2. Concepto creativo

# Un negocio. Tres productos conectados.

El hero presentará un ecosistema digital ficticio creado por Fleximy para una marca llamada **Nómada Coffee**.

La misma operación se mostrará en tres superficies:

1. **WEB** — experiencia pública para descubrir y comprar.
2. **APP** — operación diaria para administrar pedidos y productos.
3. **DASHBOARD** — visión ejecutiva para tomar decisiones.

No son tres wireframes independientes. Son tres productos conectados mediante la misma identidad, los mismos datos y una narrativa común.

La interfaz debe demostrar, sin explicarlo demasiado, que Fleximy puede construir una experiencia completa: desde lo que ve el cliente hasta lo que utiliza el equipo y lo que analiza el responsable del negocio.

---

## 3. Resultado emocional esperado

En los primeros cinco segundos el visitante debe pensar:

> “Esta gente puede diseñar y construir un producto digital de verdad.”

El hero debe sentirse:

- premium;
- preciso;
- contemporáneo;
- tecnológico;
- cinematográfico;
- claro;
- confiable;
- original;
- orientado a negocios.

No debe sentirse:

- como una plantilla SaaS;
- como un dashboard comprado;
- como un wireframe;
- como un sitio generado automáticamente;
- como una demostración infantil;
- como una acumulación de efectos.

---

## 4. Copy definitivo

### Eyebrow

`DISEÑO · DESARROLLO · PRODUCTO DIGITAL`

### H1

> Diseñamos productos digitales que hacen avanzar negocios.

Aplicar el gradiente exclusivamente sobre **productos digitales**.

No animar palabra por palabra. El H1 debe leerse completo desde el primer instante.

### Descripción

> Creamos webs, aplicaciones y dashboards a medida para vender, ordenar procesos y conectar cada parte de tu negocio.

### CTA primario

`Contanos tu idea`

### CTA secundario

`Ver lo que hacemos`

### Microcopy inferior

`Estrategia · UX/UI · Desarrollo · Automatización`

### Indicador del producto visual

`DEMO CONCEPTUAL · NÓMADA COFFEE`

---

## 5. Composición general

### Desktop

Usar una grilla asimétrica:

- Columna de copy: 40–42%.
- Escenario visual: 58–60%.
- Gap: `clamp(48px, 5vw, 92px)`.
- Contenedor máximo: 1440 px.
- Alineación vertical centrada.
- Altura del hero: entre 760 y 900 px según viewport.
- Todo el contenido esencial debe entrar en 1920 × 1080 al 100%.

```css
.hero {
  position: relative;
  min-height: calc(100svh - var(--header-height));
  min-height: 760px;
  display: grid;
  align-items: center;
  overflow: clip;
}

.hero__container {
  width: min(calc(100% - (var(--page-gutter) * 2)), 1440px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
  gap: clamp(48px, 5vw, 92px);
  align-items: center;
}
```

### H1

```css
.hero__title {
  max-inline-size: 11.5ch;
  font-size: clamp(56px, 4.65vw, 86px);
  line-height: 0.96;
  letter-spacing: -0.055em;
  text-wrap: balance;
}
```

- En 1920 px: aproximadamente 80–86 px.
- En 1440 px: aproximadamente 66–72 px.
- En 1366 px: aproximadamente 62–68 px.
- Máximo tres líneas en pantallas amplias.
- No superar 86 px.
- No separar `hacen avanzar negocios` en tres líneas distintas.

### Descripción

- Máximo: 570 px.
- Tamaño: `clamp(18px, 1.15vw, 21px)`.
- Line-height: 1.5.
- Color con contraste alto; no gris demasiado tenue.

---

## 6. Dirección de arte

### Tema principal

El hero debe ser **oscuro por defecto**:

- Fondo base: `#070914` o equivalente.
- Azul noche profundo.
- Halo violeta detrás del visual.
- Halo cian muy sutil en el extremo opuesto.
- Textura de ruido apenas perceptible.
- Grid técnico radial o lineal extremadamente sutil.
- Línea o cinta derivada del isotipo `F` atravesando el fondo con baja opacidad.

No usar una superficie plana completamente negra.

### Gradiente de marca

```css
linear-gradient(135deg, #7957ff 0%, #5268ff 36%, #15cbea 70%, #f26db5 100%)
```

Usarlo con moderación:

- frase destacada;
- CTA principal;
- indicador activo;
- pequeños puntos de datos;
- reflejo ambiental del escenario.

No aplicar el gradiente a todos los bordes, textos y componentes.

### Light mode

El light mode debe conservar profundidad:

- Fondo gris azulado muy claro, nunca blanco puro.
- Interfaz principal predominantemente oscura para mantener impacto.
- Haces de color y sombras más suaves.
- Copy en azul noche.
- Evitar el aspecto desaturado actual.

El escenario de producto puede continuar oscuro en ambos temas, funcionando como pieza protagonista.

---

## 7. El escenario visual principal

Eliminar por completo la interfaz actual.

Crear un **Product Stage** con:

- browser principal en perspectiva mínima;
- relación aproximada 16:10;
- marco oscuro de alta calidad;
- barra superior compacta;
- tabs externos `Web`, `App`, `Dashboard`;
- profundidad por capas, sin stack cards;
- un panel mobile secundario parcialmente visible solo cuando aporte a la historia;
- luces ambientales que cambian según la vista;
- sombra profunda y controlada;
- reflejo inferior muy sutil;
- etiqueta de producto conceptual.

El browser debe ocupar entre 720 y 860 px de ancho en pantallas grandes.

No inclinarlo más de 1.5 grados. No usar perspectiva exagerada.

### Tabs

Ubicarlas por encima o integradas en el frame:

`WEB` · `APP` · `DASHBOARD`

Reglas:

- Siempre visibles.
- Área táctil mínima de 44 px.
- Estado activo inequívoco.
- Cambian realmente la composición completa.
- Navegables con teclado.
- Flechas izquierda/derecha cambian la pestaña.
- En mobile pueden ser un segmented control.

---

## 8. Vista WEB — Nómada Coffee

Debe parecer una landing comercial real, no una tarjeta con un botón.

### Estructura interna

- Header propio con logo textual `NÓMADA`, `Café`, `Suscripción`, `Locales` y carrito.
- Hero editorial dividido.
- Titular: `Café de origen, tostado para tu ritmo.`
- Descripción breve.
- CTA: `Elegir mi café`.
- Visual principal de un packaging de café estilizado.
- Tres variedades: `Altura`, `Bosque`, `Nocturno`.
- Precio y etiqueta de intensidad.
- Indicador `Entrega en 24–48 h`.
- Mini bloque de suscripción mensual.
- Carrito con contador `2`.

### Visual de producto

No utilizar cajas vacías ni placeholders.

Crear uno de estos recursos:

- packaging 3D sencillo mediante CSS;
- ilustración vectorial propia;
- imagen de producto local optimizada;
- composición abstracta con granos, etiqueta y sombras.

No cargar imágenes remotas frágiles.

### Microinteracción

Secuencia de 4–5 segundos:

1. Se resalta `Bosque`.
2. El packaging cambia de color.
3. El contador del carrito pasa de `1` a `2`.
4. Aparece un toast: `Bosque agregado al pedido`.

El usuario también puede seleccionar manualmente las tres variedades.

---

## 9. Vista APP — Operación conectada

Debe mostrar una aplicación operativa real, no el mismo layout de la web recoloreado.

### Estructura interna

- Sidebar compacta: `Inicio`, `Pedidos`, `Productos`, `Stock`, `Clientes`.
- Encabezado: `Operación de hoy`.
- Estado de la sucursal: `Abierta · Palermo`.
- Resumen de pedidos en tres estados.
- Tabla o kanban con órdenes reales.
- Panel lateral de detalle de pedido.
- Stock crítico.
- Actividad reciente.
- Notificaciones.

### Datos ficticios coherentes

- Pedidos de hoy: `84`.
- En preparación: `7`.
- Listos para retirar: `4`.
- Tiempo promedio: `8 min`.
- Pedido abierto: `#1084 · Martina G.`.
- Ítems: `Bosque 500 g ×1`, `Flat White ×2`.
- Total: `$24.800`.
- Estado inicial: `Nuevo`.

### Microinteracción

1. El pedido #1084 se abre.
2. Se pulsa `Comenzar preparación`.
3. El estado cambia a `En preparación`.
4. La cantidad de pedidos nuevos baja.
5. Aparece el toast: `Pedido #1084 actualizado`.

No simular una aplicación completa. Hacer funcionar solamente estas acciones y evitar controles falsos.

---

## 10. Vista DASHBOARD — Inteligencia del negocio

Esta vista debe reemplazar por completo el gráfico básico actual.

### Estructura

- Sidebar reducida.
- Header: `Performance · Agosto`.
- Selector temporal: `7 días`, `30 días`, `90 días`.
- Cuatro KPIs con variación y contexto.
- Gráfico principal combinado.
- Distribución por canal.
- Productos destacados.
- Horas de mayor demanda.
- Panel de insights.

### KPIs

- Facturación: `$18,4 M` — `+18,6%`.
- Pedidos: `1.284` — `+12,3%`.
- Ticket promedio: `$14.330` — `+5,7%`.
- Recompra: `31,8%` — `+3,2 pp`.

### Gráfico principal

Construir un gráfico SVG real y detallado:

- área de facturación con gradiente;
- línea de pedidos;
- ejes y etiquetas legibles;
- siete o doce puntos de datos;
- tooltip sobre un punto activo;
- línea vertical de referencia;
- leyenda clara;
- máximo de color reservado para el dato activo.

No usar divs rectangulares simulando barras sin escala.

### Módulos secundarios

**Canales**

- Web: `46%`.
- App: `32%`.
- Local: `22%`.

**Top productos**

- Bosque 500 g — `$4,8 M`.
- Nocturno 1 kg — `$3,6 M`.
- Suscripción mensual — `$2,9 M`.

**Insight**

> Las suscripciones crecieron 24% y concentran el mayor nivel de recompra.

### Microinteracción

1. Se selecciona `30 días`.
2. El gráfico interpola hacia la nueva serie.
3. Los KPIs actualizan sus valores.
4. El tooltip se posiciona en el mejor día.
5. El insight cambia.

---

## 11. Historia automática

Las vistas pueden avanzar automáticamente, pero con control.

### Ciclo

- WEB: 5 segundos.
- APP: 5 segundos.
- DASHBOARD: 6 segundos.
- Pausa final: 2 segundos.
- Reinicio suave.

### Reglas

- Una sola transición automática por vista.
- Si el usuario toca una pestaña, detener autoplay durante al menos 15 segundos.
- No mover un cursor falso por toda la interfaz.
- Puede usarse un pequeño foco luminoso o ripple para indicar una acción automática.
- Pausar cuando el hero sale del viewport.
- Pausar cuando la pestaña del navegador pierde visibilidad.
- Cancelar correctamente timers y animaciones anteriores.
- No ejecutar tres vistas simultáneamente.

### Transición entre vistas

- Duración: 450–650 ms.
- Salida: opacity + desplazamiento de 8 px.
- Entrada: opacity + desplazamiento de 12 px.
- Mantener exactamente el mismo tamaño exterior.
- No hacer zoom, flip, rotación ni stack.

---

## 12. Entrada del hero

### Secuencia inicial

1. Aparece el eyebrow.
2. El H1 sube 18 px y entra en 650 ms.
3. Descripción y CTA entran juntos.
4. El Product Stage aparece desde blur leve y escala `0.985 → 1`.
5. El glow del fondo se activa lentamente.
6. Comienza la secuencia de la vista WEB.

Duración total aproximada: 1.2–1.5 segundos.

No retrasar la lectura del H1. No ocultar cada palabra esperando una animación.

---

## 13. Fondos reactivos

Crear un efecto reactivo sutil:

- radial gradient que sigue al mouse con interpolación;
- desplazamiento máximo: 30–40 px;
- baja opacidad;
- limitado al hero;
- sin afectar el layout;
- desactivado en touch;
- desactivado con reduced motion;
- calculado con `requestAnimationFrame`.

No utilizar partículas genéricas flotando aleatoriamente.

Puede agregarse una línea inspirada en el isotipo `F` que reaccione muy levemente, pero debe permanecer decorativa.

---

## 14. Botones

### CTA primario

- Fondo con gradiente de marca.
- Alto mínimo: 52 px.
- Padding horizontal: 24–28 px.
- Borde redondeado, sin píldora excesiva.
- Glow suave solamente en hover.
- Flecha que avanza 3–4 px.
- Focus visible.

### CTA secundario

- Fondo transparente.
- Borde de alto contraste.
- Hover con superficie elevada.
- No competir visualmente con el CTA principal.

---

## 15. Responsive

### Entre 1180 y 1440 px

- Reducir H1 antes de comprimir el escenario.
- Mantener dos columnas.
- Product Stage mínimo de 620 px.
- Adelantar el header móvil si navegación y CTA pierden aire.

### Tablet — hasta 1024 px

- Hero apilado.
- Copy arriba.
- Product Stage debajo.
- H1 máximo aproximado: 64 px.
- Visual a ancho completo.
- No comprimir el dashboard en la columna derecha.

### Mobile — 320 a 767 px

- H1: `clamp(42px, 12vw, 54px)`.
- Máximo cuatro líneas.
- Eyebrow más breve: `DISEÑO + DESARROLLO`.
- Descripción de 17–18 px.
- CTA primario de ancho completo.
- CTA secundario debajo o como link.
- Product Stage con relación más vertical, aproximadamente 4:5.
- Mostrar una versión mobile propia de cada vista.
- Reducir los módulos del dashboard a dos KPIs, gráfico y un insight.
- No encoger la vista desktop mediante `transform: scale()`.
- Tabs siempre visibles.
- No generar scroll horizontal.

### Alturas reducidas

En 1366 × 768:

- Reducir padding vertical.
- Mantener H1, descripción y CTA visibles.
- No cortar el Product Stage.
- El siguiente módulo puede insinuarse levemente debajo del fold.

---

## 16. Accesibilidad

- Un único H1.
- Tabs con semántica `tablist`, `tab` y `tabpanel`.
- `aria-selected` correcto.
- Navegación con Tab y flechas.
- Contenido visual importante con descripción accesible breve.
- Animaciones decorativas ocultas a lectores de pantalla.
- Contraste AA en dark y light.
- Focus visible en todos los controles.
- No depender únicamente del color para el estado activo.
- `prefers-reduced-motion`: sin autoplay ni desplazamientos; tabs manuales siguen funcionando.
- El H1 y CTA deben estar disponibles sin esperar animaciones.

---

## 17. Rendimiento

- Construir las interfaces con HTML, CSS y SVG.
- No usar canvas para textos o controles.
- No agregar una dependencia pesada de gráficos para una sola visualización.
- No cargar videos de fondo.
- Montar solamente la vista activa y precargar la siguiente.
- Usar `transform` y `opacity` para transiciones.
- Evitar blur animado de gran tamaño durante todo el tiempo.
- Pausar observers y animaciones fuera del viewport.
- Evitar re-render constante por la posición del mouse.
- Mantener CLS en cero: el frame conserva tamaño fijo.

---

## 18. Arquitectura sugerida

```text
Hero/
├── Hero.tsx
├── HeroCopy.tsx
├── ProductStage.tsx
├── ProductTabs.tsx
├── views/
│   ├── WebExperience.tsx
│   ├── OperationsApp.tsx
│   └── BusinessDashboard.tsx
├── charts/
│   └── RevenueOrdersChart.tsx
├── motion/
│   ├── useHeroAutoplay.ts
│   └── usePointerGlow.ts
└── hero.css
```

Adaptar nombres y ubicación al proyecto existente. No duplicar primitives o componentes compartidos.

Usar una máquina de estados simple:

```ts
type HeroView = 'web' | 'app' | 'dashboard';
type HeroMode = 'autoplay' | 'manual' | 'reduced-motion';
```

No resolver el recorrido con una cadena desordenada de `setTimeout` sin limpieza.

---

## 19. Qué debe eliminarse

Eliminar del hero actual:

- dashboard de barras básicas;
- paneles skeleton;
- cajas sin datos;
- pestañas que solo recolorean el mismo layout;
- sombras grises lavadas;
- degradado aplicado a demasiadas palabras;
- exceso de blanco plano;
- espacios vacíos sin composición;
- código muerto de la demostración anterior.

No tocar componentes usados fuera del hero sin verificar sus consumidores.

---

## 20. Prompt maestro para OpenCode

> Rediseñá exclusivamente el HERO del Home de Fleximy siguiendo íntegramente `FLEXIMY-HERO-REWORK-IMPACTO.md`.
>
> No modifiques ningún módulo posterior, ninguna página interna ni el footer. El alcance termina exactamente al finalizar el hero.
>
> Conservá el isotipo, la identidad violeta–azul–cian, dark/light mode y el lenguaje visual general de Fleximy. Eliminá completamente la interfaz actual del hero porque parece un wireframe y no demuestra la calidad del servicio.
>
> Implementá el concepto “Un negocio. Tres productos conectados” mediante Nómada Coffee. Crear tres vistas de alta fidelidad: WEB, APP y DASHBOARD. Deben compartir datos e identidad, pero tener arquitecturas realmente diferentes.
>
> Usá el copy exacto definido en el documento. Reducí la escala del H1 y asegurá que pueda leerse de inmediato. El visual debe ser impresionante, pero nunca tapar el mensaje.
>
> Ninguna caja puede quedar vacía. Ningún gráfico puede ser un conjunto de barras genéricas. Ningún elemento puede parecer clickeable si no funciona. Todos los datos son conceptuales y deben mantener coherencia entre las tres vistas.
>
> Construí el gráfico principal con SVG y datos reales simulados. No instales una librería de charts pesada. Usá HTML/CSS/SVG para todas las interfaces.
>
> El autoplay debe ser corto, controlado y detenerse cuando el usuario interactúa. Respetá reduced motion y cancelá correctamente timers y animaciones.
>
> Antes de escribir código, inspeccioná los componentes actuales del hero, las variables de tema y los primitives reutilizables. Luego reemplazá únicamente lo necesario.
>
> Al finalizar:
>
> 1. Ejecutá build, lint y pruebas disponibles.
> 2. Probá manualmente Web, App y Dashboard.
> 3. Probá autoplay, interacción manual y reduced motion.
> 4. Verificá dark y light mode.
> 5. Verificá 1920×1080, 1440×900, 1366×768, 1024×768, 768, 390 y 320 px.
> 6. Confirmá que no existe overflow horizontal.
> 7. Entregá capturas del hero en 1920×1080, 1366×768 y 390 px, en dark y light.
> 8. Informá todos los archivos modificados y cualquier decisión que se aparte del MD.

---

## 21. Criterios de aceptación

El hero solo se considera terminado si:

- El H1 se entiende en menos de tres segundos.
- El H1 no supera tres líneas en desktop amplio.
- La primera pantalla muestra copy, CTA y Product Stage sin cortes.
- WEB parece una landing comercial real.
- APP parece una herramienta operativa real.
- DASHBOARD parece un producto analítico real.
- Las tres vistas conservan el mismo tamaño exterior.
- No existen placeholders, skeletons, `img`, lorem ipsum o cajas vacías.
- El gráfico posee escala, etiquetas, datos, tooltip y jerarquía.
- La interfaz tiene suficiente contraste en ambos temas.
- Los tabs funcionan con mouse y teclado.
- La interacción manual pausa el autoplay.
- Reduced motion funciona.
- No existen controles falsos.
- No hay errores en consola.
- No hay scroll horizontal entre 320 y 1920 px.
- No se modificó ningún módulo fuera del alcance.
- La primera impresión comunica capacidad real de diseño y desarrollo.

---

## 22. Regla final

El objetivo no es agregar más cosas al hero. El objetivo es que cada elemento existente tenga intención, calidad y una función clara.

La sensación final debe ser:

> “Fleximy entiende negocios, diseña productos excelentes y puede construirlos.”
