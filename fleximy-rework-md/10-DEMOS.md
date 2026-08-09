# Página: Demos

## Objetivo

Demostrar el producto con experiencias funcionales, reducir incertidumbre y generar solicitudes de demo personalizada.

## SEO

- **URL:** `/demos`
- **Title:** Demos interactivas de Fleximy | Probá la plataforma
- **Meta description:** Probá cómo funciona Fleximy para clientes y equipos. Explorá demos de reservas, pedidos, proyectos, catálogos y gestión.
- **H1:** Probá Fleximy antes de imaginarlo

## Hero

**Eyebrow:** DEMOS INTERACTIVAS

# Probá Fleximy antes de imaginarlo

Recorré una experiencia realista desde la mirada de un cliente y desde el panel de quien gestiona el negocio.

> Las demos utilizan información ficticia y muestran configuraciones de ejemplo. La solución final se adapta al alcance de cada proyecto.

## Selector de demos

Filtros:

- Todas.
- Gastronomía.
- Turnos.
- Gestión.
- Comercio.
- Inmobiliarias.
- Educación.
- Talleres.

Cada demo debe mostrar estado real: **Disponible**, **Recorrido guiado** o **Próximamente**.

## Demo: Gastronomía

### Experiencia cliente

**Título:** Consultá el menú y armá un pedido

Acciones mínimas:

1. Filtrar categorías.
2. Abrir un producto.
3. Agregar al pedido.
4. Añadir una observación.
5. Enviar o simular pedido.

CTA: Abrir vista cliente

### Experiencia negocio

**Título:** Actualizá el menú y gestioná pedidos

Acciones mínimas:

1. Cambiar disponibilidad.
2. Modificar precio de ejemplo.
3. Recibir un pedido simulado.
4. Cambiar su estado.

CTA: Abrir panel gastronómico

## Demo: Servicios y Turnos

### Experiencia cliente

Elegir servicio, profesional, fecha y horario; confirmar una reserva simulada.

CTA: Reservar un turno de prueba

### Experiencia negocio

Ver agenda, bloquear horario, reprogramar y acceder al historial ficticio del cliente.

CTA: Abrir agenda profesional

## Demo: Gestión y Proyectos

### Experiencia cliente

Consultar avances, archivos, próximas entregas y dejar un comentario simulado.

CTA: Abrir portal del cliente

### Experiencia equipo

Mover tareas, asignar responsable, cambiar fecha y revisar actividad.

CTA: Abrir gestor de proyectos

## Demos complementarias

Crear experiencias equivalentes para:

- Comercio: catálogo + gestión de producto y stock.
- Inmobiliaria: búsqueda + CRM y visita.
- Educación: aula + panel de estudiante.
- Taller: consulta de orden + actualización de estado.

Hasta que estén desarrolladas, mostrar una captura, funcionalidades y CTA **Solicitar demo personalizada**. No presentar botones sin acción.

## Recorrido guiado

## ¿Preferís que te lo mostremos?

Reservá una videollamada breve. Tomamos un caso parecido a tu negocio y recorremos la experiencia completa.

CTA: Agendar demostración

## Requisitos funcionales

- Todos los botones deben abrir una interacción o página real.
- Reiniciar datos al finalizar cada sesión.
- Identificar claramente que no se está generando una compra o reserva real.
- Medir inicio, interacción principal, finalización y CTA posterior.
- Ofrecer salida visible de la demo.
- Garantizar experiencia mobile.
- No pedir registro antes de probar.

## CTA final

## ¿Querés ver Fleximy con la lógica de tu negocio?

Contanos tu rubro, herramientas actuales y principal problema operativo. Preparamos una demostración enfocada en tu caso.

CTA primario: Solicitar demo personalizada  
CTA secundario: Ver soluciones

## Dirección visual y animación

Esta debe ser la página más demostrativa del sitio. Diseñar un “laboratorio Fleximy” con selector de rubro, conmutador Cliente/Equipo y una superficie central donde se cargan interfaces HTML/CSS reales.

- Transiciones GSAP entre demos sin recargar toda la página.
- El cambio de modo Cliente/Equipo conserva el mismo dato para mostrar la conexión.
- Punteros, ayudas y pasos guiados aparecen solo cuando el usuario los solicita.
- Las acciones deben modificar estados reales de la demo, no reproducir una animación pregrabada.
- Usar un marco de dispositivo únicamente cuando agrega contexto; no encerrar todos los paneles en laptops 3D.
- Incorporar botón “Reiniciar demo” y estado de avance.

La estética puede ser más experimental que el resto del sitio, pero la interacción debe seguir siendo obvia. Reducir animación y complejidad en dispositivos modestos.
