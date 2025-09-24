import React from 'react';
import { 
  Users, 
  Award, 
  TrendingUp, 
  FileText,
  BarChart3,
  Settings,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface AdminOverviewProps {
  onViewChange: (view: string) => void;
}

export function AdminOverview({ onViewChange }: AdminOverviewProps) {
  const { activities } = useData();

  const totalActivities = activities.length;
  const approvedActivities = activities.filter(activity => activity.status === 'approved').length;
  const pendingActivities = activities.filter(activity => activity.status === 'pending').length;
  const totalPoints = activities.filter(activity => activity.status === 'approved')
    .reduce((sum, activity) => sum + activity.points, 0);

  const stats = [
    {
      title: 'Total Students',
      value: '2,456',
      icon: Users,
      color: 'bg-blue-500',
      trend: '+5.2%',
      subtitle: 'Active students'
    },
    {
      title: 'Total Activities',
      value: totalActivities.toString(),
      icon: Award,
      color: 'bg-green-500',
      trend: '+12.3%',
      subtitle: 'This semester'
    },
    {
      title: 'Points Awarded',
      value: totalPoints.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-purple-500',
      trend: '+8.7%',
      subtitle: 'Achievement points'
    },
    {
      title: 'Pending Reviews',
      value: pendingActivities.toString(),
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '-2.1%',
      subtitle: 'Awaiting approval'
    }
  ];

  const quickActions = [
    {
      title: 'Generate NAAC Report',
      description: 'Export comprehensive compliance report',
      icon: FileText,
      color: 'bg-blue-500',
      action: () => onViewChange('reports')
    },
    {
      title: 'System Analytics',
      description: 'View detailed usage statistics',
      icon: BarChart3,
      color: 'bg-green-500',
      action: () => onViewChange('analytics')
    },
    {
      title: 'User Management',
      description: 'Manage student and faculty accounts',
      icon: Users,
      color: 'bg-purple-500',
      action: () => onViewChange('users')
    },
    {
      title: 'System Settings',
      description: 'Configure platform preferences',
      icon: Settings,
      color: 'bg-gray-500',
      action: () => onViewChange('system')
    }
  ];

  const recentActivities = activities.slice(0, 5);
  const systemAlerts = [
    { type: 'info', message: 'System backup completed successfully', time: '2 hours ago' },
    { type: 'warning', message: 'High activity volume detected', time: '4 hours ago' },
    { type: 'success', message: '50 new student registrations', time: '1 day ago' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-indigo-100 text-lg">
              System overview and management tools
            </p>
          </div>
          <div className="hidden md:block">
            <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center">
              <BarChart3 className="h-10 w-10 text-white" />
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
              <p className="text-gray-500 text-xs mt-1">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-left group"
                  >
                    <div className={`${action.color} rounded-lg p-3 group-hover:scale-105 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">System Alerts</h2>
          </div>
          <div className="p-6 space-y-4">
            {systemAlerts.map((alert, index) => {
              const getAlertIcon = (type: string) => {
                switch (type) {
                  case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
                  case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
                  case 'info': return <Clock className="h-5 w-5 text-blue-500" />;
                  default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
                }
              };

              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              );
            })}
            <button className="w-full text-center text-blue-600 text-sm font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors">
              View All Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent System Activity</h2>
            <button
              onClick={() => onViewChange('analytics')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'approved' ? 'bg-green-500' :
                    activity.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">
                      {activity.category} • Student submission
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                  <p className={`text-xs capitalize ${
                    activity.status === 'approved' ? 'text-green-600' :
                    activity.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Approval Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round((approvedActivities / totalActivities) * 100)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(approvedActivities / totalActivities) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
            <div className="text-sm text-gray-600">Uptime</div>
            <div className="flex items-center justify-center mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-600">All systems operational</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Storage Usage</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">67%</div>
            <div className="text-sm text-gray-600">Used</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}