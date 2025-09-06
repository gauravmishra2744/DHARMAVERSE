import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import Header from '../components/Header';

const AchievementsPage = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadAchievements();
    loadStats();
  }, [user]);

  const loadAchievements = () => {
    const allAchievements = [
      {
        id: 1,
        title: "First Steps",
        description: "Complete your first spiritual question",
        icon: "🌱",
        category: "beginner",
        points: 50,
        unlocked: true,
        unlockedAt: "2024-01-15",
        progress: 100,
        requirement: "Ask 1 question"
      },
      {
        id: 2,
        title: "Seeker of Truth",
        description: "Ask 10 spiritual questions",
        icon: "🔍",
        category: "questions",
        points: 100,
        unlocked: user?.karmaPoints >= 100,
        unlockedAt: user?.karmaPoints >= 100 ? "2024-01-20" : null,
        progress: Math.min((user?.karmaPoints || 0) / 10, 100),
        requirement: "Ask 10 questions"
      },
      {
        id: 3,
        title: "Wisdom Collector",
        description: "Earn 500 karma points",
        icon: "💎",
        category: "karma",
        points: 200,
        unlocked: (user?.karmaPoints || 0) >= 500,
        unlockedAt: (user?.karmaPoints || 0) >= 500 ? "2024-01-25" : null,
        progress: Math.min(((user?.karmaPoints || 0) / 500) * 100, 100),
        requirement: "Earn 500 karma points"
      },
      {
        id: 4,
        title: "Daily Devotee",
        description: "Login for 7 consecutive days",
        icon: "🔥",
        category: "streak",
        points: 150,
        unlocked: false,
        progress: 42,
        requirement: "7-day login streak"
      },
      {
        id: 5,
        title: "Path Explorer",
        description: "Try all spiritual traditions",
        icon: "🌍",
        category: "exploration",
        points: 300,
        unlocked: false,
        progress: 60,
        requirement: "Use 8 different traditions"
      },
      {
        id: 6,
        title: "Meditation Master",
        description: "Complete 50 meditation sessions",
        icon: "🧘",
        category: "meditation",
        points: 400,
        unlocked: false,
        progress: 24,
        requirement: "Complete 50 meditations"
      },
      {
        id: 7,
        title: "Community Helper",
        description: "Help 25 fellow seekers",
        icon: "🤝",
        category: "community",
        points: 250,
        unlocked: true,
        unlockedAt: "2024-01-18",
        progress: 100,
        requirement: "Help 25 users"
      },
      {
        id: 8,
        title: "Enlightened One",
        description: "Reach 1000 karma points",
        icon: "✨",
        category: "karma",
        points: 500,
        unlocked: (user?.karmaPoints || 0) >= 1000,
        progress: Math.min(((user?.karmaPoints || 0) / 1000) * 100, 100),
        requirement: "Earn 1000 karma points"
      }
    ];
    setAchievements(allAchievements);
  };

  const loadStats = () => {
    setStats({
      totalAchievements: 8,
      unlockedAchievements: achievements.filter(a => a.unlocked).length,
      totalPoints: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0),
      completionRate: Math.round((achievements.filter(a => a.unlocked).length / 8) * 100)
    });
  };

  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'beginner', name: 'Beginner', icon: '🌱' },
    { id: 'questions', name: 'Questions', icon: '❓' },
    { id: 'karma', name: 'Karma', icon: '⭐' },
    { id: 'streak', name: 'Streaks', icon: '🔥' },
    { id: 'exploration', name: 'Explorer', icon: '🌍' },
    { id: 'meditation', name: 'Meditation', icon: '🧘' },
    { id: 'community', name: 'Community', icon: '🤝' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <Header />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 pt-20 px-6">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              🏆 My Achievements
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track your spiritual journey and celebrate your progress on the path to enlightenment
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-amber-400">{stats.unlockedAchievements || 2}</div>
              <div className="text-sm text-gray-300">Unlocked</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400">{stats.totalPoints || 150}</div>
              <div className="text-sm text-gray-300">Points Earned</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400">{stats.completionRate || 25}%</div>
              <div className="text-sm text-gray-300">Completion</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400">{user?.level || 1}</div>
              <div className="text-sm text-gray-300">Current Level</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredAchievements.map(achievement => (
              <div
                key={achievement.id}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 transform hover:scale-105 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400/50 shadow-lg hover:shadow-2xl'
                    : 'bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10'
                }`}
              >
                {/* Achievement Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-4xl ${achievement.unlocked ? 'animate-bounce' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      achievement.unlocked 
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                        : 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                    }`}>
                      {achievement.unlocked ? 'Unlocked' : 'Locked'}
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    achievement.unlocked ? 'text-gray-200' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-gray-400">{Math.round(achievement.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-amber-400 to-orange-500' 
                            : 'bg-gradient-to-r from-gray-600 to-gray-500'
                        }`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{achievement.requirement}</span>
                    <span className={`font-bold ${
                      achievement.unlocked ? 'text-amber-400' : 'text-gray-500'
                    }`}>
                      +{achievement.points} pts
                    </span>
                  </div>

                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="mt-3 text-xs text-green-400">
                      ✅ Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Glow Effect for Unlocked */}
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-500/10 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Continue Your Journey</h2>
            <p className="text-gray-300 mb-6">
              Keep exploring, learning, and growing on your spiritual path to unlock more achievements
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/ask" 
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                🤖 Ask AI Guru
              </a>
              <a 
                href="/challenges" 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
              >
                ⚖️ Take Challenges
              </a>
              <a 
                href="/videos" 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
              >
                📺 Watch Videos
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;