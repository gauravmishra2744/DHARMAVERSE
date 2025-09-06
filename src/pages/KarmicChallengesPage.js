import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CodeRunner from '../components/CodeRunner';
import { challengeService } from '../services/challengeService';
import { getRandomChallenges, getDailyChallenge, getChallengesByCategory } from '../data/karmicChallenges';

const KarmicChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentMode, setCurrentMode] = useState('random');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [userStats, setUserStats] = useState({ totalSolved: 0, karmaPoints: 0 });

  useEffect(() => {
    const loadData = async () => {
      await loadChallenges();
      loadUserStats();
    };
    loadData();
  }, [currentMode, selectedCategory, selectedDifficulty]);

  const loadChallenges = async () => {
    try {
      let newChallenges = [];
      
      switch (currentMode) {
        case 'daily':
          newChallenges = [getDailyChallenge()];
          break;
        case 'category':
          newChallenges = selectedCategory ? getChallengesByCategory(selectedCategory) : [];
          break;
        case 'difficulty':
          newChallenges = getRandomChallenges(selectedDifficulty, 5);
          break;
        default:
          newChallenges = getRandomChallenges(null, 6);
      }
      
      setChallenges(newChallenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserStats = () => {
    const saved = localStorage.getItem('karmicChallengeStats');
    if (saved) {
      setUserStats(JSON.parse(saved));
    }
    const completed = localStorage.getItem('completedChallenges');
    if (completed) {
      setCompletedChallenges(new Set(JSON.parse(completed)));
    }
  };

  const saveUserStats = (newStats) => {
    localStorage.setItem('karmicChallengeStats', JSON.stringify(newStats));
    setUserStats(newStats);
  };

  const markChallengeCompleted = (challengeId) => {
    const newCompleted = new Set([...completedChallenges, challengeId]);
    setCompletedChallenges(newCompleted);
    localStorage.setItem('completedChallenges', JSON.stringify([...newCompleted]));
  };



  const handleSubmitCode = async () => {
    if (!userCode.trim()) return;
    
    setSubmitting(true);
    try {
      // Enhanced code evaluation
      const codeQuality = evaluateCodeQuality(userCode);
      const karmaPoints = calculateKarmaPoints(selectedChallenge, codeQuality);
      
      // Mark as completed
      markChallengeCompleted(selectedChallenge.id);
      
      // Update stats
      const newStats = {
        totalSolved: userStats.totalSolved + 1,
        karmaPoints: userStats.karmaPoints + karmaPoints
      };
      saveUserStats(newStats);
      
      // Show detailed feedback
      showSubmissionFeedback(codeQuality, karmaPoints);
      
    } catch (error) {
      console.error('Error submitting code:', error);
      alert('Error submitting code');
    } finally {
      setSubmitting(false);
    }
  };

  const evaluateCodeQuality = (code) => {
    const metrics = {
      length: code.length,
      hasComments: code.includes('//') || code.includes('/*'),
      hasErrorHandling: code.includes('try') || code.includes('catch'),
      usesGoodNaming: !/\b[a-z]\b/.test(code), // Avoids single letter variables
      complexity: (code.match(/if|for|while|switch/g) || []).length
    };
    
    let score = 50; // Base score
    if (metrics.hasComments) score += 10;
    if (metrics.hasErrorHandling) score += 15;
    if (metrics.usesGoodNaming) score += 10;
    if (metrics.length > 100) score += 10;
    if (metrics.complexity > 2) score += 5;
    
    return { ...metrics, score: Math.min(100, score) };
  };

  const calculateKarmaPoints = (challenge, codeQuality) => {
    const basePoints = {
      'Easy': 10,
      'Medium': 20,
      'Hard': 30
    };
    
    const base = basePoints[challenge.difficulty] || 10;
    const qualityMultiplier = codeQuality.score / 100;
    
    return Math.round(base * qualityMultiplier);
  };

  const showSubmissionFeedback = (quality, points) => {
    const feedback = [
      `🎉 Challenge completed! +${points} Karma Points`,
      `Code Quality Score: ${quality.score}/100`,
      quality.hasComments ? '✅ Good use of comments' : '💡 Try adding comments to explain your logic',
      quality.hasErrorHandling ? '✅ Excellent error handling' : '💡 Consider adding error handling',
      quality.usesGoodNaming ? '✅ Good variable naming' : '💡 Use descriptive variable names'
    ];
    
    alert(feedback.join('\n'));
  };

  const getNewRandomChallenge = () => {
    const availableChallenges = getRandomChallenges(null, 10)
      .filter(c => !completedChallenges.has(c.id));
    
    if (availableChallenges.length > 0) {
      const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
      setSelectedChallenge(randomChallenge);
      setUserCode('');
      setShowSolution(false);
      setShowHints(false);
    } else {
      alert('🎉 Congratulations! You\'ve completed all available challenges!');
    }
  };



  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
    setUserCode('');
    setShowSolution(false);
    setShowHints(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen vedic-brown text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⚖️</div>
          <p className="text-xl">Loading Karmic Challenges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen vedic-brown text-white">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 sacred-text">⚖️ Karmic Code Challenges</h1>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto mb-6">
            Programming puzzles with moral twists. Write code that reflects dharmic principles and learn spiritual wisdom.
          </p>
          
          {/* User Stats */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">{userStats.totalSolved}</div>
              <div className="text-sm text-gray-300">Challenges Solved</div>
            </div>
            <div className="bg-gradient-to-r from-amber-600/30 to-orange-600/30 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">{userStats.karmaPoints}</div>
              <div className="text-sm text-gray-300">Karma Points</div>
            </div>
          </div>
          
          {/* Challenge Mode Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setCurrentMode('random')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentMode === 'random' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 glow-card' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              🎲 Random Mix
            </button>
            <button
              onClick={() => setCurrentMode('daily')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentMode === 'daily' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 glow-card' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              📅 Daily Challenge
            </button>
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setCurrentMode('difficulty');
              }}
              className="px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:border-purple-500"
            >
              <option value="">Select Difficulty</option>
              <option value="beginner">🌱 Beginner</option>
              <option value="intermediate">🌿 Intermediate</option>
              <option value="advanced">🌳 Advanced</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentMode('category');
              }}
              className="px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:border-purple-500"
            >
              <option value="">Select Category</option>
              <option value="Ethics">⚖️ Ethics</option>
              <option value="Compassion">❤️ Compassion</option>
              <option value="Truth">💎 Truth</option>
              <option value="Karma">🔄 Karma</option>
              <option value="Justice">⚖️ Justice</option>
              <option value="Mindfulness">🧘 Mindfulness</option>
              <option value="Virtue">✨ Virtue</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Challenge List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 sacred-text">🧩 Challenges</h2>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  onClick={() => handleChallengeSelect(challenge)}
                  className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 relative ${
                    selectedChallenge?.id === challenge.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 glow-card'
                      : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                  }`}
                >
                  {completedChallenges.has(challenge.id) && (
                    <div className="absolute top-2 right-2 text-green-400 text-xl">✅</div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        challenge.difficulty === 'Easy' ? 'bg-green-600' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded text-xs bg-blue-600">
                        {challenge.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{challenge.description}</p>
                  <p className="text-xs text-amber-300 mt-2 italic">"{challenge.moralTwist}"</p>
                </div>
              ))}
              
              <button
                onClick={getNewRandomChallenge}
                className="w-full p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:scale-105 transition-transform"
              >
                🎲 Get New Random Challenge
              </button>
            </div>
          </div>

          {/* Challenge Details & Code Editor */}
          <div className="lg:col-span-2">
            {selectedChallenge ? (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-3xl font-bold mb-4 sacred-text">{selectedChallenge.title}</h2>
                  <p className="text-lg mb-4">{selectedChallenge.description}</p>
                  <div className="bg-amber-900/30 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-amber-300 mb-2">🎯 Moral Challenge:</h4>
                    <p className="italic">{selectedChallenge.moralTwist}</p>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-300 mb-2">📝 Example:</h4>
                    <code className="text-sm">{selectedChallenge.example}</code>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 sacred-text">💻 Your Solution</h3>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Write your dharmic code here..."
                    className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:scale-105 transition-transform"
                    >
                      {showHints ? 'Hide' : 'Show'} Hints 💡
                    </button>
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:scale-105 transition-transform"
                    >
                      {showSolution ? 'Hide' : 'Show'} Solution
                    </button>
                    <button 
                      onClick={handleSubmitCode}
                      disabled={submitting || !userCode.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Code'} ⚡
                    </button>
                    <button
                      onClick={() => setUserCode('')}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg hover:scale-105 transition-transform"
                    >
                      Clear Code 🗑️
                    </button>
                  </div>
                  
                  <CodeRunner challenge={selectedChallenge} userCode={userCode} />
                </div>

                {/* Hints */}
                {showHints && selectedChallenge.hints && (
                  <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 sacred-text">💡 Hints</h3>
                    <ul className="space-y-2">
                      {selectedChallenge.hints.map((hint, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Solution */}
                {showSolution && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 sacred-text">✨ Dharmic Solution</h3>
                    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg overflow-x-auto">
                      <code>{selectedChallenge.solution}</code>
                    </pre>
                  </div>
                )}

                {/* Spiritual Teaching */}
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-lg p-6 glow-card">
                  <h3 className="text-xl font-bold mb-4 sacred-text">🕉️ Spiritual Teaching</h3>
                  <div className="mb-4">
                    <h4 className="font-semibold text-amber-300 mb-2">{selectedChallenge.teaching.scripture}</h4>
                    <p className="italic text-lg mb-4 text-amber-100">"{selectedChallenge.teaching.verse}"</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-300 mb-2">💡 Lesson for Developers:</h4>
                    <p>{selectedChallenge.teaching.lesson}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">🧘‍♂️</div>
                <h3 className="text-2xl font-bold mb-4 sacred-text">Choose Your Path</h3>
                <p className="text-gray-300">Select a challenge from the left to begin your karmic coding journey.</p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:scale-105 transition-transform"
          >
            🏠 Back to DharmaVerse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KarmicChallengesPage;