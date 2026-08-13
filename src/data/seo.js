export const SITE_URL = "https://fleximy2025.netlify.app"

function seo(title, description, robots = "index,follow") {
  return { title, description, robots }
}

export const SEO_META = {
  "/": seo(
    "Fleximy — Diseño y desarrollo de aplicaciones digitales",
    "Diseñamos y desarrollamos aplicaciones, plataformas y experiencias digitales para transformar ideas y procesos en productos que funcionan."
  ),
  "/servicios": seo(
    "Servicios de diseño y desarrollo digital | Fleximy",
    "Diseñamos productos digitales, aplicaciones web, plataformas, automatizaciones y experiencias interactivas a medida."
  ),
  "/soluciones": seo(
    "Soluciones por rubro | Fleximy",
    "Soluciones digitales para gastronomía, turnos, gestión de PyMEs, comercio, inmobiliarias, educación y talleres. Ejemplos adaptables, pensados para cada operación."
  ),
  "/soluciones/gastronomia": seo(
    "Soluciones digitales para gastronomía | Fleximy",
    "Menú digital, reservas, pedidos y control de mesa. Diseñamos y desarrollamos la experiencia y el panel de gestión para tu negocio gastronómico."
  ),
  "/soluciones/servicios-turnos": seo(
    "Soluciones digitales para turnos y reservas | Fleximy",
    "Reservas online, agenda por profesional, recordatorios e historial de clientes. Ordená tu agenda sin intercambios de mensajes."
  ),
  "/soluciones/gestion-pymes": seo(
    "Soluciones digitales para PyMEs | Fleximy",
    "CRM, proyectos, tareas y seguimiento conectados. Convertí las consultas de tu web en trabajo ordenado para tu equipo."
  ),
  "/soluciones/comercio-retail": seo(
    "Soluciones digitales para comercio y retail | Fleximy",
    "Catálogo, stock y pedidos conectados entre tu web y tu panel. Publicá productos y gestioná disponibilidad en un solo lugar."
  ),
  "/soluciones/inmobiliarias": seo(
    "Soluciones digitales para inmobiliarias | Fleximy",
    "Portal de propiedades, consultas asociadas, CRM y agenda de visitas. Cada lead con responsable y próximo paso."
  ),
  "/soluciones/educacion": seo(
    "Soluciones digitales para educación | Fleximy",
    "Cursos, inscripciones y seguimiento de alumnos. Conectá la información de tus cursos con la operación de tu institución."
  ),
  "/soluciones/talleres-reparaciones": seo(
    "Soluciones digitales para talleres y reparaciones | Fleximy",
    "Órdenes de trabajo, presupuestos, repuestos y estados. El cliente sigue su reparación y tu equipo deja de perseguir tareas."
  ),
  "/demos": seo(
    "Demos interactivas | Fleximy",
    "Probá Fleximy antes de imaginarlo: demos interactivas basadas en escenarios de negocio, con datos ilustrativos y sin registro."
  ),
  "/como-funciona": seo(
    "Cómo trabajamos | Fleximy",
    "De una idea a un producto digital listo para crecer: descubrimiento, definición, diseño, desarrollo, validación y evolución."
  ),
  "/precios": seo(
    "Precios | Fleximy",
    "Tres planes de la misma arquitectura. El monto se confirma en el diagnóstico: no publicamos valores sin un alcance definido."
  ),
  "/nosotros": seo(
    "Nosotros | Fleximy",
    "Diseñamos tecnología para que las ideas se conviertan en productos reales. Especialidades, forma de trabajo y criterio de diseño."
  ),
  "/contacto": seo(
    "Contanos tu idea | Fleximy",
    "Contanos qué querés crear, mejorar o automatizar. Un diagnóstico breve para recomendar el primer paso correcto."
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
    "Guías, checklists y análisis sobre diseño de producto, automatización, desarrollo y decisiones digitales para tu negocio."
  ),
  "/casos-de-uso": seo(
    "Casos de uso | Fleximy",
    "Escenarios ilustrativos por rubro: de la información dispersa a un flujo conectado. Cómo se aplica cada solución a una operación."
  ),
  "/privacidad": seo(
    "Política de privacidad | Fleximy",
    "Cómo Fleximy recopila, utiliza, conserva y protege los datos personales obtenidos mediante el sitio y la prestación del servicio."
  ),
  "/terminos": seo(
    "Términos del servicio | Fleximy",
    "Condiciones de acceso y uso de los servicios de diseño y desarrollo de Fleximy."
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
