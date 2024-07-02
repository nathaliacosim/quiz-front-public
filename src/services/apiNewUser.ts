import axios, { AxiosResponse } from "axios";
import apiBaseUrl from "../constants"; // Importe URI base da API corretamente

interface CreateUserResponse {
  success: boolean;
  message?: string;
}

// Função simples para validar o formato de e-mail
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Função simples para validar a força da senha
const validatePasswordStrength = (password: string): boolean => {
  return password.length >= 8;
};

const createUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    // Validar formato do e-mail
    if (!validateEmail(email)) {
      console.error("Formato de e-mail inválido.");
      return false;
    }

    // Validar força da senha
    if (!validatePasswordStrength(password)) {
      console.error(
        "Senha fraca. A senha deve conter pelo menos 8 caracteres."
      );
      return false;
    }

    // Enviar requisição para a API de registro de usuário
    const response: AxiosResponse<CreateUserResponse> = await axios.post(
      `${apiBaseUrl}/auth/register`,
      { email, password }
    );

    if (response.status == 201) {
      console.log("Usuário criado com sucesso:", response.data); // Log para debug
      return true;
    } else {
      console.error("Erro ao criar usuário:", response.data.message);
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Erro de requisição HTTP (ex: erro de rede, 404, 500, etc.)
      console.error("Erro de requisição ao criar usuário:", error.message);
    } else {
      // Outros erros não esperados
      console.error("Erro ao criar usuário:", error);
    }
    return false;
  }
};

export { createUser };
