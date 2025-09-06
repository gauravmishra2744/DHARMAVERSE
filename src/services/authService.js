const API_BASE_URL = 'http://localhost:5001/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('dharma_token');
    this.user = JSON.parse(localStorage.getItem('dharma_user') || 'null');
  }

  // Get auth headers
  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` })
    };
  }

  // Register user
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (data.success) {
        this.setAuthData(data.token, data.user);
      }
      
      return data;
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  }

  // Login user
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        this.setAuthData(data.token, data.user);
      }
      
      return data;
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  }

  // Google OAuth
  async googleAuth(tokenId) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenId })
      });

      const data = await response.json();
      
      if (data.success) {
        this.setAuthData(data.token, data.user);
      }
      
      return data;
    } catch (error) {
      return { success: false, message: 'Google authentication failed' };
    }
  }

  // Facebook OAuth
  async facebookAuth(accessToken, userID) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/facebook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, userID })
      });

      const data = await response.json();
      
      if (data.success) {
        this.setAuthData(data.token, data.user);
      }
      
      return data;
    } catch (error) {
      return { success: false, message: 'Facebook authentication failed' };
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: this.getAuthHeaders()
      });

      const data = await response.json();
      
      if (data.success) {
        this.user = data.user;
        localStorage.setItem('dharma_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch profile' };
    }
  }

  // Verify token
  async verifyToken() {
    if (!this.token) return { success: false };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: this.getAuthHeaders()
      });

      const data = await response.json();
      
      if (data.success) {
        this.user = data.user;
        localStorage.setItem('dharma_user', JSON.stringify(data.user));
      } else {
        this.logout();
      }
      
      return data;
    } catch (error) {
      this.logout();
      return { success: false, message: 'Token verification failed' };
    }
  }

  // Logout
  async logout() {
    try {
      if (this.token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: this.getAuthHeaders()
        });
      }
    } catch (error) {
      console.log('Logout request failed');
    } finally {
      this.clearAuthData();
    }
  }

  // Set authentication data
  setAuthData(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('dharma_token', token);
    localStorage.setItem('dharma_user', JSON.stringify(user));
  }

  // Clear authentication data
  clearAuthData() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('dharma_token');
    localStorage.removeItem('dharma_user');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Get token
  getToken() {
    return this.token;
  }

  // Update user karma
  updateKarma(points) {
    if (this.user) {
      this.user.karmaPoints += points;
      this.user.level = Math.floor(this.user.karmaPoints / 100) + 1;
      localStorage.setItem('dharma_user', JSON.stringify(this.user));
    }
  }
}

// Create singleton instance
const authServiceInstance = new AuthService();
export default authServiceInstance;