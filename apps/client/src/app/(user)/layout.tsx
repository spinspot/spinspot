import { LayoutMain } from "@spin-spot/components";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutMain>{children}</LayoutMain>;
}
