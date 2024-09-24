'use client';

import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { createContext, useLayoutEffect, useCallback, useState } from 'react';

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

  const login = async (email: string, password: string) => {
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
  };

  const logout = async () => {
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
  };

  const getTokenExpiration = (token: string) => {
    const base64Url = token.split('.')[1];
    const tokenPayload = JSON.parse(atob(base64Url));

    return tokenPayload.exp * 1000;
  };

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
  }, [isRefreshing]);

  const scheduleTokenRefresh = useCallback(
    (token: string) => {
      const expirationTime = getTokenExpiration(token);
      const currentTime = Date.now();
      const timeUntilRefresh = expirationTime - currentTime - 60 * 1000;

      if (timeUntilRefresh > 0) {
        setTimeout(() => {
          refreshAccessToken();
        }, timeUntilRefresh);
      }
    },
    [refreshAccessToken],
  );

  const checkTokenValidity = useCallback(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    const expirationTime = getTokenExpiration(token);
    const currentTime = Date.now();

    if (expirationTime - currentTime < 60 * 1000) {
      return false;
    }

    return true;
  }, []);

  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (pathname === '/' && token == null) {
      router.replace('/login');
      return;
    }

    if (pathname.startsWith('/login') || token == null) {
      setLoading(false);
      return;
    }

    const isValid = checkTokenValidity();
    if (!isValid) {
      refreshAccessToken().finally(() => setLoading(false));
    } else {
      scheduleTokenRefresh(token);
      setLoading(false);
    }
  }, [pathname, checkTokenValidity, refreshAccessToken]);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
