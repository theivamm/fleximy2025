# FLEXIMY — AJUSTES FINALES DE LA HOME

## Especificación integral de contenido, diseño, animación y conversión

Este documento define el afinado final de la home publicada en `https://fleximy.com/`.

El objetivo no es realizar otro rework completo ni cambiar la identidad visual alcanzada. La estética general, el isotipo, el gradiente de marca, la combinación dark/light, el hero y el concepto narrativo deben preservarse.

El trabajo consiste en:

1. mejorar el ritmo de lectura;
2. reemplazar el scroll excesivamente largo del módulo 2;
3. eliminar espacios muertos y dependencias de animaciones para ver contenido;
4. agregar una señal de amplitud comercial y credibilidad;
5. crear un cierre de conversión con formulario;
6. sumar preguntas frecuentes;
7. mejorar el footer y la navegación;
8. llevar el nivel visual y técnico a una ejecución profesional, refinada y digna de una referencia de Awwwards.

---

## 1. Diagnóstico actual

### Lo que debe conservarse

- identidad visual clara y reconocible;
- isotipo Fleximy;
- paleta violeta, azul, cian y rosa;
- hero dividido entre propuesta comercial y demostración visual;
- concepto “mucho más que una página web”;
- demostración de Website + App + Dashboard;
- módulo de accesibilidad económica;
- módulo “Vos conocés tu negocio. Nosotros creamos la tecnología…”;
- dark mode y light mode;
- tono directo, simple y argentino;
- ausencia de lenguaje técnico innecesario.

### Problemas que deben resolverse

1. El módulo 2 requiere demasiado recorrido vertical.
2. En capturas de página completa aparecen grandes zonas vacías porque parte del contenido depende del ScrollTrigger.
3. La experiencia explica bien qué es Fleximy, pero todavía ofrece poca prueba o identificación sectorial.
4. El CTA final deriva a otra página y la home termina demasiado rápido en el footer.
5. Falta un mecanismo de conversión directo dentro de la home.
6. Falta una sección breve de preguntas frecuentes.
7. El footer tiene poco contenido y su columna “Navegación” se percibe vacía.
8. Algunas promesas necesitan mayor precisión comercial.

---

## 2. Nueva arquitectura definitiva

La home debe quedar organizada así:

```text
01  HEADER
02  HERO — Más que una web
03  MÓDULO 2 — Una web por fuera. Todo tu negocio por dentro.
04  ACCESIBILIDAD — Una plataforma propia al alcance de tu negocio
05  MÓDULO 3 — De tu negocio a una plataforma real
06  RUBROS / AMPLITUD — Una plataforma distinta para cada negocio
07  CONTACTO — Empecemos por tu negocio
08  FAQ — Preguntas antes de empezar
09  FOOTER
```

No agregar más secciones explicativas. La home debe sentirse completa, no interminable.

---

## 3. Principios de dirección de arte

### La calidad no se consigue agregando ruido

El resultado debe sentirse extraordinario por:

- composición;
- escala;
- ritmo;
- precisión tipográfica;
- animaciones con propósito;
- continuidad entre módulos;
- microdetalles de interfaz;
- transiciones de color y luz;
- excelente ejecución responsive.

No por:

- exceso de partículas;
- títulos gigantes en todas las secciones;
- cards idénticas;
- scrolls artificialmente largos;
- elementos que se rompen fuera del viewport;
- animaciones que ocultan información;
- cursores personalizados intrusivos;
- efectos 3D pesados;
- dashboards genéricos repetidos.

### Regla principal

> Primero se entiende. Después sorprende.

La información esencial debe ser legible aun si GSAP no carga.

---

## 4. Sistema de layout global

### Contenedor principal

```css
--page-max: 1440px;
--page-gutter: clamp(20px, 4vw, 72px);

.container {
  width: min(var(--page-max), calc(100% - (var(--page-gutter) * 2)));
  margin-inline: auto;
}
```

### Espaciado vertical

```css
--section-space: clamp(96px, 10vw, 176px);
--section-space-compact: clamp(72px, 7vw, 120px);
```

No utilizar alturas mínimas de `200vh`, `300vh` o similares para contar contenido breve.

### Grid

- desktop: 12 columnas;
- tablet: 8 columnas;
- mobile: 4 columnas;
- gap desktop: `clamp(20px, 2vw, 32px)`;
- gap mobile: `16px`.

### Radios

```css
--radius-sm: 14px;
--radius-md: 22px;
--radius-lg: 32px;
--radius-xl: 44px;
```

No aplicar el mismo radio a todos los componentes.

---

## 5. Ajustes del header

El header puede seguir siendo minimalista, pero debe ofrecer navegación real.

### Desktop

Incluir:

- isotipo Fleximy a la izquierda;
- enlaces centrales:
  - `Qué hacemos` → módulo 2;
  - `Cómo trabajamos` → módulo 3;
  - `Contacto` → formulario;
- selector de tema;
- CTA `Contanos tu idea`.

### Comportamiento

- fondo transparente al inicio;
- al desplazarse 32px, aplicar superficie translúcida;
- blur moderado;
- borde inferior de 1px;
- reducción de altura de aproximadamente 76px a 64px;
- transición de 300ms;
- nunca ocultar completamente el header al scrollear.

### Mobile

- isotipo;
- selector de tema compacto;
- botón de menú accesible;
- CTA dentro del menú;
- foco atrapado correctamente;
- cerrar con Escape y al navegar.

---

## 6. Ajustes mínimos del hero

No rediseñar el hero. Mantener su composición y su demostración visual.

### Copy

Conservar:

**MÁS QUE UNA WEB**

# Tu negocio merece mucho más que una página web.

Reemplazar la bajada por:

> Creamos el website de tu negocio y una aplicación de gestión a medida para administrar ventas, clientes y operaciones desde un solo lugar.

Esta versión es más clara y evita comunicar que se conecta una aplicación externa.

### Beneficio económico

No usar en el hero una promesa ambigua como:

`a un costo único + soporte y updates de por vida`

Reemplazar por:

> Website, aplicación y dashboard creados como una única plataforma, con una inversión inicial clara y acompañamiento continuo.

Si comercialmente se mantiene el pago único y las actualizaciones de por vida, debe existir una definición contractual clara antes de volver a publicarlo.

### CTA

- `Contanos sobre tu negocio`;
- `Mirá cómo funciona`.

Corregir `Contanos tu negocio`, que suena incompleto.

### Visual

- conservar la interfaz gastronómica;
- mantener el cambio entre Website, App y Dashboard;
- no sumar más tabs;
- limitar el loop completo a 9–12 segundos;
- pausar animaciones cuando el hero no esté visible;
- en mobile, ubicar la demostración debajo del copy.

---

## 7. Rework del módulo 2

### Problema

El formato actual requiere un scroll vertical muy extenso para mostrar cuatro ideas simples. Esto debilita el ritmo comercial y genera espacios vacíos cuando las animaciones todavía no se activaron.

### Nueva solución

## Galería editorial de cuatro productos

No construir cuatro cards idénticas. Crear una galería `2 × 2` de paneles editoriales, cada uno con una composición visual diferente.

La sección completa debe ocupar aproximadamente entre `1500px` y `1900px` de altura en desktop, en lugar de varios viewports consecutivos.

Toda la información debe existir y ser visible sin depender del scroll.

---

## 8. Apertura del módulo 2

### Eyebrow

`WEBSITE + APP DE GESTIÓN`

### Título

## Una web por fuera. Todo tu negocio por dentro.

### Bajada

> Creamos tu website completo y una aplicación de gestión a medida para vender, administrar clientes y manejar la operación desde un solo lugar.

### Remate

*Tecnología a medida, al alcance de tu negocio.*

### Tabs actuales

Eliminar la navegación `01 Tu web / 02 Tus clientes / 03 Tu operación / 04 Tus números` como control obligatorio.

Puede conservarse como índice visual compacto, pero no debe ocultar ni reemplazar contenido.

---

## 9. Composición de la galería

### Desktop

```text
┌───────────────────────────────┬───────────────────────┐
│ 01 TU WEB                     │ 02 TUS CLIENTES       │
│ panel ancho · 7 columnas      │ panel · 5 columnas    │
│ altura aproximada 680px       │ altura 680px          │
├───────────────────────┬───────┴───────────────────────┤
│ 03 TU OPERACIÓN       │ 04 TUS NÚMEROS               │
│ panel · 5 columnas    │ panel ancho · 7 columnas     │
│ altura 680px          │ altura 680px                 │
└───────────────────────┴───────────────────────────────┘
```

Los paneles deben estar levemente desplazados entre sí para evitar aspecto de grilla corporativa perfecta.

### Regla visual

Cada panel contiene:

- número;
- etiqueta;
- título;
- descripción;
- remate;
- una microescena visual dominante.

Pero el orden y la ubicación cambian en cada panel.

---

## 10. Panel 01 — Tu web

### Copy

**01 · TU WEB**

## Una web preparada para convertir visitas en clientes.

Una experiencia única para mostrar, vender y recibir consultas, reservas o pedidos. Diseñada alrededor de tu negocio, no desde una plantilla.

**Tu negocio abierto y listo para vender, las 24 horas.**

### Visual

Conservar la demostración inmobiliaria existente, pero integrarla dentro del panel:

- mockup flotante sin salir del contenedor;
- perspectiva máxima de 3 grados;
- sombra suave;
- pequeñas etiquetas CSS alrededor:
  - `+120 propiedades`;
  - `Nueva consulta`;
  - `Visita agendada`;
- una línea SVG une el CTA de la web con la consulta recibida;
- al hover, desplazamiento máximo de 6px;
- no hacerla clickeable.

### Fondo

Gradiente azul noche a violeta, muy suave, con una grilla editorial irregular.

---

## 11. Panel 02 — Tus clientes

### Copy

**02 · TUS CLIENTES**

## Cada consulta se convierte en una oportunidad.

WhatsApp, formularios, reservas y pedidos llegan al mismo lugar, con el historial completo de cada cliente.

**Ninguna consulta olvidada. Ninguna oportunidad perdida.**

### Visual CSS

No usar la captura completa del dashboard de óptica como imagen dominante. Reconstruir una microinterfaz simplificada:

- lista vertical de tres consultas;
- avatar abstracto con iniciales;
- origen: WhatsApp, web o reserva;
- estado que cambia de `Nueva` a `En seguimiento`;
- panel de historial que se despliega automáticamente;
- una cita destacada: `¿Tienen turno para hoy?`;
- calendario compacto que confirma `16:30`;
- línea de actividad dibujada con SVG.

Debe parecer una interfaz real, pero estar construida con HTML y CSS.

### Fondo

Superficie clara/translúcida con halo cian y acento verde mínimo.

---

## 12. Panel 03 — Tu operación

### Copy

**03 · TU OPERACIÓN**

## Todo lo que necesitás para trabajar, en una sola app.

Pedidos, turnos, tareas, empleados, stock o proyectos. Diseñamos la aplicación alrededor de cómo funciona tu negocio.

**Menos planillas, menos mensajes sueltos y más orden.**

### Visual CSS

Crear una escena operativa de cafetería:

- tres pedidos moviéndose entre `Nuevo`, `Preparando`, `Listo`;
- pequeño mapa de mesas;
- alerta de stock;
- dos empleados activos;
- timeline de turnos;
- notificación `Pedido #184 listo`;
- contador dinámico de tareas pendientes.

No crear un dashboard completo. Los componentes deben aparecer parcialmente recortados por la composición del panel, dando sensación de producto más grande.

### Fondo

Oscuro con gradiente azul profundo y acentos ámbar/cian controlados.

---

## 13. Panel 04 — Tus números

### Copy

**04 · TUS NÚMEROS**

## Mirá cómo funciona tu negocio, sin armar reportes.

Ventas, clientes, productos y tareas importantes reunidos en un dashboard claro para decidir mejor.

**La información importante, lista para usar.**

### Visual CSS/SVG

Construir una composición abstracta de información:

- tres KPI sin cifras comerciales engañosas;
- usar etiquetas conceptuales:
  - `Ventas`;
  - `Clientes`;
  - `Operación`;
- estados `Subiendo`, `Estable`, `Requiere atención`;
- gráfico de área SVG;
- una recomendación emergente;
- donut minimalista;
- una barra temporal que atraviesa el panel.

No inventar facturación o porcentajes que puedan interpretarse como resultados de un cliente real.

### Fondo

Gradiente violeta/rosa de baja saturación con puntos luminosos muy contenidos.

---

## 14. Animación del módulo 2

### Entrada

- título por máscara vertical;
- paneles con `opacity` y desplazamiento máximo de 36px;
- stagger de 100–140ms;
- duración entre 650 y 900ms;
- no ocultar paneles hasta que cada uno llegue al centro del viewport.

### Microactividad

- los componentes internos se actualizan automáticamente;
- un pedido avanza;
- una consulta cambia de estado;
- una línea de datos se dibuja;
- un indicador respira;
- loops entre 6 y 10 segundos;
- pausar cuando el panel no sea visible.

### Prohibido

- pin de varios viewports;
- scroll-jacking;
- desplazamiento horizontal obligatorio;
- cards apiladas que se superponen;
- elementos ocultos con opacidad hasta activar ScrollTrigger;
- dependencias de hover para entender el contenido.

---

## 15. Responsive del módulo 2

### Tablet

- grilla 2 × 2 equilibrada;
- todos los paneles con ancho del 50%;
- altura entre 580 y 640px;
- reducir microelementos secundarios;
- conservar jerarquía visual.

### Mobile

- una sola columna;
- cada panel entre 520 y 680px según contenido;
- visual primero o después del copy según panel para crear ritmo;
- no escalar el panel desktop con `transform: scale()`;
- microinterfaces reconstruidas para mobile;
- todo el contenido visible sin hover;
- no superar 24px de padding lateral;
- verificar 320, 375, 390 y 430px.

---

## 16. Ajuste del módulo de accesibilidad

Conservar el módulo, pero afinar el copy.

### Eyebrow

`EL COSTO IMPORTA`

### Título

## Una plataforma propia está más cerca de lo que imaginás.

Evitar que `accesible` sea el único argumento. “Más cerca” mantiene la intención sin prometer precios bajos para todos los proyectos.

### Bajada

> Empezá con las funciones que tu negocio necesita hoy y sumá nuevas herramientas a medida que crece.

### Panel lateral

**PAGÁS POR LO QUE NECESITÁS**

- Sin software sobredimensionado.
- Sin funciones que no vas a usar.
- Sin cambiar tu forma de trabajar.

Remate:

`Alcance definido · Implementación por etapas · Inversión escalable`

### CTA

- principal: `Contanos cómo funciona tu negocio`;
- secundario: `Ver ejemplos por rubro` → ancla al módulo de rubros.

---

## 17. Ajuste del módulo 3

Mantener su concepto actual. No reconstruirlo completamente.

### Copy definitivo

**DE TU NEGOCIO A UNA PLATAFORMA REAL**

## Vos conocés tu negocio. Nosotros creamos la tecnología para hacerlo avanzar.

> Nos contás cómo trabajás y qué necesitás mejorar. Diseñamos tu website y una aplicación de gestión a medida, preparados para tu operación diaria.

**Sin plantillas. Sin sistemas genéricos. Sin complicaciones.**

### Tres pasos

#### 01 — Nos contás

**Primero entendemos cómo funciona tu negocio.**

Conocemos tus ventas, tu equipo y los procesos que necesitás ordenar o mejorar.

`No necesitás preparar nada técnico.`

#### 02 — Lo diseñamos

**Creamos una solución alrededor de tu forma de trabajar.**

Definimos el website, las funciones y las pantallas necesarias para simplificar tu operación.

`Cada parte responde a una necesidad real.`

#### 03 — Lo ponemos en marcha

**Te entregamos todo funcionando.**

Implementamos la plataforma, acompañamos a tu equipo y sumamos nuevas funciones cuando las necesitás.

`Preparada para usar. Preparada para crecer.`

### Ajuste visual

- compactar un 15–20% el alto total;
- aumentar contraste de etiquetas en light mode;
- mantener la máquina tipográfica;
- evitar que `HECHO PARA VOS` compita con el contenido;
- mejorar la visibilidad de Website/App/Dashboard;
- limitar la animación central a un ciclo completo;
- CTA final puede eliminarse si el formulario aparece inmediatamente después del módulo de rubros.

---

## 18. Nuevo módulo de rubros

### Objetivo

Demostrar que Fleximy puede adaptarse a negocios diferentes sin volver a explicar todas las funciones ni mostrar otro dashboard.

### Eyebrow

`UNA PLATAFORMA DISTINTA PARA CADA NEGOCIO`

### Título

## Si tu negocio funciona distinto, su tecnología también debería hacerlo.

### Bajada

> Diseñamos cada plataforma alrededor de sus clientes, sus procesos y su forma de trabajar.

### Dirección visual

Crear una pieza tipográfica de ancho completo denominada **Industry Ribbon**.

Tres cintas horizontales se desplazan a distintas velocidades:

```text
GASTRONOMÍA · INMOBILIARIAS · ÓPTICAS · COMERCIO · SERVICIOS
TURNOS · PEDIDOS · CLIENTES · STOCK · EQUIPOS · PROYECTOS
WEBSITE · APP DE GESTIÓN · DASHBOARD · SOPORTE · CRECIMIENTO
```

### Construcción

- tipografía outline monumental;
- algunas palabras rellenas con el gradiente Fleximy;
- iconos lineales creados con SVG;
- intersecciones entre cintas con `mix-blend-mode` controlado;
- fondo reactivo al cursor de baja intensidad;
- no usar fotografías;
- no usar carrusel de cards;
- no hacer las palabras clickeables;
- duración de loop entre 24 y 36 segundos;
- pausa al no estar visible;
- en reduced motion, composición estática.

### Cierre

## No importa el rubro. Importa cómo funciona tu negocio.

`Contanos tu caso y diseñamos una solución alrededor de él.`

Este módulo debe ser breve: entre 620 y 820px en desktop.

---

## 19. Nuevo módulo de contacto

### Objetivo

Permitir que el visitante convierta sin salir de la home.

### Concepto visual

## “La primera pantalla de tu proyecto”

El formulario no debe parecer un formulario corporativo pegado al final. Debe presentarse como la primera interfaz que Fleximy diseña junto al cliente.

### Composición desktop

- fondo oscuro aunque la home esté en light mode, creando un cambio de escena;
- contenedor grande con borde luminoso muy sutil;
- dos columnas 5/7;
- izquierda: copy, confianza y contacto directo;
- derecha: formulario;
- gran isotipo F recortado en el fondo;
- líneas CSS que reaccionan al foco de cada campo;
- barra de progreso mínima basada en campos completados;
- sin wizard ni múltiples pantallas.

---

## 20. Copy del contacto

### Eyebrow

`EMPECEMOS POR TU NEGOCIO`

### Título

## Contanos qué necesitás mejorar. Nosotros pensamos cómo convertirlo en tecnología.

### Bajada

> No necesitás saber qué aplicación crear ni preparar una lista de funciones. Contanos cómo trabajás hoy y qué te gustaría resolver.

### Confianza

> Somos un equipo de diseño y desarrollo enfocado en crear websites y aplicaciones simples, útiles y pensadas alrededor de cada negocio.

### Contacto alternativo

`¿Preferís hablar directamente? Escribinos por WhatsApp →`

No exponer el número en texto si el botón ya dirige correctamente al canal.

---

## 21. Campos del formulario

Mantenerlo breve.

### Obligatorios

1. `Nombre`
2. `Negocio o empresa`
3. `WhatsApp`
4. `Email`
5. `¿A qué se dedica tu negocio?`
6. `¿Qué necesitás mejorar?`

### Opciones de “¿Qué necesitás mejorar?”

Usar chips multiselección:

- Crear o renovar mi website.
- Recibir consultas, reservas o pedidos.
- Administrar clientes.
- Ordenar tareas y procesos.
- Ver ventas y resultados.
- Necesito una solución completa.
- Todavía no lo tengo claro.

### Campo abierto

Label:

`Contanos brevemente cómo trabajás hoy`

Placeholder:

`Por ejemplo: recibimos pedidos por WhatsApp, los anotamos en una planilla y necesitamos ordenar el seguimiento…`

No exigir más de 500 caracteres.

### CTA

`Quiero conversar sobre mi proyecto →`

### Microcopy

`Te respondemos personalmente. Sin compromiso y sin tecnicismos.`

---

## 22. Estados del formulario

### Campo en foco

- borde de gradiente mediante pseudo-elemento;
- label se desplaza 4px;
- halo de baja opacidad;
- no usar glow fuerte.

### Validación

- validación al salir del campo, no mientras se escribe;
- mensajes humanos y específicos;
- no mostrar todos los errores de una vez;
- usar icono además de color.

### Envío

1. botón pasa a `Enviando…`;
2. spinner CSS;
3. deshabilitar doble envío;
4. preservar datos si falla;
5. mensaje de error con acción para reintentar.

### Éxito

No redirigir a una página vacía.

Transformar el formulario dentro del mismo contenedor:

**Gracias, [Nombre]. Ya recibimos tu consulta.**

`Vamos a revisar tu caso y te contactaremos por los datos que nos dejaste.`

CTA alternativo:

`Mientras tanto, hablar por WhatsApp →`

Agregar evento de conversión únicamente después de una respuesta exitosa del backend.

---

## 23. Integración técnica del formulario

- validación de frontend y servidor;
- sanitización de inputs;
- protección anti-spam con honeypot y rate limiting;
- CAPTCHA solo si el spam real lo exige;
- consentimiento de privacidad junto al botón;
- enlace a Política de privacidad;
- envío a email, CRM o base de datos definida;
- no exponer claves en frontend;
- registrar fecha, origen, URL y UTM si existen;
- no registrar información sensible innecesaria;
- incluir estados accesibles mediante `aria-live`;
- inputs con labels reales;
- autofill correcto;
- teclado adecuado en mobile para email y teléfono.

### Eventos analíticos sugeridos

- `contact_form_view`;
- `contact_form_start`;
- `contact_form_submit`;
- `contact_form_success`;
- `whatsapp_click`;
- `hero_primary_cta_click`.

No disparar `generate_lead` antes de confirmar el envío exitoso.

---

## 24. FAQ

### Eyebrow

`ANTES DE EMPEZAR`

### Título

## Algunas preguntas que probablemente ya tenés.

### Preguntas y respuestas

#### ¿Tengo que saber qué funciones necesito?

No. Empezamos entendiendo cómo funciona tu negocio y qué necesitás mejorar. A partir de eso definimos la solución y las funciones necesarias.

#### ¿El website y la aplicación se crean a medida?

Sí. Diseñamos tanto la experiencia que ven tus clientes como la aplicación que usa tu equipo, alrededor de la forma real en que trabaja tu negocio.

#### ¿Puedo empezar con pocas funciones?

Sí. Podemos comenzar con una primera etapa clara y sumar nuevas herramientas a medida que el negocio las necesita.

#### ¿Qué pasa después de la entrega?

Te acompañamos en la puesta en marcha y continuamos disponibles para soporte, mejoras y nuevas funciones.

#### ¿Tengo que cambiar todos mis procesos?

No. Primero analizamos qué conviene mantener, qué se puede simplificar y qué vale la pena mejorar. La tecnología debe adaptarse al negocio, no al revés.

### Diseño

- acordeón accesible;
- máximo cinco preguntas;
- una pregunta abierta por vez en mobile;
- en desktop pueden coexistir dos abiertas si el layout lo permite;
- línea de gradiente que recorre el item activo;
- número de pregunta grande en outline;
- animación de altura sin saltos;
- ícono `+` que rota a `×`;
- no usar una card exterior por pregunta.

---

## 25. Footer final

El footer actual debe ganar utilidad sin volverse enorme.

### Columna 1 — Marca

- isotipo;
- `Creamos websites y aplicaciones de gestión a medida para negocios.`;
- selector de tema.

### Columna 2 — Navegación

- Qué hacemos;
- Cómo trabajamos;
- Rubros;
- Contacto.

### Columna 3 — Contacto

- WhatsApp;
- email comercial si está definido;
- ubicación general únicamente si aporta confianza.

### Columna 4 — Legal

- Privacidad;
- Términos.

### Cierre

`© 2026 Fleximy. Todos los derechos reservados.`

Gran palabra outline `FLEXIMY` en la parte inferior, recortada, con parallax mínimo.

---

## 26. Sistema de animación global

### GSAP

Usar GSAP solamente para:

- reveals editoriales;
- timelines narrativos;
- conectores SVG;
- desplazamientos suaves de tipografía;
- sincronización de módulos complejos.

Usar CSS para:

- hover;
- estados de foco;
- glows;
- loops simples;
- spinners;
- indicadores respirando;
- cambios de superficie.

### Reglas

- todos los timelines deben inicializarse al acercarse al viewport;
- pausar cuando el elemento deja de ser visible;
- limpiar timelines al desmontar;
- no ocultar contenido crítico antes de ejecutar JavaScript;
- no animar `width`, `height`, `top` o `left` si puede resolverse con transform;
- máximo parallax de 8px;
- duración de reveals entre 500 y 900ms;
- evitar animar cada palabra individual de todos los párrafos;
- una animación protagonista por módulo.

---

## 27. Reactividad al mouse

Mantenerla refinada y no esencial.

Permitido:

- halo radial suave;
- desplazamiento de profundidad de 2–6px;
- borde luminoso que se aproxima al cursor;
- deformación mínima del gradiente;
- inclinación máxima de 2 grados en paneles grandes.

Prohibido:

- elementos persiguiendo el cursor;
- magnetismo fuerte en textos;
- cursor personalizado que impida seleccionar;
- reacciones en todos los componentes;
- efectos activos en dispositivos touch.

---

## 28. Dark y light mode

Los dos temas deben sentirse diseñados, no invertidos automáticamente.

### Dark

```css
--bg: #070916;
--surface-1: #0d1021;
--surface-2: rgba(18, 23, 46, .72);
--text: #f6f7ff;
--muted: #a9b0c6;
--line: rgba(160, 174, 225, .14);
```

### Light

```css
--bg: #f5f6fc;
--surface-1: #ffffff;
--surface-2: rgba(255, 255, 255, .72);
--text: #101329;
--muted: #5d647b;
--line: rgba(35, 45, 88, .12);
```

### Reglas

- contraste WCAG AA;
- no usar texto gris demasiado claro en light mode;
- no perder bordes ni microinterfaces;
- reducir sombras y glows en light;
- preservar el gradiente de marca;
- respetar preferencia del sistema en primera visita;
- guardar elección del usuario.

---

## 29. Accesibilidad

- navegación completa por teclado;
- `skip link` al contenido;
- foco visible y coherente;
- orden DOM igual al orden visual;
- títulos jerárquicos correctos;
- un solo `h1`;
- labels reales en formulario;
- acordeones con `aria-expanded`;
- mensajes del formulario con `aria-live`;
- SVG decorativos con `aria-hidden`;
- iconos funcionales con nombre accesible;
- targets táctiles de al menos 44 × 44px;
- respetar `prefers-reduced-motion`;
- no depender únicamente del color;
- no bloquear zoom del navegador.

---

## 30. Performance

### Objetivos

- LCP menor a 2.5s;
- CLS menor a 0.1;
- INP menor a 200ms;
- Lighthouse Performance mayor a 90 en producción;
- Accessibility mayor a 95;
- Best Practices mayor a 95;
- SEO mayor a 95.

### Reglas

- optimizar imágenes existentes en AVIF/WebP;
- reservar dimensiones de todos los mockups;
- precargar únicamente la fuente crítica;
- usar `font-display: swap`;
- lazy-load de imágenes fuera del hero;
- cargar GSAP plugins solo si se usan;
- evitar filtros blur gigantes animados;
- limitar `backdrop-filter` a superficies pequeñas;
- no ejecutar animaciones en pestañas inactivas;
- dividir componentes pesados;
- eliminar código de módulos descartados.

---

## 31. SEO y contenido técnico

- title descriptivo y comercial;
- meta description coherente con el nuevo mensaje;
- canonical correcto;
- Open Graph completo;
- favicon e isotipo actualizados;
- schema `Organization`;
- schema `Service` solo con servicios reales;
- sitemap;
- robots.txt;
- textos renderizables sin depender de animación;
- enlaces con texto descriptivo;
- evitar repetir exactamente el mismo CTA en todos los módulos.

### Meta title sugerido

`Fleximy — Websites y aplicaciones de gestión para negocios`

### Meta description sugerida

`Creamos el website y la aplicación de gestión que tu negocio necesita para vender, administrar clientes y ordenar toda la operación.`

---

## 32. Arquitectura sugerida

```text
Home/
├── Header/
├── Hero/
├── ProductGallery/
│   ├── ProductGalleryHeader.tsx
│   ├── WebsitePanel.tsx
│   ├── ClientsPanel.tsx
│   ├── OperationsPanel.tsx
│   └── InsightsPanel.tsx
├── AccessiblePlatform/
├── CustomProcess/
├── IndustryRibbon/
├── ContactSection/
│   ├── ContactIntro.tsx
│   ├── ContactForm.tsx
│   ├── NeedSelector.tsx
│   └── ContactSuccess.tsx
├── FAQ/
└── Footer/
```

Centralizar:

- tokens visuales;
- textos;
- breakpoints;
- configuración de animaciones;
- tracking de eventos;
- validación del formulario.

---

## 33. Orden de implementación

### Fase 1 — Correcciones críticas

- corregir copy del hero;
- corregir CTA `Contanos tu negocio`;
- mejorar navegación;
- eliminar espacios muertos;
- asegurar que todo el contenido sea visible sin JS.

### Fase 2 — Rework del módulo 2

- eliminar scroll vertical largo;
- construir galería editorial 2 × 2;
- implementar cuatro microescenas;
- crear responsive específico;
- retirar código del módulo anterior.

### Fase 3 — Afinado de módulos existentes

- módulo de accesibilidad;
- compactar módulo 3;
- contraste y light mode;
- continuidad entre fondos.

### Fase 4 — Nuevos cierres

- Industry Ribbon;
- formulario;
- estados de validación y éxito;
- FAQ;
- footer final.

### Fase 5 — Calidad

- accesibilidad;
- tracking;
- SEO;
- performance;
- QA responsive;
- revisión dark/light;
- reducción de movimiento.

---

## 34. Prompt final para OpenCode

Trabajá sobre la home publicada de Fleximy siguiendo este documento como especificación vinculante. La identidad visual actual debe preservarse: isotipo, gradiente violeta-azul-cian-rosa, dark/light mode, tono editorial y estética tecnológica premium.

No realices otro rework general ni cambies la propuesta comercial. El objetivo es compactar, mejorar la lectura, cerrar la historia y aumentar la conversión.

Primero corregí el hero. Fleximy crea tanto el website como la aplicación de gestión; no describas el servicio como una conexión con una aplicación externa. Usá la bajada definida en este documento, corregí el CTA a “Contanos sobre tu negocio” y reemplazá la promesa ambigua sobre costo único y updates de por vida por una formulación comercial precisa.

Reemplazá completamente el formato actual del módulo 2. Eliminá el recorrido vertical extenso, el pin de varios viewports y cualquier contenido que permanezca invisible hasta activar ScrollTrigger. Construí una galería editorial 2 × 2 formada por cuatro paneles asimétricos: Tu web, Tus clientes, Tu operación y Tus números. No deben parecer cuatro cards idénticas. Cada panel debe tener su propia composición, iluminación y microescena creada con HTML, CSS y SVG. Conservá los textos definidos en este documento.

El panel Tu web integra el mockup inmobiliario. Tus clientes reconstruye una bandeja de consultas simplificada. Tu operación muestra pedidos, mesas, stock y equipo mediante microcomponentes CSS. Tus números usa datos conceptuales y gráficos SVG sin inventar cifras de negocio. Ningún panel necesita interacción para entenderse.

Conservá el módulo de accesibilidad y el módulo “De tu negocio a una plataforma real”, pero aplicá los ajustes de copy, contraste y altura especificados. El módulo 3 debe ser entre 15% y 20% más compacto.

Después incorporá un módulo breve de rubros basado en tres cintas tipográficas animadas. No uses fotografías, cards ni dashboards. La sección debe demostrar amplitud mediante tipografía cinética, SVG lineales y el gradiente Fleximy.

Creá un módulo final de contacto bajo el concepto “La primera pantalla de tu proyecto”. Debe incluir el formulario completo, sus campos, chips multiselección, validaciones, estado de carga, error y éxito. El formulario debe funcionar realmente, estar protegido contra spam, registrar UTMs cuando existan y disparar eventos analíticos únicamente en los momentos correctos.

Agregá el FAQ de cinco preguntas y reconstruí el footer con navegación real, contacto y enlaces legales.

El peso gráfico debe surgir de una composición profesional: tipografía editorial, profundidad moderada, líneas SVG, microinterfaces CSS, transiciones de luz y una animación protagonista por módulo. Evitá partículas excesivas, scroll-jacking, cards repetidas, dashboards genéricos, cursores intrusivos y efectos que dificulten leer.

Implementá GSAP solo donde aporte narrativa. Usá CSS para loops simples y estados. Todo el contenido debe ser visible y comprensible si JavaScript falla. Respetá `prefers-reduced-motion`, limpiá timelines, pausá animaciones fuera de viewport y evitá layout shift.

Diseñá específicamente desktop, tablet y mobile. No uses `transform: scale()` para adaptar composiciones. Verificá 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844, 375×812 y 320×568. No debe existir overflow horizontal.

No consideres finalizado el trabajo hasta completar accesibilidad, dark/light mode, SEO, tracking, validación real del formulario, performance y QA visual en todas las resoluciones indicadas.

---

## 35. Criterios de aceptación

### Narrativa

- la propuesta se entiende en el hero;
- el módulo 2 explica el producto sin scroll excesivo;
- el precio reduce fricción;
- el módulo 3 explica el proceso;
- el módulo de rubros genera identificación;
- el formulario convierte;
- el FAQ reduce dudas;
- el footer cierra correctamente.

### Diseño

- mantiene la identidad Fleximy;
- tiene alto impacto visual sin perder claridad;
- no parece una plantilla;
- no utiliza cuatro cards idénticas;
- no repite dashboards completos;
- contiene microinterfaces CSS de calidad;
- dark y light mode están diseñados;
- mobile no parece una reducción del desktop.

### Técnica

- no hay pin vertical de varios viewports en el módulo 2;
- no hay espacios muertos;
- no hay contenido crítico invisible sin JS;
- no hay overflow horizontal;
- no hay layout shifts perceptibles;
- el formulario funciona realmente;
- validación y éxito son accesibles;
- tracking no duplica eventos;
- reduced motion funciona;
- no quedan listeners o timelines huérfanos;
- se alcanzan los objetivos de rendimiento.

### Comercial

- no se afirma que Fleximy conecta una app externa;
- se entiende que Fleximy crea website y aplicación;
- no se inventan métricas ni casos;
- no se promete un alcance indefinido sin respaldo contractual;
- existe un CTA final claro;
- el visitante puede consultar sin salir de la home.

---

## 36. Resultado esperado

La home final debe llevar al visitante por esta historia:

1. **Mi negocio puede tener mucho más que una web.**
2. **Fleximy crea el website y también la aplicación para administrarlo.**
3. **La plataforma puede comenzar con lo necesario y crecer conmigo.**
4. **No tengo que saber de tecnología; Fleximy entiende, diseña y crea.**
5. **Esto puede adaptarse a mi tipo de negocio.**
6. **Puedo contar mi caso ahora mismo.**

La experiencia debe sentirse sofisticada, pero la decisión comercial debe sentirse simple.
