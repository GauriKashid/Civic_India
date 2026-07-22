import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CustomUser {
  id: string;
  email: string;
  fullName: string;
  role: 'citizen' | 'admin';
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string, role?: 'citizen' | 'admin') => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = 'http://localhost:5000/api/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Retrieve current user details using stored JWT token
  const fetchCurrentUser = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsAdmin(data.role === 'admin');
      } else {
        // Token is invalid/expired
        localStorage.removeItem('civic_auth_token');
        setUser(null);
        setIsAdmin(false);
      }
    } catch (e) {
      console.error("Error fetching user profile:", e);
      localStorage.removeItem('civic_auth_token');
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('civic_auth_token');
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: 'citizen' | 'admin' = 'citizen') => {
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, fullName, role })
      });
      
      const data = await response.json();
      if (!response.ok) {
        return { error: new Error(data.error || 'Registration failed') };
      }
      
      localStorage.setItem('civic_auth_token', data.token);
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin');
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e : new Error('Network error') };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (!response.ok) {
        return { error: new Error(data.error || 'Login failed') };
      }
      
      localStorage.setItem('civic_auth_token', data.token);
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin');
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e : new Error('Network error') };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('civic_auth_token');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
