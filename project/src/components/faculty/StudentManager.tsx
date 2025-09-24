import React, { useState } from 'react';
import { User, Search, Award, TrendingUp, Calendar, Mail, Phone } from 'lucide-react';

export function StudentManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');

  // Mock student data
  const students = [
    {
      id: '1',
      name: 'John Smith',
      rollNumber: 'CS21001',
      email: 'john.student@university.edu',
      batch: '2021-2025',
      totalActivities: 3,
      approvedActivities: 2,
      totalPoints: 150,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Emily Davis',
      rollNumber: 'CS21002',
      email: 'emily.student@university.edu',
      batch: '2021-2025',
      totalActivities: 5,
      approvedActivities: 4,
      totalPoints: 280,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      rollNumber: 'CS22001',
      email: 'michael.student@university.edu',
      batch: '2022-2026',
      totalActivities: 2,
      approvedActivities: 1,
      totalPoints: 75,
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || student.batch === selectedBatch;
    return matchesSearch && matchesBatch;
  });

  const getPerformanceLevel = (points: number) => {
    if (points >= 250) return { level: 'Excellent', color: 'text-green-600' };
    if (points >= 150) return { level: 'Good', color: 'text-blue-600' };
    if (points >= 50) return { level: 'Average', color: 'text-yellow-600' };
    return { level: 'Needs Improvement', color: 'text-red-600' };
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Monitor student progress and performance</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Batches</option>
            <option value="2021-2025">2021-2025</option>
            <option value="2022-2026">2022-2026</option>
            <option value="2023-2027">2023-2027</option>
          </select>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const performance = getPerformanceLevel(student.totalPoints);
          const approvalRate = student.totalActivities > 0 
            ? Math.round((student.approvedActivities / student.totalActivities) * 100) 
            : 0;

          return (
            <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Student Header */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.rollNumber} • {student.batch}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${performance.color}`}>
                    {performance.level}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{student.totalActivities}</div>
                  <div className="text-xs text-gray-600">Activities</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{student.approvedActivities}</div>
                  <div className="text-xs text-gray-600">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{student.totalPoints}</div>
                  <div className="text-xs text-gray-600">Points</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Approval Rate</span>
                  <span className="font-medium">{approvalRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${approvalRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{student.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    View Profile
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedBatch !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'No students are currently enrolled'
            }
          </p>
        </div>
      )}
    </div>
  );
}