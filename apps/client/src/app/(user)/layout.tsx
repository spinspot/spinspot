import QueryContext from "@/lib/query-context";
import { LayoutMain } from "@spin-spot/components";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Client App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <QueryContext>
          <LayoutMain>{children}</LayoutMain>
        </QueryContext>
      </body>
    </html>
  );
}
