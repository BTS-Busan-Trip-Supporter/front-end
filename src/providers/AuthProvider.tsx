'use client';

import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import {
  createContext,
  useLayoutEffect,
  useCallback,
  useState,
  useMemo,
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
  const { createToast } = useToast();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post('/p-travel-log/login', {
        email,
        password,
      });
      const token = response.headers.authorization?.split(' ')[1];

      localStorage.setItem('accessToken', token);

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

      if (response.data) {
        const newToken = response.data.data.accessToken.split(' ')[1];
        localStorage.setItem('accessToken', newToken);
      }
    } catch (error) {
      createToast('error', '인증에 실패하였습니다.');
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

    if (pathname.startsWith('/login') || token == null) return;

    const isValid = checkTokenValidity();
    if (!isValid) {
      refreshAccessToken();
    } else {
      scheduleTokenRefresh(token);
    }
  }, [pathname, checkTokenValidity, refreshAccessToken, scheduleTokenRefresh]);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({ login, logout }), [login, logout])}
    >
      {children}
    </AuthContext.Provider>
  );
}
