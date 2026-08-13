import { ArrowRight, ShieldCheck, Fingerprint, LockKeyhole, Server, Database } from "lucide-react"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
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
  return (
    <main>
      <PageHero
        kicker="Seguridad y continuidad"
        title={
          <>
            La operación de tu negocio merece{" "}
            <span className="text-gradient">una base responsable.</span>
          </>
        }
        lead="Aplicamos medidas técnicas y operativas para proteger la plataforma, administrar accesos y responder ante incidentes."
      />

      <section className="border-y border-outline bg-surface-2/40 py-16 lg:py-20">
        <div className="container-wide">
          <p className="kicker">Cómo circula la información</p>
          <h2 className="text-h2 mt-4 max-w-[16ch] text-text-1">Del navegador del negocio al respaldo</h2>
          <div className="mt-12 grid gap-3 lg:grid-cols-4">
            {CAPAS_SEGURIDAD.map((capa, i) => {
              const Icon = LAYER_ICONS[i]
              return (
                <div key={capa.n} className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                  <div className="group flex-1 rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-5 transition-colors hover:border-ink/30">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-micro text-text-3">capa {capa.n}</span>
                      <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent-on-soft">
                        <Icon className="size-4" />
                      </span>
                    </div>
                    <h3 className="text-h4 mt-3 text-text-1">{capa.titulo}</h3>
                    <p className="font-mono text-micro text-cyan">{capa.etiqueta}</p>
                    <p className="mt-2 text-small text-text-2">{capa.descripcion}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-outline bg-surface-2/40 px-3 py-1 font-mono text-micro text-text-1">
                      <span className="size-1.5 rounded-full bg-accent" />
                      {capa.detalle}
                    </p>
                  </div>
                  {i < CAPAS_SEGURIDAD.length - 1 && (
                    <ArrowRight className="mx-auto size-5 shrink-0 text-text-3 lg:my-auto lg:rotate-90" />
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-6 max-w-[62ch] font-mono text-micro text-text-3">
            esquema simplificado · cada elemento responde a una práctica real implementada o
            documentada; lo pendiente de confirmar figura como [VALIDAR]/[DEFINIR]
          </p>
        </div>
      </section>

      <section className="container-wide py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Accesos</p>
            <h2 className="text-h2 mt-4 text-text-1">Quién entra y qué puede hacer</h2>
          </div>
          <div>
            <ul className="grid gap-2.5">
              {ACCESOS.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/60 px-4 py-3 text-small text-text-1">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[52ch] rounded-xl border border-outline bg-surface-2/40 px-4 py-3 text-small text-text-2">
              {ACCESOS_NOTA}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Protección de datos</p>
            <h2 className="text-h2 mt-4 text-text-1">Cifrado y control de la información</h2>
          </div>
          <div>
            <ul className="grid gap-2.5">
              {PROTECCION_DATOS.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/60 px-4 py-3 text-small text-text-1">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[52ch] rounded-xl border border-outline bg-surface-2/40 px-4 py-3 text-small text-text-2">
              <LockKeyhole className="mr-1.5 inline size-3.5" />
              {PROTECCION_NOTA}
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide py-20 lg:py-28">
        <p className="kicker">Respaldos</p>
        <h2 className="text-h2 mt-4 max-w-[16ch] text-text-1">Copias de información</h2>
        <div className="mt-10 overflow-x-auto rounded-[var(--radius-card)] border border-outline">
          <table className="w-full min-w-[560px] border-collapse bg-surface-1/60 text-left">
            <thead>
              <tr className="border-b border-outline">
                {["Elemento", "Frecuencia", "Retención", "Restauración"].map((h) => (
                  <th key={h} className="px-5 py-4 font-mono text-micro text-text-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESPALDOS.map((row) => (
                <tr key={row.elemento} className="border-b border-outline last:border-b-0">
                  <td className="px-5 py-4 text-small font-semibold text-text-1">{row.elemento}</td>
                  <td className="px-5 py-4 font-mono text-micro text-text-2">{row.frecuencia}</td>
                  <td className="px-5 py-4 font-mono text-micro text-text-2">{row.retencion}</td>
                  <td className="px-5 py-4 font-mono text-micro text-text-2">{row.restauracion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-[52ch] text-small text-text-2">{RESPALDO_NOTA}</p>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Disponibilidad</p>
            <h2 className="text-h2 mt-4 text-text-1">Compromisos reales, sin humo</h2>
          </div>
          <div>
            <ul className="grid gap-2.5">
              {DISPONIBILIDAD.map((d) => (
                <li key={d.concepto} className="flex items-center justify-between gap-4 rounded-xl border border-outline bg-surface-1/60 px-4 py-3">
                  <span className="text-small text-text-1">{d.concepto}</span>
                  <span className="shrink-0 font-mono text-micro text-text-2">{d.valor}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[52ch] rounded-xl border border-outline bg-surface-2/40 px-4 py-3 text-small text-text-2">
              {DISPONIBILIDAD_NOTA}
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="kicker">Servicios de terceros</p>
            <h2 className="text-h2 mt-4 text-text-1">Dependencias transparentes</h2>
            <p className="lead-text mt-5 max-w-[48ch] text-text-2">{TERCEROS}</p>
          </div>
          <div>
            <p className="kicker">Respuesta ante incidentes</p>
            <h2 className="text-h2 mt-4 text-text-1">Proceso ordenado cuando algo pasa</h2>
            <ol className="mt-8 grid gap-2.5">
              {INCIDENTES.map((paso, i) => (
                <li key={paso} className="flex items-start gap-4 rounded-xl border border-outline bg-surface-1/60 px-4 py-3">
                  <span className="font-mono text-micro text-text-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-small text-text-1">{paso}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Privacidad</p>
            <h2 className="text-h2 mt-4 text-text-1">Tu información y tus derechos</h2>
          </div>
          <div>
            <p className="lead-text text-text-2">
              La política de privacidad detalla cómo tratamos la información. Cubre:
            </p>
            <ul className="mt-6 grid gap-2.5">
              {PRIVACIDAD_CUBRE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-small text-text-1">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan/60" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <OutlineCTA to="/privacidad">
                Ver política de privacidad
              </OutlineCTA>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide py-20 lg:py-28">
        <div
          className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16"
          style={{ backgroundImage: "var(--background-image-primary)" }}
        >
          <p className="kicker justify-center">Requisitos</p>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            ¿Necesitás revisar un requisito técnico o de seguridad?
          </h2>
          <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
            Consultanos por integraciones, permisos, volumen o cualquier condición específica de tu
            operación.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryCTA to="/contacto" large>
              Contactar al equipo
            </PrimaryCTA>
          </div>
        </div>
      </section>
    </main>
  )
}
