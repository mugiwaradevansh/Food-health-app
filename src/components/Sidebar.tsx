import { NavLink } from 'react-router-dom';
import { LayoutGrid, UtensilsCrossed, BarChart2, Calendar, MessageSquare, Settings, Activity } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  onOpenAiCoach: () => void;
  onOpenMealLog: () => void;
}

export default function Sidebar({ onOpenAiCoach, onOpenMealLog }: SidebarProps) {
  const navItems = [
    { icon: LayoutGrid, path: '/dashboard', label: 'Dashboard', id: 'dashboard' },
    { icon: UtensilsCrossed, action: onOpenMealLog, label: 'Meal Log', id: 'meals' },
    { icon: BarChart2, path: '/dashboard/analytics', label: 'Analytics', id: 'analytics' },
    { icon: Calendar, path: '/dashboard/plan', label: 'Meal Plan', id: 'plan' },
    { icon: MessageSquare, action: onOpenAiCoach, label: 'AI Coach', id: 'coach' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo-container">
          {/* Custom logo composed of a leaf and chart, here represented by Activity as placeholder */}
          <Activity size={32} color="var(--accent-primary)" />
        </div>
        <nav className="nav-links">
          {navItems.map((item) => {
            if (item.action) {
              return (
                <div key={item.id} className="nav-item-wrapper tooltip-right" data-tooltip={item.label}>
                  <button className="nav-item btn-clear" onClick={item.action}>
                    <item.icon size={22} className="nav-icon" />
                  </button>
                </div>
              );
            }

            return (
              <div key={item.id} className="nav-item-wrapper tooltip-right" data-tooltip={item.label}>
                <NavLink
                  to={item.path as string}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  <item.icon size={22} className="nav-icon" />
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="sidebar-bottom">
        <div className="nav-item-wrapper tooltip-right" data-tooltip="Settings">
          <NavLink to="/dashboard/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={22} className="nav-icon" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
