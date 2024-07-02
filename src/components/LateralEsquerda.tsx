import Chapeu from "../assets/chapeu-de-palha.png";

function LateralEsquerda() {
  return (
    <>
      <div className="b-dark-blue col-1 flex-col">
        <img className="imagem-logo" src={Chapeu} alt="Chapeu de Palha"></img>
        <h2 className="league-spartan f-white">Quiz ProgWeb</h2>
      </div>
    </>
  );
}

export default LateralEsquerda;
