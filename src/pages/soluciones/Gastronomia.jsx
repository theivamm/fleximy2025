import SolutionHero from "../../components/soluciones/SolutionHero"
import GastroScene from "../../components/soluciones/scenes/GastroScene"
import {
  Problem,
  Duo,
  ModuleChips,
  Recorrido,
  Audience,
  FaqBlock,
  CtaBlock,
} from "../../components/soluciones/Blocks"
import { SOLUCIONES } from "../../data/soluciones"

const data = SOLUCIONES.gastronomia

export default function Gastronomia() {
  return (
    <main className="bg-paper text-text">
      <SolutionHero
        data={data}
        lines={["Tu menú, tus pedidos", "y tu operación en un solo lugar"]}
      >
        <GastroScene />
      </SolutionHero>
      <Problem data={data} accent={data.accent} />
      <Duo data={data} accent={data.accent} />
      <ModuleChips data={data} accent={data.accent} />
      <Recorrido data={data} accent={data.accent} />
      <Audience data={data} accent={data.accent} />
      <FaqBlock data={data} />
      <CtaBlock data={data} />
    </main>
  )
}
