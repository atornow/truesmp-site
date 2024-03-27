import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import EventsPage from './components/EventsPage';
import RulesPage from './components/RulesPage';
import VerificationPage from './components/VerificationPage';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        <Route
          path="*"
          element={
            !isAuthenticated ? (
              <div>
                <h2>Welcome! Please log in or register:</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <LoginForm />
                  <RegisterForm />
                </div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;