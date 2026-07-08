const rgb = {
  amber: { 50: "255,251,235", 100: "254,243,199", 200: "253,230,138", 300: "252,211,77", 400: "251,191,36", 500: "217,119,6", 600: "180,83,9", 950: "69,26,3" },
  orange: { 50: "255,247,237", 100: "255,237,213", 200: "254,215,170", 300: "253,186,116", 400: "251,146,60", 500: "249,115,22", 600: "234,88,12", 950: "67,20,7" },
  red: { 50: "254,242,242", 100: "254,226,226", 200: "254,202,202", 300: "252,165,165", 400: "248,113,113", 500: "239,68,68", 600: "220,38,38", 950: "69,10,10" },
  blue: { 50: "239,246,255", 100: "219,234,254", 200: "191,219,254", 300: "147,197,253", 400: "96,165,250", 500: "59,130,246", 600: "37,99,235", 950: "23,37,84" },
  cyan: { 50: "236,254,255", 100: "207,250,254", 200: "165,243,252", 300: "103,232,249", 400: "34,211,238", 500: "6,182,212", 600: "8,145,178", 950: "4,47,46" },
  emerald: { 50: "236,253,245", 100: "209,250,229", 200: "167,243,208", 300: "110,231,183", 400: "52,211,153", 500: "16,185,129", 600: "5,150,105", 950: "2,44,21" },
  teal: { 50: "240,253,250", 100: "204,251,241", 200: "153,246,228", 300: "94,234,212", 400: "45,212,191", 500: "20,184,166", 600: "13,148,136", 950: "4,47,46" },
  pink: { 50: "253,242,248", 100: "252,231,243", 200: "251,207,232", 300: "249,168,212", 400: "244,114,182", 500: "236,72,153", 600: "219,39,119", 950: "80,7,36" },
  purple: { 50: "250,245,255", 100: "243,232,255", 200: "233,213,255", 300: "216,180,254", 400: "192,132,252", 500: "168,85,247", 600: "147,51,234", 950: "59,7,100" },
  slate: { 50: "248,250,252", 100: "241,245,249", 200: "226,232,240", 300: "203,213,225", 400: "148,163,184", 500: "100,116,139", 600: "71,85,105", 950: "2,6,23" },
  indigo: { 50: "238,242,255", 100: "224,231,255", 200: "199,210,254", 300: "165,180,252", 400: "129,140,248", 500: "99,102,241", 600: "79,70,229", 950: "30,27,75" },
}

export function clr(name, shade, opacity = 1) {
  const r = rgb[name]?.[shade]
  return r ? `rgba(${r},${opacity})` : "transparent"
}

export function clrDark(name, shade, opacity = 1) {
  return clr(name, shade, opacity)
}

const R = (x, y, w, h, name, shade, opacity, rad, rot, anims) => ({ x, y, w, h, name, shade, opacity, rad, rot, anims })

export function getShapes(type, view) {
  const s = scenes[type]
  return s ? s[view] : []
}

const scenes = {
  cafe: {
    website: [
      R(8,6,50,8,"amber",500,0.25,"16px",0,{y:[-3,3]}),
      R(8,18,18,20,"amber",200,0.4,"16px",0),
      R(30,18,18,20,"amber",300,0.3,"16px",0),
      R(52,18,18,20,"amber",200,0.4,"16px",0),
      R(8,42,28,6,"amber",500,0.15,"8px",0),
      R(8,52,20,4,"amber",600,0.2,"6px",0),
      R(32,52,20,4,"amber",600,0.15,"6px",0),
      R(10,62,14,12,"orange",200,0.3,"12px",0,{y:[-2,2]}),
      R(28,62,14,12,"amber",100,0.3,"12px",0,{y:[-2,2]}),
      R(70,10,22,22,"amber",400,0.2,"9999px",-5,{y:[-4,4]}),
      R(65,40,30,8,"amber",500,0.1,"8px",0),
      R(65,52,30,18,"amber",300,0.15,"12px",0),
    ],
    dashboard: [
      R(2,4,22,6,"amber",600,0.2,"8px",0),
      R(60,4,12,6,"amber",500,0.15,"8px",0),
      R(76,4,12,6,"amber",500,0.1,"8px",0),
      R(2,14,22,38,"amber",50,0.3,"12px",0),
      R(2,18,18,4,"amber",400,0.25,"6px",0),
      R(4,26,6,4,"amber",600,0.3,"6px",0,{h:[-4,6]}),
      R(13,28,6,6,"amber",500,0.25,"6px",0,{h:[-2,8]}),
      R(4,34,6,5,"amber",600,0.2,"6px",0,{h:[-4,6]}),
      R(13,32,6,7,"amber",500,0.2,"6px",0,{h:[-2,8]}),
      R(28,14,70,55,"amber",50,0.2,"12px",0),
      R(32,18,24,4,"amber",500,0.2,"8px",0),
      R(32,26,30,10,"amber",200,0.3,"8px",0),
      R(32,40,40,8,"amber",300,0.2,"8px",0,{w:[-4,4]}),
      R(32,52,20,6,"amber",500,0.2,"6px",0),
      R(56,52,18,6,"amber",400,0.15,"6px",0),
      R(32,62,10,6,"amber",600,0.2,"8px",0,{y:[-2,2]}),
      R(46,64,8,4,"amber",500,0.15,"8px",0,{y:[1,-1]}),
      R(58,62,12,6,"amber",600,0.1,"8px",0,{y:[-2,2]}),
    ],
  },

  restaurant: {
    website: [
      R(8,6,55,8,"red",500,0.25,"16px",0),
      R(8,18,25,18,"red",200,0.35,"16px",0,{y:[-2,2]}),
      R(37,18,25,18,"red",300,0.25,"16px",0,{y:[-2,2]}),
      R(8,40,54,4,"red",500,0.1,"8px",0),
      R(8,48,16,16,"orange",200,0.3,"12px",0),
      R(28,48,16,16,"red",100,0.3,"12px",0),
      R(48,48,14,16,"orange",200,0.25,"12px",0),
      R(68,8,24,24,"red",400,0.2,"9999px",0,{y:[-3,3]}),
      R(68,36,24,8,"red",500,0.1,"8px",0),
      R(68,48,24,20,"red",300,0.15,"12px",0),
    ],
    dashboard: [
      R(2,4,22,6,"red",600,0.2,"8px",0),
      R(60,4,12,6,"red",500,0.15,"8px",0),
      R(76,4,12,6,"red",500,0.1,"8px",0),
      R(2,14,22,38,"red",50,0.3,"12px",0),
      R(4,18,6,6,"red",400,0.25,"9999px",0,{scale:[1,1.15]}),
      R(13,18,6,6,"red",400,0.2,"9999px",0,{scale:[1,1.15]}),
      R(4,28,6,6,"red",400,0.25,"9999px",0,{scale:[1,1.15]}),
      R(13,28,6,6,"red",400,0.2,"9999px",0,{scale:[1,1.15]}),
      R(28,14,70,55,"red",50,0.2,"12px",0),
      R(32,18,30,4,"red",500,0.2,"8px",0),
      R(32,26,16,28,"orange",200,0.3,"8px",0),
      R(52,26,16,28,"red",200,0.2,"8px",0),
      R(72,26,22,6,"red",300,0.25,"6px",0,{w:[-3,3]}),
      R(72,36,10,6,"red",500,0.2,"6px",0),
      R(86,36,8,6,"red",400,0.15,"6px",0),
      R(72,46,22,8,"red",300,0.2,"8px",0),
    ],
  },

  retail: {
    website: [
      R(8,6,45,8,"blue",500,0.25,"16px",0),
      R(8,18,14,22,"blue",200,0.35,"16px",0,{y:[-2,2]}),
      R(25,18,14,22,"blue",300,0.25,"16px",0,{y:[-2,2]}),
      R(42,18,14,22,"blue",200,0.3,"16px",0,{y:[-2,2]}),
      R(8,44,48,4,"blue",500,0.1,"8px",0),
      R(8,52,12,14,"cyan",200,0.3,"12px",0),
      R(23,52,12,14,"blue",100,0.3,"12px",0),
      R(38,52,12,14,"cyan",200,0.25,"12px",0),
      R(62,8,30,22,"blue",400,0.2,"9999px",5,{y:[-3,3]}),
      R(62,36,30,8,"blue",500,0.1,"8px",0),
      R(62,48,30,22,"blue",300,0.15,"12px",0),
    ],
    dashboard: [
      R(2,4,22,6,"blue",600,0.2,"8px",0),
      R(60,4,12,6,"blue",500,0.15,"8px",0),
      R(76,4,12,6,"blue",500,0.1,"8px",0),
      R(2,14,22,38,"blue",50,0.3,"12px",0),
      R(4,18,16,4,"blue",400,0.25,"6px",0),
      R(4,26,6,5,"blue",600,0.3,"4px",0,{h:[-3,4]}),
      R(13,24,6,7,"blue",500,0.25,"4px",0,{h:[-2,6]}),
      R(4,34,6,6,"blue",600,0.2,"4px",0,{h:[-3,4]}),
      R(13,32,6,8,"blue",500,0.2,"4px",0,{h:[-2,6]}),
      R(28,14,70,55,"blue",50,0.2,"12px",0),
      R(32,18,30,4,"blue",500,0.2,"8px",0),
      R(32,26,62,6,"blue",200,0.3,"6px",0,{w:[-3,3]}),
      R(32,36,14,14,"cyan",200,0.3,"8px",0),
      R(50,36,14,14,"blue",200,0.25,"8px",0),
      R(68,36,14,14,"cyan",200,0.2,"8px",0),
      R(32,54,20,6,"blue",500,0.2,"6px",0),
      R(56,54,18,6,"blue",400,0.15,"6px",0),
      R(78,54,16,6,"blue",300,0.1,"6px",0),
    ],
  },

  pharmacy: {
    website: [
      R(8,6,45,8,"emerald",500,0.25,"16px",0),
      R(8,18,20,8,"emerald",200,0.4,"16px",0),
      R(8,30,20,14,"emerald",100,0.35,"12px",0,{y:[-2,2]}),
      R(32,18,22,26,"emerald",300,0.2,"12px",0),
      R(60,8,32,18,"emerald",400,0.2,"9999px",-3,{y:[-3,3]}),
      R(60,30,32,8,"emerald",500,0.1,"8px",0),
      R(60,42,18,22,"emerald",200,0.25,"12px",0),
      R(82,42,10,22,"teal",200,0.25,"12px",0),
    ],
    dashboard: [
      R(2,4,22,6,"emerald",600,0.2,"8px",0),
      R(60,4,12,6,"emerald",500,0.15,"8px",0),
      R(76,4,12,6,"emerald",500,0.1,"8px",0),
      R(2,14,22,38,"emerald",50,0.3,"12px",0),
      R(4,18,16,4,"emerald",400,0.25,"6px",0),
      R(4,26,6,5,"emerald",600,0.3,"4px",0,{h:[-3,5]}),
      R(13,28,6,3,"emerald",500,0.2,"4px",0),
      R(4,34,6,4,"emerald",600,0.25,"4px",0,{h:[-3,5]}),
      R(13,36,6,2,"emerald",500,0.15,"4px",0),
      R(28,14,70,55,"emerald",50,0.2,"12px",0),
      R(32,18,28,4,"emerald",500,0.2,"8px",0),
      R(32,26,12,20,"emerald",200,0.35,"8px",0),
      R(48,26,12,16,"emerald",300,0.25,"8px",0),
      R(64,26,12,24,"emerald",200,0.3,"8px",0),
      R(32,50,18,6,"emerald",500,0.2,"6px",0),
      R(54,50,16,6,"emerald",400,0.15,"6px",0),
      R(74,50,18,6,"emerald",300,0.1,"6px",0),
    ],
  },

  autoshop: {
    website: [
      R(8,6,50,8,"orange",500,0.25,"16px",0),
      R(8,18,35,14,"orange",200,0.35,"16px",0,{y:[-2,2]}),
      R(8,36,18,20,"orange",100,0.3,"12px",0),
      R(30,36,18,20,"orange",200,0.25,"12px",0),
      R(55,8,37,18,"orange",400,0.2,"9999px",-5,{y:[-3,3]}),
      R(55,30,37,8,"orange",500,0.1,"8px",0),
      R(55,42,18,28,"slate",200,0.3,"12px",0),
      R(77,42,15,28,"orange",200,0.25,"12px",0),
    ],
    dashboard: [
      R(2,4,22,6,"orange",600,0.2,"8px",0),
      R(60,4,12,6,"orange",500,0.15,"8px",0),
      R(76,4,12,6,"orange",500,0.1,"8px",0),
      R(2,14,22,38,"orange",50,0.3,"12px",0),
      R(4,18,16,4,"orange",400,0.25,"6px",0),
      R(4,26,14,10,"orange",200,0.35,"8px",0),
      R(4,40,14,8,"orange",300,0.3,"8px",0),
      R(28,14,70,55,"orange",50,0.2,"12px",0),
      R(32,18,28,4,"orange",500,0.2,"8px",0),
      R(32,26,30,5,"orange",300,0.25,"6px",0,{w:[-3,3]}),
      R(32,34,14,14,"orange",200,0.3,"8px",0),
      R(50,34,14,14,"slate",200,0.25,"8px",0),
      R(68,34,14,14,"orange",200,0.2,"8px",0),
      R(32,52,8,6,"orange",600,0.25,"9999px",0,{scale:[1,1.1]}),
      R(44,52,8,6,"orange",500,0.2,"9999px",0,{scale:[1,1.1]}),
      R(56,52,8,6,"orange",600,0.15,"9999px",0,{scale:[1,1.1]}),
      R(72,52,8,6,"orange",500,0.15,"9999px",0,{scale:[1,1.1]}),
    ],
  },

  vet: {
    website: [
      R(8,6,45,8,"teal",500,0.25,"16px",0),
      R(8,18,24,16,"teal",200,0.35,"16px",0,{y:[-2,2]}),
      R(36,18,18,16,"teal",300,0.25,"16px",0,{y:[-2,2]}),
      R(8,38,46,4,"teal",500,0.1,"8px",0),
      R(8,46,14,18,"emerald",200,0.3,"12px",0),
      R(26,46,14,18,"teal",100,0.3,"12px",0),
      R(44,46,10,18,"emerald",200,0.25,"12px",0),
      R(60,8,32,22,"teal",400,0.2,"9999px",0,{y:[-3,3]}),
      R(60,34,32,8,"teal",500,0.1,"8px",0),
      R(60,46,32,20,"teal",300,0.15,"12px",0),
    ],
    dashboard: [
      R(2,4,22,6,"teal",600,0.2,"8px",0),
      R(60,4,12,6,"teal",500,0.15,"8px",0),
      R(76,4,12,6,"teal",500,0.1,"8px",0),
      R(2,14,22,38,"teal",50,0.3,"12px",0),
      R(4,18,16,4,"teal",400,0.25,"6px",0),
      R(4,26,14,6,"teal",200,0.35,"8px",0),
      R(4,36,6,5,"teal",600,0.25,"9999px",0,{scale:[1,1.15]}),
      R(13,36,6,5,"teal",500,0.2,"9999px",0,{scale:[1,1.15]}),
      R(28,14,70,55,"teal",50,0.2,"12px",0),
      R(32,18,28,4,"teal",500,0.2,"8px",0),
      R(32,26,20,16,"emerald",200,0.35,"8px",0),
      R(56,26,20,12,"teal",200,0.25,"8px",0),
      R(56,42,20,8,"teal",300,0.2,"8px",0,{h:[-2,4]}),
      R(32,46,18,6,"teal",500,0.2,"6px",0),
      R(54,46,16,6,"teal",400,0.15,"6px",0),
      R(74,46,14,6,"teal",300,0.1,"6px",0),
    ],
  },

  salon: {
    website: [
      R(8,6,45,8,"pink",500,0.25,"16px",0),
      R(8,18,22,22,"pink",200,0.35,"16px",0,{y:[-2,2]}),
      R(34,18,20,22,"purple",200,0.3,"16px",0,{y:[-2,2]}),
      R(8,44,46,4,"pink",500,0.1,"8px",0),
      R(8,52,14,14,"pink",100,0.3,"12px",0),
      R(26,52,14,14,"purple",100,0.25,"12px",0),
      R(44,52,10,14,"pink",200,0.25,"12px",0),
      R(60,8,32,20,"pink",400,0.2,"9999px",-5,{y:[-3,3]}),
      R(60,32,32,8,"pink",500,0.1,"8px",0),
      R(60,44,32,24,"purple",200,0.2,"12px",0),
    ],
    dashboard: [
      R(2,4,22,6,"pink",600,0.2,"8px",0),
      R(60,4,12,6,"pink",500,0.15,"8px",0),
      R(76,4,12,6,"pink",500,0.1,"8px",0),
      R(2,14,22,38,"pink",50,0.3,"12px",0),
      R(4,18,16,4,"pink",400,0.25,"6px",0),
      R(4,26,8,4,"pink",600,0.25,"9999px",0,{y:[-2,2]}),
      R(15,26,8,4,"purple",500,0.2,"9999px",0,{y:[-2,2]}),
      R(4,34,8,4,"pink",600,0.2,"9999px",0,{y:[-2,2]}),
      R(15,34,8,4,"purple",500,0.15,"9999px",0,{y:[-2,2]}),
      R(28,14,70,55,"pink",50,0.2,"12px",0),
      R(32,18,30,4,"pink",500,0.2,"8px",0),
      R(32,26,14,18,"pink",200,0.35,"8px",0),
      R(50,26,14,14,"purple",200,0.25,"8px",0),
      R(68,26,14,18,"pink",200,0.3,"8px",0),
      R(32,48,18,6,"pink",500,0.2,"6px",0),
      R(54,48,16,6,"pink",400,0.15,"6px",0),
      R(74,48,18,6,"purple",300,0.1,"6px",0),
    ],
  },

  gym: {
    website: [
      R(8,6,55,8,"orange",500,0.25,"16px",0),
      R(8,18,18,14,"orange",200,0.35,"16px",0,{y:[-2,2]}),
      R(30,18,18,14,"orange",300,0.25,"16px",0,{y:[-2,2]}),
      R(52,18,11,14,"orange",200,0.3,"16px",0,{y:[-2,2]}),
      R(8,36,55,4,"slate",500,0.1,"8px",0),
      R(8,44,12,18,"orange",300,0.3,"12px",0),
      R(24,44,12,18,"slate",300,0.25,"12px",0),
      R(40,44,12,18,"orange",200,0.3,"12px",0),
      R(68,8,24,24,"orange",400,0.25,"9999px",0,{y:[-3,3]}),
      R(68,36,24,8,"orange",500,0.1,"8px",0),
      R(68,48,24,18,"slate",200,0.2,"12px",0),
    ],
    dashboard: [
      R(2,4,22,6,"orange",600,0.2,"8px",0),
      R(60,4,12,6,"orange",500,0.15,"8px",0),
      R(76,4,12,6,"orange",500,0.1,"8px",0),
      R(2,14,22,38,"orange",50,0.3,"12px",0),
      R(4,18,16,4,"orange",400,0.25,"6px",0),
      R(4,26,14,4,"orange",500,0.3,"6px",0,{w:[-3,3]}),
      R(4,34,6,6,"orange",600,0.25,"4px",0,{h:[-3,5]}),
      R(14,34,6,6,"orange",500,0.2,"4px",0,{h:[-3,5]}),
      R(28,14,70,55,"orange",50,0.2,"12px",0),
      R(32,18,28,4,"orange",500,0.2,"8px",0),
      R(32,26,14,22,"orange",200,0.35,"8px",0),
      R(50,26,14,18,"slate",200,0.25,"8px",0),
      R(68,26,14,22,"orange",200,0.3,"8px",0),
      R(32,52,18,6,"orange",500,0.2,"6px",0),
      R(54,52,16,6,"orange",400,0.15,"6px",0),
      R(74,52,14,6,"slate",300,0.1,"6px",0),
    ],
  },
}

export const businessTypes = [
  { id: "cafe", icon: "coffee" },
  { id: "restaurant", icon: "utensils" },
  { id: "retail", icon: "bag" },
  { id: "pharmacy", icon: "pill" },
  { id: "autoshop", icon: "wrench" },
  { id: "vet", icon: "paw" },
  { id: "salon", icon: "scissors" },
  { id: "gym", icon: "dumbbell" },
]

export const typeLabels = {
  cafe: { en: "Coffee Shop", es: "Cafetería" },
  restaurant: { en: "Restaurant", es: "Restaurante" },
  retail: { en: "Retail Store", es: "Tienda" },
  pharmacy: { en: "Pharmacy", es: "Farmacia" },
  autoshop: { en: "Auto Shop", es: "Taller Mecánico" },
  vet: { en: "Vet Clinic", es: "Veterinaria" },
  salon: { en: "Salon", es: "Peluquería" },
  gym: { en: "Gym", es: "Gimnasio" },
}

export const typeDescs = {
  cafe: {
    website: { en: "Beautiful menu showcase with online ordering and location info.", es: "Menú digital atractivo con pedidos en línea e información de ubicación." },
    dashboard: { en: "Real-time inventory, hourly sales, and staff scheduling.", es: "Inventario en tiempo real, ventas por hora y programación de personal." },
  },
  restaurant: {
    website: { en: "Reservation system, interactive menu, and photo gallery.", es: "Sistema de reservas, menú interactivo y galería de fotos." },
    dashboard: { en: "Table management, P&L tracking, and waiter assignments.", es: "Gestión de mesas, control de G&P y asignación de mozos." },
  },
  retail: {
    website: { en: "E-commerce catalog, product pages, and SEO blog.", es: "Catálogo e-commerce, páginas de producto y blog SEO." },
    dashboard: { en: "Stock control, purchase orders, and multi-store overview.", es: "Control de stock, órdenes de compra y vista multi-tienda." },
  },
  pharmacy: {
    website: { en: "Medicine search, category browsing, and health blog.", es: "Búsqueda de medicamentos, categorías y blog de salud." },
    dashboard: { en: "Stock tracking, expiry alerts, and prescription queue.", es: "Seguimiento de stock, alertas de vencimiento y cola de recetas." },
  },
  autoshop: {
    website: { en: "Service catalog, online booking, and customer reviews.", es: "Catálogo de servicios, reservas online y reseñas de clientes." },
    dashboard: { en: "Job status board, appointment timeline, and parts inventory.", es: "Tablero de trabajos, timeline de citas e inventario de repuestos." },
  },
  vet: {
    website: { en: "Service showcase, team profiles, and appointment booking.", es: "Servicios, perfiles del equipo y reserva de turnos." },
    dashboard: { en: "Patient queue, treatment calendar, and medicine stock.", es: "Cola de pacientes, calendario de tratamientos y stock de medicamentos." },
  },
  salon: {
    website: { en: "Portfolio gallery, pricing table, and online booking.", es: "Galería de trabajos, tabla de precios y reserva online." },
    dashboard: { en: "Appointment schedule, staff roster, and product sales.", es: "Agenda de turnos, roster del personal y ventas de productos." },
  },
  gym: {
    website: { en: "Class schedule, membership tiers, and trainer profiles.", es: "Horario de clases, planes de membresía y perfiles de entrenadores." },
    dashboard: { en: "Member attendance, class capacity, and revenue tracker.", es: "Asistencia de miembros, capacidad de clases y control de ingresos." },
  },
}

export const typeColorSchemes = {
  cafe: { primary: "amber", secondary: "orange", dark: "950", light: "50" },
  restaurant: { primary: "red", secondary: "orange", dark: "950", light: "50" },
  retail: { primary: "blue", secondary: "cyan", dark: "950", light: "50" },
  pharmacy: { primary: "emerald", secondary: "teal", dark: "950", light: "50" },
  autoshop: { primary: "orange", secondary: "slate", dark: "950", light: "50" },
  vet: { primary: "teal", secondary: "emerald", dark: "950", light: "50" },
  salon: { primary: "pink", secondary: "purple", dark: "950", light: "50" },
  gym: { primary: "orange", secondary: "slate", dark: "950", light: "50" },
}

export { rgb }
