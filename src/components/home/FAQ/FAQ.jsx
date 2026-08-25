import { useState } from "react"
import "./faq.css"

const QA = [
  {
    q: "¿Tengo que saber qué funciones necesito?",
    a: "No. Empezamos entendiendo cómo funciona tu negocio y qué necesitás mejorar. A partir de eso definimos la solución y las funciones necesarias.",
  },
  {
    q: "¿El website y la aplicación se crean a medida?",
    a: "Sí. Diseñamos tanto la experiencia que ven tus clientes como la aplicación que usa tu equipo, alrededor de la forma real en que trabaja tu negocio.",
  },
  {
    q: "¿Puedo empezar con pocas funciones?",
    a: "Sí. Podemos comenzar con una primera etapa clara y sumar nuevas herramientas a medida que el negocio las necesita.",
  },
  {
    q: "¿Qué pasa después de la entrega?",
    a: "Te acompañamos en la puesta en marcha y continuamos disponibles para soporte, mejoras y nuevas funciones.",
  },
  {
    q: "¿Tengo que cambiar todos mis procesos?",
    a: "No. Primero analizamos qué conviene mantener, qué se puede simplificar y qué vale la pena mejorar. La tecnología debe adaptarse al negocio, no al revés.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen((prev) => (prev === i ? null : i))

  return (
    <section className="faq">
      <div className="faq-inner container">
        <header className="faq-header">
          <p className="faq-eyebrow">Antes de empezar</p>
          <h2 className="faq-title font-display">Algunas preguntas que probablemente ya tenés.</h2>
        </header>

        <div className="faq-list" role="list">
          {QA.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className={`faq-item ${isOpen ? "is-open" : ""}`} role="listitem">
                <button
                  className="faq-q"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq-q__text">{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <span /><span />
                  </span>
                </button>
                <div className="faq-a-wrap" role="region" aria-hidden={!isOpen}>
                  <p className="faq-a">{item.a}</p>
                </div>
                <span className="faq-line" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
