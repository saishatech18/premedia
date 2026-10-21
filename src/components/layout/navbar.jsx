import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Read the logged in user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserEmail(parsed.email || '');
      } catch (err) {
        console.error('Failed to parse user session:', err);
      }
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <span className="text-xl font-bold text-slate-800">Premedia Hub</span>
          </div>

          {/* Navigation Links & User Badge */}
          <nav className="flex space-x-4 items-center">
            <Link
              to="/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/settings')
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              User Management
            </Link>

            {userEmail && (
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-mono border border-slate-200">
                {userEmail}
              </span>
            )}

            <button
              onClick={handleSignOut}
              className="text-sm font-medium text-slate-500 hover:text-red-600 px-3 py-2 transition"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}