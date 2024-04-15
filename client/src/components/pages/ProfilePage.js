import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import EntitiesKilledChart from '../charts/EntitiesKilledChart';
import PlaytimeChart from '../charts/PlaytimeChart';
import BlocksMinedChart from '../charts/BlocksMinedChart';
import TopDiamondMinersChart from '../charts/TopDiamondMinersChart';
import AccountLogo from '../../assets/AccountLogo.png';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import ChallengeProgress from '../elements/ChallengeProgress';
import OnlinePlayerCount from '../elements/OnlinePlayerCount';

ChartJS.register(CategoryScale);

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  position: relative;
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 1rem;
`;

const WorldStatsContainer = styled.div`
  width: 70%;
  padding: 1rem;
`;

const ChallengesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ChallengeSubDiv = styled.div`
  width: 48%;
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
        setChallenges(challengesResponse.data); // Filter challenges with categoryId === 2

        localStorage.setItem('entityMap', JSON.stringify(entityMapResponse.data));
        localStorage.setItem('blockMap', JSON.stringify(blockMapResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  const currentDate = new Date();
  const nowChallenges = challenges.filter(
      (challenge) =>
        new Date(challenge.startDate) <= currentDate && new Date(challenge.endDate) >= currentDate
    );
  const nextChallenges = challenges.filter((challenge) => new Date(challenge.startDate) > currentDate);

return (
  <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
    <WorldStatsContainer>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="border doodle-border-2">
          <h2>Challenges</h2>
          <ChallengesContainer>
            <ChallengeSubDiv>
              <h3>Now</h3>
              {nowChallenges.map((challenge) => (
                <div key={challenge.id} className="border doodle-border">
                  <ChallengeProgress challenge={challenge} />
                </div>
              ))}
            </ChallengeSubDiv>
            <ChallengeSubDiv>
              <h3>Next</h3>
              {nextChallenges.map((challenge) => (
                <div key={challenge.id} className="border doodle-border">
                  <ChallengeProgress challenge={challenge} />
                </div>
              ))}
            </ChallengeSubDiv>
          </ChallengesContainer>
        </div>
        <OnlinePlayerCount />
        {topDiamondMiners.length > 0 && (
          <div className="border doodle-border">
            <TopDiamondMinersChart topDiamondMiners={topDiamondMiners} />
          </div>
        )}
      </div>
    </WorldStatsContainer>
    <PlayerInfoContainer className="border doodle-border-2">
      <LogoImage src={AccountLogo} alt="Account Logo" className="border doodle-border-1" />
      <h2>{username}</h2>
      <p>Team: {teamName}</p>
      <div className="border doodle-border">
        <BlocksMinedChart blocksMined={blocksMined} blockMap={blockMap} />
      </div>
      <div className="border doodle-border">
        <PlaytimeChart playtimes={playtimes} />
      </div>
      <div className="border doodle-border">
        <EntitiesKilledChart entitiesKilled={entitiesKilled} entityMap={entityMap} />
      </div>
    </PlayerInfoContainer>
  </div>
);
}

export default ProfilePage;