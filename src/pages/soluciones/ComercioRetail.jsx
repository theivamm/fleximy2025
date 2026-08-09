import SolutionHero from "../../components/soluciones/SolutionHero"
import ComercioScene from "../../components/soluciones/scenes/ComercioScene"
import {
  Problem,
  Duo,
  Modalidades,
  Integraciones,
  Audience,
  FaqBlock,
  CtaBlock,
} from "../../components/soluciones/Blocks"
import { SOLUCIONES } from "../../data/soluciones"

const data = SOLUCIONES.comercio

export default function ComercioRetail() {
  return (
    <main className="bg-paper text-text">
      <SolutionHero
        data={data}
        lines={["Tu catálogo actualizado", "y tus consultas listas para gestionar"]}
      >
        <ComercioScene />
      </SolutionHero>
      <Problem data={data} accent={data.accent} />
      <Duo data={data} accent={data.accent} />
      <Modalidades data={data} accent={data.accent} />
      <Integraciones data={data} accent={data.accent} />
      <Audience data={data} accent={data.accent} />
      <FaqBlock data={data} />
      <CtaBlock data={data} />
    </main>
  )
}
