import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';

export default function Settings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Production');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Helper function to fetch all users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/users/');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Load existing users on page mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Submitting to database...' });

    try {
      const response = await fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: `User created successfully! (ID: ${data.id})`,
        });
        setEmail('');
        setPassword('');
        // Automatically refresh user list table
        fetchUsers();
      } else {
        setStatus({
          type: 'error',
          message: data.detail || 'Failed to create user',
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
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Settings Content */}
      <main className="p-8 max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Settings & User Management</h1>
          <p className="text-sm text-slate-500">Create team members and manage role permissions.</p>
        </div>

        {/* User Creation Form Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New User</h2>

          {status.message && (
            <div
              className={`p-3 rounded-lg text-sm mb-4 ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : status.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleCreateUser} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                User Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@premedia.com"
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Admin">Admin</option>
                <option value="Production">Production</option>
                <option value="Quality">Quality</option>
                <option value="Client">Client</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-150"
            >
              Create User
            </button>
          </form>
        </div>

        {/* Existing Users Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Existing Team Members</h2>

          {loadingUsers ? (
            <p className="text-sm text-slate-500">Loading user roster...</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-slate-500">No users found. Create one above!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-medium">
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 text-slate-400 font-mono text-xs">{item.id}</td>
                      <td className="py-3 px-4 text-slate-800 font-medium">{item.email}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {item.role || item.role_id}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}