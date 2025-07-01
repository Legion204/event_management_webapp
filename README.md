
# 🎉 Eventify - Event Management Web App

A full-featured Event Management system built with the MERN stack where users can register, log in, create events, view upcoming events, and join them in real time.

---

## 🚀 Features

- ✅ User Registration & Login (Custom Auth)
- ✅ Add, Update, Delete Events
- ✅ Join Events (Attendee count updates live)
- ✅ Filter & Search Events (Date-based & keyword)
- ✅ Private Routes for authenticated users
- ✅ SweetAlert2 confirmations
- ✅ Responsive UI built with Tailwind CSS

---

## 📸 Screenshots

> Add some screenshots here using:
```md
![Home Page](screenshots/home.png)
```

---

## ⚙️ Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Axios
- React Router
- SweetAlert2

**Backend:**
- Express.js
- MongoDB (No Mongoose)
- Custom Authentication
- dotenv + crypto for security

---

## 🔐 Authentication

Custom authentication without third-party libraries. Users are issued tokens stored in MongoDB. Auth context is used in React to manage login state.

---

## 🗂 Folder Structure

```
event-management-app/
├── client/     # Frontend - React + Vite
├── server/     # Backend - Express + MongoDB
```

---

## ⚙️ Getting Started

### 🧩 1. Clone the Repository
```bash
git clone https://github.com/yourusername/eventify.git
cd eventify
```

### 🖥 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env    # Add Mongo URI and PORT
npm run dev
```

### 🌐 3. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 🔑 .env Example (Backend)
```env
MONGO_URI=mongodb+srv://yourUser:yourPass@cluster.mongodb.net/eventify
PORT=5000
```

---

## 📦 API Routes

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
```

### Events
```
GET    /api/events
GET    /api/events/my?email=user@example.com
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
PATCH  /api/events/:id/join
```

---

## 🙋 Author

- 👨‍💻 **Riyadul Islam**
- 💌 [riyadul2003@gmail.com](mailto:riyadul2003@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
