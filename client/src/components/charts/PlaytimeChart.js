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
        borderColor: '#202020',
        backgroundColor: '#FFFFFF',
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
        },
      },
    },
  };

  return (
    <div style={{ flex: 2, padding: '1rem', height: '400px' }}>
      <Line data={chartDataPlay} options={chartOptions}  />
    </div>
  );
}

export default PlaytimeChart;