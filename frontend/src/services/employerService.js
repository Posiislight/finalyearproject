import apiClient from "./apiClient";

export const employerService = {
    /**
     * Fetch all job posts for the current employer.
     */
    getJobPosts: async () => {
        const response = await apiClient.get('/employers/jobs/');
        return response.data;
    },

    /**
     * Create a new job post.
     */
    createJobPost: async (data) => {
        const response = await apiClient.post('/employers/jobs/', data);
        return response.data;
    },

    /**
     * Get the current company profile.
     */
    getCompanyProfile: async () => {
        const response = await apiClient.get('/employers/company/profile/');
        return response.data;
    },

    /**
     * Use AI to generate a rich job description and insights based on title & requirements.
     */
    generateJobPost: async (data) => {
        const response = await apiClient.post('/ai/generate-job-post/', data);
        return response.data;
    },

    /**
     * Update the current company profile (handles FormData for logo upload).
     */
    updateCompanyProfile: async (data) => {
        const response = await apiClient.patch('/employers/company/profile/', data);
        return response.data;
    },

    getVerificationDocuments: async () => {
        const response = await apiClient.get('/employers/company/documents/');
        return response.data;
    },

    uploadVerificationDocument: async (data) => {
        const response = await apiClient.post('/employers/company/documents/', data);
        return response.data;
    },

    deleteVerificationDocument: async (docId) => {
        const response = await apiClient.delete(`/employers/company/documents/${docId}/`);
        return response.data;
    },

    getTeamMembers: async () => {
        const response = await apiClient.get('/employers/company/team/');
        return response.data;
    },

    addTeamMember: async (data) => {
        const response = await apiClient.post('/employers/company/team/', data);
        return response.data;
    },

    deleteTeamMember: async (memberId) => {
        const response = await apiClient.delete(`/employers/company/team/${memberId}/`);
        return response.data;
    },

    /**
     * Fetch all applications for a specific job post.
     */
    getJobApplicants: async (jobId) => {
        const response = await apiClient.get(`/employers/jobs/${jobId}/applicants/`);
        return response.data;
    },

    /**
     * Fetch all applications across all jobs for the current employer.
     */
    getAllApplicants: async () => {
        const response = await apiClient.get('/employers/jobs/all_applicants/');
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
    },

    /**
     * Get AI-ranked candidates for a specific job post.
     */
    getRankedCandidates: async (jobPostId) => {
        const response = await apiClient.post('/ai/rank-candidates/', {
            job_post_id: jobPostId,
        });
        return response.data;
    },

    /**
     * Get aggregate analytics for the company.
     */
    getAnalyticsSummary: async (startDate = null, endDate = null) => {
        let url = '/employers/company/analytics/summary/';
        if (startDate && endDate) {
            url += `?start_date=${startDate}&end_date=${endDate}`;
        }
        const response = await apiClient.get(url);
        return response.data;
    },

    /**
     * Get AI-generated actionable insights for the employer's active jobs.
     */
    getEmployerInsights: async () => {
        const response = await apiClient.get('/ai/employer-insights/');
        return response.data;
    },

    /**
     * Get aggregate unread notification counts for the employer sidebar.
     */
    getSidebarCounts: async () => {
        const response = await apiClient.get('/employers/company/sidebar-counts/');
        return response.data;
    },
};
