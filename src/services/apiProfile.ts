import axios, { AxiosResponse } from "axios";
import uri from "../constants";

export interface Usuario {
  _id: string;
  name: string;
  nick: string;
  email: string;
  phoneNumber: string;
}

const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const axiosInstance = axios.create({
  baseURL: uri,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

async function getUserProfile(): Promise<AxiosResponse<Usuario>> {
  try {
    const response = await axiosInstance.get<Usuario>(`/usuario/me`);
    if (response && response.data) {
      return response;
    } else {
      throw new Error("Resposta da API vazia ou inválida.");
    }
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw new Error(
      "Erro ao buscar perfil do usuário. Consulte o console para mais detalhes."
    );
  }
}

async function updateUserProfile(
  userData: Partial<Usuario>
): Promise<AxiosResponse<Usuario>> {
  try {
    console.log(userData);
    const response = await axiosInstance.put<Usuario>(`/usuario/me`, userData);
    if (response && response.data) {
      return response;
    } else {
      throw new Error("Resposta da API vazia ou inválida.");
    }
  } catch (error) {
    console.error("Erro ao atualizar perfil do usuário:", error);
    throw new Error(
      "Erro ao atualizar perfil do usuário. Consulte o console para mais detalhes."
    );
  }
}

export { getUserProfile, updateUserProfile };
