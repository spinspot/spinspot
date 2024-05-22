"use client";

import { AuthContext, IAuthRoutes, useCurrentUser } from "@spin-spot/services";

export function AuthContextProvider({
  routes,
  children,
}: {
  routes: IAuthRoutes;
  children: React.ReactNode;
}) {
  const currentUser = useCurrentUser();

  return (
    <AuthContext.Provider
      value={{
        user: currentUser.data || null,
        isLoading: currentUser.isLoading,
        routes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
