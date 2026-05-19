// src/main.jsx — REEMPLAZAR COMPLETO
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import setLogoutHandler from '@/core/api/axiosClient';
import  useAuthStore  from '@/app/store/authStore';
import AppInitializer from "@/components/AppInitializer/AppInitializer";

setLogoutHandler(() => {
  useAuthStore.getState().logout();
  window.location.href = '/login';
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppInitializer>
        <App />
    </AppInitializer>
  </StrictMode>
);