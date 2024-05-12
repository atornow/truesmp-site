import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LoginForm from './elements/LoginForm';
import RegisterForm from './elements/RegisterForm';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './elements/ProtectedRoute';
import Navbar from './elements/Navbar';
import EventsPage from './pages/EventsPage';
import RulesPage from './pages/RulesPage';
import GalleryPage from './pages/GalleryPage';
import VerificationPage from './pages/VerificationPage';
import { AuthContext } from './contexts/AuthContext';
import './css/doodle-css/doodle.css';


// Test change for release
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Xkcd', cursive;
    text-align: center;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
      width: 100%;

    }
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-top: 60px;

  @media (max-width: 768px) {
    padding-top: 40px;
    
  }
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
          <Route path="*"  element={<Navigate to="/" />} />
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