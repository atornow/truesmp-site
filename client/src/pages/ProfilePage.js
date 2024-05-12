import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import EntitiesKilledChart from '../charts/EntitiesKilledChart';
import PlaytimeChart from '../charts/PlaytimeChart';
import BlocksMinedChart from '../charts/BlocksMinedChart';
import TopDiamondMinersChart from '../charts/TopDiamondMinersChart';
import AccountLogo from '../assets/AccountLogo.png';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import ChallengeProgress from '../elements/ChallengeProgress';
import OnlinePlayerCount from '../elements/OnlinePlayerCount';
import ChallengeRoad from '../elements/ChallengeRoad';

ChartJS.register(CategoryScale);

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  position: relative;
`;

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 95%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: 30%;
    height: 100%;
  }
`;

const WorldStatsContainer = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    width: 70%;
  }
`;

const ChallengesContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;

const ChallengeSubDiv = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: 48%;
    margin-bottom: 0;
  }
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 20%;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    body {
      font-size: 14px;
      height: 80%;

    }
  }
`;

function ProfilePage() {
  const { username, teamName } = useContext(AuthContext);
  const [blocksMined, setBlocksMined] = useState([]);
  const [blocksPlaced, setBlocksPlaced] = useState([]);
  const [playtimes, setPlaytimes] = useState([]);
  const [entityMap, setEntityMap] = useState([]);
  const [blockMap, setBlockMap] = useState([]);
  const [entitiesKilled, setEntitiesKilled] = useState([]);
  const [topDiamondMiners, setTopDiamondMiners] = useState([]);
  const [challenges, setChallenges] = useState(JSON.parse(localStorage.getItem('challenges')) || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userData,
          entityMapResponse,
          blockMapResponse,
          topDiamondMinersResponse,
          challengesResponse,
        ] = await Promise.all([
          axios.get(`http://localhost:3001/api/stats/${username}`),
          axios.get('http://localhost:3001/api/stats/entity-map'),
          axios.get('http://localhost:3001/api/stats/block-map'),
          axios.get('http://localhost:3001/api/stats/top-diamond-miners'),
          axios.get(`http://localhost:3001/api/challenges?targetUsername=${username}`),
        ]);

        setEntitiesKilled(userData.data.entitiesKilled);
        setBlocksMined(userData.data.blocksMined);
        setPlaytimes(userData.data.playtimes);
        setBlocksPlaced(userData.data.blocksPlaced);
        setEntityMap(entityMapResponse.data);
        setBlockMap(blockMapResponse.data);
        setTopDiamondMiners(topDiamondMinersResponse.data);
        setChallenges(challengesResponse.data);

        localStorage.setItem('entitiesKilled', JSON.stringify(userData.data.entitiesKilled));
        localStorage.setItem('entityMap', JSON.stringify(entityMapResponse.data));
        localStorage.setItem('blockMap', JSON.stringify(blockMapResponse.data));
        localStorage.setItem('blocksMined', JSON.stringify(userData.data.blocksMined));
        localStorage.setItem('playtimes', JSON.stringify(userData.data.playtimes));
        localStorage.setItem('topDiamondMiners', JSON.stringify(topDiamondMinersResponse.data));
        localStorage.setItem('challenges', JSON.stringify(challengesResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Poll every 60 seconds

    return () => {
      clearInterval(interval);
    };
  }, [username]);

  const currentDate = new Date();
  const nowChallenges = challenges.filter(
    (challenge) =>
      new Date(challenge.startDate) <= currentDate && new Date(challenge.endDate) >= currentDate
  );
  const nextChallenges = challenges.filter((challenge) => new Date(challenge.startDate) > currentDate);


  return (
    <ProfilePageContainer>
      <PlayerInfoContainer className="border doodle-border-2">
        <LogoImage src={AccountLogo} alt="Account Logo" className="border doodle-border-1" />
        <h2>{username}</h2>
        <p>Team: {teamName}</p>
        <ChartWrapper className="border doodle-border">
          <BlocksMinedChart blocksMined={blocksMined} blockMap={blockMap} />
        </ChartWrapper>
        <ChartWrapper className="border doodle-border">
          <PlaytimeChart playtimes={playtimes} />
        </ChartWrapper>
        <ChartWrapper className="border doodle-border">
          <EntitiesKilledChart entitiesKilled={entitiesKilled} entityMap={entityMap} />
        </ChartWrapper>
      </PlayerInfoContainer>
      <WorldStatsContainer>
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
          <div className="border doodle-border">
            <ChallengeRoad username={username} />
          </div>
        </div>
        <OnlinePlayerCount />
        
          <div className="border doodle-border">
            <TopDiamondMinersChart topDiamondMiners={topDiamondMiners} />
          </div>
        
      </WorldStatsContainer>
    </ProfilePageContainer>
  );
}

export default ProfilePage;