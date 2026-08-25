# FLEXIMY — Módulo 02: “De herramientas sueltas a un negocio conectado”

## Brief maestro de contenido, diseño, interacción y desarrollo

Este documento define exclusivamente el **segundo módulo de la home de Fleximy**, inmediatamente después del hero.

No modificar el hero ni anticipar el diseño de las secciones posteriores.

---

## 1. Lectura comercial del hero actual

El hero ya cumple tres funciones:

1. presenta una promesa clara: vender, funcionar y crecer;
2. explica que Fleximy construye web, app y dashboard;
3. muestra una demostración visual del ecosistema.

Por eso, el segundo módulo no debe volver a decir “hacemos webs, apps y dashboards” ni mostrar otra demo gastronómica completa. Eso sería repetición.

La siguiente pregunta del visitante es:

> ¿Qué cambia realmente en mi negocio cuando todo esto está conectado?

El módulo debe responderla visual y comercialmente.

---

## 2. Concepto principal

# De herramientas sueltas a un negocio conectado.

La sección muestra cómo una operación fragmentada —mensajes, pedidos, clientes, stock y tareas en distintos lugares— se convierte progresivamente en un sistema ordenado construido por Fleximy.

No es una lista de funcionalidades. Es una transformación visible.

### Historia

```text
ANTES                         FLEXIMY                         DESPUÉS

WhatsApp    Planillas         conecta                       ventas
Pedidos     Formularios       organiza                      operación
Stock       Notas             automatiza                    información
Clientes    Tareas                                           decisiones
```

La idea comercial es sencilla:

> No agregamos otra herramienta. Conectamos las que tu negocio necesita en un sistema hecho para vos.

---

## 3. Objetivo comercial

El módulo debe conseguir que el visitante entienda estas cuatro ventajas:

- no pierde consultas ni pedidos;
- deja de repetir tareas manuales;
- controla la operación desde un solo lugar;
- obtiene una solución adaptada a su negocio, no una plantilla genérica.

Al terminar la sección, la conclusión debe ser:

> “Esto podría ordenar mi negocio.”

No buscar que piense solamente “qué linda animación”.

---

## 4. Copy definitivo

### Eyebrow

`TODO CONECTADO`

### Título principal

# Tu negocio ya tiene las piezas. Nosotros hacemos que trabajen juntas.

Aplicar gradiente únicamente a:

`trabajen juntas`

### Bajada

> Conectamos consultas, ventas, clientes y operación en un sistema diseñado alrededor de la forma en que realmente funciona tu negocio.

### Frase comercial de cierre

> Menos tareas sueltas. Más control. Más tiempo para crecer.

### CTA al final

`Quiero ordenar mi negocio →`

CTA secundario:

`Conocer nuestros servicios`

---

## 5. Nombre interno del componente

```text
ConnectedBusinessStory
```

No utilizar nombres como `Features`, `BentoGrid`, `ServicesCards` o `DashboardSection`. Este módulo es una historia de transformación.

---

## 6. Experiencia general

En desktop, crear una sección de scroll narrativo con dos columnas:

- izquierda: cuatro capítulos comerciales;
- derecha: un escenario visual sticky que cambia con el scroll;
- el escenario parte fragmentado y termina convertido en un dashboard unificado;
- la sección ocupa aproximadamente entre 300 y 380 vh;
- cada capítulo debe tener suficiente tiempo para leerse, pero sin scroll artificialmente lento.

### Estructura

```text
[Introducción centrada]

[STICKY STORY]
┌──────────────────────────┬──────────────────────────────────┐
│ Capítulos de texto       │ Escenario visual sticky         │
│                          │                                  │
│ 01 Todo llega separado   │ WhatsApp + mail + planilla       │
│ 02 Cada venta se conecta │ Flujo pedido + cliente           │
│ 03 La operación responde │ Dashboard operativo              │
│ 04 Todo queda bajo control│ Sistema completo               │
└──────────────────────────┴──────────────────────────────────┘

[Cierre comercial + CTA]
```

---

## 7. Capítulos del scroll

## Capítulo 01 — Todo llega separado

### Título

`Tu negocio funciona. Pero la información vive en todas partes.`

### Texto

> Una consulta por WhatsApp, un pedido en Instagram, clientes en una planilla y tareas que dependen de que alguien se acuerde.

### Microresultado

`Información dispersa · Procesos manuales · Poco control`

### Escena visual

Mostrar un escritorio digital elegante, no caótico de forma caricaturesca:

- conversación de WhatsApp;
- notificación de Instagram;
- fila de una planilla;
- correo con una consulta;
- nota de stock;
- calendario con una tarea;
- fotografía real de una persona trabajando parcialmente visible detrás de las capas.

Los elementos aparecen desalineados, con escalas y profundidades diferentes. No usar una nube de cards flotando sin lógica. Deben representar fuentes concretas.

### Placeholder fotográfico

```text
[IMAGE_OPERATOR_DESK]
Persona joven responsable de una PyME trabajando frente a una notebook,
ambiente contemporáneo, luz natural lateral, expresión concentrada,
estética editorial premium, encuadre horizontal, espacio negativo para UI,
sin texto ni marcas reconocibles.
Formato: 1800 × 1300, WebP/AVIF.
```

---

## Capítulo 02 — Cada venta se conecta

### Título

`Una consulta puede convertirse en venta sin perderse en el camino.`

### Texto

> Centralizamos los contactos, registramos cada oportunidad y conectamos el recorrido completo desde el primer mensaje hasta el pago.

### Microresultado

`Consulta → Cliente → Pedido → Seguimiento`

### Escena visual

Las fuentes fragmentadas del capítulo anterior se desplazan hacia una línea de flujo central.

Mostrar:

- entrada de consulta;
- ficha de cliente creada automáticamente;
- producto o servicio seleccionado;
- estado de pago;
- confirmación enviada;
- timeline visible y comprensible.

Debe aparecer una fotografía de producto recortada que atraviese parcialmente el flujo. El producto funciona como elemento editorial y como dato real del pedido.

### Placeholder de producto

```text
[IMAGE_FEATURED_PRODUCT]
Producto real del rubro elegido, fotografiado en estudio con iluminación premium,
ángulo tres cuartos, fondo transparente, sombra natural independiente,
alta definición, sin textos incrustados.
Formato: PNG/WebP transparente, mínimo 1400 × 1400.
```

Usar temporalmente un producto gastronómico solo si mantiene continuidad con el hero, pero preparar el componente para reemplazarlo por cualquier industria.

---

## Capítulo 03 — La operación responde

### Título

`Cuando entra una venta, el resto del negocio se mueve.`

### Texto

> Actualizamos pedidos, tareas, stock y avisos para que cada persona sepa qué tiene que hacer y cuándo.

### Microresultado

`Pedido confirmado · Stock actualizado · Equipo notificado`

### Escena visual

El flujo anterior se transforma en un dashboard operativo robusto.

No debe ser una captura plana. El dashboard debe construirse dentro del navegador mediante HTML y CSS.

Mostrar:

- sidebar real;
- barra superior;
- pedido reciente destacado;
- tabla de tareas o producción;
- stock actualizado;
- responsables;
- estados con hora;
- actividad reciente.

Una fotografía real de una persona o producto puede sobresalir desde una tarjeta contextual, pero no debe tapar datos importantes.

### Cambio causal

Cuando entra el pedido:

- `Pedidos hoy` cambia de 47 a 48;
- el stock cambia de 18 a 17;
- se crea una tarea de preparación;
- aparece una notificación “Equipo avisado”;
- la fila nueva recibe un highlight breve.

No animar cifras aleatorias. Cada cambio debe tener una causa visible.

---

## Capítulo 04 — Todo bajo control

### Título

`Ahora podés ver qué pasa y decidir qué sigue.`

### Texto

> Reunimos la información importante para que entiendas qué funciona, dónde mejorar y qué necesita atención.

### Microresultado

`Más visibilidad · Mejores decisiones · Una base para crecer`

### Escena visual

El dashboard operativo se expande hacia una vista ejecutiva completa:

- ventas del período;
- evolución semanal;
- conversión;
- canales de ingreso;
- productos o servicios destacados;
- alertas concretas;
- actividad del equipo;
- comparación con período anterior.

El resultado final debe sentirse organizado, espacioso y premium.

Agregar un sello visual discreto:

`Sistema conectado por Fleximy`

No utilizar un logo gigante ni convertirlo en publicidad dentro de la demo.

---

## 8. Dashboard final: especificación visual

El dashboard debe tener suficiente complejidad para demostrar capacidad, pero jerarquía clara.

### Frame general

- relación aproximada 16:10;
- browser chrome mínimo;
- sidebar de 15–17% del ancho;
- contenido principal con grid de 12 columnas;
- border radius exterior entre 20 y 24 px;
- sombras amplias, suaves y poco opacas;
- nitidez suficiente para leer los datos.

### Componentes

#### Sidebar

- Resumen
- Ventas
- Clientes
- Operación
- Inventario
- Reportes

#### Métricas

- Ventas del mes: `$18.420.000`
- Pedidos: `486`
- Conversión: `4,8%`
- Tiempo recuperado: `32 h`

#### Gráfico principal

`Ventas y pedidos · últimos 30 días`

Debe incluir:

- ejes;
- labels;
- tooltip;
- comparación;
- leyenda;
- valores creíbles;
- highlight del día actual.

#### Operación

```text
#1048 · Nuevo          10:42
#1047 · Preparando     10:36
#1046 · Listo          10:18
```

#### Inventario

```text
Producto principal        17 unidades
Insumo secundario         Stock bajo
Packaging                 68 unidades
```

#### Insight comercial

`Tu canal web generó un 24% más de consultas esta semana.`

No utilizar lorem ipsum, nombres “John Doe”, datos imposibles ni gráficos sin contexto.

---

## 9. Dirección artística

La sección debe conservar el ADN del hero, pero tener un ritmo propio.

### Fondo

- transición progresiva desde el claro del hero hacia un gris azulado ligeramente más profundo;
- gradiente radial suave detrás del escenario sticky;
- textura de grano apenas visible;
- una línea vertical o recorrido luminoso que conecte los capítulos;
- dark mode diseñado, no invertido automáticamente.

### Color

Usar los colores de Fleximy como señal funcional:

- violeta: entrada o interacción;
- azul: datos y estructura;
- cian: automatización o conexión;
- rosa: highlight comercial o finalización.

No aplicar el gradiente a todas las superficies. El gradiente debe señalar transformación, no decorar cada tarjeta.

### Tipografía

- título de introducción amplio pero menor que el H1;
- capítulos entre 42 y 58 px en desktop;
- cuerpo entre 18 y 21 px;
- datos internos del dashboard legibles, mínimo visual equivalente a 12–14 px;
- no usar cinco pesos tipográficos diferentes;
- evitar mayúsculas excesivas.

---

## 10. Dinámica GSAP + ScrollTrigger

La animación debe servir a la historia.

### Comportamiento sticky

- fijar únicamente el escenario derecho;
- el texto de la izquierda avanza naturalmente;
- no bloquear toda la página;
- no usar scroll horizontal;
- no modificar la velocidad de scroll del navegador;
- liberar el sticky de forma limpia al terminar el capítulo 04.

### Timeline general

```text
0–20%    Fragmentación
20–45%   Conexión comercial
45–72%   Operación automática
72–100%  Visión ejecutiva
```

### Transiciones

1. **Fragmentación:** capas entran desde distancias cortas con leves rotaciones.
2. **Conexión:** las capas se alinean hacia un flujo central; líneas SVG dibujan relaciones.
3. **Operación:** el flujo se integra dentro del dashboard; no hacer un corte brusco.
4. **Control:** el dashboard reorganiza columnas y revela datos ejecutivos.

### Técnicas permitidas

- `ScrollTrigger`;
- `matchMedia()` de GSAP;
- `clip-path`;
- máscaras;
- transformaciones 2D moderadas;
- SVG path drawing;
- `FLIP` si ya está disponible;
- counters solo en cambios causales;
- stagger breve y controlado;
- parallax de profundidad máximo 10–18 px.

### Técnicas prohibidas

- tarjetas apiladas que dependan del scroll;
- pinning de más de una pantalla completa sin salida clara;
- scroll hijacking;
- física elástica exagerada;
- elementos rebotando;
- partículas;
- cursores personalizados globales;
- blur constante sobre textos;
- rotaciones 3D gratuitas;
- revelar cada palabra individualmente;
- animaciones infinitas que compitan con la lectura.

---

## 11. La firma visual única

Crear un recurso distintivo llamado **Connection Rail**.

Es una línea de energía fina que nace en las fuentes fragmentadas y atraviesa todo el módulo:

- recibe pequeños pulsos cuando entra una consulta;
- conecta la ficha del cliente con el pedido;
- alimenta el dashboard;
- termina debajo de la métrica principal;
- cambia suavemente de violeta a cian;
- funciona como guía narrativa y no como adorno.

Esta línea debe dibujarse con SVG y adaptarse a los cambios de layout.

En mobile se convierte en una línea vertical ubicada a la izquierda del contenido.

Evitar circuitos genéricos, redes neuronales, cerebros de IA o conexiones con decenas de nodos. Debe ser simple, reconocible y propio de Fleximy.

---

## 12. Imágenes reemplazables

Preparar los siguientes slots:

```text
/public/images/module-02/
  operator-desk.webp
  featured-product.webp
  team-member-01.webp
  business-context.webp
```

### Slots

#### `[IMAGE_OPERATOR_DESK]`

Persona operando el negocio. Horizontal, editorial, espacio negativo para UI.

#### `[IMAGE_FEATURED_PRODUCT]`

Producto protagonista recortado, fondo transparente.

#### `[IMAGE_TEAM_MEMBER_01]`

Retrato contextual de responsable de operación, no headshot corporativo.

#### `[IMAGE_BUSINESS_CONTEXT]`

Imagen ambiental del negocio en funcionamiento, usada solo en el estado final.

### Reglas

- usar `<picture>` con WebP/AVIF;
- mantener `aspect-ratio` reservado;
- no incrustar texto en las imágenes;
- no usar imágenes de bancos evidentes;
- evitar poses mirando a cámara;
- mantener una misma dirección de luz y tratamiento de color;
- permitir reemplazo desde un único archivo de datos;
- las imágenes decorativas usan `alt=""`;
- las informativas tienen alt específico.

Mientras no existan imágenes definitivas, usar placeholders editoriales con el nombre del asset. No rellenar con bloques grises sin identidad.

---

## 13. Interactividad sin scroll

El módulo debe seguir siendo comprensible si el usuario no realiza el recorrido completo.

Agregar un selector discreto encima del escenario:

```text
01 Consultas   02 Ventas   03 Operación   04 Control
```

En desktop:

- el scroll actualiza el selector;
- hacer click en un estado lleva suavemente al capítulo correspondiente;
- usar botones reales;
- indicar progreso sin depender solo del color.

No agregar autoplay. El scroll ya es el mecanismo narrativo.

---

## 14. Mobile y tablet

No reducir el escenario desktop con `transform: scale()`.

### Tablet

- introducción arriba;
- texto y stage todavía pueden compartir columnas en landscape;
- en portrait, usar una sucesión vertical;
- evitar un sticky demasiado largo;
- simplificar sombras y capas.

### Mobile

Convertir la historia en cuatro escenas verticales independientes:

1. texto del capítulo;
2. visual específico;
3. microresultado;
4. transición mediante Connection Rail.

El dashboard se debe rediseñar como vista operativa móvil:

- dos métricas principales;
- pedidos recientes;
- alerta de stock;
- insight comercial;
- navegación inferior mínima;
- textos internos de al menos 12 px;
- targets de 44 × 44 px;
- sin hover obligatorio;
- sin pinning en pantallas pequeñas;
- sin overflow horizontal.

### Animación mobile

- `ScrollTrigger` solo para entradas y conexión de la línea;
- no fijar el viewport;
- no superponer más de tres capas;
- reducir desplazamientos;
- no usar fotografías que tapen contenido;
- respetar `prefers-reduced-motion`.

### Breakpoints de QA

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

## 15. Dark mode

La sección debe tener una versión oscura diseñada específicamente.

### Dark

- fondo tinta azulado;
- superficies del dashboard entre `#111528` y `#181D34`;
- bordes suaves con baja opacidad;
- textos blancos cálidos;
- Connection Rail con brillo mínimo;
- fotografías ligeramente más contrastadas, sin filtros artificiales.

### Light

- fondo gris azulado muy claro;
- tarjetas blancas o lavanda apenas perceptible;
- sombra profunda solo en el stage principal;
- textos tinta;
- datos con contraste real.

No aplicar `filter: invert()` a ningún componente.

---

## 16. Arquitectura sugerida

```text
ConnectedBusinessStory/
  ConnectedBusinessStory.tsx
  StoryIntro.tsx
  StoryChapter.tsx
  StoryNavigation.tsx
  ConnectionRail.tsx
  TransformationStage.tsx
  states/
    FragmentedState.tsx
    SalesFlowState.tsx
    OperationsState.tsx
    ControlState.tsx
  components/
    MessagePanel.tsx
    CustomerRecord.tsx
    OrderTimeline.tsx
    OperationsDashboard.tsx
    ExecutiveDashboard.tsx
  data/
    module02Data.ts
  hooks/
    useStoryProgress.ts
    useStoryAnimation.ts
  connected-business-story.css
```

### Estado

```ts
type StoryStep = 'fragmented' | 'sales' | 'operations' | 'control';

type Module02State = {
  activeStep: StoryStep;
  orderCount: number;
  stockCount: number;
  orderStatus: 'new' | 'confirmed' | 'preparing';
};
```

No duplicar datos entre las distintas vistas. La venta que aparece en el capítulo 02 debe ser la que actualiza el dashboard del capítulo 03.

---

## 17. Rendimiento

- lazy load de fotografías que no aparecen en el primer capítulo;
- no renderizar canvas pesado;
- animar `transform` y `opacity` siempre que sea posible;
- no recalcular SVG en cada frame;
- usar `will-change` solo durante la animación;
- limpiar todos los ScrollTriggers al desmontar;
- evitar listeners duplicados;
- objetivo: sin layout shift perceptible;
- objetivo móvil: mantener scroll fluido en gama media;
- no cargar librerías nuevas si GSAP ya cubre la necesidad.

---

## 18. Accesibilidad

- el contenido completo debe existir en el DOM aunque la animación no se ejecute;
- orden de lectura lógico;
- contraste AA;
- foco visible;
- selector de capítulos operable con teclado;
- no mover el foco al cambiar de capítulo;
- `aria-current="step"` en el estado activo;
- reduced motion convierte la transformación en crossfades simples;
- no depender únicamente de líneas o color para explicar el proceso;
- dashboard con textos reales, no imágenes de texto.

---

## 19. Qué evitar para que no parezca una web hecha con IA

- bento grid de beneficios;
- seis tarjetas iguales con iconos genéricos;
- emojis como iconografía;
- degradado morado en cada objeto;
- títulos como “Potenciá tu negocio” sin explicación;
- texto centrado en todas las secciones;
- mockups idénticos repetidos;
- gráficos decorativos sin escala;
- números inventados presentados como casos reales;
- logos ficticios en carrusel;
- glassmorphism excesivo;
- frases vagas sobre innovación;
- animaciones que no cuentan una causa y un efecto;
- fotografías de personas sonriendo a cámara;
- contenido duplicado del hero.

La personalidad surge de la dirección editorial, la Connection Rail y la transformación coherente; no de sumar efectos indiscriminadamente.

---

## 20. Secuencia de implementación

### Fase 1 — contenido y layout

- crear introducción;
- crear cuatro capítulos;
- implementar estructura desktop y mobile;
- construir cierre y CTA;
- verificar jerarquía sin animaciones.

### Fase 2 — estados visuales

- construir fragmentación;
- construir flujo comercial;
- construir dashboard operativo;
- construir dashboard ejecutivo;
- conectar todos los datos.

### Fase 3 — arte e imágenes

- crear slots reemplazables;
- integrar placeholders correctos;
- sumar profundidad;
- diseñar light y dark mode.

### Fase 4 — GSAP

- implementar sticky desktop;
- crear timeline;
- dibujar Connection Rail;
- sincronizar navegación;
- implementar reduced motion;
- limpiar triggers correctamente.

### Fase 5 — QA

- revisar todos los breakpoints;
- validar legibilidad del dashboard;
- probar teclado;
- comprobar reduced motion;
- verificar fluidez;
- ejecutar build y lint;
- revisar que no se haya alterado el hero.

---

## 21. Prompt listo para OpenCode

```text
Construí únicamente el segundo módulo de la home de Fleximy siguiendo de manera completa el archivo FLEXIMY-MODULO-02-SISTEMA-CONECTADO.md.

No modifiques el hero ni ninguna sección posterior.

El módulo no es una grilla de servicios ni una colección de cards. Es una historia comercial de transformación llamada “De herramientas sueltas a un negocio conectado”. Debe responder qué cambia concretamente en el negocio cuando Fleximy conecta consultas, ventas, operación y datos.

Implementá cuatro capítulos: fragmentación, venta conectada, operación y control. En desktop, el texto avanza a la izquierda y un escenario sticky se transforma a la derecha mediante GSAP ScrollTrigger. En mobile, eliminá el pinning y convertí la experiencia en cuatro escenas verticales diseñadas específicamente.

Construí todas las interfaces con HTML y CSS. No uses una imagen plana de dashboard. Los datos deben ser legibles y la misma venta debe conectar los estados: la consulta se convierte en pedido y ese pedido actualiza cantidad, stock y operación.

Creá la Connection Rail en SVG como firma visual del módulo. Debe conectar las escenas y reaccionar al progreso sin parecer un circuito tecnológico genérico.

Prepará los slots de imágenes especificados en el MD. Hasta contar con fotografías definitivas, usá placeholders con nombre, relación y posición correctos. No inventes rectángulos vacíos ni reemplaces productos por bloques de color.

No agregues bento grids, stack cards, partículas, scroll horizontal, cursor global ni animaciones sin función. No uses textos genéricos diferentes a los definidos en el documento.

Primero asegurá que el layout, contenido, dashboard, dark/light y responsive funcionen sin animación. Después incorporá GSAP. Respetá prefers-reduced-motion y limpiá todos los ScrollTriggers al desmontar.

Antes de terminar:
1. verificá 1920, 1440, 1366, 1024, 768, 430, 390, 375 y 320 px;
2. comprobá que no exista overflow horizontal;
3. verificá que todos los textos internos sean legibles;
4. probá navegación por capítulos y teclado;
5. comprobá light/dark y reduced motion;
6. ejecutá lint y build;
7. corregí todos los errores;
8. entregá la lista de archivos modificados y decisiones implementadas.
```

---

## 22. Criterios de aceptación

El módulo estará terminado cuando:

- comunica una transformación y no una lista de funcionalidades;
- no repite el contenido del hero;
- los cuatro capítulos se entienden sin animación;
- el scroll conecta consulta, venta, operación y control;
- la Connection Rail funciona como hilo conductor;
- el dashboard parece un producto real;
- los gráficos tienen escalas, labels y contexto;
- las fotografías se pueden reemplazar desde una fuente central;
- la venta del capítulo 02 actualiza el capítulo 03;
- todos los datos son consistentes;
- el sticky se libera correctamente;
- mobile tiene composición propia;
- dark y light mode mantienen profundidad;
- reduced motion funciona;
- no existen botones falsos;
- no hay overflow ni saltos de layout;
- el módulo no parece una plantilla ni un diseño genérico de IA;
- el hero permanece intacto.

---

## Resultado esperado

El primer módulo promete que Fleximy crea un sistema para vender, funcionar y crecer.

El segundo debe demostrar por qué ese sistema importa:

> Convierte una operación dispersa en un negocio conectado, visible y preparado para crecer.
