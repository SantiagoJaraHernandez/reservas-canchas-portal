import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (data) => {
  const { token, email, rol } = data;

  let userId = null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload.userId || payload.sub || null;
  } catch (e) {
    console.error("Error parseando JWT", e);
  }

  const user = {
    id: userId,
    email,
    role: rol,
  };

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  set({
    token,
    user,
    isAuthenticated: true,
  });
},

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  loadSession: () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      return;
    }

    try {
      const user = JSON.parse(userData);

      set({
        token,
        user,
        isAuthenticated: true,
      });
    } catch (e) {
      console.error("Error cargando sesión", e);
      localStorage.clear();
    }
  },
}));

export default useAuthStore;