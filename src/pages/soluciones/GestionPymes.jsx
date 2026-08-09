import SolutionHero from "../../components/soluciones/SolutionHero"
import GestionScene from "../../components/soluciones/scenes/GestionScene"
import {
  Problem,
  Groups,
  Reports,
  Recorrido,
  Audience,
  FaqBlock,
  CtaBlock,
} from "../../components/soluciones/Blocks"
import { SOLUCIONES } from "../../data/soluciones"

const data = SOLUCIONES.gestion

export default function GestionPymes() {
  return (
    <main className="bg-paper text-text">
      <SolutionHero
        data={data}
        lines={["Tu equipo necesita un lugar común", "para saber qué sigue"]}
      >
        <GestionScene />
      </SolutionHero>
      <Problem data={data} accent={data.accent} />
      <Groups data={data} accent={data.accent} />
      <Reports data={data} accent={data.accent} />
      <Recorrido data={data} accent={data.accent} />
      <Audience data={data} accent={data.accent} />
      <FaqBlock data={data} />
      <CtaBlock data={data} />
    </main>
  )
}
