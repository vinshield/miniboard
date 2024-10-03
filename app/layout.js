import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "miniboard",
  description: "Generate captions and add-to-calendar link with one click",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-sky-200 via-slate-50 via-10% to-slate-50`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
