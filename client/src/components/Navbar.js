import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/rules">Account Rules</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        ) : (
          <>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;