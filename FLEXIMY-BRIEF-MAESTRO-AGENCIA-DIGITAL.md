# FLEXIMY — BRIEF MAESTRO PARA EL REWORK TOTAL

> Documento único y definitivo para diseñar y desarrollar el sitio público de Fleximy.
>
> Este archivo reemplaza todas las instrucciones visuales anteriores. Debe leerse completo antes de modificar el proyecto.

---

## 1. Proyecto

- Repositorio: `https://github.com/theivamm/fleximy2025.git`
- Sitio publicado: `https://fleximy.netlify.app/`
- Idioma principal: español.
- Mercado inicial: empresas, PyMEs y emprendimientos de habla hispana.
- Objetivo principal: generar contactos calificados y demostrar la capacidad de Fleximy para crear productos digitales.

Podés reemplazar todos los componentes, estilos, layouts y páginas públicas que sea necesario. No preguntes por ramas, commits, backups ni estrategia de Git. Trabajá directamente sobre el proyecto actual.

---

## 2. Decisión estratégica

Fleximy debe presentarse como una **agencia y product studio especializada en apps, diseño y productos digitales**.

Fleximy crea:

- Aplicaciones web.
- Plataformas SaaS.
- Sitios web comerciales.
- Ecommerce.
- Dashboards.
- Paneles administrativos.
- Sistemas de gestión.
- Portales de clientes.
- Automatizaciones.
- Diseño UI/UX.
- Prototipos.
- Productos digitales a medida.

Fleximy no vende solamente páginas web. Diseña y desarrolla herramientas digitales que ayudan a vender, organizar, automatizar procesos, administrar clientes, coordinar equipos y transformar operaciones manuales en sistemas claros.

La web debe ser simultáneamente:

1. Presentación comercial.
2. Portfolio interactivo.
3. Demostración técnica.
4. Muestra de diseño UI/UX.
5. Generadora de contactos.
6. Prueba de capacidad.

La reacción buscada es:

> “Si Fleximy puede hacer esto con su propia web, puede construir un producto digital increíble para mi negocio.”

---

## 3. Antecedentes y errores que no deben repetirse

Los intentos anteriores fallaron por diferentes motivos:

### Dirección clara demasiado plana

- Exceso de blanco y fondos lisos.
- Alternancia mecánica entre secciones claras y oscuras.
- Patrón repetido de texto a la izquierda e interfaz pequeña a la derecha.
- Interfaces demasiado chicas para demostrar el producto.
- Grandes espacios vacíos sin intención.
- Aspecto de landing SaaS genérica.

### Rework Material superficial

- Se cambiaron colores, radios, botones y sombras.
- Se conservó prácticamente el mismo layout.
- El resultado fue un repintado, no un rediseño.

### Rework oscuro fallido

- Fondo casi negro sin profundidad.
- Bordes blancos alrededor de todos los elementos.
- Uso excesivo de tipografía monoespaciada.
- Apariencia de terminal, consola o wireframe técnico.
- Textos pequeños.
- Dashboards semejantes a herramientas internas de desarrollo.
- Ausencia real de gradientes, iluminación y dirección artística.
- Mucho espacio muerto.
- Falta de jerarquía comercial.

### Stack cards

- Las tarjetas sticky o apiladas rompieron el scroll y la composición.
- Algunos componentes desaparecían, se superponían o quedaban debajo del header.
- No deben volver a utilizarse.

### Selectores confusos

- Los controles se ubicaron lejos de la interfaz que modificaban.
- Al elegir otra industria cambiaba una etiqueta, pero permanecían datos y CTA de Gastronomía.
- Toda interacción debe producir un cambio completo, visible y coherente.

La implementación nueva debe descartar completamente estos patrones.

---

## 4. Objetivo creativo

Crear el sitio de una agencia especializada en apps y productos digitales cuya propia web demuestre su potencial.

Debe sentirse:

- Moderna.
- Creativa.
- Tecnológica.
- Premium.
- Colorida.
- Elegante.
- Experimental.
- Profesional.
- Dinámica.
- Humana.
- Cercana al estándar visual de Awwwards.
- Imposible de confundir con una plantilla.

Concepto central:

## “Diseñamos sistemas que se sienten vivos”

La identidad debe construirse mediante:

- Interfaces en movimiento.
- Datos que cambian de estado.
- Ventanas conectadas.
- Capas y profundidad.
- Gradientes.
- Iluminación ambiental.
- Dashboards.
- Cursores simulados dentro de las demos.
- Notificaciones.
- Gráficos.
- Microinteracciones.
- Tipografía cinética.
- Fondos reactivos.

La web no debe limitarse a decir que Fleximy crea aplicaciones: debe demostrarlo en cada sección.

---

## 5. Prohibiciones absolutas

No utilizar:

- Stack cards.
- Sticky cards.
- Pinning prolongado.
- Scroll-jacking.
- Scroll horizontal forzado.
- Estética terminal, hacker o consola.
- Negro puro como único fondo.
- Bordes blancos generalizados.
- Líneas punteadas como recurso dominante.
- Tipografía monoespaciada predominante.
- Tipografía comercial diminuta.
- Wireframes como interfaces finales.
- Screenshots planos de dashboards.
- Material UI como atajo visual.
- Partículas genéricas.
- Orbs típicos de templates.
- Neón excesivo.
- Cyberpunk.
- Glassmorphism aplicado indiscriminadamente.
- Gradientes azul-violeta aplicados a todo.
- Modelos 3D pesados sin función.
- Videos pesados como fondo.
- Cursores personalizados molestos.
- Secciones resueltas siempre con cards idénticas.
- `fade-up` aplicado a cada elemento.
- Métricas inventadas.
- Clientes o testimonios ficticios.
- Logos de marcas inexistentes.
- Teléfonos de ejemplo en producción.
- Estética de criptomoneda.
- Apariencia de web generada por IA.

---

## 6. Dark y light mode

El sitio debe incluir dos temas diseñados realmente:

- Dark mode.
- Light mode.

La primera visita debe respetar `prefers-color-scheme`. La elección manual debe guardarse en `localStorage` y mantenerse durante la navegación.

El selector debe:

- Ser visible en el header.
- Ser accesible por teclado.
- Tener nombre accesible.
- Comunicar su estado.
- Cambiar todas las variables semánticas.
- Evitar el flash del tema incorrecto.
- Actualizar `color-scheme` y `meta[name="theme-color"]`.

No invertir colores automáticamente. Ambos temas deben estar diseñados.

### Tokens dark

```css
[data-theme="dark"] {
  color-scheme: dark;

  --bg: #090b17;
  --bg-soft: #101326;
  --surface: #151a30;
  --surface-elevated: #1d2340;
  --surface-highlight: #252d50;

  --text: #f8f8ff;
  --text-secondary: #b5bdd4;
  --text-muted: #7d87a3;

  --primary: #7c6cff;
  --secondary: #20d5c7;
  --accent: #ff6fae;
  --warm: #ffb45e;
  --blue: #4d8dff;

  --success: #42d392;
  --warning: #ffb45e;
  --error: #ff747f;

  --outline: rgba(220, 225, 255, 0.14);
  --outline-strong: rgba(220, 225, 255, 0.25);

  --shadow-sm: 0 8px 24px rgba(0, 0, 0, 0.18);
  --shadow-md: 0 20px 60px rgba(0, 0, 0, 0.30);
  --shadow-lg: 0 35px 100px rgba(0, 0, 0, 0.44);
}
```

### Tokens light

```css
[data-theme="light"] {
  color-scheme: light;

  --bg: #f7f7fc;
  --bg-soft: #eef0f8;
  --surface: #ffffff;
  --surface-elevated: #f5f6fb;
  --surface-highlight: #e8ebf5;

  --text: #16182a;
  --text-secondary: #535a70;
  --text-muted: #7d8497;

  --primary: #6555e8;
  --secondary: #009f95;
  --accent: #d94687;
  --warm: #d97706;
  --blue: #3175dc;

  --success: #16855b;
  --warning: #a86000;
  --error: #ba1a1a;

  --outline: rgba(35, 40, 74, 0.13);
  --outline-strong: rgba(35, 40, 74, 0.24);

  --shadow-sm: 0 8px 24px rgba(39, 47, 91, 0.08);
  --shadow-md: 0 20px 60px rgba(39, 47, 91, 0.13);
  --shadow-lg: 0 35px 100px rgba(39, 47, 91, 0.18);
}
```

---

## 7. Gradientes y atmósferas

La web debe ser colorida sin ser estridente. Utilizar violeta, azul, cian, coral, rosa y naranja de forma controlada.

### Gradiente de marca

```css
--gradient-primary:
  linear-gradient(
    120deg,
    #7c6cff 0%,
    #4d8dff 32%,
    #20d5c7 65%,
    #ff6fae 100%
  );
```

### Gradiente cálido

```css
--gradient-warm:
  linear-gradient(
    135deg,
    #ff6fae 0%,
    #ff8d6c 48%,
    #ffb45e 100%
  );
```

### Fondo dark

```css
--background-dark:
  radial-gradient(
    circle at 15% 10%,
    rgba(124, 108, 255, 0.22),
    transparent 30%
  ),
  radial-gradient(
    circle at 85% 20%,
    rgba(32, 213, 199, 0.14),
    transparent 28%
  ),
  radial-gradient(
    circle at 55% 75%,
    rgba(255, 111, 174, 0.10),
    transparent 30%
  ),
  linear-gradient(
    180deg,
    #090b17 0%,
    #101326 48%,
    #090b17 100%
  );
```

### Fondo light

```css
--background-light:
  radial-gradient(
    circle at 15% 10%,
    rgba(101, 85, 232, 0.14),
    transparent 30%
  ),
  radial-gradient(
    circle at 85% 20%,
    rgba(0, 159, 149, 0.10),
    transparent 28%
  ),
  radial-gradient(
    circle at 55% 75%,
    rgba(217, 70, 135, 0.07),
    transparent 30%
  ),
  linear-gradient(180deg, #fafaff 0%, #f0f2fa 100%);
```

Los gradientes pueden utilizarse en fondos, iluminación, tipografía destacada, líneas de datos, gráficos, estados activos, bordes protagonistas y CTA. No deben aplicarse a todos los elementos.

---

## 8. Fondos reactivos

Crear fondos reactivos elegantes mediante variables CSS y JavaScript mínimo.

El puntero puede modificar suavemente:

- La posición de una luz radial.
- La intensidad de un gradiente.
- El reflejo de una interfaz.
- La profundidad de alguna capa.
- La orientación de un borde iluminado.

Variables sugeridas:

```css
--mouse-x: 50%;
--mouse-y: 50%;
--rotate-x: 0deg;
--rotate-y: 0deg;
```

Implementar con `pointermove`, `requestAnimationFrame`, pseudo-elementos, `transform` y `opacity`. El movimiento debe ser amortiguado y de baja intensidad.

No crear efecto linterna, lag o movimientos mareantes. Desactivar en touch y con `prefers-reduced-motion`.

---

## 9. Tipografía y motion textual

Familias recomendadas:

- Display: `Space Grotesk`, `Manrope` o `Satoshi`.
- Texto: `Inter`.
- Mono: `Geist Mono` o `IBM Plex Mono`, solamente para datos y estados pequeños.

No utilizar monoespaciada en navegación, párrafos, CTA o titulares comerciales.

### Escala

```css
--hero-title: clamp(4rem, 8vw, 9rem);
--display: clamp(3rem, 6vw, 6.5rem);
--h2: clamp(2.4rem, 4.5vw, 4.8rem);
--h3: clamp(1.4rem, 2.4vw, 2.2rem);
--lead: clamp(1.15rem, 1.7vw, 1.5rem);
--body: 1rem;
--small: 0.875rem;
```

Utilizar máscaras, palabras con gradientes, cambios de peso, marquees, texto cinético y grandes palabras de fondo.

### Texto cambiante

Opciones:

- Apps que venden.
- Apps que organizan.
- Apps que conectan.
- Apps que automatizan.
- Apps que hacen crecer.

Reglas:

- Cambiar cada 2,8–3,5 segundos.
- Usar máscara vertical, blur leve y desplazamiento.
- Mantener ancho y altura estables.
- No generar layout shift.
- No utilizar máquina de escribir.
- Mantener una frase estable para lectores de pantalla.
- Simplificar o detener con reduced motion.

---

## 10. Animaciones

Priorizar CSS para:

- Textos cambiantes.
- Gradientes.
- Bordes.
- Botones.
- Gráficos.
- Notificaciones.
- Estados.
- Barras de progreso.
- Marquees.
- Tabs.
- Toggle de tema.
- Inputs.
- Calendarios.
- Kanban.
- Tablas.
- Hover y focus.

GSAP puede utilizarse únicamente cuando aporte coordinación real en el hero, máscaras complejas o revelados puntuales al scroll.

No usar GSAP para controlar todo el sitio, bloquear el scroll, apilar tarjetas o modificar continuamente la altura del documento.

Cada animación debe explicar algo, dar feedback o mejorar la experiencia. No animar por decorar.

---

## 11. Interfaces creadas con HTML y CSS

La web debe demostrar capacidad mediante interfaces reales, no screenshots.

Componentes posibles:

- Ventana de navegador.
- Aplicación mobile.
- Dashboard.
- Sidebar.
- Barra superior.
- Tabla.
- Kanban.
- Calendario.
- Agenda.
- Gráficos CSS.
- Feed de actividad.
- Formulario.
- Buscador.
- Modal.
- Notificación.
- Filtros.
- Tabs.
- Chips.
- Avatares abstractos.
- Upload.
- Chat.
- Tarjetas de producto.
- Loader.
- Skeleton.

Cada muestra debe ser legible, coherente, animada y parecer un producto real. Los datos ficticios deben identificarse como demo cuando puedan confundirse con resultados reales.

---

## 12. Header

Incluir:

- Logo Fleximy.
- Servicios.
- Demos o proyectos.
- Cómo trabajamos.
- Soluciones.
- Nosotros.
- Contacto.
- Theme toggle.
- CTA `Contanos tu idea`.

Estado inicial:

- Integrado al hero.
- Fondo transparente.
- Buena legibilidad.

Al hacer scroll:

- Superficie semitransparente.
- Blur moderado.
- Borde sutil.
- Menor altura.
- Transición elegante.
- Nunca debe tapar contenido.

Mobile:

- Menú amplio.
- Theme toggle.
- CTA visible.
- Sin textos diminutos.
- Escape y control de foco.

---

## 13. Home — arquitectura completa

### 13.1 Hero

Kicker:

`DISEÑO + TECNOLOGÍA + PRODUCTO`

Titular:

`Creamos aplicaciones que mueven negocios.`

Texto cambiante:

- Apps que venden.
- Apps que organizan.
- Apps que conectan.
- Apps que automatizan.
- Apps que hacen crecer.

Descripción:

`Diseñamos y desarrollamos sitios, aplicaciones, dashboards y sistemas digitales adaptados a cada negocio.`

CTA principal:

`Contanos tu idea`

CTA secundario:

`Explorar lo que hacemos`

Microcopy:

`Diseño UI/UX · desarrollo web · productos digitales`

Escena visual:

- Dashboard desktop protagonista.
- Aplicación mobile superpuesta.
- Notificación.
- Gráfico.
- Kanban.
- Cursor simulado.
- Cambio de estado.
- Fondo reactivo.
- Luces de color.
- Profundidad.

No usar una card centrada ni espacios muertos. La propuesta, CTA y escena deben comprenderse en el primer viewport.

### 13.2 Marquee de capacidades

Texto:

`APPS · WEBS · DASHBOARDS · ECOMMERCE · AUTOMATIZACIÓN · UI/UX · PLATAFORMAS · PORTALES · SISTEMAS · PROTOTIPOS`

Movimiento CSS continuo, pausa en hover y fallback estático con reduced motion.

### 13.3 Manifiesto

Titular:

`No hacemos páginas para llenar espacio. Diseñamos productos para resolver problemas.`

Texto:

`Combinamos estrategia, diseño y desarrollo para transformar procesos, ideas y oportunidades en experiencias digitales concretas.`

Resolver como composición tipográfica amplia, no como card.

### 13.4 Qué hacemos

Capacidades:

1. Aplicaciones y plataformas.
2. Sitios web que convierten.
3. Dashboards y sistemas de gestión.
4. Diseño UI/UX.

Cada capacidad debe tener una demostración CSS diferente. No utilizar cuatro cards idénticas.

### 13.5 Laboratorio Fleximy

Crear una sección interactiva capaz de alternar entre:

- Ecommerce.
- Dashboard de ventas.
- Agenda y turnos.
- Gestión de proyectos.
- Portal inmobiliario.
- Plataforma educativa.

Al elegir una muestra deben cambiar realmente layout, colores, datos, componentes, estados y acciones. Los controles deben estar junto a la escena que modifican.

### 13.6 Dashboard playground

Crear un gran dashboard CSS con:

- Sidebar.
- Navegación superior.
- Buscador.
- KPIs claramente marcados como demo.
- Gráfico CSS.
- Tabla.
- Feed.
- Kanban.
- Filtros.
- Notificaciones.
- Avatares.
- Actividad.
- Selector de vista.

Vistas:

- Ventas.
- Operaciones.
- Clientes.
- Proyectos.

### 13.7 Proceso

Titular:

`De una idea a un producto que funciona.`

Etapas:

1. Entendemos.
2. Diseñamos.
3. Construimos.
4. Probamos.
5. Lanzamos.
6. Mejoramos.

Representar mediante una línea viva o diagrama CSS. Cada etapa puede activar una transformación pequeña de una interfaz. No usar seis cards iguales.

### 13.8 Industrias

- Gastronomía.
- Servicios y Turnos.
- Gestión para PyMEs.
- Comercio y Retail.
- Inmobiliarias.
- Educación.
- Talleres y Reparaciones.

Presentarlas como ejemplos de aplicación mediante grilla editorial o carrusel estable, nunca stack cards. Cada una debe mostrar problema, producto posible, vista CSS, funcionalidades y CTA.

### 13.9 Todo puede convertirse en una app

Transformaciones:

- Excel → dashboard.
- WhatsApp → seguimiento.
- Agenda manual → reservas online.
- Formularios → portal de clientes.
- Notas → gestión de tareas.
- Catálogo PDF → ecommerce.
- Reportes manuales → panel.

Construir animaciones CSS donde los elementos iniciales se transformen visualmente en interfaces.

### 13.10 Demos o proyectos

Cada demo debe incluir:

- Nombre.
- Industria.
- Problema.
- Solución.
- Capacidades.
- Vista CSS.
- CTA.

Si no existen clientes verificables, presentarlas como concepto, laboratorio, demo o prototipo; nunca como caso real.

### 13.11 Por qué Fleximy

Comunicar:

- Diseño y desarrollo integrados.
- Producto adaptado.
- Acompañamiento.
- Escalabilidad.
- Soporte.
- Iteración.
- Visión comercial.
- Atención humana.

Usar una composición modular, no ocho cards idénticas.

### 13.12 CTA final

Titular:

`¿Tenés una idea? Hagamos que funcione.`

Descripción:

`Contanos qué querés crear, mejorar o automatizar. Te ayudamos a convertirlo en un producto digital concreto.`

CTA principal:

`Contanos tu idea`

CTA secundario:

`Hablar por WhatsApp`

Integrar fondo reactivo, gradiente, interfaz parcial y transición directa al footer.

---

## 14. Footer

Crear un footer memorable, no un sitemap administrativo.

Titular:

`Diseñamos lo que tu negocio necesita para avanzar.`

CTA:

`Empezar un proyecto`

Navegación:

- Servicios.
- Soluciones.
- Demos.
- Proceso.
- Nosotros.
- Recursos.
- Contacto.
- Privacidad.
- Términos.

Elementos visuales:

- Fondo profundo.
- Gradiente animado sutil.
- Palabra gigante `FLEXIMY`.
- Pequeña interfaz CSS.
- Indicador `Disponible para nuevos proyectos`.
- Theme toggle.
- Logo.
- Copyright.

No utilizar tipografía diminuta. El footer debe sentirse como el último momento visual del sitio.

---

## 15. Páginas necesarias

- Inicio.
- Servicios.
- Aplicaciones y plataformas.
- Sitios web.
- Dashboards y gestión.
- Diseño UI/UX.
- Soluciones.
- Gastronomía.
- Servicios y Turnos.
- Gestión para PyMEs.
- Comercio y Retail.
- Inmobiliarias.
- Educación.
- Talleres y Reparaciones.
- Demos.
- Cómo trabajamos.
- Nosotros.
- Recursos.
- Precios o modalidad de trabajo.
- Contacto.
- Preguntas frecuentes.
- Seguridad.
- Privacidad.
- Términos.
- Gracias.
- Página 404.

Cada página debe compartir el sistema, pero tener composición, hero e interfaz propios. No resolver todo con una plantilla única.

---

## 16. Componentes reutilizables sugeridos

- `ThemeToggle`
- `ReactiveBackground`
- `GradientText`
- `AnimatedWords`
- `KineticHeadline`
- `Marquee`
- `BrowserWindow`
- `MobileAppMockup`
- `DashboardShell`
- `StatusChip`
- `ActivityFeed`
- `CssChart`
- `CssCalendar`
- `CssKanban`
- `CssTable`
- `NotificationToast`
- `InterfaceLab`
- `IndustryPreview`
- `TransformationDemo`
- `SectionIntro`
- `PrimaryCTA`
- `SiteFooter`

Separar contenido, presentación y lógica. No crear componentes gigantes que contengan una página completa.

---

## 17. Responsive

Validar explícitamente:

- 1440 px.
- 1280 px.
- 1024 px.
- 768 px.
- 430 px.
- 390 px.
- 360 px.

Mobile debe:

- Tener composición propia.
- Mantener interfaces legibles.
- Reducir efectos de puntero.
- Simplificar animaciones.
- Evitar sticky y stack.
- No depender de hover.
- Mantener áreas táctiles mínimas de 44 px.
- Evitar overflow horizontal.
- Reorganizar dashboards.
- Mantener theme toggle y CTA.

---

## 18. Accesibilidad

Cumplir:

- WCAG AA.
- Navegación por teclado.
- Focus visible.
- Jerarquía semántica.
- Áreas táctiles adecuadas.
- Estados que no dependan solamente del color.
- Labels accesibles.
- `aria-expanded`, `aria-controls` y `aria-pressed` cuando corresponda.
- Contraste en dark y light.
- Alternativa estática para textos cambiantes.
- Interfaces comprensibles sin animación.
- `prefers-reduced-motion`.

Con reduced motion:

- Detener marquees.
- Mostrar el estado final de los textos.
- Desactivar fondos reactivos.
- Eliminar parallax.
- Mantener todo el contenido visible.

---

## 19. Rendimiento

- Evitar WebGL si no es indispensable.
- No utilizar videos pesados como fondo.
- No agregar librerías visuales innecesarias.
- Mantener interfaces en HTML y CSS.
- Animar preferentemente `transform` y `opacity`.
- Usar `requestAnimationFrame` para el puntero.
- Limpiar listeners.
- Pausar animaciones fuera del viewport.
- Mantener lazy loading por ruta.
- Evitar layout shift.
- Controlar el bundle.
- Mantener scroll natural y estable.

---

## 20. Contenido y honestidad comercial

No publicar:

- Métricas inventadas.
- Testimonios falsos.
- Clientes ficticios.
- Logos inexistentes.
- Precios no confirmados.
- Promesas absolutas.
- Teléfonos de prueba.

Todo dashboard con información inventada debe identificarse discretamente como `Demo` o `Datos ilustrativos`.

La información debe hablar en español claro, comercial y humano. Evitar jerga técnica innecesaria y textos con tono generado por IA.

---

## 21. Orden de implementación

1. Auditar y retirar el sistema visual público anterior.
2. Crear tokens dark/light.
3. Implementar theme switch sin flash.
4. Definir tipografía.
5. Crear gradientes.
6. Crear fondos reactivos.
7. Crear Header.
8. Construir Hero.
9. Construir marquee y manifiesto.
10. Construir capacidades.
11. Construir laboratorio de interfaces.
12. Construir dashboard playground.
13. Construir proceso.
14. Construir industrias.
15. Construir transformaciones.
16. Construir demos.
17. Construir `Por qué Fleximy`.
18. Construir CTA final.
19. Crear Footer.
20. Adaptar páginas internas.
21. Realizar responsive.
22. Ejecutar QA visual y técnico.

No detenerse después de cambiar colores. El objetivo es una reconstrucción real.

---

## 22. Validación obligatoria

Antes de considerar terminado el trabajo:

- Recorrer todas las páginas.
- Probar dark mode.
- Probar light mode.
- Probar persistencia.
- Verificar ausencia de flash.
- Probar fondos reactivos.
- Probar textos cambiantes.
- Probar todas las interfaces.
- Probar navegación.
- Probar mobile.
- Probar teclado.
- Probar reduced motion.
- Revisar consola.
- Ejecutar build.
- Ejecutar lint.
- Revisar bundle.
- Revisar enlaces.
- Revisar CTA y WhatsApp.
- Revisar datos de ejemplo.
- Revisar overflow.
- Revisar contraste.
- Confirmar que no queden componentes visuales de los reworks rechazados.

---

## 23. Criterios de rechazo

El resultado debe rechazarse si:

- Solamente cambia colores.
- Conserva el layout anterior.
- Parece una terminal.
- Usa fondo negro plano.
- Utiliza stack cards.
- Se rompe el scroll.
- Todo está dentro de cards.
- Todo utiliza glow o glassmorphism.
- Las interfaces parecen wireframes.
- Dark y light son simples inversiones.
- Los textos cambiantes generan saltos.
- Las demos utilizan screenshots.
- Las interfaces no cambian realmente.
- Mobile es una reducción defectuosa de desktop.
- Los efectos perjudican legibilidad o rendimiento.
- Parece una plantilla SaaS o una web de IA.

---

## 24. Criterios de éxito

El resultado se considera aprobado si:

- Fleximy parece una agencia especializada en apps y productos digitales.
- La propia web demuestra su capacidad.
- Dark y light están diseñados correctamente.
- Los colores son atractivos y controlados.
- Los gradientes aportan profundidad.
- Los fondos reaccionan con sutileza.
- La tipografía tiene movimiento sin perder legibilidad.
- Las interfaces CSS parecen productos reales.
- Existen microinteracciones significativas.
- Cada sección tiene una composición diferente.
- No parece una terminal ni una plantilla.
- No utiliza stack cards.
- El scroll es natural y estable.
- Mobile tiene una experiencia propia.
- La página genera ganas de contactar a Fleximy.

---

## 25. Instrucción final para la IA

Descartá completamente la estética pública actual.

No construyas una web negra y monocromática.

No construyas una terminal.

No construyas una colección de cards.

Construí la web de una agencia que diseña aplicaciones, sitios, dashboards y productos digitales.

La propia página debe ser el mejor ejemplo de lo que Fleximy sabe crear.

Utilizá colores atractivos, gradientes, fondos reactivos, tipografía cinética, dark/light mode, interfaces construidas con HTML y CSS y microinteracciones potentes.

El diseño debe impactar, explicar y convertir.

