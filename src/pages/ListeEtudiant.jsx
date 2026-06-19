import { useState } from "react";
import Navbar from "../components/Navbar";
import { getEtudiants, saveEtudiants } from "../utils/storage";

function ListeEtudiant() {
  const [etudiants, setEtudiants] = useState(() => getEtudiants());
  const [message, setMessage] = useState("");
  const [recherche, setRecherche] = useState("");

  const observation = (moyenne) => {
    if (moyenne >= 10) return "Admis";
    if (moyenne >= 5) return "Redoublant";
    return "Exclus";
  };

  const etudiantsFiltres = etudiants.filter(
    (e) =>
      e.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      e.numEt.toLowerCase().includes(recherche.toLowerCase())
  );

  const supprimer = (numEt) => {
    const nouvelleListe = etudiants.filter((e) => e.numEt !== numEt);
    setEtudiants(nouvelleListe);
    saveEtudiants(nouvelleListe);
    setMessage("✅ Suppression réussie");
  };

  const modifier = (numEt) => {
    const etudiant = etudiants.find((e) => e.numEt === numEt);

    const nouveauNom = prompt("Nouveau nom :", etudiant.nom);
    const nouvelleMoyenne = prompt("Nouvelle moyenne :", etudiant.moyenne);

    if (nouveauNom && nouvelleMoyenne) {
      const nouvelleListe = etudiants.map((e) =>
        e.numEt === numEt
          ? { ...e, nom: nouveauNom, moyenne: Number(nouvelleMoyenne) }
          : e
      );

      setEtudiants(nouvelleListe);
      saveEtudiants(nouvelleListe);
      setMessage("✅ Modification réussie");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card bg-dark text-white p-4 rounded-4 shadow">
          <h2 className="mb-4">
            <i className="bi bi-table me-2"></i>
            Liste des étudiants
          </h2>

          <div className="mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="🔍 Rechercher par numéro ou nom..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>

          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>N° Étudiant</th>
                <th>Nom</th>
                <th>Moyenne</th>
                <th>Observation</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {etudiantsFiltres.map((e) => (
                <tr key={e.numEt}>
                  <td>{e.numEt}</td>
                  <td>{e.nom}</td>
                  <td>{e.moyenne}</td>
                  <td>
                    <span
                      className={
                        e.moyenne >= 10
                          ? "badge bg-success"
                          : e.moyenne >= 5
                          ? "badge bg-warning text-dark"
                          : "badge bg-danger"
                      }
                    >
                      {observation(e.moyenne)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-warning me-2"
                      onClick={() => modifier(e.numEt)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => supprimer(e.numEt)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {etudiantsFiltres.length === 0 && (
            <div className="alert alert-warning">
              Aucun étudiant trouvé.
            </div>
          )}

          {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
      </div>
    </>
  );
}

export default ListeEtudiant;