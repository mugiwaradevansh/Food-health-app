import type { ReactNode } from 'react';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string | ReactNode;
  subtitle?: string | ReactNode;
  progress?: number;
  progressColor?: string;
  footer?: ReactNode;
}

export default function MetricCard({ title, value, subtitle, progress, progressColor = 'var(--accent-primary)', footer }: MetricCardProps) {
  return (
    <div className="card metric-card">
      <h3 className="text-muted">{title}</h3>
      <div className="metric-content">
        <div className="metric-value-group">
          <div className="metric-value">{value}</div>
          {subtitle && <div className="metric-subtitle text-muted">{subtitle}</div>}
        </div>
        
        {progress !== undefined && (
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${progress}%`,
                backgroundColor: progressColor 
              }} 
            />
          </div>
        )}
        
        {footer && <div className="metric-footer">{footer}</div>}
      </div>
    </div>
  );
}
