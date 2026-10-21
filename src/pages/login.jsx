import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Checking credentials...' });

    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
        
        // Save logged-in user details to browser storage
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        // Redirect to Settings page
        setTimeout(() => {
          navigate('/settings');
        }, 500);
      } else {
        setStatus({
          type: 'error',
          message: data.detail || 'Invalid email or password.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Could not connect to backend server at http://127.0.0.1:8000',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-slate-200">
        <div className="mb-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Premedia Hub</h1>
          <p className="text-sm text-slate-500 mt-1">Admin Portal Sign In</p>
        </div>

        {status.message && (
          <div
            className={`p-3 rounded-lg text-sm mb-4 ${
              status.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@premedia.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition duration-150"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}