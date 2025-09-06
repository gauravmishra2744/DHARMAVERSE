class VideoService {
  constructor() {
    this.watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    this.likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    this.subscribedChannels = JSON.parse(localStorage.getItem('subscribedChannels') || '[]');
  }

  // Spiritual videos with real YouTube URLs
  getVideos() {
    return [
      {
        id: 1,
        title: "Bhagavad Gita Chapter 2 - Complete Analysis",
        channel: "ISKCON Official",
        views: "2.3M",
        duration: "45:32",
        thumbnail: "https://img.youtube.com/vi/YQJ2NydTdemU/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/YQJ2NydTdemU",
        description: "Complete explanation of Bhagavad Gita Chapter 2 - The Eternal Reality of the Soul",
        uploadDate: "2024-01-15",
        category: "Bhagavad Gita",
        subscribers: "1.2M"
      },
      {
        id: 2,
        title: "Meditation for Beginners - 10 Minutes",
        channel: "Headspace",
        views: "856K",
        duration: "10:18",
        thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
        description: "Simple meditation techniques for beginners to start their spiritual journey",
        uploadDate: "2024-01-20",
        category: "Meditation",
        subscribers: "890K"
      },
      {
        id: 3,
        title: "What is Karma? - Sadhguru Explains",
        channel: "Sadhguru",
        views: "4.1M",
        duration: "28:45",
        thumbnail: "https://img.youtube.com/vi/f7QXXJlQ6pk/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/f7QXXJlQ6pk",
        description: "Sadhguru explains the true meaning of Karma and how it affects our lives",
        uploadDate: "2024-01-10",
        category: "Spirituality",
        subscribers: "8.2M"
      },
      {
        id: 4,
        title: "The Science of Enlightenment",
        channel: "Eckhart Tolle",
        views: "1.8M",
        duration: "52:30",
        thumbnail: "https://img.youtube.com/vi/Bw9zSMsKcwk/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/Bw9zSMsKcwk",
        description: "Understanding consciousness and the path to enlightenment",
        uploadDate: "2024-01-08",
        category: "Philosophy",
        subscribers: "650K"
      },
      {
        id: 5,
        title: "Om Namah Shivaya - Powerful Mantra",
        channel: "Sounds of Isha",
        views: "3.2M",
        duration: "15:20",
        thumbnail: "https://img.youtube.com/vi/SlBk5eqAQLw/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/SlBk5eqAQLw",
        description: "Sacred chanting of Om Namah Shivaya mantra for meditation and peace",
        uploadDate: "2024-01-25",
        category: "Mantras",
        subscribers: "2.1M"
      },
      {
        id: 6,
        title: "Mindfulness in Daily Life",
        channel: "Thich Nhat Hanh",
        views: "1.5M",
        duration: "35:15",
        thumbnail: "https://img.youtube.com/vi/6p0O4GGUPLw/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/6p0O4GGUPLw",
        description: "How to practice mindfulness in everyday activities",
        uploadDate: "2024-01-12",
        category: "Meditation",
        subscribers: "1.8M"
      },
      {
        id: 7,
        title: "Hanuman Chalisa - Full Version",
        channel: "T-Series Bhakti Sagar",
        views: "50M",
        duration: "8:30",
        thumbnail: "https://img.youtube.com/vi/YP3bHUPCz9Y/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/YP3bHUPCz9Y",
        description: "Complete Hanuman Chalisa with beautiful visuals and devotional music",
        uploadDate: "2024-01-05",
        category: "Mantras",
        subscribers: "45M"
      },
      {
        id: 8,
        title: "The Four Noble Truths - Buddhism Explained",
        channel: "Buddhist Society",
        views: "890K",
        duration: "42:18",
        thumbnail: "https://img.youtube.com/vi/libKVRa01L8/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/libKVRa01L8",
        description: "Understanding the fundamental teachings of Buddha",
        uploadDate: "2024-01-18",
        category: "Philosophy",
        subscribers: "320K"
      },
      {
        id: 9,
        title: "Shri Krishna Bhajan - Hare Krishna Mahamantra",
        channel: "ISKCON Bhajans",
        views: "12M",
        duration: "21:08",
        thumbnail: "https://img.youtube.com/vi/jTIFSBlHzR8/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/jTIFSBlHzR8",
        description: "Beautiful Krishna bhajan with Hare Krishna Mahamantra chanting",
        uploadDate: "2024-01-03",
        category: "Mantras",
        subscribers: "2.8M"
      },
      {
        id: 10,
        title: "Yoga Nidra for Deep Relaxation",
        channel: "Yoga with Adriene",
        views: "2.1M",
        duration: "30:45",
        thumbnail: "https://img.youtube.com/vi/ihO02wUzgkc/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/ihO02wUzgkc",
        description: "Guided yoga nidra practice for deep relaxation and stress relief",
        uploadDate: "2024-01-22",
        category: "Meditation",
        subscribers: "11.2M"
      }
    ];
  }

  getShorts() {
    return [
      {
        id: 101,
        title: "1 Minute Breathing Exercise",
        channel: "Spiritual Shorts",
        views: "125K",
        duration: "1:00",
        thumbnail: "https://img.youtube.com/vi/tybOi4hjZFQ/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/tybOi4hjZFQ",
        likes: "12K",
        isShort: true
      },
      {
        id: 102,
        title: "Quick Morning Meditation",
        channel: "Mindful Moments",
        views: "89K",
        duration: "2:30",
        thumbnail: "https://img.youtube.com/vi/ZToicYcHIOU/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/ZToicYcHIOU",
        likes: "8.5K",
        isShort: true
      },
      {
        id: 103,
        title: "Gayatri Mantra - 108 Times",
        channel: "Sacred Sounds",
        views: "203K",
        duration: "3:45",
        thumbnail: "https://img.youtube.com/vi/Hf2pCbOlzBs/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/Hf2pCbOlzBs",
        likes: "18K",
        isShort: true
      },
      {
        id: 104,
        title: "Positive Affirmations",
        channel: "Daily Wisdom",
        views: "156K",
        duration: "1:45",
        thumbnail: "https://img.youtube.com/vi/koA1T3CG_8w/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/koA1T3CG_8w",
        likes: "14K",
        isShort: true
      },
      {
        id: 105,
        title: "Quick Gratitude Practice",
        channel: "Mindful Living",
        views: "98K",
        duration: "2:15",
        thumbnail: "https://img.youtube.com/vi/WPPPFqsECz0/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/WPPPFqsECz0",
        likes: "9K",
        isShort: true
      },
      {
        id: 106,
        title: "Om Chanting - 5 Minutes",
        channel: "Sacred Vibrations",
        views: "267K",
        duration: "5:00",
        thumbnail: "https://img.youtube.com/vi/qYnA9wWFHLI/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/qYnA9wWFHLI",
        likes: "22K",
        isShort: true
      }
    ];
  }

  addToWatchHistory(video) {
    const existingIndex = this.watchHistory.findIndex(v => v.id === video.id);
    if (existingIndex > -1) {
      this.watchHistory.splice(existingIndex, 1);
    }
    this.watchHistory.unshift({ ...video, watchedAt: new Date().toISOString() });
    if (this.watchHistory.length > 50) {
      this.watchHistory = this.watchHistory.slice(0, 50);
    }
    localStorage.setItem('watchHistory', JSON.stringify(this.watchHistory));
  }

  getWatchHistory() {
    return this.watchHistory;
  }

  toggleLike(videoId) {
    const index = this.likedVideos.indexOf(videoId);
    if (index > -1) {
      this.likedVideos.splice(index, 1);
    } else {
      this.likedVideos.push(videoId);
    }
    localStorage.setItem('likedVideos', JSON.stringify(this.likedVideos));
    return this.likedVideos.includes(videoId);
  }

  isLiked(videoId) {
    return this.likedVideos.includes(videoId);
  }

  toggleSubscribe(channel) {
    const index = this.subscribedChannels.indexOf(channel);
    if (index > -1) {
      this.subscribedChannels.splice(index, 1);
    } else {
      this.subscribedChannels.push(channel);
    }
    localStorage.setItem('subscribedChannels', JSON.stringify(this.subscribedChannels));
    return this.subscribedChannels.includes(channel);
  }

  isSubscribed(channel) {
    return this.subscribedChannels.includes(channel);
  }

  searchVideos(query) {
    const allVideos = [...this.getVideos(), ...this.getShorts()];
    return allVideos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.channel.toLowerCase().includes(query.toLowerCase()) ||
      video.category?.toLowerCase().includes(query.toLowerCase())
    );
  }

  getVideosByCategory(category) {
    return this.getVideos().filter(video => video.category === category);
  }

  getRecommendedVideos(currentVideoId) {
    return this.getVideos().filter(video => video.id !== currentVideoId).slice(0, 5);
  }

  getVideoById(id) {
    const allVideos = [...this.getVideos(), ...this.getShorts()];
    return allVideos.find(video => video.id === parseInt(id));
  }
}

const videoServiceInstance = new VideoService();
export default videoServiceInstance;