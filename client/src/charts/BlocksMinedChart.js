import React from 'react';
import { Bar } from 'react-chartjs-2';

function BlocksMinedChart({ blocksMined, blockMap }) {
  const cachedBlocksMined = JSON.parse(localStorage.getItem('blocksMined')) || blocksMined;
  const cachedBlockMap = JSON.parse(localStorage.getItem('blockMap')) || blockMap;

  // Create an object to store the block counts
  const blockCounts = {};

  // Iterate over the blocksMined array and count the blocks
  if (cachedBlocksMined) {
    cachedBlocksMined.forEach((count, index) => {
      if (count > 0 && cachedBlockMap && cachedBlockMap[index - 1]) {
        const blockName = cachedBlockMap[index - 1]; // Adjust the index by subtracting 1
        blockCounts[blockName] = (blockCounts[blockName] || 0) + count;
      }
    });
  }

  // Convert the blockCounts object to an array of { block, count } objects
  const blockCountsArray = Object.entries(blockCounts).map(([block, count]) => ({
    block,
    count,
  }));

  // Sort the blockCountsArray in descending order based on the count
  const sortedblockCounts = blockCountsArray.sort((a, b) => b.count - a.count);

  // Take the top 10 blocks
  const topTenblocks = sortedblockCounts.slice(0, 10);

  // Extract the labels and counts from the topTenblocks
  const labels = topTenblocks.map((item) => item.block);
  const counts = topTenblocks.map((item) => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Top 10 blocks mined:',
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
    <div style={{ flex: 2, padding: '1rem', height: '400px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default BlocksMinedChart;