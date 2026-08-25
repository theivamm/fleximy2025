import "./accessible-platform.css"

export default function AccessiblePlatform() {
  return (
    <section className="ap">
      <div className="ap-inner container">
        <div className="ap-left">
          <p className="ap-eyebrow">El costo importa</p>
          <h2 className="ap-title font-display">
            Una plataforma propia está más cerca de lo que imaginás.
          </h2>
          <p className="ap-bajada">
            Empezá con las funciones que tu negocio necesita hoy y sumá nuevas
            herramientas a medida que crece.
          </p>
          <div className="ap-cta">
            <a href="#contacto" className="ap-btn-primary">Contanos cómo funciona tu negocio</a>
            <a href="#rubros" className="ap-btn-secondary">Ver ejemplos por rubro</a>
          </div>
        </div>

        <div className="ap-side">
          <h3 className="ap-side__title">Pagás por lo que necesitás</h3>
          <ul className="ap-side__list">
            <li>Sin software sobredimensionado.</li>
            <li>Sin funciones que no vas a usar.</li>
            <li>Sin cambiar tu forma de trabajar.</li>
          </ul>
          <p className="ap-side__remate">
            Alcance definido · Implementación por etapas · Inversión escalable
          </p>
        </div>
      </div>
    </section>
  )
}
