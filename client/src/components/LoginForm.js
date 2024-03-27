import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with your backend endpoint
      const response = await axios.post('http://73.63.150.254:3001/api/users/login', { username, password });

      // Extract the token from the response
      const { token } = response.data;
      setSuccess('Logging in...');

      // Save the token and username to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username); // Also save username for later use

      // Redirect to profile page after successful login
      navigate('/profile');

    } catch (error) {
      // Handle login error
      console.error(error);
      setError('Incorrect password/user does not exist.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
