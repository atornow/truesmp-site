import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import EntitiesKilledChart from './charts/EntitiesKilledChart';
import PlaytimeChart from './charts/PlaytimeChart';
import BlocksMinedChart from './charts/BlocksMinedChart';
import TopDiamondMinersChart from './charts/TopDiamondMinersChart';
import AccountLogo from '../assets/AccountLogo.png';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

ChartJS.register(CategoryScale);

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  position: relative;
`;

function ProfilePage() {
  const { username, teamName } = useContext(AuthContext);
  const [blocksMined, setBlocksMined] = useState([]);
  const [playtimes, setPlaytimes] = useState([]);
  const [entityMap, setEntityMap] = useState([]);
  const [blockMap, setBlockMap] = useState([]);
  const [entitiesKilled, setEntitiesKilled] = useState([]);
  const [topDiamondMiners, setTopDiamondMiners] = useState([]);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          entitiesKilledResponse,
          entityMapResponse,
          blockMapResponse,
          blocksMinedResponse,
          playtimesResponse,
          topDiamondMinersResponse,
          challengesResponse,
        ] = await Promise.all([
          axios.get(`http://localhost:3001/api/stats/${username}/entitiesKilled`),
          axios.get('http://localhost:3001/api/stats/entity-map'),
          axios.get('http://localhost:3001/api/stats/block-map'),
          axios.get(`http://localhost:3001/api/stats/${username}/blocksMined`),
          axios.get(`http://localhost:3001/api/stats/${username}/playtimes`),
          axios.get('http://localhost:3001/api/stats/top-diamond-miners'),
          axios.get(`http://localhost:3001/api/challenges?targetUsername=${username}`),
        ]);

        setEntitiesKilled(entitiesKilledResponse.data);
        setEntityMap(entityMapResponse.data);
        setBlockMap(blockMapResponse.data);
        setBlocksMined(blocksMinedResponse.data);
        setPlaytimes(playtimesResponse.data);
        setTopDiamondMiners(topDiamondMinersResponse.data);
        setChallenges(challengesResponse);

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
          <LogoImage src={AccountLogo} alt="Account Logo" className="border doodle-border-1" />
          <h2>Welcome, {username}!</h2>
          <p>Team: {teamName}</p>
            <div>
              <h2>Challenges</h2>
              {challenges.map((challenge) => (
                <ChallengeProgress key={challenge.id} challenge={challenge} />
              ))}
            </div>
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
        {topDiamondMiners.length > 0 && (
          <div className="border doodle-border">
            <TopDiamondMinersChart topDiamondMiners={topDiamondMiners} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;