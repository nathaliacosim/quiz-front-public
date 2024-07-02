import { useEffect, useState } from "react";
import Navigator from "../components/Navigator";
import getCategories from "../services/apiCategories";
import "./HomeApp.css";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

interface Category {
  _id: string;
  name: string;
}

const HomeApp = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Inicialize o estado como um array vazio de Category
  const auth = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response && response.data) {
          setCategories(response.data); // Atualize o estado com os dados recebidos da API
        } else {
          throw new Error("Resposta da API vazia ou inválida.");
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        // Trate o erro conforme necessário
      }
    };

    fetchCategories();
  }, []);
  console.log(auth)
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="fullscreen b-light-blue">
      <Navigator />

      <div className="justify">
        <h2 className="f-white">Seja bem-vindo!</h2>
        <div className="categories">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/quiz/${category.name}`}
              className="category-link"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeApp;
