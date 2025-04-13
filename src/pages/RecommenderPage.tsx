import React, { useState } from 'react';
import { 
  pageStyle, 
  headingStyle, 
  formStyle, 
  inputStyle, 
  buttonStyle,
  resultsStyle 
} from '../styles/styles';

const RecommenderPage = () => {
  const [billAmount, setBillAmount] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const generateRecommendation = () => {
    const amount = Number(billAmount);
    let recommendationText = '';
    
    if (amount > 5000) {
      recommendationText = 'Install solar panels and switch to inverter ACs';
    } else if (amount > 3000) {
      recommendationText = 'Use energy-efficient appliances and optimize usage timings';
    } else {
      recommendationText = 'Replace old appliances with 5-star rated ones';
    }
    
    setRecommendation(recommendationText);
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Personalized Recommendations</h1>
      <div style={formStyle}>
        <input type="number" placeholder="Monthly Electricity Bill (₹)" 
          value={billAmount} 
          onChange={(e) => setBillAmount(e.target.value)} 
          style={inputStyle} 
        />
        <button onClick={generateRecommendation} style={buttonStyle}>
          Get Recommendations
        </button>
      </div>

      {recommendation && (
        <div style={{ 
          ...resultsStyle, 
          backgroundColor: '#39542C', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h3>{recommendation}</h3>
        </div>
      )}
    </div>
  );
};

export default RecommenderPage;
