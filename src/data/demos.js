export const DEMOS = [
  {
    id: "gastronomia",
    rubro: "Gastronomía",
    descripcion:
      "Un menú digital que actualiza la web y una cocina que recibe comandas en pantalla.",
    estado: "disponible",
    modal: true,
    guiado: true,
    cliente: {
      titulo: "Consultá el menú y armá un pedido",
      cta: "Abrir vista cliente",
      pasos: [
        ["filtrar_categoria", "Filtrar categorías"],
        ["agregar_plato", "Agregar un plato al pedido"],
        ["enviar_pedido", "Enviar o simular el pedido"],
      ],
    },
    equipo: {
      titulo: "Actualizá el menú y gestioná pedidos",
      cta: "Abrir panel gastronómico",
      pasos: [
        ["cambiar_disponibilidad", "Cambiar disponibilidad"],
        ["modificar_precio", "Modificar un precio de ejemplo"],
        ["avanzar_pedido", "Cambiar el estado de una comanda"],
      ],
    },
    guia: [
      { modo: "cliente", target: "filtrar_categoria", texto: "Elegí una categoría para filtrar el menú." },
      { modo: "cliente", target: "agregar_plato", texto: "Sumá un plato al pedido. La comanda queda lista para enviarse." },
      { modo: "cliente", target: "enviar_pedido", texto: "Enviá el pedido: del otro lado aparece la comanda." },
      { modo: "equipo", target: "avanzar_pedido", texto: "En el panel, avanzá la comanda a En preparación." },
      { modo: "equipo", target: "modificar_precio", texto: "Cambiá un precio desde el panel: se refleja en el menú." },
    ],
  },
  {
    id: "turnos",
    rubro: "Servicios y Turnos",
    descripcion:
      "Reservá online y mirá cómo el horario se bloquea en la agenda del profesional.",
    estado: "disponible",
    modal: true,
    guiado: true,
    cliente: {
      titulo: "Reservá un turno de prueba",
      cta: "Reservar un turno de prueba",
      pasos: [
        ["elegir_servicio", "Elegir servicio"],
        ["elegir_profesional", "Elegir profesional"],
        ["reservar_turno", "Confirmar una reserva simulada"],
      ],
    },
    equipo: {
      titulo: "Gestioná la agenda profesional",
      cta: "Abrir agenda profesional",
      pasos: [
        ["bloquear_horario", "Bloquear un horario"],
        ["reprogramar", "Reprogramar un turno"],
        ["ver_historial", "Ver el historial del cliente"],
      ],
    },
    guia: [
      { modo: "cliente", target: "elegir_servicio", texto: "Elegí el servicio de la reserva simulada." },
      { modo: "cliente", target: "elegir_profesional", texto: "Seleccioná al profesional." },
      { modo: "cliente", target: "reservar_turno", texto: "Confirmá un horario: se bloquea en la agenda." },
      { modo: "equipo", target: "bloquear_horario", texto: "Desde el panel, bloqueá un horario libre." },
      { modo: "equipo", target: "reprogramar", texto: "Reprogramá el turno a un horario disponible." },
    ],
  },
  {
    id: "gestion",
    rubro: "Gestión y Proyectos",
    descripcion:
      "Una oportunidad avanza por etapas hasta convertirse en proyecto con tareas y entregas.",
    estado: "disponible",
    modal: true,
    guiado: true,
    cliente: {
      titulo: "Consultá los avances de tu proyecto",
      cta: "Abrir portal del cliente",
      pasos: [
        ["ver_avances", "Consultar avances"],
        ["ver_entregas", "Ver próximas entregas"],
        ["dejar_comentario", "Dejar un comentario simulado"],
      ],
    },
    equipo: {
      titulo: "Organizá tareas y responsables",
      cta: "Abrir gestor de proyectos",
      pasos: [
        ["avanzar_etapa", "Avanzar una oportunidad"],
        ["mover_tarea", "Mover una tarea"],
        ["asignar_responsable", "Asignar responsable"],
        ["cambiar_fecha", "Cambiar la fecha de una tarea"],
      ],
    },
    guia: [
      { modo: "cliente", target: "ver_avances", texto: "Tu consulta ya tiene un avance visible en el portal." },
      { modo: "cliente", target: "dejar_comentario", texto: "Dejá un comentario: queda registrado para el equipo." },
      { modo: "equipo", target: "avanzar_etapa", texto: "Avanzá la oportunidad. Al llegar a Proyecto se generan tareas." },
      { modo: "equipo", target: "mover_tarea", texto: "Avanzá el estado de una tarea del proyecto." },
      { modo: "equipo", target: "asignar_responsable", texto: "Cambiá el responsable de una tarea." },
    ],
  },
  {
    id: "comercio",
    rubro: "Comercio y Retail",
    descripcion:
      "Una ficha pública de producto y un panel donde precio y stock se reflejan en la demo.",
    estado: "disponible",
    modal: false,
    guiado: false,
    cta: "Abrir demo de comercio",
  },
  {
    id: "inmobiliarias",
    rubro: "Inmobiliarias",
    descripcion:
      "Un buscador de propiedades que alimenta el CRM con cada consulta interesada.",
    estado: "disponible",
    modal: false,
    guiado: false,
    cta: "Abrir demo inmobiliaria",
  },
  {
    id: "educacion",
    rubro: "Educación",
    descripcion:
      "La inscripción a un curso abre el portal del estudiante con contenidos, progreso y tarea.",
    estado: "disponible",
    modal: false,
    guiado: false,
    cta: "Abrir demo de educación",
  },
  {
    id: "talleres",
    rubro: "Talleres y Reparaciones",
    descripcion:
      "Una orden de trabajo avanza por estados mientras el cliente ve el mismo avance.",
    estado: "disponible",
    modal: false,
    guiado: false,
    cta: "Abrir demo de taller",
  },
]

export function demoById(id) {
  return DEMOS.find((d) => d.id === id)
}
