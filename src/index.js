import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AskPage from './pages/AskPage';
import QuizPage from './pages/QuizPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import VideosPage from './pages/VideosPage';
import KarmicChallengesPage from './pages/KarmicChallengesPage';
import AchievementsPage from './pages/AchievementsPage';

import AuthProvider from './components/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/challenges" element={<KarmicChallengesPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);