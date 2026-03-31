import MetricCard from '../components/MetricCard';
import WeeklyTrendChart from '../components/WeeklyTrendChart';
import NutrientRadar from '../components/NutrientRadar';
import MealList from '../components/MealList';
import AiInsightCard from '../components/AiInsightCard';
import { ArrowUp } from 'lucide-react';
import { useNutrition } from '../context/NutritionContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, vitalScore, dailyCalories, hydration, streak } = useNutrition();

  return (
    <div className="dashboard">
      <div className="section-header">
        <h1 className="title-lg">Good Morning, {user?.name || 'User'}</h1>
        <p className="text-muted">Here's your nutritional intelligence for today.</p>
      </div>

      <div className="dashboard-grid top-row">
        <MetricCard 
          title="VitalScore Today" 
          value={<span className="score-lg">{vitalScore}</span>} 
          subtitle="VitalScore"
          footer={<span style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowUp size={14} /> Based on your meal history</span>} 
        />
        <MetricCard 
          title="Calories" 
          value={dailyCalories.toLocaleString()} 
          subtitle={`of ${user?.goalCalories.toLocaleString() || 2200} kcal goal`} 
          progress={Math.min(100, Math.round((dailyCalories / (user?.goalCalories || 2200)) * 100))} 
        />
        <MetricCard 
          title="Hydration" 
          value={`${hydration}L`} 
          subtitle={`of ${user?.goalHydration || 2.5}L goal`} 
          progress={Math.min(100, Math.round((hydration / (user?.goalHydration || 2.5)) * 100))} 
          progressColor="#38Bdf8"
        />
        <MetricCard 
          title="Streak" 
          value={<span style={{ color: 'var(--accent-secondary)' }}>{streak}</span>} 
          subtitle="day streak"
          footer={
            <div className="streak-dots">
              <div className="dot green"></div>
              <div className="dot green"></div>
              <div className="dot green"></div>
              <div className="dot green"></div>
              <div className="dot green"></div>
              <div className="dot amber"></div>
              <div className="dot empty"></div>
            </div>
          } 
        />
      </div>

      <div className="dashboard-grid middle-row">
        <div className="col-1">
          <WeeklyTrendChart />
        </div>
        <div className="col-2">
          <NutrientRadar />
        </div>
      </div>

      <div className="dashboard-grid bottom-row">
        <div className="col-1">
          <MealList />
        </div>
        <div className="col-2">
          <AiInsightCard />
        </div>
      </div>
    </div>
  );
}
