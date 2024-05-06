import React from 'react';
import { Line } from 'react-chartjs-2';

function PlaytimeChart({ playtimes }) {
  const cachedPlaytimes = JSON.parse(localStorage.getItem('playtimes')) || playtimes;

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
    labels: generateDayLabels(cachedPlaytimes?.length || 0),
    datasets: [
      {
        label: 'Playtimes',
        data: (cachedPlaytimes || []).map((playtime) => playtime / 3600), // Convert seconds to hours
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
          callback: (value) => `${value} hr`, // Add "hr" label to y-axis ticks
        },
      },
    },
  };

  return (
    <div style={{ flex: 2, padding: '1rem', height: '100%', width: '90%' }}>
      <Line data={chartDataPlay} options={chartOptions} />
    </div>
  );
}

export default PlaytimeChart;