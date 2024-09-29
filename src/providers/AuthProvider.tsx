'use client';

import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import {
  createContext,
  useLayoutEffect,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';

import { useToast } from '@/features/toast';

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { createToast } = useToast();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post('/p-travel-log/login', {
        email,
        password,
      });
      const token = response.headers.authorization?.split(' ')[1];

      localStorage.setItem('accessToken', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      router.replace('/');
    } catch (error) {
      createToast('error', '로그인에 실패하였습니다.');
    }
  }, []);

  const logout = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.get('/p-travel-log/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('accessToken');

      router.replace('/login');
    } catch (error) {
      createToast('error', '로그아웃에 실패하였습니다.');
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get('/p-travel-log/reissue', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response && response.data) {
        const newToken = response.data.data.accessToken.split(' ')[1];
        localStorage.setItem('accessToken', newToken);
      }
    } catch (error) {
      router.replace('/login');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (pathname === '/' && token == null) {
      router.replace('/login');
      return;
    }

    if (pathname.startsWith('/login') || pathname === '/sign-up') {
      setLoading(false);
      return;
    }

    refreshAccessToken().finally(() => setLoading(false));
  }, [pathname]);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 500) {
          router.replace('/login');
        }
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const authContextValue = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout],
  );

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
