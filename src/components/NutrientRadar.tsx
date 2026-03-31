import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import './Charts.css';

const data = [
  { subject: 'Protein', A: 85, fullMark: 100 },
  { subject: 'Iron', A: 70, fullMark: 100 },
  { subject: 'Vit C', A: 90, fullMark: 100 },
  { subject: 'Omega-3', A: 65, fullMark: 100 },
  { subject: 'Calcium', A: 80, fullMark: 100 },
  { subject: 'Fiber', A: 75, fullMark: 100 },
];

export default function NutrientRadar() {
  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h3 className="title-sm">This Week's Nutrients</h3>
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
