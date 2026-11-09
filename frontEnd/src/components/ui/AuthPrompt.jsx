import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AuthPrompt({ isOpen, onClose }) {
  const { openAuthModal } = useAuth();
  if (!isOpen) return null;

  const handleOpenAuth = () => {
    onClose();
    openAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl relative border border-slate-100">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X size={18} />
        </button>
        
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-slate-900">Join Byte-Blog</h2>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
          Create an account or sign in to like posts, participate in discussions, and connect with other developers.
        </p>
        
        <div className="mt-5 flex flex-col gap-2.5">
          <button 
            onClick={handleOpenAuth} 
            className="flex h-10 w-full items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition-colors"
          >
            Create an Account
          </button>
          <button 
            onClick={handleOpenAuth} 
            className="flex h-10 w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
