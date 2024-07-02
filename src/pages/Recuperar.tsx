import "./Recuperar.css";
import LateralEsquerda from "../components/LateralEsquerda";

function Recuperar() {
  return (
    <div className="container b-light-blue">
      <LateralEsquerda />
      <div className="login">
        <div className="inputs-login flex-col">
          <h1 className="poppins-light f-white">Recuperar acesso</h1>

          <p className="poppins-light f-white">E-mail</p>
          <input className="input-login" type="email" id="input-email" />
        </div>

        <div className="acesso flex-col">
          <a className="btn-1 b-dark-blue f-white poppins-light" href="/login">
            Enviar e-mail de recuperação
          </a>
          <a
            className="btn-1 b-panties-blue f-white poppins-light"
            href="/login"
          >
            Voltar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Recuperar;
