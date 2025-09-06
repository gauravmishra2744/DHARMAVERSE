import krishnaWisdom from '../data/krishnaWisdom';

class AIService {
  async askSpritualQuestion(question, tradition = 'all') {
    try {
      const response = await fetch('http://localhost:5001/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, tradition })
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Backend API failed');
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getIntelligentResponse(question, tradition);
    }
  }

  createSpiritualPrompt(question, tradition) {
    return `You are a wise spiritual guru with deep knowledge of all world religions and spiritual traditions.

User's question: "${question}"
Spiritual tradition focus: ${tradition}

Provide compassionate spiritual guidance that:
1. Draws from authentic spiritual wisdom
2. Includes a relevant scripture quote with source
3. Offers practical advice for daily life
4. Is non-judgmental and respectful
5. Ends with a blessing or positive affirmation

Keep your response warm, wise, and encouraging (2-3 paragraphs).`;
  }

  formatSpiritualResponse(aiResponse, tradition) {
    // Parse and structure the AI response
    const sections = aiResponse.split('\n\n');
    
    return {
      guidance: aiResponse,
      tradition: tradition,
      timestamp: new Date().toISOString(),
      source: 'AI Spiritual Guru powered by Google AI'
    };
  }

  getIntelligentResponse(question, tradition) {
    const q = question.toLowerCase();
    
    // Universal philosophical questions - ALWAYS from Gita/Ramayana
    if (q.includes('what is death') || (q.includes('death') && !q.includes('after'))) {
      const data = krishnaWisdom.universalQuestions.whatIsDeath;
      return {
        guidance: `🔹️ **Krishna's Teaching on Death**\n\n"${data.gita.verse}"\n\n**Translation**: "${data.gita.translation}" (Bhagavad Gita ${data.gita.chapter})\n\n**Krishna's Wisdom**: ${data.explanation}\n\nDeath is merely the soul changing bodies, like a person changing clothes. The eternal soul is never born and never dies. Focus on realizing your true spiritual nature. 🙏`,
        tradition: 'Bhagavad Gita',
        timestamp: new Date().toISOString(),
        source: 'Bhagavad Gita - Lord Krishna\'s Teachings'
      };
    }
    
    if (q.includes('what happen after death') || q.includes('after death') || q.includes('afterlife')) {
      const data = krishnaWisdom.universalQuestions.whatHappensAfterDeath;
      return {
        guidance: `🔹️ **What Happens After Death - Krishna's Teaching**\n\n"${data.gita.verse}"\n\n**Translation**: "${data.gita.translation}" (Bhagavad Gita ${data.gita.chapter})\n\n**Krishna's Wisdom**: ${data.explanation}\n\n**The Process:**\n- The soul leaves the body at death\n- Consciousness at death determines next destination\n- Good karma leads to higher realms\n- Bad karma leads to lower births\n- Ultimate goal: Liberation from birth-death cycle\n\nRemember the divine always to attain the highest destination. 🙏`,
        tradition: 'Bhagavad Gita',
        timestamp: new Date().toISOString(),
        source: 'Bhagavad Gita - Lord Krishna\'s Teachings'
      };
    }
    
    if (q.includes('what is happiness') || (q.includes('happiness') && !q.includes('sadness'))) {
      const data = krishnaWisdom.universalQuestions.whatIsHappiness;
      return {
        guidance: `🌟 **Krishna's Teaching on True Happiness**\n\n"${data.gita.verse}"\n\n**Translation**: "${data.gita.translation}" (Bhagavad Gita ${data.gita.chapter})\n\n**Krishna's Wisdom**: ${data.explanation}\n\n**Types of Happiness:**\n- **Material happiness**: Temporary, like poison that seems sweet\n- **Spiritual happiness**: Eternal, like medicine that seems bitter but heals\n\nTrue happiness comes from self-realization, not from external objects. Seek the eternal bliss within. 🙏`,
        tradition: 'Bhagavad Gita',
        timestamp: new Date().toISOString(),
        source: 'Bhagavad Gita - Lord Krishna\'s Teachings'
      };
    }
    
    if (q.includes('what is sadness') || q.includes('sadness') || q.includes('sorrow')) {
      const data = krishnaWisdom.universalQuestions.whatIsSadness;
      return {
        guidance: `🔹️ **Krishna's Teaching on Sadness**\n\n"${data.gita.verse}"\n\n**Translation**: "${data.gita.translation}" (Bhagavad Gita ${data.gita.chapter})\n\n**Krishna's Wisdom**: ${data.explanation}\n\n**Overcoming Sadness:**\n- Understand your eternal nature as the soul\n- Practice equanimity in joy and sorrow\n- Detach from temporary experiences\n- Focus on spiritual growth\n\nThe wise do not lament because they see the eternal truth beyond temporary experiences. 🙏`,
        tradition: 'Bhagavad Gita',
        timestamp: new Date().toISOString(),
        source: 'Bhagavad Gita - Lord Krishna\'s Teachings'
      };
    }
    
    // Character questions
    if (q.includes('brother of ram') || q.includes('ram brother') || q.includes('rama brother')) {
      return {
        guidance: `🏹 **Brothers of Lord Rama**\n\nLord Rama had three beloved brothers:\n\n**1. Lakshmana** - The devoted brother who accompanied Rama during his 14-year exile. Symbol of loyalty and service.\n\n**2. Bharata** - The righteous brother who ruled Ayodhya in Rama's absence, placing Rama's sandals on the throne. Symbol of dharma and sacrifice.\n\n**3. Shatrughna** - Twin brother of Lakshmana, known for his strength and devotion to family.\n\n"भ्रातृप्रेम सर्वोपरि" - "Brotherly love is supreme"\n\nAll four brothers exemplified the ideal of family dharma and mutual love. 🙏`,
        tradition: 'Ramayana',
        timestamp: new Date().toISOString(),
        source: 'Ramayana - Valmiki'
      };
    }
    
    if (q.includes('arjuna') || q.includes('who is arjuna')) {
      return {
        guidance: `🏹 **Arjuna - The Ideal Disciple**\n\nArjuna was Krishna's dear friend, cousin, and the greatest archer of his time. He is the third Pandava brother and the recipient of the Bhagavad Gita's divine wisdom.\n\n**Arjuna's Qualities:**\n- **Skill**: Greatest archer (Gudakesha - conqueror of sleep)\n- **Devotion**: Krishna's beloved friend and disciple\n- **Righteousness**: Fought for dharma in Kurukshetra\n- **Humility**: Asked Krishna for guidance in his moment of doubt\n\n"पार्थ" (Partha) - Son of Pritha (Kunti), Krishna's affectionate name for him.\n\nArjuna represents the sincere seeker who surrenders to divine wisdom. 🙏`,
        tradition: 'Bhagavad Gita',
        timestamp: new Date().toISOString(),
        source: 'Bhagavad Gita - Mahabharata'
      };
    }
    
    // Krishna and Gita responses
    if (q.includes('krishna') || q.includes('gita') || q.includes('bhagavad')) {
      return this.getKrishnaResponse(question, tradition);
    }
    
    if (q.includes('ram') || q.includes('rama')) {
      return {
        guidance: `🕉️ Lord Rama - The Embodiment of Dharma

Lord Rama, the seventh avatar of Vishnu, represents the perfect embodiment of righteousness and virtue. Known as "Maryada Purushottama" (the ideal man), Rama's life exemplifies dharma in action.

The Ramayana teaches us: "धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः" - "Dharma destroys those who destroy it, and protects those who protect it."

Rama's devotion to his parents, his love for Sita, his friendship with Hanuman, and his compassion even for his enemies show us the path of righteous living. His 14-year exile teaches us about accepting life's challenges with grace and maintaining our principles even in adversity.

🙏 May Lord Rama's example inspire you to walk the path of dharma with courage and compassion.`,
        tradition: tradition,
        timestamp: new Date().toISOString(),
        source: 'Hindu Scripture - Ramayana'
      };
    }
    
    if (q.includes('peace') || q.includes('calm') || q.includes('anxiety')) {
      return {
        guidance: `☮️ Finding Inner Peace

True peace is not the absence of conflict, but the presence of inner harmony. As the Buddha taught: "Peace comes from within. Do not seek it without."

The Bhagavad Gita offers wisdom: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय" - "Established in yoga, perform action without attachment."

To cultivate peace: Practice daily meditation, release attachment to outcomes, cultivate gratitude, serve others selflessly, and remember that this too shall pass. Inner peace is your natural state when the mind is still.

🙏 May you find the peace that surpasses all understanding.`,
        tradition: tradition,
        timestamp: new Date().toISOString(),
        source: 'Universal Spiritual Wisdom'
      };
    }
    
    if (q.includes('love') || q.includes('relationship') || q.includes('heart')) {
      return {
        guidance: `💖 The Nature of Divine Love

Love is the fundamental force of the universe. As the Bible teaches: "God is love, and whoever abides in love abides in God." (1 John 4:16)

The Vedas declare: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः" - "May all beings be happy, may all beings be free from disease."

True love is unconditional, selfless, and sees the divine in all beings. Practice loving-kindness meditation, forgive freely, serve without expectation, and remember that love given multiplies, while love withheld diminishes the giver.

🙏 May your heart overflow with divine love and compassion.`,
        tradition: tradition,
        timestamp: new Date().toISOString(),
        source: 'Universal Love Teachings'
      };
    }
    
    if (q.includes('purpose') || q.includes('meaning') || q.includes('life')) {
      return {
        guidance: `🎯 Discovering Life's Purpose

Your purpose is not something you find, but something you create through conscious living. As the Upanishads teach: "तत्त्वमसि" - "Thou art That" - you are the divine essence you seek.

The Quran reminds us: "And I did not create the jinn and mankind except to worship Me." (51:56) - meaning to know and serve the divine.

Your dharma (life purpose) unfolds when you align your unique gifts with service to others. Listen to your heart, follow your joy, serve something greater than yourself, and trust that your path will reveal itself step by step.

🙏 May you discover and fulfill your sacred purpose with joy and dedication.`,
        tradition: tradition,
        timestamp: new Date().toISOString(),
        source: 'Sacred Purpose Teachings'
      };
    }
    
    // Default - Always use Krishna's wisdom for any spiritual question
    return this.getKrishnaResponse(question, tradition);
  }

  getKrishnaResponse(question, tradition) {
    const q = question.toLowerCase();
    let relevantVerse = krishnaWisdom.coreVerses.karma; // default
    
    // Match question to specific Gita teaching
    if (q.includes('anxiety') || q.includes('worry') || q.includes('stress')) {
      relevantVerse = krishnaWisdom.lifeGuidance.anxiety;
    } else if (q.includes('purpose') || q.includes('meaning')) {
      relevantVerse = krishnaWisdom.lifeGuidance.purpose;
    } else if (q.includes('death') || q.includes('soul')) {
      relevantVerse = krishnaWisdom.lifeGuidance.death;
    } else if (q.includes('love') || q.includes('relationship')) {
      relevantVerse = krishnaWisdom.lifeGuidance.relationships;
    } else if (q.includes('devotion') || q.includes('bhakti')) {
      relevantVerse = krishnaWisdom.coreVerses.devotion;
    } else if (q.includes('knowledge') || q.includes('wisdom')) {
      relevantVerse = krishnaWisdom.coreVerses.knowledge;
    }
    
    return {
      guidance: `🦚 Lord Krishna's Divine Wisdom\n\nAs Krishna teaches in the Bhagavad Gita, your question touches the eternal principles of dharma and spiritual growth.\n\n"${relevantVerse.verse}"\n\nTranslation: "${relevantVerse.translation}" (Bhagavad Gita ${relevantVerse.chapter})\n\n${relevantVerse.context || relevantVerse.guidance || 'This verse reveals the path to liberation through understanding our true nature and performing our duties without attachment to results.'}\n\nKrishna's teachings offer three paths: Karma Yoga (selfless action), Bhakti Yoga (devotion), and Jnana Yoga (knowledge). Choose the path that resonates with your nature, but remember that all paths lead to the same divine realization.\n\n🙏 May Krishna's eternal wisdom guide you to self-realization and inner peace.`,
      tradition: tradition,
      timestamp: new Date().toISOString(),
      source: 'Bhagavad Gita - Lord Krishna\'s Teachings'
    };
  }

  // Get spiritual traditions list
  getSpiritualTraditions() {
    return [
      { id: 'all', name: 'All Traditions', icon: '🕉️' },
      { id: 'krishna', name: 'Krishna & Gita', icon: '🦚' },
      { id: 'hinduism', name: 'Hinduism', icon: '🕉️' },
      { id: 'buddhism', name: 'Buddhism', icon: '☸️' },
      { id: 'christianity', name: 'Christianity', icon: '✝️' },
      { id: 'islam', name: 'Islam', icon: '☪️' },
      { id: 'judaism', name: 'Judaism', icon: '✡️' },
      { id: 'sikhism', name: 'Sikhism', icon: '☬' },
      { id: 'taoism', name: 'Taoism', icon: '☯️' }
    ];
  }
}

const aiServiceInstance = new AIService();
export default aiServiceInstance;