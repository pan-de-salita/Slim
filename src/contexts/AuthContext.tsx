import { createContext, useContext, useState } from 'react';
import { AuthContextValue } from '../types/AuthContextValue';
import { Navigate } from 'react-router-dom';
import { requestHeaders } from '../utils/requestHeadersFunctions';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLoginFields] = useState(true);

  const toggleIsLogin = () => {
    setIsLoginFields(!isLogin);
  };

  return (
    <AuthContext.Provider value={{ isLogin, toggleIsLogin }}>
      {requestHeaders() ? <Navigate to='/client' replace={true} /> : children}
    </AuthContext.Provider>
  );
}
