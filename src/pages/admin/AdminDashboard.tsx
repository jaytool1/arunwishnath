import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  Users,
  GraduationCap,
  TrendingUp,
  Image,
  Download,
  Settings,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  FileSpreadsheet,
  Search,
  Filter,
  Check,
  AlertTriangle,
  History,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Notice, AdmissionApplication, Staff, Result, AuditLog } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'admissions' | 'notices' | 'staff' | 'results' | 'gallery' | 'settings' | 'audit'
  >('overview');

  // Application Data States
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 'n1',
      title: 'Online Admission Open for Class 9 and 10 (Session 2026-27)',
      category: 'admission',
      publicationDate: '2026-04-10',
      description: 'Online admission portal is active for Classes 9 and 10.',
      isPublished: true,
    },
    {
      id: 'n2',
      title: 'Annual Examination 2026 Schedule & Evaluation Guidelines',
      category: 'examination',
      publicationDate: '2026-04-05',
      description: 'BSEB annual examination evaluation schedule published.',
      isPublished: true,
    },
    {
      id: 'n3',
      title: 'School Closure Notice on Account of Public Holiday',
      category: 'holiday',
      publicationDate: '2026-03-28',
      description: 'School closed on 31st March 2026.',
      isPublished: true,
    },
  ]);

  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: 's1',
      name: 'Dr. R. K. Jha',
      designation: 'Principal / Headmaster',
      department: 'Administration',
      qualification: 'M.A., Ph.D., B.Ed.',
      isPublished: true,
      order: 1,
    },
    {
      id: 's2',
      name: 'Shri B. N. Yadav',
      designation: 'Senior Teacher',
      department: 'Mathematics & Science',
      qualification: 'M.Sc., B.Ed.',
      isPublished: true,
      order: 2,
    },
    {
      id: 's3',
      name: 'Smt. Anjali Sharma',
      designation: 'Assistant Teacher',
      department: 'Hindi & Social Science',
      qualification: 'M.A., B.Ed.',
      isPublished: true,
      order: 3,
    },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'a1',
      actorEmail: currentUser?.email || 'admin@school.ac.in',
      action: 'ADMIN_SIGN_IN',
      entityType: 'AUTH',
      details: 'Administrator accessed admin console successfully',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'a2',
      actorEmail: 'admin@school.ac.in',
      action: 'NOTICE_PUBLISHED',
      entityType: 'NOTICES',
      details: 'Online Admission Open notice published on main website',
      timestamp: '2026-04-10T09:30:00Z',
    },
  ]);

  // Admission filters
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('ALL');
  const [appClassFilter, setAppClassFilter] = useState('ALL');

  // New Notice Form Modal
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'academic' as const,
    description: '',
    publicationDate: new Date().toISOString().split('T')[0],
    isPublished: true,
  });

  // New Staff Modal
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    designation: '',
    department: '',
    qualification: '',
    isPublished: true,
  });

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    schoolName: 'Arun Bishwanath High School, Aran',
    phone: '7631083566',
    email: 'arunvishwanathhighschoolaran@gmail.com',
    address: 'Aran, Saharsa, Bihar - 852124',
    principalMessage:
      'Education is the most powerful weapon which you can use to change the world. Our objective is to impart academic rigor alongside strong ethical values.',
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load admission applications from server
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admissions/list');
      const data = await res.json();
      if (data.success && data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleUpdateAppStatus = async (
    applicationNumber: string,
    newStatus: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'
  ) => {
    try {
      const res = await fetch('/api/admissions/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationNumber, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((a) => (a.applicationNumber === applicationNumber ? { ...a, status: newStatus } : a))
        );
        addAuditLog('ADMISSION_STATUS_CHANGE', 'ADMISSION', applicationNumber, `Status updated to ${newStatus}`);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const addAuditLog = (action: string, entityType: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      actorEmail: currentUser?.email || 'admin@school.ac.in',
      action,
      entityType,
      entityId,
      details,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title.trim()) return;

    const newN: Notice = {
      id: `n_${Date.now()}`,
      title: noticeForm.title,
      category: noticeForm.category,
      description: noticeForm.description,
      publicationDate: noticeForm.publicationDate,
      isPublished: noticeForm.isPublished,
    };

    setNotices([newN, ...notices]);
    addAuditLog('CREATE_NOTICE', 'NOTICES', newN.id, `Created notice: ${newN.title}`);
    setShowNoticeModal(false);
    setNoticeForm({
      title: '',
      category: 'academic',
      description: '',
      publicationDate: new Date().toISOString().split('T')[0],
      isPublished: true,
    });
  };

  const handleDeleteNotice = (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter((n) => n.id !== id));
      addAuditLog('DELETE_NOTICE', 'NOTICES', id, 'Deleted notice record');
    }
  };

  const handleToggleNoticePublish = (id: string) => {
    setNotices(
      notices.map((n) => {
        if (n.id === id) {
          const next = !n.isPublished;
          addAuditLog('TOGGLE_PUBLISH_NOTICE', 'NOTICES', id, `Publication set to ${next}`);
          return { ...n, isPublished: next };
        }
        return n;
      })
    );
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name.trim()) return;

    const newS: Staff = {
      id: `s_${Date.now()}`,
      name: staffForm.name,
      designation: staffForm.designation,
      department: staffForm.department,
      qualification: staffForm.qualification,
      isPublished: staffForm.isPublished,
      order: staffList.length + 1,
    };

    setStaffList([...staffList, newS]);
    addAuditLog('ADD_STAFF', 'STAFF', newS.id, `Added faculty member: ${newS.name}`);
    setShowStaffModal(false);
    setStaffForm({
      name: '',
      designation: '',
      department: '',
      qualification: '',
      isPublished: true,
    });
  };

  const handleDeleteStaff = (id: string) => {
    if (window.confirm('Are you sure you want to remove this staff profile?')) {
      setStaffList(staffList.filter((s) => s.id !== id));
      addAuditLog('REMOVE_STAFF', 'STAFF', id, 'Removed faculty record');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    addAuditLog('UPDATE_SETTINGS', 'SCHOOL_SETTINGS', 'general', 'Updated school contact and homepage content');
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleExportCSV = () => {
    if (applications.length === 0) {
      alert('No applications available to export.');
      return;
    }
    // Export sanitized applications excluding sensitive private info
    const headers = ['ApplicationNumber', 'StudentName', 'Class', 'Gender', 'FatherName', 'Status', 'SubmittedAt'];
    const rows = applications.map((a) => [
      a.applicationNumber,
      `"${a.studentName}"`,
      a.classApplyingFor,
      a.gender,
      `"${a.fatherName}"`,
      a.status,
      a.submittedAt,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ABHS_Admissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    addAuditLog('EXPORT_ADMISSIONS', 'ADMISSION', 'all', 'Exported applications CSV record');
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.mobileNumber.includes(appSearch);
    const matchesStatus = appStatusFilter === 'ALL' || app.status === appStatusFilter;
    const matchesClass = appClassFilter === 'ALL' || app.classApplyingFor === appClassFilter;
    return matchesSearch && matchesStatus && matchesClass;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Navigation Ribbon */}
      <header className="bg-[#0B2545] text-white px-6 py-3 flex items-center justify-between border-b border-blue-900/60 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/40 text-blue-200 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight font-serif text-white">
              Arun Bishwanath High School · Admin Console
            </h1>
            <span className="text-[11px] text-blue-200">
              Logged in: {currentUser?.email || 'admin@school.ac.in'} (Super Admin)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Public Site</span>
          </Link>
          <button
            onClick={async () => {
              await logout();
              navigate('/admin/login');
            }}
            className="px-3 py-1.5 bg-red-600/80 hover:bg-red-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Tabs (3 cols) */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-1 h-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('admissions')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'admissions'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4" />
              <span>Admissions</span>
            </span>
            {applications.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-900">
                {applications.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'notices'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notices Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'staff'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Faculty & Staff</span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'results'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>BSEB Results</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'settings'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>School Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'audit'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Audit Trail</span>
          </button>
        </aside>

        {/* Tab Content Panel (9 cols) */}
        <main className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs min-h-[500px]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">
                  Administrative Dashboard Overview
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time metrics from Cloud Firestore and application storage
                </p>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                    Total Applications
                  </span>
                  <span className="text-2xl font-bold font-mono text-[#0B2545]">
                    {applications.length}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Class 9 & 10</span>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                    Pending Review
                  </span>
                  <span className="text-2xl font-bold font-mono text-amber-900">
                    {applications.filter((a) => a.status === 'PENDING').length}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Awaiting decision</span>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Active Notices
                  </span>
                  <span className="text-2xl font-bold font-mono text-emerald-900">
                    {notices.filter((n) => n.isPublished).length}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Published live</span>
                </div>

                <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
                    Teaching Staff
                  </span>
                  <span className="text-2xl font-bold font-mono text-purple-900">
                    {staffList.length}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Verified educators</span>
                </div>
              </div>

              {/* Quick Action CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveTab('admissions')}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl text-left transition-colors group"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 block">
                    Review Applications →
                  </span>
                  <span className="text-[11px] text-slate-500">Inspect candidate credentials</span>
                </button>
                <button
                  onClick={() => setShowNoticeModal(true)}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl text-left transition-colors group"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 block">
                    + Post School Notice →
                  </span>
                  <span className="text-[11px] text-slate-500">Publish exam or holiday circular</span>
                </button>
                <button
                  onClick={() => setActiveTab('results')}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl text-left transition-colors group"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 block">
                    Manage BSEB Results →
                  </span>
                  <span className="text-[11px] text-slate-500">Enter marks & publish grades</span>
                </button>
              </div>

              {/* Recent Audit Activities */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Recent Administrative Events
                </h3>
                <div className="space-y-2">
                  {auditLogs.slice(0, 4).map((l) => (
                    <div
                      key={l.id}
                      className="p-3 bg-slate-50 rounded-lg text-xs flex items-center justify-between text-slate-600"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#0B2545]">{l.action}</span>
                        <span>·</span>
                        <span>{l.details}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 tabular-nums font-mono">
                        {new Date(l.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-serif">
                    Admission Applications (Classes 9 & 10)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review prospective candidates, update status, and export records
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 bg-[#0B2545] hover:bg-blue-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Search & Filter Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    placeholder="Search candidate / ref..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  />
                </div>
                <select
                  value={appStatusFilter}
                  onChange={(e) => setAppStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                <select
                  value={appClassFilter}
                  onChange={(e) => setAppClassFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                >
                  <option value="ALL">All Classes</option>
                  <option value="9">Class 9 Only</option>
                  <option value="10">Class 10 Only</option>
                </select>
              </div>

              {/* Applications Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2.5">Application No</th>
                      <th className="px-3 py-2.5">Student Name</th>
                      <th className="px-3 py-2.5">Class</th>
                      <th className="px-3 py-2.5">Parent / Mobile</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApps.length > 0 ? (
                      filteredApps.map((a) => (
                        <tr key={a.applicationNumber} className="hover:bg-slate-50/60">
                          <td className="px-3 py-2.5 font-mono font-bold text-[#0B2545]">
                            {a.applicationNumber}
                          </td>
                          <td className="px-3 py-2.5 font-semibold text-slate-900">
                            {a.studentName}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              DOB: {a.dateOfBirth} ({a.gender})
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-bold text-slate-800">
                            Class {a.classApplyingFor}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600">
                            <span>{a.fatherName}</span>
                            <span className="block font-mono text-[10px] text-slate-400">
                              {a.mobileNumber}
                            </span>
                          </td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                a.status === 'APPROVED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : a.status === 'UNDER_REVIEW'
                                  ? 'bg-blue-100 text-blue-800'
                                  : a.status === 'REJECTED'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right">
                            <select
                              value={a.status}
                              onChange={(e) =>
                                handleUpdateAppStatus(a.applicationNumber, e.target.value as any)
                              }
                              className="text-[11px] px-2 py-1 bg-white border border-slate-300 rounded focus:outline-none font-semibold text-slate-700"
                            >
                              <option value="PENDING">Set Pending</option>
                              <option value="UNDER_REVIEW">Under Review</option>
                              <option value="APPROVED">Approve</option>
                              <option value="REJECTED">Reject</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No admission applications found matching the criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: NOTICES */}
          {activeTab === 'notices' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-serif">Notice Board Manager</h2>
                  <p className="text-xs text-slate-500">Publish, unpublish, and manage school circulars</p>
                </div>
                <button
                  onClick={() => setShowNoticeModal(true)}
                  className="px-3.5 py-2 bg-[#0B2545] hover:bg-blue-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Notice</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {notices.map((n) => (
                  <div key={n.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono tabular-nums">
                          {n.publicationDate}
                        </span>
                        {n.isPublished ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Published
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            Draft
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{n.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleNoticePublish(n.id)}
                        className={`p-1.5 rounded transition-colors ${
                          n.isPublished
                            ? 'text-emerald-700 hover:bg-emerald-50'
                            : 'text-slate-400 hover:bg-slate-100'
                        }`}
                        title={n.isPublished ? 'Unpublish notice' : 'Publish notice'}
                      >
                        {n.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(n.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FACULTY & STAFF */}
          {activeTab === 'staff' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-serif">Teaching & Administrative Staff</h2>
                  <p className="text-xs text-slate-500">Manage verified school educator records</p>
                </div>
                <button
                  onClick={() => setShowStaffModal(true)}
                  className="px-3.5 py-2 bg-[#0B2545] hover:bg-blue-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Faculty</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {staffList.map((s) => (
                  <div key={s.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{s.name}</h4>
                      <p className="text-xs font-semibold text-blue-800">{s.designation}</p>
                      <p className="text-[11px] text-slate-500">{s.department}</p>
                      <span className="text-[10px] text-slate-400 font-medium">{s.qualification}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteStaff(s.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">BSEB Matriculation Results Portal</h2>
                <p className="text-xs text-slate-500">
                  Manage student marks statements, apply grading rules, and control publication status
                </p>
              </div>

              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1">
                <span className="font-bold">BSEB Standard Grading Rules:</span>
                <p>• 1st Division: ≥ 60% (300/500) | • 2nd Division: 45% - 59% (225 - 299) | • 3rd Division: 30% - 44% (150 - 224) | • Fail: &lt; 30%</p>
                <p className="text-[11px] text-blue-700 pt-1">
                  Protected API: Results are served strictly through verified server lookup matching Roll Number and DOB to protect student privacy.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-sm text-slate-900 mb-3">Published Student Results</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#0B2545]">Roll: 250101</span>
                      <span className="font-bold text-slate-800 ml-3">Aman Kumar</span>
                      <span className="text-slate-500 ml-2">(Class 10 · 400/500 · 80% · 1st Division)</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                      PUBLISHED
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#0B2545]">Roll: 250102</span>
                      <span className="font-bold text-slate-800 ml-3">Priya Kumari</span>
                      <span className="text-slate-500 ml-2">(Class 10 · 364/500 · 72.8% · 1st Division)</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                      PUBLISHED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">School Settings & Homepage Content</h2>
                <p className="text-xs text-slate-500">
                  Update public contact details, principal message, and affiliation info
                </p>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>School settings saved and updated successfully.</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official School Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.schoolName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, schoolName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Phone Number
                    </label>
                    <input
                      type="tel"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official School Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Postal Address
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Principal's Message (Displayed on Homepage)
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.principalMessage}
                    onChange={(e) => setSettingsForm({ ...settingsForm, principalMessage: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0B2545] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">Administrative Audit Logs</h2>
                <p className="text-xs text-slate-500">
                  Immutable chronological records of school portal modifications
                </p>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {auditLogs.map((l) => (
                  <div key={l.id} className="p-3.5 text-xs flex items-center justify-between hover:bg-slate-50">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono font-bold text-[#0B2545]">{l.action}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded uppercase">
                          {l.entityType}
                        </span>
                      </div>
                      <p className="text-slate-600">{l.details}</p>
                      <span className="text-[10px] text-slate-400">Actor: {l.actorEmail}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 tabular-nums shrink-0">
                      {new Date(l.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 font-serif mb-4">Create New Notice</h3>
            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  placeholder="e.g. Schedule for Board Examination Form Fill-up"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  >
                    <option value="academic">Academic</option>
                    <option value="examination">Examination</option>
                    <option value="admission">Admission</option>
                    <option value="holiday">Holiday</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="date"
                    required
                    value={noticeForm.publicationDate}
                    onChange={(e) => setNoticeForm({ ...noticeForm, publicationDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={noticeForm.description}
                  onChange={(e) => setNoticeForm({ ...noticeForm, description: e.target.value })}
                  placeholder="Enter notice details..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={noticeForm.isPublished}
                  onChange={(e) => setNoticeForm({ ...noticeForm, isPublished: e.target.checked })}
                  className="text-[#0B2545] rounded"
                />
                <label htmlFor="pub" className="text-xs text-slate-700 font-medium">
                  Publish to public website immediately
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2545] hover:bg-blue-900 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Staff Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 font-serif mb-4">Add Faculty Member</h3>
            <form onSubmit={handleCreateStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={staffForm.name}
                  onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  placeholder="e.g. Shri Rajesh Kumar"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={staffForm.designation}
                    onChange={(e) => setStaffForm({ ...staffForm, designation: e.target.value })}
                    placeholder="e.g. Senior Teacher"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={staffForm.department}
                    onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                    placeholder="e.g. Mathematics"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Qualification</label>
                <input
                  type="text"
                  required
                  value={staffForm.qualification}
                  onChange={(e) => setStaffForm({ ...staffForm, qualification: e.target.value })}
                  placeholder="e.g. M.Sc. (Physics), B.Ed."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStaffModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2545] hover:bg-blue-900 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Save Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
