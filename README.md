# TaskFlow Backend

Node.js + Express backend for TaskFlow application.

## 🚀 Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Setup**
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

3. **Start MongoDB**
Make sure MongoDB is running on your system.

4. **Run Development Server**
```bash
npm run dev
```

Server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required, unique)
  email: String (required, unique)
  password: String (required, hashed)
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String (required)
  description: String (optional)
  completed: Boolean (default: false)
  priority: String (enum: ['low', 'medium', 'high'])
  user: ObjectId (ref: 'User', required)
  timestamps: true
}
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT authentication
- Protected routes with middleware
- Input validation
- CORS enabled