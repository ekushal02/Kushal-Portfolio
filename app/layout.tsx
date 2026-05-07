import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = "https://kushalerramilli.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kushal Erramilli — AI Engineer & Data Scientist",
    template: "%s · Kushal Erramilli",
  },
  description:
    "Portfolio of Kushal Erramilli — M.S. Data Science at UMBC. Building production-grade ML systems, RAG pipelines, and the data infrastructure that makes them measurably good.",
  keywords: [
    "Kushal Erramilli",
    "AI Engineer",
    "Data Scientist",
    "Machine Learning",
    "RAG",
    "LLM",
    "UMBC",
    "Carrier Corporation",
    "Portfolio",
  ],
  authors: [{ name: "Kushal Erramilli" }],
  creator: "Kushal Erramilli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Kushal Erramilli",
    title: "Kushal Erramilli — AI Engineer & Data Scientist",
    description:
      "Building production-grade ML systems, RAG pipelines, and the data infrastructure that makes them measurably good.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Erramilli — AI Engineer & Data Scientist",
    description: "Production-grade ML systems & RAG pipelines.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-accent selection:text-black">
        {children}
      </body>
    </html>
  );
}
