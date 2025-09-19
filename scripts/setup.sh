#!/bin/bash

echo "🩸 Setting up Blood Bank Application..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

echo "✅ Setup complete!"
echo "🚀 Run 'npm run dev' to start both frontend and backend"
echo "🌐 Backend will run on http://localhost:8089"
echo "🌐 Frontend will run on http://localhost:3009"
