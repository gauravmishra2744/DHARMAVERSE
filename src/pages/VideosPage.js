import React, { useState, useEffect } from 'react';
import { FaPlay, FaHeart, FaBell, FaSearch, FaHistory, FaFire, FaBookmark, FaUpload, FaVideo, FaPlus } from 'react-icons/fa';
import videoService from '../services/videoService';
import ShortsPlayer from '../components/ShortsPlayer';
import VideoUpload from '../components/VideoUpload';
import LiveStreaming from '../components/LiveStreaming';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showShortsPlayer, setShowShortsPlayer] = useState(false);
  const [shortsStartIndex, setShortsStartIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  useEffect(() => {
    loadAllVideos();
  }, []);

  const loadAllVideos = async () => {
    try {
      // Load uploaded videos from backend
      const response = await fetch('/api/videos');
      if (response.ok) {
        const backendVideos = await response.json();
        setUploadedVideos(backendVideos);
      }
    } catch (error) {
      console.error('Error loading uploaded videos:', error);
    }
    
    // Load static videos
    setVideos(videoService.getVideos());
    setShorts(videoService.getShorts());
    setWatchHistory(videoService.getWatchHistory());
  };

  const handleVideoClick = (video) => {
    videoService.addToWatchHistory(video);
    setSelectedVideo(video);
    if (video.isShort) {
      const shortIndex = shorts.findIndex(s => s.id === video.id);
      setShortsStartIndex(shortIndex >= 0 ? shortIndex : 0);
      setShowShortsPlayer(true);
    } else {
      setShowVideoPlayer(true);
    }
    setWatchHistory(videoService.getWatchHistory());
  };

  const handleLike = (videoId) => {
    videoService.toggleLike(videoId);
    setVideos([...videoService.getVideos()]);
  };

  const handleSubscribe = (channel) => {
    videoService.toggleSubscribe(channel);
    setVideos([...videoService.getVideos()]);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = videoService.searchVideos(searchQuery);
      setVideos(results.filter(v => !v.isShort));
      setShorts(results.filter(v => v.isShort));
    } else {
      setVideos(videoService.getVideos());
      setShorts(videoService.getShorts());
    }
  };

  const VideoCard = ({ video, isShort = false }) => (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${isShort ? 'w-48' : ''}`}
      onClick={() => handleVideoClick(video)}
    >
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className={`w-full ${isShort ? 'h-64' : 'h-48'} object-cover rounded-t-lg`}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
          {video.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30 rounded-t-lg">
          <FaPlay className="text-white text-3xl" />
        </div>
      </div>
      <div className="p-4">
        <h3 className={`font-semibold ${isShort ? 'text-sm' : 'text-lg'} mb-2 line-clamp-2`}>
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm mb-1">{video.channel}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{video.views} views</span>
          {video.likes && <span>{video.likes} likes</span>}
        </div>
      </div>
    </div>
  );

  const VideoPlayer = () => (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[95vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={() => setShowVideoPlayer(false)}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-75 rounded-full p-3 z-20 hover:bg-opacity-90 transition-all"
          >
            ✕
          </button>
          <div className="relative">
            <iframe
              src={selectedVideo?.videoUrl + '?autoplay=1&rel=0'}
              title={selectedVideo?.title}
              className="w-full aspect-video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{selectedVideo?.title}</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{selectedVideo?.views} views</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{selectedVideo?.uploadDate}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleLike(selectedVideo?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  videoService.isLiked(selectedVideo?.id) ? 'bg-red-100 text-red-600' : 'bg-gray-100'
                }`}
              >
                <FaHeart />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
                <FaBookmark />
                <span>Save</span>
              </button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedVideo?.channel.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{selectedVideo?.channel}</h4>
                  <p className="text-sm text-gray-600">{selectedVideo?.subscribers} subscribers</p>
                </div>
              </div>
              <button 
                onClick={() => handleSubscribe(selectedVideo?.channel)}
                className={`px-6 py-2 rounded-full font-semibold ${
                  videoService.isSubscribed(selectedVideo?.channel) 
                    ? 'bg-gray-200 text-gray-700' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {videoService.isSubscribed(selectedVideo?.channel) ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
            <p className="text-gray-700">{selectedVideo?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-orange-600">DharmaVerse Videos</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search spiritual videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-transparent outline-none flex-1 min-w-64"
                />
                <FaSearch 
                  className="text-gray-500 cursor-pointer ml-2" 
                  onClick={handleSearch}
                />
              </div>
              <button
                onClick={() => setShowUpload(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
              >
                <FaUpload />
                Upload
              </button>
              <button
                onClick={() => setShowLiveStream(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
              >
                <FaVideo />
                Go Live
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'home', label: 'Home', icon: FaFire },
              { id: 'shorts', label: 'Shorts', icon: FaPlay },
              { id: 'uploaded', label: 'Community', icon: FaPlus },
              { id: 'history', label: 'History', icon: FaHistory }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-orange-500 text-orange-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <div>
            {/* Featured Video Banner */}
            <div className="mb-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">🔥 Trending Now</h2>
                  <p className="text-lg opacity-90">Bhagavad Gita Chapter 2 - Complete Analysis</p>
                  <p className="text-sm opacity-75">ISKCON Official • 2.3M views</p>
                </div>
                <button 
                  onClick={() => handleVideoClick(videos[0])}
                  className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <FaPlay /> Watch Now
                </button>
              </div>
            </div>

            {/* Shorts Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaPlay className="mr-2 text-red-600" />
                Spiritual Shorts
              </h2>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {shorts.map(short => (
                  <VideoCard key={short.id} video={short} isShort={true} />
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
              <div className="flex flex-wrap gap-3">
                {['Bhagavad Gita', 'Meditation', 'Spirituality', 'Philosophy', 'Mantras'].map(category => (
                  <button 
                    key={category}
                    onClick={() => {
                      const filtered = videoService.getVideosByCategory(category);
                      setVideos(filtered);
                    }}
                    className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full hover:bg-orange-200 transition-colors"
                  >
                    {category}
                  </button>
                ))}
                <button 
                  onClick={() => setVideos(videoService.getVideos())}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  All Videos
                </button>
              </div>
            </div>

            {/* Regular Videos */}
            <div>
              <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shorts' && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Shorts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {shorts.map(short => (
                <VideoCard key={short.id} video={short} isShort={true} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'uploaded' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Community Uploads</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpload(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
                >
                  <FaUpload />
                  Upload Video
                </button>
                <button
                  onClick={() => setShowLiveStream(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                  <FaVideo />
                  Go Live
                </button>
              </div>
            </div>
            
            {uploadedVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {uploadedVideos.map(video => (
                  <div key={video._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-t-lg flex items-center justify-center">
                        <FaPlay className="text-white text-4xl" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                        {video.duration || '0:00'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">{video.channelName}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{video.views} views</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          {video.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaUpload className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No community videos yet</p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                >
                  Upload First Video
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Watch History</h2>
            {watchHistory.length > 0 ? (
              <div className="space-y-4">
                {watchHistory.map((video, index) => (
                  <div key={`${video.id}-${index}`} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-32 h-20 object-cover rounded cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{video.title}</h3>
                      <p className="text-gray-600 text-sm">{video.channel}</p>
                      <p className="text-gray-500 text-xs">
                        Watched on {new Date(video.watchedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaHistory className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No videos in your history yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {showVideoPlayer && selectedVideo && <VideoPlayer />}
      
      {/* Shorts Player */}
      {showShortsPlayer && (
        <ShortsPlayer 
          shorts={shorts}
          initialIndex={shortsStartIndex}
          onClose={() => setShowShortsPlayer(false)}
        />
      )}
      
      {/* Video Upload Modal */}
      {showUpload && (
        <VideoUpload 
          onClose={() => setShowUpload(false)}
          onUploadSuccess={loadAllVideos}
        />
      )}
      
      {/* Live Streaming Modal */}
      {showLiveStream && (
        <LiveStreaming 
          onClose={() => setShowLiveStream(false)}
        />
      )}
    </div>
  );
};

export default VideosPage;