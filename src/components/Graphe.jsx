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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graphe({ etudiants = [] }) {
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
      x: {
        ticks: { color: "white" },
      },
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