import axios, { AxiosResponse } from "axios";
import apiUrl from "../constants";

interface LoginResponse {
  access_token: string;
}

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${apiUrl}/auth/login`,
      { email, password }
    );

    if (response.status === 201) {
      localStorage.setItem("accessToken", response.data.access_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return false;
  }
};

const logout = (): void => {
  localStorage.removeItem("accessToken");
};

const isAuthenticated = (): boolean => {
  return localStorage.getItem("accessToken") !== null;
};

export { login, logout, isAuthenticated };
