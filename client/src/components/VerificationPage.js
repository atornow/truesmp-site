import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verificationToken, username } = location.state;

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const response = await axios.get(`http://73.63.150.254:3001/api/users/check-verification/${username}`);
        if (response.data.isVerified) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', username);
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error checking verification:', error);
      }
    };

    const timer = setInterval(checkVerification, 5000);

    const expirationTimer = setTimeout(() => {
      clearInterval(timer);
      navigate('/register');
    }, 300000);

    return () => {
      clearInterval(timer);
      clearTimeout(expirationTimer);
    };
  }, [navigate, username]);

  return (
    <div>
      <h2>Verification Page</h2>
      <p>Please run the following command in-game to verify your account:</p>
      <p><strong>/verify {verificationToken}</strong></p>
      <p>You have 5 minutes to complete the verification process.</p>
    </div>
  );
}

export default VerificationPage;