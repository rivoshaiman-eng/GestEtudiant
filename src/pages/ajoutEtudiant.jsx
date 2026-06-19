import Navbar from "../components/Navbar";
import FormulaireEtudiant from "../components/FormulaireEtudiant";

function AjoutEtudiant() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card bg-dark text-white p-4 rounded-4 shadow">

          <h2 className="mb-4">
            <i className="bi bi-person-plus me-2"></i>
            Ajouter un étudiant
          </h2>

          <FormulaireEtudiant />

        </div>
      </div>
    </>
  );
}

export default AjoutEtudiant;