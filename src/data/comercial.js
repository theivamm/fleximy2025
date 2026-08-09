export const ETAPAS = [
  {
    n: "01",
    titulo: "Diagnóstico",
    resumen: "Entendemos cómo trabajás hoy antes de proponer nada.",
    detalle: "Qué hacemos",
    items: [
      "Entrevista de relevamiento.",
      "Mapa de herramientas actuales.",
      "Identificación de usuarios y responsabilidades.",
      "Detección de tareas manuales y puntos críticos.",
      "Priorización del primer problema a resolver.",
    ],
    recibis: [
      "Resumen del proceso actual.",
      "Recomendación de solución.",
      "Módulos sugeridos.",
      "Alcance de primera versión.",
      "Presupuesto y plazo estimado.",
    ],
    recibisTitulo: "Qué recibís",
  },
  {
    n: "02",
    titulo: "Definición",
    resumen: "Acordamos el alcance por escrito antes de configurar.",
    detalle: "Qué acordamos",
    items: [
      "Páginas públicas.",
      "Módulos del panel.",
      "Campos y estados.",
      "Usuarios y permisos.",
      "Integraciones.",
      "Contenido y carga inicial.",
      "Criterios de aceptación.",
    ],
    nota: "El alcance se valida por escrito antes de comenzar.",
  },
  {
    n: "03",
    titulo: "Configuración",
    resumen: "Construimos la base sobre la plataforma modular.",
    detalle: "Qué configuramos",
    items: [
      "Identidad visual.",
      "Dominio y entorno.",
      "Estructura de contenidos.",
      "Datos iniciales acordados.",
      "Automatizaciones incluidas.",
      "Accesos y roles.",
      "Analítica básica.",
    ],
    nota: "El cliente designa una persona responsable para validar materiales y decisiones.",
  },
  {
    n: "04",
    titulo: "Revisión",
    resumen: "Probamos todo antes de publicar.",
    detalle: "Qué revisamos",
    items: [
      "Revisión funcional.",
      "Correcciones dentro del alcance.",
      "Pruebas en desktop y mobile.",
      "Validación de formularios e integraciones.",
      "Aprobación para publicación.",
    ],
  },
  {
    n: "05",
    titulo: "Lanzamiento",
    resumen: "Publicamos, capacitamos y acompañamos los primeros usos.",
    detalle: "Qué incluimos",
    items: [
      "Publicación.",
      "Capacitación inicial.",
      "Entrega de accesos.",
      "Documentación esencial.",
      "Seguimiento de primeros usos.",
    ],
  },
  {
    n: "06",
    titulo: "Soporte y evolución",
    resumen: "Seguimos administrando la infraestructura y acompañando al equipo.",
    detalle: "Incluye según plan",
    items: [
      "Soporte funcional.",
      "Mantenimiento correctivo.",
      "Actualizaciones de plataforma.",
      "Seguimiento de incidentes.",
      "Revisión periódica de necesidades.",
    ],
    nota: "Los nuevos módulos, integraciones o cambios que amplíen el alcance se evalúan y presupuestan antes de implementarse.",
  },
]

export const FACTORES_PLAZO = [
  "Entrega de contenido.",
  "Cantidad de datos iniciales.",
  "Integraciones.",
  "Disponibilidad para validar.",
  "Complejidad de permisos y procesos.",
]

export const RESPONSABILIDADES = {
  fleximy: [
    "Relevar y documentar.",
    "Configurar lo acordado.",
    "Probar y corregir.",
    "Capacitar.",
    "Operar el soporte contratado.",
  ],
  cliente: [
    "Entregar información válida.",
    "Designar responsables.",
    "Validar decisiones y contenidos.",
    "Respetar condiciones de uso.",
    "Proteger sus accesos.",
  ],
}

export const PLANES = [
  {
    id: "esencial",
    nombre: "Esencial",
    para: "Para negocios que necesitan profesionalizar una función principal.",
    precio: "[PRECIO ESENCIAL]",
    precioNota: "ARS + IVA / mes",
    destacado: false,
    items: [
      "Sitio web de alcance definido.",
      "Un módulo operativo principal.",
      "Usuarios incluidos: [DEFINIR].",
      "Configuración inicial base.",
      "Hosting y SSL.",
      "Capacitación inicial.",
      "Soporte estándar.",
    ],
    cta: "Consultar por Esencial",
  },
  {
    id: "operacion",
    nombre: "Operación",
    para: "Para PyMEs que necesitan conectar varias áreas.",
    precio: "[PRECIO OPERACIÓN]",
    precioNota: "ARS + IVA / mes",
    destacado: false,
    items: [
      "Sitio web comercial ampliado.",
      "Hasta [DEFINIR] módulos.",
      "CRM o gestión de clientes.",
      "Automatizaciones incluidas según alcance.",
      "Usuarios incluidos: [DEFINIR].",
      "Reportes operativos.",
      "Soporte prioritario.",
    ],
    cta: "Consultar por Operación",
  },
  {
    id: "a-medida",
    nombre: "A medida",
    para: "Para operaciones con integraciones, migraciones o requisitos especiales.",
    precio: "Cotización personalizada",
    precioNota: "",
    destacado: false,
    items: [
      "Arquitectura específica.",
      "Integraciones avanzadas.",
      "Migración de información.",
      "Permisos y flujos complejos.",
      "Implementación por etapas.",
      "Acuerdo de soporte específico.",
    ],
    cta: "Solicitar diagnóstico",
  },
]

export const INCLUYE_SUBSCRIPCION = [
  "Uso de los módulos contratados.",
  "Hosting de la plataforma.",
  "Certificado SSL.",
  "Mantenimiento correctivo.",
  "Actualizaciones generales.",
  "Soporte según nivel.",
  "Respaldo de información según política vigente.",
]

export const COSTOS_ADICIONALES = [
  "Dominio.",
  "Consumo de servicios de terceros.",
  "Comisiones de pasarelas de pago.",
  "Mensajería de WhatsApp o SMS.",
  "Migraciones complejas.",
  "Carga masiva extraordinaria.",
  "Desarrollo fuera del alcance.",
  "Capacitación adicional.",
]

export const COMPARACION = [
  {
    situacion: "Sitio y hosting",
    separadas: "Proveedores separados",
    fleximy: "Integrado",
  },
  {
    situacion: "Agenda, CRM o tareas",
    separadas: "Suscripciones adicionales",
    fleximy: "Según módulos",
  },
  {
    situacion: "Actualizaciones",
    separadas: "Dependencia o trabajo manual",
    fleximy: "Panel autogestionable",
  },
  {
    situacion: "Soporte",
    separadas: "Múltiples contactos",
    fleximy: "Un canal responsable",
  },
  {
    situacion: "Información",
    separadas: "Dispersa",
    fleximy: "Centralizada",
  },
]

export const MENSAJE_COMPARACION =
  "El ahorro no depende solamente del valor de las herramientas. También surge del tiempo operativo, los errores evitados y la posibilidad de trabajar con información centralizada."

export const PRECIO_FAQ = [
  {
    q: "¿El precio se actualiza?",
    a: "La política de actualización, periodicidad y comunicación queda indicada en la propuesta y en los términos del servicio.",
  },
  {
    q: "¿Hay permanencia mínima?",
    a: "[RESPUESTA CONTRACTUAL VALIDADA].",
  },
  {
    q: "¿Puedo cambiar de plan?",
    a: "Sí, sujeto a la disponibilidad, alcance y configuración de los nuevos módulos.",
  },
  {
    q: "¿Qué sucede si cancelo?",
    a: "El acceso y la exportación de datos se rigen por los términos del servicio. Conocé el procedimiento antes de contratar.",
  },
  {
    q: "¿Mercado Pago y WhatsApp están incluidos?",
    a: "La integración puede estar incluida, pero los cargos o condiciones del proveedor externo no forman parte de la suscripción de Fleximy salvo indicación expresa.",
  },
]

export const PRINCIPIOS = [
  {
    titulo: "Simplicidad útil",
    texto:
      "Una función no es valiosa por ser sofisticada, sino porque el equipo puede incorporarla a su trabajo cotidiano.",
  },
  {
    titulo: "Alcance claro",
    texto:
      "Definimos qué incluye cada proyecto, qué necesita validación y qué puede incorporarse después.",
  },
  {
    titulo: "Adaptación responsable",
    texto:
      "Personalizamos identidad, datos y procesos sin prometer que cualquier desarrollo entra dentro de una configuración estándar.",
  },
  {
    titulo: "Acompañamiento humano",
    texto:
      "La implementación incluye conversaciones, capacitación y soporte. La tecnología no reemplaza la necesidad de entender al negocio.",
  },
  {
    titulo: "Evolución gradual",
    texto:
      "Preferimos lanzar una primera versión útil, medir su adopción y sumar módulos con una prioridad real.",
  },
]

export const COMO_TRABAJAMOS = [
  "Escuchamos antes de proponer.",
  "Priorizamos problemas concretos.",
  "Documentamos el alcance.",
  "Diseñamos para usuarios reales.",
  "Acompañamos la adopción.",
  "Mejoramos con evidencia.",
]

export const FAQ_CATEGORIAS = [
  {
    id: "general",
    nombre: "General",
    preguntas: [
      {
        q: "¿Qué es Fleximy?",
        a: "Es una plataforma para PyMEs que conecta un sitio web profesional con un panel privado de gestión. Los módulos se seleccionan según la operación de cada empresa.",
      },
      {
        q: "¿Es una web o un sistema?",
        a: "Es ambas cosas. La parte pública atiende las necesidades de clientes y visitantes; el panel interno permite gestionar información y procesos.",
      },
      {
        q: "¿Es un desarrollo completamente desde cero?",
        a: "Fleximy parte de una plataforma modular. Adaptamos identidad, estructura, información y procesos acordados. Las funciones exclusivas o integraciones especiales se evalúan por separado.",
      },
      {
        q: "¿Para qué rubros sirve?",
        a: "Actualmente existen bases para gastronomía, servicios y turnos, gestión de PyMEs, comercio, inmobiliarias, educación y talleres. Los módulos pueden combinarse.",
      },
    ],
  },
  {
    id: "implementacion",
    nombre: "Implementación",
    preguntas: [
      {
        q: "¿Cuánto demora la puesta en marcha?",
        a: "Depende de módulos, contenido, migración e integraciones. Una implementación base puede comenzar desde [PLAZO VALIDADO], contado desde la recepción de materiales y aprobación del alcance.",
      },
      {
        q: "¿Qué información tengo que entregar?",
        a: "Identidad visual, textos, imágenes, productos o servicios, usuarios iniciales y reglas esenciales del proceso. El listado exacto se entrega al iniciar.",
      },
      {
        q: "¿Quién carga la información?",
        a: "La carga inicial incluida queda definida en la propuesta. Luego, el equipo puede administrar la información habilitada desde el panel.",
      },
      {
        q: "¿Incluye capacitación?",
        a: "Sí, la implementación base contempla una instancia inicial. Capacitaciones adicionales pueden cotizarse.",
      },
    ],
  },
  {
    id: "uso",
    nombre: "Uso",
    preguntas: [
      {
        q: "¿Necesito saber programar?",
        a: "No. Las tareas frecuentes se realizan desde interfaces diseñadas para usuarios no técnicos.",
      },
      {
        q: "¿Funciona desde el celular?",
        a: "El sitio público es responsive y las funciones prioritarias del panel son utilizables desde dispositivos móviles. La compatibilidad exacta se valida por módulo.",
      },
      {
        q: "¿Puedo tener varios usuarios?",
        a: "Sí. La cantidad, roles y permisos dependen del plan y el alcance.",
      },
      {
        q: "¿Puedo comenzar con una función y sumar otras?",
        a: "Sí. Es la estrategia recomendada para facilitar la adopción y controlar la inversión.",
      },
    ],
  },
  {
    id: "integraciones",
    nombre: "Integraciones",
    preguntas: [
      {
        q: "¿Se conecta con WhatsApp?",
        a: "Puede incluir enlaces, consultas contextualizadas y automatizaciones compatibles. La API oficial, plantillas y cargos de Meta requieren configuración específica.",
      },
      {
        q: "¿Se integra con Mercado Pago?",
        a: "Puede integrarse cuando el flujo lo requiera. Las comisiones y condiciones pertenecen al proveedor de pagos.",
      },
      {
        q: "¿Puede conectarse con mi sistema actual?",
        a: "Depende de que el sistema ofrezca una integración técnica viable. Se analiza antes de presupuestar.",
      },
    ],
  },
  {
    id: "precio",
    nombre: "Precio y contrato",
    preguntas: [
      {
        q: "¿Cuál es el precio?",
        a: "Se define según módulos, usuarios, volumen e integraciones. La página de precios muestra los niveles y conceptos principales.",
      },
      {
        q: "¿Hay costo de implementación?",
        a: "[RESPUESTA COMERCIAL VALIDADA].",
      },
      {
        q: "¿El precio se actualiza?",
        a: "[POLÍTICA DE ACTUALIZACIÓN VALIDADA].",
      },
      {
        q: "¿Puedo cancelar?",
        a: "Las condiciones, preaviso y acceso a datos figuran en la propuesta y en los términos.",
      },
    ],
  },
  {
    id: "datos",
    nombre: "Datos y seguridad",
    preguntas: [
      {
        q: "¿A quién pertenecen mis datos?",
        a: "Los datos de negocio aportados por el cliente siguen siendo del cliente, sujeto a los términos, responsabilidades legales y servicios de terceros.",
      },
      {
        q: "¿Puedo exportar información?",
        a: "La disponibilidad, formato y procedimiento de exportación se definen por módulo y en los términos del servicio.",
      },
      {
        q: "¿Realizan copias de respaldo?",
        a: "Sí, según la política técnica publicada y el alcance del servicio. La frecuencia, retención y limitaciones reales se indican en la propuesta.",
      },
    ],
  },
  {
    id: "soporte",
    nombre: "Soporte",
    preguntas: [
      {
        q: "¿Qué incluye el soporte?",
        a: "Consultas de uso, reporte de incidentes y mantenimiento correctivo dentro del alcance contratado. Los desarrollos nuevos no se consideran soporte.",
      },
      {
        q: "¿Cuál es el horario?",
        a: "[HORARIO Y ZONA HORARIA VALIDADA].",
      },
    ],
  },
]

export const RUBROS = [
  "Gastronomía",
  "Servicios y turnos",
  "Gestión de PyMEs",
  "Comercio y retail",
  "Inmobiliarias",
  "Educación",
  "Talleres y reparaciones",
  "Otro rubro",
]

export const NECESIDADES = [
  "Crear o renovar el sitio web.",
  "Recibir reservas o turnos.",
  "Gestionar productos, stock o pedidos.",
  "Organizar clientes y seguimientos.",
  "Coordinar proyectos y tareas.",
  "Administrar propiedades y visitas.",
  "Gestionar cursos y alumnos.",
  "Controlar órdenes o reparaciones.",
  "Integrar varias necesidades.",
]

export const CANTIDAD_USUARIOS = ["1 persona", "2 a 5", "6 a 15", "Más de 15"]

export const PLAZOS = ["Cuanto antes", "En 1 a 3 meses", "En 3 a 6 meses", "Sin apuro"]

export const INVERSION = ["Baja", "Media", "Alta", "Prefiero definirlo en la conversación"]

export const PASOS_DESPUES = [
  {
    n: "1",
    titulo: "Revisamos tu solicitud",
    texto: "Analizamos rubro, necesidad y herramientas actuales.",
  },
  {
    n: "2",
    titulo: "Coordinamos una conversación",
    texto: "Te contactamos por el canal elegido dentro del horario comercial informado.",
  },
  {
    n: "3",
    titulo: "Definimos una primera versión",
    texto: "Si existe encaje, proponemos módulos, alcance, plazo e inversión.",
  },
]

export const EXPECTATIVAS = [
  "La primera conversación no tiene costo.",
  "El diagnóstico inicial no implica contratación.",
  "Las propuestas tienen alcance y vigencia.",
  "No se solicitan contraseñas ni accesos sensibles mediante el formulario.",
]
