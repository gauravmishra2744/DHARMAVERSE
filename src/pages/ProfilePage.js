import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/auth';
import Particles from '../Particles';
import Header from '../components/Header';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState({
    questionsAsked: 0,
    wisdomReceived: 0,
    cardsShared: 0,
    daysActive: 0
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Load user stats from localStorage
      const userStats = JSON.parse(localStorage.getItem(`stats_${currentUser.id}`) || '{}');
      setStats(prev => ({ ...prev, ...userStats }));
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      name: formData.get('name'),
      email: formData.get('email')
    };
    
    const updatedUser = authService.updateProfile(updates);
    setUser(updatedUser);
    setEditing(false);
  };

  const badges = [
    { name: 'First Question', icon: '🌱', earned: stats.questionsAsked >= 1 },
    { name: 'Wisdom Seeker', icon: '📚', earned: stats.questionsAsked >= 10 },
    { name: 'Spiritual Warrior', icon: '⚔️', earned: stats.questionsAsked >= 50 },
    { name: 'Daily Devotee', icon: '🔥', earned: user?.streak >= 7 },
    { name: 'Karma Master', icon: '⭐', earned: user?.karmaPoints >= 500 },
    { name: 'Quiz Master', icon: '🧭', earned: localStorage.getItem('quizCompleted') === 'true' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen vedic-brown flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl mb-4">Please log in to view your profile</h1>
          <Link to="/" className="px-6 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen vedic-brown text-white relative overflow-hidden">
      <Particles />
      <Header />
      
      <div className="relative z-10 pt-24 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="dharma-card p-8 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-amber-500"
              />
              
              <div className="flex-1 text-center md:text-left">
                {editing ? (
                  <form onSubmit={handleSave} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.name}
                      className="bg-amber-900/50 border border-amber-700 rounded-lg px-3 py-2 text-white"
                      placeholder="Your name"
                    />
                    <input
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      className="bg-amber-900/50 border border-amber-700 rounded-lg px-3 py-2 text-white ml-2"
                      placeholder="Your email"
                    />
                    <div className="flex gap-2 mt-4">
                      <button type="submit" className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                        Save
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setEditing(false)}
                        className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold sacred-text mb-2">{user.name}</h1>
                    <p className="text-amber-200 mb-4">{user.email}</p>
                    <button 
                      onClick={() => setEditing(true)}
                      className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-amber-300">Member since</p>
                <p className="font-semibold">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="dharma-card p-6 text-center rounded-lg">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-amber-300">{user.karmaPoints}</div>
              <div className="text-sm text-gray-400">Karma Points</div>
            </div>
            
            <div className="dharma-card p-6 text-center rounded-lg">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-orange-300">{user.streak}</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </div>
            
            <div className="dharma-card p-6 text-center rounded-lg">
              <div className="text-3xl mb-2">🙏</div>
              <div className="text-2xl font-bold text-blue-300">{stats.questionsAsked}</div>
              <div className="text-sm text-gray-400">Questions Asked</div>
            </div>
            
            <div className="dharma-card p-6 text-center rounded-lg">
              <div className="text-3xl mb-2">📸</div>
              <div className="text-2xl font-bold text-green-300">{stats.cardsShared}</div>
              <div className="text-sm text-gray-400">Cards Shared</div>
            </div>
          </div>

          {/* Badges */}
          <div className="dharma-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold sacred-text mb-6">Spiritual Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg text-center transition-all ${
                    badge.earned 
                      ? 'bg-amber-900/30 border border-amber-600' 
                      : 'bg-gray-800/30 border border-gray-600 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="font-semibold text-sm">{badge.name}</div>
                  {badge.earned && <div className="text-xs text-amber-400 mt-1">Earned!</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              to="/ask" 
              className="dharma-card p-6 rounded-lg text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-3">🙏</div>
              <h3 className="font-semibold mb-2">Ask Questions</h3>
              <p className="text-sm text-gray-400">Get spiritual guidance</p>
            </Link>
            
            <Link 
              to="/quiz" 
              className="dharma-card p-6 rounded-lg text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-3">🧭</div>
              <h3 className="font-semibold mb-2">Take Quiz</h3>
              <p className="text-sm text-gray-400">Discover your path</p>
            </Link>
            
            <div className="dharma-card p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Leaderboard</h3>
              <p className="text-sm text-gray-400">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;