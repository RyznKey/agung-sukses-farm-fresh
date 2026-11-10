// "use client";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCart from '@/components/FloatingCart';
import { CartProvider } from '@/context/CartContext';
import logo from './LOGO.png'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Agung Sukses Farm Fresh",
  description: "Raised with Care, Delivered with Quality",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="font-sans bg-gray-50 min-h-full flex flex-col">
        <CartProvider>
          <NavBar />
          {children}
          {/* Footer component diletakkan di sini */}
          <Footer />
          {/* Keranjang Belanja Mengambang di Kanan Bawah */}
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}
