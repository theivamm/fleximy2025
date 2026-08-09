export const SITE_URL = "https://fleximy2025.netlify.app"

function seo(title, description, robots = "index,follow") {
  return { title, description, robots }
}

export const SEO_META = {
  "/": seo(
    "Fleximy — Tu web también puede operar tu negocio",
    "Sitio web, turnos, gestión y atención integrados para tu PyME. Fleximy une tu presencia digital con la operación diaria de tu negocio."
  ),
  "/soluciones": seo(
    "Soluciones por rubro | Fleximy",
    "Soluciones para gastronomía, turnos, gestión de PyMEs, comercio, inmobiliarias, educación y talleres. Una base para tu rubro, adaptada a tu equipo."
  ),
  "/soluciones/gastronomia": seo(
    "Software para restaurantes y gastronomía | Fleximy",
    "Menú QR, comandas, reservas y control de mesa. Una web que opera tu negocio gastronómico de punta a punta."
  ),
  "/soluciones/servicios-turnos": seo(
    "Gestión de turnos y reservas online | Fleximy",
    "Reservas online, agenda por profesional, recordatorios e historial de clientes. Ordená tu agenda sin intercambios de mensajes."
  ),
  "/soluciones/gestion-pymes": seo(
    "Gestión para PyMEs | Fleximy",
    "CRM, proyectos, tareas y seguimiento conectados. Convertí las consultas de tu web en trabajo ordenado para tu equipo."
  ),
  "/soluciones/comercio-retail": seo(
    "Software para comercio y retail | Fleximy",
    "Catálogo, stock y pedidos conectados entre tu web y tu panel. Publicá productos y gestioná disponibilidad en un solo lugar."
  ),
  "/soluciones/inmobiliarias": seo(
    "Software para inmobiliarias | Fleximy",
    "Portal de propiedades, consultas asociadas, CRM y agenda de visitas. Cada lead con responsable y próximo paso."
  ),
  "/soluciones/educacion": seo(
    "Software para educación | Fleximy",
    "Cursos, inscripciones y seguimiento de alumnos. Conectá la información de tus cursos con la operación de tu institución."
  ),
  "/soluciones/talleres-reparaciones": seo(
    "Software para talleres y reparaciones | Fleximy",
    "Órdenes de trabajo, presupuestos, repuestos y estados. El cliente sigue su reparación y tu equipo deja de perseguir tareas."
  ),
  "/demos": seo(
    "Demos interactivas | Fleximy",
    "Probá Fleximy antes de imaginarlo: siete demos reales con datos ficticios, sin registro. Cliente y equipo en la misma experiencia."
  ),
  "/como-funciona": seo(
    "Cómo funciona | Fleximy",
    "Del diagnóstico inicial a la activación: etapas, plazos y responsabilidades para implementar Fleximy en tu negocio."
  ),
  "/precios": seo(
    "Precios | Fleximy",
    "Tres planes de la misma arquitectura. El monto se confirma en el diagnóstico: no publicamos valores sin un alcance definido."
  ),
  "/nosotros": seo(
    "Nosotros | Fleximy",
    "Fleximy existe para cerrar la brecha entre una web estática y un sistema complejo. Principios, enfoque y forma de trabajo."
  ),
  "/contacto": seo(
    "Diagnóstico inicial | Fleximy",
    "Contanos qué parte de tu negocio querés ordenar. Un diagnóstico breve para recomendar el primer paso correcto."
  ),
  "/preguntas-frecuentes": seo(
    "Preguntas frecuentes | Fleximy",
    "Respuestas sobre alcance, implementación, precios, datos y soporte. Si no encontrás tu duda, consultanos directamente."
  ),
  "/seguridad": seo(
    "Seguridad y continuidad | Fleximy",
    "Cómo circula la información, accesos, protección de datos, respaldos y respuesta ante incidentes. Compromisos reales, sin humo."
  ),
  "/recursos": seo(
    "Recursos | Fleximy",
    "Guías, checklists y comparativas para mejorar la operación de tu PyME. Contenido práctico para dejar de depender de tareas manuales."
  ),
  "/casos-de-uso": seo(
    "Casos de uso | Fleximy",
    "Escenarios ilustrativos por rubro: de la información dispersa a un flujo conectado. Cómo se aplica Fleximy a cada operación."
  ),
  "/privacidad": seo(
    "Política de privacidad | Fleximy",
    "Cómo Fleximy recopila, utiliza, conserva y protege los datos personales obtenidos mediante el sitio y la prestación del servicio."
  ),
  "/terminos": seo(
    "Términos del servicio | Fleximy",
    "Condiciones de acceso y uso de la plataforma Fleximy: implementación, hosting, mantenimiento, soporte y módulos contratados."
  ),
  "/gracias-diagnostico": seo(
    "Recibimos tu solicitud | Fleximy",
    "Recibimos tu solicitud de diagnóstico. Revisamos la información y te contactamos a la brevedad.",
    "noindex,nofollow"
  ),
  "/login": seo("Iniciar sesión | Fleximy", "Acceso al panel de Fleximy.", "noindex,nofollow"),
  "/dashboard": seo("Panel | Fleximy", "Panel de gestión de Fleximy.", "noindex,nofollow"),
  "/dashboard/ai-images": seo("Imágenes con IA | Fleximy", "Generación de imágenes con IA.", "noindex,nofollow"),
  "/dashboard/crear-imagen": seo("Crear imagen | Fleximy", "Crear una imagen nueva con IA.", "noindex,nofollow"),
  "/dashboard/mis-disenos": seo("Mis diseños | Fleximy", "Tus diseños generados.", "noindex,nofollow"),
  "*": seo(
    "Página no encontrada | Fleximy",
    "Esta página no está disponible. Volvé al inicio o elegí una de nuestras soluciones.",
    "noindex,follow"
  ),
}
