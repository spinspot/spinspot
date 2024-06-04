"use client";

import { useEffect } from "react";

export function ServiceWorkerLoader({
  url,
  options,
}: {
  url: string;
  options?: RegistrationOptions;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(url, options);
    }
  }, []);

  return null;
}
