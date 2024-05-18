import QueryContext from "@/lib/query-context";
import { LayoutWaves } from "@spin-spot/components";
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
          <LayoutWaves>{children}</LayoutWaves>
        </QueryContext>
      </body>
    </html>
  );
}