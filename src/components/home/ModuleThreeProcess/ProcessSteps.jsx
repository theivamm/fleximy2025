const STEPS = [
  {
    n: "01",
    title: "Nos contás",
    lead: "Primero entendemos cómo funciona tu negocio.",
    desc: "Conocemos tus ventas, tu equipo y los procesos que necesitás ordenar o mejorar.",
    punch: "No necesitás preparar nada técnico.",
    delay: ".2s",
  },
  {
    n: "02",
    title: "Lo diseñamos",
    lead: "Creamos una solución alrededor de tu forma de trabajar.",
    desc: "Definimos el website, las funciones y las pantallas necesarias para simplificar tu operación.",
    punch: "Cada parte responde a una necesidad real.",
    delay: "1.1s",
  },
  {
    n: "03",
    title: "Lo ponemos en marcha",
    lead: "Te entregamos todo funcionando.",
    desc: "Implementamos la plataforma, acompañamos a tu equipo y sumamos nuevas funciones cuando las necesitás.",
    punch: "Preparada para usar. Preparada para crecer.",
    delay: "2s",
  },
]

export default function ProcessSteps({ active, reducedMotion }) {
  return (
    <div className={`m3p-steps ${active || reducedMotion ? "on" : ""}`}>
      <span className="m3p-steps__line" aria-hidden="true" />
      {STEPS.map((s) => (
        <article key={s.n} className="m3p-step" style={{ "--d": s.delay }}>
          <span className="m3p-step__n">{s.n}</span>
          <h3>{s.title}</h3>
          <p className="m3p-step__lead">{s.lead}</p>
          <p className="m3p-step__desc">{s.desc}</p>
          <p className="m3p-step__punch">{s.punch}</p>
        </article>
      ))}
    </div>
  )
}
