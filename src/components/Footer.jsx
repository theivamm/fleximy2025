import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { NAV, CONTACT } from "../data/navigation"
import { INDUSTRIES } from "../data/industries"
import logoSvg from "../assets/logo-fleximy.svg"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-text-invert">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:gap-8 lg:grid-cols-12">
          {/* Marca */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <img src={logoSvg} alt="Fleximy" className="h-9 w-auto" />
            <p className="text-h4 max-w-[20ch] text-text-invert">
              Tu web también puede operar tu negocio.
            </p>
            <p className="text-small text-text-invert/60 measure-narrow">
              Plataforma digital para PyMEs que integra un sitio web profesional con un panel
              de gestión adaptado a la operación de cada negocio.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 w-fit h-12 px-6 rounded-[var(--radius-btn)] bg-accent text-ink text-sm font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--color-accent)_85%,white)]"
            >
              {CONTACT.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Soluciones */}
          <nav className="lg:col-span-3 flex flex-col gap-3" aria-label="Soluciones">
            <p className="text-micro text-text-invert/50">Soluciones</p>
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                to={industry.to}
                className="text-small text-text-invert/80 hover:text-text-invert transition-colors w-fit"
              >
                {industry.label}
              </Link>
            ))}
          </nav>

          {/* Navegación */}
          <nav className="lg:col-span-2 flex flex-col gap-3" aria-label="Navegación">
            <p className="text-micro text-text-invert/50">Navegación</p>
            {NAV.main.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-small text-text-invert/80 hover:text-text-invert transition-colors w-fit"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="text-small text-text-invert/80 hover:text-text-invert transition-colors w-fit"
            >
              Contacto
            </Link>
          </nav>

          {/* Legal + contacto */}
          <nav className="lg:col-span-3 flex flex-col gap-3" aria-label="Legal y contacto">
            <p className="text-micro text-text-invert/50">Legal y soporte</p>
            {NAV.secondary.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-small text-text-invert/80 hover:text-text-invert transition-colors w-fit"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-text-invert/80 hover:text-text-invert transition-colors w-fit"
            >
              {CONTACT.whatsappText}
            </a>
          </nav>
        </div>

        <div className="mt-14 pt-6 border-t border-line-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-micro text-text-invert/40">
            © {year} Fleximy. Todos los derechos reservados.
          </p>
          <p className="text-micro text-text-invert/40">Sitio web operativo para PyMEs.</p>
        </div>
      </div>
    </footer>
  )
}
