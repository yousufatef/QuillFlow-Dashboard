export type ToastVariant = 'default' | 'destructive';

export type ToastPayload = {
  title: string;
  description?: string;
  variant?: ToastVariant;
};

export const TOAST_EVENT = 'QuillFlow-toast';

export function toast(payload: ToastPayload) {
  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: payload }));
}
