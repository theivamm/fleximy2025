# FLEXIMY — LANDING DEFINITIVA DE SOLUCIONES NFC

## Especificación comercial, narrativa, visual y técnica

Ruta recomendada: `/soluciones/nfc`

Nombre comercial recomendado: **Fleximy NFC**

Concepto central:

> **Un toque. La acción que tu negocio necesita.**

Esta página debe presentar una solución física + digital configurable para todo tipo de negocios. El producto utiliza tecnología NFC y un QR de respaldo para llevar al cliente, con un solo gesto, hacia la acción definida por el comercio.

La acción puede ser:

- dejar una reseña en Google;
- abrir WhatsApp;
- ver un menú;
- reservar un turno;
- pagar;
- seguir una cuenta;
- acceder a una promoción;
- completar un formulario;
- conectarse a Wi-Fi;
- abrir un catálogo;
- descargar información;
- acceder a cualquier URL.

La propuesta no debe limitarse a “una tarjeta para conseguir reseñas”. La página debe comenzar con ese caso de uso porque es fácil de entender y vender, pero rápidamente demostrar que el destino es configurable y que el mismo producto puede resolver diferentes acciones del negocio.

---

## 1. Precisión comercial obligatoria

No prometer:

- “Rankeá primero en Google”.
- “Subí posiciones inmediatamente”.
- “Conseguí reseñas positivas”.
- “Garantizamos más ventas”.
- “Mejorá tu ranking en pocos días”.

Sí comunicar:

- facilitar el acceso a la ficha de Google;
- reducir la fricción para dejar una reseña auténtica;
- aumentar las oportunidades de recibir opiniones;
- fortalecer la presencia digital del negocio;
- transformar un momento presencial en una acción digital;
- medir interacciones sin inventar resultados.

Las reseñas deben ser voluntarias y auténticas. No implementar review gating, incentivos condicionados ni flujos que deriven solamente a clientes satisfechos hacia Google.

---

## 2. Objetivo comercial de la landing

La página debe conseguir que el dueño de un negocio comprenda en menos de diez segundos:

1. Qué es el producto.
2. Cómo se utiliza.
3. Qué puede hacer.
4. Que puede cambiar el enlace cuando lo necesite.
5. Que sirve para su tipo de negocio.
6. Cómo pedirlo.

Conversión principal:

> **Quiero mi solución NFC**

Conversión secundaria:

> **Ver todo lo que puede hacer**

Canales sugeridos:

- formulario corto;
- WhatsApp;
- solicitud de propuesta para múltiples locales.

---

## 3. Relación con la identidad de Fleximy

La página debe sentirse parte del mismo sitio:

- dark y light mode;
- tipografía display contundente;
- fondo profundo en modo oscuro;
- gradientes violeta, azul, cian y rosa;
- contenedores amplios;
- bordes suaves;
- superficies con profundidad;
- interfaces creadas con CSS;
- microanimaciones precisas;
- estética tecnológica pero humana;
- textos simples y comerciales;
- sin apariencia genérica de landing creada por IA.

La página puede tener mayor energía que el Home porque presenta un producto concreto, pero no debe convertirse en una landing estridente, llena de neón o efectos permanentes.

---

## 4. Navegación

Header consistente con Fleximy.

### Logo

- Logo Fleximy.
- Link al Home.

### Links

- Cómo funciona.
- Qué podés activar.
- Para tu negocio.
- Preguntas.

### Acciones

- Toggle light/dark.
- CTA: **Quiero mi NFC**.

En mobile utilizar menú compacto. El CTA debe permanecer visible sin ocupar todo el header.

---

# MÓDULO 01 — HERO

## 5. Mensaje principal

Eyebrow:

**FLEXIMY NFC · DEL MUNDO FÍSICO AL DIGITAL**

H1:

# Un toque. La acción que tu negocio necesita.

Descripción:

**Tus clientes acercan el celular y llegan directo a tu reseña de Google, WhatsApp, menú, reservas, pagos o cualquier enlace que quieras activar.**

Refuerzo:

**Sin aplicaciones. Sin buscar links. Sin explicar pasos.**

CTA principal:

**Quiero mi solución NFC →**

CTA secundario:

**Descubrir posibilidades**

Microcopy:

**NFC + QR · Configurable · Listo para usar**

---

## 6. Visual principal del hero

No usar una imagen de stock. Construir una escena de producto con CSS y, si existe, un asset PNG del soporte físico.

La escena debe contener:

1. Un soporte NFC de mesa o tarjeta vertical.
2. El isotipo F de Fleximy.
3. Texto físico: “Acercá tu celular”.
4. Un teléfono acercándose al soporte.
5. Ondas NFC animadas.
6. Una pantalla móvil que cambia automáticamente de destino.

Destinos del loop:

- Reseña de Google.
- WhatsApp.
- Menú digital.
- Reservar turno.

### Secuencia automática

1. El teléfono se aproxima unos pocos píxeles.
2. Se activan tres ondas NFC.
3. Aparece una confirmación: “Enlace abierto”.
4. La pantalla muestra el destino.
5. Después de una pausa, cambia al siguiente caso de uso.

Duración total sugerida: 10–12 segundos.

La demostración debe entenderse quieta. La animación solamente muestra que el destino puede cambiar.

### Representación textual

```text
                           ┌───────────────────┐
       ╭────────────╮      │  Tu negocio      │
       │      F     │ )))  │                   │
       │ ACERCÁ TU  │      │  ★ ★ ★ ★ ★       │
       │  CELULAR   │      │  Dejar una reseña│
       │    [QR]    │      │                   │
       ╰────────────╯      └───────────────────┘
        SOPORTE NFC              TELÉFONO
```

### Efecto reactivo al mouse

- Glow radial muy suave que sigue el puntero dentro del visual.
- Rotación 3D máxima de 2–3 grados.
- No mover el teléfono ni el soporte más de 8 px.
- Desactivar en dispositivos táctiles.
- Respetar `prefers-reduced-motion`.

---

## 7. Layout del hero

```css
.nfc-hero__inner {
  display: grid;
  grid-template-columns: minmax(500px, 0.9fr) minmax(600px, 1.1fr);
  align-items: center;
  gap: clamp(48px, 6vw, 104px);
  min-height: calc(100svh - var(--header-height));
}

.nfc-hero__copy {
  max-width: 650px;
}

.nfc-hero h1 {
  max-width: 12ch;
  font-size: clamp(54px, 5.4vw, 92px);
  line-height: 0.94;
  letter-spacing: -0.06em;
  text-wrap: balance;
}

.nfc-hero__visual {
  width: min(100%, 780px);
  aspect-ratio: 1.18 / 1;
  justify-self: end;
  min-width: 0;
}
```

Los CTAs deben permanecer en una fila desde tablet horizontal. Apilarlos únicamente cuando realmente no entren.

---

# MÓDULO 02 — EL PROBLEMA

## 8. Mensaje

Eyebrow:

**MENOS PASOS. MÁS ACCIONES.**

H2:

## Si es difícil encontrarlo, probablemente no suceda.

Descripción:

**Buscar el negocio en Google, encontrar el WhatsApp, escribir una dirección o pedir el menú agrega pasos. Fleximy NFC convierte el momento exacto en una acción directa.**

### Comparación visual

Crear dos recorridos con CSS.

#### Antes

```text
Buscar → Escribir → Elegir → Encontrar → Actuar
```

Etiqueta:

**Demasiados pasos**

#### Con Fleximy NFC

```text
Acercar → Listo
```

Etiqueta:

**Una acción directa**

### Animación

- El recorrido largo se dibuja lentamente y pierde intensidad.
- El recorrido NFC se resuelve con un pulso rápido.
- No utilizar scroll pinning.

---

# MÓDULO 03 — MUCHO MÁS QUE RESEÑAS

## 9. Mensaje

Eyebrow:

**UN MISMO PRODUCTO. MUCHAS POSIBILIDADES.**

H2:

## Hoy abre tus reseñas. Mañana, lo que necesites.

Descripción:

**El destino es configurable. Podés cambiarlo sin reemplazar el soporte NFC y adaptarlo a cada campaña, local o momento de tu negocio.**

Refuerzo:

**Cambia el enlace. El producto sigue siendo el mismo.**

---

## 10. Mosaico de acciones

Crear un bento grid editorial, no una lista interminable de iconos iguales.

### Acciones principales

#### Reseñas de Google

Texto:

**Llevá a tus clientes directo al lugar donde pueden compartir su experiencia.**

Microcopy:

**Más fácil de encontrar. Más fácil de completar.**

#### WhatsApp

Texto:

**Abrí una conversación con un mensaje inicial preparado.**

Microcopy:

**Consultas, pedidos o soporte.**

#### Menú o catálogo

Texto:

**Mostrá productos, servicios, precios o disponibilidad sin imprimir de nuevo.**

Microcopy:

**Siempre actualizado.**

#### Turnos y reservas

Texto:

**Llevá al cliente directamente al calendario o sistema de reservas.**

Microcopy:

**Del interés al turno.**

### Acciones secundarias

- Pagos.
- Promociones.
- Redes sociales.
- Wi-Fi.
- Formularios.
- Encuestas.
- Eventos.
- Contacto digital.
- Catálogo PDF.
- Programa de fidelización.

### Composición recomendada

```text
┌──────────────────────┬───────────────┐
│ RESEÑAS DE GOOGLE    │ WHATSAPP      │
│ Card protagonista    │               │
├───────────────┬──────┴───────────────┤
│ MENÚ/CATÁLOGO │ TURNOS Y RESERVAS    │
├───────────────┴──────────────────────┤
│ pagos · redes · Wi-Fi · formularios  │
└──────────────────────────────────────┘
```

No convertir cada acción en una card grande. Las cuatro principales construyen la narrativa; las restantes demuestran amplitud.

---

## 11. Microinterfaces CSS del mosaico

Cada card principal debe incluir una demostración mínima:

### Google

- cinco estrellas;
- textarea breve;
- botón “Publicar reseña”; 
- check “Gracias por compartir tu experiencia”.

No usar el logotipo de Google como elemento dominante. Puede emplearse texto descriptivo y una representación neutral.

### WhatsApp

- burbuja “Hola, quiero consultar…”;
- contacto del negocio;
- botón “Iniciar conversación”.

### Menú

- tres productos;
- nombre;
- precio placeholder;
- estado “Disponible”.

### Reserva

- calendario semanal;
- hora seleccionada;
- botón “Confirmar turno”.

Las interfaces no necesitan ser clickeables. Deben comprenderse en reposo.

---

# MÓDULO 04 — CÓMO FUNCIONA

## 12. Mensaje

Eyebrow:

**LISTO PARA USAR**

H2:

## Lo configuramos. Lo entregamos. Tus clientes lo usan.

Descripción:

**Nos decís qué acción querés facilitar y preparamos la solución completa para tu negocio.**

### Pasos

#### 01 · Elegís la acción

**Reseñas, WhatsApp, menú, turnos, pagos o cualquier enlace.**

#### 02 · Lo configuramos

**Programamos el destino, personalizamos la pieza y verificamos el funcionamiento.**

#### 03 · Lo ubicás en tu negocio

**Mostrador, mesa, recepción, packaging, vidriera o donde sucede la decisión.**

#### 04 · Lo actualizás cuando quieras

**Cambiás el enlace sin reemplazar el soporte físico.**

### Visual

Crear una línea de ensamblaje digital con CSS:

```text
DESTINO → CONFIGURACIÓN → SOPORTE NFC → ACCIÓN
```

Un pulso recorre la línea al entrar en viewport. Sin pinning.

---

# MÓDULO 05 — CONFIGURABLE

## 13. Mensaje

Eyebrow:

**UN LINK QUE PUEDE CAMBIAR**

H2:

## La pieza queda. El destino evoluciona con tu negocio.

Descripción:

**Usá el mismo soporte para una campaña, una promoción, un menú nuevo o una acción diferente. Actualizá el enlace sin imprimir, reprogramar ni reemplazar la pieza.**

### Demostración visual

Crear un panel CSS de configuración:

```text
Destino activo
● Reseñas de Google

Cambiar destino
○ WhatsApp
○ Menú digital
○ Reservas
○ URL personalizada

[Guardar cambio]

Estado: actualizado ahora
```

Al lado, mostrar el mismo soporte físico. Cuando cambia la selección, cambia solamente la pantalla del teléfono.

### Regla comercial

No afirmar que el cliente necesariamente tendrá acceso directo a un dashboard si esa función todavía no está desarrollada.

Si el cambio de URL será gestionado por Fleximy, comunicar:

> **Nos pedís el cambio y actualizamos el destino.**

Si habrá panel autogestionable, comunicar:

> **Cambiá el destino desde tu panel.**

Implementar el copy definitivo según el funcionamiento real del producto. No prometer autogestión inexistente.

---

# MÓDULO 06 — PARA CADA NEGOCIO

## 14. Mensaje

Eyebrow:

**DONDE HAY UN CLIENTE, HAY UNA ACCIÓN**

H2:

## Una solución diferente para cada negocio.

Descripción:

**Configuramos cada pieza según el lugar, el cliente y la acción que querés facilitar.**

---

## 15. Casos comerciales

Presentar ocho ejemplos claros. No utilizar fotografías obligatoriamente. Crear escenarios mediante tipografía, iconografía y objetos CSS.

### Gastronomía

**En la mesa:** menú, pedido, pago o reseña.

### Hoteles

**En la habitación:** Wi-Fi, servicios, asistencia o experiencia.

### Ópticas

**En el mostrador:** turnos, catálogo, WhatsApp o reseñas.

### Inmobiliarias

**En una propiedad:** ficha, consulta, visita o contacto del asesor.

### Centros de estética

**En recepción:** turnos, tratamientos, promociones o fidelización.

### Retail

**En el producto o la caja:** información, catálogo, pago o beneficios.

### Profesionales

**En el escritorio:** contacto, agenda, credenciales o portfolio.

### Eventos

**En el acceso:** acreditación, agenda, contenido o encuesta.

### Recurso gráfico

Utilizar una marquesina controlada con los rubros y un bloque central que cambia automáticamente:

```text
GASTRONOMÍA → Mesa 12 → Abrir menú
ÓPTICA → Mostrador → Reservar turno
INMOBILIARIA → Cartel → Ver propiedad
ESTÉTICA → Recepción → Dejar reseña
```

No convertirlo en selector complejo. El usuario no necesita interactuar para entenderlo.

---

# MÓDULO 07 — FORMATOS FÍSICOS

## 16. Mensaje

Eyebrow:

**HECHO PARA ESTAR DONDE SUCEDE LA ACCIÓN**

H2:

## En el mostrador, la mesa, la vidriera o en manos de tu equipo.

Descripción:

**Adaptamos la solución al espacio y al uso real de cada negocio.**

### Formatos sugeridos

Solo mostrar los formatos que realmente puedan ofrecerse.

- Soporte de mostrador.
- Sticker NFC + QR.
- Tarjeta personal.
- Display de mesa.
- Pieza para vidriera.
- Identificador de empleado.
- Adhesivo para packaging.

Si un formato todavía no está disponible, no presentarlo como producto contratado. Puede marcarse como “consultar”.

### Visual

Crear un pedestal digital con 3–4 piezas mediante CSS 3D suave. Permitir rotación lenta automática, sin drag obligatorio.

---

# MÓDULO 08 — PROPUESTA COMERCIAL

## 17. Mensaje

Eyebrow:

**EMPEZÁ CON UNA. ESCALÁ CUANDO QUIERAS.**

H2:

## Una solución simple para un local. Una red para todos tus puntos de atención.

Descripción:

**Podés comenzar con una acción puntual o implementar diferentes destinos para locales, mesas, vendedores, productos o campañas.**

### Modalidades sin precio inventado

#### Una acción

Para un punto específico del negocio.

- Un destino.
- Configuración inicial.
- Personalización básica.
- NFC + QR.

CTA:

**Quiero empezar**

#### Negocio

Para distintos momentos del mismo local.

- Múltiples piezas.
- Diferentes destinos.
- Personalización de marca.
- Soporte de configuración.

CTA:

**Armar mi solución**

#### Multipunto

Para cadenas, franquicias y equipos.

- Múltiples locales.
- Estructura por sede o equipo.
- Destinos configurables.
- Implementación coordinada.

CTA:

**Solicitar propuesta**

No mostrar precios hasta que estén definidos comercialmente. No utilizar “desde” con valores ficticios.

---

# MÓDULO 09 — CONFIANZA

## 18. Mensaje

H2:

## Tecnología simple para las personas. Flexible para tu negocio.

### Beneficios

- No requiere instalar una app.
- Funciona con NFC y QR de respaldo.
- El destino puede actualizarse.
- Se personaliza para el negocio.
- Puede implementarse por etapas.
- Sirve para una o múltiples ubicaciones.

### Aclaración técnica

No afirmar compatibilidad universal absoluta. Comunicar:

**Compatible con la mayoría de los smartphones modernos. El QR permite acceder desde equipos sin NFC o con la función desactivada.**

---

# MÓDULO 10 — CTA Y FORMULARIO

## 19. Mensaje final

Eyebrow:

**ACERCÁ TU NEGOCIO A LA PRÓXIMA ACCIÓN**

H2:

## Contanos qué querés que pase después del toque.

Descripción:

**Reseñas, consultas, reservas, pagos o una idea completamente diferente. Diseñamos la solución alrededor de tu negocio.**

CTA alternativo WhatsApp:

**Prefiero contarlo por WhatsApp →**

---

## 20. Formulario

Campos:

- Nombre.
- Negocio o empresa.
- WhatsApp.
- Email.
- Rubro.
- Cantidad de locales o puntos.

Pregunta de selección múltiple:

**¿Qué querés facilitar?**

Opciones:

- Reseñas de Google.
- WhatsApp.
- Menú o catálogo.
- Turnos o reservas.
- Pagos.
- Promociones.
- Otra acción.
- Todavía no lo tengo claro.

Textarea:

**Contanos dónde te gustaría usarlo**

Placeholder:

**Por ejemplo: tenemos una cafetería y queremos colocar una pieza en cada mesa para abrir el menú y facilitar reseñas.**

CTA:

**Quiero mi solución NFC →**

Microcopy:

**Te respondemos personalmente para definir el formato y la configuración indicada para tu negocio.**

No pedir información técnica al usuario.

---

# MÓDULO 11 — FAQ

## 21. Preguntas frecuentes

### ¿Qué es NFC?

NFC es una tecnología que permite abrir información al acercar un celular compatible a una pieza configurada. También incluimos un QR como alternativa.

### ¿El cliente tiene que instalar una aplicación?

No. Solo acerca el celular o escanea el QR y accede al destino configurado.

### ¿Puedo cambiar el enlace después?

Sí. El destino puede actualizarse sin reemplazar la pieza física. El procedimiento dependerá de la modalidad contratada.

### ¿Sirve solamente para reseñas de Google?

No. Puede abrir WhatsApp, menús, turnos, pagos, promociones, redes sociales, formularios o cualquier URL.

### ¿Funciona en todos los celulares?

Funciona con la mayoría de los smartphones modernos. Para equipos sin NFC o con la función desactivada, la pieza incluye un QR.

### ¿Se puede personalizar con mi marca?

Sí. Podemos adaptar la pieza al estilo, los colores y la acción de tu negocio según el formato elegido.

### ¿Puedo usar diferentes enlaces en distintas piezas?

Sí. Un negocio puede utilizar destinos diferentes por local, mesa, empleado, producto o campaña.

### ¿Puedo saber cuántas personas lo utilizaron?

La medición dependerá de la configuración y modalidad implementada. Si se ofrece analítica, debe especificarse claramente qué interacciones pueden medirse y cómo se protege la privacidad.

### ¿La solución garantiza mejores posiciones en Google?

No se garantizan posiciones. La solución facilita que más clientes lleguen a la ficha del negocio y puedan compartir una experiencia auténtica con menos pasos.

---

# DIRECCIÓN DE ARTE

## 22. Paleta

Mantener el sistema de Fleximy.

### Acentos

- Violeta: `#725CFF`.
- Azul: `#397BFF`.
- Cian: `#16D8D2`.
- Rosa: `#F06FAE`.
- Verde de confirmación: `#35D58A`.

### Dark

- Canvas: `#090B17`.
- Surface 1: `#101426`.
- Surface 2: `#171C31`.
- Border: `rgba(174, 184, 225, 0.15)`.
- Text: `#F5F7FF`.
- Muted: `#A5AEC8`.

### Light

- Canvas: `#F6F7FC`.
- Surface 1: `#FFFFFF`.
- Surface 2: `#EEF1F8`.
- Border: `rgba(31, 38, 70, 0.11)`.
- Text: `#111426`.
- Muted: `#687088`.

---

## 23. Fondo y efectos

Usar:

- gradientes radiales amplios;
- grid técnico casi imperceptible;
- ondas concéntricas inspiradas en NFC;
- glows reactivos limitados a módulos visuales;
- máscaras suaves;
- ruido muy sutil si ya existe en Fleximy.

No usar:

- partículas flotando por toda la página;
- lluvia de íconos;
- neón permanente;
- glassmorphism excesivo;
- blur que reduzca legibilidad;
- animaciones en cada elemento;
- fotos de personas señalando un celular.

---

## 24. Recurso tipográfico

Crear una línea animada en el hero:

```text
Un toque para [RESEÑAS]
Un toque para [RESERVAS]
Un toque para [PEDIDOS]
Un toque para [CONTACTAR]
```

No reemplazar el H1. Utilizarla como apoyo visual en el producto o como microcopy animada.

La palabra variable cambia con un desplazamiento vertical corto y máscara de overflow.

---

## 25. Iconografía

Iconos lineales propios o de una única librería consistente.

- Grosor uniforme.
- Bordes redondeados.
- Tamaño mínimo legible.
- Sin emojis como iconografía principal.
- No mezclar estilos filled y outline.

---

# IMPLEMENTACIÓN

## 26. Componentes sugeridos

```text
NfcSolutionPage
├── NfcHeader
├── NfcHero
│   ├── NfcPhysicalTag
│   ├── NfcWaves
│   ├── NfcPhoneDemo
│   └── DestinationRotator
├── FrictionComparison
├── ActionBento
│   ├── ReviewDemo
│   ├── WhatsappDemo
│   ├── MenuDemo
│   └── BookingDemo
├── HowItWorks
├── ConfigurableDestination
├── BusinessCases
├── PhysicalFormats
├── CommercialOptions
├── TrustBenefits
├── NfcLeadForm
├── NfcFaq
└── Footer
```

Reutilizar header, footer, botones, formulario, tokens y toggle de temas del sitio actual cuando estén correctamente construidos.

---

## 27. Animación

Priorizar CSS.

Usar GSAP solamente para:

- entrada coordinada del hero;
- activación de ondas NFC;
- recorrido de la línea “Cómo funciona”; 
- reveal tipográfico puntual;
- secuencia de destinos configurables.

No usar ScrollTrigger para fijar secciones durante largos recorridos.

Todas las animaciones deben:

- trabajar con `transform` y `opacity`;
- tener cleanup;
- detenerse fuera del viewport cuando corresponda;
- respetar `prefers-reduced-motion`;
- tener estado final legible.

---

## 28. Responsive

### Desktop

- Contenedor wide máximo 1480 px.
- Hero en dos columnas.
- Action Bento asimétrico.
- Producto físico y teléfono con buena escala.

### Tablet

- Hero en una columna.
- Copy primero, visual después.
- Bento en dos columnas.
- Formularios en una columna o 40/60 según ancho.

### Mobile

- Una columna.
- Visual del hero encima o debajo del copy según lectura, preferentemente después del copy.
- Soporte y teléfono centrados.
- Sin elementos que salgan del viewport.
- Bento en una columna.
- Carruseles evitados salvo formatos físicos.
- CTA sticky inferior opcional, de altura moderada.
- Formulario con campos de 100%.

### Breakpoints de prueba

- 1920 × 1080.
- 1440 × 900.
- 1366 × 768.
- 1024 × 768.
- 768 × 1024.
- 430 × 932.
- 390 × 844.
- 360 × 800.

---

## 29. Performance

- No cargar librerías nuevas para un único efecto.
- Imágenes WebP/AVIF con dimensiones explícitas.
- Lazy load debajo del fold.
- SVG optimizados.
- Animaciones sin layout thrashing.
- Evitar múltiples listeners de mouse.
- Pausar loops fuera del viewport.
- Objetivo Lighthouse móvil:
  - Performance ≥ 90.
  - Accessibility ≥ 95.
  - Best Practices ≥ 95.
  - SEO ≥ 95.

---

## 30. SEO

### Title recomendado

**Soluciones NFC para negocios | Fleximy**

### Meta description

**Facilitá reseñas, consultas, menús, reservas, pagos y más con soluciones NFC configurables para tu negocio. Sin apps y listas para usar.**

### H1 único

**Un toque. La acción que tu negocio necesita.**

### Keywords semánticas naturales

- soluciones NFC para negocios;
- tarjeta NFC para reseñas;
- NFC para Google Reviews;
- soporte NFC personalizado;
- NFC para restaurantes;
- NFC para WhatsApp;
- NFC para menús;
- NFC configurable.

No repetir keywords artificialmente.

### Datos estructurados

- `Product` si existe un producto concreto con oferta definida.
- `FAQPage` para preguntas visibles.
- `Organization` heredado del sitio.
- No agregar ratings ficticios.

---

## 31. Analítica

Eventos sugeridos:

- `view_nfc_page`.
- `click_nfc_primary_cta`.
- `click_nfc_whatsapp`.
- `select_nfc_use_case`.
- `view_nfc_formats`.
- `start_nfc_form`.
- `submit_nfc_form`.

No registrar contenido sensible escrito en el formulario.

Si se miden los toques NFC de clientes finales, informar el alcance y respetar privacidad. No prometer analítica sin infraestructura real.

---

## 32. Accesibilidad

- Contraste WCAG AA.
- Foco visible.
- Navegación por teclado.
- Estados no comunicados solo por color.
- Animaciones decorativas con `aria-hidden`.
- Demos CSS fuera del tab order si no son interactivas.
- Labels reales en formulario.
- Mensajes de validación accesibles.
- Respetar `prefers-reduced-motion`.

---

## 33. Criterios de aceptación

### Mensaje

- [ ] En diez segundos se comprende qué es.
- [ ] Reseñas es el caso inicial, no el único producto.
- [ ] Se entiende que el destino puede cambiar.
- [ ] No existen promesas engañosas sobre ranking.
- [ ] Los textos son cortos, directos y comerciales.

### Visual

- [ ] Se siente parte de Fleximy.
- [ ] Hero con producto NFC + teléfono.
- [ ] Las ondas NFC se entienden.
- [ ] Action Bento tiene cuatro casos principales claros.
- [ ] No parece una plantilla SaaS genérica.
- [ ] Light y dark tienen igual calidad.
- [ ] No hay overflow horizontal.

### Producto

- [ ] Se explica NFC + QR.
- [ ] Se explica la configuración del destino.
- [ ] No se promete autogestión si no existe.
- [ ] No se muestran formatos que no pueden venderse.
- [ ] No se muestran precios inventados.

### Conversión

- [ ] CTA visible en hero.
- [ ] CTA repetido después de casos de uso.
- [ ] Formulario corto y comprensible.
- [ ] Alternativa por WhatsApp.
- [ ] Modalidad multipunto visible.

### Técnica

- [ ] Build exitoso.
- [ ] Sin errores de consola.
- [ ] Responsive 360–1920 px.
- [ ] Sin scroll horizontal.
- [ ] Formularios funcionales.
- [ ] Eventos de analítica verificados.
- [ ] `prefers-reduced-motion` implementado.

---

## 34. Orden de implementación

1. Crear ruta y estructura semántica.
2. Reutilizar sistema visual y componentes Fleximy.
3. Implementar hero y demostración NFC.
4. Implementar comparación de fricción.
5. Implementar Action Bento.
6. Implementar “Cómo funciona”.
7. Implementar demostración configurable.
8. Implementar casos por negocio.
9. Implementar formatos reales.
10. Implementar propuesta comercial sin precios ficticios.
11. Implementar confianza, CTA, formulario y FAQ.
12. Crear light/dark.
13. Añadir movimiento.
14. Integrar SEO y analítica.
15. Ejecutar QA.

---

## 35. Prompt final para OpenCode

Creá una nueva página en `/soluciones/nfc` siguiendo este documento completo como especificación de producto, contenido, diseño y desarrollo.

La página debe pertenecer al mismo sistema visual del Home actual de Fleximy: misma identidad, dark/light mode, tipografía, gradientes, botones, header, footer y nivel de terminación. Reutilizá componentes existentes siempre que mantengan calidad y consistencia.

La solución se vende inicialmente mediante un caso fácil de entender —facilitar reseñas de Google—, pero la propuesta central es más amplia: un soporte NFC + QR cuyo destino puede configurarse para abrir WhatsApp, menús, reservas, pagos, promociones, formularios, redes o cualquier URL.

No prometas ranking garantizado, reseñas positivas ni resultados imposibles de verificar. No implementes review gating. El mensaje debe ser comercial, directo y creíble.

Construí las demostraciones visuales con CSS y SVG. El hero debe mostrar un soporte NFC, un teléfono y una secuencia automática de destinos. El módulo principal debe utilizar un Action Bento con cuatro casos protagonistas: reseñas, WhatsApp, menú y reservas. No uses imágenes de stock como recurso principal.

No inventes precios, formatos disponibles, funcionalidades de dashboard ni analítica. Cuando una capacidad dependa de la operación real, utilizá el copy condicional indicado en el documento o dejá su configuración centralizada para definirla antes de publicar.

La página debe quedar completamente responsive, sin overflow horizontal, con light y dark mode, accesibilidad, SEO, analítica y `prefers-reduced-motion`.

Antes de programar:

1. Leé el documento completo.
2. Inspeccioná el sistema actual de Fleximy.
3. Identificá componentes reutilizables.
4. Definí internamente el checklist.
5. Implementá la página completa.

No me devuelvas solamente un análisis o plan. Implementá de punta a punta y verificá todos los criterios de aceptación.

Al finalizar, informá:

- archivos creados y modificados;
- ruta implementada;
- componentes reutilizados;
- funcionamiento real de la configuración del enlace;
- destinos y formatos publicados;
- validación light/dark;
- resoluciones probadas;
- build y consola;
- pendientes reales, sin ocultarlos.

---

## 36. Criterio final

La landing está terminada cuando una persona que entra por primera vez puede decir:

> “Entiendo qué es, veo cómo funciona, sé qué podría hacer en mi negocio y puedo pedirlo ahora.”

La magia visual debe reforzar esa comprensión. Nunca reemplazarla.
