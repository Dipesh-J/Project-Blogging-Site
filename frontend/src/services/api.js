import axios from 'axios';

// API base URL - in development, Vite proxy handles /api requests
// In production, set VITE_API_URL to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-api-key'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Register a new author
  register: async (userData) => {
    const response = await api.post('/authors', userData);
    return response.data;
  },

  // Login author
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
};

// Blogs API
export const blogsAPI = {
  // Get all blogs (with optional filters)
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    const queryString = params.toString();
    const url = queryString ? `/blogs?${queryString}` : '/blogs';
    const response = await api.get(url);
    return response.data;
  },

  // Get a single blog by ID
  getById: async (id) => {
    const response = await api.get(`/blogs?_id=${id}`);
    return response.data;
  },

  // Create a new blog
  create: async (blogData) => {
    const response = await api.post('/blogs', blogData);
    return response.data;
  },

  // Update a blog
  update: async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  },

  // Delete a blog by ID
  delete: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },

  // Delete blogs by query
  deleteByQuery: async (query) => {
    const params = new URLSearchParams(query);
    const response = await api.delete(`/blogs?${params.toString()}`);
    return response.data;
  },
};

export default api;
