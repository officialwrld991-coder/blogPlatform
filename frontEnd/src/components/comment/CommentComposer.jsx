import { useState } from 'react';
import { Image as ImageIcon, Smile, Send } from 'lucide-react';

export function CommentComposer({ isGuest, onAuthRequired }) {
  const [value, setValue] = useState('');

  const handleFocus = () => {
    if (isGuest) {
      onAuthRequired();
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (isGuest) {
      onAuthRequired();
      return;
    }
    setValue('');
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        <img src="https://i.pravatar.cc/150?u=current_user" alt="You" className="h-8 w-8 shrink-0 rounded-full object-cover" />
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleFocus}
            placeholder={isGuest ? "Sign in to join the discussion..." : "Write a thoughtful comment..."}
            rows={3}
            className="w-full resize-none border-none bg-transparent px-1 py-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
            <div className="flex items-center gap-1">
              <button 
                type="button" 
                onClick={handleFocus}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
              >
                <ImageIcon size={18} />
              </button>
              <button 
                type="button" 
                onClick={handleFocus}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
              >
                <Smile size={18} />
              </button>
            </div>
            <button 
              type="button" 
              onClick={handleSend}
              className="flex h-8 items-center gap-1.5 rounded-full bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <Send size={14} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
