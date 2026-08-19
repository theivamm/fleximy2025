const SERVICES = [
  {
    num: "01",
    title: "Sitios web",
    desc: "Webs institucionales, landings y ecommerce rápidos, claros y preparados para convertir visitas en oportunidades.",
    tags: ["Landing pages", "Webs corporativas", "Ecommerce"],
  },
  {
    num: "02",
    title: "Aplicaciones y plataformas",
    desc: "Apps web y portales que conectan usuarios, información y procesos en una experiencia simple.",
    tags: ["Apps web", "Portales", "SaaS", "Áreas privadas"],
  },
  {
    num: "03",
    title: "Dashboards y gestión",
    desc: "Paneles para visualizar métricas, clientes, tareas, ventas, stock y operación desde un solo lugar.",
    tags: ["KPIs", "CRM", "Operaciones", "Reportes"],
  },
  {
    num: "04",
    title: "Automatización",
    desc: "Flujos que reducen tareas manuales y conectan formularios, WhatsApp, sistemas y equipos.",
    tags: ["Integraciones", "Automatizaciones", "Procesos"],
  },
]

function ServiceCard({ service }) {
  return (
    <div className="group rounded-[var(--radius-card)] border border-outline bg-surface-1/40 p-6 sm:p-8 transition-colors duration-300 hover:border-primary/30 hover:bg-surface-1/70">
      <span className="font-mono text-micro text-text-3">{service.num}</span>
      <h3 className="h3-title mt-3 text-text-1">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-2 max-w-[50ch]">{service.desc}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-outline bg-surface-2/50 px-3 py-1 text-xs font-medium text-text-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Servicios() {
  return (
    <section id="servicios" className="section-space relative">
      <div className="container">
        <span className="kicker">Qué hacemos</span>
        <h2 className="h2-title mt-4 max-w-[28ch] text-text-1">
          Soluciones digitales pensadas alrededor de tu negocio.
        </h2>
        <p className="lead-text mt-4 max-w-[56ch] text-text-2">
          Podemos crear desde una web comercial hasta una plataforma completa.
          La solución depende del problema, no de una plantilla.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <ServiceCard key={s.num} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
