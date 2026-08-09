export const CAPAS_SEGURIDAD = [
  {
    n: "01",
    titulo: "Cliente",
    etiqueta: "Desktop y mobile",
    descripcion: "Acceso desde el navegador del negocio con conexión cifrada.",
    detalle: "HTTPS / TLS",
  },
  {
    n: "02",
    titulo: "Plataforma Fleximy",
    etiqueta: "Web pública + panel",
    descripcion: "Sitio web y panel de gestión con roles y permisos según configuración.",
    detalle: "roles y permisos",
  },
  {
    n: "03",
    titulo: "Infraestructura",
    etiqueta: "Hosting administrado",
    descripcion: "Servidores administrados por Fleximy con mantenimiento y actualizaciones.",
    detalle: "hosting administrado",
  },
  {
    n: "04",
    titulo: "Respaldo",
    etiqueta: "Copias según política",
    descripcion: "Copias de información según la política técnica vigente.",
    detalle: "respaldos",
  },
]

export const ACCESOS = [
  "Cuentas individuales para usuarios cuando el módulo lo permite.",
  "Roles y permisos según configuración.",
  "Gestión de altas y bajas.",
  "Recomendación de contraseñas robustas.",
  "Segundo factor de autenticación: [CONFIRMAR DISPONIBILIDAD].",
  "Registro de actividad: [CONFIRMAR MÓDULOS].",
]

export const ACCESOS_NOTA =
  "El cliente es responsable de informar bajas, cuidar credenciales y asignar permisos adecuados."

export const PROTECCION_DATOS = [
  "Tráfico cifrado mediante HTTPS/TLS.",
  "Controles de acceso a la información.",
  "Separación lógica entre clientes: [VALIDAR ARQUITECTURA].",
  "Cifrado en reposo: [VALIDAR TECNOLOGÍA Y ALCANCE].",
  "Gestión de secretos y credenciales internas: [VALIDAR].",
]

export const PROTECCION_NOTA =
  "No publicar “AES-256” si no puede demostrarse en todos los componentes relevantes."

export const RESPALDOS = [
  { elemento: "Base de datos", frecuencia: "[DEFINIR]", retencion: "[DEFINIR]", restauracion: "[DEFINIR]" },
  { elemento: "Archivos", frecuencia: "[DEFINIR]", retencion: "[DEFINIR]", restauracion: "[DEFINIR]" },
  { elemento: "Configuración", frecuencia: "[DEFINIR]", retencion: "[DEFINIR]", restauracion: "[DEFINIR]" },
]

export const RESPALDO_NOTA =
  "La existencia de backup no garantiza recuperación instantánea ni sustituye los procedimientos del cliente."

export const DISPONIBILIDAD = [
  { concepto: "Objetivo de disponibilidad", valor: "[DEFINIR]" },
  { concepto: "Ventanas de mantenimiento", valor: "[DEFINIR]" },
  { concepto: "Canal de incidentes", valor: "[DEFINIR]" },
  { concepto: "Prioridades y tiempos de primera respuesta", valor: "[DEFINIR]" },
]

export const DISPONIBILIDAD_NOTA =
  "No usamos el término SLA si no existe un acuerdo de nivel de servicio aplicable."

export const TERCEROS =
  "Fleximy puede depender de proveedores de infraestructura, dominios, email, mensajería, pagos o analítica. La disponibilidad de esos servicios también está sujeta a sus condiciones."

export const INCIDENTES = [
  "Recepción y registro.",
  "Clasificación de severidad.",
  "Contención.",
  "Investigación y corrección.",
  "Comunicación cuando corresponda.",
  "Revisión posterior.",
]

export const PRIVACIDAD_CUBRE = [
  "Qué datos trata Fleximy.",
  "Para qué fines.",
  "Quién es responsable.",
  "Qué proveedores intervienen.",
  "Cuánto se conservan.",
  "Cómo ejercer derechos.",
]

export const RECURSOS_CATEGORIAS = [
  "Sitios web que convierten",
  "Gestión y procesos",
  "Automatización",
  "Atención y WhatsApp",
  "Turnos y reservas",
  "Comercio y catálogo",
  "Seguridad y datos",
]

export const RECURSOS = [
  {
    formato: "Guía",
    titulo: "¿Tu negocio necesita una nueva web o un sistema de gestión?",
    descripcion:
      "Cómo detectar si el problema es la presencia digital, la operación interna o la desconexión entre ambas.",
    categoria: "Sitios web que convierten",
    lectura: "6 min",
    destacado: true,
  },
  {
    formato: "Checklist",
    titulo: "15 señales de que tu PyME depende demasiado de tareas manuales",
    descripcion: "Un repaso puntual para identificar dónde se acumulan las tareas repetitivas.",
    categoria: "Gestión y procesos",
    lectura: "4 min",
  },
  {
    formato: "Comparativa",
    titulo: "Web tradicional, ecommerce, CRM o plataforma integrada: qué resuelve cada opción",
    descripcion: "Criterios para elegir según el problema que querés resolver primero.",
    categoria: "Sitios web que convierten",
    lectura: "7 min",
  },
  {
    formato: "Guía",
    titulo: "Cómo ordenar las consultas que llegan por WhatsApp sin perder el trato humano",
    descripcion: "Estructura, registros y respuestas rápidas para un canal que no para.",
    categoria: "Atención y WhatsApp",
    lectura: "5 min",
  },
  {
    formato: "Checklist",
    titulo: "Qué definir antes de implementar reservas online",
    descripcion: "Horarios, servicios, personas y reglas para arrancar sin fricción.",
    categoria: "Turnos y reservas",
    lectura: "3 min",
  },
  {
    formato: "Guía",
    titulo: "Cómo preparar una planilla para migrarla a un sistema de gestión",
    descripcion: "Limpieza, criterios y validación antes de mover tus datos.",
    categoria: "Gestión y procesos",
    lectura: "6 min",
  },
]

export const DESCARGABLES = [
  { titulo: "Plantilla de mapa de procesos", formato: "PDF" },
  { titulo: "Checklist de contenidos para una web", formato: "PDF" },
  { titulo: "Modelo de campos para un CRM simple", formato: "XLSX" },
  { titulo: "Plantilla de seguimiento de consultas", formato: "XLSX" },
]

export const NEWSLETTER = {
  titulo: "Una idea útil para mejorar tu operación",
  promesa: "Frecuencia clara, contenido práctico y baja sencilla. Activamos la newsletter cuando haya capacidad editorial.",
}

export const CASOS = [
  {
    id: "restaurante",
    nombre: "Restaurante con menú cambiante",
    situacion:
      "El negocio actualiza precios con frecuencia, recibe reservas por WhatsApp y comunica productos agotados de forma manual.",
    disperso: ["WhatsApp", "Excel", "Pizarra"],
    configuracion: ["Menú QR.", "Editor de productos y precios.", "Disponibilidad inmediata.", "Reservas.", "Panel de actividad."],
    indicadores: ["Consultas repetitivas evitadas.", "Reservas digitales.", "Tiempo de actualización del menú.", "Productos consultados."],
    cta: { label: "Ver solución de Gastronomía", to: "/soluciones/gastronomia" },
    acento: "var(--color-acc-gastro)",
  },
  {
    id: "servicios",
    nombre: "Centro de servicios con varios profesionales",
    situacion:
      "La recepción coordina horarios por mensaje y cada profesional maneja parte de su agenda por separado.",
    disperso: ["Mensajes", "Agendas separadas", "Papel"],
    configuracion: ["Portal de reservas.", "Agenda por profesional.", "Bloqueos y reprogramaciones.", "Recordatorios.", "Historial de clientes."],
    indicadores: ["Tiempo dedicado a coordinar.", "Ocupación por agenda.", "Cancelaciones.", "Turnos reservados fuera de horario."],
    cta: { label: "Ver solución de Turnos", to: "/soluciones/servicios-turnos" },
    acento: "var(--color-acc-turnos)",
  },
  {
    id: "b2b",
    nombre: "Empresa de servicios B2B",
    situacion:
      "Los leads llegan desde la web, las tareas se distribuyen por chat y los clientes preguntan por el estado de sus entregables.",
    disperso: ["Email", "Chat", "Planillas"],
    configuracion: ["Formularios conectados al CRM.", "Pipeline comercial.", "Proyectos y tareas.", "Responsables y vencimientos.", "Portal del cliente."],
    indicadores: ["Tiempo de respuesta.", "Tareas vencidas.", "Proyectos por estado.", "Seguimientos realizados."],
    cta: { label: "Ver Gestión para PyMEs", to: "/soluciones/gestion-pymes" },
    acento: "var(--color-acc-gestion)",
  },
  {
    id: "inmobiliaria",
    nombre: "Inmobiliaria con leads dispersos",
    situacion:
      "Las consultas ingresan desde diferentes propiedades y no siempre queda registrada la próxima acción.",
    disperso: ["Portal de propiedades", "Email", "Notas sueltas"],
    configuracion: ["Portal con filtros.", "Consulta asociada a propiedad.", "CRM inmobiliario.", "Responsable y etapa.", "Agenda de visitas."],
    indicadores: ["Contactos por propiedad.", "Tiempo de primera respuesta.", "Visitas agendadas.", "Oportunidades sin seguimiento."],
    cta: { label: "Ver solución Inmobiliaria", to: "/soluciones/inmobiliarias" },
    acento: "var(--color-acc-inmob)",
  },
]

export const ESTRUCTURA_CASO_REAL = [
  "Cliente y contexto autorizado.",
  "Problema inicial.",
  "Alcance implementado.",
  "Capturas reales.",
  "Tiempo de implementación.",
  "Cambios de proceso.",
  "Resultados con período y fuente.",
  "Testimonio aprobado.",
  "Limitaciones y próximos pasos.",
]
