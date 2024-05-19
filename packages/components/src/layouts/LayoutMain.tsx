import { Footer } from "../footers";
import { Header } from "../headers";

export function LayoutMain({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex min-h-screen flex-col`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
