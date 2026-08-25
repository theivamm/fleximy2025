# FLEXIMY — Módulo “Una web por fuera. Todo tu negocio por dentro.”

## Brief definitivo de contenido, diseño e interfaces

Este documento reemplaza por completo el módulo actual **“Todo conectado”** y sus textos abstractos sobre información dispersa, procesos y control.

El formato visual general de cuatro estados puede conservarse porque funciona, pero deben reconstruirse:

- el título y la bajada;
- los nombres de las cuatro opciones;
- todo el contenido comercial;
- las cuatro interfaces que aparecen a la derecha;
- las animaciones y transiciones;
- el comportamiento responsive;
- el argumento de accesibilidad económica.

El módulo debe explicar en pocos segundos la propuesta central de Fleximy:

> Creamos el website que ven tus clientes y, por detrás, la aplicación con la que administrás tu negocio.

---

## 1. Objetivo comercial

La persona no debe tener que interpretar conceptos como “digitalización”, “ecosistema” o “procesos conectados”. Debe comprender inmediatamente:

1. Fleximy crea websites para empresas, comercios y emprendimientos.
2. El website puede recibir consultas, pedidos, reservas o ventas.
3. Cada website incluye una aplicación de gestión adaptada al negocio.
4. Desde esa aplicación se administran clientes, tareas, empleados, productos, turnos, mesas, propiedades, stock o proyectos.
5. Todo termina resumido en un dashboard con información útil.
6. Esta tecnología está al alcance de una PyME y no exige invertir como una gran empresa.

### Percepción buscada

> “Puedo tener una plataforma propia para mi negocio sin afrontar el costo ni la complejidad de desarrollar un sistema tradicional desde cero.”

---

## 2. Mensaje económico

El usuario pidió comunicar que la solución tiene un costo muy conveniente, pero no utilizar expresiones como:

- barato;
- económico;
- low cost;
- costo irrisorio;
- regalado;
- por poco dinero.

### Lenguaje aprobado

Utilizar de manera natural una o dos de estas expresiones:

- **Tecnología a medida, al alcance de tu negocio.**
- **Una plataforma propia sin el costo de un desarrollo tradicional.**
- **El alcance de una gran plataforma, pensado para una PyME.**
- **Empezá con lo que necesitás y hacela crecer con tu negocio.**
- **Una inversión clara, escalable y acorde a tu etapa.**
- **Sin licencias innecesarias ni estructuras sobredimensionadas.**
- **Más accesible de lo que imaginás.**

### Frase principal recomendada

> **Tecnología a medida, al alcance de tu negocio.**

### Frase de apoyo recomendada

> Empezás con las herramientas que necesitás hoy y sumás nuevas funciones cuando tu negocio lo requiere.

No repetir el argumento de precio en los cuatro estados. Debe aparecer en la introducción y en el cierre del módulo para mantener una percepción premium.

---

## 3. Nuevo encabezado del módulo

### Eyebrow

`WEBSITE + APP DE GESTIÓN`

### Título principal

# Una web por fuera. Todo tu negocio por dentro.

### Descripción

> Creamos el website que ven tus clientes y lo conectamos con una aplicación para administrar ventas, clientes y operación desde un solo lugar.

### Sello comercial

`Tecnología a medida, al alcance de tu negocio.`

### Navegación principal

```text
01 Tu web     02 Tus clientes     03 Tu operación     04 Tus números
```

Eliminar definitivamente:

- “Todo conectado” como título del módulo;
- “Información dispersa”, “Procesos”, “Control” como etiquetas de los estados;
- cualquier referencia a “digitalización”, “ecosistema”, “integración”, “automatización”.

---

## 4. Comportamiento general del módulo

### Dispositivo principal

Desktop ≥ 1024 px. El módulo debe verse completo y funcional a esta resolución sin scroll interno.

### Cambio de estado

- Click o tap en la navegación principal (01–04).
- Teclas ← → o 1–4.
- Swipe horizontal en mobile.
- Autoplay cada 7–9 segundos (pausa en hover/foco).

### Transición entre estados

- Cross-fade de 300 ms en textos e interfaz derecha.
- Slide horizontal de 400 ms en la navegación principal (indicador activo).
- No animar el fondo global del módulo.

### Interfaz derecha (viewport del dispositivo)

- Es la prueba visual de lo que se dice a la izquierda.
- Debe ser interactiva (hover, click, estados) aunque sea una simulación.
- No usar capturas de pantalla estáticas.
- Desktop: mockup de notebook o monitor.
- Tablet/Mobile: mockup de teléfono.

### Accesibilidad

- Contraste AA en todos los textos.
- Navegación por teclado completa (Tab, Enter, Espacio, Flechas).
- Estados de foco visibles.
- `prefers-reduced-motion`: desactivar autoplay y reducir transiciones a 100 ms.

---

## 5. Estado 01 — Tu web

### Etiqueta

`01 · TU WEB`

### Título

## Una web preparada para convertir visitas en clientes.

### Texto

> Una web única para mostrar, vender y recibir consultas, reservas o pedidos. Diseñada alrededor de tu negocio, no desde una plantilla.

### Línea rápida

`Catálogo · Reservas · Pedidos · Contacto · SEO`

### Microbeneficio

`Tu negocio abierto y listo para vender, las 24 horas.`

### Interfaz derecha: Website BRUMA (cafetería de especialidad)

#### Header

```text
BRUMA          Inicio  Menú  Reservas  Pedidos  Contacto
```

#### Hero

```text
Café de especialidad en Palermo
Tu próximo mejor café te espera.
[Reservar mesa] [Ver menú y pedir]
```

#### Sección: Productos destacados

```text
Croissant Pistacho     $8.900
Focaccia Mortadela     $12.800
Iced Matcha            $5.900
[Ver todo el menú]
```

#### Sección: Reservas integrada

```text
Reservá tu mesa
Fecha: [Hoy]  Personas: [2]  Hora: [20:00]
[Confirmar reserva]
```

#### Footer

```text
BRUMA · Thames 1850, Palermo · Abierto 8–22
Instagram  WhatsApp  Trabajá con nosotros
```

#### Interacciones reales y limitadas

- hacer hover sobre tarjetas de producto;
- cambiar fecha/hora/personas en reservas;
- click en “Ver menú y pedir” abre carrito lateral;
- scroll suave entre secciones;
- no implementar carrito completo ni checkout.

#### Animación automática (demo)

1. aparece tooltip “Reservá en 2 clicks” sobre botón hero;
2. se completa formulario de reserva solo;
3. toast “¡Reserva confirmada para hoy 20:00!”;
4. contador de mesas disponibles baja de 8 a 7.

Duración sugerida: 7–9 segundos.

---

## 6. Estado 02 — Tus clientes

### Etiqueta

`02 · TUS CLIENTES`

### Título

## Cada consulta se convierte en una oportunidad.

### Texto

> WhatsApp, formularios, reservas y pedidos llegan al mismo lugar, con el historial completo de cada cliente.

### Línea rápida

`Bandeja única · Historial · Fichas · Recordatorios`

### Microbeneficio

`Ninguna consulta olvidada. Ninguna oportunidad perdida.`

### Interfaz derecha: Bandeja de entrada unificada

#### Barra superior

```text
Entrada · 8 nuevas    [Filtrar: Todas | WhatsApp | Web | Reservas | Pedidos]
```

#### Lista de conversaciones

```text
[●] Camila R.          WhatsApp      10:42
    “Hola, querés reservar para 4…”
    [Respuesta rápida] [Ver ficha]

[●] Pedro M.           Formulario web 10:35
    Consulta por catering 20 personas
    [Responder] [Convertir en pedido]

[ ] Sofía L.           Reserva web    09:50
    Mesa 2 · 21:00 · Confirmada
    [Ver detalle] [Recordar]

[ ] Juan P.            Pedido web     09:15
    Pedido #1042 · $24.500 · Listo
    [Ver orden] [Facturar]
```

#### Panel lateral: Ficha de cliente (al click en “Ver ficha”)

```text
Camila R.          Cliente desde mar 2024
📞 +54 9 11 1234 5678
✉️ camila@email.com

Historial
▸ 12 ago · Reserva mesa 4 · 2 personas
▸ 05 ago · Pedido #1038 · $18.200
▸ 28 jul · Consulta WhatsApp · Alergias
▸ 15 jul · Reserva mesa 2 · 3 personas

Tags: [VIP] [Vegetariana] [Cena]
[Crear recordatorio] [Enviar WhatsApp]
```

#### Interacciones reales y limitadas

- alternar pestañas de filtro;
- abrir/cerrar ficha lateral;
- marcar como leída/no leída;
- usar respuesta rápida “Confirmamos tu reserva para 21:00 👍”;
- cambiar el estado de `Nueva` a `Confirmada`;
- actualizar la ficha del cliente al confirmar.

#### Animación automática

1. entra una nueva consulta;
2. se abre la conversación;
3. aparece una respuesta rápida;
4. la consulta se convierte en reserva;
5. el contador cambia de 8 a 7;
6. la ficha agrega una nueva reserva.

Duración sugerida: 7–9 segundos.

---

## 7. Estado 03 — Tu operación

### Etiqueta

`03 · TU OPERACIÓN`

### Título

## Todo lo que necesitás para trabajar, en una sola app.

### Texto

> Pedidos, turnos, tareas, empleados, stock o proyectos. Diseñamos la aplicación alrededor de cómo funciona tu negocio.

### Línea rápida

`Pedidos · Calendarios · Stock · Equipo · Tareas`

### Microbeneficio

`Menos planillas, menos mensajes sueltos y más orden.`

### Interfaz derecha: Centro de operaciones

Esta debe ser la vista más poderosa del módulo. Mostrar una aplicación completa sin saturarla.

#### Navegación

- Resumen
- Pedidos
- Mesas
- Comandas
- Inventario
- Equipo
- Tareas

#### Barra superior

```text
BRUMA · Palermo
Jueves 20 de agosto · 20:42
Estado del local: Operando
```

#### Panel principal

Columna izquierda — mesas:

```text
Salón
Mesa 01      Libre
Mesa 02      4 personas · Orden abierta
Mesa 03      Reservada · 21:00
Mesa 04      Esperando cuenta
Mesa 05      2 personas · Preparando
```

Columna central — comandera:

```text
Pedido #184                       Nuevo
Mesa 02 · Camila

2 × Croissant Pistacho
1 × Focaccia Mortadela
2 × Iced Matcha

[Aceptar] [Preparando] [Listo]
```

Columna derecha — operación:

```text
Inventario
Croissant Pistacho             11
Focaccia                        8
Leche de almendras              3  Stock bajo

Equipo activo
Cocina                          3
Salón                           4
Caja                            1
```

Zona inferior — tareas:

```text
Pendientes de hoy
Reponer leche de almendras
Confirmar proveedor de café
Cerrar caja del turno mañana
```

#### Interacciones reales y limitadas

- seleccionar una mesa;
- abrir su orden;
- aceptar el pedido #184;
- moverlo a Preparando y luego a Listo;
- marcar una tarea como completada;
- abrir la alerta de stock;
- no implementar drag and drop si no queda estable en mobile.

#### Animación automática

1. ingresa el pedido #184;
2. Mesa 02 cambia a `Orden abierta`;
3. comandera muestra el nuevo pedido;
4. stock de Croissant cambia de 12 a 11;
5. cocina recibe una notificación;
6. el pedido pasa a `Preparando`.

---

## 8. Estado 04 — Tus números

### Etiqueta

`04 · TUS NÚMEROS`

### Título

## Mirá cómo funciona tu negocio, sin armar reportes.

### Texto

> Ventas, clientes, productos y tareas importantes reunidos en un dashboard claro para decidir mejor.

### Línea rápida

`Ventas · KPIs · Productos · Rendimiento · Alertas`

### Microbeneficio

`La información importante, lista para usar.`

### Interfaz derecha: Dashboard ejecutivo

No utilizar gráficos decorativos ni números sin contexto.

#### Barra superior

```text
Resumen del negocio
Hoy · Local Palermo
Actualizado hace 1 minuto
```

#### KPIs

```text
Ventas hoy              $1.284.600       +18%
Pedidos                         86       +12%
Ticket promedio            $14.937        +5%
Tiempo de preparación       14 min       -3 min
```

#### Gráfico principal

`Ventas por hora`

- escala temporal de 08:00 a 22:00;
- línea de hoy;
- línea comparativa de ayer;
- tooltip legible;
- pico destacado a las 13:00;
- leyenda y unidades visibles.

#### Bloques secundarios

Productos más vendidos:

```text
Croissant Pistacho       42     $373.800
Iced Matcha              31     $182.900
Focaccia Mortadela       24     $307.200
```

Canales:

```text
Salón                    46%
Retiro                   32%
Delivery                 22%
```

Alertas:

```text
Stock bajo               2 productos
Reservas pendientes      3
Tareas vencidas          1
```

#### Interacciones reales y limitadas

- cambiar período entre Hoy / 7 días / 30 días;
- hacer hover o tap sobre el gráfico;
- filtrar por local;
- abrir una alerta;
- seleccionar un producto y ver su detalle;
- actualizar todos los números de forma coherente al cambiar período.

---

## 9. Cómo demostrar que se adapta a cada negocio

No construir cuatro aplicaciones completas adicionales. Incorporar debajo de la navegación principal una línea de rubros:

```text
Gastronomía · Servicios y turnos · Comercio · Profesionales · Inmobiliarias · Educación · Talleres
```

Al hacer click en un rubro:

- cambian los textos de los 4 estados (título, texto, microbeneficio, línea rápida);
- la interfaz derecha muestra datos de ese rubro (mesas → turnos → pedidos → proyectos);
- la animación automática refleja el flujo de ese negocio.

### Ejemplos de adaptación por rubro

| Rubro | 01 Tu web | 02 Tus clientes | 03 Tu operación | 04 Tus números |
|-------|-----------|-----------------|-----------------|----------------|
| Gastronomía | Menú + Reservas | Bandeja + Fichas | Mesas + Comandas + Stock | Ventas por hora + Productos |
| Servicios | Catálogo + Turnos | Consultas + Historial | Calendario + Equipo | Ocupación + Ingresos |
| Comercio | Catálogo + Carrito | Pedidos + Clientes | Inventario + Envíos | Ventas + Stock crítico |
| Profesionales | Servicios + Contacto | Leads + Proyectos | Kanban + Tareas | Facturación + Pipeline |

---

## 10. Cierre del módulo

### Texto de cierre

> La web atrae y vende.
> La app registra y organiza.
> El dashboard muestra y ayuda a decidir.
> Todo funciona como un solo sistema.

### Sello comercial final

`Tecnología a medida, al alcance de tu negocio.`

### CTA

```text
[Quiero mi diagnóstico gratis]    [Ver cómo funciona en mi rubro]
```

---

## 11. Checklist de implementación

- [ ] Encabezado con eyebrow, título, descripción, sello y navegación 01–04
- [ ] 4 estados con título, texto, línea rápida, microbeneficio
- [ ] 4 interfaces derechas interactivas (web, bandeja, centro, dashboard)
- [ ] Transiciones cross-fade + slide navegación
- [ ] Autoplay 7–9 s con pausa en hover/foco
- [ ] Navegación teclado (1–4, flechas, Tab, Enter)
- [ ] Responsive: tablet (acordeón), mobile (tabs + swipe)
- [ ] Selector de rubro bajo navegación principal
- [ ] Contenido adaptado por rubro (textos + interfaz + animación)
- [ ] Cierre con textos + sello + CTA dual
- [ ] `prefers-reduced-motion` respetado
- [ ] Contraste AA + focus visible

---

## 12. Lo que NO hacer

- No usar íconos genéricos (engranajes, cubos, nubes) en la interfaz derecha.
- No mostrar código, terminales, diagramas de arquitectura.
- No usar “Lorem ipsum” ni datos placeholder sin sentido.
- No animar elementos que no comunican (partículas, ondas, gradientes moviéndose).
- No saturar la interfaz derecha: cada estado muestra UNA vista representativa.
- No repetir el argumento de precio en los 4 estados (solo intro y cierre).
- No llamar “Dashboard” al estado 04 en la navegación (usar “Tus números”).