import React, { useState, useContext } from 'react';
import axios from 'axios';
import LoginRegisterContainer from './LoginRegisterContainer';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const FieldsContainer = styled.div`
  padding-bottom: 1rem;
`;

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
      const { token, teamName } = response.data;

      login(token, username, teamName); // Pass the teamName to the login function

      setUsername('');
      setPassword('');
      setError('');

      // Nav to profile
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setError('Incorrect password/user does not exist.');
    }
  };

  return (
    <LoginRegisterContainer>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <FieldsContainer>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </FieldsContainer>
        <button type="submit">Login</button>
      </form>
    </LoginRegisterContainer>
  );
}

export default LoginForm;