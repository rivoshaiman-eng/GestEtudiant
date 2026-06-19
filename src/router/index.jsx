import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import AjoutEtudiant from "../pages/ajoutEtudiant";
import ListeEtudiant from "../pages/ListeEtudiant";
import Bilan from "../pages/Bilan";

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ajout" element={<AjoutEtudiant />} />
        <Route path="/liste" element={<ListeEtudiant />} />
        <Route path="/bilan" element={<Bilan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;