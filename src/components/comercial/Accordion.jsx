import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function Accordion({ items, initialOpen = 0, idPrefix = "acc" }) {
  const [abierta, setAbierta] = useState(initialOpen)

  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const open = abierta === i
        const contentId = `${idPrefix}-${i}`
        return (
          <div key={item.q ?? i}>
            <button
              type="button"
              onClick={() => setAbierta(open ? -1 : i)}
              aria-expanded={open}
              aria-controls={contentId}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-h4">{item.q}</span>
              <ChevronDown
                className={`size-5 shrink-0 text-muted transition-transform duration-[var(--motion-fast)] ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={contentId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[56ch] pb-5 text-body text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
