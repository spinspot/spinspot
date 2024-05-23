"use client";

import { AuthGuard, LayoutWaves } from "@spin-spot/components";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWaves>
      <AuthGuard>
        {children}
      </AuthGuard>
    </LayoutWaves>
  );
}
