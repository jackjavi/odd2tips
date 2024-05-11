import {
  Inter,
  Roboto_Mono,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import type { Metadata } from "next";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Expert Football Predictions & Betslips & Football News",
    default: "Expert Football Predictions, Betslips & Football News",
  },
  description:
    "Get the latest trending news in the football world. Stay updated with the latest news, fixtures, football free daily predictions, and results. Top Leagues - English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more.",
  keywords: [
    "football predictions, football news, football betting, expert tips, football analysis, football betslips, free expert odds, sure tips, daily odds, today&apos;s tip, odds today, football predictions today, football news today, football betting today, expert tips today, football analysis today, football betslips today, free expert odds today, sure tips today, daily odds today, today&apos;s tip today, odds today today, football predictions today today, football news today today, football betting today today, expert tips today today, football analysis today today, football betslips today today, free expert odds today today, sure tips today today, daily odds today today, today&apos;s tip today today, odds today today today",
  ],
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable} ${montserrat.variable} ${playfair_display.variable}  text-[#e2e8f0] antialiased font-montserrat bg-gradient-to-r from-slate-500 to-slate-900 `}
    >
      <body>{children}</body>
    </html>
  );
}
