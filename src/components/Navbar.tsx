import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #48872B;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem><Link to="/">Home</Link></NavItem>
        <NavItem><Link to="/calculator">Calculator</Link></NavItem>
        <NavItem><Link to="/comparator">Comparator</Link></NavItem>
        <NavItem><Link to="/optimizer">Optimizer</Link></NavItem>
        <NavItem><Link to="/recommender">Recommender</Link></NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
