import Navbar from "../components/Navbar";
import Graphe from "../components/Graphe";
import { getEtudiants } from "../utils/storage";

function Bilan() {
  const etudiants = getEtudiants();
  const moyennes = etudiants.map((e) => Number(e.moyenne));

  const total = etudiants.length;
  const admis = etudiants.filter((e) => e.moyenne >= 10).length;
  const redoublants = etudiants.filter(
    (e) => e.moyenne >= 5 && e.moyenne < 10
  ).length;
  const exclus = etudiants.filter((e) => e.moyenne < 5).length;

  const moyenneGenerale =
    total > 0
      ? (moyennes.reduce((somme, note) => somme + note, 0) / total).toFixed(2)
      : 0;

  const moyenneMin = total > 0 ? Math.min(...moyennes) : 0;
  const moyenneMax = total > 0 ? Math.max(...moyennes) : 0;

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
                <h1 className="text-white">{total}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-success text-white text-center p-3 rounded-4">
                <h5 className="text-white">Admis</h5>
                <h1 className="text-white">{admis}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning text-center p-3 rounded-4">
                <h5 className="text-white">Redoublants</h5>
                <h1 className="text-white">{redoublants}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-danger text-white text-center p-3 rounded-4">
                <h5 className="text-white">Exclus</h5>
                <h1 className="text-white">{exclus}</h1>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card bg-black text-center p-4 rounded-4">
                <h5 className="text-white">Moyenne générale</h5>
                <h1 className="text-white">{moyenneGenerale}</h1>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-black text-center p-4 rounded-4">
                <h5 className="text-white">Moyenne minimale</h5>
                <h1 className="text-white">{moyenneMin}</h1>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-black text-center p-4 rounded-4">
                <h5 className="text-white">Moyenne maximale</h5>
                <h1 className="text-white">{moyenneMax}</h1>
              </div>
            </div>
          </div>

          <div className="card bg-black p-4 rounded-4">
            <Graphe />
          </div>
        </div>
      </div>
    </>
  );
}

export default Bilan;