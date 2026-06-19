import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const deconnexion = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/ajout">
        <i className="bi bi-mortarboard me-2"></i>
        GestEtudiant
      </Link>

      <div className="ms-auto d-flex gap-3">
        <Link className="btn btn-outline-light rounded-4 px-4" to="/ajout">
          <i className="bi bi-plus-lg me-2"></i>
          Ajout
        </Link>

        <Link className="btn btn-outline-light rounded-4 px-4" to="/liste">
          <i className="bi bi-list-ul me-2"></i>
          Liste
        </Link>

        <Link className="btn btn-outline-light rounded-4 px-4" to="/bilan">
          <i className="bi bi-bar-chart me-2"></i>
          Bilan
        </Link>

        <button onClick={deconnexion} className="btn btn-outline-light rounded-4 px-4">
          <i className="bi bi-box-arrow-right me-2"></i>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;