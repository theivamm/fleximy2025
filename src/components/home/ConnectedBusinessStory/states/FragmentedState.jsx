import webPreparada from "../../../../assets/modulo02/01-una-web-preparada.png"

export default function FragmentedState({ c }) {
  return (
    <div className="w-full h-full relative mod2-entrance" style={{ background: "transparent" }}>
      <img
        src={webPreparada}
        alt="Una web preparada para tu negocio"
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
