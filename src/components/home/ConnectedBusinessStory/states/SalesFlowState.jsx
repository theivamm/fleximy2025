import img02 from "../../../../assets/modulo02/imagen02.png"

export default function SalesFlowState({ c }) {
  return (
    <div className="w-full h-full relative mod2-entrance" style={{ background: "transparent" }}>
      <img
        src={img02}
        alt="Tus clientes conectados"
        className="mod2-float"
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          width: "120%",
          maxWidth: "none",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  )
}
