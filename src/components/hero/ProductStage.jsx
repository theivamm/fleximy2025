import { AnimatePresence, motion } from "framer-motion"
import { useProductStory } from "./hooks/useProductStory"
import { useHeroAutoplay } from "./hooks/useHeroAutoplay"
import DemoCursor from "./DemoCursor"
import WebExperience from "./views/WebExperience"
import AppExperience from "./views/AppExperience"
import DashboardExperience from "./views/DashboardExperience"

const VIEWS = [
  { key: "web", label: "WEB", Component: WebExperience },
  { key: "app", label: "APP", Component: AppExperience },
  { key: "dashboard", label: "DASHBOARD", Component: DashboardExperience },
]

export default function ProductStage({ prefersReduced }) {
  const story = useProductStory()
  const { state } = story
  const { isAutoplay, goTo } = useHeroAutoplay(prefersReduced, story)
  const current = VIEWS.find((v) => v.key === state.view) || VIEWS[0]

  return (
    <div className="relative w-full" style={{ maxWidth: "940px" }}>
      {/* Violet halo behind frame */}
      <div
        className="absolute -z-20 pointer-events-none"
        style={{
          inset: "-64px",
          opacity: 0.45,
          filter: "blur(100px)",
          background: "radial-gradient(ellipse at 50% 50%, rgba(121,87,255,0.18), transparent 65%)",
        }}
      />

      {/* Product Stage frame — must be flex column so children can fill aspect-ratio height */}
      <div
        className="product-stage-frame relative"
        data-reduced={prefersReduced}
        style={{
          borderRadius: "22px",
          border: "1px solid rgba(220,225,255,0.1)",
          background: "#0e0f1a",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.4), 0 0 80px rgba(79,70,229,0.15), 0 0 120px rgba(20,184,166,0.1)",
          overflow: "visible",
          isolation: "isolate",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Tabs bar */}
        <div
          className="flex items-center gap-0 px-3 shrink-0"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#0d0f1a",
            borderRadius: "21px 21px 0 0",
          }}
        >
          <div className="flex gap-1.5 py-2.5 mr-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
          </div>

          <div role="tablist" aria-label="Vistas del producto" className="flex gap-1">
            {VIEWS.map((v) => (
              <button
                key={v.key}
                role="tab"
                aria-selected={state.view === v.key}
                aria-controls={`panel-${v.key}`}
                onClick={() => goTo(v.key)}
                onKeyDown={(e) => {
                  const idx = VIEWS.findIndex((x) => x.key === state.view)
                  if (e.key === "ArrowRight") {
                    e.preventDefault()
                    goTo(VIEWS[(idx + 1) % VIEWS.length].key)
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault()
                    goTo(VIEWS[(idx - 1 + VIEWS.length) % VIEWS.length].key)
                  }
                }}
                className="relative px-5 py-2.5 text-[11px] font-semibold tracking-wider transition-colors"
                style={{
                  color: state.view === v.key ? "#fff" : "#5a5a5a",
                  cursor: "pointer",
                }}
              >
                {v.label}
                {state.view === v.key && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-x-2 -bottom-px h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #7957ff, #45e2d5)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-[9px] font-mono tracking-[0.1em] text-[#4a4a5a] uppercase">
              Demo · Tu negocio
            </span>
          </div>
        </div>

        {/* View content — flex:1 so it fills remaining aspect-ratio height */}
        <div
          id={`panel-${current.key}`}
          role="tabpanel"
          aria-label={current.label}
          className="relative overflow-hidden"
          style={{ flex: 1, minHeight: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <current.Component isInteractive={!isAutoplay} story={story} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DemoCursor */}
      <DemoCursor active={isAutoplay} visible={!prefersReduced} />

      {/* Bottom label */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="w-1 h-1 rounded-full bg-[#7957ff]" />
        <span className="text-[9px] font-mono tracking-[0.15em] text-[#4a4a5a] uppercase">
          Un negocio · Tres productos conectados
        </span>
        <span className="w-1 h-1 rounded-full bg-[#45e2d5]" />
      </div>

      {/* Reflections */}
      <div
        className="absolute -bottom-6 right-[5%] w-48 h-12 -z-10 opacity-[0.06] blur-xl rounded-full pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #45e2d5)" }}
      />
      <div
        className="absolute -bottom-8 left-[10%] right-[10%] h-16 -z-10 opacity-[0.04] blur-xl rounded-full pointer-events-none"
        style={{ background: "linear-gradient(90deg, #7957ff, #45e2d5)" }}
      />

      <style>{`
        .product-stage-frame {
          aspect-ratio: 16 / 10;
          animation: productFloat 6s ease-in-out infinite;
        }
        .product-stage-frame[data-reduced="true"] {
          animation: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .product-stage-frame { animation: none; }
        }
        @media (max-width: 640px) {
          .product-stage-frame {
            aspect-ratio: 4 / 5;
          }
        }
        @keyframes productFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
