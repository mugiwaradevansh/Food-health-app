import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import HistoryPage from './pages/History';
import { NutritionProvider, useNutrition } from './context/NutritionContext';
import './App.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useNutrition();
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <NutritionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="meals" element={<HistoryPage />} />
            <Route path="analytics" element={<Dashboard />} />
            <Route path="plan" element={<Dashboard />} />
            <Route path="settings" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </NutritionProvider>
  );
}

export default App;
