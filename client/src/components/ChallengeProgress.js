import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChallengeProgress({ challenge }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`/api/challenges/${challenge.id}`);
        setProgress(response.data.currentProgress);
      } catch (error) {
        console.error('Error fetching challenge progress:', error);
      }
    };

    fetchProgress();
    const interval = setInterval(fetchProgress, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [challenge.id]);

  const progressPercentage = Math.min((progress / challenge.amountGoal) * 100, 100);

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
        Progress: {progress} / {challenge.amountGoal}
      </p>
    </div>
  );
}

export default ChallengeProgress;