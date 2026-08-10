import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { NAV, CONTACT } from "../data/navigation"
import { INDUSTRIES } from "../data/industries"
import logoSvg from "../assets/logo-fleximy.svg?raw"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-night text-on-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-40"
      />
      <div className="container-site relative py-20 md:py-28">
        {/* Declaración editorial */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="kicker" style={{ color: "rgba(246,247,255,0.5)" }}>
              Fleximy — Sitio web operativo para PyMEs
            </p>
            <p className="mt-5 max-w-[16ch] text-h2 md:text-h1">
              Tu web también puede{" "}
              <span className="text-primary-on-dark">operar tu negocio</span>.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className="text-small text-on-night/60 measure-narrow">
              Plataforma digital para PyMEs que integra un sitio web profesional con un panel de
              gestión adaptado a la operación de cada negocio.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 w-fit h-12 px-6 rounded-[var(--radius-btn)] bg-primary text-white text-sm font-semibold transition-colors hover:bg-primary-hover"
            >
              {CONTACT.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Navegación */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Soluciones">
            <p className="text-micro text-on-night/40">Soluciones</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {INDUSTRIES.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    to={industry.to}
                    className="text-small text-on-night/70 hover:text-on-night transition-colors"
                  >
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navegación">
            <p className="text-micro text-on-night/40">Navegación</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.main.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-small text-on-night/70 hover:text-on-night transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contacto" className="text-small text-on-night/70 hover:text-on-night transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal y soporte">
            <p className="text-micro text-on-night/40">Legal y soporte</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.secondary.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-small text-on-night/70 hover:text-on-night transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-on-night/70 hover:text-on-night transition-colors"
                >
                  {CONTACT.whatsappText}
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-micro text-on-night/40">Plataforma</p>
            <div className="mt-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: logoSvg }}
                className="block h-8 w-auto text-on-night [&>svg]:block [&>svg]:h-full [&>svg]:w-auto"
              />
              <p className="text-small text-on-night/70">Hecho para que tu operación fluya.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-outline-night flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-micro text-on-night/40">© {year} Fleximy. Todos los derechos reservados.</p>
          <p className="text-micro text-on-night/40">Sitio web operativo para PyMEs.</p>
        </div>
      </div>
    </footer>
  )
}
