import MetricCard from '../components/MetricCard';
import WeeklyTrendChart from '../components/WeeklyTrendChart';
import NutrientRadar from '../components/NutrientRadar';
import MealList from '../components/MealList';
import AiInsightCard from '../components/AiInsightCard';
import { ArrowUp } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="section-header">
        <h1 className="title-lg">Good Morning, Alex</h1>
        <p className="text-muted">Here's your nutritional intelligence for today.</p>
      </div>

      <div className="dashboard-grid top-row">
        <MetricCard 
          title="VitalScore Today" 
          value={<span className="score-lg">78</span>} 
          subtitle="VitalScore"
          footer={<span style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowUp size={14} /> +6 pts from yesterday</span>} 
        />
        <MetricCard 
          title="Calories" 
          value="1,840" 
          subtitle="of 2,200 kcal goal" 
          progress={84} 
        />
        <MetricCard 
          title="Hydration" 
          value="1.8L" 
          subtitle="of 2.5L goal" 
          progress={72} 
          progressColor="#38Bdf8"
        />
        <MetricCard 
          title="Streak" 
          value={<span style={{ color: 'var(--accent-secondary)' }}>12</span>} 
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
