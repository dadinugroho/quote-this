import { useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabaseClient } from '@/configs/supabase-client';
import { AuthContext } from '@/hooks/Auth';

type AuthProps = {
  children?: ReactNode
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session)
      setUser(session?.user)
      setLoading(false);
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user)
      setLoading(false)
    });

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signIn: (email: string, password: string) => supabaseClient.auth.signInWithPassword({ email, password }),
    signInOtp: (email: string) => supabaseClient.auth.signInWithOtp({ email }),
    signOut: () => supabaseClient.auth.signOut(),
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
