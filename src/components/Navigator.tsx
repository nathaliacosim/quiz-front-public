import "./Navigator.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importe useNavigate do react-router-dom
import { useAuth } from "../services/authContext"; // Importe useAuth do seu contexto de autenticação

function Navigator() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const { logout } = useAuth(); // Função de logout do contexto de autenticação
  const navigate = useNavigate(); // Hook do React Router para navegação

  const toggleMenu = () => {
    if (menuRef.current) {
      if (!menuOpen) {
        menuRef.current.style.display = "flex";
        setMenuOpen(true);
      } else {
        menuRef.current.style.display = "none";
        setMenuOpen(false);
      }
    }
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto de autenticação
    localStorage.clear(); // Limpa o localStorage
    navigate("/login"); // Redireciona para a página de login utilizando useNavigate
    setMenuOpen(false); // Fecha o menu após o logout
  };

  return (
    <nav className="navbar">
      <ul ref={menuRef} className={`menu ${menuOpen ? "active" : "unactive"}`}>
        <li>
          <Link to="/home" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/perfil" onClick={toggleMenu}>
            Perfil
          </Link>
        </li>
        <li>
          <Link to="/historico-quiz" onClick={toggleMenu}>
            Histórico do Quiz
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={handleLogout}>
            Sair
          </Link>
        </li>
      </ul>
      <div className="menuContainer">
        <FontAwesomeIcon
          icon={faBars}
          className="icon"
          color="white"
          onClick={toggleMenu}
        />
      </div>
    </nav>
  );
}

export default Navigator;
