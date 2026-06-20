import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const connecter = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/login", { email, password });
      
      if (data?.token) {
        localStorage.setItem("student_app_token", data.token);
        navigate("/ajout");
      } else {
        setError("Erreur d'authentification");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-icon">
          <i className="bi bi-mortarboard"></i>
        </div>

        <h1 className="login-title">Gestion des étudiants</h1>

        <div className="login-box">
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={connecter}>
            <label>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading}
            />

            <label>Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              <i className="bi bi-box-arrow-in-right me-2"></i>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;