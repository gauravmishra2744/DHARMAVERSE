import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const UserProfile = ({ user, onClose }) => {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await authService.logout();
    window.location.reload();
  };

  const getKarmaLevel = (points) => {
    if (points >= 1000) return { name: 'Enlightened', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (points >= 600) return { name: 'Wise One', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (points >= 300) return { name: 'Practitioner', color: 'text-green-600', bg: 'bg-green-100' };
    if (points >= 100) return { name: 'Seeker', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { name: 'Beginner', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const level = getKarmaLevel(profile.karmaPoints);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🕉️ Profile</h2>
            <button onClick={onClose} className="text-white hover:text-orange-200 text-2xl">×</button>
          </div>
        </div>

        <div className="p-6">
          {/* Avatar & Basic Info */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                profile.fullName?.charAt(0) || profile.username?.charAt(0) || '🧘'
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{profile.fullName || profile.username}</h3>
            <p className="text-gray-600">@{profile.username}</p>
          </div>

          {/* Karma & Level */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Karma Points</span>
              <span className="text-2xl font-bold text-orange-600">{profile.karmaPoints}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Spiritual Level</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${level.color} ${level.bg}`}>
                {level.name}
              </span>
            </div>
            <div className="mt-3">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((profile.karmaPoints % 100), 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {100 - (profile.karmaPoints % 100)} points to next level
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{profile.level}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.floor(profile.karmaPoints / 25)}
              </div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
              🏆 View Achievements
            </button>
            <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all">
              ⚙️ Settings
            </button>
            <button 
              onClick={handleLogout}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Logging out...' : '🚪 Logout'}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-xs text-gray-500">
            Member since {new Date().getFullYear()} • DharmaVerse 🕉️
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;