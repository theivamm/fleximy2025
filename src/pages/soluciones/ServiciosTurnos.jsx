import SolutionHero from "../../components/soluciones/SolutionHero"
import TurnosScene from "../../components/soluciones/scenes/TurnosScene"
import {
  Problem,
  Duo,
  Automations,
  Recorrido,
  Audience,
  FaqBlock,
  CtaBlock,
} from "../../components/soluciones/Blocks"
import { SOLUCIONES } from "../../data/soluciones"

const data = SOLUCIONES.turnos

export default function ServiciosTurnos() {
  return (
    <main className="bg-paper text-text">
      <SolutionHero
        data={data}
        lines={["Menos mensajes para coordinar.", "Más tiempo para atender."]}
      >
        <TurnosScene />
      </SolutionHero>
      <Problem data={data} accent={data.accent} />
      <Duo data={data} accent={data.accent} />
      <Automations data={data} accent={data.accent} />
      <Recorrido data={data} accent={data.accent} />
      <Audience data={data} accent={data.accent} />
      <FaqBlock data={data} />
      <CtaBlock data={data} />
    </main>
  )
}
