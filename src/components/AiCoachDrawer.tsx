import { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import { useNutrition } from '../context/NutritionContext';
import { chatWithCoach } from '../lib/gemini';
import './AiCoachDrawer.css';

interface AiCoachDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function AiCoachDrawer({ isOpen, onClose }: AiCoachDrawerProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm your VitalPlate AI Coach. How can I help you optimize your nutrition today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { user, meals } = useNutrition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Convert local messages to ChatMessage format expected by gemini.ts
      const history = messages.map(m => ({
        role: m.role,
        text: m.content
      }));
      
      const response = await chatWithCoach(history, userMessage, user, meals);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble analyzing that request right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

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

        <div className="chat-history no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingBottom: '24px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
              <p>{msg.content}</p>
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble ai" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Loader2 size={16} className="spinner" /> 
              <span>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
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
                   handleSend();
                }
              }}
              disabled={isTyping}
            />
            <button 
              className="send-btn" 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
            >
              <ArrowRight size={18} color="var(--bg-dark)" />
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
}
