// src/utils/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api' });

// Function to set the token for all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
