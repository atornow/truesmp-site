import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginRegisterContainer from './LoginRegisterContainer';
import styled from 'styled-components';

const FieldsContainer = styled.div`
  padding-bottom: 1rem; /* Adjust the value as needed */
`;

const ButtonContainer = styled.div`
  padding-top: 0rem; /* Adjust the value as needed */
`;

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setVerificationToken('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users/register', { username, password });
      setSuccess(response.data.message);
      setVerificationToken(response.data.token);
      setUsername('');
      setPassword('');
      navigate('/verify', { state: { verificationToken: response.data.token, username } });
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <LoginRegisterContainer>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {success && (
            <div style={{ color: 'green' }}>
              {success}
              <br />
              Your verification token is: <strong>{verificationToken}</strong>
              <br />
            </div>
          )}
          <FieldsContainer>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </FieldsContainer>
          <ButtonContainer>
            <button type="submit">Register</button>
          </ButtonContainer>
        </form>
      </LoginRegisterContainer>
    </div>
  );
}

export default RegisterForm;