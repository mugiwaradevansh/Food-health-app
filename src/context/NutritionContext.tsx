import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { MealAnalysis } from '../lib/gemini';

export interface UserProfile {
  name: string;
  age: string;
  goalCalories: number;
  goalHydration: number;
}

export interface LoggedMeal extends MealAnalysis {
  id: string;
  timestamp: number;
}

interface NutritionContextType {
  user: UserProfile | null;
  setUserProfile: (name: string, age: string) => void;
  meals: LoggedMeal[];
  logMeal: (meal: MealAnalysis) => void;
  vitalScore: number;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  streak: number;
  hydration: number;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export function NutritionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('vitalplate_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [meals, setMeals] = useState<LoggedMeal[]>(() => {
    const saved = localStorage.getItem('vitalplate_meals');
    return saved ? JSON.parse(saved) : [];
  });

  const [vitalScore, setVitalScore] = useState(70);
  const [streak] = useState(12); // Mock streak for now
  const [hydration] = useState(1.8); // Mock hydration for now

  // Persist to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('vitalplate_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vitalplate_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vitalplate_meals', JSON.stringify(meals));
    
    // Recalculate vital score based on today's meals
    let baseScore = 70;
    const today = new Date().setHours(0, 0, 0, 0);
    const todaysMeals = meals.filter(m => new Date(m.timestamp).setHours(0, 0, 0, 0) === today);
    
    todaysMeals.forEach(meal => {
      baseScore += meal.vitalScoreImpact || 0;
    });
    
    setVitalScore(Math.min(100, Math.max(0, baseScore)));
  }, [meals]);

  const setUserProfile = (name: string, age: string) => {
    // Basic calculation for calorie goal
    const ageNum = parseInt(age, 10) || 30;
    const goalCalories = 2200 - (ageNum > 40 ? 200 : 0); // simplistic formula
    setUser({ name, age, goalCalories, goalHydration: 2.5 });
  };

  const logMeal = (meal: MealAnalysis) => {
    const newMeal: LoggedMeal = {
      ...meal,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    setMeals(prev => [newMeal, ...prev]);
  };

  const today = new Date().setHours(0, 0, 0, 0);
  const todaysMeals = meals.filter(m => new Date(m.timestamp).setHours(0, 0, 0, 0) === today);

  const dailyCalories = todaysMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const dailyProtein = todaysMeals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
  const dailyCarbs = todaysMeals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
  const dailyFat = todaysMeals.reduce((sum, meal) => sum + (meal.fat || 0), 0);

  return (
    <NutritionContext.Provider value={{
      user,
      setUserProfile,
      meals,
      logMeal,
      vitalScore,
      dailyCalories,
      dailyProtein,
      dailyCarbs,
      dailyFat,
      streak,
      hydration
    }}>
      {children}
    </NutritionContext.Provider>
  );
}

export function useNutrition() {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
}
