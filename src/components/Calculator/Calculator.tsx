import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #48872B;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a6b22;
  }
`;

const Result = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const Calculator = () => {
  const [formData, setFormData] = useState({
    electricity: '',
    gas: '',
    water: '',
  });
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Object.values(formData).reduce((sum, value) => 
      sum + (parseFloat(value) || 0), 0
    );
    setResult(total);
  };

  return (
    <CalculatorContainer>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Monthly Electricity Bill ($)</Label>
          <Input
            type="number"
            name="electricity"
            value={formData.electricity}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </InputGroup>
        <InputGroup>
          <Label>Monthly Gas Bill ($)</Label>
          <Input
            type="number"
            name="gas"
            value={formData.gas}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </InputGroup>
        <InputGroup>
          <Label>Monthly Water Bill ($)</Label>
          <Input
            type="number"
            name="water"
            value={formData.water}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </InputGroup>
        <Button type="submit">Calculate Total</Button>
      </Form>
      {result !== null && (
        <Result>
          <h3>Total Monthly Energy Costs: ${result.toFixed(2)}</h3>
        </Result>
      )}
    </CalculatorContainer>
  );
};

export default Calculator;
