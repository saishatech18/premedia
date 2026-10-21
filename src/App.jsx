import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Settings from './pages/settings';

export default function App() {
  return (
    <BrowserRouter basename="/premedia">
      <Routes>
        {/* Default route redirects straight to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Route */}
        <Route path="/login" element={<login />} />

        {/* Settings & User Management Route */}
        <Route path="/settings" element={<settings />} />

        {/* Catch-all route redirects back to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}