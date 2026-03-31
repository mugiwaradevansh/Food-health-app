import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MealLogModal from '../components/MealLogModal';
import AiCoachDrawer from '../components/AiCoachDrawer';
import './AppLayout.css';

export default function AppLayout() {
  const [isMealLogOpen, setIsMealLogOpen] = useState(false);
  const [isAiCoachOpen, setIsAiCoachOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar 
        onOpenMealLog={() => setIsMealLogOpen(true)}
        onOpenAiCoach={() => setIsAiCoachOpen(true)}
      />
      
      <main className="main-content">
        <Outlet context={{ setIsMealLogOpen, setIsAiCoachOpen }} />
      </main>

      {isMealLogOpen && <MealLogModal onClose={() => setIsMealLogOpen(false)} />}
      <AiCoachDrawer isOpen={isAiCoachOpen} onClose={() => setIsAiCoachOpen(false)} />
    </div>
  );
}
