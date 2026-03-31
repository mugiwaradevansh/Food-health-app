import { Plus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useNutrition } from '../context/NutritionContext';
import './MealList.css';

export default function MealList() {
  const { meals } = useNutrition();
  const { setIsMealLogOpen } = useOutletContext<any>();

  // Filter for today's meals
  const today = new Date().setHours(0, 0, 0, 0);
  const todaysMeals = meals.filter(m => new Date(m.timestamp).setHours(0, 0, 0, 0) === today)
                           .sort((a, b) => b.timestamp - a.timestamp); // newest first

  return (
    <div className="card meal-list-card">
      <div className="meal-list-header">
        <h3 className="title-sm">Today's Meals</h3>
        <button className="btn btn-ghost btn-sm" onClick={() => setIsMealLogOpen(true)}>
          <Plus size={14} className="mr-1" /> Log Meal
        </button>
      </div>

      <div className="meals-container">
        {todaysMeals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-secondary)' }}>
            No meals logged today.
          </div>
        ) : todaysMeals.map((meal, index) => {
          const hours = new Date(meal.timestamp).getHours();
          const isMorning = hours < 11;
          const isLunch = hours >= 11 && hours < 16;
          const mealType = isMorning ? "Breakfast" : isLunch ? "Lunch" : "Dinner";

          return (
            <div key={meal.id} className="meal-row">
              <div className="meal-icon-wrapper">
                <div className="meal-icon"></div>
              </div>
              
              <div className="meal-details">
                <div className="meal-title-row">
                  <span className="meal-type">{mealType}</span>
                  <span className="meal-time text-muted">
                    {new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="meal-description">{meal.name}</div>
                
                <div className="meal-meta">
                  <div className="macro-chips">P:{meal.protein}g  C:{meal.carbs}g  F:{meal.fat}g</div>
                  <div className={`score-badge ${meal.vitalScoreImpact >= 0 ? 'positive' : 'negative'}`}>
                    {meal.vitalScoreImpact > 0 ? '+' : ''}{meal.vitalScoreImpact} pts
                  </div>
                </div>
              </div>
              
              {index < todaysMeals.length - 1 && <div className="meal-divider" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
