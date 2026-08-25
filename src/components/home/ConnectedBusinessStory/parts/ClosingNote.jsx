export default function ClosingNote({ c }) {
  const specs = [
    { n: "01", label: "Sin software sobredimensionado" },
    { n: "02", label: "Sin pagar funciones que no usás" },
    { n: "03", label: "Sin cambiar la forma de trabajar" },
  ]

  return (
    <div className="cbs-closing" aria-label="Nota económica">
      <style>{`
        .cbs-closing {
          position: relative;
          overflow: clip;
          border-top: 1px solid ${c.border};
          margin-top: clamp(40px, 6vh, 80px);
        }
        .cbs-bgword {
          position: absolute;
          right: -1%;
          bottom: -4%;
          font-weight: 800;
          font-stretch: condensed;
          font-size: clamp(90px, 16vw, 260px);
          line-height: .85;
          letter-spacing: -.03em;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          color: transparent;
          -webkit-text-stroke: 1px ${c.primary}22;
          z-index: 0;
          animation: cbs-drift 50s ease-in-out infinite alternate;
        }
        @keyframes cbs-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-3vw); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cbs-bgword { animation: none !important; }
        }
      `}</style>

      <span className="cbs-bgword" aria-hidden="true">ACCESIBLE</span>

      <div
        className="relative"
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "clamp(64px, 9vh, 120px) clamp(20px, 4vw, 64px)",
          zIndex: 1,
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(300px, .85fr)",
            gap: "clamp(48px, 6vw, 110px)",
            alignItems: "start",
          }}
        >
          {/* Columna izquierda: titular + CTAs */}
          <div>
            <span
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: ".25em",
                textTransform: "uppercase",
                color: c.cyan,
                marginBottom: "22px",
              }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: c.cyan }} />
              El costo importa
            </span>

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(34px, 3.6vw, 62px)",
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
                fontWeight: 700,
                color: c.text,
                maxWidth: "15ch",
                margin: "0 0 18px",
                textWrap: "balance",
              }}
            >
              Una plataforma propia es más{" "}
              <span
                style={{
                  background: "linear-gradient(100deg, #7957ff 0%, #5268ff 40%, #15cbea 80%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  fontStyle: "italic",
                }}
              >
                accesible
              </span>{" "}
              de lo que imaginás.
            </h2>

            <p
              style={{
                fontSize: "clamp(15px, 1.05vw, 18px)",
                lineHeight: 1.55,
                color: c.textSecondary,
                maxWidth: "46ch",
                margin: "0 0 32px",
              }}
            >
              Empezá con las funciones que tu negocio necesita hoy y sumá nuevas herramientas a medida que crece.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="/contacto"
                className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl px-7 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #7957ff 0%, #5268ff 44%, #15cbea 100%)",
                  boxShadow: "0 8px 32px rgba(121,87,255,0.3)",
                }}
              >
                Contanos cómo funciona tu negocio →
              </a>
              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border bg-transparent px-7 text-sm font-semibold transition-colors"
                style={{ borderColor: `${c.text}33`, color: c.text }}
              >
                Ver soluciones por rubro
              </a>
            </div>
          </div>

          {/* Columna derecha: ficha técnica */}
          <aside
            style={{
              border: `1px solid ${c.borderStrong}`,
              borderRadius: "18px",
              padding: "clamp(20px, 2vw, 28px)",
              background: c.surface,
              boxShadow: "0 24px 70px rgba(0,0,0,.28)",
              position: "relative",
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{
                borderBottom: `1px solid ${c.border}`,
                paddingBottom: "12px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  fontFamily: "'SF Mono', Consolas, monospace",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: c.textMuted,
                }}
              >
                Qué NO incluye tu factura
              </span>
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  fontFamily: "'SF Mono', Consolas, monospace",
                  fontSize: "10px",
                  color: c.success,
                  fontWeight: 700,
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.success }} />
                OK
              </span>
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {specs.map((s) => (
                <li
                  key={s.n}
                  className="flex items-baseline gap-4"
                  style={{
                    padding: "13px 0",
                    borderBottom: `1px dashed ${c.border}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'SF Mono', Consolas, monospace",
                      fontSize: "11px",
                      color: c.cyan,
                      fontWeight: 700,
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(14px, 1vw, 16px)",
                      fontWeight: 600,
                      color: c.text,
                      position: "relative",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-1px",
                        top: "52%",
                        width: "100%",
                        height: "2px",
                        background: `${c.accent}99`,
                        transform: "rotate(-2.5deg)",
                        borderRadius: "2px",
                      }}
                    />
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>

            <p
              style={{
                marginTop: "14px",
                fontFamily: "'SF Mono', Consolas, monospace",
                fontSize: "10px",
                letterSpacing: ".08em",
                color: c.textMuted,
                textTransform: "uppercase",
              }}
            >
              Alcance definido · Implementación por etapas · Inversión escalable
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
