import React from 'react';
import { 
  Home, 
  Trophy, 
  FileText, 
  BarChart3, 
  Users, 
  CheckSquare, 
  Settings,
  Award,
  BookOpen,
  Calendar
} from 'lucide-react';

interface SidebarProps {
  userRole: string;
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ userRole, activeView, onViewChange }: SidebarProps) {
  const getMenuItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'activities', label: 'My Activities', icon: Trophy },
          { id: 'portfolio', label: 'Portfolio', icon: FileText },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'achievements', label: 'Achievements', icon: Award }
        ];
      case 'faculty':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'approvals', label: 'Pending Approvals', icon: CheckSquare },
          { id: 'students', label: 'My Students', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 }
        ];
      case 'admin':
      case 'super_admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'system', label: 'System Settings', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white w-64 min-h-screen border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Smart Hub</h2>
            <p className="text-xs text-gray-500 capitalize">{userRole} Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Student Hub v2.1</p>
          <p>University Portal</p>
        </div>
      </div>
    </div>
  );
}