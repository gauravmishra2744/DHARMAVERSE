// Mock Authentication Service
class AuthService {
  constructor() {
    this.currentUser = null;
  }

  async login(email, password) {
    // Mock login - replace with real authentication
    const user = {
      id: Date.now(),
      name: email.split('@')[0],
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=d4af37&color=000`,
      karmaPoints: parseInt(localStorage.getItem('karmaPoints') || '0'),
      streak: parseInt(localStorage.getItem('streak') || '0'),
      joinDate: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
    return user;
  }
  
  async register(name, email, password) {
    // Mock registration
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=d4af37&color=000`,
      karmaPoints: 0,
      streak: 0,
      joinDate: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
    return user;
  }
  
  logout() {
    localStorage.removeItem('user');
    this.currentUser = null;
  }
  
  getCurrentUser() {
    if (!this.currentUser) {
      const stored = localStorage.getItem('user');
      this.currentUser = stored ? JSON.parse(stored) : null;
    }
    return this.currentUser;
  }
  
  updateProfile(updates) {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }
    return this.currentUser;
  }
}

export const authService = new AuthService();