import React, { useState, useEffect } from 'react';
import { FaHeart, FaComment, FaShare, FaPlay, FaPause } from 'react-icons/fa';
import videoService from '../services/videoService';

const ShortsPlayer = ({ shorts, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likes, setLikes] = useState({});

  const currentShort = shorts[currentIndex];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < shorts.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, shorts.length, onClose]);

  const handleLike = () => {
    const isLiked = videoService.toggleLike(currentShort.id);
    setLikes({ ...likes, [currentShort.id]: isLiked });
  };

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 left-4 text-white text-2xl z-10 hover:text-gray-300"
      >
        ✕
      </button>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button 
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-gray-300"
        >
          ↑
        </button>
      )}
      
      {currentIndex < shorts.length - 1 && (
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-gray-300"
        >
          ↓
        </button>
      )}

      {/* Video Container */}
      <div className="relative w-full max-w-sm h-full bg-black flex items-center justify-center">
        {/* Video Player */}
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          {currentShort.videoUrl ? (
            <iframe
              src={currentShort.videoUrl + '?autoplay=1&mute=1&loop=1&rel=0'}
              title={currentShort.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img 
                src={currentShort.thumbnail} 
                alt={currentShort.title}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {!isPlaying && (
                  <div className="bg-black bg-opacity-50 rounded-full p-4">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="text-white">
              <h3 className="font-semibold mb-1">{currentShort.title}</h3>
              <p className="text-sm opacity-75">@{currentShort.channel}</p>
              <p className="text-xs opacity-60 mt-1">{currentShort.views} views</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
          <button 
            onClick={handleLike}
            className={`flex flex-col items-center ${
              videoService.isLiked(currentShort.id) ? 'text-red-500' : 'text-white'
            }`}
          >
            <div className="bg-gray-800 bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all">
              <FaHeart className="text-2xl" />
            </div>
            <span className="text-xs mt-1">{currentShort.likes}</span>
          </button>

          <button className="flex flex-col items-center text-white">
            <div className="bg-gray-800 bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all">
              <FaComment className="text-2xl" />
            </div>
            <span className="text-xs mt-1">Comment</span>
          </button>

          <button className="flex flex-col items-center text-white">
            <div className="bg-gray-800 bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all">
              <FaShare className="text-2xl" />
            </div>
            <span className="text-xs mt-1">Share</span>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute top-4 right-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          {currentIndex + 1} / {shorts.length}
        </div>
      </div>

      {/* Swipe Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-75 text-center">
        <p>↑↓ Navigate • Space Play/Pause • Esc Close</p>
      </div>
    </div>
  );
};

export default ShortsPlayer;