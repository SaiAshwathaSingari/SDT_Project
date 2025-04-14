import React, { useState, useEffect, useRef } from 'react';
import { NavSidebar } from '../App';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const recommendationRef = useRef<HTMLDivElement>(null);

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

  // Add a separate effect to handle recommendation visibility
  useEffect(() => {
    if (recommendation && recommendationRef.current) {
      recommendationRef.current.classList.add('visible');
    }
  }, [recommendation]);

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

  const generateRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    setShowRecommendation(true);
    
    // Scroll to recommendation after a short delay to allow for animation
    setTimeout(() => {
      if (recommendationRef.current) {
        recommendationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          <h1 className="page-title section-fade-in" ref={setSectionRef(0)}>Personalized Recommendations</h1>
          
          <div className="card section-fade-in" ref={setSectionRef(1)}>
            <h2 className="card-title">Get Energy-Saving Tips</h2>
            <p className="card-text">
              Enter your monthly electricity bill amount to receive personalized recommendations 
              for reducing your energy consumption and saving money.
            </p>
            
            <form onSubmit={generateRecommendation}>
              <div className="form-group">
                <label className="form-label">Monthly Electricity Bill (₹)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Monthly Electricity Bill (₹)" 
                  value={billAmount} 
                  onChange={(e) => setBillAmount(e.target.value)} 
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary">
                Get Recommendations
              </button>
            </form>
          </div>

          {showRecommendation && recommendation && (
            <div 
              className="card section-fade-in recommendation-card" 
              ref={(el) => {
                setSectionRef(2)(el);
                recommendationRef.current = el;
              }}
            >
              <h2 className="card-title">Your Personalized Recommendation</h2>
              <p className="recommendation-text">{recommendation}</p>
              <p className="card-text">
                Based on your monthly bill of ₹{billAmount}, we recommend implementing these 
                energy-saving measures to reduce your electricity consumption and save money.
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

export default RecommenderPage;
