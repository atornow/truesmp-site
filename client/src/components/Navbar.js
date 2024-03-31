import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavLink = styled(Link)`
  font-family: 'Xkcd', cursive;
  text-decoration: none;
  color: black;
  margin: 0 10px;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  font-weight: ${props => props.active ? 'bold' : 'normal'};

  &:hover {
    border-bottom-color: black;
    font-weight: bold;
  }
`;

const LogoutButton = styled.button`
  font-family: 'Xkcd', cursive;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  font-weight: ${props => props.active ? 'bold' : 'normal'};

  &:hover {
    border-bottom-color: black;
    font-weight: bold;
  }
`;

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to the landing page after logout
  };

  return (
    <Nav>
      <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
      <NavLink to="/events" active={location.pathname === '/events'}>Events</NavLink>
      <NavLink to="/rules" active={location.pathname === '/rules'}>Rules</NavLink>
      {isAuthenticated && <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>}
    </Nav>
  );
}

export default Navbar;