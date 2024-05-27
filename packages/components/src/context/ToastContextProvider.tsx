"use client";

import { Toast, ToastContext } from "@spin-spot/services";
import { useEffect, useRef, useState } from "react";
import { Alert } from "../alerts"; // Ajusta la ruta según la ubicación de tu archivo

let toastId = 0;

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastQueue = useRef<Toast[]>([]);
  const [removingToasts, setRemovingToasts] = useState<number[]>([]);

  const showToast = (
    toast: Omit<Toast, "id" | "duration" | "persistent"> & {
      duration?: number;
      persistent?: boolean;
      onAccept?: () => void;
      onDeny?: () => void;
    },
  ) => {
    const id = toastId++;
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
      persistent: !!toast.denyButtonLabel || !!toast.acceptButtonLabel,
      onAccept: toast.onAccept,
      onDeny: toast.onDeny,
    };
    toastQueue.current.push(newToast);
  };

  const handleRemoveToast = (id: number) => {
    setRemovingToasts((prev) => [...prev, id]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      setRemovingToasts((prev) => prev.filter((toastId) => toastId !== id));
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (toastQueue.current.length > 0) {
        const currentToast = toastQueue.current.shift();
        if (currentToast) {
          setToasts((prevToasts) => [...prevToasts, currentToast]);

          if (!currentToast.persistent) {
            setTimeout(() => {
              handleRemoveToast(currentToast.id);
            }, currentToast.duration);
          }
        }
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.some((toast) => toast.persistent) && (
        <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50" />
      )}
      <div className="fixed left-0 top-0 z-50 flex w-full flex-col items-center space-y-4 p-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-full max-w-screen-xl transition-opacity duration-1000 ease-in-out ${
              removingToasts.includes(toast.id)
                ? "animate-fadeOutLeft"
                : "animate-fadeInLeft"
            }`}
          >
            <Alert
              label={toast.label}
              type={toast.type}
              denyButtonLabel={toast.denyButtonLabel}
              acceptButtonLabel={toast.acceptButtonLabel}
              onDeny={() => {
                toast.onDeny?.();
                handleRemoveToast(toast.id);
              }}
              onAccept={() => {
                toast.onAccept?.();
                handleRemoveToast(toast.id);
              }}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
