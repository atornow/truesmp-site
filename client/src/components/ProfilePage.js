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
  const [blocksMined, setBlocksMined] = useState([]);
  const [playtimes, setPlaytimes] = useState([]);
  const [entityMap, setEntityMap] = useState([]);
  const [blockMap, setBlockMap] = useState([]);
  const [entitiesKilled, setEntitiesKilled] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          entitiesKilledResponse,
          entityMapResponse,
          blockMapResponse,
          blocksMinedResponse,
          playtimesResponse,
        ] = await Promise.all([
          axios.get(`http://localhost:3001/api/stats/${username}/entitiesKilled`),
          axios.get('http://localhost:3001/api/stats/entity-map'),
          axios.get('http://localhost:3001/api/stats/block-map'),
          axios.get(`http://localhost:3001/api/stats/${username}/blocksMined`),
          axios.get(`http://localhost:3001/api/stats/${username}/playtimes`),
        ]);

        setEntitiesKilled(entitiesKilledResponse.data);
        setEntityMap(entityMapResponse.data);
        setBlockMap(blockMapResponse.data);
        setBlocksMined(blocksMinedResponse.data);
        setPlaytimes(playtimesResponse.data);

        localStorage.setItem('entityMap', JSON.stringify(entityMapResponse.data));
        localStorage.setItem('blockMap', JSON.stringify(blockMapResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const storedEntityMap = localStorage.getItem('entityMap');
    const storedBlockMap = localStorage.getItem('blockMap');

    if (storedEntityMap && storedBlockMap) {
      setEntityMap(JSON.parse(storedEntityMap));
      setBlockMap(JSON.parse(storedBlockMap));
    }

    fetchData();
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