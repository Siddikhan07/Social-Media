# Social Media Project

This project is a social media platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and Socket.io for real-time features.

## Features

- **User Authentication:**
  - Users can sign up and log in securely.
  - JSON Web Tokens (JWT) are used for authentication and authorization.

- **Profile Management:**
  - Users can create and update their profiles.
  - Profile includes basic information.

- **Posts:**
  - Users can create, read, update, and delete posts.
  - Posts can include text, images, or links.

- **Comments and Likes:**
  - Users can comment on posts and like posts.
  - Real-time updates for new comments and likes using Socket.io.

- **Follow System:**
  - Users can follow/unfollow other users.
  - See updates from followed users on the main feed.

- **Messaging:**
  - Real-time messaging between users using Socket.io.

## Technologies Used

- **Frontend:**
  - React.js
  - Redux (for state management)
  - Axios (for HTTP requests)
  - Socket.io-client (for real-time features)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (using Mongoose for ODM)
  - JWT (JSON Web Tokens) for authentication
  - Socket.io (for real-time communication)

## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites

- Node.js and npm installed locally.
- MongoDB installed locally or accessible via MongoDB Atlas.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Siddikhan07/Social-Media-Aries.git
   cd pdf_answering
   ```

2. Install NPM packages for both frontend and backend
   ```bash
   cd Social-Media-Aries
   cd client && npm install
   cd ..
   cd server && npm install
   ```

3. Set up environment variables

   - **Create a .env file in the server directory with the following**
   ```bash
   PORT=8001
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
   Replace your_mongodb_uri and your_jwt_secret with your MongoDB connection URI and a JWT secret key.

5. Start the backend server
   ```bash
   cd server
   npm start
   ```
6. Start the frontend development server
   ```bash
   cd client
   yarn start
   ```
7. Open your browser and `visit http://localhost:3000` to see the application running.

Contact
Your Name - Siddik Khan

Project Link: https://github.com/Siddikhan07/Social-Media-Aries
