import axiosInstance from './axiosInstance';

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or from Redux, Context, etc.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.log('Unauthorized request. Redirecting to login...');
      // window.location = '/login'; // Example redirect
      localStorage.removeItem('token'); // Clear token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; // Re-export the configured instance