import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, Mail, MapPin, Clock, ChevronDown, Sparkles, ArrowRight } from "lucide-react"
import { useLang } from "../context/LangContext"
import Button from "../components/Button"
import SectionWrapper from "../components/SectionWrapper"
import InteractiveBackground from "../components/InteractiveBackground"

const businessTypes = {
  coffee: { en: "Coffee Shop / Café", es: "Cafetería / Café" },
  restaurant: { en: "Restaurant", es: "Restaurante" },
  retail: { en: "Retail Store", es: "Tienda Retail" },
  clinic: { en: "Clinic", es: "Clínica" },
  gym: { en: "Gym / Fitness", es: "Gimnasio" },
  other: { en: "Other", es: "Otro" },
}

const contactInfo = [
  {
    icon: Mail,
    label: { en: "Email", es: "Correo" },
    value: "hello@vessel.agency",
    href: "mailto:hello@vessel.agency",
  },
  {
    icon: MapPin,
    label: { en: "Location", es: "Ubicación" },
    value: { en: "Miami / Bogotá", es: "Miami / Bogotá" },
  },
  {
    icon: Clock,
    label: { en: "Response Time", es: "Tiempo de Respuesta" },
    value: { en: "Within 24 hours", es: "En menos de 24 horas" },
  },
]

function FloatingLabelInput({ label, name, type = "text", required, placeholder }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-5 pt-7 pb-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400/50 transition-all peer"
        placeholder=""
      />
      <label
        className={`absolute left-5 transition-all duration-200 pointer-events-none ${
          focused || value
            ? "top-2 text-[10px] text-indigo-500 font-semibold tracking-wider uppercase"
            : "top-4 text-sm text-slate-400"
        }`}
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {/* Bottom shimmer */}
      <div className={`absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full scale-x-0 transition-transform duration-300 ${focused || value ? "scale-x-100" : ""}`} />
    </div>
  )
}

function FloatingLabelTextarea({ label, name, required }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="relative">
      <textarea
        name={name}
        required={required}
        rows={5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-5 pt-7 pb-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400/50 transition-all resize-none peer"
        placeholder=""
      />
      <label
        className={`absolute left-5 transition-all duration-200 pointer-events-none ${
          focused || value
            ? "top-2 text-[10px] text-indigo-500 font-semibold tracking-wider uppercase"
            : "top-4 text-sm text-slate-400"
        }`}
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className={`absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full scale-x-0 transition-transform duration-300 ${focused || value ? "scale-x-100" : ""}`} />
    </div>
  )
}

export default function Contact() {
  const { lang } = useLang()
  const [sent, setSent] = useState(false)
  const [businessType, setBusinessType] = useState("")

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  const t = (key) => {
    const texts = {
      heroTag: { en: "Get in Touch", es: "Contáctanos" },
      heroTitle: { en: "Let's build something extraordinary together", es: "Construyamos algo extraordinario juntos" },
      heroSub: { en: "Tell us about your business vision and we'll design a Vessel that transforms the way you operate.", es: "Cuéntanos sobre tu visión de negocio y diseñaremos un Vessel que transforme tu forma de operar." },
      heroCTA: { en: "Start the Conversation", es: "Iniciar la Conversación" },
      formTitle: { en: "Send us a message", es: "Envíanos un mensaje" },
      formSub: { en: "Fill out the form and we'll get back to you within 24 hours.", es: "Completa el formulario y te responderemos en menos de 24 horas." },
      name: { en: "Full Name", es: "Nombre Completo" },
      email: { en: "Email Address", es: "Correo Electrónico" },
      phone: { en: "Phone Number", es: "Teléfono" },
      business: { en: "Business Type", es: "Tipo de Negocio" },
      message: { en: "Tell us about your project", es: "Cuéntanos sobre tu proyecto" },
      send: { en: "Send Message", es: "Enviar Mensaje" },
      success: { en: "Message sent successfully! We'll be in touch soon.", es: " Mensaje enviado con éxito! Te contactaremos pronto." },
      selectPlaceholder: { en: "Select your business type...", es: "Selecciona tu tipo de negocio..." },
      infoTitle: { en: "Contact Information", es: "Información de Contacto" },
      direct: { en: "Or reach us directly", es: "O contáctanos directamente" },
      ctaTitle: { en: "Ready to containerize your business?", es: "¿Listo para contenerizar tu negocio?" },
      ctaBtn: { en: "Book Your Free Consultation", es: "Agenda Tu Consultoría Gratis" },
    }
    return texts[key][lang]
  }

  return (
    <>
      {/* ═════════════════════════════════════════════
          HERO BANNER
      ═════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden"
      >
        <InteractiveBackground />

        <motion.div style={{ y: heroY }} className="mx-auto max-w-6xl w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
                <Sparkles size={14} />
                {t("heroTag")}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
                <span className="text-slate-900 dark:text-white">
                  {t("heroTitle").split(" ").slice(0, Math.ceil(t("heroTitle").split(" ").length / 2)).join(" ")}
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {t("heroTitle").split(" ").slice(Math.ceil(t("heroTitle").split(" ").length / 2)).join(" ")}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                {t("heroSub")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="primary" className="text-base px-8 py-4">
                  {t("heroCTA")}
                  <ArrowRight size={18} />
                </Button>
              </div>

              <motion.div
                className="mt-16 flex flex-col items-center gap-2 text-xs text-slate-400 tracking-widest uppercase"
                animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span>{lang === "es" ? "Desliza para ver el formulario" : "Scroll to the form"}</span>
                <ChevronDown size={14} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════
          CONTACT INFO CARDS
      ═════════════════════════════════════════════ */}
      <SectionWrapper className="pt-0 md:pt-0">
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label[lang]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon size={22} className="text-indigo-500" />
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-0.5">
                  {item.label[lang]}
                </div>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {typeof item.value === "object" ? item.value[lang] : item.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═════════════════════════════════════════════
            FORM + INFO SIDEBY SIDE
        ═════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form — takes 3/5 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass p-8 md:p-10"
          >
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
              {t("formTitle")}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              {t("formSub")}
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <p className="text-lg font-medium text-slate-900 dark:text-white text-center">
                  {t("success")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingLabelInput label={t("name")} name="name" required />
                  <FloatingLabelInput label={t("email")} name="email" type="email" required />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingLabelInput label={t("phone")} name="phone" type="tel" />
                  <div className="relative">
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-5 pt-7 pb-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400/50 transition-all appearance-none cursor-pointer text-slate-900 dark:text-white"
                    >
                      <option value="" disabled>{t("selectPlaceholder")}</option>
                      {Object.entries(businessTypes).map(([key, val]) => (
                        <option key={key} value={key}>{val[lang]}</option>
                      ))}
                    </select>
                    <label className="absolute left-5 top-2 text-[10px] text-indigo-500 font-semibold tracking-wider uppercase">
                      {t("business")}
                    </label>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronDown size={16} />
                    </div>
                    <div className={`absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full scale-x-0 transition-transform duration-300 ${businessType ? "scale-x-100" : ""}`} />
                  </div>
                </div>

                <FloatingLabelTextarea label={t("message")} name="message" required />

                <Button variant="primary" className="w-full text-base py-4">
                  {t("send")}
                  <Send size={16} />
                </Button>
              </form>
            )}
          </motion.div>

          {/* Sidebar — takes 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass p-6">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                {t("infoTitle")}
              </h4>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={14} className="text-indigo-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                        {item.label[lang]}
                      </div>
                      <div className="text-sm text-slate-700 dark:text-slate-300">
                        {typeof item.value === "object" ? item.value[lang] : item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                {t("direct")}
              </h4>
              <a
                href="mailto:hello@vessel.agency"
                className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
              >
                hello@vessel.agency
              </a>
              <div className="mt-4 flex gap-3">
                {["X", "LI", "IG"].map((s) => (
                  <div
                    key={s}
                    className="w-10 h-10 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-indigo-500 hover:bg-white/60 dark:hover:bg-slate-700/40 transition-all cursor-pointer"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  )
}
