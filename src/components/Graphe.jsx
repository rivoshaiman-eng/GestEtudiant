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
import { useEffect, useState } from "react";
import api from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
          color: "white",
          display: false // ne pas afficher les labels des noms
        },
        grid: { display: false }
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