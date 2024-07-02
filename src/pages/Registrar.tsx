import "./Registrar.css";
import LateralEsquerda from "../components/LateralEsquerda";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { createUser } from "../services/apiNewUser";

const Registrar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createUser(email, password);

      setLoading(false);
      if (response) {
        setSuccessMessage("Usuário registrado com sucesso!");
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      } else {
        setError(
          "Erro ao criar usuário. Por favor, verifique os dados fornecidos."
        );
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setError("Erro ao criar usuário. Por favor, tente novamente mais tarde.");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container b-light-blue">
        <LateralEsquerda />
        <div className="login">
          <div className="inputs-login flex-col">
            <h1 className="poppins-light f-white">Criar Nova Conta!</h1>

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

            <button
              className="btn-1 b-dark-blue f-white poppins-light"
              type="submit"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Criar Conta"}
            </button>
            <a
              className="btn-1 b-panties-blue f-white poppins-light"
              href="/login"
            >
              Voltar
            </a>

            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Registrar;
