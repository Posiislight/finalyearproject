import apiClient from './apiClient';

export const authService = {
  login: async (username, password) => {
    const response = await apiClient.post('users/login/', { username, password });
    if (response.data.access && response.data.refresh) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
  },

  register: async (email, password, userType, username) => {
    // Map userType from frontend to backend choice
    const mappedUserType = userType === 'Employer' ? 'employer' : 'job_seeker';
    
    const response = await apiClient.post('users/register/', {
      email,
      password,
      user_type: mappedUserType,
      username: username || email // fallback to email if username not provided
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('users/me/');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await apiClient.patch('users/me/', data);
    return response.data;
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await apiClient.put('users/change-password/', {
      old_password: oldPassword,
      new_password: newPassword
    });
    return response.data;
  }
};
