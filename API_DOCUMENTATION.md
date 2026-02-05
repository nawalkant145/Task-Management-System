# Task Management API Documentation

## Overview

This is a full-stack Task Management application built with Node.js/Express backend and Next.js frontend. The API provides endpoints for user authentication and CRUD operations on tasks.

## Getting Started

### Prerequisites
- Node.js >= 14
- MongoDB instance
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend runs on `http://localhost:5000` and frontend on `http://localhost:3000`.

## Authentication

### Register
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "User already exists"
}
```

### Login
Authenticate with existing credentials.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

## Tasks

All task endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Get All Tasks
Retrieve all tasks for the authenticated user with optional filtering.

**Endpoint:** `GET /api/tasks`

**Query Parameters:**
- `status` (optional): Filter by status - `todo`, `in-progress`, or `completed`
- `priority` (optional): Filter by priority - `low`, `medium`, or `high`
- `search` (optional): Search by title or description

**Example:**
```
GET /api/tasks?status=todo&priority=high
GET /api/tasks?search=project
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-12-31",
    "category": "work",
    "userId": "507f1f77bcf86cd799439012",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
]
```

### Get Single Task
Retrieve a specific task by ID.

**Endpoint:** `GET /api/tasks/:id`

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31",
  "category": "work",
  "userId": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

**Error Response (404):**
```json
{
  "message": "Task not found"
}
```

### Create Task
Create a new task.

**Endpoint:** `POST /api/tasks`

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "priority": "high",
  "status": "todo",
  "category": "work",
  "dueDate": "2024-12-31"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "category": "work",
  "userId": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

**Error Response (400):**
```json
{
  "message": "Title is required"
}
```

### Update Task
Update an existing task.

**Endpoint:** `PUT /api/tasks/:id`

**Request Body:**
```json
{
  "title": "Updated title",
  "status": "in-progress",
  "priority": "medium"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated title",
  "description": "Finish the task management app",
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "category": "work",
  "userId": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Delete Task
Delete a task.

**Endpoint:** `DELETE /api/tasks/:id`

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Response (404):**
```json
{
  "message": "Task not found"
}
```

## Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: String (enum: ['todo', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  category: String,
  userId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

### Status Codes
- `200`: OK - Request successful
- `201`: Created - Resource created successfully
- `400`: Bad Request - Invalid input or missing required fields
- `401`: Unauthorized - Missing or invalid authentication token
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server error

### Error Response Format
```json
{
  "message": "Error description"
}
```

## Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- Authentication (register, login)
- Task CRUD operations
- Filtering and search functionality
- Data validation
- Authorization

## Frontend Features

- **User Authentication**: Register and login with email/password
- **Task Management**: Create, read, update, and delete tasks
- **Filtering**: Filter tasks by status, priority, or search query
- **Real-time Updates**: Instant UI updates after API calls
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Development Workflow

1. Backend runs on port 5000
2. Frontend runs on port 3000
3. Use `npm run dev` to start both servers concurrently
4. API requests from frontend go to `http://localhost:5000/api`

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
- All API endpoints (except auth) require valid token
- CORS is enabled for local development
- Input validation on both client and server

## Future Enhancements

- Role-based access control (admin, user)
- Task sharing and collaboration
- Real-time notifications
- File attachments for tasks
- Task templates and recurring tasks
- Advanced filtering and search
