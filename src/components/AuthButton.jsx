import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import SimpleAuthModal from './SimpleAuthModal';
import UserDropdown from './UserDropdown';

const AuthButton = () => {
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  if (isAuthenticated && user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-3">
          {/* Karma Display */}
          <div className="hidden md:flex items-center gap-1 bg-gradient-to-r from-orange-100 to-pink-100 px-2 py-1 rounded-full">
            <span className="text-orange-600 text-xs font-medium">⚡ {user.karmaPoints}</span>
            <span className="text-gray-500 text-xs">L{user.level}</span>
          </div>

          {/* User Avatar/Button */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center gap-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-full px-2 py-1 transition-all shadow-sm hover:shadow-md ${
              showDropdown ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
            }`}
          >
            <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                user.fullName?.charAt(0) || user.username?.charAt(0) || '🧘'
              )}
            </div>
            <span className="hidden md:block text-gray-700 text-sm">
              {user.fullName || user.username}
            </span>
            <svg className={`w-3 h-3 text-gray-500 transition-transform ${
              showDropdown ? 'rotate-180' : ''
            }`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* User Dropdown */}
        {showDropdown && (
          <UserDropdown 
            user={user} 
            onClose={() => setShowDropdown(false)} 
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🕉️ Join DharmaVerse
        </button>
      </div>

      {/* Auth Modal */}
      <SimpleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AuthButton;