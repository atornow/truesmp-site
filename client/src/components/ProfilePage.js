import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';

ChartJS.register(CategoryScale);

function ProfilePage() {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({ totalDirtMined: 0, totalDiamondsMined: 0 });
  const username = localStorage.getItem('username');
  const [selectedBlockType, setSelectedBlockType] = useState('totalDirtMined');
  const [topMiners, setTopMiners] = useState([]);


  useEffect(() => {
    const fetchTopMiners = async () => {
      try {
        const response = await axios.get(`http://73.63.150.254:3001/api/users/top-miners/${selectedBlockType}`);
        setTopMiners(response.data);
      } catch (error) {
        console.error('Error fetching top miners:', error);
      }
    };

    fetchTopMiners();
  }, [selectedBlockType]);

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <h2>{username}</h2>
        <div>
          <label htmlFor="blockType">Select Block Type:</label>
          <select
            id="blockType"
            value={selectedBlockType}
            onChange={(e) => setSelectedBlockType(e.target.value)}
          >
            <option value="totalDirtMined">Dirt</option>
            <option value="totalDiamondsMined">Diamond</option>
            {/* Add more block type options */}
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '1rem', height: '50vh' }}>
          <Bar key={selectedBlockType} data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
        <div style={{ flex: 1, padding: '1rem' }}>
          {/* Add other charts or stats here */}
        </div>
        <div style={{ flex: 1, padding: '1rem' }}>
          {/* Add other charts or stats here */}
        </div>
        <div style={{ flex: 1, padding: '1rem' }}>
          {/* Add other charts or stats here */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;