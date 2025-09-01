const API_BASE_URL = '/api';

export const challengeService = {
  // Get all challenges
  getChallenges: async () => {
    const response = await fetch(`${API_BASE_URL}/challenges`);
    return response.json();
  },

  // Get single challenge
  getChallenge: async (id) => {
    const response = await fetch(`${API_BASE_URL}/challenges/${id}`);
    return response.json();
  },

  // Get solution
  getSolution: async (id) => {
    const response = await fetch(`${API_BASE_URL}/challenges/${id}/solution`);
    return response.json();
  },

  // Submit code
  submitCode: async (challengeId, code, userId = 'anonymous') => {
    const response = await fetch(`${API_BASE_URL}/challenges/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeId, code, userId })
    });
    return response.json();
  }
};