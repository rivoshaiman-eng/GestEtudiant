import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const connecter = (e) => {
    e.preventDefault();
    navigate("/ajout");
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-icon">
          <i className="bi bi-mortarboard"></i>
        </div>

        <h1 className="login-title">Gestion des étudiants</h1>

        <div className="login-box">
          <form onSubmit={connecter}>
            <label>Nom d'utilisateur</label>
            <input type="text" defaultValue="admin" required />

            <label>Mot de passe</label>
            <input type="password" defaultValue="admin" required />

            <button type="submit">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;