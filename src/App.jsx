import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter basename="/premedia">
      <Routes>
        {/* Default route redirects straight to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Settings & User Management Route */}
        <Route path="/settings" element={<Settings />} />

        {/* Catch-all route redirects back to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}