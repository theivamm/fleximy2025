import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { NAV, CONTACT } from "../data/navigation"
import { INDUSTRIES } from "../data/industries"
import logoSvg from "../assets/logo-fleximy.svg?raw"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      data-header-theme="dark"
      className="relative overflow-hidden bg-gradient-night text-on-night"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern-dark opacity-40" />
        <div className="absolute -top-40 left-1/4 size-[38rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[26rem] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container-site relative py-16 lg:py-20">
        {/* Declaración + contacto */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="kicker" style={{ color: "rgba(246,247,255,0.5)" }}>
              Fleximy — Sitio web operativo para PyMEs
            </p>
            <p className="mt-5 max-w-[16ch] text-h2 md:text-h1">
              Tu web también puede{" "}
              <span className="bg-gradient-to-r from-primary-on-dark to-secondary bg-clip-text text-transparent">
                operar tu negocio
              </span>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-outline-night bg-night-elevated/60 p-6 backdrop-blur-sm">
            <p className="font-mono text-micro text-on-night/50">arrancamos con un diagnóstico</p>
            <p className="mt-2 text-small text-on-night/75">
              Una conversación de 30 minutos para ver cómo se adapta Fleximy a tu operación.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                to="/contacto"
                className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-btn)] bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                {CONTACT.ctaPrimary}
                <ArrowRight size={15} />
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-[var(--radius-btn)] border border-outline-night px-5 text-sm font-semibold text-on-night/80 transition-colors hover:bg-night-mid"
              >
                {CONTACT.whatsappText}
              </a>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Soluciones">
            <p className="text-micro text-on-night/40">Soluciones</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {INDUSTRIES.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    to={industry.to}
                    className="text-small text-on-night/70 transition-colors hover:text-on-night"
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
                    className="text-small text-on-night/70 transition-colors hover:text-on-night"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contacto"
                  className="text-small text-on-night/70 transition-colors hover:text-on-night"
                >
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
                    className="text-small text-on-night/70 transition-colors hover:text-on-night"
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
                  className="text-small text-on-night/70 transition-colors hover:text-on-night"
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
            <div className="mt-5 flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-secondary" />
              </span>
              <span className="font-mono text-micro text-on-night/50">
                plataforma activa · fleximy
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-outline-night pt-6 sm:flex-row sm:items-center">
          <p className="text-micro text-on-night/40">© {year} Fleximy. Todos los derechos reservados.</p>
          <p className="text-micro text-on-night/40">Sitio web operativo para PyMEs.</p>
        </div>
      </div>

      {/* Watermark editorial */}
      <div aria-hidden="true" className="pointer-events-none relative -mb-[0.18em] overflow-hidden select-none">
        <p className="footer-watermark text-center">FLEXIMY</p>
      </div>
    </footer>
  )
}
