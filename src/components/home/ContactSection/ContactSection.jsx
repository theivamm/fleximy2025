import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { CONTACT } from "../../../data/navigation"
import "./contact-section.css"

const NEED_OPTIONS = [
  "Crear o renovar mi website",
  "Recibir consultas, reservas o pedidos",
  "Administrar clientes",
  "Ordenar tareas y procesos",
  "Ver ventas y resultados",
  "Necesito una solución completa",
  "Todavía no lo tengo claro",
]

function getUTMs() {
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
  }
}

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ""

export default function ContactSection() {
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    whatsapp: "",
    email: "",
    dedicacion: "",
    necesidades: [],
    descripcion: "",
    _hp: "",
  })
  const [errs, setErrs] = useState({})
  const [touched, setTouched] = useState({})
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const utms = useMemo(getUTMs, [])

  const set = (k) => (e) => {
    const val = e.target.value
    setForm((f) => ({ ...f, [k]: val }))
    if (touched[k]) setErrs((er) => ({ ...er, [k]: validate(k, val, form.necesidades) }))
  }

  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrs((er) => ({ ...er, [k]: validate(k, form[k], form.necesidades) }))
  }

  const toggleNeed = (opt) => {
    setForm((f) => {
      const arr = f.necesidades.includes(opt)
        ? f.necesidades.filter((n) => n !== opt)
        : [...f.necesidades, opt]
      return { ...f, necesidades: arr }
    })
    setTouched((t) => ({ ...t, necesidades: true }))
    setErrs((er) => ({ ...er, necesidades: validate("necesidades", form.necesidades, form.necesidades) }))
  }

  const filledCount = useMemo(() => {
    let c = 0
    if (form.nombre.trim()) c++
    if (form.negocio.trim()) c++
    if (form.whatsapp.trim()) c++
    if (form.email.trim()) c++
    if (form.dedicacion.trim()) c++
    if (form.necesidades.length > 0) c++
    if (form.descripcion.trim()) c++
    return c
  }, [form])

  const progress = Math.round((filledCount / 7) * 100)

  const validate = (k, val, needs) => {
    if (k === "necesidades") return needs.length > 0 ? "" : "Elegí al menos una opción."
    if (!String(val).trim()) return "Este campo es obligatorio."
    if (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Ingresá un email válido."
    if (k === "whatsapp" && !/^\+?[\d\s\-()]{7,}$/.test(val)) return "Ingresá un número válido."
    return ""
  }

  const submit = async (e) => {
    e.preventDefault()
    if (form._hp) return

    const allErrs = {}
    ;["nombre", "negocio", "whatsapp", "email", "dedicacion", "descripcion"].forEach((k) => {
      allErrs[k] = validate(k, form[k], form.necesidades)
    })
    allErrs.necesidades = validate("necesidades", null, form.necesidades)
    setErrs(allErrs)
    setTouched({
      nombre: true, negocio: true, whatsapp: true, email: true,
      dedicacion: true, necesidades: true, descripcion: true,
    })
    if (Object.values(allErrs).some(Boolean)) return

    setSending(true)
    setError(false)
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, necesidades: form.necesidades.join(", "), ...utms, submittedAt: new Date().toISOString() }),
        })
        if (!res.ok) throw new Error("fail")
      } else {
        await new Promise((r) => setTimeout(r, 900))
      }
      setSuccess(true)
    } catch {
      setError(true)
      setSending(false)
    }
  }

  const field = (k, label, type = "text", attrs = {}) => (
    <label className="cs-field">
      <span className="cs-label">{label}</span>
      <input
        type={type}
        value={form[k]}
        onChange={set(k)}
        onBlur={blur(k)}
        aria-invalid={touched[k] && !!errs[k]}
        aria-describedby={errs[k] ? `err-${k}` : undefined}
        {...attrs}
      />
      {touched[k] && errs[k] && <span className="cs-error" id={`err-${k}`}>{errs[k]}</span>}
    </label>
  )

  return (
    <section id="contacto" className="cs">
      <div className="cs-glow cs-glow--a" aria-hidden="true" />
      <div className="cs-glow cs-glow--b" aria-hidden="true" />

      <div className="cs-inner container">
        {/* Izquierda */}
        <div className="cs-left">
          <p className="cs-eyebrow">Empecemos por tu negocio</p>
          <h2 className="cs-title font-display">
            Contanos qué necesitás mejorar.
          </h2>
          <h2 className="cs-subtitle font-display">
            Nosotros pensamos cómo convertirlo en tecnología.
          </h2>
          <p className="cs-bajada">
            No necesitás saber qué aplicación crear ni preparar una lista de funciones.
            Contanos cómo trabajás hoy y qué te gustaría resolver.
          </p>
          <p className="cs-confianza">
            Somos un equipo de diseño y desarrollo enfocado en crear websites y
            aplicaciones simples, útiles y pensadas alrededor de cada negocio.
          </p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="cs-wa">
            <MessageCircle size={16} /> ¿Preferís hablar directamente? Escribinos por WhatsApp →
          </a>
        </div>

        {/* Derecha */}
        <div className="cs-right">
          {success ? (
            <div className="cs-success" role="status">
              <h3 className="font-display">Gracias, {form.nombre.split(" ")[0]}. Ya recibimos tu consulta.</h3>
              <p>Vamos a revisar tu caso y te contactaremos por los datos que nos dejaste.</p>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="cs-wa cs-wa--inline">
                <MessageCircle size={14} /> Mientras tanto, hablar por WhatsApp →
              </a>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-live="polite">
              <div className="cs-progress" aria-label={`Completado ${progress}%`}>
                <div className="cs-progress__bar" style={{ width: `${progress}%` }} />
              </div>

              <div className="cs-grid">
                {field("nombre", "Nombre")}
                {field("negocio", "Negocio o empresa")}
                {field("whatsapp", "WhatsApp", "tel", { inputMode: "tel" })}
                {field("email", "Email", "email", { inputMode: "email", autoComplete: "email" })}
                {field("dedicacion", "¿A qué se dedica tu negocio?")}
              </div>

              <fieldset className="cs-fieldset">
                <legend className="cs-label">¿Qué necesitás mejorar?</legend>
                <div className="cs-chips">
                  {NEED_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleNeed(opt)}
                      className={`cs-chip ${form.necesidades.includes(opt) ? "on" : ""}`}
                      aria-pressed={form.necesidades.includes(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {touched.necesidades && errs.necesidades && (
                  <span className="cs-error">{errs.necesidades}</span>
                )}
              </fieldset>

              <label className="cs-field" style={{ marginTop: "16px" }}>
                <span className="cs-label">Contanos brevemente cómo trabajás hoy</span>
                <textarea
                  value={form.descripcion}
                  onChange={set("descripcion")}
                  onBlur={blur("descripcion")}
                  maxLength={500}
                  rows={3}
                  placeholder="Por ejemplo: recibimos pedidos por WhatsApp, los anotamos en una planilla y necesitamos ordenar el seguimiento…"
                  aria-invalid={touched.descripcion && !!errs.descripcion}
                  aria-describedby={errs.descripcion ? "err-desc" : undefined}
                />
                <span className="cs-count">{form.descripcion.length}/500</span>
                {touched.descripcion && errs.descripcion && (
                  <span className="cs-error" id="err-desc">{errs.descripcion}</span>
                )}
              </label>

              {/* Honeypot */}
              <input type="text" name="_hp" value={form._hp} onChange={set("_hp")} className="cs-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {Object.entries(utms).map(([k, v]) => v ? <input key={k} type="hidden" name={k} value={v} /> : null)}

              <p className="cs-consent">
                Al enviar aceptás nuestra{" "}
                <Link to="/privacidad">Política de Privacidad</Link>.
              </p>

              <button type="submit" disabled={sending} className="cs-submit">
                {sending ? "Enviando…" : "Quiero conversar sobre mi proyecto"}
                {!sending && <ArrowRight size={16} />}
              </button>
              {error && <p className="cs-error cs-error--block">Hubo un problema al enviar. Intentá nuevamente o escribinos por WhatsApp.</p>}
              <p className="cs-micro">Te respondemos personalmente. Sin compromiso y sin tecnicismos.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
