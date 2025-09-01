// src/services/chatbotService.js
import { promptTemplates } from '../utils/promptTemplates';
import krishnaWisdom from '../data/krishnaWisdom';

class ChatbotService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.baseUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`;
  }

  async sendMessage(message, religion = 'Universal') {
    // Check for specific response patterns first
    const specificResponse = this.getSpecificResponse(message);
    if (specificResponse) {
      return specificResponse;
    }
    
    if (!this.apiKey) {
      console.error("API Key is missing. Make sure you have created a .env file and restarted the server.");
      return {
        response: "I'm sorry, but the connection to my wisdom source is not configured. The API key is missing.",
        source: "System Error"
      };
    }
    return this.callGeminiAPI(message, religion);
  }

  async callGeminiAPI(userMessage, religion) {
    const religionKey = religion.toLowerCase();
    let template = promptTemplates[religionKey] || promptTemplates.general;
    
    // Enhanced prompt for Krishna/Gita related questions
    if (this.isKrishnaRelated(userMessage)) {
      template = this.enhanceKrishnaPrompt(template, userMessage);
    }

    const finalPrompt = template
      .replace('{user_input}', userMessage)
      .replace(new RegExp('{religion}', 'g'), religion);

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ "text": finalPrompt }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        return {
          response: "I sense a disturbance in the cosmic energies. The API returned an error. Please try again.",
          source: "API Error"
        };
      }

      const data = await response.json();
      const botResponseText = data.candidates[0].content.parts[0].text;

      return {
        response: botResponseText,
        source: `${religion} Wisdom via AI Guru`
      };

    } catch (error) {
      console.error('Network or other error:', error);
      return {
        response: "It seems my connection to the universal consciousness has been temporarily lost. Please check your internet connection.",
        source: "Network Error"
      };
    }
  }

  isKrishnaRelated(message) {
    const krishnaKeywords = [
      'krishna', 'gita', 'bhagavad', 'arjuna', 'kurukshetra', 'dharma', 'karma', 
      'yoga', 'devotion', 'bhakti', 'jnana', 'moksha', 'atman', 'brahman',
      'lord krishna', 'bhagwan', 'govinda', 'madhava', 'vasudeva'
    ];
    return krishnaKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  enhanceKrishnaPrompt(template, userMessage) {
    const relevantVerse = this.findRelevantVerse(userMessage);
    const krishnaContext = `

Additional Krishna Wisdom Context:
${relevantVerse ? `Relevant Gita Verse: ${relevantVerse.verse} (${relevantVerse.chapter}) - ${relevantVerse.translation}` : ''}

You have access to all 700 verses of the Bhagavad Gita. Draw from Krishna's complete teachings including:
- The three paths: Karma Yoga (selfless action), Bhakti Yoga (devotion), Jnana Yoga (knowledge)
- Core concepts: dharma, karma, moksha, atman, brahman, maya
- Practical guidance for modern life based on eternal principles
- Krishna's divine qualities and how to cultivate them

Speak with the authority and compassion of Lord Krishna himself.`;
    
    return template + krishnaContext;
  }

  findRelevantVerse(message) {
    const msg = message.toLowerCase();
    
    // Universal philosophical questions - ALWAYS answer from Gita/Ramayana
    if (msg.includes('what is death') || msg.includes('death')) {
      return krishnaWisdom.universalQuestions.whatIsDeath;
    }
    if (msg.includes('what happen after death') || msg.includes('after death') || msg.includes('afterlife')) {
      return krishnaWisdom.universalQuestions.whatHappensAfterDeath;
    }
    if (msg.includes('what is happiness') || msg.includes('happiness')) {
      return krishnaWisdom.universalQuestions.whatIsHappiness;
    }
    if (msg.includes('what is sadness') || msg.includes('sadness') || msg.includes('sorrow')) {
      return krishnaWisdom.universalQuestions.whatIsSadness;
    }
    
    // Specific character/story questions
    if (msg.includes('brother of ram') || msg.includes('ram brother') || msg.includes('rama brother')) {
      return {
        verse: "भ्राता भ्राता च मे सखा",
        translation: "Brother is brother and my friend",
        chapter: "Ramayana",
        context: "Rama had three brothers: Lakshmana (who accompanied him in exile), Bharata (who ruled in his absence), and Shatrughna (twin of Lakshmana)"
      };
    }
    if (msg.includes('arjuna') || msg.includes('who is arjuna')) {
      return {
        verse: "पार्थोऽसि मे सखा चेति",
        translation: "You are Partha, my dear friend",
        chapter: "Bhagavad Gita",
        context: "Arjuna was Krishna's friend, cousin, and disciple. The greatest archer, third Pandava brother, and recipient of the Gita's wisdom on the battlefield of Kurukshetra."
      };
    }
    if (msg.includes('hanuman') || msg.includes('who is hanuman')) {
      return {
        verse: "राम काज कीन्हे बिना मोहि कहाँ विश्राम",
        translation: "Without completing Rama's work, where is rest for me?",
        chapter: "Ramayana",
        context: "Hanuman is the perfect devotee - son of wind god, devoted to Rama, symbol of strength, courage, and selfless service."
      };
    }
    
    // Krishna's teachings
    if (msg.includes('what krishna said') || msg.includes('krishna said') || msg.includes('krishna teach')) {
      return krishnaWisdom.coreVerses.karma;
    }
    
    // Life guidance from Gita
    if (msg.includes('anxiety') || msg.includes('worry') || msg.includes('stress')) {
      return krishnaWisdom.lifeGuidance.anxiety;
    }
    if (msg.includes('purpose') || msg.includes('meaning') || msg.includes('why')) {
      return krishnaWisdom.lifeGuidance.purpose;
    }
    if (msg.includes('relationship') || msg.includes('love') || msg.includes('family')) {
      return krishnaWisdom.lifeGuidance.relationships;
    }
    if (msg.includes('work') || msg.includes('job') || msg.includes('duty')) {
      return krishnaWisdom.coreVerses.karma;
    }
    if (msg.includes('devotion') || msg.includes('bhakti') || msg.includes('worship')) {
      return krishnaWisdom.coreVerses.devotion;
    }
    if (msg.includes('knowledge') || msg.includes('wisdom') || msg.includes('understand')) {
      return krishnaWisdom.coreVerses.knowledge;
    }
    
    // Default to the most important verse
    return krishnaWisdom.coreVerses.karma;
  }

  // Add specific response patterns for common questions
  getSpecificResponse(message) {
    const msg = message.toLowerCase();
    
    // Universal philosophical questions - ALWAYS from Gita/Ramayana
    if (msg.includes('what is death') || (msg.includes('death') && !msg.includes('after'))) {
      const data = krishnaWisdom.universalQuestions.whatIsDeath;
      return {
        response: `🕉️ **Krishna's Teaching on Death**\n\n"${data.gita.verse}"\n\n**Translation**: "${data.gita.translation}" (Bhagavad Gita ${data.gita.chapter})\n\n**Krishna's Wisdom**: ${data.explanation}\n\nDeath is merely the soul changing bodies, like a person changing clothes. The eternal soul is never born and never dies. Focus on realizing your true spiritual nature. 🙏`,
        source: "Bhagavad Gita - Lord Krishna's Teachings"
      };
    }
    
    if (msg.includes('what happen after death') || msg.includes('after death') || msg.includes('afterlife')) {
      const data = krishnaWisdom.universalQuestions.whatHappensAfterDeath;
      return {
        response: `🕉️ **What Happens After Death - Krishna's Teaching**\n\n"${data.gita.verse}"\n\n**Translation**: "${data.gita.translation}" (Bhagavad Gita ${data.gita.chapter})\n\n**Krishna's Wisdom**: ${data.explanation}\n\n**The Process:**\n- The soul leaves the body at death\n- Consciousness at death determines next destination\n- Good karma leads to higher realms\n- Bad karma leads to lower births\n- Ultimate goal: Liberation from birth-death cycle\n\nRemember the divine always to attain the highest destination. 🙏`,
        source: "Bhagavad Gita - Lord Krishna's Teachings"
      };
    }
    
    if (msg.includes('what is happiness') || (msg.includes('happiness') && !msg.includes('sadness'))) {
      const data = krishnaWisdom.universalQuestions.whatIsHappiness;
      return {
        response: `🌟 **Krishna's Teaching on True Happiness**\n\n"${data.gita.verse}"\n\n**Translation**: "${data.gita.translation}" (Bhagavad Gita ${data.gita.chapter})\n\n**Krishna's Wisdom**: ${data.explanation}\n\n**Types of Happiness:**\n- **Material happiness**: Temporary, like poison that seems sweet\n- **Spiritual happiness**: Eternal, like medicine that seems bitter but heals\n\nTrue happiness comes from self-realization, not from external objects. Seek the eternal bliss within. 🙏`,
        source: "Bhagavad Gita - Lord Krishna's Teachings"
      };
    }
    
    if (msg.includes('what is sadness') || msg.includes('sadness') || msg.includes('sorrow')) {
      const data = krishnaWisdom.universalQuestions.whatIsSadness;
      return {
        response: `🕉️ **Krishna's Teaching on Sadness**\n\n"${data.gita.verse}"\n\n**Translation**: "${data.gita.translation}" (Bhagavad Gita ${data.gita.chapter})\n\n**Krishna's Wisdom**: ${data.explanation}\n\n**Overcoming Sadness:**\n- Understand your eternal nature as the soul\n- Practice equanimity in joy and sorrow\n- Detach from temporary experiences\n- Focus on spiritual growth\n\nThe wise do not lament because they see the eternal truth beyond temporary experiences. 🙏`,
        source: "Bhagavad Gita - Lord Krishna's Teachings"
      };
    }
    
    // Character questions
    if (msg.includes('brother of ram') || msg.includes('ram brother') || msg.includes('rama brother')) {
      return {
        response: `🏹 **Brothers of Lord Rama**\n\nLord Rama had three beloved brothers:\n\n**1. Lakshmana** - The devoted brother who accompanied Rama during his 14-year exile. Symbol of loyalty and service.\n\n**2. Bharata** - The righteous brother who ruled Ayodhya in Rama's absence, placing Rama's sandals on the throne. Symbol of dharma and sacrifice.\n\n**3. Shatrughna** - Twin brother of Lakshmana, known for his strength and devotion to family.\n\n"भ्रातृप्रेम सर्वोपरि" - "Brotherly love is supreme"\n\nAll four brothers exemplified the ideal of family dharma and mutual love. 🙏`,
        source: "Ramayana - Valmiki"
      };
    }
    
    if (msg.includes('arjuna') || msg.includes('who is arjuna')) {
      return {
        response: `🏹 **Arjuna - The Ideal Disciple**\n\nArjuna was Krishna's dear friend, cousin, and the greatest archer of his time. He is the third Pandava brother and the recipient of the Bhagavad Gita's divine wisdom.\n\n**Arjuna's Qualities:**\n- **Skill**: Greatest archer (Gudakesha - conqueror of sleep)\n- **Devotion**: Krishna's beloved friend and disciple\n- **Righteousness**: Fought for dharma in Kurukshetra\n- **Humility**: Asked Krishna for guidance in his moment of doubt\n\n"पार्थ" (Partha) - Son of Pritha (Kunti), Krishna's affectionate name for him.\n\nArjuna represents the sincere seeker who surrenders to divine wisdom. 🙏`,
        source: "Bhagavad Gita - Mahabharata"
      };
    }
    
    return null;
  }
}

export default new ChatbotService();