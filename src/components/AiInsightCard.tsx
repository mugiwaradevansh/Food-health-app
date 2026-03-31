import { ArrowRight } from 'lucide-react';
import './AiInsightCard.css';

export default function AiInsightCard() {
  return (
    <div className="card insight-card">
      <div className="insight-header">
        <div className="status-indicator">
          <div className="dot animate-pulse-green"></div>
          <span>AI Insight</span>
        </div>
      </div>
      
      <div className="insight-body">
        <p>Your energy scores are 34% higher on days you eat a protein-rich breakfast. Consider adding eggs or Greek yoghurt to your morning routine.</p>
      </div>

      <div className="insight-tags">
        <span className="insight-tag">#Protein</span>
        <span className="insight-tag">#MorningRoutine</span>
        <span className="insight-tag">#Energy</span>
      </div>

      <div className="insight-footer">
        <button className="btn-clear ask-ai-btn">
          Ask AI Coach <ArrowRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
