const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

const getHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Auth API calls
export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) throw new Error('Registration failed');
    return (await response.json()) as AuthResponse;
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return (await response.json()) as AuthResponse;
  },
};

// Task API calls
export const taskAPI = {
  getTasks: async (token: string, filters?: { status?: string; priority?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.search) params.append('search', filters.search);

    const response = await fetch(`${API_URL}/tasks?${params.toString()}`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return (await response.json()) as Task[];
  },

  getTask: async (token: string, id: string) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch task');
    return (await response.json()) as Task;
  },

  createTask: async (
    token: string,
    task: Omit<Task, '_id' | 'userId' | 'createdAt' | 'updatedAt'>
  ) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return (await response.json()) as Task;
  },

  updateTask: async (
    token: string,
    id: string,
    updates: Partial<Task>
  ) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return (await response.json()) as Task;
  },

  deleteTask: async (token: string, id: string) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return await response.json();
  },
};
