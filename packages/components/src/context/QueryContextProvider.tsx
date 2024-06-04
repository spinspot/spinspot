"use client";

import { ApiError } from "@spin-spot/models";
import { useToast } from "@spin-spot/services";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

export function QueryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showToast } = useToast();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry(failureCount, error) {
              return !(error instanceof ApiError) && failureCount < 2;
            },
          },
          mutations: {
            onError(err) {
              if (err instanceof ApiError) {
                err.errors.forEach((error) =>
                  showToast({
                    label: error.message,
                    type: "error",
                  }),
                );
              } else {
                showToast({
                  label: "Error de conexión",
                  type: "error",
                });
              }
            },
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
