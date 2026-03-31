import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNutrition } from '../context/NutritionContext';
import './Charts.css';

export default function WeeklyTrendChart() {
  const { meals } = useNutrition();

  const data = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() - i);
      const dayName = days[targetDate.getDay()];
      
      const daysMeals = meals.filter(m => {
        const mDate = new Date(m.timestamp);
        return mDate.setHours(0, 0, 0, 0) === targetDate.getTime();
      });

      const protein = daysMeals.reduce((sum, m) => sum + m.protein, 0);
      const carbs = daysMeals.reduce((sum, m) => sum + m.carbs, 0);
      const fat = daysMeals.reduce((sum, m) => sum + m.fat, 0);

      result.push({
        day: dayName,
        Protein: protein,
        Carbs: carbs,
        Fat: fat
      });
    }

    // Add some dummy data if empty so the chart isn't completely blank for new users
    if (result.every(d => d.Protein === 0 && d.Carbs === 0 && d.Fat === 0)) {
       return [
         { day: 'Mon', Protein: 110, Carbs: 150, Fat: 60 },
         { day: 'Tue', Protein: 95, Carbs: 160, Fat: 65 },
         { day: 'Wed', Protein: 120, Carbs: 140, Fat: 55 },
         { day: 'Thu', Protein: 105, Carbs: 180, Fat: 70 },
         { day: 'Fri', Protein: 130, Carbs: 130, Fat: 50 },
         { day: 'Sat', Protein: 80, Carbs: 210, Fat: 85 },
         { day: 'Sun', Protein: 115, Carbs: 170, Fat: 60 },
       ];
    }
    
    return result;
  }, [meals]);

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h3 className="title-sm">Weekly Macro Trends (Actual)</h3>
        <span className="text-muted">Last 7 Days</span>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--accent-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-primary)', fontSize: '13px' }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '10px 0 0' }} 
              iconType="circle" 
              iconSize={8} 
            />
            <Bar dataKey="Protein" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Carbs" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Fat" fill="var(--accent-warning)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
