import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';

export function FacultyAnalytics() {
  // Mock analytics data
  const monthlyData = [
    { month: 'Jan', submissions: 12, approvals: 10 },
    { month: 'Feb', submissions: 18, approvals: 15 },
    { month: 'Mar', submissions: 24, approvals: 20 },
    { month: 'Apr', submissions: 16, approvals: 14 },
    { month: 'May', submissions: 30, approvals: 25 },
    { month: 'Jun', submissions: 35, approvals: 28 }
  ];

  const categoryData = [
    { category: 'Academic', count: 45, percentage: 50 },
    { category: 'Extracurricular', count: 30, percentage: 33 },
    { category: 'Professional', count: 15, percentage: 17 }
  ];

  const topStudents = [
    { name: 'Emily Davis', activities: 12, points: 320 },
    { name: 'John Smith', activities: 8, points: 250 },
    { name: 'Michael Johnson', activities: 6, points: 180 }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Track student engagement and department performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">135</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approval Rate</p>
              <p className="text-2xl font-bold text-gray-900">84%</p>
              <p className="text-sm text-green-600">+3% improvement</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
              <p className="text-sm text-blue-600">CS Department</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Points Awarded</p>
              <p className="text-2xl font-bold text-gray-900">2,450</p>
              <p className="text-sm text-purple-600">This semester</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Submissions & Approvals</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="text-sm text-gray-600">Submissions: {data.submissions}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(data.submissions / 40) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="text-sm text-gray-600">Approvals: {data.approvals}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(data.approvals / 40) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Categories</h3>
          <div className="space-y-6">
            {categoryData.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{category.category}</span>
                  <span className="text-sm text-gray-600">{category.count} activities</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{category.percentage}% of total</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Students</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topStudents.map((student, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">#{index + 1}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{student.name}</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{student.activities} Activities</p>
                <p className="font-medium text-blue-600">{student.points} Points</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">This Week's Activity</h3>
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const activities = Math.floor(Math.random() * 8) + 1;
            return (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
                <div className="h-20 bg-gray-100 rounded-lg flex items-end justify-center p-2">
                  <div
                    className="w-6 bg-blue-500 rounded-t"
                    style={{ height: `${(activities / 8) * 100}%`, minHeight: '4px' }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{activities}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}