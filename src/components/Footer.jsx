import { Link } from "react-router-dom"
import ThemeToggle from "./ui/ThemeToggle"
import { useTheme } from "../context/ThemeContext"
import { Mail, MessageCircle } from "lucide-react"
import { NAV, CONTACT } from "../data/navigation"
import { COMPANY } from "../data/config"
import logoSvgBlanco from "../assets/logosvgblanco.svg"
import logoSvgColor from "../assets/logosvgcolor.svg"

const COLUMNS = [
  { title: "Explorar", links: NAV.footer.slice(0, 4) },
  { title: "Empresa", links: NAV.footer.slice(4, 6) },
]

function FooterLogo() {
  const { theme } = useTheme()
  return (
    <img
      src={theme === "dark" ? logoSvgBlanco : logoSvgColor}
      alt="Fleximy"
      width={476.65}
      height={685.32}
      className="block w-auto h-10"
    />
  )
}

function MiniUi() {
  return (
    <div className="pointer-events-none hidden w-44 shrink-0 rotate-3 rounded-xl border border-outline bg-surface-1/60 p-3 opacity-70 lg:block">
      <div className="flex gap-1.5">
        <span className="size-2 rounded-full bg-error" />
        <span className="size-2 rounded-full bg-warning" />
        <span className="size-2 rounded-full bg-success" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="size-4 rounded bg-primary/70" />
          <span className="h-2 flex-1 rounded bg-surface-2" />
        </div>
        <div className="flex items-center gap-2">
          <span className="size-4 rounded bg-secondary/60" />
          <span className="h-2 w-2/3 rounded bg-surface-2" />
        </div>
        <div className="flex items-center gap-2">
          <span className="size-4 rounded bg-accent/60" />
          <span className="h-2 w-1/2 rounded bg-surface-2" />
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-outline" style={{ backgroundImage: "var(--background-image-page)" }}>
      <div className="container-wide pb-10 pt-16 sm:pt-20">
        {/* Bloque superior */}
        <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="h3-title font-display font-bold text-text-1">
              Diseñamos lo que tu negocio necesita <span className="text-gradient">para avanzar.</span>
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/contacto"
                data-track="footer_empezar"
                className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-transform duration-200 hover:-translate-y-0.5"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Empezar un proyecto
              </Link>
              <Link
                to={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/50 px-7 text-sm font-semibold text-text-1 backdrop-blur transition-colors duration-200 hover:bg-surface-2/70"
              >
                {CONTACT.whatsappText}
              </Link>
            </div>
          </div>
          <MiniUi />
        </div>

        {/* Navegación */}
        <div className="mt-14 grid gap-10 border-t border-outline pt-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div>
            <FooterLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Agencia y product studio. Diseñamos y desarrollamos apps, sitios, dashboards y productos digitales.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-3 text-sm font-bold text-text-1">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-text-secondary transition-colors hover:text-text-1">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="mb-3 text-sm font-bold text-text-1">Contacto</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-text-secondary transition-colors hover:text-text-1"
                >
                  <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              {!COMPANY.emailComercial.startsWith("[") && (
                <li>
                  <a
                    href={`mailto:${COMPANY.emailComercial}`}
                    className="inline-flex items-center gap-2.5 text-sm text-text-secondary transition-colors hover:text-text-1"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    {COMPANY.emailComercial}
                  </a>
                </li>
              )}
              {!COMPANY.cuit.startsWith("[") && (
                <li className="text-sm text-text-secondary">CUIT {COMPANY.cuit}</li>
              )}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-text-1">Legal</p>
            <ul className="flex flex-col gap-2">
              {NAV.footer.slice(6).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-text-secondary transition-colors hover:text-text-1">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Palabra gigante */}
        <div aria-hidden="true" className="mt-14 select-none overflow-hidden">
          <p
            className="text-center font-display font-bold leading-[0.85] tracking-tight text-[clamp(4rem,18vw,15rem)]"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              opacity: 0.14,
            }}
          >
            FLEXIMY
          </p>
        </div>

        {/* Barra inferior */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-outline pt-6 sm:flex-row">
          <p className="text-sm text-text-3">
            © {new Date().getFullYear()} {COMPANY.nombre}
            {!COMPANY.razonSocial.startsWith("[") ? ` (${COMPANY.razonSocial})` : ""}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-3">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
