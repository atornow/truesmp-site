import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import VerificationPage from './components/VerificationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        {/* Show both options on the root page */}
        <Route path="/" element={
          <div>
            <h2>Welcome! Please log in or register:</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <LoginForm />
              <RegisterForm />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
