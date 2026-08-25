import img04 from "../../../../assets/modulo02/imagen04.png"

export default function ControlState({ c }) {
  return (
    <div className="w-full h-full relative mod2-entrance" style={{ background: "transparent" }}>
      <img
        src={img04}
        alt="Tus números conectados"
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
