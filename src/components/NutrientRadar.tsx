import { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useNutrition } from '../context/NutritionContext';
import './Charts.css';

export default function NutrientRadar() {
  const { user, dailyCalories, hydration, vitalScore, meals } = useNutrition();

  const data = useMemo(() => {
    // Calculate today's macros
    const today = new Date().setHours(0, 0, 0, 0);
    const todaysMeals = meals.filter(m => new Date(m.timestamp).setHours(0, 0, 0, 0) === today);
    const dailyProtein = todaysMeals.reduce((sum, m) => sum + m.protein, 0);
    const dailyCarbs = todaysMeals.reduce((sum, m) => sum + m.carbs, 0);
    const dailyFat = todaysMeals.reduce((sum, m) => sum + m.fat, 0);

    // Rough estimates of "100%" marks
    const proteinTarget = user ? user.goalCalories * 0.25 / 4 : 150; // 25% cals from protein
    const carbsTarget = user ? user.goalCalories * 0.50 / 4 : 250; // 50% cals from carbs
    const fatTarget = user ? user.goalCalories * 0.25 / 9 : 65; // 25% cals from fat
    const hydrationTarget = user ? user.goalHydration : 2.5;

    return [
      { subject: 'Protein', A: Math.min(100, (dailyProtein / proteinTarget) * 100), fullMark: 100 },
      { subject: 'Carbs', A: Math.min(100, (dailyCarbs / carbsTarget) * 100), fullMark: 100 },
      { subject: 'Fat', A: Math.min(100, (dailyFat / fatTarget) * 100), fullMark: 100 },
      { subject: 'Hydration', A: Math.min(100, (hydration / hydrationTarget) * 100), fullMark: 100 },
      { subject: 'VitalScore', A: Math.min(100, Math.max(0, vitalScore)), fullMark: 100 },
      { subject: 'Calories', A: Math.min(100, (dailyCalories / (user?.goalCalories || 2000)) * 100), fullMark: 100 },
    ];
  }, [user, dailyCalories, hydration, vitalScore, meals]);
  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h3 className="title-sm">Current Day Balance</h3>
      </div>
      
      <div className="chart-container radar-container">
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar 
              name="Intake" 
              dataKey="A" 
              stroke="var(--accent-primary)" 
              fill="var(--accent-primary)" 
              fillOpacity={0.15} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
