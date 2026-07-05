import { useState } from '#imports';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

export const useToast = () => {
  const toastState = useState<ToastState>('toastState', () => ({
    message: '',
    type: 'info',
    isVisible: false
  }));

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const showToast = (message: string, type: ToastType = 'info', duration: number = 3000) => {
    toastState.value.message = message;
    toastState.value.type = type;
    toastState.value.isVisible = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      toastState.value.isVisible = false;
    }, duration);
  };

  const hideToast = () => {
    toastState.value.isVisible = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    toastState,
    showToast,
    hideToast
  };
};
