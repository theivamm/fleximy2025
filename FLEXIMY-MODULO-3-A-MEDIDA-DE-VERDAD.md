# FLEXIMY — Módulo 3: A medida de verdad

## Brief maestro de concepto, contenido, diseño, animación e implementación

Este documento reemplaza completamente la propuesta anterior del módulo 3 basada en un catálogo de micro soluciones.

No conservar del módulo anterior:

- catálogo de 80 funciones;
- grilla de tarjetas;
- buscador de módulos;
- filtros por categoría;
- constructor con selección múltiple;
- panel de módulos agregados;
- combinaciones extensas por industria;
- estética de marketplace de plugins.

El nuevo módulo debe ser más simple de comprender, más fuerte comercialmente y mucho más expresivo visualmente.

---

## 1. Lugar del módulo dentro de la landing

La secuencia actual es:

### Hero

Comunica que Fleximy ofrece mucho más que una página web.

### Módulo 2

Demuestra las cuatro capas de una plataforma:

1. Tu web.
2. Tus clientes.
3. Tu operación.
4. Tus números.

### Nuevo módulo 3

Debe responder:

> “¿Por qué debería elegir Fleximy en lugar de una plantilla, un software genérico o varias herramientas separadas?”

La respuesta es:

> **Porque no obligamos a tu negocio a adaptarse a un sistema. Diseñamos el sistema alrededor de cómo funciona tu negocio.**

---

## 2. Objetivo comercial

El módulo debe instalar cuatro ideas:

1. Cada negocio tiene reglas, recorridos y necesidades diferentes.
2. Una plantilla cambia colores y textos, pero mantiene la misma estructura.
3. Fleximy cambia la arquitectura completa según el negocio.
4. Se puede comenzar con una solución esencial y hacerla crecer por etapas.

### Percepción buscada

> “No me están vendiendo el mismo software que a todos. Van a entender cómo trabajo y construir algo para mí.”

---

## 3. Gran idea creativa

### Nombre conceptual interno

`THE BUSINESS COMPILER`

No mostrar este nombre en español como título comercial. Es una referencia para diseño y desarrollo.

El módulo funciona como un sistema visual que “traduce” la forma de trabajar de un negocio en una plataforma digital.

La experiencia presenta una oración configurable:

```text
Mi negocio
[recibe reservas]
[trabaja con un equipo]
[vende productos]
[necesita controlar resultados]
```

Cuando cambian las reglas, una interfaz creada completamente con HTML y CSS se reorganiza en tiempo real.

No debe limitarse a cambiar el color o el título. Deben cambiar:

- estructura;
- componentes;
- jerarquía;
- datos;
- acciones;
- navegación;
- flujo operativo.

---

## 4. Contenido principal

### Eyebrow

`A MEDIDA DE VERDAD`

### H2 principal

# Tu negocio no entra en una plantilla. Tu plataforma tampoco.

Aplicar gradiente únicamente a:

`tu plataforma tampoco`

### Descripción

> Primero entendemos cómo vendés, atendés y trabajás. Después diseñamos una plataforma que sigue las reglas de tu negocio.

### Frase de apoyo

`No adaptamos tu negocio al software. Adaptamos el software a tu negocio.`

### CTA principal

`Diseñemos tu plataforma →`

### CTA secundario

`Probá cómo cambia`

---

## 5. Formato general

El módulo tendrá tres movimientos visuales dentro de una misma composición:

```text
01 Entender
02 Diseñar
03 Conectar
```

No presentarlos como tres tarjetas convencionales.

Los tres movimientos forman una única experiencia:

```text
Cómo funciona tu negocio
          ↓
Reglas convertidas en interfaz
          ↓
Website + App + Dashboard conectados
```

### Altura recomendada

- Desktop: entre 980 y 1180 px.
- Laptop: entre 880 y 1040 px.
- Tablet y mobile: altura natural según contenido.

No crear scroll hijacking.

No bloquear el scroll del usuario.

No usar una sección pinneada de varios viewports.

---

## 6. Dirección visual

Este módulo debe funcionar como una pausa respecto de las capturas y dashboards del módulo anterior.

Debe ser:

- tipográfico;
- abstracto;
- tecnológico;
- editorial;
- preciso;
- completamente construido con código;
- sorprendente sin volverse confuso.

### Materiales visuales permitidos

- HTML;
- CSS;
- SVG generado en código;
- tipografía variable;
- gradientes;
- bordes;
- máscaras;
- líneas;
- grids;
- componentes UI simplificados;
- iconos Lucide;
- GSAP para orquestación.

### No utilizar

- fotografías;
- imágenes rasterizadas;
- mockups PNG;
- videos;
- renders 3D;
- logos externos;
- ilustraciones de stock;
- capturas de dashboards;
- emojis.

---

## 7. Composición desktop

El módulo se organiza dentro de un contenedor máximo de 1480 px.

### Zona superior

- eyebrow;
- título;
- descripción;
- frase de apoyo.

### Zona central

Dos columnas:

- izquierda: “reglas del negocio”;
- derecha: “plataforma generada”.

```css
.adaptive-system__stage {
  width: min(calc(100% - 64px), 1480px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(360px, .78fr) minmax(0, 1.42fr);
  gap: clamp(56px, 6vw, 112px);
  align-items: center;
}
```

### Zona inferior

- explicación comercial de una línea;
- CTA;
- progresión de implementación.

---

## 8. Fondo tipográfico

Agregar detrás del módulo una palabra de gran escala:

```text
CUSTOM
```

Alternativas aceptadas:

```text
ADAPTABLE
BUILT FOR YOU
NO TEMPLATE
```

Recomendación: utilizar `NO TEMPLATE`.

### Tratamiento

- tipografía bold condensada;
- entre 18vw y 24vw;
- outline de 1 px;
- opacidad entre 0.025 y 0.055;
- desplazamiento horizontal muy lento;
- no competir con el contenido;
- quedar oculto para lectores de pantalla.

No usar marquee infinito rápido.

---

## 9. Columna izquierda: reglas del negocio

### Encabezado

```text
01 · CONTANOS CÓMO FUNCIONA
```

### Frase interactiva

```text
Mi negocio
[recibe reservas]
[trabaja con un equipo]
[vende productos]
y necesita
[ver qué está pasando].
```

Cada fragmento entre corchetes debe ser un control interactivo.

### Estilo tipográfico

- texto principal: 42–58 px desktop;
- line-height: 1.02–1.08;
- peso alto;
- fragmentos activos con gradiente;
- fragmentos inactivos en gris azulado;
- subrayado o cápsula mínima, nunca botones enormes.

### Opciones del primer selector

```text
recibe reservas
recibe consultas
recibe pedidos
recibe proyectos
```

### Opciones del segundo selector

```text
trabaja con un equipo
trabaja con profesionales
trabaja por sucursales
trabaja por proyectos
```

### Opciones del tercer selector

```text
vende productos
vende servicios
vende experiencias
vende propiedades
```

### Opciones del cuarto selector

```text
ver qué está pasando
ordenar la operación
seguir cada cliente
tomar mejores decisiones
```

### Interacción

Al seleccionar una opción:

- la palabra anterior sale mediante máscara vertical;
- la nueva palabra entra desde abajo;
- una línea animada viaja hacia la plataforma;
- la interfaz derecha reconfigura un componente concreto;
- aparece durante 900 ms una etiqueta como `regla aplicada`.

No abrir un select nativo visualmente pobre en desktop.

Utilizar popover accesible con botones reales.

---

## 10. Selector de ejemplos rápidos

Debajo de la frase incluir cuatro ejemplos:

```text
Café
Óptica
Inmobiliaria
Estudio creativo
```

### Estado inicial

`Café`

### Comportamiento

Al elegir un ejemplo se actualizan los cuatro fragmentos de la oración y la interfaz derecha.

El visitante puede luego modificar cada fragmento individualmente.

### Mapeo

#### Café

```text
recibe pedidos
trabaja con un equipo
vende productos
ordenar la operación
```

#### Óptica

```text
recibe reservas
trabaja con profesionales
vende productos
seguir cada cliente
```

#### Inmobiliaria

```text
recibe consultas
trabaja por sucursales
vende propiedades
ver qué está pasando
```

#### Estudio creativo

```text
recibe proyectos
trabaja por proyectos
vende servicios
tomar mejores decisiones
```

---

## 11. Columna derecha: plataforma viva

### Encabezado interno

```text
02 · LA PLATAFORMA SE ADAPTA
```

### Frame

Crear un frame abstracto de aplicación completamente con CSS.

```css
.adaptive-ui {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border: 1px solid var(--line);
  border-radius: 24px;
  background:
    radial-gradient(circle at var(--mx) var(--my), rgba(64, 224, 208, .08), transparent 32%),
    linear-gradient(145deg, rgba(20, 27, 52, .96), rgba(8, 12, 28, .98));
  box-shadow:
    0 40px 100px rgba(0, 0, 0, .34),
    0 0 90px rgba(90, 80, 255, .10);
  overflow: hidden;
}
```

### Importante

No debe parecer otra captura de dashboard.

Debe parecer un blueprint digital vivo, a mitad de camino entre:

- interfaz;
- diagrama;
- sistema de diseño;
- arquitectura de producto.

---

## 12. Estructura interna del blueprint

### Barra superior

```text
TU PLATAFORMA
Configuración activa
● En vivo
```

### Sidebar abstracta

Mostrar entre cuatro y seis iconos sin textos extensos.

Los iconos cambian según el ejemplo.

### Área principal

Debe contener módulos construidos en CSS que se reordenan con CSS Grid.

Módulos posibles:

- calendario;
- pipeline;
- mapa de mesas;
- pedidos;
- ficha de cliente;
- inventario;
- tareas;
- gráfico;
- bandeja de consultas;
- proyectos;
- propiedades;
- equipo.

No mostrar todos juntos.

Cada ejemplo utiliza entre cuatro y seis módulos.

---

## 13. Blueprint Café

### Navegación

```text
Resumen
Pedidos
Mesas
Stock
Equipo
```

### Componentes CSS

#### Comandera

Tres columnas:

```text
Nuevos
Preparando
Listos
```

Incluir tres pedidos simplificados con estados.

#### Mapa de mesas

Crear formas CSS:

- mesa libre;
- mesa ocupada;
- mesa reservada.

#### Stock

Tres barras:

```text
Café
Pistacho
Leche
```

#### Equipo

Avatares abstractos mediante iniciales, no fotografías.

### Acción demostrada

Un pedido entra, ocupa una mesa, descuenta stock y actualiza el contador.

---

## 14. Blueprint Óptica

### Navegación

```text
Consultas
Turnos
Clientes
Productos
```

### Componentes CSS

#### Agenda

Timeline de turnos de 09:00 a 19:00.

#### Ficha de cliente

```text
Marina López
Último control
Próximo turno
Receta actualizada
```

#### Bandeja

Tres consultas provenientes de:

- WhatsApp;
- website;
- reserva.

#### Productos

Tres siluetas de anteojos creadas con CSS/SVG inline.

### Acción demostrada

Una consulta se convierte en turno y se agrega al historial.

---

## 15. Blueprint Inmobiliaria

### Navegación

```text
Propiedades
Consultas
Visitas
Oportunidades
```

### Componentes CSS

#### Pipeline

```text
Nueva consulta
Contactado
Visita
Negociación
```

#### Propiedades

Tres tarjetas abstractas con:

- ubicación;
- precio;
- estado;
- indicador de consultas.

No usar fotografías. Crear mini arquitecturas con rectángulos y líneas CSS.

#### Agenda de visitas

Tres eventos en una línea temporal.

#### Mapa abstracto

Grid con tres pins generados mediante CSS.

### Acción demostrada

Una consulta se asigna a una propiedad y genera una visita.

---

## 16. Blueprint Estudio creativo

### Navegación

```text
Proyectos
Clientes
Tareas
Equipo
```

### Componentes CSS

#### Kanban

```text
Brief
En proceso
Revisión
Entregado
```

#### Timeline de proyecto

Tres hitos con progreso.

#### Equipo

Capacidad semanal mediante barras.

#### Presupuesto

Estado:

```text
Enviado
Aprobado
Anticipo recibido
```

### Acción demostrada

Un brief crea un proyecto, asigna tareas y actualiza el avance.

---

## 17. Momento tipográfico principal

Entre la frase y el blueprint debe aparecer una transición tipográfica breve:

```text
ENTENDEMOS
      ↓
DISEÑAMOS
      ↓
CONECTAMOS
```

### Tratamiento

- palabras en mayúsculas;
- tipografía bold;
- una sola palabra visible por vez;
- reemplazo mediante clip-path;
- color que evoluciona de violeta a cian;
- duración total máxima: 1,2 segundos;
- activación únicamente cuando cambia el ejemplo.

No reproducir permanentemente.

---

## 18. Sistema de conexiones

Agregar líneas SVG entre la oración y los módulos del blueprint.

### Reglas

- máximo cuatro líneas visibles;
- stroke de 1 px;
- gradiente violeta-cian;
- opacidad baja;
- curvas suaves;
- cada línea termina en un pequeño nodo;
- se dibujan cuando cambia una regla;
- quedan estáticas después de la animación.

No hacer una red compleja tipo mapa neuronal.

---

## 19. Microinteracciones

### Cursor reactivo

El fondo del blueprint puede reaccionar al cursor con variables CSS:

```css
--mx
--my
```

El movimiento debe ser imperceptible y limitarse al halo interior.

No mover tarjetas siguiendo el mouse.

### Componentes

Al cambiar la configuración:

- un componente sale con opacity y desplazamiento de 10 px;
- otro entra desde una máscara;
- CSS Grid reorganiza el espacio;
- los números realizan un count-up breve;
- el estado `En vivo` emite un único pulso.

### Hover

Los módulos internos pueden mostrar una descripción corta:

```text
Pedidos conectados con stock
Turnos vinculados al cliente
Consultas asignadas automáticamente
Tareas actualizadas por proyecto
```

---

## 20. Autoplay

La experiencia puede reproducir los cuatro ejemplos automáticamente:

```text
0–6 s       Café
6–12 s      Óptica
12–18 s     Inmobiliaria
18–24 s     Estudio creativo
24–27 s     Pausa
27 s        Reinicio suave
```

### Reglas

- detener al interactuar;
- reanudar después de 12 segundos de inactividad;
- detener fuera del viewport;
- detener si la pestaña pierde visibilidad;
- no emitir sonido;
- no mover el foco;
- respetar reduced motion;
- mostrar progreso discreto en los cuatro botones.

---

## 21. Cierre del módulo

### Etiqueta

`03 · CONECTAMOS TODO`

### Título

# Primero entendemos cómo trabajás. Después construimos lo que necesitás.

### Descripción

> Empezamos con una primera versión clara y funcional. Cuando tu negocio cambia, la plataforma puede cambiar con él.

### Línea comercial

`Sin plantillas · Sin funciones innecesarias · Sin cambiar tu forma de trabajar`

### CTA principal

`Contanos cómo funciona tu negocio →`

### CTA secundario

`Quiero una plataforma a medida`

### Nota económica

> Empezá por lo esencial y sumá nuevas herramientas cuando realmente las necesites.

No mostrar precios ni planes inventados.

---

## 22. Jerarquía tipográfica

### H2

```css
.adaptive-system__title {
  max-inline-size: 15ch;
  font-size: clamp(52px, 5.2vw, 94px);
  line-height: .95;
  letter-spacing: -.055em;
  text-wrap: balance;
}
```

### Descripción

```css
.adaptive-system__description {
  max-inline-size: 720px;
  font-size: clamp(18px, 1.4vw, 24px);
  line-height: 1.5;
}
```

### Frase configurable

```css
.business-sentence {
  font-size: clamp(38px, 3.4vw, 62px);
  line-height: 1.06;
  letter-spacing: -.045em;
}
```

No utilizar tipografías menores a 12 px dentro del blueprint.

---

## 23. Responsive tablet

Entre 768 y 1100 px:

- encabezado a ancho completo;
- frase configurable arriba;
- blueprint debajo;
- conexiones reducidas a dos;
- frame con proporción 4:3;
- controles rápidos en scroll horizontal;
- no usar dos columnas apretadas;
- mantener textos internos legibles.

---

## 24. Mobile

Mobile requiere una composición específica.

### Orden

1. eyebrow;
2. H2;
3. descripción;
4. selector de ejemplo;
5. oración configurable;
6. blueprint mobile;
7. explicación final;
8. CTA.

### H2 mobile

```css
.adaptive-system__title {
  max-inline-size: 10.5ch;
  font-size: clamp(44px, 12.5vw, 58px);
  line-height: .96;
}
```

### Oración mobile

- entre 30 y 38 px;
- fragmentos en líneas separadas;
- popovers convertidos en bottom sheets;
- cerrar mediante botón visible;
- no depender de hover.

### Blueprint mobile

No reducir la interfaz desktop con `transform: scale()`.

Crear una composición vertical con:

- barra superior;
- dos KPIs;
- un componente principal;
- un componente secundario;
- una acción animada.

Ejemplos:

- Café: comandera + stock.
- Óptica: agenda + cliente.
- Inmobiliaria: pipeline + visita.
- Estudio: kanban + progreso.

### Reglas

- altura máxima visible aproximada: 520–620 px;
- targets mínimos de 44 × 44 px;
- sin overflow horizontal;
- sin cursor simulado;
- autoplay más lento;
- swipe opcional, botones siempre visibles;
- no bloquear el scroll;
- verificar 430, 390, 375 y 320 px.

---

## 25. Light mode

Crear una versión clara diseñada:

- fondo gris azulado muy claro;
- texto azul noche;
- outline `NO TEMPLATE` en azul con baja opacidad;
- blueprint con superficie blanca o azul muy claro;
- componentes con bordes suaves;
- gradientes más contenidos;
- sombras cortas;
- contraste WCAG AA.

No invertir colores automáticamente.

---

## 26. Accesibilidad

- botones reales para ejemplos y fragmentos;
- `aria-pressed` en el ejemplo activo;
- popovers con semántica y foco controlado;
- navegación completa por teclado;
- foco visible;
- no cambiar el foco durante autoplay;
- pausar autoplay al enfocar cualquier control;
- información no dependiente del color;
- reduced motion completo;
- SVG decorativos con `aria-hidden="true"`;
- labels accesibles en iconos;
- contraste WCAG AA.

---

## 27. Rendimiento

- no usar imágenes ni videos;
- evitar canvas y WebGL;
- SVG de conexiones liviano;
- no crear una timeline GSAP por cada componente;
- utilizar una timeline principal por cambio de ejemplo;
- detener animaciones fuera del viewport;
- usar CSS transforms y opacity;
- evitar filtros blur grandes en mobile;
- no provocar layout shift al cambiar blueprint;
- reservar dimensiones estables.

---

## 28. Arquitectura sugerida

```text
AdaptiveBusinessSystem/
  AdaptiveBusinessSystem.tsx
  AdaptiveHeader.tsx
  BusinessSentence.tsx
  SentenceSelector.tsx
  IndustrySwitch.tsx
  TransitionWords.tsx
  AdaptiveBlueprint.tsx
  BlueprintHeader.tsx
  BlueprintConnections.tsx
  blueprints/
    CafeBlueprint.tsx
    OpticsBlueprint.tsx
    RealEstateBlueprint.tsx
    CreativeStudioBlueprint.tsx
  primitives/
    MiniCalendar.tsx
    MiniPipeline.tsx
    MiniKanban.tsx
    MiniOrders.tsx
    MiniInventory.tsx
    MiniClient.tsx
    MiniChart.tsx
    MiniTeam.tsx
  data/
    businessRules.ts
    blueprintConfigs.ts
  hooks/
    useAdaptiveDemo.ts
    useAdaptiveAutoplay.ts
    usePointerGlow.ts
  adaptive-business-system.css
```

### Estado

```ts
type BusinessPreset = 'cafe' | 'optics' | 'real-estate' | 'studio';

type BusinessRules = {
  intake: 'reservations' | 'inquiries' | 'orders' | 'projects';
  workModel: 'team' | 'professionals' | 'branches' | 'projects';
  offering: 'products' | 'services' | 'experiences' | 'properties';
  priority: 'visibility' | 'operations' | 'customers' | 'decisions';
};

type AdaptiveDemoState = {
  preset: BusinessPreset;
  rules: BusinessRules;
  autoplay: boolean;
  userHasControl: boolean;
};
```

Mantener una única fuente de verdad para frase y blueprint.

---

## 29. Criterios de diseño

El módulo no debe parecer:

- una sección de features;
- un catálogo de software;
- otro dashboard estático;
- una presentación corporativa;
- una plantilla SaaS;
- un experimento sin mensaje comercial.

Debe parecer:

- una pieza editorial interactiva;
- un sistema vivo;
- una demostración de pensamiento de producto;
- una experiencia hecha con código;
- una prueba de que Fleximy diseña según reglas reales.

---

## 30. Qué eliminar o evitar

- módulo anterior completo;
- tarjetas de micro soluciones;
- selector de ochenta funciones;
- fotografías;
- capturas PNG;
- nombres de marcas reales;
- escenas 3D;
- partículas;
- órbitas;
- stack cards;
- scroll pinning largo;
- textos diminutos;
- animaciones infinitas;
- cursores falsos;
- componentes que parecen clickeables pero no funcionan;
- cambios únicamente cosméticos entre industrias;
- dashboards encogidos en mobile;
- `transform: scale()` para responsive.

---

## 31. Orden de implementación

### Fase 1 — mensaje y estructura

- eliminar módulo anterior;
- construir encabezado;
- construir composición de dos columnas;
- definir alturas y responsive;
- implementar cierre comercial.

### Fase 2 — sistema de reglas

- crear datos de presets;
- crear oración configurable;
- implementar selectores accesibles;
- sincronizar estado.

### Fase 3 — primitives CSS

- calendario;
- pipeline;
- kanban;
- comandera;
- inventario;
- cliente;
- gráfico;
- equipo.

### Fase 4 — blueprints

- Café;
- Óptica;
- Inmobiliaria;
- Estudio creativo;
- verificar que cambie la arquitectura y no solo el copy.

### Fase 5 — animación

- entrada del módulo;
- transición de palabras;
- cambio de componentes;
- líneas de conexión;
- autoplay;
- pausa y reanudación;
- reduced motion.

### Fase 6 — QA

- accesibilidad;
- dark/light;
- responsive;
- rendimiento;
- build;
- lint;
- controles funcionales;
- ausencia de overflow.

No agregar animación antes de que los cuatro blueprints funcionen correctamente.

---

## 32. Prompt listo para OpenCode

```text
Eliminá por completo el módulo 3 actual de soluciones modulares y reconstruí un nuevo módulo utilizando como única fuente de verdad FLEXIMY-MODULO-3-A-MEDIDA-DE-VERDAD.md.

No modifiques el hero, el módulo 2 ni ninguna otra sección.

El nuevo módulo debe comunicar una diferencia comercial muy concreta:
“No adaptamos tu negocio al software. Adaptamos el software a tu negocio.”

Título principal:
“Tu negocio no entra en una plantilla. Tu plataforma tampoco.”

No uses fotografías, videos, PNG, mockups rasterizados ni renders. Todo el módulo debe construirse con HTML, CSS, SVG inline, iconografía Lucide y animaciones GSAP cuando aporten valor.

Construí una experiencia tipográfica interactiva con dos áreas:

IZQUIERDA:
Una oración configurable sobre cómo funciona el negocio. Cada fragmento debe poder cambiarse mediante un popover accesible.

DERECHA:
Un blueprint de plataforma creado con componentes HTML/CSS. La arquitectura debe cambiar realmente según el negocio.

Implementá cuatro presets:
- Café.
- Óptica.
- Inmobiliaria.
- Estudio creativo.

Cada preset debe modificar:
- oración;
- navegación;
- componentes;
- estructura de grid;
- datos;
- acciones;
- microanimación.

No cambies solamente colores y textos.

Componentes CSS requeridos:
- comandera;
- mapa de mesas;
- inventario;
- agenda;
- ficha de cliente;
- bandeja;
- pipeline;
- propiedades abstractas;
- kanban;
- timeline;
- equipo;
- gráfico.

El módulo debe tener un fondo tipográfico gigante “NO TEMPLATE”, líneas SVG que conecten reglas con componentes y la transición breve ENTENDEMOS → DISEÑAMOS → CONECTAMOS.

El autoplay cambia de preset cada 6 segundos, se detiene al interactuar, se pausa fuera del viewport y respeta prefers-reduced-motion.

No uses scroll hijacking, pinning largo, stack cards, partículas, órbitas, cursores falsos ni animaciones permanentes.

Mobile necesita blueprints específicos y verticales. No reduzcas la interfaz desktop con transform: scale(). Verificá 430, 390, 375 y 320 px. No debe existir overflow horizontal.

Todos los controles visibles deben funcionar y ser accesibles por teclado.

Antes de finalizar:
1. ejecutá build y lint;
2. probá los cuatro presets;
3. comprobá todos los selectores de la oración;
4. verificá que frase y blueprint compartan estado;
5. verificá autoplay, pausa y reduced motion;
6. revisá dark y light mode;
7. revisá 1920, 1440, 1366, 1024, 768, 430, 390, 375 y 320 px;
8. corregí overflow y saltos de layout;
9. confirmá que no se cargó ninguna imagen;
10. entregá un resumen de archivos modificados.
```

---

## 33. Criterios de aceptación

El módulo estará terminado solamente si:

- reemplazó completamente al catálogo anterior;
- se entiende la diferencia entre plantilla y plataforma a medida;
- el mensaje principal se comprende en menos de cinco segundos;
- no utiliza ninguna imagen;
- toda la experiencia está construida con código;
- la frase configurable funciona;
- los cuatro presets funcionan;
- cada preset cambia la arquitectura real;
- los blueprints son claramente diferentes;
- los controles visibles responden;
- el autoplay no interrumpe al usuario;
- las animaciones terminan y quedan en reposo;
- el fondo tipográfico no perjudica la lectura;
- dark y light mode funcionan;
- reduced motion funciona;
- mobile tiene componentes específicos;
- no existe overflow horizontal;
- no se modificaron otras secciones;
- build y lint terminan correctamente.

---

## Resultado esperado

El módulo debe hacer que el visitante piense:

> “Fleximy primero entiende mi negocio y después diseña el sistema. No me va a entregar una plantilla maquillada.”

La secuencia comercial completa queda:

```text
HERO
Tu negocio merece más que una página web.

MÓDULO 2
Website + clientes + operación + números funcionando juntos.

MÓDULO 3
La plataforma cambia según la forma real de trabajar de cada negocio.
```

El siguiente módulo recomendado debería explicar el proceso de implementación en tres pasos o presentar el modelo comercial: diagnóstico, primera versión y evolución.
