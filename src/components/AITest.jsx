import React, { useState } from 'react';

const AITest = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResponse('');
    
    
    const API_KEY = 'AIzaSyBEdT7de6btpDpkjzb4M7DoAdYCZJVt2bU';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';;
    
    try {
      console.log('🚀 Testing Google AI API...');
      
      const testPrompt = "What is the meaning of life according to spiritual wisdom? Give a short answer.";
      
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: testPrompt
            }]
          }]
        })
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        setResponse(`❌ API Error (${response.status}): ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('✅ API Response:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const aiText = data.candidates[0].content.parts[0].text;
        setResponse(`✅ SUCCESS! AI Response:\n\n${aiText}`);
      } else {
        setResponse(`❌ Unexpected response format: ${JSON.stringify(data)}`);
      }
      
    } catch (error) {
      console.error('💥 Error:', error);
      setResponse(`💥 Network Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">🧪 Google AI API Test</h3>
      
      <button 
        onClick={testAPI}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? '⏳ Testing...' : '🚀 Test Google AI API'}
      </button>
      
      {response && (
        <div className="mt-4 p-4 bg-white rounded border">
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default AITest;