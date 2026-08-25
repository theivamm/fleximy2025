import Hero from "../components/hero/Hero"
import ConnectedBusinessStory from "../components/home/ConnectedBusinessStory/ConnectedBusinessStory"
import ModuleThreeProcess from "../components/home/ModuleThreeProcess/ModuleThreeProcess"

export default function Home() {
  return (
    <main className="text-text-1">
      <Hero />
      <ConnectedBusinessStory />
      <ModuleThreeProcess />
    </main>
  )
}
