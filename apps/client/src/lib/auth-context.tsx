"use client";

import { IUser } from "@spin-spot/models";
import { useCurrentUser } from "@spin-spot/services";
import { createContext, useContext } from "react";

interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: false,
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useCurrentUser();

  return (
    <AuthContext.Provider
      value={{
        user: currentUser.data || null,
        isLoading: currentUser.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
