import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDailyWisdom } from '../services/api';
import aiService from '../services/aiService';
import { authService } from '../services/auth';
import DharmaCard from '../components/DharmaCard';
import Particles from '../Particles';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import chatbotService from '../services/chatbotService';

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
  }, []);

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
    <div className="min-h-screen vedic-brown text-white relative overflow-hidden">
      <Particles />
      
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
          <div className="max-w-2xl mx-auto mb-8 p-6 dharma-card rounded-lg text-center">
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {aiService.getSpiritualTraditions().map(tradition => (
                    <button
                      key={tradition.id}
                      onClick={() => setReligion(tradition.name)}
                      className={`p-3 rounded-lg border transition-all ${
                        religion === tradition.name 
                          ? 'bg-amber-600 border-amber-500 text-white' 
                          : 'bg-amber-900/30 border-amber-700 text-amber-200 hover:bg-amber-800/40'
                      }`}
                    >
                      <div className="text-2xl mb-1">{tradition.icon}</div>
                      <div className="text-xs">{tradition.name}</div>
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
                className="w-full p-4 bg-amber-900/50 border border-amber-700 rounded-lg text-white h-32 resize-none"
                placeholder="What's weighing on your heart? Ask about life, relationships, purpose, or any spiritual guidance you seek..."
              />
            </div>
            
            <div className="flex gap-2">
              {['😔 Sad', '😰 Anxious', '🤔 Confused', '😊 Grateful', '💪 Motivated'].map(mood => (
                <button 
                  key={mood}
                  type="button"
                  onClick={() => setQuestion(prev => prev + ` (Feeling: ${mood})`)}
                  className="px-3 py-1 bg-amber-800/30 rounded-full text-sm hover:bg-amber-700/30 transition-colors"
                >
                  {mood}
                </button>
              ))}
            </div>
            
            <button 
              type="submit"
              disabled={loading || !question.trim()}
              className="w-full px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-semibold glow-button hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="px-6 py-2 border border-amber-600 rounded-lg hover:bg-amber-600/10 transition-colors"
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