import { motion } from "framer-motion"

export default function GlassCard({ children, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`glass p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
