import {
  AuthContextProvider,
  QueryContextProvider,
  ServiceWorkerLoader,
  ToastContextProvider,
} from "@spin-spot/components";
import { cn } from "@spin-spot/utils";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const bodyFont = Roboto({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SpinSpot App",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={cn("font-body", bodyFont.variable)}>
        <ToastContextProvider>
          <QueryContextProvider>
            <AuthContextProvider routes={{ signIn: "/login" }}>
              {children}
            </AuthContextProvider>
          </QueryContextProvider>
        </ToastContextProvider>
        <ServiceWorkerLoader url="/service-worker.js" />
      </body>
    </html>
  );
}
