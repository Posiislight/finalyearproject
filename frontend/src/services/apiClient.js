import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1/', // Pointing to the Django backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach the JWT access token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 Unauthorized and we haven't already retried this original request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
           return Promise.reject(error);
        }
        // Attempt to get a new access token using the refresh token
        const res = await axios.post('http://localhost:8000/api/v1/users/login/refresh/', {
          refresh: refreshToken,
        });
        if (res.status === 200) {
          localStorage.setItem('access_token', res.data.access);
          originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
          // Retry the original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If the refresh token request fails (e.g. token expired, invalid), redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Or redirect using react-router-dom history
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
