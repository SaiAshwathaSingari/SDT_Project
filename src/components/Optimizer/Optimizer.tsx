import React, { useState } from 'react';

const Optimizer = () => {
  const [usage, setUsage] = useState({ power: '', hours: '' });
  const [optimizedUsage, setOptimizedUsage] = useState('');

  const optimizeUsage = () => {
    const currentCost = (Number(usage.power) * Number(usage.hours)) / 1000;
    const optimizedCost = (Number(usage.power) * (Number(usage.hours) - 1)) / 1000; // Simulating reduced usage by an hour
    setOptimizedUsage(`Optimized Energy Usage per Month: ${(currentCost - optimizedCost).toFixed(2)} kWh`);
  };

  return (
    <div>
      <h2>Usage Optimizer</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          placeholder="Power (Watts)"
          onChange={(e) => setUsage({ ...usage, power: e.target.value })}
        />
        <input
          type="number"
          placeholder="Hours per Day"
          onChange={(e) => setUsage({ ...usage, hours: e.target.value })}
        />

        <button type="button" onClick={optimizeUsage}>
          Optimize Usage
        </button>
      </form>

      {optimizedUsage && <p>{optimizedUsage}</p>}
    </div>
  );
};

export default Optimizer;
