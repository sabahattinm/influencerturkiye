import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Supabase yapılandırılmamışsa hata ver
    if (!supabase) {
      console.error('Supabase is not configured. Please set environment variables.');
      setLoading(false);
      return;
    }

    // Mevcut session'ı kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error('Session kontrolü hatası:', error);
      setLoading(false);
    });

    // Auth state değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signUp = useCallback(async (email, password) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase is not configured') };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify`,
        },
      });

      if (error) throw error;
      
      // Eğer session varsa (email doğrulama kapalıysa) state'i güncelle
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setLoading(false);
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase is not configured') };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Auth state'i hemen güncelle - onAuthStateChange listener'dan önce
      // Bu race condition'ı önler
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setLoading(false);
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) {
      console.error('Supabase is not configured');
      return;
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Navigate yerine window.location kullan - daha güvenilir
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      // Hata olsa bile yönlendir
      window.location.href = '/';
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase is not configured') };
    }
    
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isAuthenticated: !!user,
  }), [user, session, loading, signUp, signIn, signOut, resetPassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
