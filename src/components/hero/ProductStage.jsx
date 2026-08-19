import { AnimatePresence, motion } from "framer-motion"
import WebExperience from "./views/WebExperience"
import OperationsApp from "./views/OperationsApp"
import BusinessDashboard from "./views/BusinessDashboard"

const VIEWS = [
  { key: "web", label: "WEB", Component: WebExperience },
  { key: "app", label: "APP", Component: OperationsApp },
  { key: "dashboard", label: "DASHBOARD", Component: BusinessDashboard },
]

export default function ProductStage({ activeView, onSelectView, isAutoplay }) {
  const current = VIEWS.find((v) => v.key === activeView) || VIEWS[0]

  return (
    <div className="relative w-full">
      {/* Ambient glow */}
      <div
        className="absolute -inset-12 -z-10 opacity-40 blur-[80px] transition-colors duration-1000"
        style={{
          background:
            activeView === "web"
              ? "radial-gradient(ellipse at 40% 50%, rgba(121,87,255,0.3), transparent 70%)"
              : activeView === "app"
              ? "radial-gradient(ellipse at 40% 50%, rgba(69,226,213,0.2), transparent 70%)"
              : "radial-gradient(ellipse at 40% 50%, rgba(255,111,174,0.2), transparent 70%)",
        }}
      />

      {/* Browser frame */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0c16] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-0 border-b border-white/[0.06] bg-[#0d0f1a] px-2">
          <div className="flex gap-1.5 py-2 mr-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
          </div>
          <div
            role="tablist"
            aria-label="Vistas del producto"
            className="flex gap-0.5"
          >
            {VIEWS.map((v) => (
              <button
                key={v.key}
                role="tab"
                aria-selected={activeView === v.key}
                aria-controls={`panel-${v.key}`}
                onClick={() => onSelectView(v.key)}
                onKeyDown={(e) => {
                  const idx = VIEWS.findIndex((x) => x.key === activeView)
                  if (e.key === "ArrowRight") {
                    e.preventDefault()
                    onSelectView(VIEWS[(idx + 1) % VIEWS.length].key)
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault()
                    onSelectView(VIEWS[(idx - 1 + VIEWS.length) % VIEWS.length].key)
                  }
                }}
                className={`relative px-4 py-2 text-[10px] font-semibold tracking-wider transition-colors ${
                  activeView === v.key ? "text-white" : "text-[#5a5a5a] hover:text-[#8a8a8a]"
                }`}
              >
                {v.label}
                {activeView === v.key && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-x-1 -bottom-px h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #7957ff, #45e2d5)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* View content */}
        <div
          id={`panel-${current.key}`}
          role="tabpanel"
          aria-label={current.label}
          className="relative h-[340px] sm:h-[420px] md:h-[480px] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <current.Component isInteractive={isAutoplay || activeView !== "web"} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom label */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="w-1 h-1 rounded-full bg-[#7957ff]" />
        <span className="text-[9px] font-mono tracking-[0.15em] text-[#4a4a5a] uppercase">
          Demo conceptual · Nomada Coffee
        </span>
        <span className="w-1 h-1 rounded-full bg-[#45e2d5]" />
      </div>

      {/* Bottom reflection */}
      <div
        className="absolute -bottom-8 left-[10%] right-[10%] h-16 -z-10 opacity-[0.04] blur-xl rounded-full"
        style={{ background: "linear-gradient(90deg, #7957ff, #45e2d5, #ff6fae)" }}
      />
    </div>
  )
}
