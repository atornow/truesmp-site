import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import EntitiesKilledChart from './charts/EntitiesKilledChart';
import PlaytimeChart from './charts/PlaytimeChart';
import BlocksMinedChart from './charts/BlocksMinedChart';
import AccountLogo from '../assets/AccountLogo.png';
import styled from 'styled-components';

ChartJS.register(CategoryScale);

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;

function ProfilePage() {
  const username = localStorage.getItem('username');
  const [blocksPlaced, setBlocksPlaced] = useState([]);
  const [blocksMined, setBlocksMined] = useState([]);
  const [playtimes, setPlaytimes] = useState([]);
  const [entityMap, setEntityMap] = useState([]);
  const [blockMap, setBlockMap] = useState([]);
  const [entitiesKilled, setEntitiesKilled] = useState([]);

  useEffect(() => {
    const fetchEntitiesKilled = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${username}/entities-killed`);
        setEntitiesKilled(response.data);
      } catch (error) {
        console.error('Error fetching entities killed:', error);
      }
    };

    fetchEntitiesKilled();
  }, [username]);

  useEffect(() => {
    const fetchEntityMap = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/entity-map');
        setEntityMap(response.data);
        localStorage.setItem('entityMap', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching entity map:', error);
      }
    };

    const storedEntityMap = localStorage.getItem('entityMap');
    if (storedEntityMap) {
      setEntityMap(JSON.parse(storedEntityMap));
    } else {
      fetchEntityMap();
    }
  }, []);

  useEffect(() => {
    const fetchBlockMap = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/block-map');
        setBlockMap(response.data);
        localStorage.setItem('blockMap', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching block map:', error);
      }
    };

    const storedBlockMap = localStorage.getItem('blockMap');
    if (storedBlockMap) {
      setBlockMap(JSON.parse(storedBlockMap));
    } else {
      fetchBlockMap();
    }
  }, []);

  useEffect(() => {
    const fetchBlocksPlaced = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${username}/blocks-placed`);
        setBlocksPlaced(response.data);
      } catch (error) {
        console.error('Error fetching user blocks placed:', error);
      }
    };

    const fetchBlocksMined = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${username}/blocks-mined/`);
        setBlocksMined(response.data);
      } catch (error) {
        console.error('Error fetching user blocks mined:', error);
      }
    };

    fetchBlocksPlaced();
    fetchBlocksMined();
  }, [username]);

  useEffect(() => {
    const fetchPlaytimes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${username}/playtimes`);
        setPlaytimes(response.data);
      } catch (error) {
        console.error('Error fetching playtimes:', error);
      }
    };

    fetchPlaytimes();
  }, [username]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LogoImage src={AccountLogo} alt="Account Logo" className="border doodle-border-icon" />
          <h2>Welcome, {username}!</h2>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div className="border doodle-border">
          <BlocksMinedChart blocksMined={blocksMined} blockMap={blockMap} />
        </div>
        <div className="border doodle-border">
          <PlaytimeChart playtimes={playtimes} />
        </div>
        <div className="border doodle-border">
          <EntitiesKilledChart entitiesKilled={entitiesKilled} entityMap={entityMap} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;