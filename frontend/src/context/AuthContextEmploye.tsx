import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

const USER_STORAGE_KEY = 'polyrh_user';

// Mock user data (would normally come from login)

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: string | null;
}

const AuthContextEmploye = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  userRole: null
});

export const useAuth = () => useContext(AuthContextEmploye);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for user data on component mount
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserRole(parsedUser.role || null);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContextEmploye.Provider value={{ user, isAuthenticated, userRole }}>
      {children}
    </AuthContextEmploye.Provider>
  );
};