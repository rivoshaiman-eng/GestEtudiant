const KEY = "etudiants";

const initialEtudiants = [
  { numEt: "ET001", nom: "Martin", moyenne: 14.5 },
  { numEt: "ET002", nom: "Benali", moyenne: 8 },
  { numEt: "ET003", nom: "Dupont", moyenne: 11 },
  { numEt: "ET004", nom: "Koné", moyenne: 6.5 },
];

export function getEtudiants() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : initialEtudiants;
}

export function saveEtudiants(etudiants) {
  localStorage.setItem(KEY, JSON.stringify(etudiants));
}