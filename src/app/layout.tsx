import type { Metadata } from "next";
import { inter, pjs } from "./fonts";
import { LenisProvider } from "@/components/ScrollProvider";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Robert Zhao",
  description: "Robert Zhao's Personal Portfolio Website",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${pjs.className} antialiased`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}