import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  position: relative;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  border: 2px solid black;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #FFAA00;
`;

const ProgressTick = styled.div`
  position: absolute;
  bottom: -20px;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;

  &:hover::after {
    content: "${props => props.tooltip}";
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ChallengeProgress({ challenge }) {
  console.log('Challenge data:', challenge);
  const [progress, setProgress] = useState(0);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/challenges?targetUsername=${username}`);
        setProgress(response.data.currentProgress);
      } catch (error) {
        console.error('Error fetching challenge progress:', error);
      }
    };

    fetchProgress();
    const interval = setInterval(fetchProgress, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [challenge.id]);

  const progressPercentage = Math.min((challenge.currentProgress / challenge.amountGoal) * 100, 100);

  return (
    <div>
      <h3>{challenge.description}</h3>
      <ProgressBarContainer>
        <ProgressBar>
          <ProgressFill style={{ width: `${progressPercentage}%` }} />
        </ProgressBar>
        <ProgressTick
          style={{ left: `${progressPercentage}%`, transform: `translateX(-50%)` }}
          tooltip={`${challenge.currentProgress} out of ${challenge.amountGoal}`}
        >
          {challenge.currentProgress}
        </ProgressTick>
      </ProgressBarContainer>
      <p>
        {formatDate(challenge.startDate)} – {formatDate(challenge.endDate)}
      </p>
      <p>Points: {challenge.points}</p>
    </div>
  );
}

export default ChallengeProgress;