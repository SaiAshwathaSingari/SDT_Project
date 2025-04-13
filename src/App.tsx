import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import ComparatorPage from './pages/ComparatorPage';
import OptimizerPage from './pages/OptimizerPage';
import RecommenderPage from './pages/RecommenderPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/comparator" element={<ComparatorPage />} />
        <Route path="/optimizer" element={<OptimizerPage />} />
        <Route path="/recommender" element={<RecommenderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
