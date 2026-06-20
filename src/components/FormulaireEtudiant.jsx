import { useState } from "react";
import api from "../services/api";

function FormulaireEtudiant() {
  const [numEt, setNumEt] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [moyenne, setMoyenne] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const ajouterEtudiant = async (e) => {
    e.preventDefault();
    setMessage("");

<<<<<<< HEAD
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
=======
    setMessage("");
    setErreur("");

    try {
      await api.post("/etudiants", {
        numet: numEt,
        nom: nom,
        prenom: "-",
        moyenne: Number(moyenne),
      });

      setMessage("✅ Étudiant ajouté dans MySQL");
      setNumEt("");
      setNom("");
      setMoyenne("");
    } catch (error) {
      console.error("Erreur ajout étudiant :", error);

      if (error.response?.status === 422) {
        setErreur("❌ Vérifie les champs : numéro déjà utilisé ou information manquante.");
      } else {
        setErreur("❌ Erreur lors de l'ajout de l'étudiant");
      }
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)
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
              min="0"
              max="20"
              step="0.01"
              className="form-control form-control-lg"
              value={moyenne}
              onChange={(e) => setMoyenne(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-outline-light btn-lg w-100 rounded-4"
              type="submit"
            >
              <i className="bi bi-plus-lg me-2"></i>
              Ajouter
            </button>
          </div>
        </div>
      </form>

      {message && <div className="alert alert-success mt-4">{message}</div>}
      {erreur && <div className="alert alert-danger mt-4">{erreur}</div>}
    </>
  );
}

export default FormulaireEtudiant;