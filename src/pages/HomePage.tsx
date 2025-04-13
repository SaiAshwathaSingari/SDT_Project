import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headingStyle}>Energy Optimization Tool</h1>
        <p style={taglineStyle}>Your gateway to smarter energy usage</p>
      </header>
      <div style={moduleContainerStyle}>
        <Link to="/calculator" style={linkStyle}>
          <button className="hover-button" style={buttonStyle}>Energy Consumption Calculator</button>
        </Link>
        <Link to="/comparator" style={linkStyle}>
          <button className="hover-button" style={buttonStyle}>Efficiency Comparator</button>
        </Link>
        <Link to="/optimizer" style={linkStyle}>
          <button className="hover-button" style={buttonStyle}>Usage Optimizer</button>
        </Link>
        <Link to="/recommender" style={linkStyle}>
          <button className="hover-button" style={buttonStyle}>Recommendation Engine</button>
        </Link>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#293325',
  color: '#FFFFFF',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle: React.CSSProperties = {
  marginTop: '20px',
};

const headingStyle: React.CSSProperties = {
  color: '#4CBB17',
  fontSize: '48px',
  fontWeight: 'bold',
};

const taglineStyle: React.CSSProperties = {
  fontSize: '20px',
  marginTop: '10px',
};

const moduleContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px', // Space between buttons
  marginTop: '100px', // Move buttons further down
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#4CBB17',
  color: '#FFFFFF',
  borderRadius: '8px',
  padding: '15px', // Equal padding for consistent height
  fontSize: '18px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  width: '350px', // Fixed width for equal length buttons
};

const linkStyle = {
  textDecoration: 'none', // Remove underline from links
};

export default HomePage;
