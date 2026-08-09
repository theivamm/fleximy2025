import { INDUSTRIES } from "./industries"

const WA = "541111111111"

const whatsappSolution = (label) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(
    `Hola, llegué desde la solución de ${label} de Fleximy. Quiero conocer cómo se adaptaría a mi negocio.`
  )}`

const solution = (slug, extra) => {
  const ind = INDUSTRIES.find((i) => i.slug === slug)
  return {
    slug,
    label: ind.label,
    to: ind.to,
    tagline: ind.tagline,
    accent: ind.accent,
    whatsapp: whatsappSolution(ind.label),
    ...extra,
  }
}

export const SOLUCIONES = {
  gastronomia: solution("gastronomia", {
    eyebrow: "Fleximy para gastronomía",
    h1: "Tu menú, tus pedidos y tu operación en un solo lugar",
    hero: "Ofrecé una experiencia rápida a tus clientes y gestioná productos, disponibilidad, reservas y pedidos desde un panel pensado para el ritmo de tu negocio.",
    ctaPrimary: { label: "Ver demo gastronómica", to: "/demos" },
    ctaSecondary: { label: "Solicitar propuesta", to: "/contacto" },
    problema: {
      titulo: "Cuando el menú cambia, todo debería actualizarse al mismo tiempo",
      items: [
        "Cartas impresas desactualizadas.",
        "Consultas repetidas por precios o disponibilidad.",
        "Pedidos recibidos sin estructura.",
        "Reservas repartidas entre mensajes y anotaciones.",
        "Personal que no comparte la misma información.",
      ],
    },
    experiencia: {
      titulo: "La experiencia del cliente",
      lead: "Un menú digital que responde al ritmo del local, sin apps ni descargas.",
      grupos: [
        {
          titulo: "Menú digital adaptado a celulares",
          items: [
            "Categorías y buscador.",
            "Fotografías y descripciones.",
            "Precios y disponibilidad.",
            "Opciones, adicionales y observaciones.",
            "Información de alérgenos cuando corresponda.",
            "Acceso mediante QR o enlace.",
          ],
        },
        {
          titulo: "Reservas y pedidos",
          items: [
            "El cliente puede consultar disponibilidad, reservar o armar un pedido según los módulos contratados.",
          ],
        },
      ],
    },
    panel: {
      titulo: "El panel del negocio",
      lead: "Controlá la información sin rehacer tu web.",
      items: [
        "Crear o editar productos.",
        "Cambiar precios.",
        "Marcar productos agotados.",
        "Destacar promociones.",
        "Gestionar horarios y reservas.",
        "Recibir y actualizar pedidos.",
        "Consultar actividad básica.",
      ],
    },
    modulos: {
      titulo: "Módulos opcionales",
      items: [
        "Gestión de mesas.",
        "Pantalla de cocina.",
        "Take away o delivery propio.",
        "Pagos online.",
        "Clientes frecuentes.",
        "Cupones y promociones.",
        "Múltiples sucursales.",
        "Integración con sistemas externos, sujeta a evaluación.",
      ],
    },
    recorrido: {
      titulo: "Recorrido práctico",
      steps: [
        "El cliente escanea el QR.",
        "Consulta el menú actualizado.",
        "Selecciona productos o solicita una reserva.",
        "La información ingresa al panel.",
        "El equipo confirma y actualiza el estado.",
        "El cliente recibe la respuesta acordada.",
      ],
    },
    audiencia: {
      titulo: "Para quién es",
      items: [
        "Restaurantes.",
        "Cafeterías.",
        "Bares.",
        "Panaderías y pastelerías.",
        "Rotiserías.",
        "Emprendimientos gastronómicos.",
        "Negocios con una o varias sucursales.",
      ],
    },
    faq: [
      {
        q: "¿Puedo usar solamente el menú QR?",
        a: "Sí. La primera versión puede enfocarse en menú y actualización de precios.",
      },
      {
        q: "¿Reemplaza mi sistema de caja?",
        a: "No necesariamente. Se evalúa si Fleximy debe complementarlo, integrarse o cubrir otra parte del proceso.",
      },
      {
        q: "¿Puedo desactivar un producto al instante?",
        a: "Sí, cuando el módulo de catálogo y disponibilidad está incluido.",
      },
      {
        q: "¿Incluye delivery?",
        a: "Puede incluir recepción de pedidos propios. La logística y las integraciones con plataformas externas se definen por separado.",
      },
    ],
    cta: {
      titulo: "Mostrá tu propuesta y gestioná los cambios desde un solo panel",
      primary: { label: "Solicitar diagnóstico gastronómico", to: "/contacto" },
      secondary: { label: "Probar la demo", to: "/demos" },
    },
  }),

  turnos: solution("turnos", {
    eyebrow: "Fleximy para servicios y turnos",
    h1: "Menos mensajes para coordinar. Más tiempo para atender.",
    hero: "Tus clientes pueden elegir servicio, profesional y horario disponible. Tu equipo administra la agenda y el seguimiento desde un panel simple.",
    ctaPrimary: { label: "Probar reserva online", to: "/demos" },
    ctaSecondary: { label: "Ver cómo se adapta", to: "/contacto" },
    problema: {
      titulo: "Coordinar un turno no debería ser una conversación larga",
      items: [
        "Conversaciones largas para encontrar horario.",
        "Dobles reservas.",
        "Cancelaciones sin seguimiento.",
        "Agenda personal y agenda del negocio desconectadas.",
        "Historial repartido en chats.",
        "Clientes que consultan fuera de horario.",
      ],
    },
    experiencia: {
      titulo: "Portal de reservas",
      lead: "Disponible las 24 horas, en el idioma de tu cliente.",
      grupos: [
        {
          titulo: "Reservas desde el sitio",
          items: [
            "Selección de servicio.",
            "Profesional o recurso.",
            "Sede cuando corresponda.",
            "Calendario disponible.",
            "Datos mínimos del cliente.",
            "Confirmación y políticas.",
            "Pago o seña opcional.",
          ],
        },
      ],
    },
    panel: {
      titulo: "Agenda administrativa",
      lead: "Una sola agenda para el negocio completo.",
      items: [
        "Vista diaria, semanal y por profesional.",
        "Alta manual de turnos.",
        "Bloqueos y excepciones.",
        "Reprogramación y cancelación.",
        "Estados del turno.",
        "Información de contacto.",
        "Notas e historial.",
        "Reportes básicos.",
      ],
    },
    automatizaciones: {
      titulo: "Automatizaciones posibles",
      nota: "Los canales, costos y permisos de mensajería deben definirse en cada propuesta.",
      items: [
        "Confirmación inmediata.",
        "Recordatorio previo.",
        "Aviso de reprogramación.",
        "Seguimiento posterior.",
        "Solicitud de reseña.",
        "Recuperación de clientes inactivos.",
      ],
    },
    recorrido: {
      titulo: "Recorrido",
      steps: [
        "El cliente selecciona servicio.",
        "Ve horarios realmente disponibles.",
        "Confirma sus datos.",
        "El turno aparece en la agenda.",
        "El sistema envía las comunicaciones configuradas.",
        "El equipo registra asistencia y seguimiento.",
      ],
    },
    audiencia: {
      titulo: "Casos de uso",
      items: [
        "Peluquerías y barberías.",
        "Centros de estética.",
        "Estudios y consultoras.",
        "Entrenadores y centros deportivos.",
        "Servicios técnicos con visita.",
        "Profesionales independientes.",
        "Espacios y recursos reservables.",
      ],
    },
    faq: [
      {
        q: "¿Puedo tener varios profesionales?",
        a: "Sí. El alcance define cantidad de agendas, sedes y reglas de disponibilidad.",
      },
      {
        q: "¿Puedo cobrar una seña?",
        a: "Sí, mediante una pasarela compatible y sujeto a sus cargos y condiciones.",
      },
      {
        q: "¿Los clientes necesitan crear una cuenta?",
        a: "No necesariamente. La reserva puede diseñarse con el menor nivel de fricción adecuado.",
      },
      {
        q: "¿Puedo cargar turnos recibidos por teléfono?",
        a: "Sí. El equipo puede registrar reservas manuales desde el panel.",
      },
    ],
    cta: {
      titulo: "Convertí tu agenda en una experiencia simple para todos",
      primary: { label: "Solicitar diagnóstico", to: "/contacto" },
      secondary: { label: "Probar demo de turnos", to: "/demos" },
    },
  }),

  gestion: solution("pymes", {
    eyebrow: "Fleximy para gestión",
    h1: "Tu equipo necesita un lugar común para saber qué sigue",
    hero: "Reuní clientes, proyectos, tareas, responsables, archivos y vencimientos en una plataforma configurada alrededor de tu forma de trabajar.",
    ctaPrimary: { label: "Probar gestor de proyectos", to: "/demos" },
    ctaSecondary: { label: "Analizar mi operación", to: "/contacto" },
    problema: {
      titulo: "Cuando el avance vive en cabezas y chats",
      items: [
        "Tareas distribuidas entre chats, mails y planillas.",
        "Seguimientos que dependen de una persona.",
        "Falta de claridad sobre responsables y vencimientos.",
        "Clientes que preguntan constantemente por avances.",
        "Documentos difíciles de encontrar.",
        "Reuniones usadas solamente para reconstruir el estado.",
      ],
    },
    experiencia: {
      titulo: "Centro de gestión",
      lead: "Clientes, proyectos y comunicación con el cliente en un mismo sistema.",
      grupos: [
        {
          titulo: "Clientes y oportunidades",
          items: [
            "Datos de contacto.",
            "Origen y responsable.",
            "Etapa comercial.",
            "Próxima acción.",
            "Notas y actividad.",
          ],
        },
        {
          titulo: "Proyectos y tareas",
          items: [
            "Tableros por estado.",
            "Responsables.",
            "Prioridades.",
            "Fechas y vencimientos.",
            "Dependencias simples.",
            "Archivos y comentarios.",
            "Plantillas de procesos repetitivos.",
          ],
        },
        {
          titulo: "Portal del cliente",
          items: [
            "Avances seleccionados.",
            "Entregables.",
            "Archivos.",
            "Próximos hitos.",
            "Solicitudes y aprobaciones según alcance.",
          ],
        },
      ],
    },
    reportes: {
      titulo: "Reportes útiles",
      nota: "No prometemos inteligencia avanzada ni predicción: mostramos lo que el panel ya registra.",
      items: [
        "Trabajo por estado.",
        "Tareas vencidas.",
        "Carga por responsable.",
        "Proyectos activos.",
        "Próximas entregas.",
        "Actividad comercial.",
      ],
    },
    recorrido: {
      titulo: "Recorrido",
      steps: [
        "Una consulta ingresa desde el sitio.",
        "Se asigna responsable y etapa.",
        "Al cerrar la oportunidad se crea el proyecto.",
        "El equipo trabaja con tareas y vencimientos.",
        "El cliente recibe visibilidad acordada.",
        "Los responsables revisan el estado desde un tablero común.",
      ],
    },
    audiencia: {
      titulo: "Para quién es",
      items: [
        "Agencias.",
        "Estudios profesionales.",
        "Consultoras.",
        "Empresas de mantenimiento.",
        "Equipos comerciales.",
        "Proveedores B2B.",
        "Operaciones que trabajan por proyectos o servicios recurrentes.",
      ],
    },
    faq: [
      {
        q: "¿Fleximy reemplaza ClickUp, Trello o un CRM?",
        a: "Puede reemplazar una parte o integrarse al proceso. El diagnóstico determina qué conviene mantener.",
      },
      {
        q: "¿Puedo definir mis propios estados?",
        a: "Sí, dentro de las posibilidades del módulo contratado.",
      },
      {
        q: "¿Los clientes ven toda la información interna?",
        a: "No. Los permisos y el portal determinan qué información puede consultar cada perfil.",
      },
      {
        q: "¿Se pueden importar planillas?",
        a: "Sí, sujeto a revisión de formato, calidad y volumen de datos.",
      },
    ],
    cta: {
      titulo: "Ordená la operación sin sumar otra herramienta genérica",
      primary: { label: "Solicitar diagnóstico de gestión", to: "/contacto" },
      secondary: { label: "Probar la demo", to: "/demos" },
    },
  }),

  comercio: solution("comercio", {
    eyebrow: "Fleximy para comercio",
    h1: "Tu catálogo actualizado y tus consultas listas para gestionar",
    hero: "Mostrá productos con una experiencia profesional y controlá precios, disponibilidad, consultas y pedidos desde el mismo sistema.",
    ctaPrimary: { label: "Ver demo de comercio", to: "/demos" },
    ctaSecondary: { label: "Solicitar propuesta", to: "/contacto" },
    problema: {
      titulo: "Cuando cada canal dice algo distinto",
      items: [
        "Precios distintos entre canales.",
        "Productos publicados sin stock.",
        "Consultas sin contexto por WhatsApp.",
        "Catálogos difíciles de actualizar.",
        "Pedidos anotados manualmente.",
        "Poca información sobre qué interesa a los clientes.",
      ],
    },
    experiencia: {
      titulo: "Experiencia de compra o consulta",
      lead: "Una ficha de producto que se mantiene coherente con tu operación.",
      grupos: [
        {
          titulo: "Ficha y catálogo",
          items: [
            "Categorías y filtros.",
            "Buscador.",
            "Fichas de producto.",
            "Variantes.",
            "Stock o disponibilidad.",
            "Consulta con producto identificado.",
            "Carrito o solicitud de presupuesto.",
            "Pago online si corresponde.",
          ],
        },
      ],
    },
    panel: {
      titulo: "Panel comercial",
      lead: "Todo lo que se ve en la web se controla desde acá.",
      items: [
        "Alta y edición de productos.",
        "Precios y promociones.",
        "Disponibilidad.",
        "Categorías y destacados.",
        "Consultas recibidas.",
        "Pedidos y estados.",
        "Clientes.",
        "Reportes básicos de interés y operación.",
      ],
    },
    modalidades: {
      titulo: "Modalidades posibles",
      nota: "Cada modalidad tiene un alcance y complejidad diferentes.",
      items: [
        {
          titulo: "Catálogo con WhatsApp",
          detalle: "Para negocios que cierran la venta de manera asistida.",
        },
        {
          titulo: "Catálogo con solicitud de presupuesto",
          detalle: "Para productos con precio variable, configuración o venta B2B.",
        },
        {
          titulo: "Ecommerce",
          detalle: "Para operaciones con carrito, pago y reglas comerciales definidas.",
        },
      ],
    },
    integraciones: {
      titulo: "Integraciones",
      items: [
        "Mercado Pago u otras pasarelas compatibles.",
        "WhatsApp.",
        "Carga desde planilla.",
        "Sistemas de stock o facturación, sujetos a disponibilidad técnica.",
        "Herramientas de analítica.",
      ],
    },
    audiencia: {
      titulo: "Para quién es",
      items: [
        "Locales minoristas.",
        "Showrooms.",
        "Distribuidores.",
        "Comercios B2B.",
        "Emprendimientos con catálogo.",
        "Negocios con venta asistida.",
      ],
    },
    faq: [
      {
        q: "¿Necesito vender online?",
        a: "No. Podés comenzar con catálogo y consultas identificadas.",
      },
      {
        q: "¿Puedo actualizar precios desde el celular?",
        a: "Sí, siempre que el panel y el permiso del usuario lo permitan.",
      },
      {
        q: "¿Fleximy controla el stock físico?",
        a: "Puede gestionar stock simple. Operaciones complejas o sincronización con otros sistemas requieren evaluación.",
      },
      {
        q: "¿Hay comisión por venta?",
        a: "Fleximy debe informar su política. Las pasarelas de pago pueden cobrar sus propias comisiones.",
      },
    ],
    cta: {
      titulo: "Hacé que tu catálogo trabaje conectado con tu operación",
      primary: { label: "Solicitar diagnóstico comercial", to: "/contacto" },
      secondary: { label: "Probar demo", to: "/demos" },
    },
  }),

  inmobiliarias: solution("inmobiliarias", {
    eyebrow: "Fleximy para inmobiliarias",
    h1: "De la búsqueda de una propiedad al seguimiento comercial",
    hero: "Un portal rápido para quienes buscan y un panel ordenado para quienes venden, alquilan y coordinan visitas.",
    ctaPrimary: { label: "Ver demo inmobiliaria", to: "/demos" },
    ctaSecondary: { label: "Solicitar propuesta", to: "/contacto" },
    problema: {
      titulo: "Cuando las consultas no saben de qué propiedad hablan",
      items: [
        "Propiedades duplicadas o desactualizadas.",
        "Consultas que llegan sin identificar el inmueble.",
        "Leads repartidos entre portales y WhatsApp.",
        "Seguimientos sin próxima acción.",
        "Visitas coordinadas manualmente.",
        "Poca visibilidad sobre demanda y disponibilidad.",
      ],
    },
    experiencia: {
      titulo: "Portal de propiedades",
      lead: "Un buscador que filtra y una consulta que llega con contexto.",
      grupos: [
        {
          titulo: "Búsqueda y ficha",
          items: [
            "Búsqueda por operación.",
            "Tipo y ubicación.",
            "Rango de precio.",
            "Características.",
            "Fotografías y ficha.",
            "Estado de disponibilidad.",
            "Consulta asociada al inmueble.",
            "Solicitud de visita.",
          ],
        },
      ],
    },
    panel: {
      titulo: "CRM inmobiliario",
      lead: "Cada consulta llega identificada, con propiedad y próxima acción.",
      items: [
        "Contacto y datos principales.",
        "Propiedad de interés.",
        "Operación y presupuesto.",
        "Zona.",
        "Estado comercial.",
        "Temperatura o prioridad.",
        "Responsable.",
        "Último contacto y próxima acción.",
        "Notas e historial.",
      ],
    },
    agenda: {
      titulo: "Agenda de visitas",
      items: [
        "Fecha y horario.",
        "Propiedad.",
        "Cliente.",
        "Asesor.",
        "Estado y resultado.",
        "Recordatorios según configuración.",
      ],
    },
    gestion: {
      titulo: "Gestión de propiedades",
      items: [
        "Alta y edición.",
        "Estado disponible, reservada o cerrada.",
        "Datos comerciales.",
        "Material multimedia.",
        "Destacados.",
        "Asignación de asesor.",
        "Importación o integración, sujeta a evaluación.",
      ],
    },
    recorrido: {
      titulo: "Recorrido",
      steps: [
        "La persona filtra propiedades.",
        "Envía una consulta contextualizada.",
        "El lead ingresa al CRM.",
        "Un asesor realiza seguimiento.",
        "Se agenda y registra la visita.",
        "La oportunidad avanza hasta cierre o descarte.",
      ],
    },
    faq: [
      {
        q: "¿Se integra con portales inmobiliarios?",
        a: "Depende de las APIs y condiciones de cada portal. Se evalúa en el alcance.",
      },
      {
        q: "¿Puedo importar una planilla de propiedades o leads?",
        a: "Sí, luego de revisar formato, campos, duplicados y volumen.",
      },
      {
        q: "¿Cada asesor puede ver sus contactos?",
        a: "Los permisos pueden configurarse según el alcance del módulo.",
      },
      {
        q: "¿Incluye tasaciones?",
        a: "Puede incorporarse un formulario de captación. Un proceso técnico de tasación requiere definición adicional.",
      },
    ],
    cta: {
      titulo: "Convertí tu web inmobiliaria en una herramienta comercial",
      primary: { label: "Solicitar diagnóstico inmobiliario", to: "/contacto" },
      secondary: { label: "Pedir una demo", to: "/demos" },
    },
  }),

  educacion: solution("educacion", {
    eyebrow: "Fleximy para educación",
    h1: "Tu propuesta educativa y la gestión de alumnos, conectadas",
    hero: "Publicá cursos, recibí inscripciones y organizá la experiencia de estudiantes y equipo desde una sola plataforma.",
    ctaPrimary: { label: "Solicitar demo educativa", to: "/demos" },
    ctaSecondary: { label: "Analizar mi proyecto", to: "/contacto" },
    problema: {
      titulo: "Cuando la oferta está dispersa y el seguimiento también",
      items: [
        "Información de cursos dispersa.",
        "Inscripciones cargadas manualmente.",
        "Alumnos que no encuentran materiales.",
        "Seguimientos repartidos en distintas herramientas.",
        "Dificultad para conocer avances y pendientes.",
      ],
    },
    experiencia: {
      titulo: "Sitio académico",
      lead: "Una oferta clara, con inscripción y datos organizados.",
      grupos: [
        {
          titulo: "Oferta y catálogo",
          items: [
            "Catálogo de cursos.",
            "Fechas, modalidad y docentes.",
            "Programas y requisitos.",
            "Formularios de inscripción.",
            "Pagos cuando corresponda.",
            "Preguntas frecuentes.",
          ],
        },
      ],
    },
    portal: {
      titulo: "Portal del estudiante",
      nota: "Según el alcance:",
      items: [
        "Cursos activos.",
        "Clases o contenidos.",
        "Materiales descargables.",
        "Progreso.",
        "Tareas y entregas.",
        "Comunicaciones.",
        "Certificados.",
      ],
    },
    panel: {
      titulo: "Panel administrativo",
      lead: "Cursos, cupos, alumnos y docentes en un solo lugar.",
      items: [
        "Cursos y ediciones.",
        "Cupos y fechas.",
        "Inscripciones.",
        "Alumnos y estados.",
        "Contenidos.",
        "Docentes.",
        "Seguimiento básico.",
        "Reportes.",
      ],
    },
    modalidades: {
      titulo: "Modalidades",
      nota: "La transmisión de video, evaluación avanzada y certificaciones automáticas deben definirse como módulos específicos.",
      items: [
        "Academia con inscripción presencial.",
        "Cursos en vivo.",
        "Formación híbrida.",
        "Biblioteca de contenidos.",
        "Programa interno de capacitación.",
      ],
    },
    recorrido: {
      titulo: "Secuencia",
      steps: [
        "La persona ve la oferta académica.",
        "Se inscribe desde el formulario.",
        "Recibe el acceso al curso.",
        "Encuentra contenidos y tareas.",
        "El equipo registra avances y pendientes.",
      ],
    },
    faq: [
      {
        q: "¿Fleximy es un campus virtual completo?",
        a: "Puede configurarse como portal educativo modular. El alcance depende de las funciones realmente necesarias.",
      },
      {
        q: "¿Puedo cobrar cursos online?",
        a: "Sí, mediante una pasarela compatible.",
      },
      {
        q: "¿Puedo migrar alumnos?",
        a: "Sí, sujeto a revisión y tratamiento responsable de los datos.",
      },
      {
        q: "¿Cada docente tiene acceso propio?",
        a: "Puede configurarse con roles y permisos según la solución acordada.",
      },
    ],
    cta: {
      titulo: "Construí una experiencia más clara para alumnos y equipo",
      primary: { label: "Solicitar diagnóstico educativo", to: "/contacto" },
      secondary: { label: "Ver otras soluciones", to: "/soluciones" },
    },
  }),

  talleres: solution("talleres", {
    eyebrow: "Fleximy para talleres",
    h1: "Cada trabajo con un estado claro. Cada cliente mejor informado.",
    hero: "Registrá ingresos, presupuestos, tareas, repuestos y entregas. Permití que el cliente conozca el avance sin llamar constantemente.",
    ctaPrimary: { label: "Ver demo de órdenes", to: "/demos" },
    ctaSecondary: { label: "Solicitar propuesta", to: "/contacto" },
    problema: {
      titulo: "Cuando cada trabajo vive en un papel o en un chat",
      items: [
        "Órdenes en papel o chats.",
        "Presupuestos difíciles de rastrear.",
        "Clientes que consultan el estado repetidamente.",
        "Repuestos sin asociación clara al trabajo.",
        "Falta de historial por cliente, vehículo o equipo.",
        "Entregas y pendientes sin visibilidad.",
      ],
    },
    recepcion: {
      titulo: "Recepción y orden de trabajo",
      lead: "Todo lo que entra queda registrado desde el primer momento.",
      items: [
        "Datos del cliente.",
        "Equipo, vehículo o producto.",
        "Motivo de ingreso.",
        "Estado inicial.",
        "Fotografías y observaciones.",
        "Responsable.",
        "Fecha estimada.",
      ],
    },
    presupuesto: {
      titulo: "Diagnóstico y presupuesto",
      items: [
        "Tareas necesarias.",
        "Mano de obra.",
        "Repuestos.",
        "Total y vigencia.",
        "Aprobación o rechazo según configuración.",
        "Registro de cambios.",
      ],
    },
    estados: {
      titulo: "Seguimiento de reparación",
      nota: "Los estados se adaptan al proceso real.",
      items: [
        "Recibido.",
        "En diagnóstico.",
        "Presupuesto enviado.",
        "Aprobado.",
        "En reparación.",
        "En espera de repuesto.",
        "Listo para retirar.",
        "Entregado.",
      ],
    },
    portal: {
      titulo: "Portal o consulta del cliente",
      nota: "No exponer notas internas ni datos de terceros.",
      items: [
        "Estado actual.",
        "Última actualización.",
        "Presupuesto.",
        "Acciones requeridas.",
        "Canal de contacto.",
      ],
    },
    inventario: {
      titulo: "Inventario básico",
      nota: "Para inventarios contables o multidepósito se requiere evaluación específica.",
      items: [
        "Repuestos.",
        "Código y descripción.",
        "Cantidad.",
        "Movimientos asociados.",
        "Alertas simples.",
      ],
    },
    audiencia: {
      titulo: "Para quién es",
      items: [
        "Talleres mecánicos.",
        "Servicios técnicos.",
        "Reparación de electrónica.",
        "Mantenimiento de equipos.",
        "Bicicleterías.",
        "Empresas con órdenes de servicio.",
      ],
    },
    faq: [
      {
        q: "¿El cliente necesita instalar una aplicación?",
        a: "No. Puede consultar desde un enlace web adaptado a celulares.",
      },
      {
        q: "¿Puedo adjuntar fotos?",
        a: "Sí, cuando el almacenamiento de archivos está incluido.",
      },
      {
        q: "¿Puedo controlar repuestos?",
        a: "Sí para inventario operativo simple. Procesos complejos deben relevarse.",
      },
      {
        q: "¿Se pueden enviar notificaciones automáticas?",
        a: "Sí, según canales habilitados, consentimiento y costos de terceros.",
      },
    ],
    cta: {
      titulo: "Ordená cada trabajo desde el ingreso hasta la entrega",
      primary: { label: "Solicitar diagnóstico de taller", to: "/contacto" },
      secondary: { label: "Pedir demo", to: "/demos" },
    },
  }),
}
