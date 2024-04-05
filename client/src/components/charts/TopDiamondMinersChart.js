import React from 'react';
import { Bar } from 'react-chartjs-2';

function TopDiamondMinersChart({ topDiamondMiners }) {
  const labels = topDiamondMiners.map((miner) => miner.username);
  const data = topDiamondMiners.map((miner) => miner.diamondsMined);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Diamonds Mined',
        data: data,
        backgroundColor: '#202020',
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        titleFont: {
          family: 'Xkcd',
        },
        bodyFont: {
          family: 'Xkcd',
        },
      },
      legend: {
        labels: {
          font: {
            family: 'Xkcd',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Xkcd',
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: 'Xkcd',
          },
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ flex: 2, padding: '1rem', height: '400px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default TopDiamondMinersChart;