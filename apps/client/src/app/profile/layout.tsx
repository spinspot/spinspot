"use client";

import { LayoutWaves } from "@spin-spot/components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWaves>
        {children}
    </LayoutWaves>
  );
}
