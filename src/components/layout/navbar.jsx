import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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

          {/* Navigation Links */}
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

            <Link
              to="/login"
              className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-2"
            >
              Sign Out
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}