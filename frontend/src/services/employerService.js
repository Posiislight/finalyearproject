import apiClient from "./apiClient";

export const employerService = {
    /**
     * Fetch all job posts for the current employer.
     */
    getJobPosts: async () => {
        const response = await apiClient.get('/employers-jobs/jobs/');
        return response.data;
    },

    /**
     * Create a new job post.
     */
    createJobPost: async (data) => {
        const response = await apiClient.post('/employers-jobs/jobs/', data);
        return response.data;
    },

    /**
     * Fetch all applications for a specific job post.
     */
    getJobApplicants: async (jobId) => {
        const response = await apiClient.get(`/employers-jobs/jobs/${jobId}/applicants/`);
        return response.data;
    },

    /**
     * Fetch all applications across all jobs for the current employer.
     */
    getAllApplicants: async () => {
        const response = await apiClient.get('/employers-jobs/jobs/all_applicants/');
        return response.data;
    },

    /**
     * Update the status of an application.
     */
    updateApplicationStatus: async (applicationId, status) => {
        const response = await apiClient.patch(`/job-seekers/applications/${applicationId}/update_status/`, {
            status: status
        });
        return response.data;
    },

    // --- AI Endpoints ---

    getCandidateSummary: async (applicationId) => {
        const response = await apiClient.post('/ai/candidate-summary/', {
            application_id: applicationId,
        });
        return response.data;
    }
};
