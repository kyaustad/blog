import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import NavBar from "@/components/custom/nav-bar";
import { Analytics } from "@vercel/analytics/next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog | Kyle Austad",
  description: "Technical writing for the clueless",
  alternates: {
    canonical: "https://blog.kyleaustad.dev",
  },
  openGraph: {
    title: "Blog | Kyle Austad",
    description: "Technical writing for the clueless",
    url: "https://blog.kyleaustad.dev",
    siteName: "Kyle Austad's Blog",
    images: [
      {
        url: "https://res.cloudinary.com/dmphandji/image/upload/v1790443114/blog/images/OpenGraph.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyle Austad's Blog",
    description: "Technical writing for the clueless",
    images: [
      "https://res.cloudinary.com/dmphandji/image/upload/v1790443114/blog/images/OpenGraph.webp",
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-mono",
        jetbrainsMono.variable,
      )}
      suppressHydrationWarning
    >
      <meta
        name="google-site-verification"
        content="gRFRh9Dojbc1r7Wn6Qr9tcIC4n5jCMKrPNiakMrimBE"
      />
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <NavBar>{children}</NavBar>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
