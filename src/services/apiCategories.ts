import axios, { AxiosResponse } from "axios";
import uri from "../constants"; // Certifique-se de ter importado corretamente o URI

interface Category {
  _id: string;
  name: string;
}

async function getCategories(): Promise<AxiosResponse<Category[], any>> {
  try {
    const response = await axios.get<Category[]>(`${uri}/quiz/categories`);
    if (response && response.data) {
      return response;
    } else {
      throw new Error("Resposta da API vazia ou inválida.");
    }
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error(
      "Erro ao buscar categorias. Consulte o console para mais detalhes."
    );
  }
}

export default getCategories;
