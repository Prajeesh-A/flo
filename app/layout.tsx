import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { ToastProvider } from "@/components/ui/notification-toast";
import "./globals.css";
import "./../styles/globals.css";
import localFont from "next/font/local";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const surgena = localFont({
  src: "../public/fonts/surgena.ttf",
  variable: "--font-surgena",
  display: "swap",
})

// const outfit = Outfit({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800", "900"],
//   variable: "--font-surgena",
// });

export const metadata: Metadata = {
  title: " floneo - Build. Automate. Scale.",
  description:
    "Low-Code/No-Code platform that turns manual processes into instant, powerful applications",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: " floneo",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1F3A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} ${poppins.variable} antialiased`}
      >
        <ToastProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  );
}
