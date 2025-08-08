import axios from 'axios';

const reports_api = axios.create({
  baseURL: process.env.API_BASE_URL_REPORTS || 'https://7jo8d4rabi.execute-api.ap-southeast-2.amazonaws.com/dev/', // Use environment variable for base URL
  //baseURL: process.env.API_BASE_URL,
  //Environment variables prefixed with NEXT_PUBLIC_ are exposed to the browser. Use them for public values like the API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Example for setting a token if available initially
  }
});

export default reports_api;