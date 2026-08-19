import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle, Check, Mail } from "lucide-react"
import { CONTACT, COMPANY } from "../data/config"

const NECESIDADES = ["Web", "App", "Dashboard", "Automatizacion", "No estoy seguro"]

const inputCls =
  "w-full rounded-[var(--radius-field)] border border-outline bg-surface-1/60 px-4 py-3 text-sm text-text-1 placeholder:text-text-3/60 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/60"

export default function Contacto() {
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [errores, setErrores] = useState({})
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    necesidad: "",
    idea: "",
  })

  const set = (campo) => (e) => {
    setForm((f) => ({ ...f, [campo]: e.target.value }))
    setErrores((err) => ({ ...err, [campo]: undefined }))
  }

  const setNecesidad = (val) => {
    setForm((f) => ({ ...f, necesidad: val }))
    setErrores((err) => ({ ...err, necesidad: undefined }))
  }

  const validar = () => {
    const err = {}
    if (!form.nombre.trim()) err.nombre = "Ingresá tu nombre."
    if (!form.empresa.trim()) err.empresa = "Ingresá tu empresa o proyecto."
    if (!form.email.trim()) err.email = "Ingresá tu email."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Ingresá un email válido."
    if (!form.necesidad) err.necesidad = "Elegí qué necesitás."
    if (!form.idea.trim()) err.idea = "Contanos brevemente tu idea."
    setErrores(err)
    return Object.keys(err).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validar()) return
    setEnviando(true)
    setTimeout(() => setEnviado(true), 1000)
  }

  if (enviado) {
    return (
      <main className="section-space pt-28">
        <div className="container max-w-[560px] text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-success/15 mx-auto">
            <Check className="size-7 text-success" />
          </div>
          <h1 className="h2-title mt-6 text-text-1">Gracias, {form.nombre.split(" ")[0]}!</h1>
          <p className="lead-text mt-4 text-text-2">
            Recibimos tu consulta. Te vamos a contactar pronto para charlar sobre tu proyecto.
          </p>
          <Link
            to="/"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-7 text-sm font-semibold text-white mt-8 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="section-space pt-28">
      <div className="container max-w-[640px]">
        <span className="kicker">Contacto</span>
        <h1 className="h2-title mt-4 text-text-1">
          Contanos que queres{" "}
          <span className="text-gradient">crear, mejorar o automatizar.</span>
        </h1>
        <p className="lead-text mt-4 text-text-2">
          No necesitas preparar nada tecnico. Con algunas preguntas entendemos tu situacion
          y te ayudamos a dar el primer paso.
        </p>

        <form onSubmit={submit} noValidate className="mt-10 grid gap-5">
          <div>
            <label htmlFor="campo-nombre" className="flex items-baseline gap-1.5 text-sm font-semibold text-text-1">
              Nombre <span className="text-text-3">*</span>
            </label>
            <input
              id="campo-nombre"
              className={`${inputCls} mt-2`}
              value={form.nombre}
              onChange={set("nombre")}
              autoComplete="name"
              placeholder="Tu nombre"
            />
            {errores.nombre && <p role="alert" className="mt-1 text-sm text-error">{errores.nombre}</p>}
          </div>

          <div>
            <label htmlFor="campo-empresa" className="flex items-baseline gap-1.5 text-sm font-semibold text-text-1">
              Empresa o proyecto <span className="text-text-3">*</span>
            </label>
            <input
              id="campo-empresa"
              className={`${inputCls} mt-2`}
              value={form.empresa}
              onChange={set("empresa")}
              autoComplete="organization"
              placeholder="Nombre de tu negocio"
            />
            {errores.empresa && <p role="alert" className="mt-1 text-sm text-error">{errores.empresa}</p>}
          </div>

          <div>
            <label htmlFor="campo-email" className="flex items-baseline gap-1.5 text-sm font-semibold text-text-1">
              Email <span className="text-text-3">*</span>
            </label>
            <input
              id="campo-email"
              type="email"
              className={`${inputCls} mt-2`}
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
              placeholder="tu@empresa.com"
            />
            {errores.email && <p role="alert" className="mt-1 text-sm text-error">{errores.email}</p>}
          </div>

          <div>
            <label className="flex items-baseline gap-1.5 text-sm font-semibold text-text-1">
              Que necesitas? <span className="text-text-3">*</span>
            </label>
            <div role="radiogroup" aria-label="Necesidad" className="mt-2 flex flex-wrap gap-2">
              {NECESIDADES.map((opt) => {
                const active = form.necesidad === opt
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setNecesidad(opt)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      active
                        ? "border-text-1 bg-text-1 text-bg-0"
                        : "border-outline bg-surface-1/60 text-text-2 hover:border-outline-strong hover:text-text-1"
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            {errores.necesidad && <p role="alert" className="mt-1 text-sm text-error">{errores.necesidad}</p>}
          </div>

          <div>
            <label htmlFor="campo-idea" className="flex items-baseline gap-1.5 text-sm font-semibold text-text-1">
              Contanos brevemente tu idea <span className="text-text-3">*</span>
            </label>
            <textarea
              id="campo-idea"
              rows={4}
              className={`${inputCls} mt-2`}
              value={form.idea}
              onChange={set("idea")}
              placeholder="Que queres crear, mejorar o automatizar?"
            />
            {errores.idea && <p role="alert" className="mt-1 text-sm text-error">{errores.idea}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              {enviando ? "Enviando..." : "Enviar consulta"}
              {!enviando && <ArrowRight size={16} />}
            </button>
          </div>
        </form>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-[var(--radius-card)] border border-outline bg-surface-1/40 p-5 transition-colors hover:border-primary/30"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <MessageCircle className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-text-1">WhatsApp</span>
              <span className="block text-sm text-text-2">Para una consulta rapida</span>
            </span>
          </a>
          <a
            href={`mailto:${COMPANY.emailComercial}`}
            className="flex items-center gap-4 rounded-[var(--radius-card)] border border-outline bg-surface-1/40 p-5 transition-colors hover:border-primary/30"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-surface-3/60 text-text-1">
              <Mail className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-text-1">Email</span>
              <span className="block text-sm text-text-2">{COMPANY.emailComercial}</span>
            </span>
          </a>
        </div>
      </div>
    </main>
  )
}
