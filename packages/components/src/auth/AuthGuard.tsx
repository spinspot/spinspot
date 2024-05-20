"use client";

import { IUser } from "@spin-spot/models";
import { IAuthRoutes, useAuth } from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  validate?: (_user: IUser | null) => boolean;
  routes?: IAuthRoutes;
  children: React.ReactNode;
}

export function AuthGuard({
  validate = (user) => user !== null,
  routes,
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !validate(auth.user)) {
      router.replace(routes?.signIn || auth.routes.signIn);
    }
  }, [auth.isLoading]);

  if (auth.isLoading) {
    return null;
  }

  return children;
}
