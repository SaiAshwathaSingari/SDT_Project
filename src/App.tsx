import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import CalculatorPage from './pages/CalculatorPage';
import ComparatorPage from './pages/ComparatorPage';
import OptimizerPage from './pages/OptimizerPage';
import RecommenderPage from './pages/RecommenderPage';

export const NavSidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className="nav-sidebar" 
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="nav-logo">
        {isExpanded ? (
          <h2>EnerSavvy</h2>
        ) : (
          <img src="/sdg.jpg" alt="SDG 7" className="sdg-logo" />
        )}
      </div>
      <nav className="nav-menu">
        <Link to="/" className={location.pathname === '/' ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </Link>
        <Link to="/calculator" className={location.pathname === '/calculator' ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">🧮</span>
          <span className="nav-text">Calculator</span>
        </Link>
        <Link to="/comparator" className={location.pathname === '/comparator' ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">⚖️</span>
          <span className="nav-text">Comparator</span>
        </Link>
        <Link to="/optimizer" className={location.pathname === '/optimizer' ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">⚡</span>
          <span className="nav-text">Optimizer</span>
        </Link>
        <Link to="/recommender" className={location.pathname === '/recommender' ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">💡</span>
          <span className="nav-text">Recommender</span>
        </Link>
      </nav>
    </div>
  );
};

const HomePage: React.FC = () => {
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

  return (
    <div className="App">
      <div className="animated-bg"></div>
      <NavSidebar />
      
      <div className="content-wrapper" ref={contentRef}>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
        
        <header className="header section-fade-in" ref={setSectionRef(0)}>
          <h1>EnerSavvy</h1>
          <p>Future Revolution begins here!</p>
        </header>

        <main className="main-content">
          <section className="description-section section-fade-in" ref={setSectionRef(1)}>
            <p className="description-text">
              Welcome to EnerSavvy, your gateway to a sustainable energy future! This platform, aligned with SDG 7 (Affordable and Clean Energy), empowers you to manage and optimize your energy consumption. Explore tools like the Calculator, Comparator, Optimizer, and Recommender to make informed decisions about your appliances and energy usage.
            </p>
          </section>

          <section className="buttons-section section-fade-in" ref={setSectionRef(2)}>
            <div className="button-grid">
              <Link to="/calculator"><button className="btn-gradient">Calculator</button></Link>
              <Link to="/comparator"><button className="btn-hover">Comparator</button></Link>
              <Link to="/optimizer"><button className="btn-glow">Optimizer</button></Link>
              <Link to="/recommender"><button className="btn-gradient">Recommender</button></Link>
            </div>
          </section>

          <section className="images-section section-fade-in" ref={setSectionRef(3)}>
            <div className="image-container">
              <p>SDG 7</p>
              <img src="sdg.jpg" alt="Sample" className="image-hover" />
            </div>
            <div className="image-container">
            </div>
          </section>

          <section className="about-us-section section-fade-in" ref={setSectionRef(4)}>
            <h2 className="about-title">About Us</h2>
            <div className="about-content">
              <div className="project-details">
                <h3>Our Project</h3>
                <p>
                  EnerSavvy is a comprehensive energy management platform developed to promote sustainable energy consumption and help users make informed decisions about their energy usage. Our platform aligns with the United Nations Sustainable Development Goal 7 (Affordable and Clean Energy) and provides innovative tools to optimize energy consumption, compare appliances, and receive personalized recommendations.
                </p>
              </div>
              <div className="team-details">
                <h3>Our Team</h3>
                <div className="team-members">
                  <div className="team-member">
                    <h4>Singari Sai Ashwatha</h4>
                  </div>
                  <div className="team-member">
                    <h4>D. Vishwatej</h4>
                  </div>
                  <div className="team-member">
                    <h4>Minal Shetty</h4>
                  </div>
                  <div className="team-member">
                    <h4>Abhishek A</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
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
