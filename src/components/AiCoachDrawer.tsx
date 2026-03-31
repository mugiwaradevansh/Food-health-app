import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import './AiCoachDrawer.css';

interface AiCoachDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiCoachDrawer({ isOpen, onClose }: AiCoachDrawerProps) {
  const [input, setInput] = useState('');

  return (
    <>
      <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h2 className="title-sm">AI Health Coach</h2>
            <div className="status-indicator">
              <div className="dot animate-pulse-green"></div>
              <span>Online</span>
            </div>
          </div>
          <button className="btn-clear close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="chat-history no-scrollbar">
          <div className="chat-bubble user">
            <p>Why do I feel tired after lunch?</p>
          </div>
          
          <div className="chat-bubble ai">
            <p>Based on your meal logs, your post-lunch tiredness likely correlates with your high-GI carb intake at lunch — white rice + roti together spike blood sugar, then cause a crash. Try adding more protein or swapping one carb for a protein source.</p>
          </div>
        </div>

        <div className="drawer-footer">
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Ask anything about your health..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                   // mock send
                   setInput('');
                }
              }}
            />
            <button 
              className="send-btn" 
              onClick={() => setInput('')}
            >
              <ArrowRight size={18} color="var(--bg-dark)" />
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
}
