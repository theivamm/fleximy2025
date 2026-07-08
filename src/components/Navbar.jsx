import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import Button from "./Button"

const navLinks = ["home", "services", "whyUs", "blog", "contact"]
const navPaths = {
  home: "/",
  services: "/services",
  whyUs: "/why-us",
  blog: "/blog",
  contact: "/contact",
}

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { lang, toggleLang } = useLang()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = translations.nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const isActive = (link) => location.pathname === navPaths[link]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl border-b border-white/20 dark:border-white/5 shadow-[0_4px_20px_0_rgba(31,38,135,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-indigo-500"
            >
              <path
                d="M4 28L16 4L28 28"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 20H22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Vessel
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={navPaths[link]}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-xl transition-colors duration-200 ${
                  isActive(link)
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t[link][lang]}
                {isActive(link) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/40 transition-all cursor-pointer"
            >
              {lang}
            </button>

            <button
              onClick={toggle}
              className="p-2 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/40 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div className="hidden md:block">
              <Button>{t.bookDemo[lang]}</Button>
            </div>

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
              {navLinks.map((link) => (
                <Link
                  key={link}
                  to={navPaths[link]}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link)
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40"
                  }`}
                >
                  {t[link][lang]}
                </Link>
              ))}
              <div className="pt-2">
                <Button className="w-full">{t.bookDemo[lang]}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
