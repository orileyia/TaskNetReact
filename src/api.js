// api.js
import axios from 'axios';
import { getRequest, postRequest, putRequest, deleteRequest } from './requestUtils';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the header
api.interceptors.request.use(
  (config) => {
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

// Authentication
export const login = (email, password) => postRequest(api, '/login', { email, password });
export const signup = (name, email, password) => postRequest(api, '/signup', { name, email, password });

// Profile
export const getProfile = () => getRequest(api, '/profile');
export const updateProfile = (profileData) => putRequest(api, '/profile', profileData);

// Jobs
export const getAllJobs = () => getRequest(api, '/jobs');
export const getJob = (id) => getRequest(api, `/jobs/${id}`);
export const createJob = (jobData) => postRequest(api, '/jobs', jobData);
export const updateJob = (id, jobData) => putRequest(api, `/jobs/${id}`, jobData);
export const deleteJob = (id) => deleteRequest(api, `/jobs/${id}`);

export default api;
