import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Button from "../ui/Button"

gsap.registerPlugin(ScrollTrigger)

export default function SolutionHero({ data, lines, children }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.fromTo(
        ".sol-line-inner",
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
      )
        .fromTo(
          ".sol-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
        .fromTo(
          ".sol-scene",
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5"
        )

      gsap.to(".sol-scene", {
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-36"
    >
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
          <div>
            <p className="sol-fade kicker">{data.eyebrow}</p>
            <h1 className="mt-6 text-hero text-text">
              {(lines || [data.h1]).map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <span className="sol-line-inner block">{line}</span>
                </span>
              ))}
            </h1>
            <p className="sol-fade mt-6 max-w-[46ch] text-lead text-muted">{data.hero}</p>
            <div className="sol-fade mt-8 flex flex-wrap gap-3">
              <Button to={data.ctaPrimary.to} size="lg">
                {data.ctaPrimary.label}
              </Button>
              <Button to={data.ctaSecondary.to} variant="secondary" size="lg">
                {data.ctaSecondary.label}
              </Button>
            </div>
            <p className="sol-fade mt-4 font-mono text-micro text-muted">
              {data.label} · diagnóstico gratuito
            </p>
          </div>

          <div className="sol-scene">{children}</div>
        </div>
      </div>
    </section>
  )
}
