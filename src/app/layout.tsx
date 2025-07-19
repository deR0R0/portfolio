import type { Metadata } from "next";
import { pjs } from "./fonts";
import { LenisProvider } from "@/components/ScrollProvider";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Navbar from "@/components/navbar";
import PageAnimation from "@/components/PageAnimation";

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
        width: 1000,
        height: 676,
        alt: "Robert Zhao's Portfolio Website",
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {

  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${pjs.className} antialiased`}>
          <LenisProvider>
            <PageAnimation page="Home" />
            <Navbar className="navigation hidden" />
            {children}
          </LenisProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}