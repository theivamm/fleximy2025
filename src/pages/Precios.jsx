import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import Button from "../components/ui/Button"
import Accordion from "../components/comercial/Accordion"
import { CONTACT } from "../data/navigation"
import {
  PLANES,
  INCLUYE_SUBSCRIPCION,
  COSTOS_ADICIONALES,
  COMPARACION,
  MENSAJE_COMPARACION,
  PRECIO_FAQ,
} from "../data/comercial"

export default function Precios() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".pr-line-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
        )
        .fromTo(
          ".pr-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
    })
    return () => mm.revert()
  }, [])

  return (
    <main ref={root} className="bg-paper text-text">
      <section className="relative overflow-hidden pb-16 pt-28 lg:pt-36">
        <div className="container-site">
          <p className="pr-fade kicker">Precios y alcance</p>
          <h1 className="mt-6 max-w-[18ch] text-hero text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="pr-line-inner block">Una inversión clara para una</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="pr-line-inner block">solución que tu equipo puede usar.</span>
            </span>
          </h1>
          <p className="pr-fade mt-6 max-w-[52ch] text-lead text-muted">
            Comenzá con los módulos que resuelven tu necesidad principal y ampliá la plataforma a
            medida que tu operación evoluciona.
          </p>
          <div className="pr-fade mt-8">
            <Button to="/contacto" size="lg">
              Solicitar propuesta
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <p className="kicker">Tres niveles de la misma plataforma</p>
        <h2 className="mt-4 max-w-[16ch] text-h1">Empezá por lo que necesitás hoy</h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PLANES.map((plan) => (
            <article
              key={plan.id}
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper-bright p-6 lg:p-8"
            >
              <p className="font-mono text-micro text-muted">plan {plan.nombre}</p>
              <p className="mt-3 text-h3">{plan.nombre}</p>
              <p className="mt-2 flex-1 text-small text-muted">{plan.para}</p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-micro text-muted">desde</p>
                <p className="mt-1 text-h2 text-text">
                  {plan.precio.includes("[") ? (
                    <span className="font-mono text-h4">{plan.precio}</span>
                  ) : (
                    plan.precio
                  )}
                  {plan.precioNota && <span className="ml-1 text-h4 text-muted">{plan.precioNota}</span>}
                </p>
              </div>
              <ul className="mt-6 grid gap-2.5">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-small text-text">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/contacto" variant="secondary" className="w-full">
                  {plan.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-[62ch] font-mono text-micro text-muted">
          el monto final se confirma en el diagnóstico según módulos, usuarios y volumen · los
          valores aquí presentados son niveles de referencia pendientes de validación comercial
        </p>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Incluido</p>
            <h2 className="mt-4 text-h1">Toda suscripción incluye</h2>
            <ul className="mt-8 grid gap-2.5">
              {INCLUYE_SUBSCRIPCION.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-small">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-micro text-muted">se cotiza por separado cuando corresponde</p>
            <ul className="mt-4 grid gap-2.5">
              {COSTOS_ADICIONALES.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-small text-muted">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-dark-surface/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <p className="kicker">Comparación realista</p>
        <h2 className="mt-4 max-w-[16ch] text-h1">Contra la forma habitual de operar</h2>
        <div className="mt-12 overflow-x-auto rounded-[var(--radius-card)] border border-line">
          <table className="w-full min-w-[620px] border-collapse bg-paper-bright text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="sticky top-16 bg-paper-bright px-5 py-4 font-mono text-micro text-muted md:top-20">
                  Situación habitual
                </th>
                <th className="sticky top-16 bg-paper-bright px-5 py-4 font-mono text-micro text-muted md:top-20">
                  Herramientas separadas
                </th>
                <th className="sticky top-16 bg-paper-bright px-5 py-4 font-mono text-micro text-ink md:top-20">
                  Con Fleximy
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARACION.map((row) => (
                <tr key={row.situacion} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-4 text-small font-semibold text-text">{row.situacion}</td>
                  <td className="px-5 py-4 text-small text-muted">{row.separadas}</td>
                  <td className="px-5 py-4 text-small font-medium text-text">{row.fleximy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <blockquote className="mt-8 max-w-[56ch] border-l-2 border-accent pl-5 text-lead text-muted">
          {MENSAJE_COMPARACION}
        </blockquote>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="kicker">Preguntas de precio</p>
          <h2 className="mt-4 text-h1">Dudas frecuentes sobre costos</h2>
          <div className="mt-10">
            <Accordion items={PRECIO_FAQ} idPrefix="precio-faq" />
          </div>
        </div>
      </section>

      <section className="bg-dark-surface text-text-invert">
        <div className="container-site py-24 text-center lg:py-32">
          <p className="kicker justify-center" style={{ color: "rgba(245,246,255,0.55)" }}>
            Propuesta
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">
            Recibí una propuesta basada en lo que realmente necesitás
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-text-invert/70">
            En el diagnóstico definimos una primera versión, los módulos incluidos, el plazo y el
            precio antes de comenzar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/contacto" size="lg">
              Solicitar propuesta
            </Button>
            <Button href={CONTACT.whatsapp} variant="secondary" size="lg">
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
