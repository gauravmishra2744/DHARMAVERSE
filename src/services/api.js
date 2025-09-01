import aiService from './aiService';

// Scripture APIs Integration - Fallback function
export const getAIResponse = async (question, religion) => {
  // Try Google AI first, fallback to static responses
  try {
    return await aiService.askSpritualQuestion(question, religion);
  } catch (error) {
    console.warn('Using fallback responses:', error);
    return getFallbackResponse(question, religion);
  }
};

const getFallbackResponse = async (question, religion) => {
  const responses = {
    "I feel judged": {
      Christianity: {
        verse: "Judge not, that ye be not judged. - Matthew 7:1",
        lesson: "Focus on self-improvement rather than others' opinions",
        interpretation: "When we feel judged, remember that everyone struggles. Use this as motivation for personal growth."
      },
      Hinduism: {
        verse: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। - Bhagavad Gita 2.47",
        lesson: "You have the right to perform your actions, but not to the fruits",
        interpretation: "Focus on your dharma and actions, not on what others think of the results."
      },
      Islam: {
        verse: "And whoever relies upon Allah - then He is sufficient for him. - Quran 65:3",
        lesson: "Trust in Allah's plan and judgment",
        interpretation: "Human judgment is limited, but Allah's wisdom is infinite."
      }
    },
    "I fear failure": {
      Christianity: {
        verse: "I can do all things through Christ who strengthens me. - Philippians 4:13",
        lesson: "Strength comes from faith, not from avoiding failure",
        interpretation: "Failure is a stepping stone to growth. Trust in divine strength."
      },
      Hinduism: {
        verse: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। - Bhagavad Gita 2.48",
        lesson: "Perform your duty with equanimity",
        interpretation: "Fear of failure comes from attachment. Act with dedication but detachment."
      }
    }
  };

  const response = responses[question]?.[religion] || {
    verse: "Seek and you shall find. - Universal Wisdom",
    lesson: "Every question leads to growth",
    interpretation: "Your spiritual journey is unique. Trust the process."
  };

  return new Promise(resolve => {
    setTimeout(() => resolve(response), 1000);
  });
};

// Export AI service for direct use
export { aiService };

export const getDailyWisdom = async () => {
  const dailyWisdom = [
    {
      verse: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।",
      translation: "May all beings be happy, may all beings be healthy.",
      source: "Sanskrit Prayer",
      lesson: "Universal compassion brings inner peace"
    },
    {
      verse: "Be still and know that I am God.",
      source: "Psalm 46:10", 
      lesson: "In stillness, we find divine presence"
    }
  ];

  const today = new Date().getDate();
  return dailyWisdom[today % dailyWisdom.length];
};