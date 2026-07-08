import { motion } from "framer-motion"

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer border-[0.5px]"

  const variants = {
    primary:
      "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-white/20 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] hover:from-indigo-400 hover:to-purple-500",
    secondary:
      "bg-white/40 backdrop-blur-md text-slate-800 border-white/40 dark:bg-slate-800/40 dark:text-white dark:border-white/10 hover:bg-white/60 dark:hover:bg-slate-700/40",
    ghost:
      "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-transparent hover:bg-white/20 dark:hover:bg-white/5",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
