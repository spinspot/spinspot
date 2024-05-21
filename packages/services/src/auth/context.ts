import { IUser } from "@spin-spot/models";
import { createContext, useContext } from "react";

export interface IAuthRoutes {
  signIn: string;
}

export interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  routes: IAuthRoutes;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: false,
  routes: {
    signIn: "/",
  },
});

export function useAuth() {
  return useContext(AuthContext);
}
