import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowRight, ShieldCheck, Fingerprint, LockKeyhole, Server, Database } from "lucide-react"
import Button from "../components/ui/Button"
import {
  CAPAS_SEGURIDAD,
  ACCESOS,
  ACCESOS_NOTA,
  PROTECCION_DATOS,
  PROTECCION_NOTA,
  RESPALDOS,
  RESPALDO_NOTA,
  DISPONIBILIDAD,
  DISPONIBILIDAD_NOTA,
  TERCEROS,
  INCIDENTES,
  PRIVACIDAD_CUBRE,
} from "../data/confianza"

const LAYER_ICONS = [Fingerprint, ShieldCheck, Server, Database]

export default function Seguridad() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".sg-line-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
        )
        .fromTo(
          ".sg-fade",
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
          <p className="sg-fade kicker">Seguridad y continuidad</p>
          <h1 className="mt-6 max-w-[18ch] text-hero text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="sg-line-inner block">La operación de tu negocio</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="sg-line-inner block">merece una base responsable.</span>
            </span>
          </h1>
          <p className="sg-fade mt-6 max-w-[52ch] text-lead text-muted">
            Aplicamos medidas técnicas y operativas para proteger la plataforma, administrar
            accesos y responder ante incidentes.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-16 lg:py-20">
        <div className="container-site">
          <p className="kicker">Cómo circula la información</p>
          <h2 className="mt-4 max-w-[16ch] text-h1">Del navegador del negocio al respaldo</h2>
          <div className="mt-12 grid gap-3 lg:grid-cols-4">
            {CAPAS_SEGURIDAD.map((capa, i) => {
              const Icon = LAYER_ICONS[i]
              return (
                <div key={capa.n} className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                  <div className="group flex-1 rounded-[var(--radius-card)] border border-line bg-paper p-5 transition-colors hover:border-ink/30">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-micro text-muted">capa {capa.n}</span>
                      <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-on-accent-soft">
                        <Icon className="size-4" />
                      </span>
                    </div>
                    <h3 className="mt-3 text-h4">{capa.titulo}</h3>
                    <p className="font-mono text-micro text-cyan-deep">{capa.etiqueta}</p>
                    <p className="mt-2 text-small text-muted">{capa.descripcion}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-paper-bright px-3 py-1 font-mono text-micro text-text">
                      <span className="size-1.5 rounded-full bg-accent" />
                      {capa.detalle}
                    </p>
                  </div>
                  {i < CAPAS_SEGURIDAD.length - 1 && (
                    <ArrowRight className="mx-auto size-5 shrink-0 text-muted lg:my-auto lg:rotate-90" />
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-6 max-w-[62ch] font-mono text-micro text-muted">
            esquema simplificado · cada elemento responde a una práctica real implementada o
            documentada; lo pendiente de confirmar figura como [VALIDAR]/[DEFINIR]
          </p>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Accesos</p>
            <h2 className="mt-4 text-h1">Quién entra y qué puede hacer</h2>
          </div>
          <div>
            <ul className="grid gap-2.5">
              {ACCESOS.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-paper-bright px-4 py-3 text-small">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[52ch] rounded-xl border border-line bg-paper px-4 py-3 text-small text-muted">
              {ACCESOS_NOTA}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Protección de datos</p>
            <h2 className="mt-4 text-h1">Cifrado y control de la información</h2>
          </div>
          <div>
            <ul className="grid gap-2.5">
              {PROTECCION_DATOS.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-small">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[52ch] rounded-xl border border-line bg-paper px-4 py-3 text-small text-muted">
              <LockKeyhole className="mr-1.5 inline size-3.5" />
              {PROTECCION_NOTA}
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <p className="kicker">Respaldos</p>
        <h2 className="mt-4 max-w-[16ch] text-h1">Copias de información</h2>
        <div className="mt-10 overflow-x-auto rounded-[var(--radius-card)] border border-line">
          <table className="w-full min-w-[560px] border-collapse bg-paper-bright text-left">
            <thead>
              <tr className="border-b border-line">
                {["Elemento", "Frecuencia", "Retención", "Restauración"].map((h) => (
                  <th key={h} className="px-5 py-4 font-mono text-micro text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESPALDOS.map((row) => (
                <tr key={row.elemento} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-4 text-small font-semibold text-text">{row.elemento}</td>
                  <td className="px-5 py-4 font-mono text-micro text-muted">{row.frecuencia}</td>
                  <td className="px-5 py-4 font-mono text-micro text-muted">{row.retencion}</td>
                  <td className="px-5 py-4 font-mono text-micro text-muted">{row.restauracion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-[52ch] text-small text-muted">{RESPALDO_NOTA}</p>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Disponibilidad</p>
            <h2 className="mt-4 text-h1">Compromisos reales, sin humo</h2>
          </div>
          <div>
            <ul className="grid gap-2.5">
              {DISPONIBILIDAD.map((d) => (
                <li key={d.concepto} className="flex items-center justify-between gap-4 rounded-xl border border-line bg-paper px-4 py-3">
                  <span className="text-small text-text">{d.concepto}</span>
                  <span className="shrink-0 font-mono text-micro text-muted">{d.valor}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[52ch] rounded-xl border border-line bg-paper px-4 py-3 text-small text-muted">
              {DISPONIBILIDAD_NOTA}
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="kicker">Servicios de terceros</p>
            <h2 className="mt-4 text-h1">Dependencias transparentes</h2>
            <p className="mt-5 max-w-[48ch] text-lead text-muted">{TERCEROS}</p>
          </div>
          <div>
            <p className="kicker">Respuesta ante incidentes</p>
            <h2 className="mt-4 text-h1">Proceso ordenado cuando algo pasa</h2>
            <ol className="mt-8 grid gap-2.5">
              {INCIDENTES.map((paso, i) => (
                <li key={paso} className="flex items-start gap-4 rounded-xl border border-line bg-paper-bright px-4 py-3">
                  <span className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-small text-text">{paso}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Privacidad</p>
            <h2 className="mt-4 text-h1">Tu información y tus derechos</h2>
          </div>
          <div>
            <p className="text-lead text-muted">
              La política de privacidad detalla cómo tratamos la información. Cubre:
            </p>
            <ul className="mt-6 grid gap-2.5">
              {PRIVACIDAD_CUBRE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-small text-text">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan/60" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button to="/privacidad" variant="secondary">
                Ver política de privacidad
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-surface text-text-invert">
        <div className="container-site py-24 text-center lg:py-32">
          <p className="kicker justify-center" style={{ color: "rgba(245,246,255,0.55)" }}>
            Requisitos
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">
            ¿Necesitás revisar un requisito técnico o de seguridad?
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-text-invert/70">
            Consultanos por integraciones, permisos, volumen o cualquier condición específica de tu
            operación.
          </p>
          <div className="mt-8">
            <Button to="/contacto" size="lg">
              Contactar al equipo
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
