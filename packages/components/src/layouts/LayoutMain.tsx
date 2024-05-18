import { Footer, Header } from "@spin-spot/components";

export function LayoutMain({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex min-h-screen flex-col`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
