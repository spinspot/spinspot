import { AuthGuard, LayoutWaves } from "@spin-spot/components";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWaves>
      <AuthGuard>{children}</AuthGuard>
    </LayoutWaves>
  );
}