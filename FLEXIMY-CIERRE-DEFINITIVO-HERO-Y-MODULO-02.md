# FLEXIMY — CIERRE DEFINITIVO DEL HERO Y MÓDULO 02

## Última intervención de diseño, interfaces, responsive y QA

Este documento define la última intervención sobre el hero y el módulo 02 del Home de Fleximy. No es una exploración ni otro rework conceptual. Es una especificación de cierre.

La página ya tiene una dirección correcta. El mensaje, la identidad visual, la grilla general y la estructura narrativa deben conservarse. El trabajo pendiente consiste en resolver técnicamente el overflow del hero y elevar las cuatro demostraciones del módulo 02 hasta una calidad visual coherente con lo que Fleximy promete.

---

## 1. Alcance cerrado

Trabajar exclusivamente sobre:

1. La demostración WEB / APP / DASHBOARD del hero.
2. El encabezado del módulo “Website + App de gestión”.
3. Las cuatro cards:
   - 01 · Tu web.
   - 02 · Tus clientes.
   - 03 · Tu operación.
   - 04 · Tus números.
4. Sus versiones light, dark y responsive.

No modificar:

- textos comerciales;
- navegación;
- módulo de precio;
- proceso Entender / Diseñar / Crear;
- rubros;
- formulario;
- FAQ;
- footer.

No crear nuevas secciones. No cambiar nuevamente la identidad general. No agregar interacciones obligatorias.

---

## 2. Diagnóstico verificado en producción

### Hero

La página ya no genera scroll horizontal en el documento completo, pero el overflow continúa dentro del hero:

- columna disponible del demo: aproximadamente 656 px;
- contenido interno: aproximadamente 720 px;
- elemento de producto: aproximadamente 268 px dentro de una caja de 260 px.

Actualmente el desborde queda recortado por `overflow: clip`. Esto evita ver la barra, pero no resuelve la causa.

### Módulo 02

La arquitectura vertical de las cards es correcta y debe conservarse. El problema actual es el acabado:

- las cuatro cards rondan los 729 px de alto;
- existe demasiado espacio vacío;
- las interfaces no tienen el mismo nivel de detalle;
- “Tu web” parece un wireframe;
- “Tus clientes” parece una vista incompleta;
- “Tu operación” es clara, pero demasiado pequeña;
- “Tus números” es la más lograda, aunque genérica;
- light mode tiene poco contraste entre cards, fondo y componentes internos.

### Decisión final

- Conservar grilla 2 × 2.
- Conservar copy superior + interfaz inferior.
- Reducir altura visual.
- Reconstruir las cuatro interfaces con calidad de producto.
- No volver a mini dashboards recargados.

---

## 3. Resultado objetivo

Al finalizar, un visitante debe comprender en pocos segundos:

- Fleximy crea el website público.
- Fleximy crea una app para gestionar clientes.
- Fleximy crea herramientas para operar el negocio.
- Fleximy crea un dashboard para tomar decisiones.

Las interfaces deben demostrar diseño y capacidad técnica, pero no deben exigir lectura detallada ni interacción.

La percepción buscada es:

> “No son dibujos decorativos. Son ejemplos creíbles de productos que Fleximy puede crear para mi negocio.”

---

## 4. Hero — corrección real del overflow

### 4.1 Principio

No ocultar el contenido excedente. Hacer que cada elemento calcule su ancho dentro del contenedor disponible.

Aplicar `min-width: 0` a todos los hijos de la grilla y a cada nivel del mockup:

```css
.hero__inner,
.hero__copy,
.hero__demo-column,
.hero__demo,
.hero__browser,
.hero__browser-body,
.hero__product-stage,
.hero__product-list,
.hero__product-card {
  min-width: 0;
}
```

### 4.2 Contenedor del demo

```css
.hero__demo-column {
  width: 100%;
  min-width: 0;
  display: flex;
  justify-content: flex-end;
}

.hero__demo {
  width: min(100%, 760px);
  min-width: 0;
  max-width: 760px;
  aspect-ratio: 16 / 10;
}
```

No utilizar un ancho interno fijo de 720 px cuando la columna puede medir menos.

### 4.3 Producto protagonista

```css
.hero__featured-product {
  width: min(42%, 240px);
  max-width: 100%;
  min-width: 0;
}

.hero__featured-product img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
}
```

Eliminar offsets laterales que hagan crecer el `scrollWidth`.

Si se busca que el producto sobresalga, hacerlo mediante `transform: translate()` dentro de una caja que ya contemple el desplazamiento, no con `left`, `right` o márgenes negativos.

### 4.4 Lista inferior de productos

Desktop:

```css
.hero__product-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  overflow: visible;
}

.hero__product-card {
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

.hero__product-card__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

En desktop no debe existir `overflow-x:auto`.

En mobile se permite swipe sin scrollbar:

```css
@media (max-width: 640px) {
  .hero__product-list {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .hero__product-list::-webkit-scrollbar {
    display: none;
  }

  .hero__product-card {
    flex: 0 0 76%;
    scroll-snap-align: start;
  }
}
```

### 4.5 Validación técnica del hero

Después de implementar, ejecutar una comprobación equivalente a:

```js
const offenders = [...document.querySelectorAll('.hero *')]
  .filter((element) => element.scrollWidth > element.clientWidth + 2);

console.table(
  offenders.map((element) => ({
    className: element.className,
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth
  }))
);
```

Resultado esperado en desktop: ningún elemento significativo del hero debe aparecer en la lista.

---

## 5. Encabezado del módulo 02

Conservar los textos actuales.

Reducir ligeramente la dominancia del H2 y compactar el espacio anterior a las cards.

```css
.pg-header {
  width: min(100%, 860px);
  margin-inline: auto;
  text-align: center;
}

.pg-title {
  max-width: 18ch;
  margin-inline: auto;
  font-size: clamp(44px, 4.4vw, 68px);
  line-height: 0.98;
  letter-spacing: -0.05em;
  text-wrap: balance;
}

.pg-header__description {
  max-width: 64ch;
  margin: 24px auto 0;
}

.pg-grid {
  margin-top: clamp(52px, 5.5vw, 78px);
}
```

El título no debe competir visualmente con el hero.

---

## 6. Sistema definitivo de cards

### 6.1 Grilla

```css
.pg-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(20px, 2vw, 30px);
}
```

### 6.2 Altura

Eliminar alturas rígidas cercanas a 729 px.

```css
.pg-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 640px;
  padding: clamp(30px, 3vw, 46px);
  overflow: clip;
}
```

Rango esperado en desktop: 620–660 px según el contenido real.

No fijar todas en 729 px solo para igualarlas. La igualdad debe lograrse con la grilla, el `min-height` y la escena flexible.

### 6.3 Distribución interna

```css
.pg-card__copy {
  width: 100%;
  max-width: 540px;
}

.pg-card__scene {
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 270px;
  margin-top: auto;
  padding-top: 32px;
  display: flex;
  align-items: flex-end;
}
```

La escena debe ocupar visualmente el tercio inferior o la mitad inferior de la card. No debe quedar reducida a una línea de información en la base.

### 6.4 Jerarquía tipográfica

```css
.pg-card h3 {
  max-width: 17ch;
  font-size: clamp(32px, 2.5vw, 44px);
  line-height: 1.04;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.pg-card__description {
  max-width: 50ch;
  margin-top: 16px;
  line-height: 1.55;
}

.pg-card__benefit {
  margin-top: 18px;
}
```

---

## 7. Interfaz definitiva 01 · Tu web

### Problema actual

La vista se interpreta como wireframe, skeleton o pantalla en carga. No demuestra una web terminada.

### Dirección final

Crear una landing inmobiliaria compacta pero completa dentro de un browser.

### Estructura obligatoria

1. Barra superior del navegador.
2. Logo ficticio simple.
3. Navegación con tres enlaces.
4. Hero inmobiliario con una imagen o placeholder visual reconocible.
5. Título: “Encontrá un lugar que se sienta tuyo”.
6. Ubicación: “Palermo · Buenos Aires”.
7. Precio: “USD 185.000”.
8. CTA: “Consultar propiedad”.
9. Una tarjeta secundaria pequeña.
10. Dos eventos externos discretos:
    - “Nueva consulta recibida”.
    - “Visita agendada · 16:30”.

### Composición

```text
┌──────────────────────────────────────┐
│ ● ● ●  tuinmueble.com               │
├──────────────────────────────────────┤
│ LOGO           Propiedades  Nosotros │
│                                      │
│ Encontrá un lugar     [IMAGEN CASA]  │
│ que se sienta tuyo.                  │
│ Palermo · USD 185.000                │
│ [Consultar propiedad]                │
├──────────────────────────────────────┤
│ propiedad secundaria                 │
└──────────────────────────────────────┘
  [Nueva consulta] [Visita 16:30]
```

### Calidad visual

- La imagen puede ser un placeholder CSS con gradient y silueta arquitectónica si no existe un asset.
- No usar bloques grises de skeleton.
- El CTA debe ser evidente.
- El browser debe ocupar al menos el 90% del ancho de la escena.

### Animación

- El CTA emite un pulso una sola vez.
- Aparece “Nueva consulta”.
- Luego cambia a “Visita agendada”.
- Loop de 7 segundos con pausa.

---

## 8. Interfaz definitiva 02 · Tus clientes

### Problema actual

Existe demasiado espacio vacío. La conversación y el botón aparecen aislados y no forman una aplicación coherente.

### Dirección final

Crear una inbox CRM compacta con dos columnas claras.

### Estructura obligatoria

**Columna izquierda — 38%**

- título “Consultas”; 
- tres clientes;
- avatar;
- canal;
- hora;
- badge de estado.

**Columna derecha — 62%**

- nombre del contacto;
- origen: “Formulario web”; 
- dos mensajes;
- ficha mínima: “Interés: turno”; 
- CTA “Agendar turno”; 
- estado “En seguimiento”.

```text
┌───────────────┬──────────────────────────┐
│ CONSULTAS     │ Juan P. · Formulario web │
│ ● Laura M.    │                          │
│ ● Juan P.     │ ¿Tienen disponibilidad?  │
│ ● Carina S.   │ Sí, 10:00 o 11:30.       │
│               │                          │
│               │ [Agendar turno]          │
└───────────────┴──────────────────────────┘
```

### Reglas

- La aplicación debe ocupar entre 280 y 310 px de alto.
- No dejar más de 24 px vacíos debajo del CTA.
- El botón debe pertenecer al panel de conversación.
- Mostrar un contacto seleccionado con fondo o borde.
- No agregar KPIs ni ficha de cliente completa.

### Animación

- Se selecciona Juan P.
- Entra el mensaje.
- Aparece la respuesta.
- Se activa “En seguimiento”.

---

## 9. Interfaz definitiva 03 · Tu operación

### Problema actual

El flujo se entiende, pero está demasiado reducido, gris y estático.

### Dirección final

Crear una comandera de cafetería con tres columnas grandes y legibles.

### Estructura

**Nuevo**

- #187 · Mesa 4.
- #188 · Delivery.

**Preparando**

- #185 · Barra.
- #186 · Take away.

**Listo**

- #184 · Mesa 2.

Franja inferior:

- alerta “Stock bajo: granos Brasil”; 
- responsable “Martí · Barra”; 
- horario “14:00–22:00”.

### Mejoras visuales

- Cada columna debe tener una superficie diferenciada.
- Cada pedido debe ser una tarjeta real, no solo texto.
- Usar estados por color con moderación:
  - nuevo: violeta;
  - preparando: ámbar;
  - listo: verde.
- Agrandar entre 12% y 18% la interfaz respecto de la versión actual.
- Subir el contraste del texto secundario.

### Animación

Un único pedido avanza de Nuevo → Preparando → Listo. El resto permanece estable.

---

## 10. Interfaz definitiva 04 · Tus números

### Problema actual

Es la mejor de las cuatro, pero todavía puede verse como un dashboard genérico.

### Dirección final

Conservar su estructura y mejorar la profundidad.

### Contenido

- “Ventas del mes”.
- `$1.284.600`.
- `+18% vs. mes anterior`.
- gráfico de línea único.
- `Clientes activos: 342`.
- `Pedidos completados: 85`.
- insight: “El horario con más pedidos es de 17 a 19 h”.

### Mejoras

- Incorporar header mínimo con rango “Últimos 30 días”.
- Dar mayor superficie al gráfico.
- Agregar puntos de datos discretos.
- Separar visualmente los dos KPIs.
- Presentar el insight como una recomendación, no como un input.

No agregar donut, barras, tabla, agenda ni nuevas métricas.

### Animación

- Conteo breve de la cifra.
- Dibujo de la línea.
- Aparición final de la recomendación.

---

## 11. Profundidad y contraste en light mode

El modo claro no debe parecer una maqueta desaturada.

```css
[data-theme="light"] {
  --pg-page: #f6f7fc;
  --pg-card: rgba(255, 255, 255, 0.88);
  --pg-card-border: rgba(31, 38, 70, 0.1);
  --pg-panel: #f0f3f9;
  --pg-panel-strong: #e7ebf5;
  --pg-text: #111426;
  --pg-muted: #697188;
  --pg-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 20px 60px rgba(41, 48, 88, 0.09);
}

.pg-card {
  background:
    radial-gradient(circle at 88% 8%, var(--pg-accent-soft), transparent 38%),
    var(--pg-card);
  border: 1px solid var(--pg-card-border);
  box-shadow: var(--pg-shadow);
}
```

Cada card debe diferenciarse del fondo sin convertirse en una caja blanca dura.

### Acentos por card

- 01: violeta + cian.
- 02: cian + azul.
- 03: ámbar + coral.
- 04: violeta + rosa.

Mantener los acentos en glows, bordes activos y estados. No colorear superficies completas de forma estridente.

---

## 12. Dark mode

El modo oscuro ya tiene mejor impacto. El objetivo es mejorar legibilidad sin aumentar ruido.

```css
[data-theme="dark"] {
  --pg-page: #090b17;
  --pg-card: rgba(17, 21, 38, 0.9);
  --pg-card-border: rgba(174, 184, 225, 0.14);
  --pg-panel: #171c31;
  --pg-panel-strong: #202640;
  --pg-text: #f5f7ff;
  --pg-muted: #a5aec8;
  --pg-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
}
```

- Subir contraste de textos secundarios.
- Mantener glows suaves.
- No usar bordes blancos fuertes.
- No dejar elementos con opacidad menor a 0.45 si contienen información útil.

---

## 13. Responsive definitivo

### ≥ 1440 px

- Grilla 2 × 2.
- Cards entre 620 y 650 px.
- Escenas entre 280 y 310 px.
- Hero demo máximo 760 px.

### 1024–1439 px

- Grilla 2 × 2 si cada card mantiene al menos 480 px.
- Cards entre 620 y 660 px.
- Reducir padding, no miniaturizar interfaces.

### 768–1023 px

- Módulo en una columna.
- Card centrada con `max-width: 760px`.
- Escena amplia.
- Hero en una columna: copy primero y demo debajo.

### < 768 px

- Cards en una columna.
- `padding: 24px`.
- `min-height: auto`.
- Escena mínima 230 px.
- Simplificar datos secundarios.
- Ninguna interfaz debe superar el ancho de la card.
- No permitir scroll horizontal dentro de las cards.

### < 420 px

- Títulos de card entre 30 y 34 px.
- Descripciones de 15–16 px.
- Inbox y comandera pueden ocultar una fila secundaria, no reducir toda la tipografía.
- Dashboard puede esconder puntos secundarios del gráfico.

---

## 14. Movimiento

Las escenas deben ser entendibles sin animación.

### Permitido

- `transform`.
- `opacity`.
- cambio de estado.
- dibujo de SVG.
- conteo numérico.
- glow suave.

### Prohibido

- cursores falsos;
- interacción obligatoria;
- sliders;
- stacked cards;
- scroll pinning;
- desplazamientos grandes;
- loops sin pausa;
- animaciones que cambien el layout.

Duración recomendada por escena: 6–8 segundos con al menos 1,5 segundos de estado final estable.

```css
@media (prefers-reduced-motion: reduce) {
  .hero__demo *,
  .pg-card * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 15. Accesibilidad y calidad

- Contraste mínimo WCAG AA para textos funcionales.
- No comunicar estados únicamente mediante color.
- Decoraciones con `aria-hidden="true"`.
- Animaciones sin afectar foco o navegación.
- Botones del mockup no deben entrar al tab order si no son interactivos.
- Imágenes con `alt=""` cuando sean puramente demostrativas.
- Conservar `prefers-reduced-motion`.

---

## 16. QA obligatorio

Probar en light y dark:

- 1920 × 1080.
- 1440 × 900.
- 1366 × 768.
- 1280 × 800.
- 1024 × 768.
- 768 × 1024.
- 430 × 932.
- 390 × 844.
- 360 × 800.

### Hero

- [ ] `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- [ ] Ningún hijo relevante del hero tiene `scrollWidth > clientWidth + 2` en desktop.
- [ ] No existe scrollbar interna.
- [ ] Ningún producto queda cortado accidentalmente.
- [ ] La vista WEB / APP / DASHBOARD cambia sin salto de tamaño.
- [ ] El demo conserva proporción y legibilidad.

### Módulo 02

- [ ] Las cards miden aproximadamente 620–660 px en desktop.
- [ ] No existen áreas vacías injustificadas.
- [ ] Las cuatro escenas tienen presencia visual equivalente.
- [ ] “Tu web” parece una landing terminada, no un skeleton.
- [ ] “Tus clientes” parece una inbox completa.
- [ ] “Tu operación” muestra claramente el flujo de pedidos.
- [ ] “Tus números” presenta una lectura ejecutiva.
- [ ] Ningún gráfico sale de su card.
- [ ] No hay scroll horizontal.
- [ ] Light mode tiene contraste y profundidad.
- [ ] Dark mode mantiene legibilidad.
- [ ] Todas las escenas funcionan sin animación.

### Código

- [ ] Sin errores ni warnings en consola.
- [ ] Sin medidas mágicas que funcionen en un solo viewport.
- [ ] Sin `overflow-x:hidden` global como parche.
- [ ] Sin duplicar componentes por tema si pueden resolverse con tokens.
- [ ] Sin listeners o timelines sin cleanup.

---

## 17. Orden de implementación obligatorio

1. Resolver overflow real del hero.
2. Verificar hero en todos los breakpoints.
3. Ajustar encabezado y altura de cards.
4. Reconstruir interfaz 01.
5. Reconstruir interfaz 02.
6. Mejorar interfaz 03.
7. Mejorar interfaz 04.
8. Implementar tokens light/dark.
9. Incorporar microanimaciones.
10. Ejecutar QA completo.
11. Corregir regresiones.
12. Cerrar el módulo sin agregar nuevas ideas.

---

## 18. Prompt definitivo para OpenCode

Implementá la última intervención del hero y del módulo 02 del Home de Fleximy siguiendo este documento como especificación cerrada.

No realices otro rework general. No modifiques textos ni otras secciones. Conservá la identidad actual, la grilla 2 × 2 y la composición de copy arriba + interfaz abajo.

Primero corregí realmente el overflow interno del hero. Actualmente el documento no desborda, pero algunos elementos del demo tienen un `scrollWidth` mayor que su `clientWidth` y quedan recortados. Eliminá anchos fijos, offsets y restricciones que provocan el problema. No lo ocultes con `overflow-x:hidden` global ni con más clipping.

Después cerrá el módulo 02: reducí las cards desde aproximadamente 729 px a un rango de 620–660 px y reconstruí sus escenas siguiendo exactamente las cuatro direcciones definidas:

1. Una landing inmobiliaria terminada.
2. Una inbox CRM completa y compacta.
3. Una comandera de cafetería clara.
4. Un dashboard ejecutivo con una sola lectura principal.

Las interfaces deben parecer productos reales, no wireframes, skeletons ni dashboards genéricos. Deben mantener detalle suficiente para demostrar capacidad de diseño sin convertirse en mini apps sobrecargadas.

Implementá light y dark mode con tokens semánticos, responsive real y microanimaciones automáticas que no sean necesarias para comprender el contenido. Respetá `prefers-reduced-motion`.

Al finalizar, ejecutá todas las comprobaciones de QA y entregá:

- archivos modificados;
- descripción breve de cada interfaz reconstruida;
- resultado de la revisión de overflow;
- resoluciones probadas;
- validación light/dark;
- errores o warnings pendientes, que deberían ser cero.

No cierres la tarea hasta cumplir todos los criterios de aceptación.

---

## 19. Criterio de cierre

Este trabajo se considera terminado cuando:

- el hero no tiene desbordes reales ni visibles;
- las cuatro cards se comprenden inmediatamente;
- las cuatro interfaces parecen productos diseñados;
- ninguna card se siente vacía;
- light y dark mode tienen la misma calidad;
- no aparecen problemas entre 360 y 1920 px;
- ya no es necesario seguir rediseñando este módulo.

La calidad debe venir de la precisión, la proporción y la credibilidad de las interfaces, no de agregar más elementos.
