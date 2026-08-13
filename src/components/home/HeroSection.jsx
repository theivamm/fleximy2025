import { Link } from "react-router-dom"
import ReactiveBackground from "../ui/ReactiveBackground"
import GradientText from "../ui/GradientText"
import PrimaryCTA from "../ui/PrimaryCTA"
import CafeNomadaApp from "./hero/CafeNomadaApp"

export default function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <ReactiveBackground className="min-h-svh overflow-hidden">
        {/* Luces de color del escenario (acentos Fleximy) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-16 size-[28rem] rounded-full opacity-40 blur-3xl" style={{ backgroundColor: "var(--primary-soft)" }} />
          <div className="absolute right-0 top-0 size-[24rem] rounded-full opacity-30 blur-3xl" style={{ backgroundColor: "var(--secondary-soft)" }} />
          <div className="absolute bottom-0 left-1/3 size-[26rem] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: "var(--accent-soft)" }} />
        </div>

        <div className="mx-auto grid w-[calc(100%-var(--page-gutter)*2)] max-w-[1320px] items-center gap-x-[clamp(56px,5vw,96px)] gap-y-12 pb-16 pt-28 lg:grid-cols-[42fr_58fr] lg:pb-20">
          {/* Columna izquierda: copy */}
          <div className="flex min-w-0 flex-col items-start">
            <span className="kicker">Diseño · Desarrollo · Producto</span>

            <h1
              className="mt-6 font-display font-bold leading-[1] tracking-[-0.03em] text-text-1 [text-wrap:balance]"
              style={{ fontSize: "clamp(2.4rem, 4vw, 4.6rem)", maxWidth: "690px" }}
            >
              Creamos productos{" "}
              <GradientText>digitales</GradientText>{" "}
              que hacen avanzar negocios.
            </h1>

            <p
              className="mt-6 max-w-[54ch] text-text-secondary"
              style={{ fontSize: "clamp(1.125rem, 1.25vw, 1.3rem)", lineHeight: 1.5 }}
            >
              Diseñamos aplicaciones, sitios y sistemas a medida que conectan la experiencia del cliente con la operación del negocio.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PrimaryCTA to="/contacto" large>Contanos tu idea</PrimaryCTA>
              <Link
                to="/demos"
                data-track="hero_ver_proyectos"
                className="inline-flex h-14 items-center gap-2 rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/50 px-7 text-sm font-semibold text-text-1 backdrop-blur transition-colors duration-200 hover:bg-surface-2/70"
              >
                Ver proyectos
              </Link>
            </div>

            <p className="mt-7 font-mono text-xs tracking-wide text-text-3">
              Estrategia · UX/UI · Desarrollo · Automatización
            </p>
          </div>

          {/* Columna derecha: demo de Café Nómada */}
          <div className="relative min-w-0">
            <p className="sr-only">
              Demo de la plataforma Café Nómada: un pedido realizado desde la web se conecta en tiempo real con el panel de gestión.
            </p>
            <CafeNomadaApp />
          </div>
        </div>
      </ReactiveBackground>
    </section>
  )
}
