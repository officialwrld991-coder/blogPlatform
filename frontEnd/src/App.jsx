import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Home } from './routes/Home';
import { PostDetail } from './routes/PostDetail';
import { Profile } from './routes/Profile'; // <-- IMPORT THIS
import { AuthModal } from './components/ui/AuthModal'; // Import the modal

const Placeholder = ({ name }) => (
  <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
    <h1 className="text-2xl font-bold">{name} Page coming soon</h1>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'post/:id', element: <PostDetail /> },
      { path: 'u/:username', element: <Profile /> }, // <-- ADD THIS ROUTE
      { path: 'login', element: <Placeholder name="Login" /> },
      { path: 'register', element: <Placeholder name="Register" /> },
      { path: 'privacy', element: <Placeholder name="Privacy" /> },
      { path: 'terms', element: <Placeholder name="Terms" /> },
      { path: 'about', element: <Placeholder name="About" /> },
      { path: 'contact', element: <Placeholder name="Contact" /> },
      { path: 'tags', element: <Placeholder name="Tags" /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <AuthModal />
    </>
  );
}
