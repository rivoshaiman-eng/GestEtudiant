import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Graphe() {
  const data = {
    labels: ["Martin", "Benali", "Dupont", "Koné"],
    datasets: [
      {
        label: "Moyenne des étudiants",
        data: [14.5, 8, 11, 6.5],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545"
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      },
      title: {
        display: true,
        text: "Histogramme des moyennes",
        color: "white"
      }
    },
    scales: {
      x: {
        ticks: {
          color: "white"
        }
      },
      y: {
        ticks: {
          color: "white"
        },
        beginAtZero: true,
        max: 20
      }
    }
  };

  return <Bar data={data} options={options} />;
}

export default Graphe;