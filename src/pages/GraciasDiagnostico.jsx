import { Check } from "lucide-react"
import Button from "../components/ui/Button"
import { CONTACT } from "../data/navigation"

export default function GraciasDiagnostico() {
  return (
    <main className="bg-paper text-text">
      <section className="container-site flex min-h-[70vh] items-center py-28 lg:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-accent text-ink">
            <Check className="size-8" />
          </span>
          <p className="mt-8 kicker justify-center">Solicitud recibida</p>
          <h1 className="mt-4 text-h1">Gracias por contarnos tu situación</h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-muted">
            Recibimos tu solicitud. Vamos a revisar la información y contactarte dentro de{" "}
            <span className="font-mono text-text">[PLAZO VALIDADO]</span> días hábiles.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/demos" size="lg">
              Probar las demos
            </Button>
            <Button to="/soluciones" variant="secondary" size="lg">
              Ver soluciones
            </Button>
            <Button href={CONTACT.whatsapp} variant="secondary" size="lg">
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
