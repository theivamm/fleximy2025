import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, ChevronDown } from "lucide-react"
import Button from "../components/ui/Button"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
import { FAQ_CATEGORIAS } from "../data/comercial"
import { CONTACT } from "../data/navigation"

function resaltar(texto, busqueda) {
  if (!busqueda) return texto
  const partes = texto.split(new RegExp(`(${busqueda.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))
  return partes.map((parte, i) =>
    parte.toLowerCase() === busqueda.toLowerCase() ? (
      <mark key={i} className="rounded-sm bg-accent/40 px-0.5 text-text-1">
        {parte}
      </mark>
    ) : (
      <span key={i}>{parte}</span>
    )
  )
}

export default function PreguntasFrecuentes() {
  const [busqueda, setBusqueda] = useState("")
  const [categoria, setCategoria] = useState("todas")
  const [abierta, setAbierta] = useState({})

  const preguntas = useMemo(() => {
    const lista = []
    FAQ_CATEGORIAS.forEach((cat) =>
      cat.preguntas.forEach((p, i) => lista.push({ ...p, id: `${cat.id}-${i}`, categoria: cat.nombre }))
    )
    return lista
  }, [])

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return preguntas.filter((p) => {
      const matchCategoria = categoria === "todas" || p.id.startsWith(categoria)
      const matchBusqueda = !q || p.q.toLowerCase().includes(q) || p.a.toLowerCase().includes(q)
      return matchCategoria && matchBusqueda
    })
  }, [preguntas, busqueda, categoria])

  const toggle = (id) => {
    setAbierta((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      const hash = `pregunta-${id}`
      if (next[id]) {
        history.replaceState(null, "", `#${hash}`)
      } else if (window.location.hash === `#${hash}`) {
        history.replaceState(null, "", window.location.pathname + window.location.search)
      }
      return next
    })
  }

  useEffect(() => {
    const hash = window.location.hash.replace("#pregunta-", "")
    if (hash) {
      setAbierta((prev) => ({ ...prev, [hash]: true }))
      setTimeout(() => document.getElementById(`pregunta-${hash}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 150)
    }
  }, [])

  const abrirDesdeAncla = (id) => {
    setAbierta((prev) => ({ ...prev, [id]: true }))
    requestAnimationFrame(() => document.getElementById(`pregunta-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  const totalPorCategoria = (catId) =>
    catId === "todas" ? preguntas.length : preguntas.filter((p) => p.id.startsWith(catId)).length

  return (
    <main>
      <PageHero
        kicker="Preguntas frecuentes"
        title={
          <>
            Respuestas claras <span className="text-gradient">antes de comenzar.</span>
          </>
        }
        lead="Implementación, precios, módulos, soporte, datos e integraciones. Si no encontrás tu respuesta, consultanos directamente."
      >
        <div className="mt-6 max-w-xl">
          <label htmlFor="faq-busqueda" className="sr-only">Buscar en las preguntas</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-3" />
            <input
              id="faq-busqueda"
              type="search"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value)
                setAbierta({})
              }}
              placeholder="Buscar en las preguntas…"
              className="w-full rounded-[var(--radius-field)] border border-outline bg-surface-1/60 py-3 pl-11 pr-4 text-sm text-text-1 placeholder:text-text-3/60 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[{ id: "todas", nombre: "Todas" }, ...FAQ_CATEGORIAS.map((c) => ({ id: c.id, nombre: c.nombre }))].map(
            (cat) => {
              const active = categoria === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategoria(cat.id)
                    setAbierta({})
                  }}
                  className={`rounded-full px-4 py-2 text-small transition-colors ${
                    active
                      ? "bg-text-1 text-bg-0"
                      : "border border-outline bg-surface-1/60 text-text-2 hover:border-ink/30 hover:text-text-1"
                  }`}
                >
                  {cat.nombre}
                </button>
              )
            }
          )}
        </div>
      </PageHero>

      <section className="container-wide py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start">
          <aside className="hidden lg:block">
            <p className="font-mono text-micro text-text-3">índice</p>
            <nav className="mt-4 flex flex-col gap-1" aria-label="Categorías">
              {[{ id: "todas", nombre: "Todas" }, ...FAQ_CATEGORIAS.map((c) => ({ id: c.id, nombre: c.nombre }))].map(
                (cat) => {
                  const active = categoria === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategoria(cat.id)
                        setAbierta({})
                      }}
                      className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-small transition-colors ${
                        active ? "bg-surface-2/60 font-semibold text-text-1" : "text-text-2 hover:text-text-1"
                      }`}
                    >
                      {cat.nombre}
                      <span className="font-mono text-micro text-text-3">{totalPorCategoria(cat.id)}</span>
                    </button>
                  )
                }
              )}
            </nav>

            <div className="mt-8 rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6">
              <p className="font-mono text-micro text-text-3">las más consultadas</p>
              <ul className="mt-3 grid gap-2">
                {["general-0", "uso-0", "precio-0"].map((id) => {
                  const p = preguntas.find((x) => x.id === id)
                  if (!p) return null
                  return (
                    <li key={id}>
                      <button
                        onClick={() => abrirDesdeAncla(id)}
                        className="text-left text-small text-text-1 underline-offset-4 hover:underline"
                      >
                        {p.q}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          <div>
            {filtradas.length === 0 ? (
              <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-8 text-center">
                <p className="text-h4 text-text-1">No encontramos resultados para esa búsqueda</p>
                <p className="mt-2 text-small text-text-2">Probá con otro término o consultanos directamente.</p>
                <div className="mt-6">
                  <Button to="/contacto">Consultar con el equipo</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-outline border-y border-outline">
                {filtradas.map((p) => {
                  const open = abierta[p.id]
                  const contentId = `resp-${p.id}`
                  return (
                    <div key={p.id} id={`pregunta-${p.id}`} className="scroll-mt-32">
                      <button
                        onClick={() => toggle(p.id)}
                        aria-expanded={!!open}
                        aria-controls={contentId}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className="text-h4 text-text-1">{resaltar(p.q, busqueda.trim())}</span>
                        <ChevronDown
                          className={`size-5 shrink-0 text-text-3 transition-transform duration-[var(--motion-fast)] ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            id={contentId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-body max-w-[58ch] pb-5 text-text-2">{resaltar(p.a, busqueda.trim())}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container-wide pb-20 lg:pb-28">
        <div
          className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16"
          style={{ backgroundImage: "var(--background-image-primary)" }}
        >
          <p className="kicker justify-center">¿Dudas?</p>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            ¿Tu pregunta no está acá?
          </h2>
          <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
            Respondemos consultas puntuales sin compromiso y, si hay encaje, coordinamos un
            diagnóstico.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA to="/contacto" large>
              Consultar con el equipo
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
