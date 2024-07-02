import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/apiAuth";
import { useAuth } from "../services/authContext";
import LateralEsquerda from "../components/LateralEsquerda";
import "./Login.css";

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { login: setLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const success = await apiLogin(email, password);

      if (success) {
        setLogin(); // Atualiza o estado de autenticação
        navigate("/home"); // Redireciona para a página inicial após o login bem-sucedido
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error: any) {
      setError("Falha ao autenticar: " + error.message);
      console.error("Erro ao autenticar:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container b-light-blue">
        <LateralEsquerda />
        <div className="login">
          <div className="inputs-login flex-col">
            <h1 className="poppins-light f-white">
              Bem-vindo ao nosso aplicativo!
            </h1>

            {error && <p className="error-card">{error}</p>}
            <p className="poppins-light f-white">E-mail</p>
            <input
              className="input-login"
              type="email"
              id="input-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="poppins-light f-white">Senha</p>
            <input
              className="input-login"
              type="password"
              id="input-senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="acesso flex-col">
            <button
              className="btn-1 b-dark-blue f-white poppins-light"
              type="submit"
            >
              Login
            </button>
            <a
              className="btn-1 b-panties-blue f-white poppins-light"
              href="/recuperar-acesso"
            >
              Recuperar
            </a>
            <a
              className="f-dark-blue poppins-light f-underscore"
              href="/registrar"
            >
              Registre
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
