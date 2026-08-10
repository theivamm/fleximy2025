import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Button from "../ui/Button"
import SistemaVivo from "./SistemaVivo"
import { CONTACT } from "../../data/navigation"

gsap.registerPlugin(ScrollTrigger)

export default function HomeHero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.fromTo(
        ".hero-line-inner",
        { yPercent: 112 },
        { yPercent: 0, duration: 1.05, stagger: 0.12, ease: "power4.out" }
      )
        .fromTo(
          ".hero-em",
          { backgroundSize: "0% 0.2em" },
          { backgroundSize: "100% 0.2em", duration: 0.7, ease: "power2.out" },
          "-=0.45"
        )
        .fromTo(
          ".hero-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 },
          "-=0.5"
        )
        .fromTo(
          ".hero-stage",
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5"
        )

      gsap.to(".hero-stage", {
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
    <section ref={root} className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-bg-secondary via-transparent to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      </div>

      <div className="container-site">
        <p className="kicker">Fleximy — Sitio web operativo para PyMEs</p>

        <h1 className="mt-6 text-hero text-ink-primary">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line-inner block">Tu web también</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="hero-line-inner block">puede <em className="hero-em not-italic text-primary">operar</em></span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line-inner block">tu negocio.</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="hero-fade max-w-[52ch] text-lead text-ink-secondary">
              Cada consulta que entra por tu web se estructura sola: se registra, se clasifica y
              llega ordenada a tu panel, lista para responder y convertir.
            </p>
            <div className="hero-fade mt-8 flex flex-wrap gap-3">
              <Button to="/contacto" size="lg" data-track="cta_diagnostico">
                {CONTACT.ctaPrimary}
              </Button>
              <Button to="/demos" variant="secondary" size="lg" data-track="cta_demo">
                {CONTACT.ctaSecondary}
              </Button>
            </div>
            <p className="hero-fade mt-4 font-mono text-micro text-ink-muted">
              diagnóstico gratuito · sin permanencia · sin compromiso
            </p>
          </div>

          <div className="hero-fade flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
            {[
              { n: "1", t: "consulta entra" },
              { n: "2", t: "se estructura sola" },
              { n: "3", t: "responde en el panel" },
            ].map((s) => (
              <span key={s.n} className="flex items-center gap-2.5">
                <span className="grid size-6 place-items-center rounded-full border border-outline-strong font-mono text-micro text-ink-primary">
                  {s.n}
                </span>
                <span className="font-mono text-micro text-ink-secondary">{s.t}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="hero-stage mt-14 lg:mt-16">
          <div className="flex items-center gap-4">
            <span className="font-mono text-micro text-ink-muted">escenario · el viaje de una consulta</span>
            <span aria-hidden="true" className="h-px flex-1 bg-outline" />
          </div>
          <div className="mt-5">
            <SistemaVivo />
          </div>
        </div>
      </div>
    </section>
  )
}
