import React from 'react';
import { Header } from '../shared/Header';
import { Sidebar } from '../shared/Sidebar';
import { DashboardOverview } from './DashboardOverview';
import { ActivityManager } from './ActivityManager';
import { PortfolioBuilder } from './PortfolioBuilder';
import { AchievementTracker } from './AchievementTracker';
import { useAuth } from '../../contexts/AuthContext';

interface StudentDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function StudentDashboard({ currentView, setCurrentView }: StudentDashboardProps) {
  const { user } = useAuth();

  const renderContent = () => {
    switch (currentView) {
      case 'activities':
        return <ActivityManager />;
      case 'portfolio':
        return <PortfolioBuilder onViewPortfolio={() => setCurrentView('portfolio')} />;
      case 'achievements':
        return <AchievementTracker />;
      case 'calendar':
        return <div className="p-6"><h2 className="text-2xl font-bold">Calendar View</h2><p className="text-gray-600 mt-2">Calendar integration coming soon...</p></div>;
      default:
        return <DashboardOverview onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        userRole={user?.role || 'student'} 
        activeView={currentView}
        onViewChange={setCurrentView}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Student Dashboard" />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}