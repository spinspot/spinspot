import { AuthGuard, LayoutMain } from "@spin-spot/components";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutMain>
      <AuthGuard>{children}</AuthGuard>
    </LayoutMain>
  );
}
