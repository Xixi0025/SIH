import React from 'react';
import { Header } from '../shared/Header';
import { Sidebar } from '../shared/Sidebar';
import { FacultyOverview } from './FacultyOverview';
import { ApprovalManager } from './ApprovalManager';
import { StudentManager } from './StudentManager';
import { FacultyAnalytics } from './FacultyAnalytics';
import { useAuth } from '../../contexts/AuthContext';

interface FacultyDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function FacultyDashboard({ currentView, setCurrentView }: FacultyDashboardProps) {
  const { user } = useAuth();

  const renderContent = () => {
    switch (currentView) {
      case 'approvals':
        return <ApprovalManager />;
      case 'students':
        return <StudentManager />;
      case 'analytics':
        return <FacultyAnalytics />;
      default:
        return <FacultyOverview onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        userRole={user?.role || 'faculty'} 
        activeView={currentView}
        onViewChange={setCurrentView}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Faculty Dashboard" />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}