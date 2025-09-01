import React, { useState, useEffect } from 'react';
import { FaVideo, FaStop, FaUsers, FaTimes } from 'react-icons/fa';

const LiveStreaming = ({ onClose }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamData, setStreamData] = useState({
    title: '',
    description: '',
    category: 'Spirituality',
    streamerName: '',
    channelName: ''
  });
  const [streamKey, setStreamKey] = useState('');
  const [viewers, setViewers] = useState(0);

  const categories = [
    'Bhagavad Gita', 'Meditation', 'Spirituality', 'Philosophy', 
    'Mantras', 'Buddhism', 'Yoga', 'Devotional'
  ];

  const handleInputChange = (e) => {
    setStreamData({ ...streamData, [e.target.name]: e.target.value });
  };

  const startStream = async () => {
    try {
      const response = await fetch('/api/videos/live/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(streamData)
      });

      const result = await response.json();
      
      if (response.ok) {
        setStreamKey(result.streamKey);
        setIsStreaming(true);
        // Simulate viewer count
        const interval = setInterval(() => {
          setViewers(prev => prev + Math.floor(Math.random() * 5));
        }, 5000);
        return () => clearInterval(interval);
      } else {
        alert(result.message || 'Failed to start stream');
      }
    } catch (error) {
      alert('Failed to start stream: ' + error.message);
    }
  };

  const stopStream = () => {
    setIsStreaming(false);
    setStreamKey('');
    setViewers(0);
  };

  if (isStreaming) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-red-600">🔴 LIVE</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>

            {/* Live Stream Simulation */}
            <div className="bg-black aspect-video rounded-lg flex items-center justify-center mb-6">
              <div className="text-white text-center">
                <FaVideo className="text-6xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">{streamData.title}</h3>
                <p className="text-lg opacity-75">Live Streaming Simulation</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>{viewers} viewers</span>
                  </div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Stream Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-2">Stream Details</h4>
                <p><strong>Title:</strong> {streamData.title}</p>
                <p><strong>Category:</strong> {streamData.category}</p>
                <p><strong>Channel:</strong> {streamData.channelName}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Stream Key</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
                  {streamKey}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Use this key in your streaming software (OBS, etc.)
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <button
                onClick={stopStream}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 flex items-center gap-2"
              >
                <FaStop />
                Stop Stream
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Start Live Stream</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); startStream(); }} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stream Title *
              </label>
              <input
                type="text"
                name="title"
                value={streamData.title}
                onChange={handleInputChange}
                placeholder="Enter your spiritual stream title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={streamData.description}
                onChange={handleInputChange}
                placeholder="Describe what you'll be streaming..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={streamData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Streamer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="streamerName"
                value={streamData.streamerName}
                onChange={handleInputChange}
                placeholder="Your name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Channel Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel Name *
              </label>
              <input
                type="text"
                name="channelName"
                value={streamData.channelName}
                onChange={handleInputChange}
                placeholder="Your channel name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <FaVideo />
                Start Live Stream
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Note:</strong> Only spiritual content is allowed for live streaming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreaming;