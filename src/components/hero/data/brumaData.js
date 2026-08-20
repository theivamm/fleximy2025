export const BRUMA_PRODUCTS = [
  {
    id: "croissant-pistacho",
    name: "Croissant Pistacho",
    description: "Masa laminada · crema de pistacho · frambuesa",
    price: "$8.900",
    category: "Pastelería",
    emoji: "🥐",
  },
  {
    id: "roll-canela",
    name: "Roll de Canela",
    description: "Masa esponjosa · glaseado de canela",
    price: "$6.500",
    category: "Pastelería",
    emoji: "🍞",
  },
  {
    id: "focaccia-mortadela",
    name: "Focaccia Mortadela",
    description: "Focaccia artesanal · mortadela · pesto",
    price: "$12.800",
    category: "Cocina",
    emoji: "🫓",
  },
  {
    id: "iced-matcha",
    name: "Iced Matcha",
    description: "Matcha ceremonial · leche de avena · hielo",
    price: "$5.900",
    category: "Bebidas",
    emoji: "🍵",
  },
]

export const BRUMA_ORDER = {
  id: "#184",
  items: [
    { productId: "croissant-pistacho", qty: 1 },
    { productId: "iced-matcha", qty: 1 },
  ],
  channel: "Retiro",
  time: "12:42",
  total: "$14.800",
  estimatedReady: "18–22 min",
}
