import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CalculatorPage from './pages/CalculatorPage';
import ComparatorPage from './pages/ComparatorPage';
import OptimizerPage from './pages/OptimizerPage';
import RecommenderPage from './pages/RecommenderPage';

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <div className="animated-bg"></div>

      <header className="header">
        <h1>EnerSavvy</h1>
        <p>Future Revolution begins here!</p>
       
      </header>

      <main className="main-content">
        <section className="buttons-section">
          <div className="button-grid">
            <a href="/calculator"><button className="btn-gradient">Calculator</button></a>
            <a href="/comparator"><button className="btn-hover">Comparator</button></a>
            <a href="/optimizer"><button className="btn-glow">Optimizer</button></a>
            <a href="/recommender"><button className="btn-gradient">Recommender</button></a>
          </div>
        </section>

        <section className="images-section">
          <div className="image-container">
            <p>SDG 7</p>
            <img src="sdg.jpg" alt="Sample" className="image-hover" />
            
          </div>
          <div className="image-container">
           
          </div>
        </section>
      </main>

      
    </div>
  );
};

const App: React.FC = () => {
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
