import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { StudentDashboard } from './components/student/StudentDashboard';
import { FacultyDashboard } from './components/faculty/FacultyDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PortfolioViewer } from './components/portfolio/PortfolioViewer';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import './index.css';

function AppContent() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  const renderDashboard = () => {
    if (!user) return <LoginForm />;

    switch (user.role) {
      case 'student':
        return <StudentDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      case 'faculty':
        return <FacultyDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      case 'admin':
      case 'super_admin':
        return <AdminDashboard currentView={currentView} setCurrentView={setCurrentView} />;
      default:
        return <LoginForm />;
    }
  };

  if (currentView === 'portfolio' && user) {
    return <PortfolioViewer onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;