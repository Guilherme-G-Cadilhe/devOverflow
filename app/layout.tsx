import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Dev Overflow",
  description: "StackOverflow inspired website for developers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* suppressHydrationWarning é pra tirar msg de erro gerada pela extensão web colorzila ( DESATIVAR EM PROD) */}
        <body suppressHydrationWarning={true}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
