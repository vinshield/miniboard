import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/shared/Header";
import Head from "next/head";

import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "miniboard",
  description: "Create captions and add-to-calendar links with one click",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/dheereshagrwal/colored-icons@1.7.8/src/app/ci.min.css"
          />
        </head>
        <body className={`${inter.className} `}>
          <Header />
          <main className="relative min-h-screen pt-16">{children}</main>

          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
