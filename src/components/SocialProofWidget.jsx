import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { whatsappUrl } from "../data/config"
import "./social-proof.css"

const SHOW_MS = 5200
const GAP_MS = 550

const MESSAGES = [
  { e: "☕", t: "Cafetería Bruma agiliza sus pedidos con un menú por NFC." },
  { e: "🍕", t: "Pizzería Donato digitalizó sus pedidos y reservas." },
  { e: "🏢", t: "Inmobiliaria Andina agiliza visitas y consultas con NFC." },
  { e: "✒️", t: "El estudio de tatuajes Inktide reserva turnos sin apps." },
  { e: "💅", t: "Maru Nails organiza agendas y clientas desde una app." },
  { e: "💈", t: "Barbería El Corte simplifica turnos y pagos al instante." },
  { e: "🍔", t: "La burguer de barrio suma más pedidos con su menú digital." },
  { e: "🦷", t: "Clínica dental Sonría gestiona turnos y recordatorios." },
  { e: "🐶", t: "Pet Shop Colitas agiliza reservas de peluquería animal." },
  { e: "🏋️", t: "Gimnasio Fuerza vende planes y turnos desde una app." },
  { e: "💇‍♀️", t: "Peluquería Lumi recupera clientas con citas por WhatsApp." },
  { e: "🔧", t: "Ferretería Central actualiza su catálogo con NFC." },
  { e: "🍞", t: "Panadería San Martín agiliza pedidos por mostrador." },
  { e: "🌿", t: "Spa Zen gestiona reservas y paquetes de regalo." },
  { e: "🍰", t: "Pastelería Dulce Tentación vende más por encargos." },
  { e: "🎓", t: "Academia Nexo coordina alumnos y cobros mensuales." },
  { e: "👗", t: "Boutique Violeta agiliza consultas de stock y talle." },
  { e: "🚗", t: "Lavadero AutoFull gestiona turnos y seguimiento." },
  { e: "📚", t: "Librería El Rincón toma pedidos por WhatsApp al instante." },
  { e: "📸", t: "Estudio de fotos Instante agiliza reservas y sesiones." },
  { e: "🌹", t: "Floristería Primavera toma encargos y envíos en minutos." },
  { e: "🍺", t: "Cervecería artesanal Lupuland agiliza mesas de degustación." },
  { e: "🦋", t: "Centro de estética Glow gestiona citas y combos." },
  { e: "👁️", t: "Óptica Claridad recuerda turnos de control a sus clientes." },
  { e: "🍦", t: "Heladería Al Paso agiliza pedidos de cumpleaños." },
  { e: "🧘", t: "Estudio de yoga Sattva inscribe clases y planillas." },
  { e: "🔑", t: "Cerrajería Pronta atiende urgencias y pedidos más rápido." },
  { e: "🪑", t: "Mueblería Hogar agiliza consultas de medidas y stock." },
  { e: "🐾", t: "Veterinaria Patitas recorda vacunas y turnos a los dueños." },
  { e: "🍷", t: "Vinoteca Reserva toma pedidos para entregas a domicilio." },
  { e: "🥙", t: "Local de comida árabe agiliza pedidos para llevar." },
  { e: "🧰", t: "Electricista 24hs organiza presupuestos y trabajos." },
  { e: "🚚", t: "Remisería Destino coordina viajes y pagos." },
  { e: "🌾", t: "Dietética Natural vende más con catálogo digital." },
  { e: "🍣", t: "Sushibox agiliza pedidos del día en pensarlo." },
  { e: "🛍️", t: "Indumentaria Urbana agiliza ventas de temporada." },
  { e: "🍳", t: "Desayunos Mary toma encargos para regalar." },
  { e: "🧁", t: "Repostería Doña Rosa agiliza pedidos online." },
  { e: "📦", t: "Almacén Don Pedro recibe pedidos por mensaje." },
  { e: "🪟", t: "Aberturas del Sol agiliza presupuestos y mediciones." },
  { e: "💐", t: "Floristería Primavera agiliza entregas de ramos en minutos." },
  { e: "🎂", t: "Tortas Feli agiliza encargos de cumpleaños." },
  { e: "🐟", t: "Pescadería Mar del Sur acortó la fila del mostrador." },
  { e: "🥬", t: "Verdulería Surte agiliza pedidos por barrio." },
  { e: "🧴", t: "Perfumería Fragancia recupera clientas recurrentes." },
  { e: "🪙", t: "Casa de cambio agiliza cotizaciones por consulta." },
  { e: "🏨", t: "Hostal Camino gestiona reservas y check-in." },
  { e: "🩺", t: "Kinesiología Movete agiliza turnos y planes." },
  { e: "🧑‍🔧", t: "Servicio técnico FixIt organiza órdenes de trabajo." },
  { e: "🏀", t: "Club deportivo Vencedor inscribe socios y cuotas." },
  { e: "🎤", t: "Sala de ensayo Core gestiona alquileres por hora." },
  { e: "🎨", t: "Taller de arte Trazo agiliza inscripciones a talleres." },
  { e: "🚴", t: "Bicicletería Rodada agiliza service y turnos." },
]

export default function SocialProofWidget() {
  const [shown, setShown] = useState(true)
  const [item, setItem] = useState(0)
  const pausedRef = useRef(false)
  const dismissedRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return
    setShown(true)
  }, [])

  useEffect(() => {
    if (dismissedRef.current) return
    let t
    if (shown) {
      t = setTimeout(
        () => {
          if (!pausedRef.current) setShown(false)
        },
        SHOW_MS
      )
    } else {
      t = setTimeout(() => {
        if (pausedRef.current) return
        setItem((i) => (i + 1) % MESSAGES.length)
        setShown(true)
      }, GAP_MS)
    }
    return () => clearTimeout(t)
  }, [shown])

  if (dismissedRef.current) return null

  const msg = MESSAGES[item]

  return (
    <aside
      className={`sp ${shown ? "sp--in" : "sp--out"}`}
      aria-hidden={!shown}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <button
        type="button"
        className="sp-close"
        aria-label="Cerrar notificación"
        onClick={() => { dismissedRef.current = true; setShown(false) }}
      >
        <X size={14} aria-hidden="true" />
      </button>

      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="sp-card" data-track="click_social_proof">
        <span className="sp-avatar" aria-hidden="true">{msg.e}</span>
        <span className="sp-body">
          <span className="sp-text">{msg.t}</span>
          <span className="sp-meta">
            <span className="sp-meta__dot" aria-hidden="true" />
            Hace un momento
          </span>
        </span>
        <span className="sp-brand" aria-hidden="true">
          <span className="sp-brand__emoji">🙂</span>
        </span>
      </a>
    </aside>
  )
}