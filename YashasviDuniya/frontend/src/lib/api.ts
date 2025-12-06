import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          })
          
          const { access_token, refresh_token } = response.data
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
          
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  login: async (username: string, password: string) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return response.data
  },
  
  register: async (data: { username: string; email: string; password: string; full_name?: string }) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
}

// Posts API
export const postsApi = {
  getAll: async (params?: { skip?: number; limit?: number; category?: string }) => {
    const response = await api.get('/posts', { params })
    return response.data
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/posts/${id}`)
    return response.data
  },
  
  create: async (data: {
    title: string;
    summary?: string;
    content: string;
    category: string;
    tags?: string[];
    image_url?: string;
  }) => {
    const response = await api.post('/posts', data)
    return response.data
  },
  
  update: async (id: number, data: Partial<{
    title: string;
    summary: string;
    content: string;
    category: string;
    tags: string[];
    image_url: string;
    is_published: boolean;
  }>) => {
    const response = await api.put(`/posts/${id}`, data)
    return response.data
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/posts/${id}`)
    return response.data
  },
}

// Admin API
export const adminApi = {
  getUsers: async () => {
    const response = await api.get('/admin/users')
    return response.data
  },
  
  updateUserRole: async (userId: number, isAdmin: boolean) => {
    const response = await api.put(`/admin/users/${userId}/role`, { is_admin: isAdmin })
    return response.data
  },
}

export default api
