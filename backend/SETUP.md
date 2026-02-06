# Setup Instructions

## MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or sign in
3. Create a new cluster (Free tier M0)
4. Click "Connect" on your cluster
5. Add your IP address (or allow access from anywhere: 0.0.0.0/0)
6. Create a database user with username and password
7. Choose "Connect your application"
8. Copy the connection string
9. Replace `<username>`, `<password>`, and database name in `.env` file

Example:
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/skincare?retryWrites=true&w=majority
```

## Gemini API Setup

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Add it to `.env` file:

```
GEMINI_API_KEY=your_actual_api_key_here
```

## Install Dependencies

```bash
cd backend
npm install
```

## Start Server

```bash
npm run dev
```

The server will connect to MongoDB Atlas and use Gemini 2.0 Flash for cancer detection.
