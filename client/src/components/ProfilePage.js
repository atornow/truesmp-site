import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import KilledStatsChart from './KilledStatsChart';
import PlaytimeChart from './PlaytimeChart';
import BlocksMinedChart from './BlocksMinedChart';
import AccountLogo from '../AccountLogo.png';
import styled from 'styled-components';

ChartJS.register(CategoryScale);

const LogoImage = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  `;

function ProfilePage() {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({ totalDirtMined: 0, totalDiamondsMined: 0 });
  const username = localStorage.getItem('username');
  const [selectedBlockType, setSelectedBlockType] = useState('totalDirtMined');
  const [playtimes, setPlaytimes] = useState([]);
  const [topMiners, setTopMiners] = useState([]);
  const [statMap, setStatMap] = useState([]);
  const [userKilledStats, setUserKilledStats] = useState([]);


  useEffect(() => {
      const fetchUserKilledStats = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/users/user-killed-stats/${username}`);
          setUserKilledStats(response.data);
          console.log('userKilledStats:', response.data);
        } catch (error) {
          console.error('Error fetching user killed stats:', error);
        }
      };

      fetchUserKilledStats();
    }, [username]);

  useEffect(() => {
    const fetchStatMap = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/stat-map');
        setStatMap(response.data);
        localStorage.setItem('statMap', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching stat map:', error);
      }
    };

    const storedStatMap = localStorage.getItem('statMap');
    if (storedStatMap) {
      setStatMap(JSON.parse(storedStatMap));
      console.log('statMapp:', storedStatMap);
    } else {
      fetchStatMap();
      console.log('statMap:', storedStatMap);
    }
  }, []);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/stats/${username}`);
        setUserStats(response.data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, [username]);

  useEffect(() => {
    const fetchPlaytimes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${username}/playtimes`);
        setPlaytimes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching playtimes:', error);
      }
    };

    fetchPlaytimes();
  }, [username]);

  useEffect(() => {
    const fetchTopMiners = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/top-miners/${selectedBlockType}`);
        setTopMiners(response.data);
      } catch (error) {
        console.error('Error fetching top miners:', error);
      }
    };

    fetchTopMiners();
  }, [selectedBlockType]);

  const generateDayLabels = (length) => {
    const currentDate = new Date();
    const labels = [];

    if (!length) {
      // If length is null or 0, return an empty array
      return labels;
    }

    for (let i = 0; i < length; i++) {
      const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
      labels.unshift(date.toLocaleDateString());
    }

    return labels;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <LogoImage src={AccountLogo} alt="Account Logo" className="border doodle-border-icon"/>
          <h2>Welcome, {username}!</h2>
        </div>
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
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <BlocksMinedChart selectedBlockType={selectedBlockType} topMiners={topMiners} />
        <PlaytimeChart playtimes={playtimes} />
        <KilledStatsChart userKilledStats={userKilledStats} statMap={statMap} />
      </div>
    </div>
  );
}

export default ProfilePage;