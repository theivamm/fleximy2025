export default function GradientText({ children, className = "", warm = false }) {
  return (
    <span className={`${warm ? "text-gradient-warm" : "text-gradient"} ${className}`}>
      {children}
    </span>
  )
}
