import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OnlinePlayerCount() {
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const fetchPlayerCount = async () => {
      try {
        const response = await axios.get('https://api.mcsrvstat.us/2/89.117.74.38:25565');
        setPlayerCount(response.data.players.online);
      } catch (error) {
        console.error('Error fetching player count:', error);
      }
    };

    fetchPlayerCount();
    const interval = setInterval(fetchPlayerCount, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>Online Players: {playerCount}</h3>
    </div>
  );
}

export default OnlinePlayerCount;