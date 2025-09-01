import React, { useState } from 'react';
import { FaUpload, FaVideo, FaImage, FaTimes } from 'react-icons/fa';

const VideoUpload = ({ onClose, onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Spirituality',
    tags: '',
    channelName: '',
    uploadedBy: 'user123'
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    'Bhagavad Gita', 'Meditation', 'Spirituality', 'Philosophy', 
    'Mantras', 'Buddhism', 'Yoga', 'Devotional'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoFile) {
      alert('Please select a video file');
      return;
    }

    // Validate spiritual content
    const spiritualKeywords = ['spiritual', 'meditation', 'yoga', 'dharma', 'karma', 'bhagavad', 'gita', 'buddha', 'mantra', 'prayer', 'devotion', 'enlightenment'];
    const isSpiritual = spiritualKeywords.some(keyword => 
      formData.title.toLowerCase().includes(keyword) || 
      formData.description.toLowerCase().includes(keyword) ||
      formData.tags.toLowerCase().includes(keyword)
    );

    if (!isSpiritual) {
      alert('Please ensure your content is spiritual in nature. Include keywords like meditation, spirituality, dharma, etc.');
      return;
    }

    setUploading(true);
    
    const uploadData = new FormData();
    Object.keys(formData).forEach(key => {
      uploadData.append(key, formData[key]);
    });
    uploadData.append('video', videoFile);
    if (thumbnailFile) {
      uploadData.append('thumbnail', thumbnailFile);
    }

    try {
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: uploadData
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Video uploaded successfully! It will be reviewed before going live.');
        onUploadSuccess();
        onClose();
      } else {
        alert(result.message || 'Upload failed');
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Upload Spiritual Video</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video File */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FaVideo className="mx-auto text-4xl text-gray-400 mb-4" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Choose Video File
                </label>
                {videoFile && (
                  <p className="mt-2 text-sm text-gray-600">{videoFile.name}</p>
                )}
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <FaImage className="mx-auto text-2xl text-gray-400 mb-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer text-orange-500 hover:text-orange-600"
                >
                  Choose Thumbnail
                </label>
                {thumbnailFile && (
                  <p className="mt-1 text-xs text-gray-600">{thumbnailFile.name}</p>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter spiritual video title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your spiritual content..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Channel Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel Name *
              </label>
              <input
                type="text"
                name="channelName"
                value={formData.channelName}
                onChange={handleInputChange}
                placeholder="Your channel name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="meditation, spirituality, dharma..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FaUpload />
                {uploading ? 'Uploading...' : 'Upload Video'}
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

          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> Only spiritual content is allowed. Videos will be reviewed before going live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;