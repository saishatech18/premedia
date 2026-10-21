import React, { useState, useMemo } from 'react';

// Zero-dependency SVG Icon Component for robust previewing
const Icon = ({ name, className }) => {
  const icons = {
    User: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>,
    Users: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></g>,
    Settings: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></g>,
    Shield: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></g>,
    XCircle: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></g>,
    Briefcase: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></g>,
    FolderPlus: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></g>,
    Paperclip: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></g>,
    Clock: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></g>,
    Upload: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></g>,
    Download: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></g>,
    FileText: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></g>,
    AlertCircle: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></g>,
    LayoutDashboard: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></g>,
    BarChart: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></g>,
    Play: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></g>,
    Square: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></g>,
    CheckCircle: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></g>
  };
  
  return (
    <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {icons[name] || icons.AlertCircle}
    </svg>
  );
};

const ROLES = {
  ADMIN: 'Admin System',
  CSO: 'Client Service',
  OPERATOR: 'Repro Operator',
  QC: 'QC Team',
  CLIENT: 'Client'
};

const PERMISSIONS = {
  CREATE_JOB: 'Create Jobs',
  MANAGE_USERS: 'Manage Users & Roles',
  UPLOAD_ASSETS: 'Upload Assets',
  QC_APPROVAL: 'QC Approval',
  CLIENT_APPROVAL: 'Client Approval',
  VIEW_ALL_JOBS: 'View All Jobs',
  MANAGE_WORKFLOW: 'Manage Workflow',
  VIEW_REPORTS: 'View Analytics & Reports',
  ASSIGN_RESOURCES: 'Assign Resources'
};

const DEFAULT_ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.CSO]: [PERMISSIONS.CREATE_JOB, PERMISSIONS.VIEW_ALL_JOBS, PERMISSIONS.MANAGE_WORKFLOW, PERMISSIONS.VIEW_REPORTS, PERMISSIONS.ASSIGN_RESOURCES],
  [ROLES.OPERATOR]: [PERMISSIONS.UPLOAD_ASSETS, PERMISSIONS.VIEW_ALL_JOBS],
  [ROLES.QC]: [PERMISSIONS.QC_APPROVAL, PERMISSIONS.VIEW_ALL_JOBS],
  [ROLES.CLIENT]: [PERMISSIONS.CLIENT_APPROVAL]
};

const STATUS = {
  INTAKE: 'Intake/Brief',
  REPRO: 'In Repro',
  QC: 'In QC',
  PROOFING: 'Client Proofing',
  APPROVED: 'Approved',
  DELIVERED: 'Final Delivered'
};

// Bootstrapped with ONE admin user so you aren't locked out of the system.
const INITIAL_USERS = [
  { id: 'u_admin_1', name: 'System Admin', role: ROLES.ADMIN }
];

// Completely clean jobs array for production testing
const INITIAL_JOBS = [];

function useWorkflowAPI() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  const createJob = async (jobData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newJob = {
          id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
          ...jobData,
          status: STATUS.INTAKE,
          history: [{ date: new Date().toISOString(), user: 'Current User', action: 'Created Brief' }],
          assets: [],
          comments: [],
          assignedTo: [],
          timeLogs: []
        };
        setJobs(prev => [newJob, ...prev]);
        resolve();
      }, 300);
    });
  };

  const updateJob = async (jobId, updates, actionLog, currentUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setJobs(prev => prev.map(job => {
          if (job.id === jobId) {
            const newHistory = actionLog ? 
              [{ date: new Date().toISOString(), user: currentUser.name, action: actionLog }, ...job.history] 
              : job.history;
            return { ...job, ...updates, history: newHistory };
          }
          return job;
        }));
        resolve();
      }, 300);
    });
  };

  return { jobs, createJob, updateJob };
}

const StatusBadge = ({ status }) => {
  const styles = {
    [STATUS.INTAKE]: 'bg-slate-100 text-slate-800 border-slate-200',
    [STATUS.REPRO]: 'bg-blue-100 text-blue-800 border-blue-200',
    [STATUS.QC]: 'bg-purple-100 text-purple-800 border-purple-200',
    [STATUS.PROOFING]: 'bg-orange-100 text-orange-800 border-orange-200',
    [STATUS.APPROVED]: 'bg-green-100 text-green-800 border-green-200',
    [STATUS.DELIVERED]: 'bg-teal-100 text-teal-800 border-teal-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
};

const SettingsDashboard = ({ users, setUsers }) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState(ROLES.CSO);
  const [statusMsg, setStatusMsg] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserEmail.trim() || !newUserPassword.trim()) return;
    
    // Map frontend role to database role_id (1: admin, 2: designer, 3: client)
    let dbRoleId = 3; 
    if (newUserRole === ROLES.ADMIN) dbRoleId = 1;
    else if ([ROLES.CSO, ROLES.OPERATOR, ROLES.QC].includes(newUserRole)) dbRoleId = 2;

    try {
      // 1. Send data to your FastAPI backend
      const response = await fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newUserEmail,
          password: newUserPassword,
          role_id: dbRoleId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Database error');
      }

      const savedDbUser = await response.json();
      
      // 2. Update local frontend state to instantly show the new user in the table
      const newUser = {
        id: `u_${savedDbUser.id}`,
        name: newUserName || newUserEmail.split('@')[0],
        role: newUserRole
      };
      
      setUsers([...users, newUser]);
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserName('');
      setStatusMsg('User successfully created in database!');
      setTimeout(() => setStatusMsg(''), 4000);
      
    } catch (error) {
      setStatusMsg(`Error: ${error.message}`);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const handleDeleteUser = (id) => {
    if (id === 'u_admin_1') {
      alert("Cannot delete the root System Admin account.");
      return;
    }
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 flex items-center mb-6">
        <Icon name="Settings" className="mr-3 text-indigo-600 w-7 h-7" /> Platform Settings & User Management
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Create User Form */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 col-span-1">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
            <Icon name="User" className="w-5 h-5 mr-2 text-indigo-500" /> Create New User
          </h3>
          {statusMsg && (
            <div className={`p-3 mb-4 text-sm font-bold rounded-lg ${statusMsg.includes('Error') ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {statusMsg}
            </div>
          )}
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input required type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} placeholder="user@company.com" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input required type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} placeholder="••••••••" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Display Name (Optional)</label>
              <input type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} placeholder="e.g. John Doe" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Assign System Role</label>
              <select value={newUserRole} onChange={e => setNewUserRole(e.target.value)} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 outline-none cursor-pointer">
                {Object.values(ROLES).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full btn-primary py-3">Create User Account</button>
          </form>
        </div>

        {/* User Directory */}
        <div className="bg-white rounded-2xl shadow-sm border col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b bg-slate-50">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <Icon name="Users" className="w-5 h-5 mr-2 text-indigo-500" /> Active System Users
            </h3>
            <p className="text-sm text-slate-500 mt-1">Manage team access and simulated logins for testing.</p>
          </div>
          <div className="p-0 flex-1 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white border-b">
                <tr>
                  <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">{user.name}</td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-xs font-bold border">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleDeleteUser(user.id)} disabled={user.id === 'u_admin_1'} className="text-rose-600 hover:text-rose-800 font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed">
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobModal = ({ job, currentUser, hasPermission, users, jobs, onClose, onUpdate }) => {
  const [comment, setComment] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [autoTimerMsg, setAutoTimerMsg] = useState('');
  
  // Time tracking state
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState(null);

  if (!job) return null;

  const getAvailability = (userId) => {
    const activeUserJobs = jobs.filter(j => 
      j.assignedTo.includes(userId) && 
      [STATUS.REPRO, STATUS.QC].includes(j.status)
    );
    if (activeUserJobs.length === 0) return { status: 'Free', color: 'text-emerald-600 bg-emerald-50' };
    if (activeUserJobs.length < 3) return { status: 'Busy', color: 'text-orange-600 bg-orange-50' };
    return { status: 'Overloaded', color: 'text-rose-600 bg-rose-50' };
  };

  const handleAction = (newStatus, actionDesc, requiredComment = false) => {
    if (requiredComment && !comment) {
      setErrorMsg("A comment or reason is required for this action.");
      return;
    }
    
    const updates = { status: newStatus };
    if (comment) {
      updates.comments = [...job.comments, { text: comment, role: currentUser.role, user: currentUser.name, date: new Date().toISOString() }];
    }
    
    onUpdate(job.id, updates, actionDesc, currentUser);
    onClose();
  };

  const handleSimulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      onUpdate(job.id, { 
        assets: [...job.assets, { 
          name: `artwork_v${job.assets.length + 1}.pdf`, 
          url: '#',
          metadata: { size: (Math.random() * 10 + 1).toFixed(1) + 'MB', type: 'PDF/X-4' }
        }] 
      }, 'Uploaded new artwork (DAM) & Pre-flight Passed', currentUser);
      setUploading(false);
    }, 800);
  };

  const toggleAssignment = (userId) => {
    const newAssigned = job.assignedTo.includes(userId) 
      ? job.assignedTo.filter(id => id !== userId)
      : [...job.assignedTo, userId];
    
    const assignedUser = users.find(u => u.id === userId);
    const action = job.assignedTo.includes(userId) ? `Removed ${assignedUser.name}` : `Assigned ${assignedUser.name}`;
    
    onUpdate(job.id, { assignedTo: newAssigned }, action, currentUser);
  };

  const handleTimeTracking = () => {
    if (!isTiming) {
      setIsTiming(true);
      setStartTime(Date.now());
    } else {
      setIsTiming(false);
      const durationMins = Math.round((Date.now() - startTime) / 60000); 
      const loggedMins = Math.max(1, durationMins); // Minimum 1 minute logged
      
      const newLog = {
        userId: currentUser.id,
        duration: loggedMins,
        date: new Date().toISOString(),
        desc: 'Working session'
      };
      
      onUpdate(job.id, { timeLogs: [...job.timeLogs, newLog] }, `Logged ${loggedMins}m of time`, currentUser);
      setStartTime(null);
    }
  };

  const handleDownloadAsset = (assetName) => {
    if ((currentUser.role === ROLES.OPERATOR || currentUser.role === ROLES.QC) && job.assignedTo.includes(currentUser.id) && !isTiming) {
      setIsTiming(true);
      setStartTime(Date.now());
      setAutoTimerMsg(`Started downloading ${assetName}. Time tracker auto-started!`);
      setTimeout(() => setAutoTimerMsg(''), 4000); 
    }
    console.log(`Downloading ${assetName}...`);
  };

  const totalTimeLogged = job.timeLogs.reduce((acc, log) => acc + log.duration, 0);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b flex justify-between items-start bg-slate-50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-bold text-slate-500 bg-white border px-2 py-1 rounded-md">{job.id}</span>
              <StatusBadge status={job.status} />
              {totalTimeLogged > 0 && (
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md flex items-center gap-1">
                  <Icon name="Clock" className="w-3 h-3" /> {Math.floor(totalTimeLogged / 60)}h {totalTimeLogged % 60}m logged
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">{job.title}</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">{job.client}</p>
          </div>
          <div className="flex items-center gap-4">
            {(currentUser.role === ROLES.OPERATOR || currentUser.role === ROLES.QC) && job.assignedTo.includes(currentUser.id) && (
              <button 
                onClick={handleTimeTracking}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${isTiming ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 animate-pulse' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
              >
                {isTiming ? <Icon name="Square" className="w-4 h-4" /> : <Icon name="Play" className="w-4 h-4" />}
                {isTiming ? 'Stop Timer' : 'Start Timer'}
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-700">
              <Icon name="XCircle" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body (Two Column Layout) */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          
          {/* Main Column */}
          <div className="flex-1 p-6 space-y-8 border-r">
            <section className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
              <h3 className="flex items-center text-sm font-bold text-indigo-900 mb-3 uppercase tracking-wider">
                <Icon name="FileText" className="w-4 h-4 mr-2 text-indigo-600" /> Job Brief & Automation Specs
              </h3>
              <p className="text-sm text-indigo-900/80 leading-relaxed whitespace-pre-wrap">{job.brief}</p>
            </section>

            {/* DAM Section */}
            <section>
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                  <Icon name="Briefcase" className="w-4 h-4 mr-2 text-slate-400" /> Digital Assets (DAM) & Pre-flight
                </h3>
                {autoTimerMsg && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full animate-pulse border border-emerald-200">
                    {autoTimerMsg}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                {job.assets.length === 0 ? (
                  <div className="text-center p-6 bg-slate-50 border border-dashed rounded-xl">
                    <Icon name="FileText" className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm text-slate-500 font-medium">No assets uploaded yet.</p>
                  </div>
                ) : (
                  job.assets.map((asset, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white border shadow-sm rounded-xl hover:border-indigo-300 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mr-4">
                          <Icon name="Paperclip" className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <button 
                            onClick={() => handleDownloadAsset(asset.name)}
                            className="text-sm text-indigo-600 font-bold hover:underline flex items-center gap-1 focus:outline-none"
                            title="Click to download and auto-start timer"
                          >
                            <Icon name="Download" className="w-3 h-3" /> {asset.name}
                          </button>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded">{asset.metadata?.size || 'Unknown size'}</span>
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded">{asset.metadata?.type || 'Unknown type'}</span>
                            <span className="text-emerald-600 flex items-center"><Icon name="CheckCircle" className="w-3 h-3 mr-1" /> Pre-flight Passed</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-50 border px-2 py-1 rounded-md">Revision {idx + 1}</span>
                    </div>
                  ))
                )}
              </div>
              
              {(hasPermission(PERMISSIONS.UPLOAD_ASSETS) && (job.status === STATUS.INTAKE || job.status === STATUS.REPRO || job.status === STATUS.QC)) && (
                <button 
                  onClick={handleSimulateUpload}
                  disabled={uploading}
                  className="mt-4 flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all disabled:opacity-50"
                >
                  <Icon name="Upload" className="w-5 h-5 mr-2" />
                  {uploading ? 'Automated Pre-flight & DAM Uploading...' : 'Upload New Artwork Revision'}
                </button>
              )}
            </section>

            {/* Comments */}
            <section>
              <h3 className="text-sm font-bold text-slate-900 mb-4 border-b pb-2 uppercase tracking-wider flex items-center">
                 <Icon name="MessageSquare" className="w-4 h-4 mr-2 text-slate-400" /> Collaboration & Feedback
              </h3>
              <div className="space-y-4 mb-5 max-h-60 overflow-y-auto pr-2">
                {job.comments.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">No comments yet.</p>
                ) : (
                  job.comments.map((c, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl text-sm border border-slate-100">
                      <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700 bg-white px-2 py-1 rounded border shadow-sm">{c.user}</span>
                          <span className="text-[10px] uppercase text-slate-400">{c.role}</span>
                        </div>
                        <span className="font-medium">{new Date(c.date).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-800 mt-1">{c.text}</p>
                    </div>
                  ))
                )}
              </div>
              
              {errorMsg && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center">
                  <Icon name="AlertCircle" className="w-4 h-4 mr-2" /> {errorMsg}
                </div>
              )}
              
              <textarea
                value={comment}
                onChange={(e) => { setComment(e.target.value); if (errorMsg) setErrorMsg(''); }}
                placeholder="Add feedback, approval notes, or change requests (visible in Audit Trail)..."
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none bg-slate-50 focus:bg-white transition-colors"
                rows="3"
              />
            </section>
          </div>

          {/* Sidebar Column (Resources & Audit Trail) */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 space-y-8 flex flex-col">
            
            {/* Resource Allocation */}
            <section>
              <h3 className="text-sm font-bold text-slate-900 mb-4 border-b pb-2 uppercase tracking-wider flex items-center">
                 <Icon name="Users" className="w-4 h-4 mr-2 text-slate-400" /> Resource Allocation
              </h3>
              
              <div className="space-y-3">
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-500 mb-2">Currently Assigned:</h4>
                  {job.assignedTo.length === 0 ? (
                    <div className="text-sm text-slate-400 italic bg-white p-3 rounded-lg border border-dashed">Unassigned</div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {job.assignedTo.map(id => {
                        const u = users.find(user => user.id === id);
                        return u ? (
                          <div key={id} className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1.5 rounded-lg flex items-center gap-1 border border-indigo-200">
                            <Icon name="User" className="w-3 h-3" /> {u.name}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                {hasPermission(PERMISSIONS.ASSIGN_RESOURCES) && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 mb-2">Manage Resources:</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {users.filter(u => u.role === ROLES.OPERATOR || u.role === ROLES.QC).length === 0 && (
                        <p className="text-xs text-slate-500 italic">No operators or QC users available to assign. Create them in Settings.</p>
                      )}
                      {users.filter(u => u.role === ROLES.OPERATOR || u.role === ROLES.QC).map(u => {
                        const isAssigned = job.assignedTo.includes(u.id);
                        const availability = getAvailability(u.id);
                        return (
                          <div key={u.id} className="flex justify-between items-center p-2 bg-white rounded-lg border text-sm hover:border-indigo-300 transition-colors">
                            <div>
                              <div className="font-bold text-slate-700">{u.name}</div>
                              <div className="text-[10px] text-slate-400">{u.role}</div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                               <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${availability.color}`}>{availability.status}</span>
                               <button 
                                onClick={() => toggleAssignment(u.id)}
                                className={`text-xs px-2 py-1 rounded font-bold transition-colors ${isAssigned ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                              >
                                {isAssigned ? 'Remove' : 'Assign'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Audit Trail */}
            <section className="flex-1 min-h-[200px] flex flex-col">
              <h3 className="text-sm font-bold text-slate-900 mb-4 border-b pb-2 uppercase tracking-wider flex items-center">
                 <Icon name="Clock" className="w-4 h-4 mr-2 text-slate-400" /> Audit Trail
              </h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {job.history.map((h, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2 border-slate-200 pb-2">
                    <div className="absolute w-2 h-2 bg-slate-300 rounded-full -left-[5px] top-1.5"></div>
                    <div className="text-xs text-slate-500 mb-0.5 font-medium">{new Date(h.date).toLocaleString()}</div>
                    <div className="text-sm text-slate-800">
                      <span className="font-bold">{h.user}</span>: {h.action}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t bg-slate-50 flex flex-wrap justify-end gap-3 shrink-0">
          {hasPermission(PERMISSIONS.MANAGE_WORKFLOW) && job.status === STATUS.INTAKE && (
            <button onClick={() => handleAction(STATUS.REPRO, 'Job Activated - Sent to Repro Workflow')} className="btn-primary">Activate Workflow (Repro)</button>
          )}
          {hasPermission(PERMISSIONS.MANAGE_WORKFLOW) && job.status === STATUS.APPROVED && (
            <button onClick={() => handleAction(STATUS.DELIVERED, 'Automated Final Delivery Triggered')} className="btn-primary">Deliver Final Assets</button>
          )}
          
          {hasPermission(PERMISSIONS.UPLOAD_ASSETS) && (job.status === STATUS.INTAKE || job.status === STATUS.REPRO) && (
             <button 
              onClick={() => handleAction(STATUS.QC, 'Artwork Submitted to QC Workflow')} 
              disabled={job.assets.length === 0}
              className={`btn-primary ${job.assets.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Submit Artwork to QC
            </button>
          )}

          {hasPermission(PERMISSIONS.QC_APPROVAL) && job.status === STATUS.QC && (
            <>
              <button onClick={() => handleAction(STATUS.REPRO, 'QC Rejected - Sent back to Repro', true)} className="btn-danger">Reject to Operator</button>
              <button onClick={() => handleAction(STATUS.PROOFING, 'QC Approved - Sent to Client Portal')} className="btn-success">Approve for Proofing</button>
            </>
          )}

          {hasPermission(PERMISSIONS.CLIENT_APPROVAL) && job.status === STATUS.PROOFING && (
            <>
              <button onClick={() => handleAction(STATUS.REPRO, 'Client Requested Changes via Proofing Tool', true)} className="btn-danger">Request Changes</button>
              <button onClick={() => handleAction(STATUS.APPROVED, 'Client Approved Final Artwork')} className="btn-success">Approve Final Artwork</button>
            </>
          )}

          <button onClick={onClose} className="px-5 py-2 border bg-white rounded-xl text-slate-700 hover:bg-slate-50 font-bold text-sm transition-colors shadow-sm">Close Window</button>
        </div>
      </div>
    </div>
  );
};

const IntakeForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ title: '', client: '', brief: '' });

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
        <Icon name="FolderPlus" className="mr-3 text-indigo-600 w-7 h-7" /> Create New Job Ticket
      </h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
            <input required type="text" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50" onChange={e => setFormData({...formData, title: e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Client / Brand Name</label>
            <input required type="text" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50" onChange={e => setFormData({...formData, client: e.target.value})}/>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Creative Brief & Automation Specs (Hot Folders, Profiles)</label>
          <textarea required rows="6" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50" onChange={e => setFormData({...formData, brief: e.target.value})}></textarea>
        </div>
        <div className="flex gap-3 pt-6 border-t">
          <button type="submit" className="btn-primary py-3 px-8 text-base">Generate Ticket & Start Workflow</button>
          <button type="button" onClick={onCancel} className="px-6 py-3 border rounded-xl text-slate-700 hover:bg-slate-50 font-bold transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
};

const ReportingDashboard = ({ jobs, users }) => {
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j.status !== STATUS.APPROVED && j.status !== STATUS.DELIVERED).length;
  
  const userTimes = {};
  jobs.forEach(job => {
    job.timeLogs.forEach(log => {
      userTimes[log.userId] = (userTimes[log.userId] || 0) + log.duration;
    });
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 flex items-center">
        <Icon name="BarChart" className="mr-3 text-indigo-600" /> Platform Analytics & Billing Reports
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Volume</div>
          <div className="text-4xl font-black text-indigo-600">{totalJobs} Tickets</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Active Work-in-Progress</div>
          <div className="text-4xl font-black text-orange-500">{activeJobs} Jobs</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Billable Hours</div>
          <div className="text-4xl font-black text-emerald-600">
            {Math.floor(Object.values(userTimes).reduce((a, b) => a + b, 0) / 60)}h
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b bg-slate-50">
           <h3 className="text-lg font-bold text-slate-900">Resource Productivity & Time Tracking</h3>
           <p className="text-sm text-slate-500">Tracked time across all active and completed jobs for billing and efficiency analysis.</p>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b">
            <tr>
              <th className="p-4 font-bold uppercase tracking-wider text-xs text-slate-500">Team Member</th>
              <th className="p-4 font-bold uppercase tracking-wider text-xs text-slate-500">Role</th>
              <th className="p-4 font-bold uppercase tracking-wider text-xs text-slate-500">Total Logged Time</th>
              <th className="p-4 font-bold uppercase tracking-wider text-xs text-slate-500">Billing Value (Est. $50/hr)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.filter(u => u.role === ROLES.OPERATOR || u.role === ROLES.QC).map(user => {
              const minutes = userTimes[user.id] || 0;
              const hours = (minutes / 60).toFixed(1);
              const billing = (hours * 50).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
              return (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">{user.name}</td>
                  <td className="p-4 text-slate-500">{user.role}</td>
                  <td className="p-4">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md font-bold">
                      {Math.floor(minutes/60)}h {minutes%60}m
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-600">{billing}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  
  // Keep track of logged in user by ID. Default to the first user (System Admin).
  const [currentUserId, setCurrentUserId] = useState(INITIAL_USERS[0].id);
  const currentUser = users.find(u => u.id === currentUserId) || users[0];
  
  const [rolePermissions, setRolePermissions] = useState(DEFAULT_ROLE_PERMISSIONS);
  const [currentView, setCurrentView] = useState('DASHBOARD'); // DASHBOARD, INTAKE, REPORTS, SETTINGS
  const [selectedJob, setSelectedJob] = useState(null);
  
  const { jobs, createJob, updateJob } = useWorkflowAPI();

  const hasPermission = (permission) => {
    return rolePermissions[currentUser.role]?.includes(permission) || false;
  };

  const visibleJobs = useMemo(() => {
    if (currentUser.role === ROLES.CLIENT) {
      return jobs.filter(j => [STATUS.PROOFING, STATUS.APPROVED, STATUS.DELIVERED].includes(j.status));
    }
    if ((currentUser.role === ROLES.OPERATOR || currentUser.role === ROLES.QC) && !hasPermission(PERMISSIONS.VIEW_ALL_JOBS)) {
       return jobs.filter(j => j.assignedTo.includes(currentUser.id));
    }
    return jobs;
  }, [jobs, currentUser, rolePermissions]);

  const handleCreateJob = async (data) => {
    await createJob(data);
    setCurrentView('DASHBOARD');
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        .btn-primary { @apply px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-sm active:scale-95 flex items-center justify-center; }
        .btn-success { @apply px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold text-sm shadow-sm active:scale-95 flex items-center justify-center; }
        .btn-danger { @apply px-5 py-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all font-bold text-sm shadow-sm active:scale-95 flex items-center justify-center; }
      `}} />

      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-xl z-10 shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10 text-indigo-400">
            <Icon name="LayoutDashboard" className="w-8 h-8" />
            <span className="text-2xl font-black tracking-widest text-white leading-tight">PREMEDIA<br/><span className="text-indigo-400">HUB</span></span>
          </div>
          
          <nav className="space-y-2">
            <button onClick={() => setCurrentView('DASHBOARD')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${currentView === 'DASHBOARD' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Icon name="Briefcase" className="w-5 h-5" /> Active Tickets
            </button>
            
            {hasPermission(PERMISSIONS.CREATE_JOB) && (
              <button onClick={() => setCurrentView('INTAKE')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${currentView === 'INTAKE' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Icon name="FolderPlus" className="w-5 h-5" /> New Intake
              </button>
            )}

            {hasPermission(PERMISSIONS.VIEW_REPORTS) && (
              <button onClick={() => setCurrentView('REPORTS')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${currentView === 'REPORTS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Icon name="BarChart" className="w-5 h-5" /> Analytics & Reports
              </button>
            )}

            {hasPermission(PERMISSIONS.MANAGE_USERS) && (
              <button onClick={() => setCurrentView('SETTINGS')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold mt-4 ${currentView === 'SETTINGS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Icon name="Settings" className="w-5 h-5" /> Settings & Users
              </button>
            )}
          </nav>
        </div>
        
        {/* User Switcher (Simulation) */}
        <div className="mt-auto p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-wider">Simulate Login</div>
          <select 
            value={currentUserId} 
            onChange={(e) => {
              setCurrentUserId(e.target.value);
              setCurrentView('DASHBOARD');
            }}
            className="w-full bg-slate-800 text-white text-sm font-medium border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer appearance-none"
          >
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
            ))}
          </select>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 shrink-0 z-0 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800">
            {currentView === 'DASHBOARD' && 'Centralized Job & Task Management'}
            {currentView === 'INTAKE' && 'Automated Ticketing'}
            {currentView === 'REPORTS' && 'Resource Allocation & Analytics'}
            {currentView === 'SETTINGS' && 'System Administration'}
          </h1>
          <div className="flex items-center gap-3">
             {currentUser.role === ROLES.OPERATOR || currentUser.role === ROLES.QC ? (
               <div className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-bold border border-emerald-200 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Available for work
               </div>
             ) : null}
            <div className="flex items-center gap-2 text-sm text-indigo-800 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 font-medium shadow-sm">
              <Icon name="User" className="w-4 h-4 text-indigo-600" />
              <strong className="font-bold">{currentUser.name}</strong>
              <span className="text-indigo-400 mx-1">|</span>
              <span className="text-xs uppercase tracking-wider font-bold text-indigo-600">{currentUser.role}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 sm:p-10">
          
          {currentView === 'REPORTS' && <ReportingDashboard jobs={jobs} users={users} />}
          {currentView === 'INTAKE' && <IntakeForm onSubmit={handleCreateJob} onCancel={() => setCurrentView('DASHBOARD')} />}
          {currentView === 'SETTINGS' && <SettingsDashboard users={users} setUsers={setUsers} />}
          
          {currentView === 'DASHBOARD' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleJobs.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center p-16 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 mt-10">
                  <Icon name="FolderPlus" className="w-12 h-12 mb-4 opacity-50 text-slate-300" />
                  <p className="font-bold text-lg text-slate-500">No active tickets found in the system.</p>
                  {hasPermission(PERMISSIONS.CREATE_JOB) && (
                    <button onClick={() => setCurrentView('INTAKE')} className="mt-4 px-6 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors">
                      Create New Brief
                    </button>
                  )}
                </div>
              ) : (
                visibleJobs.map(job => (
                  <div 
                    key={job.id} 
                    onClick={() => setSelectedJob(job)}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300 transition-all group flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 border bg-slate-50 px-2 py-1 rounded-md mb-2 inline-block">{job.id}</span>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h3>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                    
                    <div className="text-sm text-slate-600 mb-4 line-clamp-2">
                      <strong className="text-slate-900 font-bold">Client:</strong> {job.client}
                    </div>

                    <div className="mb-6 flex -space-x-2">
                      {job.assignedTo.length > 0 ? job.assignedTo.map(id => {
                        const u = users.find(user => user.id === id);
                        return u ? (
                           <div key={id} className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-700" title={u.name}>
                             {u.name.charAt(0)}
                           </div>
                        ) : null;
                      }) : (
                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded border">Unassigned</span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-slate-500">
                      <span className="flex items-center"><Icon name="Clock" className="w-4 h-4 mr-1 text-slate-400" /> Tracked: {Math.floor(job.timeLogs.reduce((acc, log) => acc + log.duration, 0) / 60)}h {job.timeLogs.reduce((acc, log) => acc + log.duration, 0) % 60}m</span>
                      <span className="flex items-center bg-indigo-50 text-indigo-700 px-2 py-1 rounded"><Icon name="Paperclip" className="w-4 h-4 mr-1" /> {job.assets.length} Assets</span>
                    </div>
                  </div>
                ))
              )}
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedJob && (
        <JobModal 
          job={selectedJob} 
          currentUser={currentUser}
          hasPermission={hasPermission} 
          users={users}
          jobs={jobs}
          onClose={() => setSelectedJob(null)} 
          onUpdate={updateJob}
        />
      )}
    </div>
  );
}