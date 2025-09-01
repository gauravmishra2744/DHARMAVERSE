import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { authService } from '../services/auth';
import { ecommerceService } from '../services/ecommerce';
import Cart from './Cart';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setCartCount(ecommerceService.getCartCount());
    
    // Update cart count when storage changes
    const handleStorageChange = () => {
      setCartCount(ecommerceService.getCartCount());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      let newUser;
      if (isLogin) {
        newUser = await authService.login(
          formData.get('email'),
          formData.get('password')
        );
      } else {
        newUser = await authService.register(
          formData.get('name'),
          formData.get('email'),
          formData.get('password')
        );
      }
      setUser(newUser);
      setShowAuthModal(false);
    } catch (error) {
      alert('Authentication failed');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <>
      {/* Header */}
      <nav className="fixed w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 backdrop-blur-md shadow-lg z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <RouterLink to="/" className="flex items-center gap-2">
            <span className="text-3xl">🕉️</span>
            <span className="font-bold text-2xl text-white">DharmaVerse AI</span>
          </RouterLink>
          
          <div className="hidden md:flex items-center gap-6">
            <RouterLink to="/ask" className="text-white hover:text-amber-300 transition-colors font-medium flex items-center gap-1">
              <span>💬</span> AI Guidance
            </RouterLink>
            <RouterLink to="/quiz" className="text-white hover:text-amber-300 transition-colors font-medium flex items-center gap-1">
              <span>🧭</span> Discover Path
            </RouterLink>
            <a href="#features" className="text-white hover:text-amber-300 transition-colors font-medium flex items-center gap-1">
              <span>⚡</span> Features
            </a>
            
            {/* Search Bar */}
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-white placeholder-white/70 outline-none w-32 focus:w-48 transition-all"
              />
              <span className="text-white/70 ml-2">🔍</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 text-white hover:text-amber-300 transition-colors"
            >
              <span className="text-2xl">🛍️</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-2 hover:bg-white/20 transition-colors"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white font-medium">{user.name}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-amber-300">⭐{user.karmaPoints}</span>
                    <span className="text-orange-300">🔥{user.streak}</span>
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-amber-600">⭐ {user.karmaPoints} Karma</span>
                        <span className="text-orange-600">🔥 {user.streak} Day Streak</span>
                      </div>
                    </div>
                    
                    <RouterLink 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      👤 My Profile
                    </RouterLink>
                    <RouterLink 
                      to="/ask" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      💬 AI Guidance
                    </RouterLink>

                    <RouterLink 
                      to="/quiz" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      🧭 Discover Path
                    </RouterLink>
                    
                    <div className="border-t border-gray-200 mt-2">
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Join DharmaVerse'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to continue your spiritual journey' : 'Start your journey of wisdom'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your name"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Password"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Header;