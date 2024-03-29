import React from 'react';
import { Bar } from 'react-chartjs-2';

function KilledStatsChart({ userKilledStats, statMap }) {
  // Create an object to store the entity counts
  const entityCounts = {};

  // Iterate over the userKilledStats array and count the entities
  userKilledStats.forEach((count, index) => {
    if (count > 0) {
      const entityName = statMap[index - 1]; // Adjust the index by subtracting 1
      entityCounts[entityName] = (entityCounts[entityName] || 0) + count;
    }
  });

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
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div style={{ flex: 2, padding: '1rem', height: '400px' }}>
      <h3>Top 10 Entities Killed</h3>
      <Bar data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
}

export default KilledStatsChart;