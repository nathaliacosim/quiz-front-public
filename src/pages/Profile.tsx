import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
  Usuario,
} from "../services/apiProfile";
import Navigator from "../components/Navigator";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<Usuario>({
    _id: "",
    name: "",
    nick: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchUserProfile(); // Busca os dados do perfil ao montar o componente
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUserData(response.data);
    } catch (error: any) {
      console.error("Erro ao buscar perfil do usuário:", error.message);
      // Trate o erro conforme necessário
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserProfile(userData);
      alert("Perfil atualizado com sucesso!");
      // Atualize a interface de usuário ou faça qualquer ação necessária após a atualização
    } catch (error: any) {
      console.error("Erro ao atualizar perfil do usuário:", error.message);
      alert("Erro ao atualizar perfil do usuário. Por favor, tente novamente.");
      // Trate o erro conforme necessário
    }
  };

  return (
    <>
      <Navigator />
      <div className="fullscreen b-light-blue">
        <div className="quiz-container">
          <h2 className="poppins-light f-white">Perfil do Usuário</h2>
          <form onSubmit={handleFormSubmit}>
            <label className="poppins-light f-white">
              Nome:
              <input
                className="input-login"
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            </label>
            <label className="poppins-light f-white">
              Apelido:
              <input
                className="input-login"
                type="text"
                name="nick"
                value={userData.nick}
                onChange={handleInputChange}
              />
            </label>
            <label className="poppins-light f-white">
              Email:
              <input
                className="input-login"
                type="text"
                name="email"
                value={userData.email}
                disabled // Não permitir edição do e-mail
              />
            </label>
            <label className="poppins-light f-white">
              Telefone:
              <input
                className="input-login"
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Atualizar Perfil</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
