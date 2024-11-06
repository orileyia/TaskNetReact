import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
        const { token } = response.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

export const createJob = async (jobData) => {
  try {
    const response = await api.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAllJobs = () => api.get('/jobs');
export const getJob = (id) => api.get(`/jobs/${id}`);
export const updateJob = (id, jobData) => api.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

export const getProfile = async (): Promise<AxiosResponse> => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (profileData: Partial<UserData>): Promise<AxiosResponse> => {
  try {
    const response = await api.put('/profile', profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<AxiosResponse> => {
  try {
    const response = await api.put('/change-password', { oldPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProfilePicture = async (file: File): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append('profilePicture', file);
    const response = await api.post('/upload-profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Task Management
export const createTask = async (taskData: TaskData): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async (filters?: { category?: string; status?: string }): Promise<AxiosResponse> => {
  try {
    const response = await api.get('/tasks', { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTaskById = async (taskId: string): Promise<AxiosResponse> => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Search
export const searchTasks = async (query: string): Promise<AxiosResponse> => {
  try {
    const response = await api.get('/search/tasks', { params: { q: query } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchUsers = async (query: string): Promise<AxiosResponse> => {
  try {
    const response = await api.get('/search/users', { params: { q: query } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;