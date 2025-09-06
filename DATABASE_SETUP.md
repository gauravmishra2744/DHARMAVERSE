# DharmaVerse Database Setup Guide

## 📋 Database Models Created

Your DharmaVerse application now has these database models:

### Existing Models ✅
- **Challenge.js** - Coding challenges with moral teachings
- **Video.js** - Spiritual video content
- **Submission.js** - User challenge submissions
- **LiveStream.js** - Live streaming sessions

### New Models ✨
- **User.js** - User authentication and profiles
- **Scripture.js** - Spiritual texts and verses
- **Meditation.js** - Guided meditation sessions
- **DailyWisdom.js** - Daily spiritual quotes
- **Community.js** - Forum discussions

## 🚀 MongoDB Connection Steps

### Step 1: Install MongoDB
```bash
# Download MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# Or install via Chocolatey (Windows):
choco install mongodb

# Or install via Homebrew (macOS):
brew tap mongodb/brew
brew install mongodb-community
```

### Step 2: Start MongoDB Service
```bash
# Windows (as Administrator):
net start MongoDB

# macOS/Linux:
brew services start mongodb/brew/mongodb-community
# or
sudo systemctl start mongod
```

### Step 3: Verify Connection
```bash
# Open MongoDB shell:
mongosh

# Check if dharmaverse database exists:
show dbs
use dharmaverse
show collections
```

### Step 4: Initialize Database
```bash
# Navigate to backend folder:
cd "c:\Users\HP\OneDrive\Desktop\new dharma\backend"

# Run database initialization:
node initDatabase.js
```

### Step 5: Start Your Application
```bash
# Start backend server:
npm run dev
# or
node server.js

# Check health endpoint:
# http://localhost:5001/api/health
```

## 🔧 Environment Configuration

Your `.env` file is already configured:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/dharmaverse
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_AI_API_KEY=AIzaSyBEdT7de6btpDpkjzb4M7DoAdYCZJVt2bU
```

## 🌐 MongoDB Atlas (Cloud) Setup

### For Production/Cloud Database:

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/atlas
   - Sign up for free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Setup Database User**
   - Go to Database Access
   - Add new database user
   - Choose password authentication

4. **Configure Network Access**
   - Go to Network Access
   - Add IP address (0.0.0.0/0 for development)

5. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string

6. **Update .env File**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dharmaverse?retryWrites=true&w=majority
   ```

## 📊 Database Collections Structure

### Users Collection
- Authentication & profiles
- Karma points & achievements
- Spiritual preferences

### Challenges Collection
- Coding problems with moral lessons
- Test cases & solutions
- Scripture references

### Videos Collection
- Spiritual video content
- Categories & tags
- View counts & ratings

### Scriptures Collection
- Sacred texts & verses
- Translations & commentary
- Categorized by source

### Meditations Collection
- Guided meditation sessions
- Instructions & benefits
- Duration & difficulty levels

### Community Collection
- Discussion forums
- Questions & experiences
- User interactions

## 🔍 Useful MongoDB Commands

```bash
# Connect to database
mongosh "mongodb://localhost:27017/dharmaverse"

# Show all collections
show collections

# Count documents in collection
db.users.countDocuments()
db.challenges.countDocuments()

# Find documents
db.scriptures.find().limit(5)
db.meditations.find({difficulty: "Beginner"})

# Create indexes for performance
db.users.createIndex({email: 1})
db.videos.createIndex({category: 1, createdAt: -1})
```

## 🛠️ Troubleshooting

### Common Issues:

1. **MongoDB not starting**
   - Check if MongoDB service is running
   - Verify installation path
   - Check port 27017 availability

2. **Connection refused**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env
   - Verify network connectivity

3. **Authentication failed**
   - Check username/password
   - Verify database user permissions
   - Update connection string

### Health Check
Visit: `http://localhost:5001/api/health`
Should show: `{"message": "DharmaVerse Backend is running!", "database": "Connected"}`

## 📝 Next Steps

1. Run `node initDatabase.js` to set up database
2. Start your backend with `npm run dev`
3. Test API endpoints
4. Add more sample data as needed
5. Implement authentication routes
6. Create frontend integration

Your DharmaVerse database is now ready! 🕉️