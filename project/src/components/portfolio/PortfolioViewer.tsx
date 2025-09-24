import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  Share, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  Award,
  Star,
  ExternalLink,
  Github,
  Linkedin
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

interface PortfolioViewerProps {
  onBack: () => void;
}

export function PortfolioViewer({ onBack }: PortfolioViewerProps) {
  const { user } = useAuth();
  const { activities } = useData();

  const userActivities = activities.filter(activity => 
    activity.studentId === user?.id && activity.status === 'approved'
  );

  const totalPoints = userActivities.reduce((sum, activity) => sum + activity.points, 0);
  const skillsSet = new Set(userActivities.flatMap(activity => activity.skills));
  const uniqueSkills = Array.from(skillsSet);

  const categoryStats = userActivities.reduce((acc, activity) => {
    acc[activity.category] = (acc[activity.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white">
            <div className="flex items-center space-x-8">
              <div className="h-32 w-32 bg-white/20 rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-28 w-28 rounded-full object-cover border-4 border-white/30"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
                <p className="text-xl text-blue-100 mb-4">
                  {user?.department} • {user?.batch}
                </p>
                <div className="flex items-center space-x-6 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>{totalPoints} Achievement Points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userActivities.length}</div>
                <div className="text-sm text-gray-600">Verified Activities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
                <div className="text-sm text-gray-600">Achievement Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{uniqueSkills.length}</div>
                <div className="text-sm text-gray-600">Skills Demonstrated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{Object.keys(categoryStats).length}</div>
                <div className="text-sm text-gray-600">Activity Categories</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* About Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                Dedicated {user?.department} student with a strong passion for learning and innovation. 
                Actively engaged in academic pursuits, extracurricular activities, and professional development. 
                Committed to excellence and continuous improvement in all endeavors.
              </p>
            </section>

            {/* Skills Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Competencies</h2>
              <div className="flex flex-wrap gap-3">
                {uniqueSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements & Activities</h2>
              <div className="space-y-8">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize flex items-center">
                      <span className="mr-2">
                        {category === 'academic' ? '🎓' : 
                         category === 'extracurricular' ? '🏆' : '💼'}
                      </span>
                      {category} Activities ({count})
                    </h3>
                    <div className="grid gap-4">
                      {userActivities
                        .filter(activity => activity.category === category)
                        .map((activity) => (
                          <div key={activity.id} className="bg-gray-50 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                              <div className="flex items-center space-x-1">
                                <Award className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-medium text-yellow-600">
                                  {activity.points} pts
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{activity.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(activity.date).toLocaleDateString()}</span>
                                </div>
                                <div>Duration: {activity.duration}</div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-green-500" />
                                <span className="text-green-600 font-medium">Verified</span>
                              </div>
                            </div>
                            {activity.skills.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {activity.skills.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-white text-gray-600 text-xs rounded-full border"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recognition Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recognition & Milestones</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Top Performer</h3>
                  <p className="text-sm text-gray-600 mt-1">High achievement score</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Well Rounded</h3>
                  <p className="text-sm text-gray-600 mt-1">Activities in all categories</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Early Achiever</h3>
                  <p className="text-sm text-gray-600 mt-1">First activity submitted</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                This portfolio was generated automatically by Smart Student Hub
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Verified and authenticated • Generated on {new Date().toLocaleDateString()}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}