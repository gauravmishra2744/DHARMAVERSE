import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ecommerceService } from '../services/ecommerce';
import Cart from './Cart';
import AuthButton from './AuthButton';
import { useAuth } from './AuthProvider';

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(ecommerceService.getCartCount());
    
    // Update cart count when storage changes
    const handleStorageChange = () => {
      setCartCount(ecommerceService.getCartCount());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);



  return (
    <>
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 backdrop-blur-md shadow-lg z-40 h-15">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center h-full">
          <RouterLink to="/" className="flex items-center gap-2">
            <span className="text-xl">🕉️</span>
            <span className="font-bold text-lg text-white">DharmaVerse AI</span>
          </RouterLink>
          
          <div className="hidden md:flex items-center gap-4">
            <RouterLink to="/ask" className="text-white hover:text-amber-300 transition-colors text-sm flex items-center gap-1">
              <span>💬</span> AI Guidance
            </RouterLink>
            <RouterLink to="/quiz" className="text-white hover:text-amber-300 transition-colors text-sm flex items-center gap-1">
              <span>🧭</span> Discover Path
            </RouterLink>
            <a href="#features" className="text-white hover:text-amber-300 transition-colors text-sm flex items-center gap-1">
              <span>⚡</span> Features
            </a>
            
            {/* Search Bar */}
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-white placeholder-white/70 outline-none w-24 focus:w-32 transition-all text-sm"
              />
              <span className="text-white/70 ml-1 text-sm">🔍</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cart Icon */}
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-1 text-white hover:text-amber-300 transition-colors"
            >
              <span className="text-lg">🛍️</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <AuthButton />
          </div>
        </div>
      </nav>


      
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Header;