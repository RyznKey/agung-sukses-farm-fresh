// "use client";
import type { Metadata } from "next";
import { Inter, Merriweather, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/Navbar';
import LogisticsFooter from '@/components/LogisticsFooter';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const serif = Merriweather({ weight: ['400', '700', '900'], subsets: ["latin"], variable: '--font-serif' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agung Sukses Farm Fresh",
  description: "Raised with Care, Delivered with Quality",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${inter.variable} ${serif.variable} font-sans bg-gray-50 min-h-full flex flex-col`}>
        <NavBar />
        {children}
        {/* Footer component diletakkan di sini */}
        <LogisticsFooter />
      </body>
    </html>
  );
}
