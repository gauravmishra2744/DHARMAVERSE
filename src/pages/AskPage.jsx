import React, { useState, useEffect } from 'react';
import { getDailyWisdom } from '../services/api';
import aiService from '../services/aiService';
import { authService } from '../services/auth';
import DharmaCard from '../components/DharmaCard';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import './AskPage.css';


function AskPage() {
  const [question, setQuestion] = useState('');
  const [religion, setReligion] = useState('Universal');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dailyWisdom, setDailyWisdom] = useState(null);
  const [karmaPoints, setKarmaPoints] = useState(() => {
    return parseInt(localStorage.getItem('karmaPoints') || '0');
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('streak') || '0');
  });
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    getDailyWisdom().then(setDailyWisdom);
    
    // Check daily login streak
    const lastLogin = localStorage.getItem('lastLogin');
    const today = new Date().toDateString();
    if (lastLogin !== today) {
      const newStreak = lastLogin === new Date(Date.now() - 86400000).toDateString() ? streak + 1 : 1;
      setStreak(newStreak);
      localStorage.setItem('streak', newStreak.toString());
      localStorage.setItem('lastLogin', today);
    }
  }, [streak]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const aiResponse = await aiService.askSpritualQuestion(question, religion.toLowerCase());
      setResponse({
        verse: aiResponse.guidance.split('\n\n')[0] || aiResponse.guidance,
        lesson: aiResponse.guidance,
        interpretation: `Guidance from ${aiResponse.tradition} tradition`,
        source: aiResponse.source
      });
      
      // Award karma points
      const newPoints = karmaPoints + 10;
      setKarmaPoints(newPoints);
      localStorage.setItem('karmaPoints', newPoints.toString());
      
      // Update user profile if logged in
      const user = authService.getCurrentUser();
      if (user) {
        authService.updateProfile({ karmaPoints: newPoints });
      }
      
      // Play temple bell sound
      playTempleBell();
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setLoading(false);
    }
  };

  const playTempleBell = () => {
    // Create audio context for temple bell sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  };

  const shareWisdom = () => {
    if (navigator.share && response) {
      navigator.share({
        title: 'Dharma Verse Wisdom',
        text: `${response.verse}\n\n${response.lesson}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${response.verse}\n\n${response.lesson}`);
      alert('Wisdom copied to clipboard!');
    }
  };

  const handleChatMessage = async (message) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user', content: message, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    
    try {
      const aiResponse = await aiService.askSpritualQuestion(message, religion.toLowerCase());
      const botMessage = { 
        type: 'bot', 
        content: aiResponse.guidance, 
        source: aiResponse.source,
        lesson: aiResponse.guidance.split('\n\n')[1] || 'Spiritual wisdom for your journey',
        timestamp: new Date() 
      };
      setChatMessages(prev => [...prev, botMessage]);
      
      // Award karma points
      const newPoints = karmaPoints + 5;
      setKarmaPoints(newPoints);
      localStorage.setItem('karmaPoints', newPoints.toString());
      
      // Update user profile if logged in
      const user = authService.getCurrentUser();
      if (user) {
        authService.updateProfile({ karmaPoints: newPoints });
      }
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Animated Spiritual Aura Background with Neurons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient-x"></div>
        
        {/* Neuron Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          {/* Neurons */}
          <circle cx="200" cy="150" r="4" fill="#fbbf24" className="animate-pulse">
            <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="100" r="3" fill="#a855f7" className="animate-pulse delay-500">
            <animate attributeName="r" values="2;5;2" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="200" r="5" fill="#ec4899" className="animate-pulse delay-1000">
            <animate attributeName="r" values="4;7;4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="800" cy="120" r="3" fill="#06b6d4" className="animate-pulse delay-700">
            <animate attributeName="r" values="2;6;2" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="1000" cy="180" r="4" fill="#f59e0b" className="animate-pulse delay-300">
            <animate attributeName="r" values="3;5;3" dur="4.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="400" r="3" fill="#8b5cf6" className="animate-pulse delay-800">
            <animate attributeName="r" values="2;6;2" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="700" cy="450" r="4" fill="#10b981" className="animate-pulse delay-200">
            <animate attributeName="r" values="3;7;3" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="600" r="5" fill="#f97316" className="animate-pulse delay-600">
            <animate attributeName="r" values="4;6;4" dur="3.2s" repeatCount="indefinite" />
          </circle>
          
          {/* Neural Connections */}
          <line x1="200" y1="150" x2="400" y2="100" stroke="#fbbf24" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.1;0.6;0.1" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="400" y1="100" x2="600" y2="200" stroke="#a855f7" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3.5s" repeatCount="indefinite" />
          </line>
          <line x1="600" y1="200" x2="800" y2="120" stroke="#ec4899" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite" />
          </line>
          <line x1="800" y1="120" x2="1000" y2="180" stroke="#06b6d4" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4.2s" repeatCount="indefinite" />
          </line>
          <line x1="300" y1="400" x2="700" y2="450" stroke="#8b5cf6" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.8s" repeatCount="indefinite" />
          </line>
          <line x1="700" y1="450" x2="500" y2="600" stroke="#10b981" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4.5s" repeatCount="indefinite" />
          </line>
          <line x1="200" y1="150" x2="300" y2="400" stroke="#f97316" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="6s" repeatCount="indefinite" />
          </line>
        </svg>
        
        {/* Glowing Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Header with Stats */}
      <div className="relative z-10 p-6">
        <Header />
        <div className="pt-20 mb-8">
          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-amber-900/30 px-3 py-1 rounded-full">
              🔥 Streak: {streak} days
            </div>
            <div className="bg-amber-900/30 px-3 py-1 rounded-full">
              ⭐ Karma: {karmaPoints} points
            </div>
          </div>
        </div>

        {/* Daily Wisdom */}
        {dailyWisdom && (
          <div className="max-w-2xl mx-auto mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 text-center hover:bg-white/15 hover:shadow-3xl hover:border-white/30 transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold mb-2 sacred-text">🌅 Today's Wisdom</h3>
            <p className="italic text-amber-200 mb-2">"{dailyWisdom.verse}"</p>
            <p className="text-sm text-amber-300">{dailyWisdom.translation}</p>
            <p className="text-xs text-amber-400 mt-2">- {dailyWisdom.source}</p>
          </div>
        )}

        {/* Question Form */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold sacred-text">Ask Your Question</h1>
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
            >
              <span>💬</span> {showChat ? 'Hide Chat' : 'Live Chat'}
            </button>
          </div>
          
          {showChat && (
            <div className="mb-8">
              <ChatInterface 
                messages={chatMessages}
                onSendMessage={handleChatMessage}
                user={authService.getCurrentUser()}
                religion={religion}
              />
            </div>
          )}
          
          {!showChat && (
            <>
              {/* Religion Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-amber-200">Choose Your Spiritual Path:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {aiService.getSpiritualTraditions().map(tradition => (
                    <button
                      key={tradition.id}
                      onClick={() => setReligion(tradition.name)}
                      className={`p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                        religion === tradition.name 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white shadow-lg ring-2 ring-amber-400/50' 
                          : 'bg-white/10 backdrop-blur-sm border-white/20 text-amber-200 hover:bg-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className="text-3xl mb-2">{tradition.icon}</div>
                      <div className="text-sm font-medium">{tradition.name}</div>
                    </button>
                  ))}
                </div>
              </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium mb-2 text-amber-200">Your Question:</label>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white h-32 resize-none placeholder-white/60 focus:bg-white/15 focus:border-white/30 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
                placeholder="What's weighing on your heart? Ask about life, relationships, purpose, or any spiritual guidance you seek..."
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['😔 Sad', '😰 Anxious', '🤔 Confused', '😊 Grateful', '💪 Motivated'].map(mood => (
                <button 
                  key={mood}
                  type="button"
                  onClick={() => setQuestion(prev => prev + ` (Feeling: ${mood})`)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  {mood}
                </button>
              ))}
            </div>
            
            <button 
              type="submit"
              disabled={loading || !question.trim()}
              className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Seeking Wisdom...
                </div>
              ) : (
                '🤖 Ask AI Guru 🙏'
              )}
            </button>
          </form>
              </>
            )}
        </div>

        {/* Response */}
        {response && (
          <div className="max-w-2xl mx-auto mt-12">
            <div className="text-center mb-6">
              <div className="text-6xl animate-pulse mb-4">🔔</div>
              <h2 className="text-2xl font-bold sacred-text">Divine Guidance Received</h2>
            </div>
            
            <DharmaCard 
              verse={response.verse}
              lesson={response.lesson}
              interpretation={response.interpretation}
              religion={religion}
              onShare={shareWisdom}
            />
            
            <div className="text-center mt-6">
              <button 
                onClick={() => {
                  setQuestion('');
                  setResponse(null);
                }}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Ask Another Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AskPage;