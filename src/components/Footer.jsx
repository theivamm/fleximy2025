import { Link } from "react-router-dom"
import ThemeToggle from "./ui/ThemeToggle"
import { useTheme } from "../context/ThemeContext"
import { Mail, MessageCircle } from "lucide-react"
import { NAV, CONTACT } from "../data/navigation"
import { COMPANY } from "../data/config"
import logoSvgBlanco from "../assets/logosvgblanco.svg"
import logoSvgColor from "../assets/logosvgcolor.svg"

function FooterLogo() {
  const { theme } = useTheme()
  return (
    <img
      src={theme === "dark" ? logoSvgBlanco : logoSvgColor}
      alt="Fleximy"
      width={476.65}
      height={685.32}
      className="block w-auto h-9"
    />
  )
}

export default function Footer() {
  const handleAnchor = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-outline">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <FooterLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Diseñamos y desarrollamos productos digitales para negocios.
            </p>
          </div>

          <nav aria-label="Navegación">
            <p className="mb-3 text-sm font-bold text-text-1">Navegación</p>
            <ul className="flex flex-col gap-2">
              {NAV.footer.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => handleAnchor(e, l.href)}
                    className="text-sm text-text-secondary transition-colors hover:text-text-1"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

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
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold text-text-1">Legal</p>
            <ul className="flex flex-col gap-2">
              {NAV.legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-text-secondary transition-colors hover:text-text-1">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-outline pt-6 sm:flex-row">
          <p className="text-sm text-text-3">
            © {new Date().getFullYear()} {COMPANY.nombre}. Todos los derechos reservados.
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
