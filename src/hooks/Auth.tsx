import { createContext, useContext } from "react";
import { AuthOtpResponse, AuthTokenResponse, Session, User } from "@supabase/supabase-js";

// create a context for authentication
export const AuthContext = createContext<{
  session: Session | null | undefined,
  user: User | null | undefined,
  signIn: (email: string, password: string) => Promise<AuthTokenResponse>
  signInOtp: (email: string) => Promise<AuthOtpResponse>
  signOut: () => void
}>({
  session: null,
  user: null,
  signIn: async (_email: string, _password: string) => { throw new Error('signIn function not implemented'); },
  signInOtp: async (_email: string) => { throw new Error('signInOtp function not implemented'); },
  signOut: () => { }
});

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
