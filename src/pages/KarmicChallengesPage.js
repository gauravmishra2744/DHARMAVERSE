import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { challengeService } from '../services/challengeService';

const KarmicChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const data = await challengeService.getChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSolution = async (challengeId) => {
    try {
      const data = await challengeService.getSolution(challengeId);
      setSolution(data.solution);
      setShowSolution(true);
    } catch (error) {
      console.error('Error loading solution:', error);
    }
  };

  const handleSubmitCode = async () => {
    if (!userCode.trim()) return;
    
    setSubmitting(true);
    try {
      const result = await challengeService.submitCode(selectedChallenge._id, userCode);
      alert(`Code submitted! Status: ${result.status}, Karma Points: ${result.karmaPoints}`);
    } catch (error) {
      console.error('Error submitting code:', error);
      alert('Error submitting code');
    } finally {
      setSubmitting(false);
    }
  };

  const staticChallenges = [
    {
      id: 1,
      title: "Compassionate Sorting",
      description: "Write a sorting algorithm that prioritizes kind acts over selfish ones.",
      difficulty: "Medium",
      moralTwist: "Acts of kindness should always come first, regardless of their numerical value.",
      example: "Input: [{act: 'helping elderly', value: 3}, {act: 'stealing', value: 10}, {act: 'charity', value: 5}]",
      solution: `function compassionateSort(acts) {
  const kindActs = ['helping', 'charity', 'sharing', 'caring', 'giving'];
  const selfishActs = ['stealing', 'lying', 'cheating', 'hurting'];
  
  return acts.sort((a, b) => {
    const aIsKind = kindActs.some(kind => a.act.includes(kind));
    const bIsKind = kindActs.some(kind => b.act.includes(kind));
    const aIsSelfish = selfishActs.some(selfish => a.act.includes(selfish));
    const bIsSelfish = selfishActs.some(selfish => b.act.includes(selfish));
    
    if (aIsKind && !bIsKind) return -1;
    if (!aIsKind && bIsKind) return 1;
    if (aIsSelfish && !bIsSelfish) return 1;
    if (!aIsSelfish && bIsSelfish) return -1;
    
    return b.value - a.value;
  });
}`,
      teaching: {
        scripture: "Bhagavad Gita 3.21",
        verse: "Whatever action a great person performs, common people follow. Whatever standards they set, the world pursues.",
        lesson: "In programming as in life, we must prioritize moral actions over personal gain. Our code should reflect our values."
      }
    },
    {
      id: 2,
      title: "Truth Validator",
      description: "Create a function that validates data integrity with absolute honesty.",
      difficulty: "Easy",
      moralTwist: "The function must never return false positives, even if it means admitting uncertainty.",
      example: "Input: userData with potential inconsistencies",
      solution: `function truthValidator(data) {
  const validations = {
    isValid: true,
    uncertainties: [],
    errors: []
  };
  
  // Never claim certainty when uncertain
  if (!data || typeof data !== 'object') {
    validations.isValid = false;
    validations.errors.push('Invalid data structure');
    return validations;
  }
  
  // Honest validation - admit when we can't be sure
  Object.keys(data).forEach(key => {
    if (data[key] === undefined || data[key] === null) {
      validations.uncertainties.push(\`Cannot verify \${key}\`);
    }
  });
  
  // If we have uncertainties, we cannot claim full validity
  if (validations.uncertainties.length > 0) {
    validations.isValid = false;
  }
  
  return validations;
}`,
      teaching: {
        scripture: "Quran 17:81",
        verse: "And say: Truth has come and falsehood has vanished. Indeed, falsehood is bound to vanish.",
        lesson: "Honest code builds trust. Never compromise truth for convenience - uncertainty is better than false certainty."
      }
    },
    {
      id: 3,
      title: "Resource Sharing Algorithm",
      description: "Design an algorithm that fairly distributes resources among users.",
      difficulty: "Hard",
      moralTwist: "Ensure those with the greatest need receive priority, not those who can pay most.",
      example: "Input: users with different needs and resources",
      solution: `function shareResources(users, availableResources) {
  // Calculate need score (higher = more need)
  const calculateNeed = (user) => {
    const needFactors = {
      dependents: user.dependents || 0,
      income: Math.max(0, 100 - (user.income || 0)),
      health: user.healthIssues ? 20 : 0,
      emergency: user.emergency ? 30 : 0
    };
    return Object.values(needFactors).reduce((sum, val) => sum + val, 0);
  };
  
  // Sort by need (highest first)
  const sortedUsers = users
    .map(user => ({...user, needScore: calculateNeed(user)}))
    .sort((a, b) => b.needScore - a.needScore);
  
  const distribution = [];
  let remaining = availableResources;
  
  sortedUsers.forEach(user => {
    const allocation = Math.min(user.requested || 0, remaining);
    if (allocation > 0) {
      distribution.push({userId: user.id, allocated: allocation});
      remaining -= allocation;
    }
  });
  
  return distribution;
}`,
      teaching: {
        scripture: "Matthew 25:40",
        verse: "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.",
        lesson: "True algorithms serve humanity. Code should uplift the vulnerable, not amplify inequality."
      }
    }
  ];

  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
    setUserCode('');
    setShowSolution(false);
    setSolution('');
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
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            Programming puzzles with moral twists. Write code that reflects dharmic principles and learn spiritual wisdom.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Challenge List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 sacred-text">🧩 Challenges</h2>
            <div className="space-y-4">
              {(challenges.length > 0 ? challenges : staticChallenges).map((challenge) => (
                <div
                  key={challenge._id || challenge.id}
                  onClick={() => handleChallengeSelect(challenge)}
                  className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                    selectedChallenge?._id === challenge._id || selectedChallenge?.id === challenge.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 glow-card'
                      : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      challenge.difficulty === 'Easy' ? 'bg-green-600' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{challenge.description}</p>
                  <p className="text-xs text-amber-300 mt-2 italic">"{challenge.moralTwist}"</p>
                </div>
              ))}
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
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => showSolution ? setShowSolution(false) : loadSolution(selectedChallenge._id || selectedChallenge.id)}
                      className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:scale-105 transition-transform"
                    >
                      {showSolution ? 'Hide' : 'Show'} Solution
                    </button>
                    <button 
                      onClick={handleSubmitCode}
                      disabled={submitting || !userCode.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Code'}
                    </button>
                  </div>
                </div>

                {/* Solution */}
                {showSolution && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 sacred-text">✨ Dharmic Solution</h3>
                    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg overflow-x-auto">
                      <code>{solution || selectedChallenge.solution}</code>
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