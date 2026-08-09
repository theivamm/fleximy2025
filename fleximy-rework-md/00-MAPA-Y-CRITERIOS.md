# Fleximy — Arquitectura y criterios maestros del website

## Objetivo del website

Convertir a Fleximy en una propuesta comercial clara, confiable y escalable: una plataforma que combina el sitio público de una PyME con las herramientas internas necesarias para operar mejor.

La web debe lograr cinco cosas:

1. Explicar qué es Fleximy en menos de 10 segundos.
2. Permitir que cada rubro encuentre una solución relevante.
3. Demostrar el producto antes de pedir una reunión.
4. Reducir dudas sobre alcance, precio, implementación y soporte.
5. Convertir visitas en diagnósticos comerciales calificados.

## Cómo usar este paquete con OpenCode

OpenCode debe comenzar por los documentos de implementación y después consultar el archivo específico de cada página.

Orden obligatorio de lectura:

1. `23-PROMPT-RECTOR-OPENCODE.md`
2. `00-MAPA-Y-CRITERIOS.md`
3. `24-AUDITORIA-TECNICA-REPOSITORIO.md`
4. `25-ARQUITECTURA-TECNICA-Y-DISENO.md`
5. `26-PLAN-DE-IMPLEMENTACION.md`
6. Archivo Markdown de la página que se va a desarrollar.
7. `27-CHECKLIST-QA-Y-ENTREGA.md`
8. `28-DECISIONES-PENDIENTES.md`

No se debe implementar todo el website en una sola ejecución. Inicio funciona como página patrón: primero se desarrolla, prueba y valida su sistema visual; luego se extiende al resto del sitio.

## Definición principal de marca

**Fleximy es la plataforma digital para PyMEs que integra un sitio web profesional con un panel de gestión adaptado a la operación de cada negocio.**

No se debe presentar como una agencia que “hace cualquier desarrollo”, ni como un ERP rígido. La categoría propia es: **sitio web operativo para PyMEs**.

## Mensaje central

**Tu web también puede operar tu negocio.**

Bajada institucional:

> Unificá tu presencia online, consultas, turnos, pedidos, clientes y tareas en una plataforma simple, adaptada a tu empresa y acompañada por soporte real.

## Audiencia prioritaria

- Dueños y responsables de PyMEs argentinas.
- Empresas que operan con WhatsApp, Excel y herramientas aisladas.
- Negocios que necesitan profesionalizar su presencia digital sin implementar un sistema empresarial complejo.
- Equipos pequeños que valoran simplicidad, rapidez y soporte cercano.

## Mapa final de páginas

### Navegación principal

- Inicio
- Soluciones
  - Gastronomía
  - Servicios y Turnos
  - Gestión para PyMEs
  - Comercio y Retail
  - Inmobiliarias
  - Educación
  - Talleres y Reparaciones
- Demos
- Cómo funciona
- Precios
- Recursos
- Nosotros
- Contacto

### Navegación secundaria y footer

- Preguntas frecuentes
- Seguridad y continuidad
- Política de privacidad
- Términos del servicio
- WhatsApp

## Conversión principal

CTA primario global: **Solicitar diagnóstico gratuito**.

CTA secundario: **Probar una demo**.

CTA contextual por solución: **Ver cómo funcionaría en mi negocio**.

WhatsApp debe abrir con mensaje precargado y origen identificable. Ejemplo:

> Hola, llegué desde la solución de Gastronomía de Fleximy. Quiero conocer cómo se adaptaría a mi negocio.

## Reglas de contenido

- Hablar de problemas operativos concretos, no de tecnología abstracta.
- No prometer resultados estadísticos sin evidencia.
- No afirmar SLA, cifrado específico, backups o plazos contractuales sin validación técnica y legal.
- Diferenciar módulos incluidos, configuración, integraciones y desarrollos adicionales.
- Usar ejemplos, no presentarlos como clientes reales.
- Mantener español rioplatense consistente: “vos”, “tu negocio”, “podés”.
- Evitar anglicismos innecesarios como “otro level”, “zero friction” o “all-in-one” si no agregan precisión.

## SEO global

- Un title y description únicos por página.
- Canonical absoluto.
- Open Graph y Twitter Cards.
- Schema `Organization`, `SoftwareApplication`, `Service`, `FAQPage` y `BreadcrumbList` según corresponda.
- URLs breves y descriptivas.
- Una sola etiqueta H1 por página.
- Enlaces internos entre soluciones, demos, precios y contacto.
- Página 404 con acceso a soluciones y contacto.

## Elementos globales obligatorios

- Header fijo y simple.
- Menú Soluciones desplegable.
- CTA visible en desktop y mobile.
- Footer con datos de empresa, navegación, legales y contacto.
- Formulario conectado a CRM o base de leads.
- Página de gracias luego del envío.
- Eventos de analítica para formularios, WhatsApp, demos, precios y agenda.
- Consentimiento de privacidad.

## Información pendiente antes de publicación

- Número real de WhatsApp.
- Razón social, CUIT y domicilio comercial.
- Dominio definitivo.
- Alcance contractual del plan.
- Política de actualización de precio.
- Tecnología e infraestructura realmente implementadas.
- Integraciones disponibles y cuáles tienen costo adicional.
- Plazo real de implementación por complejidad.
- Casos reales, testimonios y logotipos autorizados.

## Dirección creativa obligatoria

### Concepto rector

**Minimalismo operativo.** La web debe sentirse como un producto digital diseñado por un estudio de primer nivel: silenciosa cuando debe informar y sorprendente cuando demuestra el sistema. No debe parecer una plantilla SaaS, una landing armada con bloques genéricos ni una colección de recursos generados por IA.

La personalidad visual surge de interfaces propias, tipografía expresiva, ritmo editorial, precisión en los espacios y movimiento con intención. La potencia no debe depender de saturar la pantalla.

### Principios estéticos

- Usar una retícula consistente, mucho aire y contrastes fuertes.
- Combinar grandes titulares editoriales con detalles técnicos pequeños.
- Mantener una paleta corta: fondo casi negro o blanco cálido, texto de alto contraste y uno o dos acentos propios de Fleximy.
- Reservar gradientes para profundidad, iluminación o estados; nunca como decoración genérica.
- Evitar blobs 3D, robots, cerebros, manos holográficas, personas artificiales, íconos aleatorios y renders tecnológicos sin función.
- Evitar el abuso de glassmorphism. Si se usa transparencia, debe responder a una jerarquía real de interfaz.
- No utilizar emojis como sistema de iconografía. Crear íconos SVG lineales propios o utilizar una familia coherente.
- No repetir la estructura “título + tres cards” en todas las secciones.
- Evitar métricas, logos, testimonios o dashboards que parezcan reales si son ejemplos.
- Toda pantalla simulada debe indicar “Demo” o “Datos ilustrativos” cuando corresponda.

### Tipografía

- Seleccionar una sans variable contemporánea para interfaz y lectura: Inter, Geist, Manrope o equivalente con licencia válida.
- Combinarla con una tipografía display de personalidad propia solamente si mejora la marca.
- Titulares con escala fluida mediante `clamp()` y cortes de línea diseñados.
- Cuerpo con ancho máximo de 60–70 caracteres.
- Usar pesos, tracking y contraste de tamaño; no depender de mayúsculas en exceso.
- Los efectos tipográficos pueden revelar por líneas o palabras, cambiar peso variable, usar máscaras o desplazamiento sutil. Deben mantener el texto accesible y disponible sin JavaScript.

### Sistema de pantallas simuladas

Los dashboards y dispositivos se construyen con HTML y CSS, no como capturas planas. Deben ser componentes reutilizables con:

- Navegación, tablas, gráficos SVG o CSS, estados, avatares abstractos y controles.
- Datos ficticios coherentes con cada rubro.
- Estados hover, focus, loading, success y empty.
- Variables CSS para que cada industria tenga un acento propio sin romper la marca.
- Animaciones de datos pequeñas: barras que crecen, filas que ingresan, estados que cambian o contadores que se actualizan.
- Profundidad mediante luz, borde y sombra controlada; no mediante exceso de perspectiva.

### Lenguaje GSAP

Usar GSAP y ScrollTrigger para coreografías puntuales:

- Revelado del hero por líneas o palabras.
- Secuencias de entrada del dashboard.
- Secciones sticky donde una interfaz cambia mientras el texto explica el proceso.
- Transiciones entre vista pública y panel interno.
- Máscaras, clips y desplazamientos parallax de baja amplitud.
- Microinteracciones en CTAs y elementos demostrativos.

No usar scroll hijacking, movimiento permanente, elementos que persiguen el cursor sin utilidad ni animaciones idénticas en todas las secciones.

### Reglas de movimiento

- Entrada estándar: 450–800 ms.
- Microinteracciones: 150–300 ms.
- Curvas suaves y consistentes.
- Máximo una escena protagonista por viewport.
- Animar `transform` y `opacity` siempre que sea posible.
- Pausar animaciones fuera de pantalla.
- Respetar `prefers-reduced-motion` y ofrecer una versión sin dependencia del movimiento.
- El contenido y las acciones deben funcionar antes de cargar GSAP.

### Navegación y transiciones

- Header minimalista, inicialmente integrado al hero y sólido al hacer scroll.
- Mega menú de Soluciones con vista previa compacta, no una lista interminable.
- Transiciones de página rápidas: máscara, desplazamiento tipográfico o cambio de plano, sin ocultar la respuesta de navegación.
- Cursor personalizado solo en desktop y únicamente sobre áreas demostrativas; nunca debe reemplazar el cursor estándar en formularios o navegación.
- Botones con respuesta magnética muy leve, foco visible y área táctil mínima de 44 px.

### Responsive

- Diseñar mobile como una composición propia, no como desktop apilado.
- Reemplazar escenas sticky complejas por secuencias cortas o carruseles controlables.
- Los dashboards deben recortar o reorganizar información sin volverse ilegibles.
- No ocultar contenido esencial para conservar el efecto visual.
- Probar desde 320 px hasta pantallas ultrawide.

### Performance y accesibilidad

- Objetivo de LCP menor a 2,5 s en condiciones reales razonables.
- Evitar videos pesados en el hero; preferir interfaces CSS y SVG.
- Cargar fuentes de forma optimizada y limitar familias/pesos.
- Lazy load en escenas no críticas.
- Contraste WCAG AA, navegación por teclado y foco visible.
- HTML semántico y orden lógico aun cuando existan composiciones superpuestas.
- No animar atributos que provoquen reflow continuo.
- Registrar rendimiento de GSAP en dispositivos medios y reducir complejidad cuando corresponda.

### Criterio de calidad final

Cada página debe superar estas preguntas:

1. ¿La composición podría pertenecer a cualquier SaaS? Si la respuesta es sí, falta identidad.
2. ¿El efecto ayuda a comprender una función o una idea? Si no, debe eliminarse.
3. ¿La interfaz simulada cuenta una historia operativa real? Si no, es decoración.
4. ¿La página sigue siendo clara sin animación? Debe serlo.
5. ¿La experiencia mobile conserva el carácter de la marca? Debe conservarlo.
6. ¿Hay señales que hagan pensar en contenido generado automáticamente? Deben corregirse antes de publicar.
