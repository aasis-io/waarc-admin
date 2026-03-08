import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "./../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getRandomDarkColor = () => {
  const letters = "01234567";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const CountryChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/analytics/country");

        const sortedEntries = Object.entries(response.data).sort(
          (a, b) => b[1] - a[1]
        );

        const reversedEntries = sortedEntries.reverse();
        const reversedData = Object.fromEntries(reversedEntries);

        setData(reversedData);
      } catch (error) {
        console.error("Error fetching country analytics:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(data).reverse(),
    datasets: [
      {
        label: "Active Users (last 30 days)",
        data: Object.values(data).reverse(),
        backgroundColor: Object.keys(data).map(() => getRandomDarkColor()),
      },
    ],
  };

  const options = {
    indexAxis: "x",
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Country-wise Active Users" },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CountryChart;
