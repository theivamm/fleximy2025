import { motion } from "framer-motion"

export default function SectionWrapper({ children, className = "", id }) {
  return (
    <section id={id} className={`relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export function SectionHeader({ title, subtitle, align = "center" }) {
  const alignment = align === "center" ? "text-center mx-auto" : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl mb-16 ${alignment}`}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
