// Comprehensive pool of Karmic Challenges with different categories
export const karmicChallengePool = {
  beginner: [
    {
      id: 'b1',
      title: "Honest Calculator",
      description: "Create a calculator that refuses to help with dishonest calculations.",
      difficulty: "Easy",
      category: "Ethics",
      moralTwist: "The calculator should detect and refuse calculations that might be used for cheating (like splitting bills unfairly).",
      example: "calculator.divide(100, 3) // Should warn about fair sharing",
      hints: ["Check for unfair divisions", "Consider the context of calculations"],
      solution: `function honestCalculator() {
  return {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
      if (b === 0) return "Cannot divide by zero - be honest about impossibilities";
      const result = a / b;
      if (a > 50 && b > 2 && result % 1 !== 0) {
        return {
          result: result,
          warning: "Consider fair sharing - perhaps round to benefit others"
        };
      }
      return result;
    }
  };
}`,
      teaching: {
        scripture: "Bhagavad Gita 17.15",
        verse: "Speech that is truthful, pleasant, beneficial, and not agitating to others is called austerity of speech.",
        lesson: "Even our tools should embody honesty. Code that promotes fairness creates a better world."
      },
      testCases: [
        { input: [10, 2], operation: 'divide', expected: 5 },
        { input: [100, 3], operation: 'divide', expected: { result: 33.33, warning: true } }
      ]
    },
    {
      id: 'b2',
      title: "Gratitude Counter",
      description: "Build a counter that tracks positive actions and reminds users to be grateful.",
      difficulty: "Easy",
      category: "Mindfulness",
      moralTwist: "For every 5 positive actions, the counter should suggest a moment of gratitude.",
      example: "counter.addAction('helped neighbor') // Should track and suggest gratitude",
      hints: ["Track positive keywords", "Implement gratitude reminders"],
      solution: `function gratitudeCounter() {
  let actions = [];
  const positiveWords = ['help', 'share', 'give', 'care', 'love', 'support'];
  
  return {
    addAction: function(action) {
      const isPositive = positiveWords.some(word => 
        action.toLowerCase().includes(word)
      );
      
      if (isPositive) {
        actions.push({ action, timestamp: new Date(), positive: true });
        
        if (actions.filter(a => a.positive).length % 5 === 0) {
          return {
            count: actions.length,
            message: "🙏 Take a moment to feel grateful for the good you've done!"
          };
        }
      }
      
      actions.push({ action, timestamp: new Date(), positive: isPositive });
      return { count: actions.length };
    },
    getStats: () => ({
      total: actions.length,
      positive: actions.filter(a => a.positive).length
    })
  };
}`,
      teaching: {
        scripture: "Quran 14:7",
        verse: "If you are grateful, I will certainly give you more.",
        lesson: "Gratitude transforms our perspective. Code that reminds us to be thankful creates positive habits."
      }
    },
    {
      id: 'b3',
      title: "Patience Timer",
      description: "Create a timer that teaches patience by gradually increasing wait times.",
      difficulty: "Easy",
      category: "Virtue",
      moralTwist: "Each use requires slightly more patience, teaching the virtue of waiting.",
      example: "timer.start() // First use: 1 second, second use: 2 seconds, etc.",
      hints: ["Store usage count", "Increase delay progressively"],
      solution: `function patienceTimer() {
  let useCount = 0;
  
  return {
    start: function(callback) {
      useCount++;
      const waitTime = useCount * 1000; // Increase by 1 second each time
      
      console.log(\`Teaching patience... please wait \${useCount} seconds\`);
      
      setTimeout(() => {
        callback({
          message: "Patience is a virtue you've just practiced!",
          waitTime: waitTime,
          lesson: "Good things come to those who wait."
        });
      }, waitTime);
    },
    reset: () => { useCount = 0; }
  };
}`,
      teaching: {
        scripture: "Bible - Romans 12:12",
        verse: "Be joyful in hope, patient in affliction, faithful in prayer.",
        lesson: "Patience is a cornerstone of wisdom. Code that teaches waiting builds character."
      }
    }
  ],
  
  intermediate: [
    {
      id: 'i1',
      title: "Karma Ledger",
      description: "Design a system that tracks good and bad deeds with karmic consequences.",
      difficulty: "Medium",
      category: "Karma",
      moralTwist: "Bad deeds should have compounding negative effects, while good deeds should heal past wrongs.",
      example: "ledger.addDeed('helped elderly', 'good') // Should increase karma score",
      hints: ["Implement karma scoring", "Add deed categories", "Create consequence system"],
      solution: `function karmaLedger() {
  let deeds = [];
  let karmaScore = 0;
  
  const deedValues = {
    good: { base: 10, multiplier: 1.1 },
    neutral: { base: 0, multiplier: 1 },
    bad: { base: -15, multiplier: 1.2 }
  };
  
  return {
    addDeed: function(description, type) {
      const deed = {
        description,
        type,
        timestamp: new Date(),
        id: Date.now()
      };
      
      deeds.push(deed);
      
      // Calculate karma impact
      const goodDeeds = deeds.filter(d => d.type === 'good').length;
      const badDeeds = deeds.filter(d => d.type === 'bad').length;
      
      let impact = deedValues[type].base;
      
      if (type === 'good' && badDeeds > 0) {
        // Good deeds heal past wrongs
        impact *= (1 + (badDeeds * 0.1));
      } else if (type === 'bad') {
        // Bad deeds compound
        impact *= Math.pow(deedValues[type].multiplier, badDeeds);
      }
      
      karmaScore += impact;
      
      return {
        deed,
        karmaScore: Math.round(karmaScore),
        message: this.getKarmaMessage()
      };
    },
    
    getKarmaMessage: function() {
      if (karmaScore > 100) return "🌟 Your karma shines brightly!";
      if (karmaScore > 50) return "✨ Good karma is building!";
      if (karmaScore > 0) return "🌱 Your karma is growing.";
      if (karmaScore > -50) return "⚠️ Be mindful of your actions.";
      return "🌧️ Time to make amends and do good.";
    },
    
    getStats: () => ({
      totalDeeds: deeds.length,
      karmaScore: Math.round(karmaScore),
      breakdown: {
        good: deeds.filter(d => d.type === 'good').length,
        neutral: deeds.filter(d => d.type === 'neutral').length,
        bad: deeds.filter(d => d.type === 'bad').length
      }
    })
  };
}`,
      teaching: {
        scripture: "Bhagavad Gita 4.17",
        verse: "The nature of action and inaction is difficult to understand. Therefore, I shall explain what action is, knowing which you will be liberated from evil.",
        lesson: "Every action has consequences. Code that tracks karma helps us understand the weight of our choices."
      }
    },
    {
      id: 'i2',
      title: "Compassionate Queue",
      description: "Implement a queue that prioritizes those in urgent need over regular requests.",
      difficulty: "Medium",
      category: "Compassion",
      moralTwist: "Emergency cases should jump the queue, but frequent queue-jumpers should be penalized.",
      example: "queue.add({name: 'John', urgent: true, reason: 'medical'}) // Should prioritize",
      hints: ["Implement priority levels", "Track queue-jumping", "Add penalty system"],
      solution: `function compassionateQueue() {
  let queue = [];
  let jumpHistory = new Map();
  
  const urgencyLevels = {
    emergency: 100,
    urgent: 50,
    normal: 10,
    low: 1
  };
  
  return {
    add: function(person) {
      const { name, urgency = 'normal', reason } = person;
      
      // Check jump history
      const jumpCount = jumpHistory.get(name) || 0;
      let priority = urgencyLevels[urgency];
      
      // Penalty for frequent jumping
      if (jumpCount > 2 && urgency !== 'emergency') {
        priority = Math.max(1, priority - (jumpCount * 10));
      }
      
      const queueItem = {
        ...person,
        priority,
        addedAt: new Date(),
        jumpCount
      };
      
      // Insert based on priority
      let inserted = false;
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].priority < priority) {
          queue.splice(i, 0, queueItem);
          inserted = true;
          break;
        }
      }
      
      if (!inserted) queue.push(queueItem);
      
      // Track jumping if not normal priority
      if (urgency !== 'normal') {
        jumpHistory.set(name, jumpCount + 1);
      }
      
      return {
        position: queue.findIndex(item => item.name === name) + 1,
        message: this.getQueueMessage(queueItem)
      };
    },
    
    serve: function() {
      return queue.shift();
    },
    
    getQueueMessage: function(item) {
      if (item.priority >= 100) return "🚨 Emergency - serving immediately";
      if (item.priority >= 50) return "⚡ Urgent case - moved up in queue";
      if (item.jumpCount > 2) return "⚠️ Frequent queue jumping detected - priority reduced";
      return "✅ Added to queue";
    },
    
    getQueue: () => queue.map((item, index) => ({
      position: index + 1,
      name: item.name,
      urgency: item.urgency,
      priority: item.priority
    }))
  };
}`,
      teaching: {
        scripture: "Matthew 20:16",
        verse: "So the last will be first, and the first will be last.",
        lesson: "True systems serve those in greatest need first. Compassionate algorithms reflect divine justice."
      }
    },
    {
      id: 'i3',
      title: "Truth Propagation Network",
      description: "Build a network that spreads truth while filtering out misinformation.",
      difficulty: "Medium",
      category: "Truth",
      moralTwist: "Information should be verified before spreading, and sources should be tracked for credibility.",
      example: "network.shareInfo('Earth is round', {source: 'NASA', verified: true})",
      hints: ["Implement source tracking", "Add verification system", "Create credibility scoring"],
      solution: `function truthNetwork() {
  let information = new Map();
  let sources = new Map();
  
  return {
    shareInfo: function(content, metadata = {}) {
      const { source, verified = false, evidence = [] } = metadata;
      
      // Check source credibility
      let sourceScore = sources.get(source) || 50;
      
      const info = {
        content,
        source,
        verified,
        evidence,
        sourceScore,
        timestamp: new Date(),
        shareCount: 0,
        truthScore: this.calculateTruthScore(verified, evidence, sourceScore)
      };
      
      information.set(content, info);
      
      return {
        shared: info.truthScore > 30,
        truthScore: info.truthScore,
        message: this.getTruthMessage(info)
      };
    },
    
    calculateTruthScore: function(verified, evidence, sourceScore) {
      let score = sourceScore;
      if (verified) score += 30;
      score += evidence.length * 10;
      return Math.min(100, score);
    },
    
    getTruthMessage: function(info) {
      if (info.truthScore > 80) return "✅ High confidence - sharing widely";
      if (info.truthScore > 50) return "⚠️ Moderate confidence - verify before sharing";
      if (info.truthScore > 30) return "❓ Low confidence - needs more verification";
      return "🚫 Insufficient credibility - not sharing";
    },
    
    updateSourceCredibility: function(source, change) {
      const current = sources.get(source) || 50;
      sources.set(source, Math.max(0, Math.min(100, current + change)));
    },
    
    getNetworkStats: () => ({
      totalInfo: information.size,
      verifiedInfo: Array.from(information.values()).filter(i => i.verified).length,
      averageTruthScore: Array.from(information.values())
        .reduce((sum, info) => sum + info.truthScore, 0) / information.size || 0
    })
  };
}`,
      teaching: {
        scripture: "John 8:32",
        verse: "Then you will know the truth, and the truth will set you free.",
        lesson: "Truth is sacred and must be protected. Code that fights misinformation serves humanity's highest good."
      }
    }
  ],
  
  advanced: [
    {
      id: 'a1',
      title: "Dharmic Resource Allocator",
      description: "Create an AI system that distributes resources based on dharmic principles.",
      difficulty: "Hard",
      category: "Justice",
      moralTwist: "The system must balance individual needs, societal benefit, and karmic justice.",
      example: "allocator.distribute(resources, recipients) // Must consider need, karma, and contribution",
      hints: ["Multi-factor scoring", "Implement dharmic principles", "Balance competing needs"],
      solution: `function dharmicAllocator() {
  return {
    distribute: function(resources, recipients) {
      // Calculate dharmic scores for each recipient
      const scoredRecipients = recipients.map(recipient => ({
        ...recipient,
        dharmicScore: this.calculateDharmicScore(recipient)
      }));
      
      // Sort by dharmic score (highest need + best karma)
      scoredRecipients.sort((a, b) => b.dharmicScore - a.dharmicScore);
      
      const distribution = [];
      let remainingResources = { ...resources };
      
      for (const recipient of scoredRecipients) {
        const allocation = this.calculateAllocation(recipient, remainingResources);
        
        if (allocation.total > 0) {
          distribution.push({
            recipient: recipient.name,
            allocation,
            dharmicScore: recipient.dharmicScore,
            reasoning: this.getReasoningMessage(recipient, allocation)
          });
          
          // Update remaining resources
          Object.keys(allocation).forEach(resource => {
            if (remainingResources[resource]) {
              remainingResources[resource] -= allocation[resource] || 0;
            }
          });
        }
      }
      
      return {
        distribution,
        remainingResources,
        dharmicBalance: this.assessDharmicBalance(distribution)
      };
    },
    
    calculateDharmicScore: function(recipient) {
      const {
        need = 0,           // 0-100 scale of need
        karma = 50,         // 0-100 scale of past good deeds
        dependents = 0,     // Number of people depending on them
        contribution = 0,   // Past contribution to society
        emergency = false   // Emergency situation
      } = recipient;
      
      let score = 0;
      
      // Need factor (40% weight)
      score += need * 0.4;
      
      // Karma factor (30% weight)
      score += karma * 0.3;
      
      // Dependents factor (20% weight)
      score += Math.min(dependents * 10, 50) * 0.2;
      
      // Contribution factor (10% weight)
      score += contribution * 0.1;
      
      // Emergency multiplier
      if (emergency) score *= 1.5;
      
      return Math.min(100, score);
    },
    
    calculateAllocation: function(recipient, availableResources) {
      const allocation = {};
      const maxAllocation = recipient.dharmicScore / 100;
      
      Object.keys(availableResources).forEach(resource => {
        const available = availableResources[resource];
        const needed = recipient.needs?.[resource] || 0;
        
        allocation[resource] = Math.min(
          needed,
          available * maxAllocation,
          available * 0.3 // No single person gets more than 30% of any resource
        );
      });
      
      allocation.total = Object.values(allocation).reduce((sum, val) => sum + val, 0);
      return allocation;
    },
    
    getReasoningMessage: function(recipient, allocation) {
      const reasons = [];
      
      if (recipient.emergency) reasons.push("Emergency situation");
      if (recipient.need > 80) reasons.push("High need");
      if (recipient.karma > 70) reasons.push("Good karma");
      if (recipient.dependents > 0) reasons.push(\`Supporting \${recipient.dependents} dependents\`);
      
      return reasons.length > 0 ? reasons.join(", ") : "Standard allocation";
    },
    
    assessDharmicBalance: function(distribution) {
      const totalAllocated = distribution.reduce((sum, d) => sum + d.allocation.total, 0);
      const averageScore = distribution.reduce((sum, d) => sum + d.dharmicScore, 0) / distribution.length;
      
      return {
        fairness: averageScore > 50 ? "Good" : "Needs improvement",
        efficiency: totalAllocated > 0 ? "Resources distributed" : "No distribution possible",
        dharmaAlignment: averageScore > 60 ? "High" : averageScore > 40 ? "Medium" : "Low"
      };
    }
  };
}`,
      teaching: {
        scripture: "Bhagavad Gita 3.25",
        verse: "As the ignorant perform their duties with attachment to results, the learned may similarly act, but without attachment, for the sake of leading people on the right path.",
        lesson: "True algorithms serve dharma, not profit. Code that embodies justice creates a more equitable world."
      }
    }
  ]
};

// Function to get random challenges
export function getRandomChallenges(difficulty = null, count = 3) {
  let pool = [];
  
  if (difficulty) {
    pool = karmicChallengePool[difficulty] || [];
  } else {
    pool = [
      ...karmicChallengePool.beginner,
      ...karmicChallengePool.intermediate,
      ...karmicChallengePool.advanced
    ];
  }
  
  // Shuffle and return random challenges
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Function to get challenge by category
export function getChallengesByCategory(category) {
  const allChallenges = [
    ...karmicChallengePool.beginner,
    ...karmicChallengePool.intermediate,
    ...karmicChallengePool.advanced
  ];
  
  return allChallenges.filter(challenge => challenge.category === category);
}

// Function to get daily challenge
export function getDailyChallenge() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  const allChallenges = [
    ...karmicChallengePool.beginner,
    ...karmicChallengePool.intermediate,
    ...karmicChallengePool.advanced
  ];
  
  // Use day of year as seed for consistent daily challenge
  return allChallenges[dayOfYear % allChallenges.length];
}