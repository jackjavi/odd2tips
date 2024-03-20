import { Inter, Roboto_Mono } from "next/font/google";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
