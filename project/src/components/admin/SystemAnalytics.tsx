import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Activity,
  Download,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';

export function SystemAnalytics() {
  // Mock comprehensive analytics data
  const overviewStats = [
    { title: 'Total Users', value: '2,456', change: '+5.2%', icon: Users },
    { title: 'Active Students', value: '2,180', change: '+3.8%', icon: Activity },
    { title: 'Faculty Members', value: '245', change: '+1.2%', icon: Users },
    { title: 'System Uptime', value: '99.8%', change: '+0.1%', icon: TrendingUp }
  ];

  const monthlyData = [
    { month: 'Jan', students: 2100, activities: 450, points: 12500 },
    { month: 'Feb', students: 2150, activities: 520, points: 14200 },
    { month: 'Mar', students: 2200, activities: 680, points: 18400 },
    { month: 'Apr', students: 2300, activities: 750, points: 21300 },
    { month: 'May', students: 2350, activities: 890, points: 25600 },
    { month: 'Jun', students: 2400, activities: 1020, points: 28900 }
  ];

  const departmentData = [
    { name: 'Computer Science', students: 650, activities: 1200, percentage: 35 },
    { name: 'Electrical Engineering', students: 580, activities: 980, percentage: 28 },
    { name: 'Mechanical Engineering', students: 520, activities: 850, percentage: 22 },
    { name: 'Civil Engineering', students: 480, activities: 720, percentage: 15 }
  ];

  const activityCategories = [
    { category: 'Academic', count: 450, percentage: 45 },
    { category: 'Extracurricular', count: 350, percentage: 35 },
    { category: 'Professional', count: 200, percentage: 20 }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive platform performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-6">
            {monthlyData.map((data, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{data.month}</span>
                  <span className="text-gray-600">{data.students} students</span>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Activities: {data.activities}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(data.activities / 1200) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Points: {data.points.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(data.points / 30000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                  <span className="text-sm text-gray-600">{dept.students} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 
                      index === 2 ? 'bg-purple-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{dept.activities} activities</span>
                  <span>{dept.percentage}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Category Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activityCategories.map((category, index) => (
            <div key={index} className="text-center">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                <span className={`text-2xl font-bold ${
                  index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : 'text-purple-600'
                }`}>
                  {category.percentage}%
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{category.category}</h4>
              <p className="text-sm text-gray-600">{category.count} activities</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <Award className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">28,450</div>
          <div className="text-sm text-gray-600">Total Points Awarded</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">87%</div>
          <div className="text-sm text-gray-600">Approval Rate</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">1,890</div>
          <div className="text-sm text-gray-600">Daily Active Users</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <Activity className="h-8 w-8 text-purple-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">3.2</div>
          <div className="text-sm text-gray-600">Avg Activities/Student</div>
        </div>
      </div>

      {/* Usage Patterns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Usage Patterns</h3>
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const usage = [85, 92, 78, 88, 95, 45, 32][index];
            return (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-3">{day}</div>
                <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-center p-2">
                  <div
                    className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    style={{ height: `${usage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{usage}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}