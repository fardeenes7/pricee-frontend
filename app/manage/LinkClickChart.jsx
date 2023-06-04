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

export default function LinkClickChart({ data }) {
  useEffect(() => {
    setChartData({
      labels: data.productViews.labels,
      datasets: [
        {
          label: "Product Views",
          data: data.productViews.data,
          backgroundColor: "#2563EB",
        },
      ],
    });
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
    });
  }, [data]);

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
