import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowLeft, Loader2, CheckCircle2, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const AdminLogin: React.FC = () => {
  const { currentUser, loginWithGoogle, loginWithEmail, resetPassword } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@school.ac.in');
  const [password, setPassword] = useState('Admin@12345');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (currentUser) {
      navigate('/admin/dashboard');
    }
  }, [currentUser, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);
    setLoading(true);

    try {
      await loginWithEmail(email.trim(), password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Email login error:', err);
      setErrorMsg(err.message || 'Invalid credentials or user not found');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Google login error:', err);
      setErrorMsg(err.message || 'Google sign-in was cancelled or failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFill = () => {
    setEmail('admin@school.ac.in');
    setPassword('Admin@12345');
    setErrorMsg(null);
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setErrorMsg('Please enter your administrator email first');
      return;
    }
    setErrorMsg(null);
    try {
      await resetPassword(email.trim());
      setInfoMsg('Password reset instructions sent to your email address.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send reset email');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('backToHome')}</span>
        </Link>

        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#0B2545] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <ShieldCheck className="w-8 h-8 text-blue-300" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B2545] font-serif">
            {language === 'hi' ? 'प्रशासनिक पोर्टल लॉगिन' : 'Admin Portal Sign In'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Arun Bishwanath High School, Aran, Saharsa
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-2xl sm:px-10">
          {/* Quick Credentials Info Box */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-blue-950">
                <KeyRound className="w-4 h-4 text-blue-700" />
                <span>Admin Login Credentials:</span>
              </span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[11px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                Auto-Fill
              </button>
            </div>
            <div className="font-mono text-[11px] space-y-0.5 bg-white/70 p-2 rounded border border-blue-100">
              <p>Email: <strong className="text-slate-900">admin@school.ac.in</strong></p>
              <p>Password: <strong className="text-slate-900">Admin@12345</strong></p>
            </div>
            <p className="text-[10px] text-blue-700 pt-0.5">
              या आप अपने अधिकृत Google खाते (<strong>jayydv107@gmail.com</strong>) से सीधे "Sign in with Google" द्वारा भी लॉगिन कर सकते हैं।
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2.5 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-5 p-3.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl flex items-center gap-2.5 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-500" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Email Address / ईमेल
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@school.ac.in"
                  className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Password / पासवर्ड
                </label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-xs text-blue-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin@12345"
                  className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#0B2545] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>Sign In to Admin Dashboard</span>
              </button>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold">Or with Google</span>
            </div>
          </div>

          {/* Google Sign-in */}
          <div>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 px-4 py-2.5 border border-slate-300 rounded-xl shadow-xs bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-60 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google (jayydv107@gmail.com)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
