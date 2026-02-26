import apiClient from './apiClient';

export const jobSeekerService = {
  getJobFeed: async () => {
    const response = await apiClient.get('job-seekers/jobs/');
    return response.data;
  },

  dismissJob: async (jobPostId) => {
    const response = await apiClient.post('job-seekers/dismiss-job/', {
      job_post_id: jobPostId,
    });
    return response.data;
  },

  getApplications: async () => {
    const response = await apiClient.get('job-seekers/applications/');
    return response.data;
  },

  applyToJob: async (jobId, coverLetter = '') => {
    const response = await apiClient.post('job-seekers/applications/', {
      job_post: jobId,
      cover_letter: coverLetter,
    });
    return response.data;
  },

  // --- AI Endpoints ---

  getMatchScore: async (jobPostId) => {
    const response = await apiClient.post('ai/match-score/', {
      job_post_id: jobPostId,
    });
    return response.data;
  },

  getAiInsights: async () => {
    const response = await apiClient.get('ai/job-seeker-insights/');
    return response.data;
  },

  generateCoverLetter: async (jobPostId) => {
    const response = await apiClient.post('ai/cover-letter/', {
      job_post_id: jobPostId,
    });
    return response.data;
  },

  parseResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await apiClient.post('ai/parse-resume/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000, // AI parsing can take a while
    });
    return response.data;
  },

  getResumeOptimizations: async () => {
    const response = await apiClient.get('ai/optimize-resume/');
    return response.data;
  },

  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await apiClient.patch('users/me/resume/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // --- Profile ---

  getProfile: async () => {
    const response = await apiClient.get('users/me/');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await apiClient.patch('users/me/', data);
    return response.data;
  },

  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    const response = await apiClient.patch('users/me/profile-picture/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // --- Skills ---

  getSkills: async () => {
    const response = await apiClient.get('users/skills/');
    return response.data;
  },

  addSkill: async (name, level = 50) => {
    const response = await apiClient.post('users/skills/', { name, level });
    return response.data;
  },

  updateSkill: async (id, data) => {
    const response = await apiClient.patch(`users/skills/${id}/`, data);
    return response.data;
  },

  deleteSkill: async (id) => {
    await apiClient.delete(`users/skills/${id}/`);
  },

  // --- Experience ---

  getExperience: async () => {
    const response = await apiClient.get('users/experiences/');
    return response.data;
  },

  addExperience: async (data) => {
    const response = await apiClient.post('users/experiences/', data);
    return response.data;
  },

  updateExperience: async (id, data) => {
    const response = await apiClient.patch(`users/experiences/${id}/`, data);
    return response.data;
  },

  deleteExperience: async (id) => {
    await apiClient.delete(`users/experiences/${id}/`);
  },
};

