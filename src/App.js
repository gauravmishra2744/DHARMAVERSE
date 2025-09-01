import React, { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Particles from "./Particles";
import Header from "./components/Header";

function App() {
  const aiBrainRef = useRef(null);
  const dataNetworkRef = useRef(null);
  const svgRefs = [aiBrainRef, dataNetworkRef];

  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-900 relative overflow-hidden" onMouseMove={handleMouseMove}>
      <Particles svgRefs={svgRefs} mousePos={mousePos} />

      {/* AI Assistant Cursor */}
      {mousePos.x && mousePos.y && (
        <div
          style={{ left: mousePos.x - 15, top: mousePos.y - 15 }}
          className="fixed w-8 h-8 bg-purple-400 rounded-full pointer-events-none glow-cursor z-50"
        ></div>
      )}

      <Header />

      {/* Hero Section */}
      <section className="relative vedic-brown text-white min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Animated Sanskrit Background */}
        <div className="vedic-bg">
          <div className="sanskrit-text">ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॐ शान्तिः शान्तिः शान्तिः</div>
          <div className="sanskrit-text">वसुधैव कुटुम्बकम् । सत्यमेव जयते । अहिंसा परमो धर्मः । यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः</div>
          <div className="sanskrit-text">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि</div>
          <div className="sanskrit-text">सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः</div>
          <div className="sanskrit-text">तत्त्वमसि । अयमात्मा ब्रह्म । प्रज्ञानं ब्रह्म । अहं ब्रह्मास्मि</div>
          <div className="sanskrit-text">ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्</div>
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          {/* Company Logo & Tagline */}
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-pulse">📖</div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🕉️</span>
              <h1 className="text-5xl md:text-7xl font-bold sacred-text">DharmaVerse</h1>
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-xl md:text-2xl text-amber-200 mb-2">
              Ancient Wisdom • Modern AI • Timeless Guidance
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-amber-300">
              <span className="flex items-center gap-1">
                <span>🌟</span> 50K+ Users
              </span>
              <span className="flex items-center gap-1">
                <span>📚</span> 1000+ Sacred Texts
              </span>
              <span className="flex items-center gap-1">
                <span>🏆</span> Award Winning
              </span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 sacred-text">
            One Question. Many Scriptures. Infinite Wisdom.
          </h2>
          <p className="text-xl md:text-2xl mb-8 sacred-text max-w-4xl mx-auto">
            Get personalized spiritual guidance from Bhagavad Gita, Bible, Quran, Dhammapada, and more — powered by advanced AI
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-8">
            {/* Main CTA - Ask AI Guru */}
            <RouterLink 
              to="/ask" 
              className="group relative overflow-hidden px-12 py-6 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-4 min-w-80"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">Ask AI Guru</div>
                  <div className="text-sm opacity-90">Get instant spiritual guidance • Always Free</div>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
            </RouterLink>
            
            {/* Secondary Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
              <RouterLink 
                to="/shop" 
                className="group relative overflow-hidden px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium hover:scale-105 hover:bg-white/20 transition-all shadow-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <span className="text-lg">📚</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Bookstore</div>
                  <div className="text-xs opacity-75">Sacred texts</div>
                </div>
              </RouterLink>
              
              <RouterLink 
                to="/videos" 
                className="group relative overflow-hidden px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium hover:scale-105 hover:bg-white/20 transition-all shadow-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <span className="text-lg">▶️</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Videos</div>
                  <div className="text-xs opacity-75">Spiritual content</div>
                </div>
              </RouterLink>
              
              <RouterLink 
                to="/challenges" 
                className="group relative overflow-hidden px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium hover:scale-105 hover:bg-white/20 transition-all shadow-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <span className="text-lg">⚖️</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Code Karma</div>
                  <div className="text-xs opacity-75">Moral coding</div>
                </div>
              </RouterLink>
              
              <RouterLink 
                to="/quiz" 
                className="group relative overflow-hidden px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium hover:scale-105 hover:bg-white/20 transition-all shadow-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <span className="text-lg">🧪</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Discover</div>
                  <div className="text-xs opacity-75">Your path</div>
                </div>
              </RouterLink>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-amber-300">
            <div className="flex items-center gap-1">
              <span>🔒</span> SSL Secured
            </div>
            <div className="flex items-center gap-1">
              <span>⚡</span> Instant Responses
            </div>
            <div className="flex items-center gap-1">
              <span>🌍</span> Multi-Language
            </div>
            <div className="flex items-center gap-1">
              <span>📱</span> Mobile Friendly
            </div>
          </div>
        </div>
        
        <div ref={aiBrainRef} className="absolute top-10 left-10 w-40 opacity-30 animate-float hover:scale-105 transition-transform duration-500 text-6xl">🧠</div>
        <div ref={dataNetworkRef} className="absolute bottom-10 right-10 w-56 opacity-30 animate-float hover:scale-105 transition-transform duration-500 text-6xl">🔗</div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 earth-tone relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-4 sacred-text">How DharmaVerse Works</h2>
          <p className="text-center text-amber-200 mb-16 max-w-2xl mx-auto">
            Experience the world's most advanced spiritual AI, trained on thousands of sacred texts
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Choose Your Path", desc: "Select from 7+ spiritual traditions", icon: "🛤️", color: "from-blue-500 to-blue-600" },
              { step: 2, title: "Ask Your Question", desc: "Voice or text - we understand both", icon: "🎤", color: "from-green-500 to-green-600" },
              { step: 3, title: "Receive Wisdom", desc: "Personalized guidance with sources", icon: "💡", color: "from-purple-500 to-purple-600" },
              { step: 4, title: "Share & Learn", desc: "Beautiful cards to share insights", icon: "📤", color: "from-orange-500 to-orange-600" }
            ].map((item, idx) => (
              <div key={item.step} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 dharma-card">
                  <div className="text-sm text-amber-400 mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Wisdom Cards */}
      <section className="py-20 earth-tone relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-4 sacred-text">Real Wisdom, Real Results</h2>
          <p className="text-center text-amber-200 mb-16">See how our AI provides authentic spiritual guidance</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                question: "I feel overwhelmed at work", 
                source: "Bhagavad Gita 2.47", 
                verse: "You have the right to perform your actions, but not to the fruits of action", 
                lesson: "Focus on effort, not outcomes",
                user: "Sarah M.", 
                rating: 5,
                tradition: "🕉️ Hindu"
              },
              { 
                question: "How do I forgive someone?", 
                source: "Matthew 6:14-15", 
                verse: "If you forgive others their trespasses, your heavenly Father will also forgive you", 
                lesson: "Forgiveness frees your own heart",
                user: "Michael R.", 
                rating: 5,
                tradition: "✝️ Christian"
              },
              { 
                question: "I'm struggling with anxiety", 
                source: "Quran 13:28", 
                verse: "In the remembrance of Allah do hearts find rest", 
                lesson: "Turn to prayer and mindfulness",
                user: "Fatima K.", 
                rating: 5,
                tradition: "☪️ Islamic"
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-amber-400">{card.tradition}</span>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(card.rating)}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-white">"{card.question}"</h3>
                <p className="text-amber-200 italic mb-3 text-sm">"{card.verse}"</p>
                <p className="text-gray-300 text-sm mb-4">{card.lesson}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>— {card.user}</span>
                  <span>{card.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Gamification */}
      <section className="py-20 vedic-brown relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-16 sacred-text">Why 50,000+ Users Choose DharmaVerse</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <RouterLink to="/ask" className="group">
              <div className="text-center dharma-card p-6 rounded-lg hover:scale-105 transition-transform">
                <div className="text-4xl mb-3 group-hover:animate-bounce">🧠</div>
                <h3 className="font-semibold text-white mb-2">AI Spiritual Guide</h3>
                <p className="text-sm text-gray-400">24/7 personalized guidance</p>
                <div className="text-xs text-green-400 mt-2">✓ Always Free</div>
              </div>
            </RouterLink>
            
            <RouterLink to="/shop" className="group">
              <div className="text-center dharma-card p-6 rounded-lg hover:scale-105 transition-transform relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-4xl mb-3 group-hover:animate-bounce relative z-10">📚</div>
                <h3 className="font-semibold text-white mb-2 relative z-10">Sacred Bookstore</h3>
                <p className="text-sm text-gray-400 relative z-10">1000+ spiritual books</p>
                <div className="text-xs text-blue-400 mt-2 relative z-10">📦 Free shipping ₹1500+</div>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-20 group-hover:rotate-12 transition-transform">📖</div>
              </div>
            </RouterLink>
            
            <RouterLink to="/challenges" className="group">
              <div className="text-center dharma-card p-6 rounded-lg hover:scale-105 transition-transform relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-4xl mb-3 group-hover:animate-bounce relative z-10">⚖️</div>
                <h3 className="font-semibold text-white mb-2 relative z-10">Karmic Coding</h3>
                <p className="text-sm text-gray-400 relative z-10">Moral code challenges</p>
                <div className="text-xs text-purple-400 mt-2 relative z-10">💻 Hackathon ready</div>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-20 group-hover:rotate-12 transition-transform">💻</div>
              </div>
            </RouterLink>
            
            <RouterLink to="/videos" className="group">
              <div className="text-center dharma-card p-6 rounded-lg hover:scale-105 transition-transform relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-4xl mb-3 group-hover:animate-bounce relative z-10">📺</div>
                <h3 className="font-semibold text-white mb-2 relative z-10">Spiritual Videos</h3>
                <p className="text-sm text-gray-400 relative z-10">ISKCON, Sadhguru & more</p>
                <div className="text-xs text-red-400 mt-2 relative z-10">🎬 HD quality content</div>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-20 group-hover:scale-110 transition-transform">🎥</div>
              </div>
            </RouterLink>
            
            <RouterLink to="/quiz" className="group">
              <div className="text-center dharma-card p-6 rounded-lg hover:scale-105 transition-transform">
                <div className="text-4xl mb-3 group-hover:animate-bounce">🧭</div>
                <h3 className="font-semibold text-white mb-2">Path Discovery</h3>
                <p className="text-sm text-gray-400">Find your spiritual type</p>
                <div className="text-xs text-orange-400 mt-2">🔮 Personalized results</div>
              </div>
            </RouterLink>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 earth-tone relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 sacred-text">Start Your Spiritual Journey Today</h2>
            <p className="text-xl text-amber-200 mb-8">
              Join thousands who've found peace, purpose, and wisdom through DharmaVerse
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <RouterLink 
                to="/ask" 
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                🚀 Start Free - Ask Your First Question
              </RouterLink>
            </div>
            
            <div className="text-sm text-amber-300">
              ✓ No credit card required • ✓ Instant access • ✓ Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="earth-tone border-t border-amber-800 text-amber-100 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>🕉️</span> DharmaVerse
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Ancient wisdom meets modern AI. Trusted by 50,000+ spiritual seekers worldwide.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-2xl hover:text-amber-300 transition-colors">📘</a>
                <a href="#" className="text-2xl hover:text-amber-300 transition-colors">🐦</a>
                <a href="#" className="text-2xl hover:text-amber-300 transition-colors">📷</a>
                <a href="#" className="text-2xl hover:text-amber-300 transition-colors">💼</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <RouterLink to="/ask" className="block hover:text-amber-300 transition-colors">AI Guidance</RouterLink>
                <RouterLink to="/challenges" className="block hover:text-amber-300 transition-colors">Karmic Coding</RouterLink>
                <RouterLink to="/shop" className="block hover:text-amber-300 transition-colors">Bookstore</RouterLink>
                <RouterLink to="/quiz" className="block hover:text-amber-300 transition-colors">Personality Quiz</RouterLink>
                <RouterLink to="/profile" className="block hover:text-amber-300 transition-colors">My Profile</RouterLink>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibent mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-amber-300 transition-colors">Help Center</a>
                <a href="#" className="block hover:text-amber-300 transition-colors">Contact Us</a>
                <a href="#" className="block hover:text-amber-300 transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-amber-300 transition-colors">Terms of Service</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">Get weekly wisdom & exclusive offers</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-amber-900/50 border border-amber-700 rounded text-white text-sm"
                />
                <button className="px-4 py-2 bg-amber-600 rounded hover:bg-amber-700 transition-colors text-sm">
                  📧
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 DharmaVerse AI. All rights reserved. • Guided by Dharma, Powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;