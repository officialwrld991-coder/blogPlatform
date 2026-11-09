import { Link2 } from 'lucide-react';
import { FaWhatsapp, FaXTwitter, FaFacebook } from 'react-icons/fa6'; // Using react-icons for brands!

export function ShareMenu({ isOpen, onClose, url }) {
  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
    onClose();
  };

  return (
    <div className="absolute bottom-full right-0 mb-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-50">
      <button onClick={copyToClipboard} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
        <Link2 size={16} /> Copy link
      </button>
      <button onClick={onClose} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
        <FaXTwitter size={16} /> Share on X
      </button>
      <button onClick={onClose} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
        <FaFacebook size={16} className="text-blue-600" /> Share on Facebook
      </button>
      <button onClick={onClose} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
        <FaWhatsapp size={16} className="text-green-500" /> Share on WhatsApp
      </button>
    </div>
  );
}
