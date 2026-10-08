"use client"
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { ImageFallback } from '@/lib/ImageFallback';

export default function Header() {
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'OUR PRODUCTS', path: '/products' },
    { name: 'LOGISTICS', path: '/logistics' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'CONTACT US', path: '/contact' },
  ];
  return (
    <header className="bg-brand-red text-white py-4 px-10 flex justify-between items-center relative z-50">
      {/* Kiri: Nomor Telepon[cite: 5] */}
      <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
        <Phone size={16} />
        <span className="font-semibold text-sm tracking-wide">+65 11 4849-3550</span>
      </div>

      {/* Tengah: Logo Melengkung[cite: 5] */}
      <div className="absolute left-1/4 top-0 -translate-x-1/2 bg-white rounded-b-[40px] shadow-lg w-28 h-24 flex items-end justify-center pb-4 z-50 transition-transform hover:-translate-y-1">
        <div className="w-17 h-17 bg-gray-200 rounded-full flex items-center justify-center text-brand-dark text-xs font-bold">
          <ImageFallback src="/images/logo.webp" alt="logo agung sukses farm fresh" srcSet="/images/logo.webp, /images/logo.png" onError={(e) => { e.currentTarget.src = '/images/logo.png'; }} />
        </div>

      </div>

      {/* Kanan: Menu Navigasi[cite: 5] */}
      <nav className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest">

        {navLinks.map((link) => (
          <li key={link.name} className="relative group list-none">
            <Link href={link.path} className="hover:text-black transition-colors">
              {link.name}
            </Link>
            {/* Animasi Garis Bawah (UX) */}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-farm-yellow transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}

        <button className="bg-white text-brand-red px-5 py-2.5 rounded-full font-bold hover:bg-black hover:text-white transition-all shadow-md ml-2">
          Request A Quote
        </button>
      </nav>
    </header>
  );
}