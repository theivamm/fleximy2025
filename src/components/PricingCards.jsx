import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"
import Button from "./Button"

const tiers = ["pricingStarter", "pricingGrowth", "pricingEnterprise"]

export default function PricingCards() {
  const { lang } = useLang()
  const t = translations.home

  return (
    <SectionWrapper>
      <SectionHeader title={t.pricingTitle[lang]} subtitle={t.pricingSub[lang]} />

      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((key, i) => {
          const features = t[`${key}Features`]
          const popular = key === "pricingGrowth"

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass p-8 relative flex flex-col ${popular ? "ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/10 scale-[1.02]" : ""}`}
            >
              {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-semibold tracking-widest uppercase rounded-full">
                  {t.pricingPopular[lang]}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  {t[`${key}`][lang]}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t[`${key}Desc`][lang]}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  {t[`${key}Price`][lang]}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Check size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                    <span>{feat[lang]}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={popular ? "primary" : "secondary"}
                className="w-full"
              >
                {key === "pricingEnterprise" ? t.pricingCTA2[lang] : t.pricingCTA[lang]}
              </Button>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
