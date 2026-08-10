import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Button from "../ui/Button"

gsap.registerPlugin(ScrollTrigger)

const PASOS = [
  {
    num: "01",
    titulo: "Diagnóstico",
    detalle: "Una conversación de 30 minutos para entender cómo trabaja tu equipo hoy.",
    tag: "gratuito",
  },
  {
    num: "02",
    titulo: "Base diseñada",
    detalle: "Elegimos la base para tu rubro y la adaptamos a tu operación real.",
  },
  {
    num: "03",
    titulo: "Carga y puesta en marcha",
    detalle: "Subimos tu contenido y configuramos el panel con tus datos.",
  },
  {
    num: "04",
    titulo: "Activación y acompañamiento",
    detalle: "Lanzamos tu web y acompañamos el arranque, ajustando lo que haga falta.",
  },
]

export default function Proceso() {
  const ref = useRef(null)
  const markRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        markRef.current,
        { left: "0%" },
        {
          left: "calc(100% - 16px)",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="relative overflow-hidden bg-night py-24 text-on-night lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-40"
      />
      <div className="container-site relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="kicker" style={{ color: "rgba(246,247,255,0.55)" }}>
              Cómo funciona
            </p>
            <h2 className="mt-5 text-h1">
              De la primera conversación a tu{" "}
              <span className="text-primary-on-dark">plataforma activa</span>
            </h2>
          </div>
          <Button to="/como-funciona" variant="secondary">
            Ver el proceso completo
          </Button>
        </div>

        <div
          ref={ref}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-outline-night bg-outline-night lg:grid-cols-4"
        >
          {PASOS.map((paso) => (
            <div key={paso.num} className="flex flex-col gap-4 bg-night-elevated p-6 lg:p-8">
              <span className="font-mono text-micro text-secondary">{paso.num}</span>
              <h3 className="text-h4">{paso.titulo}</h3>
              <p className="text-small text-on-night/65">{paso.detalle}</p>
              {paso.tag && (
                <span className="mt-auto w-fit rounded-full bg-primary px-3 py-1 font-mono text-micro text-white">
                  {paso.tag}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="relative h-1 flex-1 rounded-full bg-night-mid">
            <div
              ref={markRef}
              className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_0_4px_rgba(0,167,181,0.2)]"
              style={{ left: "0%" }}
            />
          </div>
          <span className="font-mono text-micro text-on-night/50">arranque</span>
        </div>
      </div>
    </section>
  )
}
