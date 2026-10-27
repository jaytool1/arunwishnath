import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | { email: string | null; uid: string; displayName?: string } | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authorized super-admin emails
const SUPER_ADMIN_EMAILS = [
  'jayydv107@gmail.com',
  'admin@school.ac.in',
  'arunvishwanathhighschoolaran@gmail.com',
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(() => {
    const saved = sessionStorage.getItem('abhs_admin_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem('abhs_admin_session'));
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        if (user.email && SUPER_ADMIN_EMAILS.includes(user.email.toLowerCase())) {
          setIsAdmin(true);
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'adminProfiles', user.uid));
            setIsAdmin(adminDoc.exists());
          } catch {
            setIsAdmin(false);
          }
        }
      } else {
        const savedSession = sessionStorage.getItem('abhs_admin_session');
        if (!savedSession) {
          setCurrentUser(null);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    sessionStorage.removeItem('abhs_admin_session');
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user.email && SUPER_ADMIN_EMAILS.includes(result.user.email.toLowerCase())) {
      setIsAdmin(true);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check built-in administrative credentials
    if (
      (cleanEmail === 'admin@school.ac.in' || cleanEmail === 'jayydv107@gmail.com') &&
      (pass === 'Admin@12345' || pass === 'admin123' || pass === 'Admin123')
    ) {
      const mockAdminUser = {
        uid: 'admin_primary_001',
        email: cleanEmail,
        displayName: 'School Administrator',
      };
      sessionStorage.setItem('abhs_admin_session', JSON.stringify(mockAdminUser));
      setCurrentUser(mockAdminUser);
      setIsAdmin(true);
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      sessionStorage.removeItem('abhs_admin_session');
      setCurrentUser(cred.user);
      if (cred.user.email && SUPER_ADMIN_EMAILS.includes(cred.user.email.toLowerCase())) {
        setIsAdmin(true);
      }
    } catch (err: any) {
      // If Firebase email/password fails or isn't enabled yet, provide clear instruction
      throw new Error(err.message || 'Invalid administrator email or password.');
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('abhs_admin_session');
    setCurrentUser(null);
    setIsAdmin(false);
    try {
      await signOut(auth);
    } catch {
      // Ignore if not signed in via Firebase
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        loading,
        loginWithGoogle,
        loginWithEmail,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
