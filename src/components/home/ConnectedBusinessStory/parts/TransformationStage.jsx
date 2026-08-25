export default function TransformationStage({ c, isMobile, children }) {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{
        aspectRatio: isMobile ? "4/3" : "16/10",
        borderRadius: "22px",
        border: `1px solid ${c.border}`,
        background: c.surface,
        boxShadow: "0 35px 90px rgba(0,0,0,0.2), 0 0 60px rgba(124,108,255,0.06)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 shrink-0"
        style={{
          height: "36px",
          borderBottom: `1px solid ${c.border}`,
          background: c.bgSoft,
        }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div
          className="flex-1 mx-4 h-5 rounded-md flex items-center px-3"
          style={{ background: c.surface, border: `1px solid ${c.border}` }}
        >
          <span style={{ fontSize: "9px", color: c.textMuted }}>tunegocio.app</span>
        </div>
      </div>

      <div className="relative flex-1 w-full" style={{ height: "calc(100% - 36px)" }}>
        {children}
      </div>
    </div>
  )
}
