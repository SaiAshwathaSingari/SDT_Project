import React, { useState } from 'react';

const Comparator = () => {
  const [oldModel, setOldModel] = useState({ power: '', hours: '' });
  const [newModel, setNewModel] = useState({ power: '', hours: '' });
  const [savings, setSavings] = useState('');

  const calculateSavings = () => {
    const oldCost = (Number(oldModel.power) * Number(oldModel.hours)) / 1000;
    const newCost = (Number(newModel.power) * Number(newModel.hours)) / 1000;
    setSavings(`Energy Saved per Month: ${(oldCost - newCost).toFixed(2)} kWh`);
  };

  return (
    <div>
      <h2>Efficiency Comparator</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3>Old Model</h3>
        <input
          type="number"
          placeholder="Power (Watts)"
          onChange={(e) => setOldModel({ ...oldModel, power: e.target.value })}
        />
        <input
          type="number"
          placeholder="Hours per Day"
          onChange={(e) => setOldModel({ ...oldModel, hours: e.target.value })}
        />

        <h3>New Model</h3>
        <input
          type="number"
          placeholder="Power (Watts)"
          onChange={(e) => setNewModel({ ...newModel, power: e.target.value })}
        />
        <input
          type="number"
          placeholder="Hours per Day"
          onChange={(e) => setNewModel({ ...newModel, hours: e.target.value })}
        />

        <button type="button" onClick={calculateSavings}>
          Compare
        </button>
      </form>

      {savings && <p>{savings}</p>}
    </div>
  );
};

export default Comparator;
