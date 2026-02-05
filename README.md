# Task Manager - Full Stack Application

A modern, professional task management application built with **Node.js/Express** backend and **Next.js** frontend. Manage your tasks efficiently with filtering, sorting, and real-time updates.

## ✨ Features

### Core Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Task CRUD**: Create, read, update, and delete tasks
- **Advanced Filtering**: Filter by status, priority, and search by keyword
- **Smart Sorting**: Sort tasks by date, priority, or title
- **Task Statistics**: Real-time dashboard showing task metrics
- **Responsive Design**: Works seamlessly on desktop and mobile

### Frontend
- Modern dark theme with professional blue accent colors
- Interactive task cards with hover effects
- Modal forms for creating and editing tasks
- Real-time filtering and sorting
- Task statistics dashboard
- Smooth animations and transitions

### Backend
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Secure password hashing with bcryptjs
- Comprehensive error handling
- Input validation and sanitization

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and Install**
```bash
cd task-management-app
npm install
```

2. **Configure Environment**
Create `.env.local` in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your-secret-key-change-this
PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Start Development Servers**
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📋 API Documentation

### Authentication

**Register User**
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Login**
```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Tasks (All require Authentication)

**Get All Tasks**
```
GET /api/tasks?status=todo&priority=high&search=project
```

**Create Task**
```
POST /api/tasks
{
  "title": "Task Title",
  "description": "Task description",
  "priority": "high",
  "status": "todo",
  "category": "work",
  "dueDate": "2024-12-31"
}
```

**Update Task**
```
PUT /api/tasks/:id
{
  "status": "in-progress",
  "priority": "medium"
}
```

**Delete Task**
```
DELETE /api/tasks/:id
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API reference.

## 🏗️ Project Structure

```
task-management-app/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── register/
│   │   └── page.tsx          # Registration page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
│
├── server/
│   ├── db/
│   │   └── connection.js     # MongoDB connection
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Task.js           # Task schema
│   ├── routes/
│   │   ├── auth.js           # Auth endpoints
│   │   └── tasks.js          # Task endpoints
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   └── server.js             # Express app
│
├── components/
│   ├── task-card.tsx         # Task display
│   ├── task-form.tsx         # Task form modal
│   └── ui/                   # UI components
│
├── lib/
│   ├── api.ts                # API client
│   ├── auth-context.tsx      # Auth state management
│   ├── filters.ts            # Filtering logic
│   └── utils.ts              # Utility functions
│
├── __tests__/                # Test files
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication (7-day expiration)
- ✅ CORS protection
- ✅ Input validation and sanitization
- ✅ Protected API endpoints
- ✅ Secure token storage in localStorage

## 🎨 UI/UX Highlights

- **Modern Dark Theme**: Professional blue and slate color scheme
- **Responsive Grid**: Adapts to all screen sizes
- **Interactive Cards**: Smooth hover effects and transitions
- **Real-time Stats**: Live task metrics on dashboard
- **Intuitive Forms**: Clear, accessible form layouts
- **Visual Feedback**: Loading states and error messages

## 📊 Task Statistics

The dashboard displays:
- Total tasks count
- Completed tasks
- In-progress tasks  
- High-priority tasks

## 🔧 Development Commands

```bash
# Start both servers
npm run dev

# Start only backend
npm run server

# Build frontend
npm run build

# Start production build
npm start

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint
```

## 🧪 Testing

The project includes comprehensive tests:

```bash
# Run all tests
npm test

# Run specific test file
npm test filters.test.ts

# Run with coverage
npm test -- --coverage
```

Test coverage includes:
- Authentication (register/login)
- Task CRUD operations
- Filtering and sorting
- Input validation
- Authorization checks

## 📱 Responsive Design

Optimized for all devices:
- **Desktop**: Full-featured interface with grid layout
- **Tablet**: Optimized column layout
- **Mobile**: Single-column stack layout

## 🌐 Deployment

### Deploy Frontend to Vercel
```bash
npm run build
# Push to GitHub and import to Vercel
```

### Deploy Backend to Heroku
```bash
heroku create app-name
heroku config:set MONGODB_URI=your_uri
git push heroku main
```

### Database: MongoDB Atlas
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Set MONGODB_URI

See [SETUP.md](./SETUP.md) for detailed deployment guide.

## 🐛 Troubleshooting

### Server won't start
- Check MongoDB is running
- Verify environment variables
- Check port availability

### API requests failing
- Ensure backend server is running
- Check NEXT_PUBLIC_API_URL
- Verify network connectivity

### Authentication issues
- Clear localStorage and try again
- Check JWT_SECRET is set
- Verify token format in headers

See [SETUP.md](./SETUP.md) for more troubleshooting tips.

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- [Setup Guide](./SETUP.md) - Installation and deployment
- [Testing Guide](./SETUP.md#running-tests) - How to run tests

## 🤝 Contributing

To contribute improvements:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

This project is provided as-is for educational purposes.

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Configure `.env.local`
3. Start development: `npm run dev`
4. Register a new account
5. Create and manage tasks
6. Deploy when ready

## 🆘 Support

For questions or issues:
1. Check [SETUP.md](./SETUP.md) for common solutions
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. Check test files for usage examples
4. Review console logs for error details

---

**Happy Task Managing!** 🎉

Built with ❤️ using Node.js, Express, MongoDB, React, and Next.js
