import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import EventsPage from './components/EventsPage';
import RulesPage from './components/RulesPage';
import GalleryPage from './components/GalleryPage';
import VerificationPage from './components/VerificationPage';
import { AuthContext } from './contexts/AuthContext';
import './css/doodle-css/doodle.css';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Xkcd', cursive;
    text-align: center;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-top: 60px;
`;

function App() {
  const { isAuthenticated, username } = useContext(AuthContext);

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <div>
                  <h2>Welcome</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <LoginForm />
                    <RegisterForm />
                  </div>
                </div>
              ) : (
                <Navigate to="/profile" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {username === 'RamenLover' ? <AdminPage /> : <Navigate to="/profile" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <GalleryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;