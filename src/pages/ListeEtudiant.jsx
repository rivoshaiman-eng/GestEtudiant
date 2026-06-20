<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)
import Navbar from "../components/Navbar";
import api from "../services/api";

function ListeEtudiant() {
  const [etudiants, setEtudiants] = useState([]);
  const [message, setMessage] = useState("");
  const [recherche, setRecherche] = useState("");

<<<<<<< HEAD
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
=======
  async function chargerEtudiants() {
    try {
      const response = await api.get("/etudiants");
      setEtudiants(response.data);
    } catch (error) {
      console.error("Erreur chargement étudiants :", error);
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
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)

  const observation = (moyenne) => {
    const note = Number(moyenne);
    if (note >= 10) return "Admis";
    if (note >= 5) return "Redoublant";
    return "Exclus";
  };

  const etudiantsFiltres = etudiants.filter((e) => {
<<<<<<< HEAD
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

=======
    const nom = e.nom ? e.nom.toLowerCase() : "";
    const numero = String(getNumero(e)).toLowerCase();
    const rechercheMin = recherche.toLowerCase();

    return nom.includes(rechercheMin) || numero.includes(rechercheMin);
  });

  const supprimer = async (id) => {
    try {
      await api.delete(`/etudiants/${id}`);
      setMessage("✅ Suppression réussie");
      chargerEtudiants();
    } catch (error) {
      console.error("Erreur suppression :", error);
      setMessage("❌ Erreur lors de la suppression");
    }
  };

  const modifier = async (etudiant) => {
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)
    const nouveauNom = prompt("Nouveau nom :", etudiant.nom);
    const nouvelleMoyenne = prompt("Nouvelle moyenne :", etudiant.moyenne);

    if (nouveauNom && nouvelleMoyenne) {
      try {
<<<<<<< HEAD
        const payload = { nom: nouveauNom, moyenne: Number(nouvelleMoyenne) };
        const { data } = await api.put(`/etudiants/${id}`, payload);
        const nouvelleListe = etudiants.map((e) => (e.id === id ? data.data : e));
        setEtudiants(nouvelleListe);
        setMessage("✅ Modification réussie");
      } catch (err) {
        setMessage("Erreur lors de la modification");
=======
        await api.put(`/etudiants/${etudiant.id}`, {
          numet: getNumero(etudiant),
          nom: nouveauNom,
          moyenne: Number(nouvelleMoyenne),
        });

        setMessage("✅ Modification réussie");
        chargerEtudiants();
      } catch (error) {
        console.error("Erreur modification :", error);
        setMessage("❌ Erreur lors de la modification");
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)
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
<<<<<<< HEAD
                  <td>{e.numet}</td>
=======
                  <td>{getNumero(e)}</td>
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)
                  <td>{e.nom}</td>
                  <td>{e.moyenne}</td>
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
<<<<<<< HEAD
                      onClick={() => modifier(e.id)}
=======
                      onClick={() => modifier(e)}
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)
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