import { ArrowRight, BrainCircuit, BarChart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="landing-nav glass">
        <div className="nav-container">
          <div className="brand" onClick={() => navigate('/')}>VitalPlate</div>
          <button className="btn btn-primary" onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="eyebrow">FOOD × HEALTH INTELLIGENCE</div>
            <h1 className="hero-title">Finally understand what your food does to your body.</h1>
            <p className="hero-subtitle">
              VitalPlate maps your meals to your energy, sleep, and focus — then tells you exactly what to change.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/signin')}>
                Start Free <ArrowRight size={18} className="ml-2" />
              </button>
              <button className="btn btn-ghost btn-lg">See Demo</button>
            </div>
            <div className="social-proof">
              <div className="social-dot"></div>
              <span>2,400 people improved their health score this week</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow-effect"></div>
            <div className="floating-cards">
              <div className="float-card card-1 card">
                <span className="text-muted">VitalScore Today</span>
                <div className="score-lg" style={{ color: 'var(--accent-primary)', fontSize: '40px', fontWeight: 'bold' }}>78</div>
              </div>
              <div className="float-card card-2 card">
                <span className="text-muted">Weekly Trend</span>
                <div className="mock-chart">
                  <div className="mock-bar h-60"></div>
                  <div className="mock-bar h-80"></div>
                  <div className="mock-bar h-40"></div>
                  <div className="mock-bar h-90"></div>
                  <div className="mock-bar h-50"></div>
                </div>
              </div>
              <div className="float-card card-3 card">
                <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>AI INSIGHT</span>
                <p style={{ fontSize: '12px', marginTop: '8px' }}>Swap white rice for quinoa to avoid afternoon crash.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-card card">
            <BrainCircuit size={32} color="var(--accent-primary)" className="feature-icon" />
            <h3 className="feature-title">AI-Powered Insights</h3>
            <p className="feature-desc">Our intelligent coach analyzes your habits and gives personalized, actionable advice to boost your vitality.</p>
          </div>
          <div className="feature-card card">
            <BarChart size={32} color="var(--accent-primary)" className="feature-icon" />
            <h3 className="feature-title">Visual Health Dashboard</h3>
            <p className="feature-desc">See your macro intakes, vitality score, and trends all in one beautifully crafted view.</p>
          </div>
          <div className="feature-card card">
            <Calendar size={32} color="var(--accent-primary)" className="feature-icon" />
            <h3 className="feature-title">Smart Meal Planning</h3>
            <p className="feature-desc">Plan ahead with our smart calendar that suggests meals based on your unique nutritional needs.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-circle">1</div>
            <span className="step-text">Log your meal</span>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-circle">2</div>
            <span className="step-text">AI analyses nutrition</span>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-circle">3</div>
            <span className="step-text">See your health score</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">VitalPlate</div>
          <div className="footer-tagline">Built for health, powered by AI</div>
        </div>
      </footer>
    </div>
  );
}
