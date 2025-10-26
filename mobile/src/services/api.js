import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
// 🌍 CLOUD DEPLOYMENT - Backend is now on Render.com!
// This URL works from ANYWHERE in the world - no same WiFi needed!
// Your colleague can access from any location, any network

const API_BASE_URL = 'https://wasselni.onrender.com/api';

// For local development, use:
// const API_BASE_URL = 'http://192.168.1.11:3000/api';

console.log('🌐 API URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for slow connections
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method.toUpperCase(), config.url, config.baseURL);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Log response errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ API Error Response:', error.response.status, error.response.data);
      console.error('   URL:', error.config?.baseURL + error.config?.url);
    } else if (error.request) {
      console.error('❌ API No Response - Cannot connect to server');
      console.error('   URL:', error.config?.baseURL);
      console.error('   This usually means:');
      console.error('   1. Backend server is not running');
      console.error('   2. Wrong IP address or port');
      console.error('   3. Not on same WiFi network');
      console.error('   4. Firewall blocking connection');
    } else {
      console.error('❌ API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Users
export const getProfile = () => api.get('/users/me');
export const updateProfile = (data) => api.put('/users/me', data);
export const getUserById = (id) => api.get(`/users/${id}`);

// Vehicles
export const createVehicle = (data) => api.post('/vehicles', data);
export const getMyVehicles = () => api.get('/vehicles/mine');
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

// Rides
export const createRide = (data) => api.post('/rides', data);
export const searchRides = (params) => api.get('/rides/search', { params });
export const getRide = (id) => api.get(`/rides/${id}`);
export const getMyRides = () => api.get('/rides/mine/offered');
export const getMyOfferedRides = () => api.get('/rides/mine/offered');
export const updateRide = (id, data) => api.put(`/rides/${id}`, data);
export const cancelRide = (id) => api.post(`/rides/${id}/cancel`);

// Bookings
export const createBooking = (data) => api.post('/bookings', data);
export const getMyBookings = () => api.get('/bookings/mine');
export const cancelBooking = (id) => api.post(`/bookings/${id}/cancel`);

export default api;
