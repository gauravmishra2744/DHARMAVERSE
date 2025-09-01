import React, { useState, useRef, useEffect } from 'react';

const getQuickResponses = (religion) => {
  const responses = {
    'Hinduism': ['What is dharma?', 'How to find inner peace?', 'Dealing with karma', 'Purpose of life'],
    'Christianity': ['How to forgive?', 'Finding God\'s will', 'Dealing with suffering', 'Prayer guidance'],
    'Islam': ['How to find peace?', 'Dealing with hardship', 'Importance of patience', 'Seeking forgiveness'],
    'Buddhism': ['Overcoming suffering', 'Mindfulness practice', 'Letting go of attachment', 'Finding compassion'],
    'Stoicism': ['Accepting what I can\'t control', 'Building resilience', 'Finding virtue', 'Dealing with emotions'],
    'Universal': ['How to find peace?', 'Dealing with stress', 'Life purpose', 'Forgiveness']
  };
  return responses[religion] || responses['Universal'];
};

const ChatInterface = ({ messages, onSendMessage, user, religion }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
    
    setIsTyping(true);
    await onSendMessage(inputMessage);
    setInputMessage('');
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-amber-900/20 rounded-lg p-4 h-96 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-amber-700/50">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-lg">🤖</span>
        </div>
        <div>
          <h3 className="font-semibold text-white">AI Spiritual Guru</h3>
          <p className="text-xs text-amber-300">Online • Always here to help</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-amber-300/70 py-8">
            <div className="text-4xl mb-2">🙏</div>
            <p>Welcome! Ask me anything about spirituality, life guidance, or sacred wisdom.</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-amber-800/50 text-amber-100'
            }`}>
              <p className="text-sm">{message.content}</p>
              {message.source && (
                <p className="text-xs opacity-75 mt-1">— {message.source}</p>
              )}
              <p className="text-xs opacity-50 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-amber-800/50 text-amber-100 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-amber-700/50 pt-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your spiritual question..."
            className="flex-1 px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white placeholder-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            <span className="text-sm">📤</span>
          </button>
        </div>
        
        {/* Quick Responses */}
        <div className="flex flex-wrap gap-1 mt-2">
          {getQuickResponses(religion).map((quick, idx) => (
            <button
              key={idx}
              onClick={() => setInputMessage(quick)}
              className="text-xs px-2 py-1 bg-amber-800/30 hover:bg-amber-700/40 rounded-full transition-colors"
            >
              {quick}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;