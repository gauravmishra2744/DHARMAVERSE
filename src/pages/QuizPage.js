import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../Particles';
import Header from '../components/Header';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const questions = [
    {
      question: "What motivates you most in life?",
      options: [
        { text: "Serving others and making a difference", type: "karma" },
        { text: "Seeking knowledge and understanding", type: "jnana" },
        { text: "Devotion and spiritual connection", type: "bhakti" },
        { text: "Inner peace and meditation", type: "raja" }
      ]
    },
    {
      question: "How do you handle stress?",
      options: [
        { text: "Help others to forget my problems", type: "karma" },
        { text: "Analyze and understand the situation", type: "jnana" },
        { text: "Pray or seek divine guidance", type: "bhakti" },
        { text: "Meditate and find inner calm", type: "raja" }
      ]
    },
    {
      question: "What brings you the most joy?",
      options: [
        { text: "Seeing others happy because of my actions", type: "karma" },
        { text: "Learning something new and profound", type: "jnana" },
        { text: "Feeling connected to the divine", type: "bhakti" },
        { text: "Moments of perfect stillness and clarity", type: "raja" }
      ]
    },
    {
      question: "Your ideal way to spend free time?",
      options: [
        { text: "Volunteering or helping community", type: "karma" },
        { text: "Reading spiritual or philosophical texts", type: "jnana" },
        { text: "Singing, chanting, or worship", type: "bhakti" },
        { text: "Meditation or yoga practice", type: "raja" }
      ]
    },
    {
      question: "What describes your approach to spirituality?",
      options: [
        { text: "Through selfless service and action", type: "karma" },
        { text: "Through study and contemplation", type: "jnana" },
        { text: "Through love and devotion", type: "bhakti" },
        { text: "Through discipline and meditation", type: "raja" }
      ]
    }
  ];

  const personalities = {
    karma: {
      title: "Karma Yogi - The Selfless Server",
      description: "You find fulfillment through action and service. Your path is one of selfless work and helping others.",
      traits: ["Compassionate", "Action-oriented", "Service-minded", "Generous"],
      guidance: "Continue serving others without attachment to results. Your dharma is fulfilled through selfless action.",
      icon: "🤝"
    },
    jnana: {
      title: "Jnana Yogi - The Seeker of Wisdom",
      description: "You are drawn to knowledge and understanding. Your path is through study, contemplation, and wisdom.",
      traits: ["Analytical", "Philosophical", "Curious", "Wise"],
      guidance: "Seek truth through study and self-inquiry. Question everything and find the eternal within the temporary.",
      icon: "📚"
    },
    bhakti: {
      title: "Bhakti Yogi - The Devoted Heart",
      description: "Your path is through love, devotion, and emotional connection to the divine.",
      traits: ["Loving", "Devotional", "Emotional", "Faithful"],
      guidance: "Cultivate love and devotion. See the divine in all beings and surrender with complete faith.",
      icon: "❤️"
    },
    raja: {
      title: "Raja Yogi - The Disciplined Meditator",
      description: "You seek liberation through discipline, meditation, and control of the mind.",
      traits: ["Disciplined", "Focused", "Peaceful", "Introspective"],
      guidance: "Practice regular meditation and self-discipline. Master your mind to achieve inner peace.",
      icon: "🧘"
    }
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option.type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers) => {
    const counts = {};
    allAnswers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const dominantType = Object.keys(counts).reduce((a, b) => 
      counts[a] > counts[b] ? a : b
    );

    setResult(personalities[dominantType]);
    
    // Award karma points for completing quiz
    const currentPoints = parseInt(localStorage.getItem('karmaPoints') || '0');
    localStorage.setItem('karmaPoints', (currentPoints + 50).toString());
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen vedic-brown text-white relative overflow-hidden">
      <Particles />
      
      <div className="relative z-10 p-6">
        <Header />
        <div className="pt-20 mb-8"></div>

        <div className="max-w-2xl mx-auto">
          {!result ? (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 sacred-text">Dharma Personality Quiz</h1>
                <p className="text-amber-200">Discover your spiritual path through ancient yogic wisdom</p>
                <div className="mt-4">
                  <div className="bg-amber-900/30 rounded-full h-2">
                    <div 
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-amber-300 mt-2">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
              </div>

              <div className="dharma-card p-8 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6 text-center sacred-text">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 text-left bg-amber-900/30 hover:bg-amber-800/40 rounded-lg transition-colors border border-amber-700/30 hover:border-amber-600"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="dharma-card p-8 rounded-xl">
                <div className="text-6xl mb-4">{result.icon}</div>
                <h2 className="text-3xl font-bold mb-4 sacred-text">{result.title}</h2>
                <p className="text-lg text-amber-200 mb-6">{result.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-amber-300">Your Traits:</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {result.traits.map((trait, index) => (
                      <span key={index} className="px-3 py-1 bg-amber-800/30 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8 p-4 bg-amber-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-amber-300">Spiritual Guidance:</h3>
                  <p className="text-amber-100">{result.guidance}</p>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-semibold glow-button hover:scale-105 transition-transform"
                  >
                    Take Quiz Again
                  </button>
                  <Link 
                    to="/ask"
                    className="px-6 py-2 border border-amber-600 rounded-lg hover:bg-amber-600/10 transition-colors"
                  >
                    Ask Questions
                  </Link>
                </div>
                
                <div className="mt-6 text-sm text-amber-400">
                  🎉 +50 Karma Points Earned!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;