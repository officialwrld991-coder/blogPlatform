import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('byteblog_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading] = useState(false);

  // REAL API CALL to Spring Boot
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('byteblog_user', JSON.stringify(userData));
    localStorage.setItem('byteblog_token', token);
    setIsAuthModalOpen(false); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('byteblog_user');
    localStorage.removeItem('byteblog_token');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const isGuest = !user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isGuest, 
      loading, 
      login, 
      logout, 
      isAuthModalOpen, 
      openAuthModal, 
      closeAuthModal 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
