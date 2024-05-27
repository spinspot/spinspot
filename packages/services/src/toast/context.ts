import { createContext, useContext } from "react";

export interface Toast {
  id: number;
  label: string;
  type?: "alert" | "info" | "success" | "warning" | "error";
  denyButtonLabel?: string;
  acceptButtonLabel?: string;
  duration?: number;
  persistent?: boolean;
  onAccept?: () => void;
  onDeny?: () => void;
}

export interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
