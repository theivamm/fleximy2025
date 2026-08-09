import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"
import Button from "../ui/Button"
import { CheckDot, Bullet } from "./Primitives"
import { INDUSTRIES } from "../../data/industries"

export function SectionHead({ kicker, title, lead, dark = false, center = false, className = "" }) {
  const text = dark ? "text-text-invert" : "text-text"
  const muted = dark ? "text-text-invert/65" : "text-muted"
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className="kicker justify-center" style={{ color: dark ? "rgba(244,243,238,0.55)" : undefined }}>
        {kicker}
      </p>
      <h2 className={`mt-4 text-h1 ${text}`}>{title}</h2>
      {lead && <p className={`mt-5 text-lead measure-narrow ${center ? "mx-auto" : ""} ${muted}`}>{lead}</p>}
    </div>
  )
}

export function Problem({ data, accent }) {
  return (
    <section className="container-site py-20 lg:py-28">
      <SectionHead kicker="El problema" title={data.problema.titulo} />
      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {data.problema.items.map((item, i) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-line bg-paper-bright p-5 text-body text-muted"
            style={{ transform: i % 2 ? "rotate(0.3deg)" : "rotate(-0.3deg)" }}
          >
            <Bullet accent={accent} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Duo({ data, accent }) {
  return (
    <section className="bg-ink py-20 text-text-invert lg:py-28">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker" style={{ color: "rgba(244,243,238,0.55)" }}>
              Para el cliente
            </p>
            <h2 className="mt-4 text-h1">{data.experiencia.titulo}</h2>
            <p className="mt-4 text-lead text-text-invert/65">{data.experiencia.lead}</p>
            <div className="mt-8 grid gap-6">
              {data.experiencia.grupos.map((g) => (
                <div key={g.titulo}>
                  <h3 className="text-h4 text-cyan">{g.titulo}</h3>
                  <ul className="mt-3 grid gap-2">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-small text-text-invert/85">
                        <span className="mt-0.5 size-2 shrink-0 rounded-full bg-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-10">
            <p className="kicker" style={{ color: "rgba(244,243,238,0.55)" }}>
              Para el equipo
            </p>
            <h2 className="mt-4 text-h1">{data.panel.titulo}</h2>
            <p className="mt-4 text-lead text-text-invert/65">{data.panel.lead}</p>
            <ul className="mt-8 grid gap-2.5">
              {data.panel.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-line-dark bg-ink-soft px-4 py-3 text-small text-text-invert/90"
                >
                  <CheckDot accent={accent} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeatureList({ title, lead, items, accent, dark = false, nota }) {
  const base = dark ? "bg-ink text-text-invert" : ""
  return (
    <div className={base}>
      <div className="container-site py-20 lg:py-28">
        <SectionHead kicker="El sistema" title={title} lead={lead} dark={dark} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className={`flex items-start gap-3 rounded-2xl border p-5 text-body ${
                dark ? "border-line-dark bg-ink-soft text-text-invert/85" : "border-line bg-paper-bright text-text"
              }`}
            >
              <Bullet accent={accent} />
              {item}
            </li>
          ))}
        </ul>
        {nota && (
          <p className="mt-6 font-mono text-micro text-muted">{nota}</p>
        )}
      </div>
    </div>
  )
}

export function Groups({ data, accent }) {
  return (
    <section className="container-site py-20 lg:py-28">
      <SectionHead kicker="El sistema" title={data.experiencia.titulo} lead={data.experiencia.lead} />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {data.experiencia.grupos.map((g, i) => (
          <div key={g.titulo} className="rounded-[var(--radius-card)] border border-line bg-paper-bright p-7">
            <span className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-h3">{g.titulo}</h3>
            <ul className="mt-5 grid gap-2.5">
              {g.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-small text-muted">
                  <span className="mt-1 size-2 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ModuleChips({ data, accent }) {
  return (
    <section className="border-y border-line bg-paper-bright py-20 lg:py-24">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="kicker">{data.modulos.titulo}</p>
            <h2 className="mt-4 text-h2">{data.modulos.titulo}</h2>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {data.modulos.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-paper px-4 py-2 text-small text-text"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Automations({ data, accent }) {
  return (
    <section className="container-site py-20 lg:py-28">
      <SectionHead kicker="Comunicación" title={data.automatizaciones.titulo} />
      <div className="mt-12 grid gap-0">
        {data.automatizaciones.items.map((item, i) => (
          <div key={item} className="flex items-center gap-5">
            <div className="flex w-14 flex-col items-center self-stretch">
              <span className="grid size-8 place-items-center rounded-full border border-line bg-paper-bright font-mono text-micro">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < data.automatizaciones.items.length - 1 && (
                <span className="mt-2 w-px flex-1 bg-line" />
              )}
            </div>
            <p className="py-5 text-body text-text">{item}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-micro text-muted">{data.automatizaciones.nota}</p>
    </section>
  )
}

export function Reports({ data, accent }) {
  return (
    <section className="container-site py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <SectionHead kicker="Visibilidad" title={data.reportes.titulo} lead={data.reportes.nota} />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {data.reportes.items.map((item, i) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-xl border border-line bg-paper-bright px-4 py-3"
            >
              <span className="text-small">{item}</span>
              <span
                className="h-1 w-10 rounded-full"
                style={{ backgroundColor: accent, opacity: 0.35 + i * 0.1 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Modalidades({ data, accent }) {
  return (
    <section className="bg-ink py-20 text-text-invert lg:py-28">
      <div className="container-site">
        <SectionHead kicker="Modalidades" title={data.modalidades.titulo} dark lead={data.modalidades.nota} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {data.modalidades.items.map((m, i) => (
            <div key={m.titulo} className="rounded-[var(--radius-card)] border border-line-dark bg-ink-soft p-7">
              <span className="font-mono text-micro text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-h3">{m.titulo}</h3>
              <p className="mt-2 text-small text-text-invert/65">{m.detalle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Integraciones({ data, accent }) {
  return (
    <section className="container-site py-20 lg:py-28">
      <SectionHead kicker="Integraciones" title={data.integraciones.titulo} />
      <div className="mt-10 flex flex-wrap gap-2.5">
        {data.integraciones.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-line bg-paper-bright px-4 py-2 text-small text-text"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

export function Recorrido({ data, accent }) {
  return (
    <section className="container-site py-20 lg:py-28">
      <SectionHead kicker="Recorrido" title={data.recorrido.titulo} />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {data.recorrido.steps.map((step, i) => (
          <li key={step} className="flex items-start gap-4 bg-paper-bright p-6">
            <span className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-small text-text">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Audience({ data, accent }) {
  return (
    <section className="border-y border-line bg-paper-bright py-20 lg:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <SectionHead kicker="Para quién" title={data.audiencia.titulo} />
        <ul className="flex flex-wrap gap-2.5">
          {data.audiencia.items.map((item) => (
            <li key={item} className="rounded-full border border-line bg-paper px-4 py-2 text-small text-text">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function FaqBlock({ data }) {
  const [abierta, setAbierta] = useState(0)
  return (
    <section className="container-site py-20 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHead kicker="Preguntas frecuentes" title="Lo que suelen preguntar" center />
        <div className="mt-10 flex flex-col divide-y divide-line border-y border-line">
          {data.faq.map((f, i) => {
            const open = abierta === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setAbierta(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={`faq-sol-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-h4">{f.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted transition-transform duration-[var(--motion-fast)] ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-sol-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[52ch] pb-5 text-body text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function CtaBlock({ data }) {
  const otras = INDUSTRIES.filter((i) => i.slug !== data.slug)
  return (
    <section className="bg-ink text-text-invert">
      <div className="container-site py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker justify-center" style={{ color: "rgba(244,243,238,0.55)" }}>
            Empecemos
          </p>
          <h2 className="mx-auto mt-4 max-w-[20ch] text-h1">{data.cta.titulo}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to={data.cta.primary.to} size="lg">
              {data.cta.primary.label}
            </Button>
            <Button href={data.whatsapp} variant="secondary" size="lg">
              Hablar por WhatsApp
            </Button>
          </div>
        </div>

        <div className="mt-16 border-t border-line-dark pt-8">
          <p className="text-center font-mono text-micro text-text-invert/50">
            Otras soluciones
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {otras.map((o) => (
              <li key={o.slug}>
                <a
                  href={o.to}
                  className="inline-flex items-center gap-1 rounded-full border border-line-dark px-4 py-2 text-small text-text-invert/80 transition-colors hover:border-accent hover:text-text-invert"
                >
                  {o.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function CrossLink({ data, accent }) {
  return (
    <section className="container-site pb-20 lg:pb-28">
      <a
        href={data.to}
        className="group flex items-center justify-between rounded-[var(--radius-card)] border border-line bg-paper-bright px-7 py-6 transition-colors hover:border-ink/30"
      >
        <div>
          <p className="font-mono text-micro text-muted">Volver a</p>
          <p className="mt-1 text-h3">Soluciones para PyMEs</p>
        </div>
        <ArrowRight className="size-6 text-ink transition-transform duration-[var(--motion-base)] ease-[var(--ease-out)] group-hover:translate-x-1" />
      </a>
    </section>
  )
}
