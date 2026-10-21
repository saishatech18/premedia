import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if currentUser exists in localStorage
  const user = localStorage.getItem('currentUser');

  if (!user) {
    // If not logged in, bounce to the login screen
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected page
  return children;
}