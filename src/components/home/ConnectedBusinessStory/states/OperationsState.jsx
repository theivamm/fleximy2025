import img03 from "../../../../assets/modulo02/imagen03.png"

export default function OperationsState({ c }) {
  return (
    <div className="w-full h-full relative mod2-entrance" style={{ background: "transparent" }}>
      <img
        src={img03}
        alt="Tu operación conectada"
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
