import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNutrition } from '../context/NutritionContext';
import { analyzeMeal, type MealAnalysis } from '../lib/gemini';
import './MealLogModal.css';

interface MealLogModalProps {
  onClose: () => void;
}

export default function MealLogModal({ onClose }: MealLogModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [error, setError] = useState('');
  const { logMeal } = useNutrition();

  const handleAnalyze = async () => {
    if (!inputValue) return;
    setIsAnalyzing(true);
    setError('');
    setAnalysis(null);
    
    try {
      const result = await analyzeMeal(inputValue);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'Analysis failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveMeal = () => {
    if (analysis) {
      logMeal(analysis);
      onClose();
    }
  };

  return (
    <div className="modal-overlay glass" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Log a Meal</h2>
        


        <div className="input-group">
          <textarea
            className="food-input"
            autoFocus
            placeholder="Type what you ate... e.g. 'Dal Makhani with 2 roti and side salad' or 'Paneer Tikka'"
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

        {error && (
          <div style={{ color: 'var(--alert)', marginTop: '8px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {isAnalyzing && (
          <div className="analyzing-state" style={{ marginTop: '16px' }}>
            <Loader2 className="spinner" size={18} color="var(--accent-primary)" />
            <span className="analyzing-text">Analyzing nutrition with AI...</span>
          </div>
        )}

        {analysis && (
          <div className="results-section" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>{analysis.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div className="food-item" style={{ margin: 0 }}>
                <span className="food-name">Calories</span>
                <span className="macros text-muted">{analysis.calories} kcal</span>
              </div>
              <div className="food-item" style={{ margin: 0 }}>
                <span className="food-name">Protein</span>
                <span className="macros text-muted">{analysis.protein}g</span>
              </div>
              <div className="food-item" style={{ margin: 0 }}>
                <span className="food-name">Carbs</span>
                <span className="macros text-muted">{analysis.carbs}g</span>
              </div>
              <div className="food-item" style={{ margin: 0 }}>
                <span className="food-name">Fat</span>
                <span className="macros text-muted">{analysis.fat}g</span>
              </div>
            </div>
            {analysis.ingredients?.length > 0 && (
              <div className="food-item" style={{ margin: '8px 0 0', display: 'block' }}>
                <span className="food-name" style={{ display: 'block', marginBottom: '4px' }}>Detected Ingredients:</span>
                <span className="macros text-muted" style={{ display: 'block' }}>{analysis.ingredients.join(', ')}</span>
              </div>
            )}
            {analysis.explanation && (
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '8px 0 0' }}>
                {analysis.explanation}
              </p>
            )}
          </div>
        )}

        <div className="modal-footer" style={{ marginTop: '24px' }}>
          {analysis ? (
            <div className="impact-score">
              <span className={`score-value ${analysis.vitalScoreImpact >= 0 ? '' : 'text-alert'}`}>
                {analysis.vitalScoreImpact > 0 ? '+' : ''}{analysis.vitalScoreImpact} pts
              </span>
            </div>
          ) : (
             <div/>
          )}
          <div className="modal-actions">
            <button className="btn btn-ghost modal-btn" onClick={onClose}>Cancel</button>
            <button 
              className="btn btn-primary modal-btn" 
              onClick={analysis ? handleSaveMeal : handleAnalyze}
              disabled={isAnalyzing}
            >
              {analysis ? 'Save Meal →' : 'Analyze →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
