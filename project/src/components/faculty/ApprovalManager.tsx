import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  Award,
  FileText,
  Filter,
  Search
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export function ApprovalManager() {
  const { activities, updateActivity } = useData();
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.status === filter;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (activityId: string, comments?: string) => {
    updateActivity(activityId, {
      status: 'approved',
      reviewedBy: 'Dr. Sarah Wilson',
      reviewDate: new Date().toISOString(),
      reviewComments: comments || 'Activity approved.'
    });
    setSelectedActivity(null);
  };

  const handleReject = (activityId: string, comments: string) => {
    updateActivity(activityId, {
      status: 'rejected',
      reviewedBy: 'Dr. Sarah Wilson',
      reviewDate: new Date().toISOString(),
      reviewComments: comments
    });
    setSelectedActivity(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '🎓';
      case 'extracurricular': return '🏆';
      case 'professional': return '💼';
      default: return '📋';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Approvals</h1>
          <p className="text-gray-600 mt-1">Review and approve student submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="grid gap-6">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getCategoryIcon(activity.category)}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                          <p className="text-gray-600 mt-1">{activity.description}</p>
                          <p className="text-sm text-blue-600 mt-1">Student: John Smith • CS21001</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Award className="h-4 w-4" />
                          <span>{activity.points} points</span>
                        </div>
                      </div>

                      {activity.skills.length > 0 && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {activity.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {activity.reviewComments && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Review:</strong> {activity.reviewComments}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Reviewed on {activity.reviewDate && new Date(activity.reviewDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {activity.status === 'pending' && (
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-3">
                    <button
                      onClick={() => handleApprove(activity.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => setSelectedActivity(activity)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'All activities have been reviewed'
              }
            </p>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Activity</h3>
            <p className="text-gray-600 mb-4">
              Please provide feedback for rejecting "{selectedActivity.title}":
            </p>
            <textarea
              placeholder="Reason for rejection..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              id="rejection-reason"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedActivity(null)}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const textarea = document.getElementById('rejection-reason') as HTMLTextAreaElement;
                  handleReject(selectedActivity.id, textarea.value || 'Activity rejected.');
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}