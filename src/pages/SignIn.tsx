import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutrition } from '../context/NutritionContext';
import './LandingPage.css'; // Reuse existing styles

export default function SignIn() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const { setUserProfile } = useNutrition();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && age.trim()) {
      setUserProfile(name.trim(), age.trim());
      navigate('/dashboard');
    }
  };

  return (
    <div className="landing-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="landing-nav">
        <div className="nav-container" style={{ justifyContent: 'center' }}>
          <div className="brand" onClick={() => navigate('/')}>VitalPlate</div>
        </div>
      </div>
      
      <div className="metrics-card tooltip-right" style={{ width: '100%', maxWidth: '400px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="title-lg">Welcome</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Let's personalize your intelligence.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group">
            <input 
              type="text" 
              className="chat-input" 
              style={{ width: '100%', boxSizing: 'border-box' }}
              placeholder="Your Name" 
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="number" 
              className="chat-input" 
              style={{ width: '100%', boxSizing: 'border-box' }}
              placeholder="Your Age" 
              value={age}
              onChange={e => setAge(e.target.value)}
              min="10"
              max="120"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '48px', marginTop: '12px' }}>
            Start Intelligence
          </button>
        </form>
      </div>
    </div>
  );
}
