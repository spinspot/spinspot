"use client";

import { IUser } from "@spin-spot/models";
import { useAuth } from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  validate?: (_user: IUser | null) => boolean;
  route?: string;
  children: React.ReactNode;
}

export function AuthGuard({
  validate = (user) => user !== null,
  route,
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !validate(auth.user)) {
      router.replace(route || auth.routes.signIn);
    }
  }, [auth.isLoading, auth.user]);

  if (auth.isLoading) {
    return null;
  }

  return children;
}
