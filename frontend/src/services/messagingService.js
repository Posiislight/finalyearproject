import apiClient from './apiClient';

export const messagingService = {
    getThreads: async () => {
        const response = await apiClient.get('/messaging/threads/');
        return response.data;
    },

    getMessages: async (threadId) => {
        const response = await apiClient.get(`/messaging/threads/${threadId}/messages/`);
        return response.data;
    },

    sendMessage: async (threadId, content) => {
        const response = await apiClient.post(`/messaging/threads/${threadId}/send/`, {
            content,
        });
        return response.data;
    },

    markRead: async (threadId) => {
        const response = await apiClient.post(`/messaging/threads/${threadId}/mark_read/`);
        return response.data;
    },

    createThread: async (jobSeekerId, employerId) => {
        const response = await apiClient.post('/messaging/threads/', {
            job_seeker: jobSeekerId,
            employer: employerId,
        });
        return response.data;
    },
};
