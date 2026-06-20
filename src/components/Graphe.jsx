import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "../services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

<<<<<<< HEAD
function Graphe() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/etudiants");
        setEtudiants(data || []);
      } catch (err) {
        setEtudiants([]);
      }
    })();
  }, []);

  const labels = etudiants.map(() => ""); // efface les noms
  const dataValues = etudiants.map((e) => Number(e.moyenne));

  const backgroundColor = dataValues.map((m) =>
    m >= 10 ? "#198754" : m >= 5 ? "#ffc107" : "#dc3545"
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Moyenne des étudiants",
        data: dataValues,
        backgroundColor,
      }
    ]
=======
function Graphe({ etudiants }) {
  const data = {
    labels: etudiants.map((e) => e.nom),
    datasets: [
      {
        label: "Moyenne des étudiants",
        data: etudiants.map((e) => Number(e.moyenne)),
        backgroundColor: etudiants.map((e) => {
          const moyenne = Number(e.moyenne);
          if (moyenne >= 10) return "#0d6efd";
          if (moyenne >= 5) return "#ffc107";
          return "#dc3545";
        }),
        borderRadius: 8,
      },
    ],
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
      title: {
        display: true,
        text: "Histogramme des moyennes",
        color: "white",
      },
    },
    scales: {
<<<<<<< HEAD
      x: {
        ticks: {
          color: "white",
          display: false // ne pas afficher les labels des noms
        },
        grid: { display: false }
      },
=======
      x: { ticks: { color: "white" } },
>>>>>>> 7a1de78 (Migration vers Laravel Mysql términée)
      y: {
        beginAtZero: true,
        max: 20,
        ticks: { color: "white" },
      },
    },
  };

  return (
    <div style={{ height: "420px" }}>
      {etudiants.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p className="text-white text-center">Aucune donnée à afficher</p>
      )}
    </div>
  );
}

export default Graphe;