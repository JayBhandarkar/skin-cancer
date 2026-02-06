# AI Skin Cancer Detection & Recommendation System

AI-powered skin cancer detection using Google Gemini 2.0 Flash and MongoDB Atlas.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB Atlas
- **AI/ML**: Google Gemini 2.0 Flash

## Setup Instructions

### Prerequisites

1. **MongoDB Atlas Account**: Create at https://www.mongodb.com/cloud/atlas
2. **Gemini API Key**: Get from https://aistudio.google.com/app/apikey

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Update `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/skincare?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## Features

- AI-powered skin cancer detection using Gemini 2.0 Flash
- Cancer classification: Melanoma, Basal Cell Carcinoma, Squamous Cell Carcinoma, etc.
- Confidence scoring and severity assessment
- Treatment recommendations
- User authentication with MongoDB Atlas
- Detection history tracking

## API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Detection
- POST `/api/detect` - Upload image for AI cancer detection (auth required)
- GET `/api/detect/history` - Get user detection history (auth required)
- GET `/api/detect/:id` - Get specific detection result (auth required)

### Recommendations
- GET `/api/recommendations/:cancerType` - Get treatment recommendations

### Diseases
- GET `/api/diseases` - Get all cancer types info
- GET `/api/diseases/:id` - Get specific cancer details
