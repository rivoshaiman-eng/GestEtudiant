import { useState } from "react";
import { getEtudiants, saveEtudiants } from "../utils/storage";

function FormulaireEtudiant() {
  const [numEt, setNumEt] = useState("");
  const [nom, setNom] = useState("");
  const [moyenne, setMoyenne] = useState("");
  const [message, setMessage] = useState("");

  const ajouterEtudiant = (e) => {
    e.preventDefault();

    const etudiants = getEtudiants();
    const nouvelEtudiant = {
      numEt,
      nom,
      moyenne: Number(moyenne),
    };

    saveEtudiants([...etudiants, nouvelEtudiant]);

    setMessage("✅ Insertion réussie");
    setNumEt("");
    setNom("");
    setMoyenne("");
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