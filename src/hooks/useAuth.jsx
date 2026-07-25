const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\hooks\\useAuth.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { createContext, useContext, useEffect, useState, } from 'react';

















const AuthContext = createContext(undefined);

const API_BASE = 'http://localhost:5000/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Retrieve current user details using stored JWT token
  const fetchCurrentUser = async (token) => {
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

  const signUp = async (email, password, fullName, role = 'citizen') => {
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

  const signIn = async (email, password) => {
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
    _jsxDEV(AuthContext.Provider, { value: { user, loading, isAdmin, signUp, signIn, signOut }, children: 
      children
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 120}, this)
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
