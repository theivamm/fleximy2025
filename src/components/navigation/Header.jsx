import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import ThemeToggle from "../ui/ThemeToggle"
import { NAV, CONTACT } from "../../data/navigation"
import logoSvgBlanco from "../../assets/logosvgblanco.svg"
import logoSvgColor from "../../assets/logosvgcolor.svg"
import { useTheme } from "../../context/ThemeContext"

function Logo({ compact = false }) {
  const { theme } = useTheme()
  const logoSrc = theme === "dark" ? logoSvgBlanco : logoSvgColor
  return (
    <Link to="/" aria-label="Fleximy — Inicio" className="flex shrink-0 items-center gap-2.5">
      <img
        src={logoSrc}
        alt=""
        width={476.65}
        height={685.32}
        className={`block shrink-0 w-auto transition-all duration-300 ${
          compact ? "h-8" : "h-9"
        }`}
      />
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleAnchor = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      setMobileOpen(false)
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 border-b transition-all duration-300 isolation-isolate ${
        scrolled
          ? "border-outline bg-bg-0/82 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between gap-3 transition-all duration-300 ${
            scrolled ? "h-16" : "h-[4.5rem]"
          }`}
        >
          <Logo compact={scrolled} />

          <nav className="hidden items-center gap-1 nav:flex" aria-label="Principal">
            {NAV.main.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchor(e, item.href)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-text-2 transition-colors hover:text-text-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contacto"
              className="hidden h-10 items-center rounded-[var(--radius-btn)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-transform duration-200 hover:-translate-y-0.5 nav:inline-flex"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              {CONTACT.ctaPrimary}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="grid size-11 place-items-center rounded-xl border border-outline bg-surface-1/60 text-text-1 nav:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-outline bg-bg-1 nav:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {NAV.main.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleAnchor(e, item.href)}
                  className="rounded-xl px-4 py-3 text-[15px] font-semibold text-text-2 hover:bg-surface-2 hover:text-text-1"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/contacto"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-semibold text-text-1 hover:bg-surface-2"
              >
                Contacto
              </Link>
              <div className="mt-3 flex items-center justify-between border-t border-outline px-4 pt-4">
                <ThemeToggle />
                <Link
                  to="/contacto"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center rounded-[var(--radius-btn)] px-5 text-sm font-semibold text-white"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  {CONTACT.ctaPrimary}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
