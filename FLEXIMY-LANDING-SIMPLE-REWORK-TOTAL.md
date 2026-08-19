# FLEXIMY — Rework total hacia una landing simple, clara y rápida

## 1. Decisión de producto

Descartar la arquitectura actual del sitio y reconstruir el Home como una única landing page corta, comercial y fácil de entender.

La estética actual de Fleximy se conserva: fondo oscuro, light mode, gradientes violeta–azul–cian, isotipo `F`, tipografía moderna, detalles reactivos y calidad visual premium. Lo que cambia por completo es la experiencia: menos módulos, menos interfaces, menos texto, menos decisiones y una propuesta entendible en pocos segundos.

No reutilizar la estructura actual solo cambiando textos. Eliminar la composición existente y rediseñar todos los módulos desde cero.

---

## 2. Problema que debe resolver el rework

El sitio actual demuestra mucha capacidad, pero exige demasiado esfuerzo para entender:

- qué hace Fleximy;
- para quién trabaja;
- qué puede construir;
- por qué conviene elegirla;
- cuál es el siguiente paso.

La acumulación de dashboards, demos, industrias, controles, animaciones y textos genera ruido. Algunas interfaces aparentan ser aplicaciones completas y no lo son, lo que produce una sensación de producto roto o inconcluso.

La nueva landing debe comunicar en menos de diez segundos:

> Fleximy diseña y desarrolla webs, aplicaciones y dashboards para resolver necesidades reales de negocios.

---

## 3. Objetivo

Crear una landing page:

- simple;
- rápida;
- comercial;
- visualmente potente;
- fácil de leer;
- fácil de recorrer;
- enfocada en generar consultas;
- coherente en desktop y mobile;
- sin prometer interacciones que no existen.

El usuario debe comprender la propuesta completa con un recorrido de aproximadamente 60–90 segundos.

---

## 4. Arquitectura definitiva

La página tendrá solamente:

1. Header.
2. Hero.
3. Qué hacemos / Servicios.
4. Quiénes somos.
5. Por qué Fleximy.
6. CTA final.
7. Footer mínimo.

No agregar otros módulos sin aprobación.

---

## 5. Header

### Contenido

- Isotipo `F` + nombre Fleximy.
- Links con anclas: `Servicios`, `Nosotros`, `Por qué Fleximy`.
- Selector light/dark.
- CTA: `Contanos tu idea`.

### Comportamiento

- Header compacto, limpio y sticky.
- Sin menú desplegable de soluciones.
- Sin navegación a numerosas páginas internas.
- En mobile: logo, selector de tema y menú simple.
- Al pulsar una opción, hacer scroll suave a la sección correspondiente.

---

## 6. Hero

### Objetivo

Explicar inmediatamente qué hace Fleximy, para quién y qué acción debe tomar el visitante.

### Copy final

**Eyebrow**

`DISEÑO + DESARROLLO PARA NEGOCIOS`

**H1**

> Creamos webs, apps y dashboards que hacen avanzar negocios.

Aplicar gradiente solo a `webs, apps y dashboards` o a `avanzar`. No convertir cada línea en un efecto distinto.

**Descripción**

> Diseñamos y desarrollamos soluciones digitales a medida para vender, organizar procesos, conectar equipos y mejorar la experiencia de tus clientes.

**CTA primario**

`Contanos tu idea`

**CTA secundario**

`Ver servicios`

**Microcopy**

`Estrategia · UX/UI · Desarrollo · Automatización`

### Visual del hero

Usar una única composición de producto, no un collage:

- una ventana de aplicación grande y ordenada;
- tres pestañas visibles: `Web`, `App`, `Dashboard`;
- transición automática breve entre las tres vistas;
- cada vista debe ser estática o tener una sola microanimación;
- las pestañas pueden seleccionarse y siempre deben cambiar el contenido;
- no mostrar menús internos falsamente navegables;
- no usar un cursor animado recorriendo controles que no funcionan;
- no agregar teléfonos, notificaciones y tarjetas flotantes sin relación.

Las tres vistas son una demostración visual del alcance, no mini apps.

### Escala

- H1 desktop: `clamp(52px, 5vw, 82px)`.
- Máximo de tres líneas en 1920 px.
- H1 mobile: 42–50 px según ancho.
- Descripción desktop: 18–21 px.
- Contenedor máximo: 1280–1320 px.
- Grilla desktop: 45% copy / 55% visual.
- El hero debe entrar razonablemente en una pantalla de 1920 × 1080 sin cortar CTA ni visual principal.

---

## 7. Servicios

### Encabezado

**Eyebrow**

`QUÉ HACEMOS`

**H2**

> Soluciones digitales pensadas alrededor de tu negocio.

**Descripción**

> Podemos crear desde una web comercial hasta una plataforma completa. La solución depende del problema, no de una plantilla.

### Cuatro servicios

#### 01 — Sitios web

> Webs institucionales, landings y ecommerce rápidos, claros y preparados para convertir visitas en oportunidades.

Incluye: `Landing pages · Webs corporativas · Ecommerce`

#### 02 — Aplicaciones y plataformas

> Apps web y portales que conectan usuarios, información y procesos en una experiencia simple.

Incluye: `Apps web · Portales · SaaS · Áreas privadas`

#### 03 — Dashboards y gestión

> Paneles para visualizar métricas, clientes, tareas, ventas, stock y operación desde un solo lugar.

Incluye: `KPIs · CRM · Operaciones · Reportes`

#### 04 — Automatización

> Flujos que reducen tareas manuales y conectan formularios, WhatsApp, sistemas y equipos.

Incluye: `Integraciones · Automatizaciones · Procesos`

### Diseño del módulo

- Cuatro bloques amplios y legibles.
- No convertirlos en pequeñas cards genéricas.
- Cada servicio puede tener una microinterfaz CSS sencilla y no interactiva.
- Mantener suficiente aire, pero evitar secciones de pantalla completa por servicio.
- Desktop: grilla 2 × 2.
- Mobile: una columna.

---

## 8. Quiénes somos

### Copy final

**Eyebrow**

`SOMOS FLEXIMY`

**H2**

> Diseño, tecnología y visión de negocio en un mismo equipo.

**Texto**

> Somos una agencia y product studio que transforma ideas, procesos y oportunidades en productos digitales concretos. Trabajamos cerca de cada negocio para entender qué necesita, diseñar una solución clara y desarrollarla de principio a fin.

> No buscamos sumar tecnología porque sí. Creamos herramientas que tengan sentido para las personas que las usan y para el negocio que las sostiene.

### Puntos breves

- `Entendemos el negocio antes de diseñar.`
- `Diseño y desarrollo trabajan juntos.`
- `Construimos en etapas claras y visibles.`
- `Acompañamos después del lanzamiento.`

### Diseño

- Composición de dos columnas.
- Copy a la izquierda.
- A la derecha, una composición editorial abstracta basada en el isotipo `F`, grilla, líneas y capturas parciales de interfaces.
- No usar fotografías genéricas de una supuesta oficina o equipo si no son reales.
- No inventar cantidad de empleados, años, clientes o métricas.

---

## 9. Por qué Fleximy

### Copy final

**Eyebrow**

`POR QUÉ FLEXIMY`

**H2**

> No entregamos una plantilla. Construimos una solución.

### Cuatro razones

#### Pensado para tu negocio

> Cada proyecto parte de tus objetivos, usuarios y forma real de trabajar.

#### Un equipo de punta a punta

> Estrategia, UX/UI y desarrollo avanzan juntos, sin perder la idea en el camino.

#### Proceso claro

> Dividimos el proyecto en etapas concretas, con avances visibles y decisiones compartidas.

#### Preparado para crecer

> Construimos una base sólida que puede evolucionar junto con tu negocio.

### Diseño

- Cuatro columnas en desktop o grilla 2 × 2.
- Una cifra `01–04`, título y descripción por razón.
- Sin íconos genéricos de IA.
- Sin animaciones complejas.
- Entrada suave al hacer scroll, una sola vez.

---

## 10. CTA final

### Copy

**H2**

> ¿Tenés una idea o un proceso que necesita funcionar mejor?

**Descripción**

> Contanos qué querés crear, mejorar o automatizar. Te ayudamos a convertirlo en una solución digital concreta.

**CTA primario**

`Contanos tu idea`

**CTA secundario**

`Hablar por WhatsApp`

### Diseño

- Gran bloque oscuro con gradiente ambiental violeta–cian.
- No agregar formulario extenso en el Home.
- El CTA principal puede llevar a una página/formulario de contacto muy breve.
- Usar el teléfono real de WhatsApp; no publicar un número de ejemplo.

---

## 11. Footer mínimo

- Isotipo + Fleximy.
- Claim: `Diseñamos y desarrollamos productos digitales para negocios.`
- Anclas: Servicios · Nosotros · Por qué Fleximy.
- Contacto real.
- Privacidad y Términos únicamente si están completos y validados.
- Copyright.
- Sin cinco columnas ni repetición de todas las industrias.

---

## 12. Dirección visual que debe conservarse

- Dark mode como experiencia principal.
- Light mode completo, no una simple inversión de colores.
- Fondo azul noche casi negro.
- Gradientes violetas, azules y cian.
- Isotipo `F` como recurso gráfico.
- Tipografía Inter o equivalente moderna y legible.
- Bordes suaves, transparencias controladas y glow sutil.
- Sensación premium, tecnológica y humana.
- Interfaces creadas con CSS cuando ayuden a explicar el servicio.

### Lo que debe cambiar

- Menos tipografía gigante.
- Menos textos centrados.
- Menos secciones de 100vh.
- Menos cards pequeñas.
- Menos dashboards.
- Menos animaciones simultáneas.
- Menos copy abstracto.
- Más contraste y legibilidad.
- Más espacio útil.
- Más jerarquía comercial.
- Más claridad en los CTA.

---

## 13. Motion y efectos

La nueva landing puede verse moderna sin convertirse en una demo técnica.

### Permitido

- Gradientes ambientales lentos.
- Glow que reacciona suavemente al mouse en desktop.
- Aparición ligera de títulos y bloques.
- Transición entre `Web`, `App` y `Dashboard` en el hero.
- Movimiento sutil del isotipo.
- Hover claro en botones y links.

### No permitido

- Stack cards.
- Scroll secuestrado.
- Texto difícil de leer por animación constante.
- Cursores falsos recorriendo toda la pantalla.
- Marquees repetidos.
- Ocho dashboards animándose.
- Elementos con apariencia interactiva que no funcionen.
- Parallax agresivo.
- Animaciones largas que bloqueen el contenido.

Respetar `prefers-reduced-motion`.

---

## 14. Sistema de layout

```css
:root {
  --page-gutter: clamp(20px, 4vw, 64px);
  --container: 1280px;
  --container-copy: 720px;
  --section-space: clamp(80px, 10vw, 144px);
}

.container {
  width: min(calc(100% - (var(--page-gutter) * 2)), var(--container));
  margin-inline: auto;
}

.measure {
  max-width: var(--container-copy);
}
```

Reglas:

- No anidar contenedores con padding duplicado.
- Fondos y gradientes full-bleed; contenido dentro del contenedor.
- Párrafos entre 55 y 70 caracteres por línea.
- No usar `overflow-x: hidden` global para tapar errores.
- No usar `transform: scale()` para resolver responsive.
- No dejar scroll horizontal entre 320 y 1920 px.

---

## 15. Responsive

### Desktop

- Hero en dos columnas.
- Servicios 2 × 2.
- Quiénes somos en dos columnas.
- Por qué Fleximy en cuatro columnas o 2 × 2.

### Tablet

- Hero apilado.
- Visual debajo del copy.
- Servicios 2 × 2.
- Header compacto antes de que los elementos se amontonen.

### Mobile

- Una sola columna.
- H1 de máximo cuatro líneas.
- Botones apilados o de ancho completo.
- Interfaces simplificadas, no dashboards desktop encogidos.
- Áreas táctiles mínimas de 44 px.
- Sin efectos reactivos al mouse.

Validar: 1920 × 1080, 1440 × 900, 1366 × 768, 1024 × 768, 768, 390 y 320 px.

---

## 16. Páginas y rutas

### Primera etapa

Publicar solo:

- `/` — landing principal.
- `/contacto` — formulario breve.
- `/privacidad` — únicamente con información real validada.
- `/terminos` — únicamente con información real validada.

Redirigir las rutas anteriores al Home o retirarlas de navegación y sitemap hasta decidir si volverán a desarrollarse. No dejar páginas viejas visualmente desconectadas.

### Formulario de contacto

Campos máximos:

- Nombre.
- Empresa.
- Email o WhatsApp.
- Qué necesitás: Web / App / Dashboard / Automatización / No estoy seguro.
- Contanos brevemente tu idea.

CTA: `Enviar consulta`.

---

## 17. SEO básico

**Title**

`Fleximy — Webs, apps y dashboards para negocios`

**Meta description**

`Diseñamos y desarrollamos webs, aplicaciones, dashboards y automatizaciones a medida para resolver necesidades reales de negocios.`

**H1 único**

`Creamos webs, apps y dashboards que hacen avanzar negocios.`

Además:

- canonical correcto;
- Open Graph con el nuevo isotipo;
- sitemap solo con rutas válidas;
- 404 real con `noindex`;
- schema Organization/ProfessionalService;
- favicon con el isotipo `F`;
- información de contacto real.

---

## 18. Rendimiento y accesibilidad

- Cargar solamente los componentes utilizados.
- Eliminar código, animaciones y assets de demos anteriores que ya no se renderizan.
- No cargar ocho aplicaciones ocultas.
- Lazy-load de visuales bajo el fold.
- Animar principalmente `transform` y `opacity`.
- Contraste WCAG AA.
- Navegación completa con teclado.
- Focus visible.
- Selector de tema accesible y persistente.
- Labels reales en formulario.
- Objetivos: LCP < 2,5 s, CLS < 0,1, INP < 200 ms.

---

## 19. Prompt maestro para OpenCode

> Realizá un rework total de Fleximy siguiendo íntegramente este archivo. La web actual debe descartarse a nivel de arquitectura, contenido y módulos. No intentes adaptar o remendar la estructura existente: reconstruí el Home como una landing única, corta, comercial y fácil de entender.
>
> Conservá únicamente la identidad visual valiosa: isotipo `F`, dark/light mode, azul noche, gradientes violeta–azul–cian, tipografía moderna, glows sutiles y sensación premium. No conserves la acumulación actual de módulos, demos, dashboards, animaciones y páginas por industria.
>
> La landing tendrá exactamente: Header, Hero, Servicios, Quiénes somos, Por qué Fleximy, CTA final y Footer mínimo. No agregues testimonios, métricas, casos, logos, industrias, FAQs, procesos, blogs, playgrounds ni nuevas secciones sin autorización.
>
> Usá literalmente los contenidos definidos en este MD como primera versión. Podés ajustar cortes de línea, pero no reemplazar el copy por frases genéricas.
>
> El hero debe explicar en segundos que Fleximy crea webs, apps y dashboards para resolver necesidades de negocios. La demostración visual tendrá únicamente tres vistas —Web, App y Dashboard— y toda opción que parezca interactiva debe funcionar.
>
> Eliminá el Laboratorio Fleximy, Dashboard Playground, demos por industria, cards apiladas, marquees redundantes, cursores automáticos, controles falsos y cualquier bloque que dificulte la lectura. Eliminá también el código muerto asociado cuando hayas verificado que no se reutiliza.
>
> La prioridad es: claridad, legibilidad, velocidad, responsive y conversión. La estética debe acompañar el mensaje, no competir con él.
>
> Trabajá por etapas:
>
> 1. Inventariar componentes/rutas actuales y definir qué se elimina.
> 2. Crear tokens, layout y contenedores.
> 3. Reconstruir Header y Hero.
> 4. Crear Servicios, Quiénes somos y Por qué Fleximy.
> 5. Crear CTA, Footer y contacto.
> 6. Retirar rutas y código obsoleto.
> 7. Ajustar light/dark, responsive, accesibilidad, SEO y rendimiento.
> 8. Ejecutar QA completo.
>
> No des por terminado el trabajo porque compile. Revisá visualmente dark y light mode en 1920, 1440, 1366, 1024, 768, 390 y 320 px. Probá todos los links, anclas, tabs, botones, selector de tema y formulario.
>
> Entregá al finalizar: listado de archivos modificados/eliminados, rutas finales, capturas responsive, resultado de build/lint, métricas de rendimiento disponibles y lista de datos reales pendientes.

---

## 20. Restricciones innegociables

- No recrear el sitio complejo actual.
- No convertir la landing en un portfolio infinito.
- No agregar módulos para “llenar”.
- No inventar clientes, testimonios, métricas o casos.
- No usar números de contacto ficticios.
- No publicar legales con placeholders.
- No instalar dependencias sin necesidad.
- No crear botones decorativos.
- No repetir el mismo mensaje en varias secciones.
- No usar tipografía gigante si obliga a hacer demasiado scroll.
- No sacrificar claridad por efectos visuales.

---

## 21. Criterio de aceptación

El rework queda aprobado si una persona que no conoce Fleximy puede responder en menos de diez segundos:

1. Qué hace: webs, apps, dashboards y automatizaciones.
2. Para quién: negocios que necesitan vender, organizar o mejorar procesos.
3. Qué la diferencia: diseño, desarrollo y visión de negocio en un mismo equipo.
4. Qué debe hacer después: contar su idea.

Además:

- la página se recorre rápidamente;
- no hay módulos rotos o incompletos;
- no existen controles falsos;
- no hay overflow horizontal;
- dark y light mode son consistentes;
- el sitio funciona con teclado;
- el contenido se lee sin esfuerzo;
- el visual del hero no domina al mensaje;
- todos los CTA funcionan;
- la identidad sigue sintiéndose Fleximy.

---

## 22. Resultado esperado

La nueva Fleximy no debe intentar demostrar todo lo que puede construir dentro de su propia landing. Debe hacer algo más importante: explicar con claridad qué resuelve, transmitir criterio y lograr que una persona quiera conversar.

La sensación final debe ser:

> “Entendí lo que hacen, se ve excelente y quiero contarles mi proyecto.”
