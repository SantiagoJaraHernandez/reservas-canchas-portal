
import React, { useEffect } from "react";
import useAuthStore from "@/app/store/authStore";

function AppInitializer({ children }) {
  const loadSession = useAuthStore((state) => state.loadSession);

  useEffect(() => {
    loadSession();
  }, []);

  return children;
}

export default AppInitializer;
