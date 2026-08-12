import { motion } from "framer-motion"
import PrimaryCTA from "../ui/PrimaryCTA"
import OutlineCTA from "../ui/OutlineCTA"

export default function SolutionHero({ data, lines, children }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-pattern opacity-50 [mask-image:linear-gradient(180deg,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(52% 44% at 12% 8%, color-mix(in srgb, ${data.accent} 14%, transparent), transparent 62%), radial-gradient(42% 40% at 90% 14%, var(--cyan-soft), transparent 60%)`,
        }}
      />

      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="kicker">{data.eyebrow}</span>
            <h1 className="font-display text-h1 mt-6 max-w-[18ch] text-text-1">
              {(lines || [data.h1]).map((line, i) => (
                <span key={i} className="block">
                  {i === 0 ? line : <span className="text-gradient">{line}</span>}
                </span>
              ))}
            </h1>
            <p className="lead-text mt-6 max-w-[46ch] text-text-2">{data.hero}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCTA to={data.ctaPrimary.to} large>
                {data.ctaPrimary.label}
              </PrimaryCTA>
              <OutlineCTA to={data.ctaSecondary.to} large>
                {data.ctaSecondary.label}
              </OutlineCTA>
            </div>
            <p className="mt-5 font-mono text-micro text-text-3">
              {data.label} · diagnóstico gratuito
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[calc(var(--radius-card)+2rem)] opacity-60 blur-2xl"
              style={{ background: `radial-gradient(60% 60% at 50% 40%, color-mix(in srgb, ${data.accent} 28%, transparent), transparent 70%)` }}
            />
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-outline bg-surface-1/70 shadow-[var(--shadow-lg)] backdrop-blur">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
