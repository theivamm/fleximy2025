import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Button from "../ui/Button"
import SimuladorHero from "./SimuladorHero"
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
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.14, ease: "power4.out" }
      )
        .fromTo(
          ".hero-operar",
          { color: "var(--color-cyan)" },
          { color: "var(--color-cyan-deep)", duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 },
          "-=0.5"
        )
        .fromTo(
          ".hero-sim",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5"
        )

      gsap.to(".hero-sim", {
        yPercent: 6,
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
    <section ref={root} className="relative overflow-hidden pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p className="hero-fade kicker">Fleximy — Sitio web operativo para PyMEs</p>
            <h1 className="mt-6 text-hero text-text">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line-inner block">Tu web también puede</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line-inner block">
                  <span className="hero-operar text-cyan-deep">operar</span> tu negocio
                </span>
              </span>
            </h1>
            <p className="hero-fade mt-6 max-w-[52ch] text-lead text-muted">
              Una web que recibe consultas y un panel que las convierte en trabajo ordenado. Elegí
              una base para tu rubro y la adaptamos a cómo trabaja tu equipo.
            </p>
            <div className="hero-fade mt-8 flex flex-wrap gap-3">
              <Button to="/contacto" size="lg">
                {CONTACT.ctaPrimary}
              </Button>
              <Button to="/demos" variant="secondary" size="lg">
                {CONTACT.ctaSecondary}
              </Button>
            </div>
            <p className="hero-fade mt-4 font-mono text-micro text-muted">
              diagnóstico gratuito · sin permanencia · sin compromiso
            </p>
          </div>

          <div className="hero-sim">
            <SimuladorHero />
          </div>
        </div>
      </div>
    </section>
  )
}
