"use client";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "OUR PRODUCTS", path: "/products" },
    // { name: "LOGISTICS", path: "/logistics" },
    // { name: "GALLERY", path: "/gallery" },
    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT US", path: "/contact" },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full bg-primary text-white shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <div className="w-7 h-7 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-primary text-[10px] sm:text-xs font-bold shadow-inner">
        <img src="/images/logo.webp" alt="logo" srcSet="/images/logo.webp" className="w-7 h-7 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-primary text-[10px] sm:text-xs font-bold shadow-inner"/>
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-5 text-[10px] xl:text-[11px] font-bold uppercase tracking-widest ml-auto">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="hover:text-cream transition-colors"
          >
            {link.name}
          </Link>
        ))}
        {/* <button className="bg-cream text-primary px-4 py-2 rounded-sm font-bold hover:bg-secondary hover:text-cream transition-all shadow-md ml-2 flex items-center gap-1.5 cursor-pointer">
          Request a Quote <ChevronRight size={14} />
        </button> */}
      </nav>

      {/* Mobile Hamburger Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 text-white hover:bg-secondary/40 rounded-lg transition-colors ml-auto cursor-pointer"
        aria-label="Toggle Navigation Menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-4 top-full mt-3 rounded-xl border border-cream/20 bg-primary px-6 py-4 text-white shadow-2xl z-40 animate-fade-in-up flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-cream/20 font-bold text-sm hover:text-cream transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {/* <button className="bg-cream text-primary py-3 rounded-md font-bold text-center mt-2 shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-secondary hover:text-cream transition-colors">
            Request a Quote <ChevronRight size={16} />
          </button> */}
        </div>
      )}
      </div>
    </header>
  );
}
