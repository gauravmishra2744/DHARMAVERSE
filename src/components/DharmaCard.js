import React from 'react';

const DharmaCard = ({ verse, lesson, interpretation, religion, onShare }) => {
  return (
    <div className="dharma-card p-8 rounded-xl max-w-md mx-auto text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-700/10"></div>
      
      <div className="relative z-10">
        <div className="text-4xl mb-4">📜</div>
        <div className="text-sm text-amber-400 mb-2">{religion}</div>
        
        <blockquote className="text-lg italic mb-4 sacred-text">
          "{verse}"
        </blockquote>
        
        <div className="border-t border-amber-700 pt-4 mb-4">
          <h3 className="font-semibold mb-2 text-amber-200">Lesson:</h3>
          <p className="text-sm text-amber-100">{lesson}</p>
        </div>
        
        <div className="border-t border-amber-700 pt-4 mb-6">
          <h3 className="font-semibold mb-2 text-amber-200">Interpretation:</h3>
          <p className="text-sm text-amber-100">{interpretation}</p>
        </div>
        
        <button 
          onClick={onShare}
          className="px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-semibold glow-button hover:scale-105 transition-transform"
        >
          Share Wisdom 📸
        </button>
      </div>
    </div>
  );
};

export default DharmaCard;