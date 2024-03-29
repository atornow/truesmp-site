import React from 'react';
import { Bar } from 'react-chartjs-2';

function BlocksMinedChart({ selectedBlockType, topMiners }) {
  const chartData = {
    labels: topMiners.map((miner) => miner.username),
    datasets: [
      {
        label: `Top 10 Miners - ${selectedBlockType}`,
        data: topMiners.map((miner) => miner[selectedBlockType]),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div style={{ flex: 2, padding: '1rem', height: '400px' }}>
      <Bar key={selectedBlockType} data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
}

export default BlocksMinedChart;