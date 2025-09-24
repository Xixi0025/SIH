import React from 'react';
import { Trophy, Award, Star, Target, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export function AchievementTracker() {
  const { user } = useAuth();
  const { activities } = useData();

  const userActivities = activities.filter(activity => activity.studentId === user?.id);
  const approvedActivities = userActivities.filter(activity => activity.status === 'approved');
  
  const totalPoints = approvedActivities.reduce((sum, activity) => sum + activity.points, 0);
  const categoryBreakdown = approvedActivities.reduce((acc, activity) => {
    acc[activity.category] = (acc[activity.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const badges = [
    {
      title: 'Early Achiever',
      description: 'First activity submitted',
      icon: Star,
      earned: userActivities.length > 0,
      color: 'bg-yellow-500'
    },
    {
      title: 'Academic Excellence',
      description: '5 academic activities approved',
      icon: Award,
      earned: categoryBreakdown.academic >= 5,
      color: 'bg-blue-500'
    },
    {
      title: 'Well Rounded',
      description: 'Activities in all categories',
      icon: Trophy,
      earned: Object.keys(categoryBreakdown).length === 3,
      color: 'bg-green-500'
    },
    {
      title: 'Point Master',
      description: '200+ achievement points',
      icon: Target,
      earned: totalPoints >= 200,
      color: 'bg-purple-500'
    }
  ];

  const milestones = [
    { points: 50, title: 'Bronze Level', achieved: totalPoints >= 50 },
    { points: 150, title: 'Silver Level', achieved: totalPoints >= 150 },
    { points: 300, title: 'Gold Level', achieved: totalPoints >= 300 },
    { points: 500, title: 'Platinum Level', achieved: totalPoints >= 500 }
  ];

  const nextMilestone = milestones.find(m => !m.achieved);
  const progressToNext = nextMilestone ? (totalPoints / nextMilestone.points) * 100 : 100;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievement Tracker</h1>
          <p className="text-gray-600">Monitor your progress and unlock new milestones</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{totalPoints}</div>
              <div className="text-blue-100">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{approvedActivities.length}</div>
              <div className="text-blue-100">Approved Activities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {milestones.filter(m => m.achieved).length}/{milestones.length}
              </div>
              <div className="text-blue-100">Milestones Reached</div>
            </div>
          </div>

          {nextMilestone && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-100">Progress to {nextMilestone.title}</span>
                <span className="text-blue-100">{totalPoints}/{nextMilestone.points} points</span>
              </div>
              <div className="w-full bg-blue-700 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Badges */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Badges Earned</h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      badge.earned
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className={`${badge.color} ${badge.earned ? '' : 'grayscale'} rounded-lg p-3 w-fit mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{badge.title}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    {badge.earned && (
                      <div className="flex items-center space-x-1 text-green-600 text-sm mt-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span>Earned</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Milestones</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg border-2 ${
                    milestone.achieved
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    milestone.achieved ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.points} points required</p>
                  </div>
                  {milestone.achieved && (
                    <div className="text-green-600">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Activity Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries({
              academic: { icon: '🎓', color: 'bg-blue-500' },
              extracurricular: { icon: '🏆', color: 'bg-green-500' },
              professional: { icon: '💼', color: 'bg-purple-500' }
            }).map(([category, config]) => (
              <div key={category} className="text-center">
                <div className="text-4xl mb-2">{config.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {categoryBreakdown[category] || 0}
                </div>
                <div className="text-gray-600 capitalize">{category}</div>
                <div className={`mt-2 h-2 rounded-full ${config.color} opacity-20`}>
                  <div
                    className={`h-full rounded-full ${config.color}`}
                    style={{
                      width: `${Math.min(((categoryBreakdown[category] || 0) / Math.max(...Object.values(categoryBreakdown), 1)) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Progress</h2>
          <div className="space-y-4">
            {approvedActivities.slice(0, 5).map((activity, index) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.category} • {new Date(activity.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+{activity.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}