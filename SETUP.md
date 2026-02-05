# Setup Guide

## Project Overview

This is a full-stack Task Management application with:
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: Next.js + React + TypeScript
- **Authentication**: JWT-based
- **Testing**: Jest + Supertest
- **Styling**: Tailwind CSS + shadcn/ui

## Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0 or yarn >= 1.22.0
- MongoDB (local or Atlas)

## Installation Steps

### 1. Clone/Extract Project
```bash
cd task-management-app
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/task-management

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here-change-this

# Server Port
PORT=5000

# Frontend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env.local

### 4. Install Dependencies
```bash
npm install
```

### 5. Start Development Servers

```bash
npm run dev
```

This starts both the Next.js frontend (port 3000) and Express backend (port 5000).

**Separate terminals (optional):**
```bash
# Terminal 1 - Frontend
npm run dev
```

```bash
# Terminal 2 - Backend
npm run server
```

## Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## Project Structure

```
task-management-app/
├── app/
│   ├── layout.tsx              # Root layout with auth provider
│   ├── page.tsx                # Home page (redirects to dashboard/login)
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Registration page
│   ├── dashboard/
│   │   └── page.tsx            # Main dashboard
│   └── globals.css
│
├── server/
│   ├── server.js               # Express server entry point
│   ├── db/
│   │   └── connection.js       # MongoDB connection
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Task.js             # Task schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── tasks.js            # Task CRUD routes
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   └── __tests__/
│       ├── auth.test.js        # Auth tests
│       └── tasks.test.js       # Task tests
│
├── components/
│   ├── task-card.tsx           # Task display component
│   ├── task-form.tsx           # Task creation/edit form
│   ├── task-filters.tsx        # Filter controls
│   ├── protected-route.tsx     # Route protection component
│   └── ui/                     # shadcn/ui components
│
├── lib/
│   ├── api.ts                  # API client functions
│   ├── auth-context.tsx        # Authentication context
│   ├── auth-validation.ts      # Input validation
│   ├── filters.ts              # Task filtering logic
│   └── utils.ts                # Utility functions
│
├── __tests__/
│   ├── filters.test.ts         # Filter tests
│   └── auth-validation.test.ts # Validation tests
│
├── package.json
├── tsconfig.json
├── jest.config.js
├── .env.example
├── API_DOCUMENTATION.md        # API documentation
└── SETUP.md                    # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test filters.test.ts
```

## Common Commands

```bash
# Development
npm run dev              # Start both servers

# Production
npm run build            # Build frontend
npm start                # Start production build

# Server only
npm run server           # Start Express server only

# Testing
npm test                 # Run tests
npm test -- --watch     # Watch mode

# Linting
npm run lint             # Run ESLint
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login

### Tasks (requires authentication)
- `GET /api/tasks` - Get all tasks (with filters)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Features

### User Features
- ✅ Create account with email/password
- ✅ Login with JWT authentication
- ✅ Create, read, update, delete tasks
- ✅ Filter tasks by status and priority
- ✅ Search tasks by title or description
- ✅ Set task due dates and categories

### Technical Features
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ MongoDB data persistence
- ✅ RESTful API design
- ✅ Component-based UI
- ✅ Type-safe with TypeScript
- ✅ Comprehensive testing

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running: `mongod`
- Verify MONGODB_URI in .env.local
- Check network connectivity to MongoDB

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### JWT Issues
- Ensure JWT_SECRET is set in .env.local
- Check token format in requests
- Verify token isn't expired (7 day expiration)

## Deployment Guide

### Deploying to Vercel (Recommended for Frontend)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
5. Deploy with a single click

### Deploying to Heroku (Backend)

1. Create a Heroku account
2. Install Heroku CLI
3. Run:
   ```bash
   heroku login
   heroku create your-app-name
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   git push heroku main
   ```

### Deploying to Railway.app

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on every push

### Database Deployment

**MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

## Performance Optimization

- Use MongoDB indexes for faster queries
- Implement API caching for frequently accessed data
- Minify frontend assets (automatic in production)
- Use CDN for static assets
- Consider adding pagination for large datasets

## Application Features

### User Management
- Secure registration with email validation
- JWT-based authentication with 7-day expiration
- Password hashing with bcryptjs
- Protected API endpoints

### Task Management
- Full CRUD operations
- Real-time filtering by status and priority
- Text search across task titles and descriptions
- Date-based sorting and organization
- Task categorization

### Frontend UI
- Modern dark theme with blue accent colors
- Responsive design for mobile and desktop
- Interactive task cards with hover effects
- Modal forms for task creation/editing
- Real-time statistics dashboard
- Advanced filtering controls

### Backend Architecture
- Express.js REST API
- MongoDB with Mongoose ODM
- Middleware for authentication and error handling
- Parameterized queries to prevent SQL injection
- CORS enabled for development and production

## Next Steps

1. Configure environment variables (.env.local)
2. Start development servers with `npm run dev`
3. Register a new account or login
4. Create and manage your tasks
5. Test filtering and sorting features
6. Deploy backend and frontend to production

## Troubleshooting

### Database Connection Issues
- Verify MongoDB is running
- Check connection string format
- Ensure network access is allowed (MongoDB Atlas)
- Check firewall settings

### Authentication Errors
- Ensure JWT_SECRET is set correctly
- Check token expiration (7 days)
- Verify Authorization header format: `Bearer <token>`

### CORS Errors
- Verify NEXT_PUBLIC_API_URL is set correctly
- Ensure backend server is running
- Check CORS configuration in server.js

### Port Conflicts
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000  
lsof -ti:5000 | xargs kill -9
```

## Support

For issues or questions:
1. Check the API_DOCUMENTATION.md file
2. Review test files in `__tests__` directory for usage examples
3. Check browser console and server logs for error messages
4. Verify all environment variables are set correctly
5. Ensure both frontend and backend servers are running

## Best Practices

- Always use HTTPS in production
- Implement rate limiting for API endpoints
- Add two-factor authentication for enhanced security
- Regularly backup your MongoDB database
- Monitor application performance and errors
- Keep dependencies updated regularly

## License

This project is provided as-is for educational purposes.
