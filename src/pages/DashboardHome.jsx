import { Link } from "react-router-dom"
import { ImageIcon, ArrowRight } from "lucide-react"

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Dashboard</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Bienvenido a tu panel de control</p>

      <div className="grid gap-4">
        <Link
          to="/dashboard/ai-images"
          className="glass p-6 flex items-center gap-4 group hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
            <ImageIcon size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white">AI Images</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Generá imágenes con IA para redes sociales</p>
          </div>
          <ArrowRight size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </Link>
      </div>
    </div>
  )
}
