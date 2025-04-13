import React, { useState } from 'react';
import { CSSProperties } from 'react';
import { 
  pageStyle, 
  headingStyle, 
  inputStyle, 
  buttonStyle, 
  resultsStyle 
} from '../styles/styles';

const ComparatorPage = () => {
  const [oldAppliance, setOldAppliance] = useState({ power: '', hours: '' });
  const [newAppliance, setNewAppliance] = useState({ power: '', hours: '' });
  const [rate, setRate] = useState('');
  const [savings, setSavings] = useState<number | null>(null);

  // Define styles within the component with explicit typing
  const comparatorContainer: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    margin: '30px auto',
    maxWidth: '800px'
  };

  const comparatorSection: CSSProperties = {
    backgroundColor: '#39542C',
    padding: '20px',
    borderRadius: '8px'
  };

  const calculateSavings = () => {
    const oldEnergy = (Number(oldAppliance.power) * Number(oldAppliance.hours)) / 1000;
    const newEnergy = (Number(newAppliance.power) * Number(newAppliance.hours)) / 1000;
    setSavings((oldEnergy - newEnergy) * Number(rate));
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Efficiency Comparator</h1>
      <div style={comparatorContainer}>
        <div style={comparatorSection}>
          <h3 style={{ color: '#4CBB17', marginBottom: '10px' }}>Old Appliance</h3>
          <input type="number" placeholder="Power (Watts)" 
            value={oldAppliance.power} 
            onChange={(e) => setOldAppliance(p => ({ ...p, power: e.target.value }))} 
            style={inputStyle} 
          />
          <input type="number" placeholder="Hours/Day" 
            value={oldAppliance.hours} 
            onChange={(e) => setOldAppliance(p => ({ ...p, hours: e.target.value }))} 
            style={inputStyle} 
          />
        </div>

        <div style={comparatorSection}>
          <h3 style={{ color: '#4CBB17', marginBottom: '10px' }}>New Appliance</h3>
          <input type="number" placeholder="Power (Watts)" 
            value={newAppliance.power} 
            onChange={(e) => setNewAppliance(p => ({ ...p, power: e.target.value }))} 
            style={inputStyle} 
          />
          <input type="number" placeholder="Hours/Day" 
            value={newAppliance.hours} 
            onChange={(e) => setNewAppliance(p => ({ ...p, hours: e.target.value }))} 
            style={inputStyle} 
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <input type="number" placeholder="Electricity Rate (₹/kWh)" 
          value={rate} 
          onChange={(e) => setRate(e.target.value)} 
          style={{ ...inputStyle, width: '300px', marginBottom: '10px' }} 
        />
        <button onClick={calculateSavings} style={{ ...buttonStyle, width: '200px' }}>
          Calculate Savings
        </button>
      </div>

      {savings !== null && (
        <div style={{ ...resultsStyle, marginTop: '30px', paddingTop: '10px' }}>
          <h3>Monthly Savings:</h3>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CBB17' }}>
            ₹{savings.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparatorPage;
