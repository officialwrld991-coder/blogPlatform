import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    // If there's history, go back. Otherwise, go home.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}
