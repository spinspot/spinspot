"use client";

import { SessionProvider, getSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    (async function () {
      const session = await getSession();

      if (session?.user.jwt) {
        localStorage.setItem("jwt", session?.user.jwt);
      }
    })();
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
