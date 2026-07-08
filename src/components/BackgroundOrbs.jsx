import { useTheme } from "../context/ThemeContext"

export default function BackgroundOrbs() {
  const { dark } = useTheme()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: dark
            ? "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: dark
            ? "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: dark
            ? "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
    </div>
  )
}
