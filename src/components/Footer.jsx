import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"

export default function Footer() {
  const { lang } = useLang()
  const t = translations.footer

  return (
    <footer className="relative border-t border-white/20 dark:border-white/5 bg-white/30 dark:bg-slate-950/30 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
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
              <path d="M10 20H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-semibold text-slate-900 dark:text-white">Vessel</span>
          </div>
          <p className="text-sm text-slate-400">{t.tagline[lang]}</p>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Vessel. {t.rights[lang]}
          </p>
        </div>
      </div>
    </footer>
  )
}
