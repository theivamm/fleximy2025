import { ArrowUpRight } from "lucide-react"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
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
  return (
    <main>
      <PageHero
        kicker="Precios y alcance"
        title={
          <>
            Una inversión clara para una solución{" "}
            <span className="text-gradient">que tu equipo puede usar.</span>
          </>
        }
        lead="Comenzá con los módulos que resuelven tu necesidad principal y ampliá la plataforma a medida que tu operación evoluciona."
        actions={
          <PrimaryCTA to="/contacto" large>
            Solicitar propuesta
            <ArrowUpRight className="size-4" />
          </PrimaryCTA>
        }
      />

      <section className="container-site py-20 lg:py-28">
        <p className="kicker">Tres niveles de la misma plataforma</p>
        <h2 className="text-h2 mt-4 max-w-[16ch] text-text-1">Empezá por lo que necesitás hoy</h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PLANES.map((plan) => (
            <article
              key={plan.id}
              className="flex flex-col rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8"
            >
              <p className="font-mono text-micro text-text-3">plan {plan.nombre}</p>
              <p className="text-h3 mt-3 text-text-1">{plan.nombre}</p>
              <p className="mt-2 flex-1 text-small text-text-2">{plan.para}</p>
              <div className="mt-6 border-t border-outline pt-5">
                <p className="font-mono text-micro text-text-3">desde</p>
                <p className="text-h2 mt-1 text-text-1">
                  {plan.precio.includes("[") ? (
                    <span className="text-h4 font-mono">{plan.precio}</span>
                  ) : (
                    plan.precio
                  )}
                  {plan.precioNota && <span className="text-h4 ml-1 text-text-2">{plan.precioNota}</span>}
                </p>
              </div>
              <ul className="mt-6 grid gap-2.5">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-small text-text-1">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <OutlineCTA to="/contacto" className="w-full">
                  {plan.cta}
                </OutlineCTA>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-[62ch] font-mono text-micro text-text-3">
          el monto final se confirma en el diagnóstico según módulos, usuarios y volumen · los
          valores aquí presentados son niveles de referencia pendientes de validación comercial
        </p>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Incluido</p>
            <h2 className="text-h2 mt-4 text-text-1">Toda suscripción incluye</h2>
            <ul className="mt-8 grid gap-2.5">
              {INCLUYE_SUBSCRIPCION.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/60 px-4 py-3 text-small text-text-1">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-micro text-text-3">se cotiza por separado cuando corresponde</p>
            <ul className="mt-4 grid gap-2.5">
              {COSTOS_ADICIONALES.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-2/40 px-4 py-3 text-small text-text-2">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-surface-3/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <p className="kicker">Comparación realista</p>
        <h2 className="text-h2 mt-4 max-w-[16ch] text-text-1">Contra la forma habitual de operar</h2>
        <div className="mt-12 overflow-x-auto rounded-[var(--radius-card)] border border-outline">
          <table className="w-full min-w-[620px] border-collapse bg-surface-1/60 text-left">
            <thead>
              <tr className="border-b border-outline">
                <th className="px-5 py-4 font-mono text-micro text-text-3">Situación habitual</th>
                <th className="px-5 py-4 font-mono text-micro text-text-3">Herramientas separadas</th>
                <th className="px-5 py-4 font-mono text-micro text-text-1">Con Fleximy</th>
              </tr>
            </thead>
            <tbody>
              {COMPARACION.map((row) => (
                <tr key={row.situacion} className="border-b border-outline last:border-b-0">
                  <td className="px-5 py-4 text-small font-semibold text-text-1">{row.situacion}</td>
                  <td className="px-5 py-4 text-small text-text-2">{row.separadas}</td>
                  <td className="px-5 py-4 text-small font-medium text-text-1">{row.fleximy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <blockquote className="mt-8 max-w-[56ch] border-l-2 border-accent pl-5 lead-text text-text-2">
          {MENSAJE_COMPARACION}
        </blockquote>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="kicker">Preguntas de precio</p>
          <h2 className="text-h2 mt-4 text-text-1">Dudas frecuentes sobre costos</h2>
          <div className="mt-10">
            <Accordion items={PRECIO_FAQ} idPrefix="precio-faq" />
          </div>
        </div>
      </section>

      <section className="container-site pb-20 lg:pb-28">
        <div
          className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16"
          style={{ backgroundImage: "var(--background-image-primary)" }}
        >
          <p className="kicker justify-center">Propuesta</p>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            Recibí una propuesta basada en lo que realmente necesitás
          </h2>
          <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
            En el diagnóstico definimos una primera versión, los módulos incluidos, el plazo y el
            precio antes de comenzar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA to="/contacto" large>
              Solicitar propuesta
            </PrimaryCTA>
            <OutlineCTA href={CONTACT.whatsapp} large>
              Hablar por WhatsApp
            </OutlineCTA>
          </div>
        </div>
      </section>
    </main>
  )
}
