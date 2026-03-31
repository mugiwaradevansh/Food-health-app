import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          {/* We can map other paths to Dashboard for now to keep it simple */}
          <Route path="meals" element={<Dashboard />} />
          <Route path="analytics" element={<Dashboard />} />
          <Route path="plan" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
