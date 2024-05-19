import AuthContext from "@/lib/auth-context";
import QueryContext from "@/lib/query-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <AuthContext>
          <QueryContext>{children}</QueryContext>
        </AuthContext>
      </body>
    </html>
  );
}
