import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [teamName, setTeamName] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUsername) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const login = (token, username, teamName) => {
      setIsAuthenticated(true);
      setToken(token);
      setUsername(username);
      setTeamName(teamName);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('teamName', teamName);
    };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.setItem('teamName', teamName);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, username, teamName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};