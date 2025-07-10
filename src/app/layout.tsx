import type { Metadata } from "next";
import { pjs } from "./fonts";
import { LenisProvider } from "@/components/ScrollProvider";
import "./globals.css";

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