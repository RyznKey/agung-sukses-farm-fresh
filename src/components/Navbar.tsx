"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "OUR PRODUCTS", path: "/products" },
    // { name: "LOGISTICS", path: "/logistics" },
    // { name: "GALLERY", path: "/gallery" },
    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT US", path: "/contact" },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const hasSolidBackground = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full text-white transition-colors duration-300 ${
        hasSolidBackground
          ? "border-b border-white/10 bg-[#0F3D3A]/95 shadow-lg shadow-black/10 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Agung Sukses Farm Fresh - Home"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-inner sm:h-11 sm:w-11"
        >
          <img
            src="/images/logo.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full rounded-full object-cover"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-5 text-[10px] font-bold uppercase tracking-widest lg:flex xl:text-[11px]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="whitespace-nowrap transition-colors hover:text-cream"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="ml-auto cursor-pointer rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="absolute inset-x-4 top-full z-40 mt-3 flex flex-col gap-4 rounded-xl border border-white/15 bg-[#0F3D3A] px-6 py-4 text-white shadow-2xl lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-white/15 py-2 text-sm font-bold transition-colors hover:text-cream"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
