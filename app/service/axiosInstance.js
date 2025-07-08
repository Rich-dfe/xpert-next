import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://lj0tvmbnwe.execute-api.ap-southeast-2.amazonaws.com/dev/', // Use environment variable for base URL
  //baseURL: process.env.API_BASE_URL,
  //Environment variables prefixed with NEXT_PUBLIC_ are exposed to the browser. Use them for public values like the API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Example for setting a token if available initially
  }
});



// Optional: Add request interceptors (e.g., for adding auth tokens dynamically)
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken'); // Example for client-side
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors (e.g., for error handling, refreshing tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle 401 Unauthorized globally
    // if (error.response && error.response.status === 401) {
    //   // Redirect to login or refresh token
    //   console.error('Unauthorized request. Please log in again.');
    //   // router.push('/login'); // If using useRouter from 'next/navigation' in a Client Component
    // }
    return Promise.reject(error);
  }
);


export default api;