import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/shared/Header";

import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "miniboard",
  description: "Create captions and add-to-calendar link with one click",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-b from-sky-200 via-slate-50 via-10% to-slate-50`}
        >
          <Header />
          <main>{children}</main>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
