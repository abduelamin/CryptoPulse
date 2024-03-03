import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import PropagateLoader from "react-spinners/PropagateLoader";
import ChartJS from "chart.js/auto";
import "../styles/Chart.css";

const Chart = ({ coin }) => {
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(1);
  const chartRef = React.createRef();

  const fetchChartData = async () => {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setChartData(data.prices);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [coin.id, days]);

  useEffect(() => {
    if (chartData) {
      renderChart();
    }
  }, [chartData]);

  const renderChart = () => {
    const ctx = chartRef.current.getContext("2d");

    if (window.myChart) {
      window.myChart.destroy();
    }

    const data = {
      labels: chartData.map((entry) => {
        const date = new Date(entry[0]);
        return days === 1
          ? `${date.getHours()}:${date.getMinutes()}`
          : date.toLocaleDateString();
      }),
      datasets: [
        {
          label: `Price in USD`,
          data: chartData.map((entry) => entry[1]),
          borderColor: "#4caf50", // Green color
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Green background color with transparency
          borderWidth: 2,
          pointRadius: 1.2, // Larger point radius for better visibility
        },
      ],
    };

    const options = {
      scales: {
        x: [
          {
            type: "time",
            time: {
              unit: "day",
            },
          },
        ],
        y: [
          {
            type: "linear",
            position: "left",
          },
        ],
      },
      elements: {
        point: {
          radius: 0.5,
        },
      },
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
    };

    window.myChart = new ChartJS(ctx, {
      type: "line",
      data: data,
      options: options,
    });
  };

  const chartDays = [
    { label: "Daily", value: 1 },
    { label: "Weekly", value: 7 },
    { label: "Monthly", value: 30 },
    { label: "Yearly", value: 365 },
  ];

  return (
    <div>
      {!chartData ? (
        <PropagateLoader color="#dd2b0b" size={30} speedMultiplier={1} />
      ) : (
        <div>
          <canvas ref={chartRef} width={800} height={400}></canvas>
          <div className="buttonHolder">
            {chartDays.map((day, index) => (
              <button key={index} onClick={() => setDays(day.value)}>
                {day.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
