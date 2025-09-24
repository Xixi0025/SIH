import React from 'react';
import { 
  CheckSquare, 
  Users, 
  Clock, 
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

interface FacultyOverviewProps {
  onViewChange: (view: string) => void;
}

export function FacultyOverview({ onViewChange }: FacultyOverviewProps) {
  const { user } = useAuth();
  const { activities } = useData();

  const pendingActivities = activities.filter(activity => activity.status === 'pending');
  const approvedActivities = activities.filter(activity => activity.status === 'approved');
  const rejectedActivities = activities.filter(activity => activity.status === 'rejected');

  const stats = [
    {
      title: 'Pending Reviews',
      value: pendingActivities.length,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '+3 today'
    },
    {
      title: 'Approved This Week',
      value: approvedActivities.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '+12 this week'
    },
    {
      title: 'Total Students',
      value: 45,
      icon: Users,
      color: 'bg-blue-500',
      trend: 'CS Department'
    },
    {
      title: 'Points Awarded',
      value: approvedActivities.reduce((sum, activity) => sum + activity.points, 0),
      icon: Award,
      color: 'bg-purple-500',
      trend: '+85 this month'
    }
  ];

  const recentSubmissions = activities.slice(0, 5);

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-indigo-100 text-lg">
              Faculty • {user?.department}
            </p>
            <p className="text-indigo-200 text-sm mt-1">
              Review student activities and track departmental progress
            </p>
          </div>
          <div className="hidden md:block">
            <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center">
              <CheckSquare className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-gray-500 text-sm">{stat.trend}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Reviews */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Pending Reviews</h2>
              <button
                onClick={() => onViewChange('approvals')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>Review All</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {pendingActivities.length > 0 ? (
              pendingActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.category} • {activity.date}</p>
                    <p className="text-sm text-gray-500 mt-1">Student: John Smith</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{activity.points} pts</span>
                    <p className="text-xs text-yellow-600">Awaiting review</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">No pending reviews at the moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <button
              onClick={() => onViewChange('approvals')}
              className="w-full flex items-center space-x-3 p-4 text-left bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors"
            >
              <div className="bg-yellow-500 rounded-lg p-2">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Review Submissions</h3>
                <p className="text-sm text-gray-600">{pendingActivities.length} pending</p>
              </div>
            </button>

            <button
              onClick={() => onViewChange('students')}
              className="w-full flex items-center space-x-3 p-4 text-left bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <div className="bg-blue-500 rounded-lg p-2">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Manage Students</h3>
                <p className="text-sm text-gray-600">View student profiles</p>
              </div>
            </button>

            <button
              onClick={() => onViewChange('analytics')}
              className="w-full flex items-center space-x-3 p-4 text-left bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
            >
              <div className="bg-green-500 rounded-lg p-2">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Track progress</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Review Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Review Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{approvedActivities.length}</div>
            <div className="text-sm text-green-800">Approved</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{pendingActivities.length}</div>
            <div className="text-sm text-yellow-800">Pending</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{rejectedActivities.length}</div>
            <div className="text-sm text-red-800">Rejected</div>
          </div>
        </div>
      </div>
    </div>
  );
}