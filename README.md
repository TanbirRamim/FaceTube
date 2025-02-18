# Video Chat Application

A real-time video chat application built with React, Socket.IO, and WebRTC.

## Features

- Real-time video and audio communication
- Screen sharing capability
- Text chat functionality
- Room-based communication
- Mute/unmute audio
- Enable/disable video

## Project Structure

- `/client` - React frontend application
- `/server` - Node.js backend server

## Setup Instructions

### Server
1. Navigate to the server directory:
   ```bash
   cd server
   npm install
   npm start
   ```

### Client
1. Navigate to the client directory:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Environment Variables

### Client
- `VITE_SERVER_URL` - Backend server URL (default: http://localhost:5000)

### Server
- `PORT` - Server port (default: 5000)
- `CLIENT_URL` - Client URL (default: http://localhost:5173)
- `MONGODB_URI` - MongoDB connection string

## Technologies Used

- React
- Socket.IO
- WebRTC (simple-peer)
- Material-UI
- Node.js
- Express
- MongoDB