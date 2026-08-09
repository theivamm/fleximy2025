export const LEGAL_NOTA =
  "Borrador estructural. Requiere revisión legal y datos reales de la empresa antes de publicación."

export const PRIVACIDAD = {
  id: "privacidad",
  kicker: "Privacidad",
  h1: "Política de privacidad",
  intro:
    "Esta política explica cómo Fleximy recopila, utiliza, conserva y protege los datos personales. Está redactada como borrador estructural y requiere validación legal antes de publicación.",
  actualizacion: "[FECHA DE ACTUALIZACIÓN]",
  secciones: [
    {
      n: "1",
      titulo: "Responsable",
      bloques: [
        {
          tipo: "p",
          texto:
            "El responsable del tratamiento es [RAZÓN SOCIAL], CUIT [CUIT], con domicilio en [DOMICILIO] y correo de privacidad [EMAIL].",
        },
      ],
    },
    {
      n: "2",
      titulo: "Alcance",
      bloques: [
        {
          tipo: "p",
          texto:
            "Esta política explica cómo se recopilan, utilizan, conservan y protegen los datos personales obtenidos mediante el sitio de Fleximy, formularios, comunicaciones comerciales y prestación del servicio.",
        },
      ],
    },
    {
      n: "3",
      titulo: "Datos recopilados",
      bloques: [
        { tipo: "p", texto: "Según la interacción, pueden recopilarse:" },
        {
          tipo: "ul",
          items: [
            "Nombre y datos de contacto.",
            "Empresa, rubro y cargo.",
            "Información incluida en consultas.",
            "Datos técnicos y de navegación.",
            "Preferencias de comunicación.",
            "Información necesaria para contratación y facturación.",
            "Datos almacenados por clientes dentro de módulos contratados, según roles jurídicos aplicables.",
          ],
        },
        {
          tipo: "p",
          texto:
            "No deben solicitarse datos sensibles salvo necesidad, base legal y protección adecuadas.",
        },
      ],
    },
    {
      n: "4",
      titulo: "Finalidades",
      bloques: [
        {
          tipo: "ul",
          items: [
            "Responder consultas.",
            "Preparar diagnósticos y propuestas.",
            "Prestar y administrar el servicio.",
            "Brindar soporte.",
            "Gestionar seguridad e incidentes.",
            "Cumplir obligaciones legales.",
            "Medir y mejorar el sitio.",
            "Enviar comunicaciones comerciales cuando exista base válida y opción de baja.",
          ],
        },
      ],
    },
    {
      n: "5",
      titulo: "Base legal",
      bloques: [
        {
          tipo: "p",
          texto:
            "Detallar conforme a la normativa aplicable: consentimiento, ejecución contractual, obligación legal e interés legítimo cuando corresponda.",
        },
      ],
    },
    {
      n: "6",
      titulo: "Proveedores",
      bloques: [
        {
          tipo: "p",
          texto:
            "Fleximy puede utilizar proveedores de hosting, analítica, mensajería, pagos, agenda, CRM y soporte. Publicar categorías y, cuando sea necesario, identidades y transferencias internacionales.",
        },
      ],
    },
    {
      n: "7",
      titulo: "Conservación",
      bloques: [
        {
          tipo: "p",
          texto:
            "Los datos se conservan durante el tiempo necesario para la finalidad, obligaciones legales, defensa de derechos y plazos contractuales. Definir períodos concretos cuando sea posible.",
        },
      ],
    },
    {
      n: "8",
      titulo: "Derechos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Informar procedimiento para acceso, rectificación, actualización, supresión y otros derechos aplicables. Incluir canal, requisitos razonables y autoridad de control correspondiente.",
        },
      ],
    },
    {
      n: "9",
      titulo: "Seguridad",
      bloques: [
        {
          tipo: "p",
          texto:
            "Fleximy aplica medidas razonables acordes al tipo de información y servicio. Ningún sistema es completamente infalible.",
        },
      ],
    },
    {
      n: "10",
      titulo: "Cookies y analítica",
      bloques: [
        {
          tipo: "p",
          texto:
            "Detallar tecnologías utilizadas, finalidades, duración y mecanismo de consentimiento cuando sea requerido.",
        },
      ],
    },
    {
      n: "11",
      titulo: "Menores",
      bloques: [
        {
          tipo: "p",
          texto:
            "El sitio comercial no está dirigido a menores. Los módulos educativos deben regular específicamente roles y tratamiento de datos de menores cuando corresponda.",
        },
      ],
    },
    {
      n: "12",
      titulo: "Cambios",
      bloques: [
        {
          tipo: "p",
          texto:
            "Indicar fecha de última actualización y cómo se comunicarán cambios sustanciales.",
        },
      ],
    },
    {
      n: "13",
      titulo: "Contacto",
      bloques: [
        { tipo: "p", texto: "Consultas de privacidad: [EMAIL DE PRIVACIDAD]." },
      ],
    },
  ],
}

export const TERMINOS = {
  id: "terminos",
  kicker: "Legales",
  h1: "Términos del servicio",
  intro:
    "Condiciones de acceso y uso de la plataforma Fleximy. Borrador estructural que requiere redacción o revisión profesional antes de publicación y contratación.",
  actualizacion: "[FECHA DE ACTUALIZACIÓN]",
  secciones: [
    {
      n: "1",
      titulo: "Identificación",
      bloques: [
        {
          tipo: "p",
          texto:
            "Identificar a [RAZÓN SOCIAL], CUIT, domicilio, contacto y nombre comercial Fleximy.",
        },
      ],
    },
    {
      n: "2",
      titulo: "Objeto",
      bloques: [
        {
          tipo: "p",
          texto:
            "Regular el acceso y uso de la plataforma, implementación, hosting, mantenimiento, soporte y módulos contratados.",
        },
      ],
    },
    {
      n: "3",
      titulo: "Propuesta y orden de prelación",
      bloques: [
        { tipo: "p", texto: "Definir qué documento prevalece ante diferencias:" },
        {
          tipo: "ol",
          items: [
            "Propuesta u orden de servicio firmada.",
            "Acuerdo específico de tratamiento o nivel de servicio.",
            "Estos términos.",
            "Documentación funcional vigente.",
          ],
        },
      ],
    },
    {
      n: "4",
      titulo: "Alcance",
      bloques: [
        {
          tipo: "p",
          texto:
            "El servicio incluye exclusivamente módulos, usuarios, volúmenes, integraciones, carga, capacitación y soporte indicados en la propuesta aceptada.",
        },
        {
          tipo: "p",
          texto:
            "Las solicitudes que amplíen el alcance pueden requerir cotización y cronograma adicional.",
        },
      ],
    },
    {
      n: "5",
      titulo: "Implementación",
      bloques: [
        {
          tipo: "ul",
          items: [
            "Requisitos de inicio.",
            "Entrega de contenido.",
            "Responsables de validación.",
            "Rondas de corrección.",
            "Criterios de aceptación.",
            "Efectos de demoras del cliente.",
          ],
        },
      ],
    },
    {
      n: "6",
      titulo: "Suscripción y pagos",
      bloques: [
        {
          tipo: "ul",
          items: [
            "Moneda e impuestos.",
            "Fecha de facturación.",
            "Medios de pago.",
            "Actualización de precios.",
            "Mora y suspensión.",
            "Cargos de terceros.",
            "Implementación inicial.",
          ],
        },
      ],
    },
    {
      n: "7",
      titulo: "Plazo y cancelación",
      bloques: [
        {
          tipo: "ul",
          items: [
            "Vigencia.",
            "Permanencia, si existe.",
            "Preaviso.",
            "Consecuencias de cancelación.",
            "Acceso y exportación de datos.",
            "Eliminación posterior.",
          ],
        },
      ],
    },
    {
      n: "8",
      titulo: "Uso permitido",
      bloques: [
        { tipo: "p", texto: "El cliente se compromete a:" },
        {
          tipo: "ul",
          items: [
            "Utilizar el servicio legalmente.",
            "Mantener datos y permisos adecuados.",
            "No vulnerar seguridad ni derechos de terceros.",
            "Proteger accesos.",
            "Contar con autorizaciones para los datos cargados.",
          ],
        },
      ],
    },
    {
      n: "9",
      titulo: "Datos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Definir propiedad, roles de tratamiento, instrucciones, exportación, retención, eliminación, proveedores y respuesta a solicitudes de titulares.",
        },
      ],
    },
    {
      n: "10",
      titulo: "Propiedad intelectual",
      bloques: [
        { tipo: "p", texto: "Diferenciar:" },
        {
          tipo: "ul",
          items: [
            "Marca y contenidos del cliente.",
            "Plataforma y componentes reutilizables de Fleximy.",
            "Configuración específica.",
            "Licencias de terceros.",
            "Condiciones de uso durante la suscripción.",
          ],
        },
      ],
    },
    {
      n: "11",
      titulo: "Disponibilidad y mantenimiento",
      bloques: [
        {
          tipo: "p",
          texto:
            "Definir objetivos, exclusiones, mantenimiento programado y dependencia de terceros. No prometer 99,9% ni SLA sin capacidad contractual.",
        },
      ],
    },
    {
      n: "12",
      titulo: "Soporte",
      bloques: [
        {
          tipo: "ul",
          items: [
            "Canales.",
            "Horarios.",
            "Prioridades.",
            "Primera respuesta.",
            "Qué es incidente.",
            "Qué es evolución o desarrollo adicional.",
          ],
        },
      ],
    },
    {
      n: "13",
      titulo: "Integraciones de terceros",
      bloques: [
        {
          tipo: "p",
          texto:
            "WhatsApp, Mercado Pago, servicios de email, mapas, agendas y otros proveedores se rigen también por sus propios términos, disponibilidad y cargos.",
        },
      ],
    },
    {
      n: "14",
      titulo: "Responsabilidad",
      bloques: [
        {
          tipo: "p",
          texto:
            "Definir límites razonables conforme a la normativa, exclusiones válidas, obligación de cooperación y supuestos de fuerza mayor.",
        },
      ],
    },
    {
      n: "15",
      titulo: "Confidencialidad",
      bloques: [
        {
          tipo: "p",
          texto: "Regular información comercial, técnica y operativa intercambiada.",
        },
      ],
    },
    {
      n: "16",
      titulo: "Modificaciones",
      bloques: [
        {
          tipo: "p",
          texto: "Establecer mecanismo, anticipación y efectos de cambios.",
        },
      ],
    },
    {
      n: "17",
      titulo: "Ley y jurisdicción",
      bloques: [
        {
          tipo: "p",
          texto: "Completar conforme a domicilio, mercado y normativa aplicable.",
        },
      ],
    },
    {
      n: "18",
      titulo: "Contacto",
      bloques: [{ tipo: "p", texto: "[EMAIL LEGAL] y domicilio informado." }],
    },
  ],
}
