import { useNutrition } from '../context/NutritionContext';
import { Clock, Flame, Dumbbell } from 'lucide-react';
import './Dashboard.css';

export default function HistoryPage() {
  const { meals } = useNutrition();

  return (
    <div className="dashboard">
      <div className="section-header">
        <h1 className="title-lg">Meal History</h1>
        <p className="text-muted">Review your past intelligence logs.</p>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        {meals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
            No meals logged yet. Log a meal to see your history here.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {meals.map((meal) => (
              <div key={meal.id} style={{
                display: 'flex', 
                flexDirection: 'column',
                gap: '12px',
                padding: '16px', 
                backgroundColor: 'var(--bg-dark)', 
                borderRadius: '12px',
                border: '1px solid var(--accent-border)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '8px',
                      backgroundColor: 'rgba(39, 160, 110, 0.1)',
                      color: 'var(--accent-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{meal.name}</h3>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {new Date(meal.timestamp).toLocaleDateString()} at {new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    color: meal.vitalScoreImpact >= 0 ? 'var(--accent-primary)' : 'var(--alert)',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>
                    {meal.vitalScoreImpact > 0 ? '+' : ''}{meal.vitalScoreImpact} pts
                  </div>
                </div>

                <div style={{
                  display: 'flex', 
                  gap: '24px', 
                  padding: '12px', 
                  backgroundColor: 'rgba(255,255,255,0.02)', 
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Flame size={16} color="var(--accent-secondary)" />
                    <span style={{ fontSize: '14px' }}>{meal.calories} kcal</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Dumbbell size={16} color="var(--accent-primary)" />
                    <span style={{ fontSize: '14px' }}>{meal.protein}g protein</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <span>{meal.carbs}g carbs</span>
                    <span>•</span>
                    <span>{meal.fat}g fat</span>
                  </div>
                </div>

                {meal.explanation && (
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{meal.explanation}"
                  </p>
                )}
                
                {meal.ingredients && meal.ingredients.length > 0 && (
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <strong>Ingredients detected:</strong> {meal.ingredients.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
