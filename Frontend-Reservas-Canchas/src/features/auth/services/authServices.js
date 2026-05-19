import authClient from '@/core/api/authClient';

export const authService = {
  login: async (credentials) => {
    const { data } = await authClient.post('/auth/login', credentials);
    return data;
  },

  register: async (payload) => {
    const { data } = await authClient.post('/auth/register', payload);
    return data;
  },
};