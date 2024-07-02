import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/authContext"; // Importe o AuthProvider aqui
import Login from "./pages/Login";
import Recuperar from "./pages/Recuperar";
import Registrar from "./pages/Registrar";
import HomeApp from "./pages/HomeApp";
import QuizPage from "./pages/QuizPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-acesso" element={<Recuperar />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/home" element={<HomeApp />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/quiz/:category" element={<QuizPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
