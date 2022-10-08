import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
interface IUser {
  id: string;
  name: string;
  email: string;
  date_birth: Date;
  phone: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
interface AuthState {
  token: string;
  user: IUser;
};


interface SignInCredentials {
  email: string;
  date_birth: Date;
}

interface AuthContextState {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@ETROS_KILOMETER:token');
      const user = localStorage.getItem('@ETROS_KILOMETER:user');

      if (token && user) {
        return { token, user: JSON.parse(user) };
      }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, date_birth }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      date_birth,
    });

    const { token, user } = response.data;

    localStorage.setItem('@ETROS_KILOMETER:token', token);
    localStorage.setItem('@ETROS_KILOMETER:user', JSON.stringify(user));

    setData({ token, user });
    return user.id
  }, []);

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('@ETROS_KILOMETER:token');
      localStorage.removeItem('@ETROS_KILOMETER:user');
    }
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
