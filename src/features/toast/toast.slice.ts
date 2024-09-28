import { create } from 'zustand';

import type { ToastState, Toast } from './toast.type';

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast: Toast) =>
    set((state) => ({
      toasts: [...state.toasts, toast],
    })),
  removeToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
