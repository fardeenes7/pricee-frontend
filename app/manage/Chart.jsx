"use client";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ data }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    data.datasets.forEach((dataset) => {
      setChartData((prev) => {
        return {
          ...prev,
          labels: data.labels,
          datasets: [
            ...prev.datasets,
            {
              label: dataset.title,
              data: dataset.data,
              backgroundColor: dataset.backgroundColor,
            },
          ],
        };
      });
    });

    //set chart data using data.datasets, but keep previous values

    setChartOptions({
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [data]);

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
