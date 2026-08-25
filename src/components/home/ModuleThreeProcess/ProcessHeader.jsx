export default function ProcessHeader() {
  return (
    <header className="m3p-header">
      <p className="m3p-eyebrow">De tu negocio a una plataforma real</p>
      <h2 className="m3p-title font-display">
        <span className="m3p-line">Vos conocés tu negocio.</span>
        <span className="m3p-line">
          Nosotros{" "}
          <span
            style={{
              background: "var(--m3-grad)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            creamos la tecnología para hacerlo avanzar.
          </span>
        </span>
      </h2>
      <p className="m3p-bajada">
        Nos contás cómo trabajás y qué necesitás mejorar. Diseñamos tu website y una
        aplicación de gestión a medida, preparados para tu operación diaria.
      </p>
      <p className="m3p-remate">Sin plantillas. Sin sistemas genéricos. Sin complicaciones.</p>
    </header>
  )
}
