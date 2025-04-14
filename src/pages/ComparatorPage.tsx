import React, { useState, useEffect, useRef } from 'react';
import { NavSidebar } from '../App';

const ComparatorPage = () => {
  const [oldAppliance, setOldAppliance] = useState({ power: '', hours: '' });
  const [newAppliance, setNewAppliance] = useState({ power: '', hours: '' });
  const [rate, setRate] = useState('');
  const [savings, setSavings] = useState<number | null>(null);
  const [showSavings, setShowSavings] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const savingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
        setShowScrollTop(scrollTop > 300);
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
      observer.disconnect();
    };
  }, []);

  // Add a separate effect to handle savings visibility
  useEffect(() => {
    if (savings !== null && savingsRef.current) {
      savingsRef.current.classList.add('visible');
    }
  }, [savings]);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  const calculateSavings = (e: React.FormEvent) => {
    e.preventDefault();
    const oldEnergy = (Number(oldAppliance.power) * Number(oldAppliance.hours)) / 1000;
    const newEnergy = (Number(newAppliance.power) * Number(newAppliance.hours)) / 1000;
    setSavings((oldEnergy - newEnergy) * Number(rate));
    setShowSavings(true);
    
    // Scroll to savings after a short delay to allow for animation
    setTimeout(() => {
      if (savingsRef.current) {
        savingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="App">
      <div className="animated-bg"></div>
      <NavSidebar />
      
      <div className="content-wrapper" ref={contentRef}>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
        
        <div className="page-container">
          <h1 className="page-title section-fade-in" ref={setSectionRef(0)}>Efficiency Comparator</h1>
          
          <div className="card section-fade-in" ref={setSectionRef(1)}>
            <form onSubmit={calculateSavings}>
              <div className="comparator-grid">
                <div className="comparator-section">
                  <h3 className="card-title">Old Appliance</h3>
                  <div className="form-group">
                    <label className="form-label">Power (Watts)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Power (Watts)" 
                      value={oldAppliance.power} 
                      onChange={(e) => setOldAppliance(p => ({ ...p, power: e.target.value }))} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hours/Day</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Hours/Day" 
                      value={oldAppliance.hours} 
                      onChange={(e) => setOldAppliance(p => ({ ...p, hours: e.target.value }))} 
                      required
                    />
                  </div>
                </div>

                <div className="comparator-section">
                  <h3 className="card-title">New Appliance</h3>
                  <div className="form-group">
                    <label className="form-label">Power (Watts)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Power (Watts)" 
                      value={newAppliance.power} 
                      onChange={(e) => setNewAppliance(p => ({ ...p, power: e.target.value }))} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hours/Day</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Hours/Day" 
                      value={newAppliance.hours} 
                      onChange={(e) => setNewAppliance(p => ({ ...p, hours: e.target.value }))} 
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="form-label">Electricity Rate (₹/kWh)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Electricity Rate (₹/kWh)" 
                  value={rate} 
                  onChange={(e) => setRate(e.target.value)} 
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
                Calculate Savings
              </button>
            </form>
          </div>

          {showSavings && savings !== null && (
            <div 
              className="card section-fade-in recommendation-card" 
              ref={(el) => {
                setSectionRef(2)(el);
                savingsRef.current = el;
              }}
            >
              <h2 className="card-title">Monthly Savings</h2>
              <p className="savings-amount">₹{savings.toFixed(2)}</p>
              <p className="card-text">
                By switching to the new appliance, you can save ₹{savings.toFixed(2)} per month on your electricity bill.
              </p>
            </div>
          )}
        </div>
        
        <div 
          className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`} 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </div>
      </div>
    </div>
  );
};

export default ComparatorPage;
