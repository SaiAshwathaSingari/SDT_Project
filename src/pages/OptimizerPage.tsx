import React, { useState } from 'react';
import { 
  pageStyle, 
  headingStyle, 
  formStyle, 
  inputStyle, 
  buttonStyle, 
  resultsStyle 
} from '../styles/styles';

const OptimizerPage = () => {
  const [currentUsage, setCurrentUsage] = useState({ power: '', hours: '' });
  const [optimizedHours, setOptimizedHours] = useState('');
  const [rate, setRate] = useState('');
  const [savings, setSavings] = useState<number | null>(null);

  const calculateSavings = () => {
    const current = (Number(currentUsage.power) * Number(currentUsage.hours)) / 1000;
    const optimized = (Number(currentUsage.power) * Number(optimizedHours)) / 1000;
    setSavings((current - optimized) * Number(rate));
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Usage Optimizer</h1>
      <div style={formStyle}>
        <input type="number" placeholder="Device Power (Watts)" 
          value={currentUsage.power} 
          onChange={(e) => setCurrentUsage(p => ({ ...p, power: e.target.value }))} 
          style={inputStyle} 
        />
        <input type="number" placeholder="Current Hours/Day" 
          value={currentUsage.hours} 
          onChange={(e) => setCurrentUsage(p => ({ ...p, hours: e.target.value }))} 
          style={inputStyle} 
        />
        <input type="number" placeholder="Optimized Hours/Day" 
          value={optimizedHours} 
          onChange={(e) => setOptimizedHours(e.target.value)} 
          style={inputStyle} 
        />
        <input type="number" placeholder="Electricity Rate (₹/kWh)" 
          value={rate} 
          onChange={(e) => setRate(e.target.value)} 
          style={inputStyle} 
        />
        <button onClick={calculateSavings} style={buttonStyle}>
          Calculate Savings
        </button>
      </div>

      {savings !== null && (
        <div style={resultsStyle}>
          <h3>Potential Savings: ₹{savings.toFixed(2)}/month</h3>
        </div>
      )}
    </div>
  );
};

export default OptimizerPage;
