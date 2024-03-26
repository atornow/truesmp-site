import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({ totalDirtMined: 0, totalDiamondsMined: 0 });
  const username = localStorage.getItem('username');

  useEffect(() => {
    // Fetch user stats after component mounts
    const fetchUserStats = async () => {
      if (username) {
        try {
          // Corrected URL to use template literals for including the username
          const response = await axios.post('http://localhost:3001/api/users/stats', { username });
          console.log(response.data);
          console.log(username);
          setUserStats(response.data); // Assume the API returns an object with user stats
        } catch (error) {
          console.error('Error fetching user stats:', error);
          // Handle error (e.g., redirect to login or show error message)
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserStats();
  }, [username, navigate]);

  return (
    <div>
      <h1>Profile: {username}</h1>
      {/* Display the total dirt mined stat */}
      <p>Total Dirt Mined: {userStats.totalDirtMined}</p>
      {/* Display the total diamonds mined stat */}
      <p>Total Diamonds Mined: {userStats.totalDiamondsMined}</p>
      {/* Additional profile information here */}
    </div>
  );
}


export default ProfilePage;
