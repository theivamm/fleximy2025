# FLEXIMY — REWORK DEL HERO Y MÓDULO 02

## Corrección del scroll horizontal y reconstrucción visual de “Website + App de gestión”

Este documento debe utilizarse como instrucción directa para OpenCode sobre la versión actual del Home de Fleximy.

El alcance está deliberadamente limitado a dos intervenciones:

1. Corregir el scroll horizontal visible dentro del gráfico del hero.
2. Reconstruir visualmente el módulo 02 sin cambiar su historia ni sus textos principales.

No modificar el resto de la página. No crear nuevas secciones. No sumar más funcionalidades, dashboards, animaciones complejas ni contenido.

---

## 1. Diagnóstico

### Hero

La barra horizontal que aparece en la zona inferior del demo no es decorativa ni necesaria. Proviene de un contenedor de productos que actualmente utiliza una estructura equivalente a:

```css
display: flex;
gap: 0.5rem;
overflow-x: auto;
```

En desktop, el contenedor visible tiene menos ancho que la suma de sus elementos. Esto activa un scroll horizontal real dentro del mockup.

El demo del hero debe sentirse como una interfaz terminada, no como un carrusel embebido que quedó sin resolver.

### Módulo 02

La idea conceptual es correcta:

- Tu web.
- Tus clientes.
- Tu operación.
- Tus números.

El problema es la arquitectura interna de las cards.

En resoluciones cercanas a 1366 px:

- cada card tiene aproximadamente 607 px de ancho;
- el padding interno consume alrededor de 87 px;
- el espacio restante se divide en una columna de copy cercana a 183 px y una escena visual de 280 px;
- los títulos se fragmentan excesivamente;
- las interfaces quedan comprimidas y pierden legibilidad;
- pills, badges y pequeños paneles producen ruido y una sensación de superposición.

No resolver esto reduciendo fuentes, achicando dashboards o recortando elementos. La composición en dos columnas dentro de cada card debe desaparecer.

---

## 2. Decisión de diseño

Mantener el módulo como una grilla de cuatro cards, pero convertir cada card en una composición vertical:

```text
┌────────────────────────────────┐
│ 01 · TU WEB                    │
│                                │
│ Una web preparada para         │
│ convertir visitas en clientes. │
│                                │
│ Descripción breve              │
│ [Beneficio principal]          │
│                                │
│ ┌────────────────────────────┐ │
│ │                            │ │
│ │   INTERFAZ AMPLIA          │ │
│ │                            │ │
│ └────────────────────────────┘ │
└────────────────────────────────┘
```

La card deja de dividirse en copy izquierdo + miniatura derecha.

El copy ocupa todo el ancho superior. La demostración visual ocupa todo el ancho inferior.

Esta decisión debe aplicarse a las cuatro cards.

---

## 3. Hero — eliminar la barra horizontal

### Desktop

Reemplazar el rail desplazable de productos por una grilla fija.

```css
.hero-products {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  min-width: 0;
  overflow: visible;
}

.hero-product {
  min-width: 0;
  width: 100%;
}
```

Eliminar en desktop:

```css
overflow-x: auto;
flex-shrink: 0;
width: max-content;
min-width: max-content;
```

Si el contenido interno de los cuatro productos no entra correctamente, no reducir toda la interfaz. Aplicar una de estas soluciones en este orden:

1. Acortar la información de cada producto.
2. Reducir ligeramente el padding interno.
3. Mostrar tres productos en lugar de cuatro.

La cuarta opción no debe quedar parcialmente visible.

### Tablet

Entre 768 y 1023 px:

```css
.hero-products {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

Si el alto adicional rompe el mockup, mostrar solamente los dos productos principales. No introducir una scrollbar.

### Mobile

En mobile se permite desplazamiento táctil, pero sin barra visible y con scroll snapping:

```css
@media (max-width: 640px) {
  .hero-products {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    scrollbar-width: none;
    padding-bottom: 2px;
  }

  .hero-products::-webkit-scrollbar {
    display: none;
  }

  .hero-product {
    flex: 0 0 78%;
    scroll-snap-align: start;
  }
}
```

La interacción mobile debe ser secundaria. El hero tiene que comprenderse aunque el usuario no deslice los productos.

### Control de overflow del hero

Revisar también cualquier imagen o elemento decorativo que exceda su columna.

```css
.hero,
.hero__inner,
.hero__demo,
.hero__browser,
.hero__panel {
  min-width: 0;
}

.hero__demo {
  width: 100%;
  max-width: 820px;
  justify-self: end;
}
```

No ocultar el problema mediante:

```css
body {
  overflow-x: hidden;
}
```

Corregir el elemento que desborda.

---

## 4. Módulo 02 — estructura general

### Encabezado

Conservar:

**WEBSITE + APP DE GESTIÓN**

## Una web por fuera. Todo tu negocio por dentro.

Creamos tu website completo y una aplicación de gestión a medida para vender, administrar clientes y manejar la operación desde un solo lugar.

*Tecnología a medida, al alcance de tu negocio.*

El header debe estar centrado y separado de las cards por entre 64 y 88 px.

```css
.module02-header {
  width: min(100%, 900px);
  margin-inline: auto;
  text-align: center;
}

.module02-header h2 {
  max-width: 17ch;
  margin-inline: auto;
  text-wrap: balance;
}

.module02-header > p {
  max-width: 65ch;
  margin-inline: auto;
  text-wrap: pretty;
}
```

### Grilla

```css
.module02-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(20px, 2vw, 32px);
  width: 100%;
}
```

### Card

```css
.module02-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 680px;
  padding: clamp(30px, 3.2vw, 52px);
  border: 1px solid var(--ui-border);
  border-radius: clamp(24px, 2.2vw, 34px);
  background:
    radial-gradient(circle at 85% 10%, var(--card-glow), transparent 36%),
    var(--ui-surface-1);
  overflow: clip;
  isolation: isolate;
}

.module02-card__copy {
  width: 100%;
  max-width: 560px;
  position: relative;
  z-index: 2;
}

.module02-card__scene {
  position: relative;
  inset: auto;
  width: 100%;
  min-width: 0;
  margin-top: auto;
  padding-top: clamp(32px, 4vw, 56px);
  z-index: 1;
}
```

No usar:

```css
.module02-card__scene {
  position: absolute;
  inset: 0;
}
```

Los elementos decorativos internos de la escena sí pueden ser absolutos, pero deben mantenerse dentro de su propia caja.

---

## 5. Tipografía de las cards

```css
.module02-card__index {
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.module02-card h3 {
  max-width: 16ch;
  margin-top: 18px;
  font-size: clamp(32px, 2.6vw, 46px);
  line-height: 1.04;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.module02-card__description {
  max-width: 48ch;
  margin-top: 18px;
  font-size: 16px;
  line-height: 1.6;
}

.module02-card__benefit {
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  margin-top: 22px;
  padding: 9px 13px;
  border: 1px solid var(--accent-border);
  border-radius: 999px;
  font-size: 13px;
  line-height: 1.35;
}
```

Cada título debe ocupar como máximo tres líneas en 1440 px y cuatro líneas en 1024 px.

---

## 6. Card 01 — Tu web

### Copy

**01 · Tu web**

### Una web preparada para convertir visitas en clientes.

Una experiencia única para mostrar, vender y recibir consultas, reservas o pedidos. Diseñada alrededor de tu negocio, no desde una plantilla.

**Tu negocio abierto y listo para vender, las 24 horas.**

### Nueva escena visual

Construir una única ventana de navegador amplia. Utilizar como ejemplo una inmobiliaria contemporánea.

La ventana debe mostrar:

- navegación mínima;
- fotografía o placeholder principal de una propiedad;
- título de la propiedad;
- precio o ubicación;
- botón “Consultar propiedad”;
- una tarjeta pequeña de propiedad secundaria.

Agregar solamente dos eventos secundarios:

- “Nueva consulta recibida”.
- “Visita agendada · 16:30”.

Estos eventos deben formar parte del frame o aparecer en una columna reservada. No deben flotar sobre el título ni invadir el copy.

### Movimiento

- Aparición suave del browser.
- Entrada escalonada de los dos eventos.
- Glow que se desplaza lentamente por el borde.
- Sin parallax fuerte.
- Sin cursor falso navegando.

---

## 7. Card 02 — Tus clientes

### Copy

**02 · Tus clientes**

### Cada consulta se convierte en una oportunidad.

WhatsApp, formularios, reservas y pedidos llegan al mismo lugar, con el historial completo de cada cliente.

**Ninguna consulta olvidada. Ninguna oportunidad perdida.**

### Nueva escena visual

Construir una bandeja unificada sencilla:

- columna izquierda con tres contactos;
- conversación seleccionada en el centro;
- encabezado con nombre y canal;
- mensaje entrante;
- respuesta breve;
- botón “Agendar turno”;
- un solo estado: “En seguimiento”.

No mostrar simultáneamente:

- cuatro canales;
- cinco avatares;
- múltiples badges;
- ficha completa del cliente;
- historial de compra;
- recetas;
- KPIs.

El mensaje visual debe ser evidente: todas las consultas están organizadas en una sola bandeja.

### Movimiento

- Se destaca un contacto.
- Aparece un mensaje.
- Se muestra la respuesta.
- El estado cambia a “En seguimiento”.

Duración total sugerida: 5–7 segundos, en loop con una pausa clara.

---

## 8. Card 03 — Tu operación

### Copy

**03 · Tu operación**

### Todo lo que necesitás para trabajar, en una sola app.

Pedidos, turnos, tareas, empleados, stock o proyectos. Diseñamos la aplicación alrededor de cómo funciona tu negocio.

**Menos planillas, menos mensajes sueltos y más orden.**

### Nueva escena visual

Usar una cafetería como demostración. Crear una comandera limpia con tres columnas:

- Nuevo.
- Preparando.
- Listo.

Mostrar como máximo cinco pedidos visibles.

Agregar únicamente:

- una alerta de stock bajo;
- un avatar o nombre del responsable;
- un indicador de tiempo.

Eliminar paneles adicionales de empleados, calendario, mesas, stock completo y notificaciones acumuladas. Esas funciones pueden sugerirse mediante iconografía mínima, pero no competir con el flujo de pedidos.

### Movimiento

- Un pedido entra en “Nuevo”.
- Avanza a “Preparando”.
- Finaliza en “Listo”.
- La alerta de stock aparece de forma secundaria.

No convertirlo en una mini app navegable.

---

## 9. Card 04 — Tus números

### Copy

**04 · Tus números**

### Mirá cómo funciona tu negocio, sin armar reportes.

Ventas, clientes, productos y tareas importantes reunidos en un dashboard claro para decidir mejor.

**La información importante, lista para usar.**

### Nueva escena visual

Crear un dashboard ejecutivo, no un dashboard operativo completo.

Debe contener:

- métrica principal: “Ventas del mes”; 
- variación porcentual;
- gráfico de línea único y amplio;
- KPI secundario “Clientes activos”;
- KPI secundario “Pedidos completados”;
- una recomendación: “El horario con más pedidos es de 17 a 19 h”.

No combinar barras, donut, tablas, agenda y tareas dentro de la misma escena.

### Movimiento

- La cifra principal realiza un conteo corto.
- La línea se dibuja.
- La recomendación aparece al final.

---

## 10. Diferenciación visual de las cuatro cards

Las cards deben pertenecer al mismo sistema, pero no ser copias idénticas.

### Card 01

- Acento violeta → cian.
- Fondo radial suave desde la esquina superior derecha.

### Card 02

- Acento cian → azul.
- Líneas de conexión discretas.

### Card 03

- Acento ámbar → coral.
- Estados operativos con verde reservado para “Listo”.

### Card 04

- Acento violeta → rosa.
- Glow inferior detrás del gráfico.

No transformar cada card en un universo visual independiente. Tipografías, bordes, radios y estructura deben ser consistentes.

---

## 11. Light y dark mode

Todas las escenas deben tener una versión real en ambos temas.

```css
:root,
[data-theme="light"] {
  --ui-surface-1: #ffffff;
  --ui-surface-2: #f1f3f9;
  --ui-surface-3: #e8ecf5;
  --ui-border: rgba(24, 30, 54, 0.12);
  --ui-text: #121527;
  --ui-muted: #697188;
  --card-glow: rgba(108, 92, 255, 0.13);
  --mockup-shadow: 0 28px 70px rgba(33, 40, 78, 0.16);
}

[data-theme="dark"] {
  --ui-surface-1: #101426;
  --ui-surface-2: #171c31;
  --ui-surface-3: #202640;
  --ui-border: rgba(175, 184, 225, 0.15);
  --ui-text: #f6f7ff;
  --ui-muted: #a7afc8;
  --card-glow: rgba(108, 92, 255, 0.24);
  --mockup-shadow: 0 32px 90px rgba(0, 0, 0, 0.38);
}
```

No utilizar `filter: invert()`.

Si las interfaces permanecen oscuras en light mode, deben verse como capturas de producto deliberadamente oscuras dentro de un marco claro. El fondo de la card, los bordes, las sombras y el copy sí deben adaptarse.

---

## 12. Responsive del módulo 02

### Desktop amplio — desde 1280 px

- Grilla 2 × 2.
- Cards de mínimo 680 px de alto.
- Copy arriba.
- Escena visual de entre 280 y 340 px de alto.

### Desktop medio — 1024 a 1279 px

- Mantener 2 × 2 si cada card conserva al menos 470 px.
- Reducir padding, no el tamaño del texto de forma agresiva.
- Escena visual mínima de 250 px de alto.

### Tablet — 768 a 1023 px

- Grilla de una columna.
- Card horizontal o vertical según el ancho disponible, pero priorizar vertical.
- Máximo ancho de card: 760 px.
- Centrar cada card.

### Mobile — menos de 768 px

```css
.module02-grid {
  grid-template-columns: 1fr;
}

.module02-card {
  min-height: auto;
  padding: 24px;
  border-radius: 24px;
}

.module02-card__scene {
  min-height: 230px;
  padding-top: 32px;
}
```

- No disminuir tipografía interna del dashboard hasta hacerla ilegible.
- Simplificar información en mobile.
- No permitir scroll horizontal dentro de las cards.
- No ocultar la mitad de una interfaz para simular profundidad.

---

## 13. Animación

El módulo no necesita interacción manual.

Las demostraciones deben comprenderse quietas y mejorar con animaciones automáticas sutiles.

### Permitido

- `opacity`.
- `transform`.
- dibujo de líneas SVG.
- conteos breves.
- glows suaves.
- cambio de estado de un elemento.

### Evitar

- cards apiladas.
- scroll pinning.
- sliders obligatorios.
- cursores falsos.
- interfaces que requieren clics.
- loops acelerados.
- desplazamientos mayores a 24 px.
- animar `width`, `height`, `top` o `left` continuamente.

```css
@media (prefers-reduced-motion: reduce) {
  .module02-card *,
  .hero__demo * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14. Criterios de aceptación

### Hero

- [ ] No existe barra horizontal visible en desktop.
- [ ] No existe scroll horizontal dentro del browser simulado.
- [ ] Los productos entran completos o se reduce su cantidad.
- [ ] En mobile se puede deslizar sin mostrar scrollbar.
- [ ] El hero no aumenta el ancho total del documento.

### Módulo 02

- [ ] Las cards utilizan composición vertical.
- [ ] El copy ocupa todo el ancho superior.
- [ ] Cada escena ocupa todo el ancho inferior.
- [ ] Ningún H3 queda limitado a una columna cercana a 180 px.
- [ ] Cada gráfico comunica una sola idea principal.
- [ ] No hay pills flotando sobre textos.
- [ ] No existen mini dashboards excesivamente densos.
- [ ] Las cuatro cards tienen igual calidad visual.
- [ ] Cada card funciona en light y dark mode.
- [ ] No existe overflow horizontal.
- [ ] El contenido es comprensible sin animación.

### Resoluciones de prueba

- [ ] 1920 × 1080.
- [ ] 1440 × 900.
- [ ] 1366 × 768.
- [ ] 1024 × 768.
- [ ] 768 × 1024.
- [ ] 390 × 844.
- [ ] 360 × 800.

---

## 15. Prompt final para OpenCode

Trabajá únicamente sobre el gráfico del hero y el módulo 02 del Home de Fleximy.

En el hero, eliminá la barra de desplazamiento horizontal visible en el selector de productos. En desktop debe ser una grilla fija sin overflow; en mobile puede ser un carrusel táctil con scroll snapping, pero sin scrollbar visible. Corregí la causa del desborde y no la ocultes aplicando `overflow-x:hidden` al body.

Reconstruí por completo la composición interna de las cuatro cards del módulo “Website + App de gestión”. Conservá los textos y la idea de Tu web, Tus clientes, Tu operación y Tus números, pero eliminá la estructura actual de copy angosto a la izquierda e interfaz comprimida a la derecha.

Cada card debe ser vertical: copy amplio arriba e interfaz protagonista abajo. Mantené una grilla 2 × 2 en desktop y una columna en tablet/mobile. Simplificá cada gráfico para comunicar una sola idea. No agregues más pills, badges, dashboards, sliders ni interacción manual.

Implementá animaciones automáticas sutiles que mejoren la demostración sin ser necesarias para entenderla. Creá variantes correctas para light y dark mode. Verificá todas las resoluciones y criterios de aceptación incluidos en este documento.

No modifiques otras secciones del Home.

---

## Resultado esperado

El hero debe verse limpio y terminado. El módulo 02 debe convertirse en la demostración comercial más clara del servicio de Fleximy: cuatro beneficios comprensibles, cuatro interfaces atractivas y ninguna sensación de interfaz comprimida o rota.
