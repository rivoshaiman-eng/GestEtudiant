import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Graphe from "../components/Graphe";
import api from "../services/api";

function Bilan() {
<<<<<<< HEAD
  const [stats, setStats] = useState({
    min: 0,
    max: 0,
    admis: 0,
    redoublants: 0,
    exclus: 0,
    total: 0,
    moyenneGenerale: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/bilan");
        const total = (data.admis || 0) + (data.redoublants || 0) + (data.exclus || 0);
        const moyenneGenerale = total > 0 && data.min != null && data.max != null ? (((Number(data.min) + Number(data.max)) / 2).toFixed(2)) : 0;
        setStats({ ...data, total, moyenneGenerale });
      } catch (err) {
        setStats((s) => ({ ...s }));
      }
    })();
  }, []);
=======
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
  const charger = async () => {
    try {
      const response = await api.get("/etudiants");
      setEtudiants(response.data);
    } catch (error) {
      console.error("Erreur chargement bilan :", error);
      setEtudiants([]);
    }
  };

  charger();
}, []);



  const moyennes = etudiants.map((e) => Number(e.moyenne));

  const total = etudiants.length;
  const admis = etudiants.filter((e) => Number(e.moyenne) >= 10).length;
  const redoublants = etudiants.filter(
    (e) => Number(e.moyenne) >= 5 && Number(e.moyenne) < 10
  ).length;
  const exclus = etudiants.filter((e) => Number(e.moyenne) < 5).length;

  const moyenneGenerale =
    total > 0
      ? (moyennes.reduce((somme, note) => somme + note, 0) / total).toFixed(2)
      : 0;

  const moyenneMin = total > 0 ? Math.min(...moyennes) : 0;
  const moyenneMax = total > 0 ? Math.max(...moyennes) : 0;
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card bg-dark text-white p-4 rounded-4 shadow">
          <h2 className="mb-4 text-white">
            <i className="bi bi-bar-chart me-2"></i>
            Bilan de la classe
          </h2>

          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white text-center p-3 rounded-4">
                <h5 className="text-white">Total des étudiants</h5>
                <h1 className="text-white">{stats.total}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-success text-white text-center p-3 rounded-4">
                <h5 className="text-white">Admis</h5>
                <h1 className="text-white">{stats.admis}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning text-center p-3 rounded-4">
                <h5 className="text-white">Redoublants</h5>
                <h1 className="text-white">{stats.redoublants}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-danger text-white text-center p-3 rounded-4">
                <h5 className="text-white">Exclus</h5>
                <h1 className="text-white">{stats.exclus}</h1>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card bg-black text-center p-4 rounded-4">
                <h5 className="text-white">Moyenne générale</h5>
                <h1 className="text-white">{stats.moyenneGenerale}</h1>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-black text-center p-4 rounded-4">
                <h5 className="text-white">Moyenne minimale</h5>
                <h1 className="text-white">{stats.min}</h1>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-black text-center p-4 rounded-4">
                <h5 className="text-white">Moyenne maximale</h5>
                <h1 className="text-white">20</h1>
              </div>
            </div>
          </div>

          <div className="card bg-black p-4 rounded-4">
            <Graphe etudiants={etudiants} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Bilan;