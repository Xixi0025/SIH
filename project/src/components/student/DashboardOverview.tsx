import React from 'react';
import { 
  Trophy, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Award,
  BookOpen,
  Users,
  Calendar,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

interface DashboardOverviewProps {
  onViewChange: (view: string) => void;
}

export function DashboardOverview({ onViewChange }: DashboardOverviewProps) {
  const { user } = useAuth();
  const { activities } = useData();

  const userActivities = activities.filter(activity => activity.studentId === user?.id);
  const approvedActivities = userActivities.filter(activity => activity.status === 'approved');
  const pendingActivities = userActivities.filter(activity => activity.status === 'pending');
  const totalPoints = approvedActivities.reduce((sum, activity) => sum + activity.points, 0);

  const stats = [
    {
      title: 'Total Activities',
      value: userActivities.length,
      icon: Trophy,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Approved',
      value: approvedActivities.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      title: 'Pending Review',
      value: pendingActivities.length,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '0%'
    },
    {
      title: 'Achievement Points',
      value: totalPoints,
      icon: Award,
      color: 'bg-purple-500',
      trend: '+15%'
    }
  ];

  const recentActivities = userActivities.slice(0, 3);
  const skillsProgress = [
    { skill: 'Technical Skills', progress: 78 },
    { skill: 'Leadership', progress: 65 },
    { skill: 'Communication', progress: 82 },
    { skill: 'Problem Solving', progress: 71 }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-blue-100 text-lg">
              {user?.department} • {user?.batch} • Roll: {user?.rollNumber}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-white" />
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
                <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
              <button
                onClick={() => onViewChange('activities')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'approved' ? 'bg-green-500' :
                    activity.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.category} • {activity.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{activity.points} pts</span>
                    <p className={`text-xs capitalize ${
                      activity.status === 'approved' ? 'text-green-600' :
                      activity.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {activity.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
                <p className="text-gray-600 mb-4">Start adding your achievements and activities</p>
                <button
                  onClick={() => onViewChange('activities')}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Activity</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Skills Progress</h2>
          </div>
          <div className="p-6 space-y-6">
            {skillsProgress.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                  <span className="text-sm text-gray-600">{skill.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => onViewChange('activities')}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-lg p-3 group-hover:bg-blue-200 transition-colors">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Add New Activity</h3>
              <p className="text-gray-600 text-sm">Submit your latest achievement</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onViewChange('portfolio')}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 rounded-lg p-3 group-hover:bg-green-200 transition-colors">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Generate Portfolio</h3>
              <p className="text-gray-600 text-sm">Create your digital showcase</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onViewChange('achievements')}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 rounded-lg p-3 group-hover:bg-purple-200 transition-colors">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">View Achievements</h3>
              <p className="text-gray-600 text-sm">Track your progress</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}