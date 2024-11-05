// api.js
import axios from 'axios';
import { getRequest, postRequest, putRequest, deleteRequest, postRequestWithoutToken } from './requestUtils';

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
export const login = async (email, password) => {
  try {
    const response = await postRequest(api, '/login', { email, password });
    localStorage.setItem('token', response.token); // Save token on successful login
    return response;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    throw error; // Rethrow the error to handle it in your component
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await postRequestWithoutToken(api, '/signup', { name, email, password });
    console.log('Signup successful:', response);
    localStorage.setItem('token', response.token);
    return response;
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


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
