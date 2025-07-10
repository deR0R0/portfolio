import type { Metadata } from "next";
import { pjs } from "./fonts";
import { LenisProvider } from "@/components/ScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Robert Zhao",
  description: "Robert Zhao's Personal Portfolio Website",
  openGraph: {
    title: "Robert Zhao",
    description: "Robert Zhao's Personal Portfolio Website",
    url: "https://robertzhao.dev",
    siteName: "Robert Zhao",
    images: [
      {
        url: "https://robertzhao.dev/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Robert Zhao's Portfolio Website",
      },
    ],
    locale: "en_US",
    type: "website",
  }
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