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

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = toastId++;
    const newToast: Toast = { ...toast, id };
    toastQueue.current.push(newToast);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (toastQueue.current.length > 0) {
        const currentToast = toastQueue.current.shift();
        if (currentToast) {
          setToasts((prevToasts) => [...prevToasts, currentToast]);

          setTimeout(() => {
            setRemovingToasts((prev) => [...prev, currentToast.id]);
            setTimeout(() => {
              setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== currentToast.id),
              );
              setRemovingToasts((prev) =>
                prev.filter((id) => id !== currentToast.id),
              );
            }, 500);
          }, 5000);
        }
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
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
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
