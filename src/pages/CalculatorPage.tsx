import React, { useState, useEffect, useRef } from 'react';
import { NavSidebar } from '../App';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <div className="App">
      <div className="animated-bg"></div>
      <NavSidebar />
      
      <div className="content-wrapper" ref={contentRef}>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
        
        <div className="page-container">
          <h1 className="page-title section-fade-in" ref={setSectionRef(0)}>Energy Consumption Calculator</h1>
          
          <div className="card section-fade-in" ref={setSectionRef(1)}>
            <form onSubmit={(e) => { e.preventDefault(); calculateEnergy(); }}>
              <div className="form-group">
                <label className="form-label">Appliance Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Power (Watts)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={power} 
                  onChange={(e) => setPower(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Hours/Day</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={hours} 
                  onChange={(e) => setHours(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Days/Month</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={days} 
                  onChange={(e) => setDays(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Rate (₹/kWh)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={rate} 
                  onChange={(e) => setRate(e.target.value)} 
                  required 
                />
              </div>
              
              <button type="submit" className="btn-primary">Add Appliance</button>
            </form>
          </div>

          <div className="card section-fade-in" ref={setSectionRef(2)}>
            <h2 className="card-title">Appliance List</h2>
            {appliances.length === 0 ? (
              <p className="card-text">No appliances added yet. Add your first appliance above.</p>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Appliance</th>
                      <th>Energy Consumption (kWh)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliances.map((appliance, index) => (
                      <tr key={index}>
                        <td>{appliance.name}</td>
                        <td>{appliance.energy.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3>Total Cost: ₹{totalCost.toFixed(2)}</h3>
              </>
            )}
          </div>
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

export default CalculatorPage;
