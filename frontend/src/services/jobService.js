import apiClient from './apiClient';

export const jobService = {
  // Job Seeker Endpoints
  getMatches: async () => {
    const response = await apiClient.get('job-seekers/matches/');
    return response.data;
  },

  applyForJob: async (jobId, data) => {
    const response = await apiClient.post(`job-seekers/jobs/${jobId}/apply/`, data);
    return response.data;
  },

  getAllApplications: async () => {
    const response = await apiClient.get('job-seekers/applications/');
    return response.data;
  },

  // Employer Endpoints
  createJobPost: async (data) => {
     const response = await apiClient.post('employers/jobs/', data);
     return response.data;
  },

  getEmployerJobPosts: async () => {
     const response = await apiClient.get('employers/jobs/');
     return response.data;
  },

  getApplicantsForJobPost: async (jobPostId) => {
      const response = await apiClient.get(`employers/jobs/${jobPostId}/applicants/`);
      return response.data;
  }
};
