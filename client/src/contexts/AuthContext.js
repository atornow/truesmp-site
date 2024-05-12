import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [uuid, setUuid] = useState(null);
  const [teamName, setTeamName] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedTeamName = localStorage.getItem('teamName');

    if (storedToken && storedUsername) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUsername(storedUsername);
      setTeamName(storedTeamName);
    }
  }, []);

  const login = (token, username, teamName) => {
      setIsAuthenticated(true);
      setToken(token);
      setUsername(username);
      setUuid(uuid);
      console.log('AuthContext - login - teamName:', teamName);
      setTeamName(teamName);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('teamName', teamName);
      localStorage.setItem('uuid', uuid);
    };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUsername(null);
    setUuid(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, username, teamName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};