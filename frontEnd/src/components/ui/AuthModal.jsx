import { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { FaGoogle, FaApple } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const endpoint = mode === 'signup' 
      ? 'http://localhost:8080/api/auth/register' 
      : 'http://localhost:8080/api/auth/login';

    const payload = mode === 'signup' 
      ? { username, email, password } 
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        const errorMessage = (data && (data.message || data.error)) || (typeof data === 'string' ? data : 'Authentication failed');
        throw new Error(errorMessage);
      }

      // Successful auth -> update context state
      login(data, data.token);
      setEmail('');
      setPassword('');
      setUsername('');
      setError('');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={closeAuthModal}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          {/* Header Title */}
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 mb-3">
              <span className="font-bold text-base">B</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'signup' ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {mode === 'signup' 
                ? 'Join Byte-Blog to write articles and join discussions' 
                : 'Sign in to access your reading list and drafts'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`rounded-lg py-2 transition-all ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`rounded-lg py-2 transition-all ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Log In
            </button>
          </div>
          
          {/* Error Banner */}
          {error && (
            <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-center text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3">
            {/* Social Auth Placeholders */}
            <button 
              type="button"
              onClick={() => alert('Google Auth coming soon!')} 
              className="flex h-10 w-full items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <FaGoogle size={14} className="text-red-500" /> 
              Continue with Google
            </button>
            <button 
              type="button"
              onClick={() => alert('Apple Auth coming soon!')} 
              className="flex h-10 w-full items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <FaApple size={15} /> 
              Continue with Apple
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 px-3 text-[11px] font-medium text-slate-400">OR</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {mode === 'signup' && (
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username*"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address*"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password*"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-1 flex h-10 w-full items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700 disabled:bg-indigo-400 shadow-sm transition-colors"
              >
                {isLoading 
                  ? (mode === 'signup' ? 'Creating account...' : 'Signing in...') 
                  : (mode === 'signup' ? 'Create Account' : 'Sign In')}
              </button>
            </form>
          </div>

          {/* Toggle Footer */}
          <div className="mt-5 text-center text-xs text-slate-500">
            {mode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => switchMode('login')} 
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Log In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => switchMode('signup')} 
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
