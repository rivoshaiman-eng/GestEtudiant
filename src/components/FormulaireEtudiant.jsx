import { useState } from "react";
import api from "../services/api";

function FormulaireEtudiant() {
  const [numEt, setNumEt] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [moyenne, setMoyenne] = useState("");
  const [message, setMessage] = useState("");

  const ajouterEtudiant = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        nom,
        prenom,
        numet: numEt,
        moyenne: Number(moyenne),
      };

      const { data } = await api.post("/etudiants", payload);
      if (data?.data) {
        setMessage("✅ Insertion réussie");
        setNumEt("");
        setNom("");
        setPrenom("");
        setMoyenne("");
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || "Erreur lors de l'insertion");
    }
  };

  return (
    <>
      <form onSubmit={ajouterEtudiant}>
        <div className="row align-items-end">
          <div className="col-md-3">
            <label className="form-label">N° Étudiant</label>
            <input
              className="form-control form-control-lg"
              value={numEt}
              onChange={(e) => setNumEt(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Nom</label>
            <input
              className="form-control form-control-lg"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Prénom</label>
            <input
              className="form-control form-control-lg"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Moyenne</label>
            <input
              type="number"
              className="form-control form-control-lg"
              value={moyenne}
              onChange={(e) => setMoyenne(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-light btn-lg w-100 rounded-4" type="submit">
              <i className="bi bi-plus-lg me-2"></i>
              Ajouter
            </button>
          </div>
        </div>
      </form>

      {message && <div className="alert alert-success mt-4">{message}</div>}
    </>
  );
}

export default FormulaireEtudiant;