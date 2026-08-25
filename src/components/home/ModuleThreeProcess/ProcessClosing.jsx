export default function ProcessClosing() {
  return (
    <div className="m3p-closing">
      <h3 className="font-display">
        Vos ocupate de tu negocio.{" "}
        <span
          style={{
            background: "var(--m3-grad)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Nosotros, de convertirlo en tecnología.
        </span>
      </h3>
      <a href="/contacto" className="m3p-cta">
        Contanos cómo funciona tu negocio →
      </a>
      <p className="m3p-microcopy">Una primera conversación. Sin compromiso y sin tecnicismos.</p>
    </div>
  )
}
