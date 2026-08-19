# FLEXIMY — Ajustes finales del Hero en 1920 × 1080

## Alcance

Este documento corrige el hero actualmente implementado a partir de su revisión visual en 1920 × 1080.

No se debe crear otro concepto, cambiar Nómada Coffee ni reconstruir el sitio completo. El objetivo es **mejorar proporciones, jerarquía y calidad visual sobre el hero existente**.

No modificar:

- Servicios.
- Nosotros.
- Por qué Fleximy.
- CTA final.
- Footer.
- Contacto.
- Páginas internas.

---

## 1. Problemas observados

### H1 demasiado dominante

El título ocupa seis líneas y genera una lectura entrecortada:

```text
Diseñamos
productos
digitales
que hacen
avanzar
negocios.
```

La columna izquierda está demasiado restringida y el tamaño tipográfico continúa siendo excesivo respecto del Product Stage.

### Eyebrow superpuesto con el header

`DISEÑO · DESARROLLO · PRODUCTO DIGITAL` aparece demasiado cerca del logo y la navegación. El hero no compensa correctamente la altura del header.

### Product Stage pequeño

La demostración principal ocupa aproximadamente 740 px de ancho y pierde presencia frente al H1. Debe acercarse a 850–920 px en monitores amplios.

### Vista Web poco convincente

La interfaz está técnicamente más completa, pero todavía se percibe como maqueta:

- packaging representado por un rectángulo marrón;
- navegación y textos demasiado pequeños;
- grandes áreas vacías;
- productos sin representación visual;
- bajo contraste;
- escasa profundidad;
- falta de una composición editorial propia de una marca premium.

### Espacio inferior desaprovechado

El contenido termina pronto y queda demasiado fondo vacío. El problema debe resolverse equilibrando escala y posición, no agregando contenido innecesario.

### Separación excesiva entre columnas

El copy y la demostración parecen dos bloques independientes. Falta una iluminación o recurso ambiental que los conecte.

---

## 2. Qué debe conservarse

- Concepto `Un negocio. Tres productos conectados`.
- Nómada Coffee.
- Tabs `Web`, `App`, `Dashboard`.
- Fondo oscuro.
- Isotipo y navegación actual.
- Gradiente violeta–azul–cian.
- CTA primario y secundario.
- Copy descriptivo actual.
- Dark y light mode.
- Arquitectura de componentes existente cuando sea reutilizable.

No volver a una composición con múltiples dashboards flotantes.

---

## 3. Nuevo orden tipográfico

### Eyebrow

Mantener:

`DISEÑO · DESARROLLO · PRODUCTO DIGITAL`

Correcciones:

- Separarlo del header entre 72 y 96 px.
- Tamaño: 11–12 px.
- Tracking: `0.22em–0.28em`.
- No alinearlo horizontalmente con el logo.
- Debe iniciar dentro del flujo real del hero.

### H1 definitivo

Usar:

> Diseñamos productos digitales para hacer avanzar negocios.

Este ajuste permite una construcción más natural y evita el corte `que hacen / avanzar / negocios`.

Aplicar gradiente solamente a:

> productos digitales

### Corte esperado en 1920 px

```text
Diseñamos productos digitales
para hacer avanzar negocios.
```

Puede ocupar tres líneas si la fuente o el viewport lo requieren, pero nunca seis.

### CSS recomendado

```css
.hero__title {
  max-inline-size: 13.5ch;
  font-size: clamp(58px, 3.85vw, 74px);
  line-height: 0.98;
  letter-spacing: -0.052em;
  text-wrap: balance;
}
```

En 1920 px no superar 74 px.

### Gradiente

Aplicar un único gradiente continuo a toda la frase, no un cambio de color por palabra o línea:

```css
background: linear-gradient(
  110deg,
  #7b61ff 0%,
  #5277ff 38%,
  #20c8df 76%,
  #dd78b8 100%
);
```

El rosa debe ocupar solo el extremo final.

---

## 4. Nueva grilla desktop

```css
.hero__container {
  width: min(calc(100% - (var(--page-gutter) * 2)), 1480px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.32fr);
  gap: clamp(48px, 3.75vw, 72px);
  align-items: center;
}
```

Objetivos:

- Copy: aproximadamente 540–590 px.
- Product Stage: aproximadamente 850–920 px.
- Reducir el vacío entre ambos.
- Mantener `min-width: 0` en las columnas.
- Centrar el conjunto dentro del viewport.

### Posición vertical

```css
.hero {
  min-height: calc(100svh - var(--header-height));
  padding-block: clamp(56px, 6vh, 88px);
}
```

- El hero comienza después del header.
- El eyebrow no puede quedar debajo o detrás del header.
- El conjunto debe quedar centrado visualmente, no matemáticamente si esto deja demasiado espacio inferior.
- En 1920 × 1080, el contenido principal debe ocupar aproximadamente 720–820 px de altura.

---

## 5. Product Stage

### Tamaño

- Ancho desktop amplio: 850–920 px.
- Relación aproximada: 16:10.
- Mantener la misma caja para Web, App y Dashboard.
- No permitir saltos de layout.
- No usar `transform: scale()` para agrandarlo.

### Marco

- Borde de 1 px con contraste suficiente.
- Superficie interior diferenciada del fondo.
- Sombra profunda, sin nube gris lavada.
- Halo violeta detrás del frame.
- Reflejo cian sutil en el extremo inferior derecho.
- Tabs más legibles y con mayor área táctil.

### Conexión con el copy

Crear una luz radial compartida entre columnas:

```css
.hero::before {
  content: "";
  position: absolute;
  width: 900px;
  height: 700px;
  left: 48%;
  top: 45%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(104, 83, 255, 0.16),
    rgba(24, 204, 224, 0.06) 42%,
    transparent 70%
  );
  pointer-events: none;
}
```

Ajustar valores al theme. No convertirlo en un manchón brillante.

---

## 6. Rework puntual de la vista Web

La vista Web actual debe reconstruirse visualmente dentro del Product Stage, manteniendo Nómada Coffee.

### Objetivo

Debe parecer una landing ecommerce premium y terminada, no una interfaz administrativa o wireframe.

### Composición recomendada

#### Header interno

- Logo `NÓMADA` con mejor presencia.
- Links: `Café`, `Suscripción`, `Locales`.
- Ícono de carrito con contador `2`.
- Separador inferior sutil.

#### Hero interno

Dividir en dos columnas:

- Copy: 45%.
- Producto: 55%.

Copy:

```text
CAFÉ DE ORIGEN
Café tostado para tu ritmo.
Granos seleccionados, tostados en pequeños lotes.
[Elegir mi café]
```

Evitar que la descripción quede en un tamaño ilegible.

#### Visual del producto

Eliminar el rectángulo marrón.

Crear un packaging convincente mediante:

- bolsa con forma real;
- pliegues y sombras;
- etiqueta frontal;
- isotipo propio de Nómada;
- nombre de variedad;
- peso;
- nivel de intensidad;
- reflejo y sombra de apoyo;
- pequeños granos o elementos abstractos alrededor.

Puede construirse con CSS/SVG o utilizar un asset local optimizado. No depender de una imagen remota.

### Variedades

Las tres variedades deben tener identidad visual:

| Variedad | Color | Perfil | Precio |
|---|---|---|---:|
| Altura | arena/caramelo | Frutal · suave | $14.200 |
| Bosque | verde petróleo | Chocolate · intenso | $15.600 |
| Nocturno | violeta profundo | Cacao · especias | $16.900 |

Al seleccionar una variedad:

- cambia el packaging;
- cambia nombre, perfil y precio;
- cambia el color ambiental;
- se mantiene el layout.

### Módulo inferior

Reemplazar los tres botones oscuros básicos por cards compactas con:

- swatch de color;
- nombre;
- perfil;
- intensidad;
- estado activo.

Agregar una franja de confianza:

`Tostado esta semana · Envío 24–48 h · Suscripción flexible`

### Microinteracción

1. `Altura` aparece seleccionada.
2. Se selecciona `Bosque`.
3. El packaging cambia suavemente.
4. Se pulsa `Agregar`.
5. El carrito cambia de `1` a `2`.
6. Aparece: `Bosque agregado a tu pedido`.

No usar cursor animado visible.

---

## 7. Legibilidad interna

Actualmente muchos textos interiores son demasiado pequeños.

Mínimos visuales recomendados dentro del Product Stage desktop:

- Navegación: 12–13 px.
- Eyebrow interno: 10–11 px.
- Título interno: 28–34 px.
- Descripción: 13–15 px.
- Botones: 12–14 px.
- Datos/cards: 11–13 px.

No bajar de 10 px para información relevante.

Los datos secundarios pueden ocultarse en resoluciones menores, pero no comprimirse hasta resultar ilegibles.

---

## 8. Copy y CTA externos

Mantener la descripción:

> Creamos webs, aplicaciones y dashboards a medida para vender, ordenar procesos y conectar cada parte de tu negocio.

Correcciones:

- Máximo 560 px.
- Tamaño 18–20 px.
- Line-height 1.5.
- Aumentar contraste respecto del fondo.

CTA:

- Primario: `Contanos tu idea`.
- Secundario: `Ver lo que hacemos`.
- Separación entre botones: 12 px.
- Alto mínimo: 52 px.
- Mantener el microcopy inferior, pero mejorar contraste.

---

## 9. Ajustes en App y Dashboard

No reconstruirlos desde cero si ya cumplen el brief anterior, pero revisar:

- que ocupen todo el Product Stage;
- que no tengan áreas vacías sin intención;
- que el texto sea legible;
- que los datos no parezcan placeholders;
- que los gráficos tengan etiquetas, escala y contexto;
- que cada vista tenga arquitectura distinta;
- que las tres mantengan la misma densidad visual;
- que ningún botón decorativo use cursor pointer.

El Dashboard no puede volver a utilizar barras rectangulares genéricas.

---

## 10. Light mode

El screenshot revisado corresponde al modo oscuro, que debe permanecer como experiencia principal.

En light mode:

- Mantener el Product Stage oscuro.
- Usar fondo gris azulado claro, no blanco puro.
- Mantener halos suaves.
- Conservar contraste en textos y botones.
- No desaturar el gradiente.
- Evitar sombras grises extensas.

---

## 11. Responsive

### 1920 × 1080

- H1 de 70–74 px.
- Dos o tres líneas.
- Stage de 850–920 px.
- Eyebrow debajo del header.
- Todo el contenido visible.
- Sin gran vacío inferior.

### 1440 × 900 y 1366 × 768

- H1 de 58–68 px.
- Stage de 650–760 px.
- Reducir padding vertical.
- Mantener dos columnas mientras exista espacio real.
- No cortar CTA ni frame.

### 1024 px o menos

- Apilar copy y Product Stage.
- Copy arriba.
- Product Stage debajo.
- No escalar la vista desktop completa.
- Crear composición interna responsive.

### 390 y 320 px

- H1 entre 42 y 50 px.
- Máximo cuatro líneas.
- CTA primario ancho completo.
- Tabs con segmented control.
- Product Stage 4:5 o vertical.
- Mostrar una versión simplificada, legible y funcional.
- Sin overflow horizontal.

---

## 12. Motion

Mantener animaciones sobrias:

- entrada del H1: opacity + 16 px;
- Stage: opacity + escala `0.985 → 1`;
- cambio de variedad: crossfade de packaging;
- cambio de tab: opacity + 8 px;
- glow reactivo muy leve.

No agregar:

- partículas aleatorias;
- cursor falso;
- stack cards;
- scroll secuestrado;
- parallax agresivo;
- animación palabra por palabra;
- movimiento constante de todos los elementos.

Respetar `prefers-reduced-motion`.

---

## 13. Orden de implementación

1. Corregir compensación del header.
2. Cambiar el H1 y sus cortes.
3. Ajustar ancho, grilla y gap.
4. Agrandar el Product Stage.
5. Reconstruir la vista Web.
6. Mejorar legibilidad interna.
7. Revisar App y Dashboard dentro del nuevo tamaño.
8. Ajustar iluminación y profundidad.
9. Validar light mode.
10. Validar responsive, teclado y reduced motion.

No comenzar por agregar efectos.

---

## 14. Prompt para OpenCode

> Ajustá exclusivamente el hero actual de Fleximy siguiendo por completo `FLEXIMY-HERO-AJUSTES-1920.md`.
>
> No crees otro concepto y no vuelvas a rediseñar toda la página. Conservá Nómada Coffee, las vistas Web/App/Dashboard, el fondo oscuro, los CTA y el lenguaje visual actual.
>
> La corrección parte de la captura en 1920 × 1080. Los problemas principales son: H1 de seis líneas, eyebrow pegado al header, Product Stage demasiado pequeño, separación excesiva entre columnas, gran vacío inferior y una vista Web que todavía parece maqueta.
>
> Primero corregí proporciones y jerarquía. Después reconstruí visualmente la vista Web con un packaging convincente, variedades diferenciadas, mayor contraste, información legible y una microinteracción real.
>
> Usá el H1 exacto: “Diseñamos productos digitales para hacer avanzar negocios.” Aplicá el gradiente únicamente a “productos digitales”. En 1920 px debe ocupar dos o tres líneas y no superar 74 px.
>
> El Product Stage debe medir aproximadamente 850–920 px en desktop amplio y conservar idéntico tamaño entre Web, App y Dashboard. No uses transform: scale() para resolverlo.
>
> No agregues nuevas secciones, dashboards flotantes, partículas, stack cards o animaciones decorativas. No modifiques nada fuera del header/hero cuando sea estrictamente necesario para su alineación.
>
> Al terminar, probá dark/light, los tres tabs, la selección de variedades, autoplay, reduced motion y navegación por teclado. Verificá 1920×1080, 1440×900, 1366×768, 1024×768, 390 y 320 px.
>
> Entregá capturas comparables del hero en 1920×1080, 1366×768 y 390 px, además del resultado de build y lint. Informá cualquier modificación realizada fuera del hero; idealmente no debe existir ninguna.

---

## 15. Criterios de aceptación

- El H1 ocupa dos o tres líneas en 1920 px.
- El título se lee rápidamente y no compite con la interfaz.
- El eyebrow no se superpone con el header.
- El Stage tiene presencia equivalente o superior al H1.
- La distancia entre columnas es equilibrada.
- No queda un vacío inferior desproporcionado.
- La vista Web parece una landing ecommerce premium.
- El packaging no es un rectángulo plano.
- Las variedades poseen identidad visual.
- Los textos internos son legibles.
- La microinteracción actualiza producto y carrito.
- App y Dashboard ocupan el mismo frame.
- No existen cajas vacías ni datos genéricos.
- Todos los controles visibles funcionan.
- Dark y light mode conservan profundidad.
- No hay overflow horizontal.
- Reduced motion funciona.
- No se modificaron módulos posteriores.

---

## Resultado esperado

El hero debe conservar la dirección alcanzada, pero equilibrar correctamente promesa y demostración.

La primera impresión final debe ser:

> “El mensaje se entiende y la interfaz demuestra que Fleximy puede construirlo.”
