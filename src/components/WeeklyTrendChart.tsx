import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Charts.css';

const data = [
  { day: 'Mon', Protein: 110, Carbs: 150, Fat: 60 },
  { day: 'Tue', Protein: 95, Carbs: 160, Fat: 65 },
  { day: 'Wed', Protein: 120, Carbs: 140, Fat: 55 },
  { day: 'Thu', Protein: 105, Carbs: 180, Fat: 70 },
  { day: 'Fri', Protein: 130, Carbs: 130, Fat: 50 },
  { day: 'Sat', Protein: 80, Carbs: 210, Fat: 85 },
  { day: 'Sun', Protein: 115, Carbs: 170, Fat: 60 },
];

export default function WeeklyTrendChart() {
  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h3 className="title-sm">Weekly Trends</h3>
        <span className="text-muted">Mar 25 – Mar 31</span>
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
