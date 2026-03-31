import { Plus } from 'lucide-react';
import './MealList.css';

interface Meal {
  id: string;
  type: string;
  time: string;
  description: string;
  macros: string;
  scoreImpact: number;
}

export default function MealList() {
  const meals: Meal[] = [
    {
      id: '1',
      type: 'Breakfast',
      time: '7:30am',
      description: 'Oats, Banana, Almonds',
      macros: 'P:12g  C:58g  F:8g',
      scoreImpact: 24,
    },
    {
      id: '2',
      type: 'Lunch',
      time: '1:00pm',
      description: 'Dal Rice, Curd, Salad',
      macros: 'P:22g  C:74g  F:6g',
      scoreImpact: 31,
    },
    {
      id: '3',
      type: 'Snack',
      time: '4:00pm',
      description: 'Biscuits, Chai',
      macros: 'P:3g  C:28g  F:9g',
      scoreImpact: -8,
    },
  ];

  return (
    <div className="card meal-list-card">
      <div className="meal-list-header">
        <h3 className="title-sm">Today's Meals</h3>
        <button className="btn btn-ghost btn-sm">
          <Plus size={14} className="mr-1" /> Log Meal
        </button>
      </div>

      <div className="meals-container">
        {meals.map((meal, index) => (
          <div key={meal.id} className="meal-row">
            <div className="meal-icon-wrapper">
              <div className="meal-icon"></div>
            </div>
            
            <div className="meal-details">
              <div className="meal-title-row">
                <span className="meal-type">{meal.type}</span>
                <span className="meal-time text-muted">{meal.time}</span>
              </div>
              <div className="meal-description">{meal.description}</div>
              
              <div className="meal-meta">
                <div className="macro-chips">{meal.macros}</div>
                <div className={`score-badge ${meal.scoreImpact >= 0 ? 'positive' : 'negative'}`}>
                  {meal.scoreImpact > 0 ? '+' : ''}{meal.scoreImpact} pts
                </div>
              </div>
            </div>
            
            {index < meals.length - 1 && <div className="meal-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}
