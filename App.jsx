import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "./Particles";
import ReactTooltip from "react-tooltip";
import AiBrain from "./assets/ai-brain.svg";
import DataNetwork from "./assets/data-network.svg";
import { Link } from "react-router-dom";

function App() {
  useEffect(() => { AOS.init({ duration: 1000, once: true }); }, []);
  const aiBrainRef = useRef(null);
  const dataNetworkRef = useRef(null);
  const svgRefs = [aiBrainRef, dataNetworkRef];

  // Mouse position for AI assistant cursor
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

  return (
    <div className="font-sans text-gray-900 relative overflow-hidden" onMouseMove={handleMouseMove}>
      <Particles svgRefs={svgRefs} mousePos={mousePos} />
      <div className="relative min-h-screen bg-black text-white">
      {/* ... your existing hero section / particles etc ... */}

      {/* Ask Your Question Button */}
      <Link
        to="/ask"
        className="neon-button mt-6 px-6 py-3 text-lg font-bold"
      >
        Ask Your Question
      </Link>

      {/* ... rest of landing page ... */}
    </div>


      {/* AI Assistant Cursor */}
      <div
        style={{ left: mousePos.x - 15, top: mousePos.y - 15 }}
        className="fixed w-8 h-8 bg-purple-400 rounded-full pointer-events-none glow-cursor"
      ></div>

      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-purple-400 cursor-pointer glow-text">Dharma Verse AI</div>
          <div className="space-x-6 hidden md:flex">
            <Link to="features" smooth={true} duration={700} className="cursor-pointer hover:text-purple-400 transition">Features</Link>
            <Link to="signup" smooth={true} duration={700} className="cursor-pointer hover:text-purple-400 transition">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-800 to-red-700 text-white min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text" data-aos="fade-up">Dharma Verse AI</h1>
          <p className="text-xl md:text-2xl mb-8 glow-text-sm" data-aos="fade-up" data-aos-delay="200">
            Explore AI-generated dharma insights, wisdom, and personalized guidance.
          </p>
          <div className="flex justify-center gap-4 flex-wrap" data-aos="fade-up" data-aos-delay="400">
            <Link to="features" smooth={true} duration={700} className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-100 transition cursor-pointer glow-button">Explore Features</Link>
            <Link to="signup" smooth={true} duration={700} className="bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-900 transition cursor-pointer glow-button">Get Started</Link>
            <Link to="signup" smooth={true} duration={700} className="bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-900 transition cursor-pointer glow-button">Join Dharma Verse</Link>
          </div>
        </div>
        <img src={AiBrain} ref={aiBrainRef} alt="AI Brain" className="absolute top-10 left-10 w-40 opacity-50 animate-float hover:scale-105 transition-transform duration-500" />
        <img src={DataNetwork} ref={dataNetworkRef} alt="Data Network" className="absolute bottom-10 right-10 w-56 opacity-50 animate-float animation-delay-2000 hover:scale-105 transition-transform duration-500" />
        <section className="h-screen flex flex-col justify-center items-center text-center text-white relative">
  <h1 className="text-5xl font-bold mb-6">Welcome to Dharma Verse AI</h1>
  <p className="text-lg max-w-2xl mb-8">
    A futuristic AI-powered verse where consciousness, data, and innovation merge.
  </p>
  
  {/* Neon Call To Action Button */}
  <button className="neon-button">
    Join Dharma Verse
  </button>
</section>
      </section>
      

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text" data-aos="fade-down">Why Choose Dharma Verse AI</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-2 glow-card cursor-pointer" data-tip data-for="card1" data-aos="fade-up">
              <h3 className="text-2xl font-semibold mb-4">AI Wisdom</h3>
              <p>Generate personalized dharma insights using advanced AI algorithms.</p>
            </div>
            <ReactTooltip id="card1" place="top" effect="solid" className="bg-purple-800 text-white rounded-lg px-4 py-2 text-sm glow-tooltip">
              Your personalized dharma guidance is just a click away, powered by AI.
            </ReactTooltip>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-2 glow-card cursor-pointer" data-tip data-for="card2" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-2xl font-semibold mb-4">Interactive Learning</h3>
              <p>Engage with dynamic content and guided experiences.</p>
            </div>
            <ReactTooltip id="card2" place="top" effect="solid" className="bg-purple-800 text-white rounded-lg px-4 py-2 text-sm glow-tooltip">
              Explore step-by-step lessons where AI adapts to your pace.
            </ReactTooltip>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-2 glow-card cursor-pointer" data-tip data-for="card3" data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-2xl font-semibold mb-4">Community Driven</h3>
              <p>Share insights and learn with others in the community.</p>
            </div>
            <ReactTooltip id="card3" place="top" effect="solid" className="bg-purple-800 text-white rounded-lg px-4 py-2 text-sm glow-tooltip">
              Collaborate and grow your dharma knowledge with like-minded learners.
            </ReactTooltip>
          </div>
        </div>
        
      </section>

      {/* CTA */}
      <section id="signup" className="py-20 bg-gradient-to-r from-purple-900 via-pink-800 to-red-700 text-white text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6 glow-text" data-aos="zoom-in">Ready to Dive into Dharma Verse?</h2>
        <p className="mb-8 text-lg md:text-xl glow-text-sm" data-aos="zoom-in" data-aos-delay="200">
          Join now and unlock the power of AI-assisted spiritual guidance.
        </p>
        <a href="#" className="bg-white text-purple-700 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-purple-100 transition transform hover:scale-105 glow-button" data-aos="zoom-in" data-aos-delay="400">Join Now</a>
      </section>
      <img src="/ai-brain.svg" alt="AI Brain" className="floating-asset w-32 h-32" />
<img src="/data-network.svg" alt="Data Network" className="floating-asset w-32 h-32" />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-8 text-center relative z-10 glow-footer">
        <p>&copy; {new Date().getFullYear()} Dharma Verse AI. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white transition">Twitter</a>
          <a href="#" className="hover:text-white transition">LinkedIn</a>
          <a href="#" className="hover:text-white transition">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default App;