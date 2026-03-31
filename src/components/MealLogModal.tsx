import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import './MealLogModal.css';

interface MealLogModalProps {
  onClose: () => void;
}

export default function MealLogModal({ onClose }: MealLogModalProps) {
  const [mealType, setMealType] = useState('Lunch');
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!inputValue) return;
    setIsAnalyzing(true);
    setShowResults(false);
    
    // Mock API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="modal-overlay glass" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Log a Meal</h2>
        
        <div className="meal-pills">
          {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(type => (
            <button
              key={type}
              className={`pill ${mealType === type ? 'active' : ''}`}
              onClick={() => setMealType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="input-group">
          <textarea
            className="food-input"
            autoFocus
            placeholder="Type what you ate... e.g. 'chicken rice and salad'"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAnalyze();
              }
            }}
          />
        </div>

        {isAnalyzing && (
          <div className="analyzing-state">
            <Loader2 className="spinner" size={18} color="var(--accent-primary)" />
            <span className="analyzing-text">Analyzing nutrition...</span>
          </div>
        )}

        {showResults && (
          <div className="results-section">
            <div className="food-item">
              <span className="food-name">Brown Rice <span className="text-muted ml-2">180g detected</span></span>
              <span className="macros text-muted">P:4g C:45g F:1g</span>
            </div>
            <div className="food-item">
              <span className="food-name">Grilled Chicken <span className="text-muted ml-2">150g detected</span></span>
              <span className="macros text-muted">P:46g C:0g F:5g</span>
            </div>
            <div className="food-item">
              <span className="food-name">Mixed Salad <span className="text-muted ml-2">80g detected</span></span>
              <span className="macros text-muted">P:1g C:3g F:0g</span>
            </div>
          </div>
        )}

        <div className="modal-footer">
          {showResults ? (
            <div className="impact-score"><span className="score-value">+28 pts</span></div>
          ) : (
             <div/>
          )}
          <div className="modal-actions">
            <button className="btn btn-ghost modal-btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary modal-btn" onClick={showResults ? onClose : handleAnalyze}>
              {showResults ? 'Log Meal →' : 'Analyze →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
