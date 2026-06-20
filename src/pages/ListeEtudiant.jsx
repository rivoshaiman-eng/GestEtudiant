import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function ListeEtudiant() {
  const [etudiants, setEtudiants] = useState([]);
  const [message, setMessage] = useState("");
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/etudiants");
        setEtudiants(data || []);
      } catch (err) {
        // fallback: empty list
        setEtudiants([]);
      }
    })();
  }, []);

  const observation = (moyenne) => {
    if (moyenne >= 10) return "Admis";
    if (moyenne >= 5) return "Redoublant";
    return "Exclus";
  };

  const etudiantsFiltres = etudiants.filter((e) => {
    const nom = (e.nom || "").toLowerCase();
    const num = (e.numet || "").toLowerCase();
    return nom.includes(recherche.toLowerCase()) || num.includes(recherche.toLowerCase());
  });

  const supprimer = async (id) => {
    try {
      await api.delete(`/etudiants/${id}`);
      const nouvelleListe = etudiants.filter((e) => e.id !== id);
      setEtudiants(nouvelleListe);
      setMessage("✅ Suppression réussie");
    } catch (err) {
      setMessage("Erreur lors de la suppression");
    }
  };

  const modifier = async (id) => {
    const etudiant = etudiants.find((e) => e.id === id);
    if (!etudiant) return;

    const nouveauNom = prompt("Nouveau nom :", etudiant.nom);
    const nouvelleMoyenne = prompt("Nouvelle moyenne :", etudiant.moyenne);

    if (nouveauNom && nouvelleMoyenne) {
      try {
        const payload = { nom: nouveauNom, moyenne: Number(nouvelleMoyenne) };
        const { data } = await api.put(`/etudiants/${id}`, payload);
        const nouvelleListe = etudiants.map((e) => (e.id === id ? data.data : e));
        setEtudiants(nouvelleListe);
        setMessage("✅ Modification réussie");
      } catch (err) {
        setMessage("Erreur lors de la modification");
      }
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
                <tr key={e.id}>
                  <td>{e.numet}</td>
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
                      onClick={() => modifier(e.id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => supprimer(e.id)}
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