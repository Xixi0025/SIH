import React from 'react';
import { Header } from '../shared/Header';
import { Sidebar } from '../shared/Sidebar';
import { AdminOverview } from './AdminOverview';
import { SystemAnalytics } from './SystemAnalytics';
import { ReportsManager } from './ReportsManager';
import { UserManagement } from './UserManagement';
import { SystemSettings } from './SystemSettings';
import { useAuth } from '../../contexts/AuthContext';

interface AdminDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function AdminDashboard({ currentView, setCurrentView }: AdminDashboardProps) {
  const { user } = useAuth();

  const renderContent = () => {
    switch (currentView) {
      case 'analytics':
        return <SystemAnalytics />;
      case 'reports':
        return <ReportsManager />;
      case 'users':
        return <UserManagement />;
      case 'system':
        return <SystemSettings />;
      default:
        return <AdminOverview onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        userRole={user?.role || 'admin'} 
        activeView={currentView}
        onViewChange={setCurrentView}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Admin Dashboard" />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}