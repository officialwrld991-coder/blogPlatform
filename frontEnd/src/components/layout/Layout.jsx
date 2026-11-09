import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router'; // Import ScrollRestoration
import { Navbar } from './Navbar';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

export function Layout() {
  const [leftOpen, setLeftOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-slate-50/50 text-slate-900">
      <Navbar onToggleSidebar={() => setLeftOpen(!leftOpen)} />

      <div className="flex min-h-0 flex-1 w-full max-w-[1600px] mx-auto justify-between gap-6 px-3 lg:px-6">
        {leftOpen && (
          <aside className="hidden w-64 xl:w-72 shrink-0 overflow-y-auto py-5 lg:block">
            <LeftSidebar />
          </aside>
        )}

        <main className="w-full max-w-3xl min-w-0 flex-1 overflow-y-auto py-5">
          <Outlet />
        </main>

        <aside className="hidden w-80 shrink-0 overflow-y-auto py-5 xl:block">
          <RightSidebar />
        </aside>
      </div>
      
      {/* Add this here to handle back button scrolling! */}
      <ScrollRestoration />
    </div>
  );
}
