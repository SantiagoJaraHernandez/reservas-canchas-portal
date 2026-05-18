import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const getInitialState = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  }

  try {
    const decoded = jwtDecode(token);

    return {
      token,
      user: decoded,
      isAuthenticated: true,
    };
  } catch {
    localStorage.removeItem('token');

    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  }
};

export const useAuthStore = create((set) => ({
  ...getInitialState(),

  login: (token) => {
    const decoded = jwtDecode(token);

    localStorage.setItem('token', token);

    set({
      token,
      user: decoded,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('token');

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));