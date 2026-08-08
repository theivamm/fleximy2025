import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import logoSvg from "../assets/logo-fleximy.svg"

const solucionesItems = ["gastronomia", "turnos", "pymes"]
const solucionesLinks = {
  gastronomia: "/gastronomia",
  turnos: "/turnos",
  pymes: "/gestion-pymes",
}

export default function Navbar() {
  const { lang, toggleLang } = useLang()
  const location = useLocation()
  const navigate = useNavigate()
  const t = translations.nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [solucionesOpen, setSolucionesOpen] = useState(false)
  const [mobileSolucionesOpen, setMobileSolucionesOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSolucionesOpen(false)
    setMobileSolucionesOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSolucionesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const scrollToPlan = (e) => {
    e.preventDefault()
    if (location.pathname === "/") {
      const el = document.getElementById("plan")
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("/#plan")
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl shadow-[0_4px_20px_0_rgba(31,38,135,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center group py-1">
            <img src={logoSvg} alt="Fleximy" className="h-9 md:h-11 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Soluciones Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setSolucionesOpen(!solucionesOpen)}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide rounded-xl transition-colors duration-200 cursor-pointer ${
                  solucionesOpen
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t.soluciones[lang]}
                <ChevronDown size={14} className={`transition-transform duration-200 ${solucionesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {solucionesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl shadow-indigo-500/5 overflow-hidden"
                  >
                    {solucionesItems.map((item, i) => {
                      const descs = [
                        "Menú QR, reservas y comandas sin comisiones.",
                        "Agenda online 24/7 y recordatorios automáticos.",
                        "Tableros de tareas, proyectos y control de equipo.",
                      ]
                      return (
                      <Link
                        key={item}
                        to={solucionesLinks[item]}
                        className="flex items-start gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                      >
                        <div className={`w-8 h-8 mt-0.5 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                          i === 0 ? "bg-amber-500/15 text-amber-400" :
                          i === 1 ? "bg-cyan-500/15 text-cyan-400" :
                          "bg-emerald-500/15 text-emerald-400"
                        }`}>
                          {i === 0 ? "🍽" : i === 1 ? "📅" : "🏢"}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{t[item][lang]}</span>
                          <span className="text-[11px] text-slate-500 leading-tight mt-0.5">{descs[i]}</span>
                        </div>
                      </Link>
                    )})}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/demos"
              className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-xl transition-colors duration-200 ${
                isActive("/demos")
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t.demos[lang]}
            </Link>

            <Link
              to="/precios"
              className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-xl transition-colors duration-200 ${
                isActive("/precios")
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t.precio[lang]}
            </Link>

            <Link
              to="/nosotros"
              className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-xl transition-colors duration-200 ${
                isActive("/nosotros")
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t.nosotros[lang]}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="h-10 px-3 text-xs font-semibold tracking-widest uppercase rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/40 transition-all cursor-pointer"
            >
              {lang}
            </button>

            <a
              href="https://wa.me/541111111111"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-xl text-xs font-bold tracking-wide text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 active:scale-[0.98]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.whatsapp[lang]}
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/10 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Soluciones (expandable) */}
              <div>
                <button
                  onClick={() => setMobileSolucionesOpen(!mobileSolucionesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <span>{t.soluciones[lang]}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileSolucionesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileSolucionesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-1">
                        {solucionesItems.map((item, i) => (
                          <Link
                            key={item}
                            to={solucionesLinks[item]}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                          >
                            <span>{i === 0 ? "🍽" : i === 1 ? "📅" : "🏢"}</span>
                            {t[item][lang]}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/precios"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
              >
                {t.precio[lang]}
              </Link>

              <Link
                to="/nosotros"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
              >
                {t.nosotros[lang]}
              </Link>

              <div className="pt-2 space-y-2">
                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.whatsapp[lang]}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
