# FLEXIMY — NUEVA PÁGINA DE FIDELIZACIÓN DE CLIENTES

## 0. Instrucción general

Crear una nueva landing page completa para Fleximy dedicada a una solución de fidelización de clientes para pequeños y medianos negocios.

Ruta recomendada:

`/soluciones/fidelizacion`

Esta página debe integrarse al proyecto existente y mantener la identidad visual consolidada de Fleximy:

- estética tecnológica y premium;
- fondos oscuros profundos con light mode real;
- gradientes violeta, azul y cyan usados con criterio;
- interfaces de producto creadas con HTML, CSS y SVG;
- tipografía protagonista, pero comercial y fácil de leer;
- animaciones ambientales suaves;
- diseño responsive profesional;
- español rioplatense;
- mensajes claros para personas no técnicas.

No crear una página que parezca documentación de software. No explicar React, Node.js, bases de datos ni APIs en el contenido comercial visible. La tecnología debe demostrar solidez, no ocupar el mensaje principal.

La idea debe entenderse en menos de cinco segundos:

> Fleximy crea un sistema donde el negocio conoce a cada cliente, registra sus compras y premia automáticamente su fidelidad.

---

# 1. Producto que estamos vendiendo

Fleximy Fidelización es una aplicación web a medida para negocios que quieren convertir clientes ocasionales en clientes frecuentes.

El sistema permite:

- crear perfiles de clientes;
- registrar compras, visitas, pedidos o turnos;
- consultar el historial completo de cada persona;
- definir una meta configurable, por ejemplo 10 compras;
- generar un cupón, regalo, descuento o beneficio cuando se alcanza la meta;
- avisar al cliente;
- consultar beneficios disponibles y utilizados;
- segmentar clientes frecuentes, nuevos o inactivos;
- detectar clientes que están por alcanzar un premio;
- crear campañas de reactivación;
- administrar reglas diferentes por local, servicio o tipo de cliente;
- visualizar resultados en un dashboard;
- crecer desde un único local hasta múltiples sucursales.

## Negocios objetivo

- cafeterías;
- restaurantes;
- panaderías;
- heladerías;
- salones de uñas;
- peluquerías y barberías;
- estudios de tatuajes;
- centros de estética;
- ópticas;
- gimnasios y estudios de entrenamiento;
- comercios minoristas;
- tiendas de mascotas;
- profesionales con clientes recurrentes;
- cualquier negocio donde una persona pueda volver a comprar, reservar o visitar.

## Mercado inicial

La comunicación debe sentirse cercana para pequeños y medianos negocios de Buenos Aires, sin limitar la solución geográficamente dentro del producto.

No usar lenguaje corporativo como:

- omnicanalidad;
- journey;
- lifecycle;
- engagement;
- loyalty engine;
- customer data platform;
- stack tecnológico.

---

# 2. Objetivo comercial de la página

La página debe conseguir que el dueño de un negocio piense:

1. `Esto es fácil de entender.`
2. `Esto podría funcionar en mi negocio.`
3. `No necesito cambiar toda mi forma de trabajar.`
4. `Puedo empezar con una regla simple.`
5. `Quiero preguntar cuánto cuesta y cómo se implementa.`

La landing no debe vender “software”. Debe vender:

- más clientes que vuelven;
- reconocimiento de clientes frecuentes;
- premios sin depender de la memoria del equipo;
- menos tarjetas de papel;
- mejor relación con cada cliente;
- información real sobre recurrencia;
- una herramienta propia adaptada al negocio.

---

# 3. Historia completa de la página

La página debe seguir este orden:

1. Hero — el beneficio principal.
2. Problema — hoy el negocio vende, pero no sabe quién vuelve.
3. Cómo funciona — identificar, registrar, alcanzar y premiar.
4. Demo principal — perfil de cliente + historial + progreso.
5. Motor de reglas — cada negocio decide qué premia y cuándo.
6. Beneficios — para el cliente, el equipo y el dueño.
7. Casos por rubro — ejemplos concretos y fáciles de imaginar.
8. Dashboard — qué información puede ver el negocio.
9. Implementación — empezar simple y crecer.
10. Confianza y privacidad — datos claros y controlados.
11. FAQ.
12. Módulo global de WhatsApp.
13. Footer.

Altura objetivo en desktop: aproximadamente `8.500px–9.800px` antes del footer. No extender la landing con módulos repetitivos.

---

# 4. Sistema de diseño

## Contenedores

```css
.loyalty-container {
  width: min(1240px, calc(100% - 48px));
  margin-inline: auto;
  min-width: 0;
}

.loyalty-container--wide {
  width: min(1480px, calc(100% - 64px));
  margin-inline: auto;
  min-width: 0;
}

.loyalty-container--text {
  width: min(820px, calc(100% - 48px));
  margin-inline: auto;
}
```

## Espaciado

```css
:root {
  --loyalty-section: clamp(96px, 8vw, 144px);
  --loyalty-section-compact: clamp(72px, 6vw, 104px);
  --loyalty-gap: clamp(40px, 5vw, 80px);
}
```

No usar `min-height: 100vh` en todos los módulos. El hero puede usar `min-height: calc(100svh - var(--header-height))`.

## Tipografía

```css
.loyalty-display {
  font-size: clamp(58px, 6.4vw, 112px);
  line-height: 0.9;
  letter-spacing: -0.07em;
  text-wrap: balance;
}

.loyalty-h2 {
  font-size: clamp(42px, 4.4vw, 74px);
  line-height: 0.98;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.loyalty-h3 {
  font-size: clamp(28px, 2.4vw, 40px);
  line-height: 1.05;
}

.loyalty-lead {
  font-size: clamp(18px, 1.5vw, 22px);
  line-height: 1.55;
}
```

## Colores dark

```css
--loyalty-bg: #080b18;
--loyalty-bg-alt: #0b1020;
--loyalty-surface: #10162a;
--loyalty-surface-raised: #151c33;
--loyalty-text: #f4f6ff;
--loyalty-muted: #aeb7ce;
--loyalty-border: rgba(151, 166, 220, 0.15);
--loyalty-purple: #765cff;
--loyalty-blue: #418cff;
--loyalty-cyan: #20d3d2;
--loyalty-pink: #f470b7;
--loyalty-green: #3ed99c;
--loyalty-orange: #ffb45d;
```

## Colores light

```css
--loyalty-bg: #f5f6fb;
--loyalty-bg-alt: #fafbfe;
--loyalty-surface: #ffffff;
--loyalty-surface-raised: #eef1f8;
--loyalty-text: #101426;
--loyalty-muted: #626d84;
--loyalty-border: rgba(40, 51, 90, 0.12);
```

Light mode debe diseñarse explícitamente. No usar `filter: invert()` ni opacidad global.

---

# 5. Header y navegación

Reutilizar el header global de Fleximy.

La navegación de esta página debe incluir:

- Home;
- Fidelización;
- Cómo funciona;
- Ejemplos;
- Preguntas;
- CTA `Quiero fidelizar clientes`.

Si el header global no admite links por página, mantener la estructura global y agregar los anclajes mínimos sin romper otras rutas.

Usar:

```css
section[id] {
  scroll-margin-top: 96px;
}
```

---

# 6. Módulo 01 — Hero

## Eyebrow

`FLEXIMY FIDELIZACIÓN · CLIENTES QUE VUELVEN`

## H1

# Convertí cada compra en una razón para volver.

Aplicar gradiente solamente a:

`una razón para volver.`

## Bajada

Creamos una plataforma para registrar cada visita, conocer mejor a tus clientes y premiarlos automáticamente cuando alcanzan la meta que vos definís.

## Frase breve

**Vos elegís la regla. Fleximy reconoce y premia a tus clientes.**

## CTAs

- Primario: `Quiero fidelizar clientes` → módulo global de WhatsApp o ancla al mismo.
- Secundario: `Mirá cómo funciona` → `#como-funciona`.

## Línea de apoyo

`Clientes · Compras · Beneficios · Todo en un solo lugar`

## Layout desktop

```css
.loyalty-hero {
  min-height: calc(100svh - 72px);
  padding-block: clamp(72px, 8vh, 112px);
  display: flex;
  align-items: center;
  overflow: clip;
}

.loyalty-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(520px, 1.1fr);
  gap: clamp(56px, 7vw, 108px);
  align-items: center;
}
```

## Visual del hero

Construir una interfaz CSS completa, no una imagen rasterizada.

### Ventana principal

Dashboard de fidelización para un café ficticio llamado `BRUMA`.

Mostrar:

- barra superior con buscador;
- perfil activo `Martina López`;
- avatar con iniciales;
- estado `Cliente frecuente`;
- dato `8 visitas`;
- progreso `8 de 10`;
- próximo premio `Café + croissant`;
- historial de tres compras;
- botón decorativo `Registrar compra`;
- badge `2 compras para el próximo premio`.

### Tarjeta flotante

Pequeña confirmación:

`Compra registrada · progreso actualizado`

### Animación

Secuencia ambiental de 8 segundos:

1. aparece una nueva compra;
2. el progreso pasa de 8/10 a 9/10;
3. el badge cambia a `1 compra para el premio`;
4. se ilumina el perfil;
5. pausa;
6. vuelve al estado inicial.

No cambiar alturas ni generar reflow. Animar opacity, transform y SVG stroke.

## No hacer

- no mostrar diez dashboards pequeños;
- no usar un teléfono genérico;
- no usar una captura de otra marca;
- no crear botones reales dentro de la demo si no funcionan;
- usar `pointer-events: none` y `aria-hidden="true"` en elementos simulados.

---

# 7. Módulo 02 — Problema

## Eyebrow

`VENDER ES SOLO EL PRINCIPIO`

## H2

## Tus clientes vuelven. Pero hoy depende de que alguien los recuerde.

## Bajada

Entre pedidos, turnos y mensajes, es difícil saber quién compra seguido, cuándo fue su última visita o quién está cerca de recibir un premio.

## Contraste visual

Crear dos paneles conectados.

### Panel 01 — Hoy

- compras sueltas;
- nombres en WhatsApp;
- tarjetas de papel;
- promociones generales;
- `No sabemos quién volvió`.

### Panel 02 — Con Fleximy

- perfil único;
- historial de compras;
- progreso visible;
- premio configurado;
- `Cada visita cuenta`.

## Copy de cierre

**De clientes que pasan a clientes que elegís cuidar.**

## Diseño

- grid 2 columnas;
- panel izquierdo más neutro;
- panel derecho con gradiente sutil;
- flecha o flujo central creado con CSS/SVG;
- altura total 620–760px;
- sin cards gigantes vacías.

---

# 8. Módulo 03 — Cómo funciona

ID: `como-funciona`

## Eyebrow

`SIMPLE PARA TU EQUIPO. CLARO PARA TUS CLIENTES.`

## H2

## Cada visita suma. Cada premio tiene una regla.

## Bajada

Definís qué acción querés reconocer y cuándo se activa el beneficio. El sistema se ocupa de registrar el progreso y avisar cuando llega el momento.

## Cuatro pasos

### 01 — Identificás al cliente

Nombre, teléfono o código personal. Sin formularios eternos.

### 02 — Registrás la compra

Una visita, un pedido, un turno o el valor que defina tu negocio.

### 03 — El sistema actualiza su progreso

Cada movimiento queda guardado en su perfil e historial.

### 04 — Se activa el premio

Cupón, descuento, regalo o beneficio listo para entregar.

## Visual

Crear una línea de progreso horizontal con cuatro estaciones y una tarjeta de cliente que avanza entre ellas.

La animación debe ser automática pero ambiental. No requiere interacción.

## Desktop

- cuatro columnas;
- altura de cada paso 250–290px;
- número, ícono, título y dos líneas;
- línea de progreso integrada, no una caja punteada.

## Mobile

- recorrido vertical;
- línea al lado izquierdo;
- pasos con altura automática;
- sin carrusel.

---

# 9. Módulo 04 — Demo central del producto

## Eyebrow

`EL CLIENTE DEJA DE SER UN NÚMERO`

## H2

## Todo lo importante de cada cliente, en un solo perfil.

## Bajada

Historial, frecuencia, preferencias, beneficios y próxima oportunidad reunidos para que tu equipo pueda atender mejor.

## Escenario

Crear una aplicación web panorámica y robusta.

### Navegación lateral

- Resumen;
- Clientes;
- Compras;
- Beneficios;
- Campañas;
- Configuración.

### Header

- buscador `Buscar cliente`;
- selector de local `Palermo`;
- estado `Sistema activo`;
- avatar del usuario.

### Columna de clientes

Mostrar cinco perfiles:

- Martina López — 9 visitas;
- Lucas Ruiz — premio disponible;
- Sofía Vega — 4 visitas;
- Carla Méndez — inactiva hace 45 días;
- Julián Torres — cliente nuevo.

### Perfil activo

`Martina López`

- cliente desde marzo;
- última visita: hoy;
- 9 compras;
- gasto acumulado ficticio;
- etiquetas: `Café`, `Take away`, `Frecuente`;
- progreso 9/10;
- próximo premio `Café + croissant`;
- botón real solo si funciona dentro de una demo local: `Registrar compra`.

### Historial

Mostrar cuatro filas:

- fecha;
- producto/servicio;
- valor;
- local;
- estado.

### Insight lateral

`Martina suele volver cada 8 días.`

`Su producto más elegido es Flat White.`

## Interacción controlada

Se permite seleccionar uno de los cinco clientes y actualizar el perfil con datos locales ficticios.

No convertirlo en una mini app extensa.

Solo deben funcionar:

- selección de cliente;
- `Registrar compra`;
- apertura de detalle del premio.

Todo control visible debe funcionar. El resto debe ser texto o elementos decorativos sin apariencia de botón.

## Altura desktop

Entre 650 y 760px. Sin scroll interno para entender la demo.

---

# 10. Módulo 05 — Motor de reglas

## Eyebrow

`VOS DECIDÍS QUÉ PREMIAR`

## H2

## Diez compras, cinco visitas o el objetivo que tenga sentido para tu negocio.

## Bajada

No todos los negocios funcionan igual. Configuramos las reglas, beneficios y tiempos alrededor de la forma en que trabajan tus clientes.

## Constructor visual

Crear una interfaz CSS tipo rule builder:

```text
CUANDO  un cliente complete  [10] compras
ENTONCES generar             [Cupón 20%]
VÁLIDO durante               [30 días]
AVISAR por                   [WhatsApp]
```

## Variantes visibles

- Cada 10 compras → producto gratis.
- Quinta visita → 20% de descuento.
- 30 días sin volver → beneficio de reactivación.
- Cumpleaños → regalo especial.
- Gasto acumulado → categoría VIP.

## Interacción

- Permitir cambiar localmente cantidad y tipo de premio.
- Actualizar una frase resumen en tiempo real.
- No persistir datos reales.
- No prometer envío de WhatsApp sin integración configurada.

## Resultado visible

`Regla lista: al completar 10 compras, el cliente recibe un cupón del 20% válido por 30 días.`

## Diseño

- columna izquierda: copy;
- columna derecha: constructor;
- panel elevado con gradiente de borde;
- inputs grandes y claros;
- no parecer una herramienta de automatización empresarial compleja.

---

# 11. Módulo 06 — Beneficios

## Eyebrow

`UNA PLATAFORMA. TRES FORMAS DE GANAR.`

## H2

## Mejor para tus clientes. Más simple para tu equipo. Más claro para vos.

## Tres bloques

### Tus clientes

- ven su progreso;
- reciben beneficios relevantes;
- no pierden una tarjeta de papel;
- tienen una razón concreta para volver.

### Tu equipo

- encuentra rápido cada perfil;
- registra visitas en segundos;
- sabe cuándo entregar un premio;
- no depende de recordar reglas.

### Tu negocio

- conoce la frecuencia de compra;
- identifica clientes valiosos;
- reactiva personas inactivas;
- mide qué beneficios generan retorno.

## Diseño

Una única superficie dividida en tres, no tres cards flotantes independientes.

Conectar los bloques mediante una línea suave y nodos.

No usar iconografía genérica grande. Crear microinterfaces:

- cliente: tarjeta de progreso;
- equipo: registro de compra;
- negocio: KPI de recurrencia.

---

# 12. Módulo 07 — Ejemplos por rubro

ID: `ejemplos`

## Eyebrow

`LA MISMA IDEA. REGLAS DIFERENTES.`

## H2

## Si tus clientes pueden volver, podés darles una razón para hacerlo.

## Bajada

Adaptamos la plataforma a la frecuencia, el ticket y la experiencia real de cada negocio.

## Casos

### Cafetería

`Cada 10 consumos, café y croissant de regalo.`

Registro: compra o visita.

### Restaurante

`Después de 5 reservas, beneficio especial para la próxima cena.`

Registro: reserva completada.

### Salón de uñas

`En la quinta visita, 20% en el próximo servicio.`

Registro: turno atendido.

### Estudio de tatuajes

`Beneficio por sesiones acumuladas o recomendación de un nuevo cliente.`

Registro: sesión o referido.

### Óptica

`Recordatorio y beneficio cuando llega el momento de renovar.`

Registro: compra y fecha.

### Gimnasio o estudio

`Premio por asistencia sostenida durante el mes.`

Registro: clase o ingreso.

## Diseño

- grid 3×2 en desktop;
- cards de altura uniforme entre 300 y 360px;
- cada card tiene rubro, regla, tipo de registro y una microvisualización;
- no usar fotografías reales;
- usar CSS y SVG con personalidad visual propia para cada rubro;
- colores de acento diferentes, pero dentro del sistema Fleximy;
- CTA único debajo: `Quiero diseñar mi regla`.

---

# 13. Módulo 08 — Dashboard

## Eyebrow

`NO MÁS INTUICIÓN SIN DATOS`

## H2

## Mirá quién vuelve, qué funciona y dónde tenés una oportunidad.

## Bajada

El dashboard reúne la actividad importante para que puedas mejorar la fidelización sin armar reportes.

## Dashboard CSS

Mostrar:

### KPIs

- Clientes activos: `342`;
- Tasa de regreso: `38%`;
- Premios entregados: `47`;
- Clientes por reactivar: `26`.

### Gráfico principal

`Clientes nuevos vs. recurrentes` durante 8 semanas.

### Segmentos

- Nuevos;
- Frecuentes;
- Cerca del premio;
- Inactivos;
- VIP.

### Alertas accionables

- `12 clientes están a una compra de su premio`;
- `8 clientes frecuentes no volvieron este mes`;
- `La regla Café + croissant generó 31 regresos`.

### Ranking

Beneficios con mayor uso.

## Diseño

- dashboard panorámico;
- navegación lateral compacta;
- un gráfico protagonista;
- no llenar con veinte panels pequeños;
- jerarquía: KPIs → gráfico → segmentos/alertas;
- SVG inline para gráficos;
- light y dark mode completos;
- sin captura rasterizada.

---

# 14. Módulo 09 — Empezar y crecer

## Eyebrow

`EMPEZÁ CON UNA REGLA`

## H2

## Primero resolvemos lo que necesitás hoy. Después sumamos lo que haga crecer el sistema.

## Tres etapas

### 01 — Primera regla

Un tipo de registro, una meta y un beneficio.

### 02 — Más automatización

Segmentos, vencimientos, campañas y notificaciones.

### 03 — Más puntos de atención

Locales, equipos, permisos y reportes consolidados.

## Mensaje comercial

**Una solución propia, con un alcance inicial claro y preparada para crecer.**

No mostrar precios inventados. No usar planes SaaS genéricos.

## CTA

`Contanos cómo compran tus clientes` → WhatsApp global.

---

# 15. Módulo 10 — Confianza, privacidad y operación

## H2

## Fácil de usar. Diseñado para cuidar la relación con tus clientes.

## Puntos

- acceso por usuarios y permisos;
- historial de cambios importantes;
- exportación de datos;
- reglas de vencimiento configurables;
- respaldo de la información;
- consentimiento para comunicaciones;
- baja de mensajes promocionales;
- integración con canales oficiales cuando corresponda.

## Nota importante sobre WhatsApp

Las notificaciones automáticas por WhatsApp requieren una integración autorizada con WhatsApp Business Platform o un proveedor oficial, además del consentimiento correspondiente del cliente.

No prometer envíos automáticos ilimitados ni utilizar automatizaciones no oficiales.

## Diseño

Módulo compacto de dos columnas:

- izquierda: título y explicación;
- derecha: checklist en dos columnas;
- máximo 620px de alto.

---

# 16. Módulo 11 — FAQ

ID: `preguntas`

## Título

## Preguntas frecuentes

## Preguntas y respuestas

### ¿Sirve solamente para cafeterías?

No. Funciona en cualquier negocio donde una persona pueda volver a comprar, reservar, asistir o contratar un servicio.

### ¿Tengo que usar una regla de 10 compras?

No. La cantidad, la acción y el beneficio se configuran alrededor de tu negocio.

### ¿Cómo se identifica al cliente?

Podemos utilizar teléfono, email, código, QR u otro dato acordado durante la implementación.

### ¿Mi equipo necesita aprender un sistema complejo?

No. Diseñamos el registro para que las acciones frecuentes puedan resolverse en pocos pasos.

### ¿El cliente necesita instalar una aplicación?

No necesariamente. La experiencia puede funcionar desde una web, un enlace o un QR, según la solución definida.

### ¿Puedo cambiar el premio después?

Sí. Las reglas y beneficios pueden actualizarse según permisos y configuración.

### ¿Puede funcionar en más de un local?

Sí. La plataforma puede organizar sucursales, equipos y resultados separados o consolidados.

### ¿Puede enviar mensajes por WhatsApp?

Sí, si se implementa una integración oficial y el negocio cuenta con el consentimiento necesario para enviar comunicaciones.

### ¿Fleximy entrega una plataforma propia?

Sí. Definimos el alcance y construimos una solución alrededor de la operación y los objetivos del negocio.

### ¿Puedo empezar con algo pequeño?

Sí. La recomendación es comenzar con una regla clara y sumar funciones cuando exista una necesidad real.

## Diseño

- ancho máximo 900px;
- acordeón accesible;
- una pregunta abierta por vez;
- sin altura reservada para respuestas cerradas;
- `aria-expanded` y regiones asociadas;
- animación de altura prudente o transición mediante grid rows;
- reduced motion respetado.

---

# 17. Módulo global de WhatsApp — reemplazo para todas las páginas

## Decisión

Crear un componente global reutilizable que reemplace todos los módulos finales de contacto por WhatsApp existentes en el sitio.

Nombre conceptual:

`GlobalWhatsAppExperience`

Debe utilizarse en:

- Home;
- Soluciones NFC;
- Fidelización;
- futuras páginas de soluciones;
- cualquier página que actualmente termine con un CTA genérico de WhatsApp.

No reemplazar formularios específicos. Este módulo se ubica después del contenido principal y antes del FAQ o footer según la página.

## Número

Número proporcionado:

`11 6112 0433`

URL internacional recomendada para WhatsApp:

`https://wa.me/5491161120433`

Centralizarla en una constante/configuración única:

```js
export const WHATSAPP_NUMBER = '5491161120433';
```

No repetir el número hardcodeado en múltiples componentes.

## Mensaje para Fidelización

```text
Hola, llegué desde la página de Fidelización de Fleximy. Quiero contarles cómo funciona mi negocio y conocer una solución para que mis clientes vuelvan.
```

URL construida con `encodeURIComponent`, no escribir manualmente caracteres escapados.

## Contenido comercial del módulo

### Eyebrow

`HABLEMOS DE TU NEGOCIO`

### H2

## Contanos cómo compran tus clientes. Nosotros pensamos cómo hacer que vuelvan.

### Bajada

Una conversación breve para entender tu negocio, definir una primera regla y mostrarte cómo podría funcionar la plataforma.

### CTA

`Hablar por WhatsApp`

### Microcopy

`Respuesta personal · Sin compromiso · Sin tecnicismos`

## Concepto visual único

El módulo debe parecer una conversación que está empezando, no un banner verde.

Crear una gran superficie oscura/premium con una ventana de chat construida en HTML y CSS.

### Lado izquierdo

- eyebrow;
- título;
- bajada;
- CTA;
- microcopy.

### Lado derecho

Ventana de conversación:

1. mensaje de Fleximy:
   `¿A qué se dedica tu negocio?`
2. respuesta ficticia:
   `Tengo una cafetería y quiero premiar a quienes vienen seguido.`
3. mensaje de Fleximy:
   `Perfecto. Podemos empezar con una meta simple y un beneficio.`
4. selector visual con tres respuestas rápidas:
   - `Premiar compras`;
   - `Recuperar clientes`;
   - `Todavía no lo sé`.
5. estado final:
   `Conversemos por WhatsApp →`.

Los mensajes de la demo son decorativos. No deben simular un chat real editable.

## Efectos visuales

### Fondo reactivo

Se permite un halo que reaccione suavemente a la posición del mouse dentro del módulo mediante variables CSS:

```css
background:
  radial-gradient(circle at var(--mouse-x, 70%) var(--mouse-y, 40%), rgba(32, 211, 210, 0.15), transparent 30%),
  radial-gradient(circle at 20% 20%, rgba(118, 92, 255, 0.18), transparent 36%),
  #090d1b;
```

Condiciones:

- aplicar throttle mediante `requestAnimationFrame`;
- actualizar solo variables CSS;
- no mover contenido;
- desactivar en dispositivos táctiles;
- desactivar con reduced motion;
- remover listeners al desmontar.

### Órbitas

Agregar detrás del chat dos líneas orbitales SVG muy sutiles con tres nodos que se desplazan lentamente.

- duración: 18–24s;
- opacidad máxima 0.25;
- nunca atravesar texto;
- `pointer-events: none`;
- `aria-hidden="true"`.

### Mensajes

Al ingresar al viewport:

- revelar burbujas una por una;
- delay entre burbujas: 180–260ms;
- translateY máximo 12px;
- sin loop constante;
- reduced motion muestra todo inmediatamente.

### Botón

- gradiente violeta → azul → cyan;
- borde luminoso controlado;
- flecha que se desplaza 4px en hover;
- halo suave en hover/focus;
- no usar verde WhatsApp como color dominante;
- incluir un ícono reconocible de WhatsApp en el interior;
- focus visible;
- target mínimo 48px.

## Layout

```css
.global-whatsapp {
  position: relative;
  overflow: clip;
  border-radius: clamp(28px, 3vw, 44px);
  min-height: 620px;
}

.global-whatsapp__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(440px, 1.1fr);
  gap: clamp(48px, 7vw, 112px);
  align-items: center;
  padding: clamp(48px, 6vw, 92px);
}
```

## Variantes por página

El componente debe aceptar propiedades:

```ts
type WhatsAppExperienceProps = {
  eyebrow?: string;
  title: string;
  description: string;
  message: string;
  quickReplies?: string[];
  source: 'home' | 'nfc' | 'fidelizacion' | string;
};
```

No duplicar el componente para cada ruta.

El enlace final debe incorporar el mensaje correspondiente a la página.

## Mobile

- una columna;
- copy primero;
- chat debajo;
- padding 28–32px;
- título entre 38 y 48px;
- chat sin inclinación 3D;
- burbujas de ancho máximo 90%;
- CTA de ancho completo;
- sin fondo reactivo al touch;
- órbitas reducidas u ocultas;
- altura automática;
- ningún elemento fuera del viewport.

## Light mode

No convertir el módulo en blanco plano.

- superficie gris azulada muy clara;
- halo violeta/cyan suave;
- chat blanco con sombras frías;
- mensajes propios con gradiente muy tenue;
- texto oscuro de alto contraste;
- CTA conserva el gradiente de marca.

## Accesibilidad

- enlace real `<a>`;
- `target="_blank"` opcional con `rel="noopener noreferrer"`;
- nombre accesible `Hablar con Fleximy por WhatsApp`;
- chat decorativo `aria-hidden="true"`;
- no añadir burbujas decorativas al tab order;
- reduced motion;
- contraste AA;
- focus visible.

---

# 18. Footer

Reutilizar el footer global.

Agregar la ruta de Fidelización en navegación de soluciones si existe ese grupo.

Verificar que los anchors del footer utilicen rutas válidas desde una página interna, por ejemplo `/#que-hacemos` y no `#que-hacemos` si el destino está en Home.

---

# 19. Arquitectura React sugerida

Adaptar nombres y carpetas a la arquitectura real del proyecto.

```text
pages/ o routes/
└── LoyaltyPage

components/loyalty/
├── LoyaltyHero
├── LoyaltyProblem
├── LoyaltySteps
├── LoyaltyCustomerDemo
├── LoyaltyRuleBuilder
├── LoyaltyBenefits
├── LoyaltyIndustries
├── LoyaltyDashboard
├── LoyaltyGrowth
├── LoyaltyTrust
└── LoyaltyFAQ

components/global/
└── GlobalWhatsAppExperience
```

## Reglas

- no crear un componente monolítico de miles de líneas;
- no convertir cada ícono en un componente separado;
- datos de demo en objetos locales tipados;
- contenido comercial fuera de la lógica de animación;
- estilos encapsulados;
- reutilizar tokens globales cuando sean correctos;
- no alterar selectores globales como `h1`, `section`, `.container` o `button`;
- lazy load solo si el bundle realmente lo necesita;
- sin dependencias nuevas para animaciones simples.

---

# 20. Backend Node.js — alcance funcional recomendado

La landing muestra el producto. Si también se implementa el sistema funcional, utilizar una arquitectura Node.js consistente con el proyecto.

## Entidades mínimas

```text
Business
Location
User
Customer
VisitOrPurchase
LoyaltyRule
Reward
Coupon
NotificationConsent
Notification
AuditEvent
```

## Relaciones

- Business tiene Locations.
- Business tiene Users.
- Customer pertenece a Business y puede relacionarse con varias Locations.
- Customer tiene VisitOrPurchase.
- LoyaltyRule pertenece a Business o Location.
- Reward se genera cuando una regla se cumple.
- Coupon representa el beneficio entregable.
- NotificationConsent registra permiso, canal y fecha.
- AuditEvent registra cambios sensibles y canjes.

## Campos esenciales de Customer

- id;
- businessId;
- name;
- phone normalizado;
- email opcional;
- createdAt;
- lastActivityAt;
- status;
- tags;
- notes con permisos;
- consent status.

## Reglas funcionales

- evitar clientes duplicados por teléfono normalizado dentro del mismo negocio;
- cada registro debe ser idempotente cuando proviene de una integración;
- evaluar reglas después de confirmar la compra/visita;
- impedir generar dos veces el mismo premio;
- cupones con código único;
- estado de cupón: disponible, usado, vencido, cancelado;
- registrar quién efectuó un canje;
- permitir reversión auditada de una compra;
- usar zona horaria `America/Argentina/Buenos_Aires` para vistas comerciales;
- almacenar timestamps en UTC;
- no guardar secretos en frontend.

## Endpoints conceptuales

```text
POST   /api/customers
GET    /api/customers
GET    /api/customers/:id
PATCH  /api/customers/:id
POST   /api/customers/:id/activities
GET    /api/customers/:id/activities
GET    /api/loyalty-rules
POST   /api/loyalty-rules
PATCH  /api/loyalty-rules/:id
GET    /api/rewards
POST   /api/rewards/:id/redeem
GET    /api/dashboard/summary
GET    /api/dashboard/retention
POST   /api/notification-consents
```

## Seguridad

- autenticación;
- autorización por negocio y local;
- validación de payloads;
- rate limiting;
- protección CSRF si corresponde;
- cookies seguras si se usan sesiones;
- logs sin exponer información sensible;
- auditoría de canjes;
- backups;
- borrado o anonimización cuando corresponda;
- no exponer teléfonos completos en logs.

## WhatsApp

- utilizar integración oficial;
- usar templates aprobados cuando corresponda;
- registrar consentimiento y baja;
- no implementar envíos masivos no solicitados;
- distinguir notificación transaccional de promoción;
- almacenar estado del envío y error.

---

# 21. SEO y metadatos

## Title

`Fidelización de clientes para negocios | Fleximy`

## Meta description

`Registrá compras, conocé a tus clientes y premiá automáticamente su fidelidad con una plataforma creada para tu negocio.`

## H1

Un único H1: `Convertí cada compra en una razón para volver.`

## Schema

Se permite:

- `Service`;
- `FAQPage`;
- `BreadcrumbList`.

No usar datos falsos de precio, rating o reseñas.

## Open Graph

Crear una imagen OG específica o dejar placeholder documentado. No reutilizar una captura ilegible del dashboard.

---

# 22. Animaciones generales

## Permitido

- reveals de 450–700ms;
- translateY máximo 20px;
- SVG stroke animations;
- pulsos de progreso;
- microtransiciones de estado;
- halo ambiental;
- hover sutil;
- efecto reactivo limitado al módulo global de WhatsApp.

## No permitido

- stack cards;
- scroll horizontal;
- sticky prolongado;
- cursor falso;
- dashboards que cambian solos;
- movimientos 3D que reduzcan legibilidad;
- parallax sobre textos;
- animar width/height continuamente;
- instalar GSAP solo para fades;
- timers no limpiados;
- fondos reactivos en toda la página;
- elementos que persiguen el mouse.

---

# 23. Responsive obligatorio

## 1280–1599px

- mantener hero de dos columnas;
- dashboard y demo panorámicos;
- casos 3×2;
- ajustar paddings antes que tipografías;
- no escalar interfaces completas con transform.

## 1024–1279px

- hero dos columnas solo si la demo conserva al menos 440px;
- demo de perfil con sidebar reducida;
- beneficios pueden mantenerse en tres columnas;
- casos 2×3;
- WhatsApp aún puede usar dos columnas.

## 768–1023px

- hero en una columna;
- problema en dos columnas;
- pasos 2×2;
- demo con lista de clientes arriba y perfil abajo;
- rule builder en una columna;
- beneficios apilados dentro de una sola superficie;
- casos 2×3;
- dashboard simplificado;
- WhatsApp en una columna.

## Hasta 767px

- contenedor `calc(100% - 40px)`;
- header móvil accesible;
- H1 máximo 62px;
- H2 entre 38 y 48px;
- botones de ancho completo;
- todas las grillas en una columna;
- pasos en recorrido vertical;
- demo muestra tres clientes como máximo;
- historial muestra fecha, concepto y estado;
- ocultar columnas secundarias, no reducir texto;
- dashboard muestra dos KPIs por fila;
- casos de rubro apilados;
- WhatsApp sin mouse effects ni órbitas complejas;
- FAQ con padding 20–24px;
- ningún texto informativo menor a 14px;
- ningún scroll interno;
- ningún overflow horizontal.

---

# 24. Accesibilidad

- HTML semántico;
- un H1;
- orden lógico de headings;
- botones reales solo donde hay acciones;
- enlaces reales para navegación;
- demos decorativas fuera del tab order;
- labels visibles;
- estados con texto además de color;
- contraste WCAG AA;
- foco visible;
- `aria-live` para cambios de demo interactiva;
- reduced motion;
- navegación por teclado;
- targets táctiles mínimos de 44×44px.

---

# 25. Prohibiciones técnicas

No hacer:

- no copiar interfaces de otras marcas;
- no usar screenshots como solución de layout;
- no generar texto dentro de imágenes;
- no usar `width: 100vw` en descendientes;
- no usar `overflow-x: hidden` en body para ocultar fallas;
- no usar márgenes negativos para ampliar contenedores;
- no fijar alturas que corten contenido;
- no usar absolute positioning como layout principal;
- no crear botones que no funcionan;
- no instalar librerías innecesarias;
- no duplicar toda la página para light/dark;
- no mostrar datos reales de clientes;
- no incluir API keys en cliente;
- no prometer WhatsApp automático sin integración oficial;
- no sustituir el formulario existente de otras páginas sin autorización;
- no cambiar el número de WhatsApp solicitado.

---

# 26. QA obligatorio

Probar:

- 1920×1080 dark/light;
- 1440×900 dark/light;
- 1366×768 dark/light;
- 1280×800;
- 1024×768;
- 768×1024;
- 430×932;
- 390×844;
- 360×800.

## Validar

1. ausencia de overflow horizontal;
2. estabilidad del hero;
3. legibilidad de la demo;
4. animación de progreso sin CLS;
5. selector de clientes funcional;
6. registro de compra local funcional;
7. rule builder funcional;
8. todos los controles visibles responden;
9. light/dark completos;
10. reducción de movimiento;
11. anclajes correctos;
12. link de WhatsApp correcto;
13. mensaje de WhatsApp codificado;
14. target accesible;
15. mobile sin interfaces microscópicas;
16. build exitoso;
17. consola sin errores propios;
18. Home y NFC sin regresiones después de instalar el módulo global.

---

# 27. Criterios de aprobación

La página se aprueba únicamente si:

1. el servicio se entiende en cinco segundos;
2. el hero muestra perfil, historial y progreso;
3. la regla configurable se entiende sin explicación técnica;
4. los rubros muestran ejemplos reales;
5. las demos parecen producto terminado;
6. ninguna sección repite el mensaje anterior;
7. la página tiene ritmo y no acumula espacios vacíos;
8. dark y light tienen igual calidad;
9. mobile reorganiza, no miniaturiza;
10. todos los botones funcionan;
11. el módulo WhatsApp es global y reutilizable;
12. el número es `5491161120433`;
13. el CTA no parece un banner verde genérico;
14. las animaciones no afectan rendimiento;
15. no hay overflow;
16. no se rompieron otras rutas;
17. build y consola están limpios.

---

# 28. Orden de implementación

1. Revisar arquitectura y tokens existentes.
2. Crear la ruta y metadatos.
3. Crear estructura semántica de la página.
4. Implementar hero y demo CSS.
5. Implementar problema y pasos.
6. Construir demo central con datos ficticios.
7. Implementar rule builder local.
8. Construir beneficios y rubros.
9. Construir dashboard CSS/SVG.
10. Implementar crecimiento y confianza.
11. Implementar FAQ.
12. Crear `GlobalWhatsAppExperience`.
13. Reemplazar módulos genéricos de WhatsApp en todas las páginas con el componente global.
14. Configurar mensajes por ruta.
15. Implementar light mode.
16. Resolver tablet y mobile.
17. Revisar accesibilidad.
18. Ejecutar QA.
19. Corregir regresiones.
20. Ejecutar build final.

---

# 29. Entrega requerida de OpenCode

Al finalizar, informar:

1. archivos creados y modificados;
2. ruta implementada;
3. componentes creados;
4. interacciones reales incluidas;
5. datos ficticios utilizados;
6. arquitectura responsive;
7. solución dark/light;
8. componente global de WhatsApp;
9. páginas donde fue reemplazado;
10. link final de WhatsApp;
11. medidas de accesibilidad;
12. resoluciones verificadas;
13. resultado del build;
14. resultado de consola;
15. confirmación de ausencia de overflow;
16. cualquier integración backend que quede documentada pero no implementada.

No responder solamente `implementado`.

---

# Instrucción final

Construir `/soluciones/fidelizacion` como una landing comercial completa y una demostración creíble del producto.

El visitante no debe necesitar conocimientos técnicos. Debe comprender rápidamente que Fleximy crea una plataforma adaptada a su negocio para registrar clientes, reconocer recurrencia y activar beneficios configurables.

La página debe demostrar capacidad de diseño y desarrollo mediante interfaces creadas con HTML, CSS y SVG, sin volverse compleja de navegar.

El módulo global de WhatsApp debe ser una pieza distintiva del sistema visual Fleximy y reemplazar los módulos genéricos de WhatsApp del sitio, conservando mensajes específicos para cada ruta.
