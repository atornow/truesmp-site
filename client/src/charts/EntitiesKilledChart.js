import React from 'react';
import { Bar } from 'react-chartjs-2';

function EntitiesKilledChart({ entitiesKilled, entityMap }) {
  const cachedEntitiesKilled = JSON.parse(localStorage.getItem('entitiesKilled')) || entitiesKilled;
  const cachedEntityMap = JSON.parse(localStorage.getItem('entityMap')) || entityMap;

  // Create an object to store the entity counts
  const entityCounts = {};

  // Iterate over the entitiesKilled array and count the entities
  if (cachedEntitiesKilled) {
    cachedEntitiesKilled.forEach((count, index) => {
      if (count > 0 && cachedEntityMap && cachedEntityMap[index - 1]) {
        const entityName = cachedEntityMap[index - 1]; // Adjust the index by subtracting 1
        entityCounts[entityName] = (entityCounts[entityName] || 0) + count;
      }
    });
  }

  // Convert the entityCounts object to an array of { entity, count } objects
  const entityCountsArray = Object.entries(entityCounts).map(([entity, count]) => ({
    entity,
    count,
  }));

  // Sort the entityCountsArray in descending order based on the count
  const sortedEntityCounts = entityCountsArray.sort((a, b) => b.count - a.count);

  // Take the top 10 entities
  const topTenEntities = sortedEntityCounts.slice(0, 10);

  // Extract the labels and counts from the topTenEntities
  const labels = topTenEntities.map((item) => item.entity);
  const counts = topTenEntities.map((item) => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Top 10 Entities Killed',
        data: counts,
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
        },
      },
    },
  };

  return (
    <div style={{ flex: 2, padding: '1rem', height: '80%', width: '90%' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default EntitiesKilledChart;