"use client";

import { AuthGuard, LayoutWaves } from "@spin-spot/components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWaves>
      <AuthGuard validate={(user) => user === null} route="/dashboard">
        {children}
      </AuthGuard>
    </LayoutWaves>
  );
}
