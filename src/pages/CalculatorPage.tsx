import React, { useState } from 'react';


interface Appliance {
  name: string;
  energy: number;
}

const CalculatorPage = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [hours, setHours] = useState('');
  const [days, setDays] = useState('');
  const [rate, setRate] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const calculateEnergy = () => {
    const energy = (Number(power) * Number(hours) * Number(days)) / 1000;
    const cost = energy * Number(rate);
    setAppliances((prev) => [...prev, { name, energy }]);
    setTotalCost((prev) => prev + cost);
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setPower('');
    setHours('');
    setDays('');
    setRate('');
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Energy Consumption Calculator</h1>
      <form style={formStyle} onSubmit={(e) => { e.preventDefault(); calculateEnergy(); }}>
        <input type="text" placeholder="Appliance Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Power (Watts)" value={power} onChange={(e) => setPower(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Hours/Day" value={hours} onChange={(e) => setHours(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Days/Month" value={days} onChange={(e) => setDays(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Rate (₹/kWh)" value={rate} onChange={(e) => setRate(e.target.value)} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Add Appliance</button>
      </form>

      <div style={resultsStyle}>
        <h2>Appliance List</h2>
        {appliances.map((appliance, index) => (
          <div key={index} style={itemStyle}>
            {appliance.name}: {appliance.energy.toFixed(2)} kWh
          </div>
        ))}
        <h3>Total Cost: ₹{totalCost.toFixed(2)}</h3>
      </div>
    </div>
  );
};

// Reusable styles
const pageStyle = {
  padding: '20px',
  backgroundColor: '#293325',
  color: '#FFFFFF',
  minHeight: '100vh'
};

const headingStyle = {
  color: '#4CBB17',
  textAlign: 'center' as const,
  marginBottom: '30px'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '15px',
  maxWidth: '500px',
  margin: '0 auto'
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #4CBB17',
  fontSize: '16px'
};

const buttonStyle = {
  backgroundColor: '#4CBB17',
  color: 'white',
  padding: '12px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  transition: 'all 0.3s ease'
};

const resultsStyle = {
  marginTop: '30px',
  textAlign: 'center' as const
};

const itemStyle = {
  margin: '10px 0',
  padding: '10px',
  backgroundColor: '#39542C',
  borderRadius: '8px'
};

export default CalculatorPage;
