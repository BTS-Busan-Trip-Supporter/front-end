import { v4 as uuidv4 } from 'uuid';

import { useToastStore } from './toast.slice';
import { type ToastType } from './toast.type';

export function useToast() {
  const { addToast } = useToastStore();

  const createToast = (type: ToastType, message: string) => {
    const id = uuidv4();
    addToast({ id, type, message });
  };

  return { createToast };
}
