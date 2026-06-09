# 🌟 Lumina - AI Powered Blogging Platform

Lumina is a modern full-stack blogging platform that enables users to create, publish, discover, and manage stories through an intuitive and responsive interface. The platform integrates AI-powered content assistance, secure authentication, cloud image storage, bookmarking, commenting, and email verification to deliver a complete blogging experience.

<img width="1918" height="870" alt="HomePage" src="https://github.com/user-attachments/assets/f8fa09bf-a3a3-4de0-b075-61ef1fb10aa9" />


---

## 🚀 Live Demo

Frontend: https://the-lumina-archive.vercel.app/

Backend API: https://ai-blog-platform-uscv.onrender.com/

---

## ✨ Features

### 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Password Hashing using Bcrypt
* Email Verification via OTP
* Forgot Password with OTP Verification
* Password Reset Functionality

### ✍️ Blogging Features

* Create Blog Posts
* Edit Existing Posts
* Delete Posts
* Rich Text Editor
* Upload Cover Images
* Read Blog Posts
* Reading Time Estimation
* Blog Categories & Tags

### 🤖 AI Features

* AI-Assisted Content Generation
* SEO-Friendly Content Suggestions
* Content Enhancement Support

### 👤 User Profile Features

* Update Profile Information
* Upload Profile Picture
* Add Social Media Information
* View Published Stories
* View Saved Stories

### 📌 Engagement Features

* Bookmark Stories
* Save Stories for Later Reading
* Comment on Stories
* Share Stories
* View Community Discussions

### ☁️ Cloud Services

* MongoDB Atlas Database
* Cloudinary Image Storage
* Email Delivery Service
* Production Deployment

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap
* React Toastify
* Lucide React

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* Bcrypt.js

### Cloud Services

* Cloudinary
* Brevo SMTP

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```bash
Lumina/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── index.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/sophia310/ai-blog-platform.git
cd ai-blog-platform
```

---

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

BREVO_LOGIN=your_brevo_smtp_login
BREVO_PASSWORD=your_brevo_smtp_password

GROQ_API_KEY=your_groq_api_key
```

Start Backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd client

npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend:

```bash
npm run dev
```

---

## 🔄 API Overview

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-otp
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Posts

```http
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
```

### Comments

```http
GET    /api/comments/:postId
POST   /api/comments/:postId
```

### Bookmarks

```http
GET    /api/bookmarks
POST   /api/bookmarks/:postId
DELETE /api/bookmarks/:postId
```

### User

```http
PUT /api/users/profile
```

---

## 🎯 Key Learning Outcomes

Through this project I gained hands-on experience in:

* MERN Stack Development
* REST API Design
* JWT Authentication
* MongoDB Atlas Integration
* Cloudinary Integration
* Email Verification Systems
* State Management in React
* Deployment on Vercel and Render
* Production Environment Configuration
* Full-Stack Application Architecture

---

## 📈 Future Improvements

* Story Likes & Reactions
* Follow/Unfollow Authors
* Advanced Search & Filters
* User Dashboard Analytics
* Notification System
* Dark/Light Theme Persistence
* AI Story Summarization
* Real-Time Comments

---

## 👩‍💻 Author

Sophia Pattekari

MCA Student | MERN Stack Developer

LinkedIn: https://www.linkedin.com/in/sophia-p-454a99221/

GitHub: https://github.com/sophia310

---

