import {
  Inter,
  Roboto_Mono,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Odd2tips",
  description:
    "Your premier destination for sports predictions and live chat. Engage, predict, and win!",
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
