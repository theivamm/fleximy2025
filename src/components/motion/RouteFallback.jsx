export default function RouteFallback() {
  return (
    <div className="grid place-items-center min-h-[50vh]" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <span className="w-8 h-8 rounded-full border-2 border-line border-t-accent animate-spin" />
        <span className="text-micro text-muted">Cargando</span>
      </div>
    </div>
  )
}
