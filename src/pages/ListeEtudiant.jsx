import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function ListeEtudiant() {
  const [etudiants, setEtudiants] = useState([]);
  const [message, setMessage] = useState("");
  const [recherche, setRecherche] = useState("");

  async function chargerEtudiants() {
    try {
      const response = await api.get("/etudiants");
      setEtudiants(response.data || []);
    } catch (error) {
      console.error("Erreur chargement étudiants :", error);
      setEtudiants([]);
      setMessage("❌ Erreur lors du chargement des étudiants");
    }
  }

  useEffect(() => {
    const charger = async () => {
      await chargerEtudiants();
    };

    charger();
  }, []);

  const getNumero = (etudiant) => {
    return etudiant.numEt || etudiant.numet || etudiant.numero || "";
  };

  const observation = (moyenne) => {
    const note = Number(moyenne);
    if (note >= 10) return "Admis";
    if (note >= 5) return "Redoublant";
    return "Exclus";
  };

  const etudiantsFiltres = etudiants.filter((e) => {
    const nom = e.nom ? e.nom.toLowerCase() : "";
    const numero = String(getNumero(e)).toLowerCase();
    const rechercheMin = recherche.toLowerCase();

    return nom.includes(rechercheMin) || numero.includes(rechercheMin);
  });

  const supprimer = async (id) => {
    try {
      await api.delete(`/etudiants/${id}`);
      setMessage("✅ Suppression réussie");
      await chargerEtudiants();
    } catch (error) {
      console.error("Erreur suppression :", error);
      setMessage("❌ Erreur lors de la suppression");
    }
  };

  const modifier = async (etudiant) => {
    const nouveauNom = prompt("Nouveau nom :", etudiant.nom);
    const nouvelleMoyenne = prompt("Nouvelle moyenne :", etudiant.moyenne);

    if (nouveauNom && nouvelleMoyenne) {
      try {
        await api.put(`/etudiants/${etudiant.id}`, {
          numet: getNumero(etudiant),
          nom: nouveauNom,
          prenom: etudiant.prenom || "-",
          moyenne: Number(nouvelleMoyenne),
        });

        setMessage("✅ Modification réussie");
        await chargerEtudiants();
      } catch (error) {
        console.error("Erreur modification :", error);
        setMessage("❌ Erreur lors de la modification");
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
                  <td>{getNumero(e)}</td>
                  <td>{e.nom}</td>
                  <td>{Number(e.moyenne).toFixed(2)}</td>
                  <td>
                    <span
                      className={
                        Number(e.moyenne) >= 10
                          ? "badge bg-success"
                          : Number(e.moyenne) >= 5
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
                      onClick={() => modifier(e)}
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
            <div className="alert alert-warning">Aucun étudiant trouvé.</div>
          )}

          {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
      </div>
    </>
  );
}

export default ListeEtudiant;