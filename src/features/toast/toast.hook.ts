import { v4 as uuidv4 } from 'uuid';

import { useToastStore } from './toast.slice';
import { type ToastType } from './toast.type';

export function useToast() {
  const { addToast } = useToastStore();

  const createToast = (
    type: ToastType,
    message: string,
    duration: number = 2000,
  ) => {
    const id = uuidv4();
    addToast({ id, type, message, duration });
  };

  return { createToast };
}
