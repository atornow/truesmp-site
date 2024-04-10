import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

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
      <div>
        <div
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: 'green',
            height: '20px',
          }}
        />
      </div>
      <p>
        Progress: {challenge.currentProgress} / {challenge.amountGoal}
      </p>
      <p>
        {formatDate(challenge.startDate)} – {formatDate(challenge.endDate)}
      </p>
      <p>Points: {challenge.points}</p>
    </div>
  );
}

export default ChallengeProgress;