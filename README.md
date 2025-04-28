# GlowUp - Social Media Backend API

## 📄 Project Overview
GlowUp is a Node.js backend server for a modern social media platform, featuring user authentication, posting content, commenting, liking, following users, and real-time messaging through Socket.io.

Built with scalability, validation, and real-time communication in mind.

---

## 💡 Features
- User Signup & Login with JWT Authentication
- Profile Management (Update Profile, Upload Profile Picture, Delete Account)
- Post Creation with Images, Update, Delete, Like, Timeline Feed
- Commenting on Posts (Create, Fetch, Delete)
- Follow / Unfollow Users
- Real-time 1:1 Chat Messaging using Socket.io
- Input Validation using AJV (Signup/Login)
- File Upload Handling with Multer
- MongoDB Database Integration (Mongoose ODM)
- Protected Routes with Authorization Checks

---

## 🔧 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **Socket.io**
- **Multer** (for file uploads)
- **AJV** (for schema validation)
- **JWT** (JSON Web Token)
- **bcrypt** (password hashing)

---

## 📂 Folder Structure
```
.
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── uploads/          # Uploaded Images
├── .env              # Environment Variables
├── server.js         # Server Entry Point
├── app.js            # Express App Setup
├── package.json
└── README.md
```

---

## 📦 Installation
1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/glowup-backend.git
cd glowup-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup environment variables:**
Create a `.env` file in the root directory with the following:
```bash
PORT=5050
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

---

## 🚀 Running the App
- **Development mode:**
```bash
npm run dev
```

- **Production mode:**
```bash
npm start
```

Server will run by default at: `http://localhost:5050`

---

## 🔗 API Endpoints (Summary)

### Auth
- `POST /api/auth/signup` - Register a user
- `POST /api/auth/login` - Login

### User
- `PATCH /api/user/:idUser` - Update user profile
- `PATCH /api/user/uploadImg/:idUser` - Update profile picture
- `DELETE /api/user/:idUser` - Delete user
- `PUT /api/user/follow/:idUser` - Follow user
- `PUT /api/user/unfollow/:idUser` - Unfollow user
- `GET /api/user/:idUser` - Get single user profile
- `GET /api/user/` - Get all users

### Post
- `POST /api/post/` - Create a post
- `PATCH /api/post/:id` - Update a post
- `DELETE /api/post/:id` - Delete a post
- `GET /api/post/timeline/posts` - Get timeline posts
- `PUT /api/post/like/:id` - Like/unlike a post

### Comment
- `POST /api/comment/:postId` - Add a comment
- `DELETE /api/comment/:commentId` - Delete a comment

### Chat
- `POST /api/chat/` - Start a chat
- `POST /api/chat/message` - Send message
- `GET /api/chat/:userId` - Fetch user's chats

_(Authentication required for all except signup/login)_

---

## 🚧 Deployment (Example: Render)

1. Push your project to GitHub.
2. Go to [Render.com](https://render.com/).
3. Create a new Web Service:
   - Connect your GitHub repository.
   - Set Build Command: `npm install`
   - Set Start Command: `npm start`
   - Add Environment Variables (from your .env file)
4. Deploy!

Your backend will be live with a public URL.

---

## 📊 Future Improvements
- Global Error Handling Middleware
- Rate Limiting on Authentication Routes
- API Documentation with Swagger
- Dockerization for Containerized Deployment
- Adding Notifications and Group Chats

---

## 🚀 Author
- omar waked

> _Built with ❤️ for learning, innovation, and scaling future social apps._

