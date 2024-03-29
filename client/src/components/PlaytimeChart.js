import React from 'react';
import { Line } from 'react-chartjs-2';

function PlaytimeChart({ playtimes }) {
  const generateDayLabels = (length) => {
    const currentDate = new Date();
    const labels = [];

    if (!length) {
      return labels;
    }

    for (let i = 0; i < length; i++) {
      const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
      labels.unshift(date.toLocaleDateString());
    }

    return labels;
  };

  const chartDataPlay = {
    labels: generateDayLabels(playtimes?.length || 0),
    datasets: [
      {
        label: 'Playtimes',
        data: (playtimes || []).slice().reverse(),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return (
    <div style={{ flex: 2, padding: '1rem', height: '400px' }}>
      <Line data={chartDataPlay} options={{ maintainAspectRatio: false }} />
    </div>
  );
}

export default PlaytimeChart;