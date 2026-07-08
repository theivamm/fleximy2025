import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLang } from "../context/LangContext"

export default function BlogCard({ post, index }) {
  const { lang } = useLang()

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass p-0 overflow-hidden cursor-pointer"
    >
      {/* Image placeholder */}
      <div className="aspect-[16/9] bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-cyan-950/30 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm flex items-center justify-center">
            <ArrowRight size={24} className="text-indigo-500" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
            {post.category[lang]}
          </span>
          <span className="text-[10px] text-slate-400">{post.date}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {post.title[lang]}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {post.excerpt[lang]}
        </p>
      </div>
    </motion.article>
  )
}
