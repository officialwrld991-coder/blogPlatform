import { useState } from 'react';
import { ImageLightbox } from './ImageLightBox';

export function MediaGrid({ media }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  if (!media || media.length === 0) return null;

  const count = media.length;
  const gridClass = 
    count === 1 ? "grid-cols-1" :
    count === 2 ? "grid-cols-2" :
    "grid-cols-2 grid-rows-2";

  return (
    <>
      <div className={`mt-3 grid gap-1 overflow-hidden rounded-xl border border-slate-200 ${gridClass}`}>
        {media.slice(0, 4).map((item, index) => {
          const isOverlay = index === 3 && count > 4;

          return (
            <div 
              key={item.id} 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevents navigating to the post page
                setPreviewUrl(item.url); // Opens the lightbox
              }}
              className={`relative cursor-pointer bg-slate-100 ${
                count === 3 && index === 0 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={item.url}
                alt=""
                className="h-full w-full object-cover hover:opacity-95 transition-opacity"
              />
              {isOverlay && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xl font-bold text-white">
                  +{count - 3}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ImageLightbox url={previewUrl} onClose={() => setPreviewUrl(null)} />
    </>
  );
}
