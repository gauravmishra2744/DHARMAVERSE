import React from 'react';
import { useAuth } from './AuthProvider';

const UserDropdown = ({ user, onClose }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const getKarmaLevel = (points) => {
    if (points >= 1000) return { name: 'Enlightened', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (points >= 600) return { name: 'Wise One', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (points >= 300) return { name: 'Practitioner', color: 'text-green-600', bg: 'bg-green-100' };
    if (points >= 100) return { name: 'Seeker', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { name: 'Beginner', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const level = getKarmaLevel(user.karmaPoints);

  return (
    <div className="absolute right-0 top-full mt-3 w-72 max-w-[90vw] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform transition-all duration-200 ease-out">
      {/* User Info Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              user.fullName?.charAt(0) || user.username?.charAt(0) || '🧘'
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white truncate">{user.fullName || user.username}</p>
            <p className="text-orange-100 text-sm">@{user.username}</p>
          </div>
        </div>
        
        {/* Karma & Level */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-center">
            <div className="text-white font-bold text-lg">⚡ {user.karmaPoints}</div>
            <div className="text-orange-100 text-xs">Karma Points</div>
          </div>
          <div className="text-center">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${level.color} ${level.bg}`}>
              {level.name}
            </div>
            <div className="text-orange-100 text-xs mt-1">Level {user.level}</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <a href="/achievements" className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all flex items-center gap-3 text-gray-700 hover:text-blue-600">
          <span className="text-lg">🏆</span>
          <div>
            <div className="font-medium">View Achievements</div>
            <div className="text-xs text-gray-500">{Math.floor(user.karmaPoints / 25)} earned</div>
          </div>
        </a>
        
        <button className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 transition-all flex items-center gap-3 text-gray-700 hover:text-green-600">
          <span className="text-lg">⚙️</span>
          <div>
            <div className="font-medium">Settings</div>
            <div className="text-xs text-gray-500">Preferences & privacy</div>
          </div>
        </button>
        
        <button className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <span className="text-lg">📊</span>
          <div>
            <div className="font-medium">My Progress</div>
            <div className="text-xs text-gray-500">Track your journey</div>
          </div>
        </button>
        
        <div className="border-t border-gray-100 mt-2 pt-2">
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all flex items-center gap-3 text-gray-700 hover:text-red-600"
          >
            <span className="text-lg">🚪</span>
            <div>
              <div className="font-medium">Logout</div>
              <div className="text-xs text-gray-500">Sign out of your account</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;