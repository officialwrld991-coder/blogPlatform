import { X } from 'lucide-react';

export function ImageLightbox({ url, onClose }) {
  if (!url) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <X size={24} />
      </button>
      
      <img
        src={url}
        alt="Preview"
        className="max-h-[90vh] max-w-full rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing the modal
      />
    </div>
  );
}
