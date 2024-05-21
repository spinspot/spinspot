import {
  AuthContextProvider,
  QueryContextProvider,
} from "@spin-spot/components";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Client App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <QueryContextProvider>
          <AuthContextProvider routes={{ signIn: "/login" }}>
            {children}
          </AuthContextProvider>
        </QueryContextProvider>
      </body>
    </html>
  );
}
