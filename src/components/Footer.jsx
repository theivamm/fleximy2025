import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import logoSvg from "../assets/logo-fleximy.svg"

export default function Footer() {
  const { lang } = useLang()
  const t = translations.footer

  return (
    <footer className="relative border-t border-white/20 dark:border-white/5 bg-white/30 dark:bg-slate-950/30 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logoSvg} alt="Fleximy" className="h-8 w-auto" />
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Fleximy. {t.rights[lang]}
          </p>
        </div>
      </div>
    </footer>
  )
}
