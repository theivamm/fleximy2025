import Marquee from "../ui/Marquee"

const ITEMS = [
  "Apps",
  "Webs",
  "Dashboards",
  "Ecommerce",
  "Automatización",
  "UI/UX",
  "Plataformas",
  "Portales",
  "Sistemas",
  "Prototipos",
]

export default function CapabilitiesMarquee() {
  return (
    <div className="border-y border-outline bg-surface-1/30 py-5">
      <Marquee
        items={ITEMS}
        speed={38}
        itemClassName="px-6 font-display text-2xl font-bold text-text-3 transition-colors duration-300 hover:text-text-1 sm:px-8 sm:text-3xl"
      />
      <p className="sr-only">APPS · WEBS · DASHBOARDS · ECOMMERCE · AUTOMATIZACIÓN · UI/UX · PLATAFORMAS · PORTALES · SISTEMAS · PROTOTIPOS</p>
    </div>
  )
}
