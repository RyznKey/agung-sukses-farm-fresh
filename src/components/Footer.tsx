"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import db from "../data/db.json";

const linkClass =
  "text-sm text-white/65 transition-colors hover:text-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-300";

export default function LogisticsFooter() {
  const [currentYear, setCurrentYear] = useState<number | string>("—");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-[#0F3D3A] text-white"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          <div>
            <h2 className="mb-5 text-sm font-semibold text-white">Perusahaan</h2>
            <ul className="space-y-3">
              <li><Link href="/about" className={linkClass}>Tentang kami</Link></li>
              <li><Link href="/about" className={linkClass}>Peternakan kami</Link></li>
              <li><Link href="/contact" className={linkClass}>Hubungi kami</Link></li>
              <li><Link href="/gallery" className={linkClass}>Galeri</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-semibold text-white">Produk</h2>
            <ul className="space-y-3">
              <li><Link href="/products" className={linkClass}>Ayam potong</Link></li>
              <li><Link href="/products" className={linkClass}>Ikan lele</Link></li>
              <li><Link href="/products" className={linkClass}>DOC ayam kampung</Link></li>
              <li><Link href="/products" className={linkClass}>Telur ayam kampung</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-semibold text-white">Layanan</h2>
            <ul className="space-y-3">
              <li><Link href="/order" className={linkClass}>Cara pemesanan</Link></li>
              <li><Link href="/logistics" className={linkClass}>Informasi pengiriman</Link></li>
              <li><Link href="/products" className={linkClass}>Katalog produk</Link></li>
              <li><Link href="/contact" className={linkClass}>Pertanyaan</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-semibold text-white">Informasi</h2>
            <ul className="space-y-3">
              <li><Link href="/products" className={linkClass}>Kualitas produk</Link></li>
              <li><Link href="/about" className={linkClass}>Sertifikasi halal</Link></li>
              <li><Link href="/contact" className={linkClass}>Jam operasional</Link></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h2 className="mb-5 text-sm font-semibold text-white">Kontak</h2>
            <ul className="space-y-4">
              <li>
                <a href="mailto:agungsuksesfarm@gmail.com" className={`${linkClass} flex items-start gap-2`}>
                  <Mail size={16} className="mt-0.5 shrink-0 text-lime-300" aria-hidden="true" />
                  <span className="break-all">agungsuksesfarm@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281804823455" target="_blank" className={`${linkClass} flex items-center gap-2`}>
                  <Phone size={16} className="shrink-0 text-lime-300" aria-hidden="true" />
                  +62 818-0482-3455
                </a>
              </li>
              <li>
                <Link href="/contact" className={`${linkClass} inline-flex items-center gap-1`}>
                  Kontak lainnya <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-9 border-t border-white/15 sm:my-11" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <a
              href="https://maps.app.goo.gl/wYrqm9tBWewAetvDA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-start gap-2 text-sm font-medium leading-6 text-white/85 transition-colors hover:text-lime-200"
            >
              <MapPin size={17} className="mt-1 shrink-0 text-lime-300" aria-hidden="true" />
              <span>{db.company.address}</span>
            </a>
            <p className="mt-3 text-xs text-white/55">
              © {currentYear} Agung Sukses Farm Fresh. Hak cipta dilindungi.
            </p>
          </div>

          <a
            href="https://wa.me/6281804823455"
            target="_blank"
            rel="noreferrer"
            aria-label="Hubungi Agung Sukses Farm Fresh melalui WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center self-start rounded-full bg-lime-200 text-[#0F3D3A] transition hover:scale-105 hover:bg-lime-100"
          >
            <MessageCircle size={19} aria-hidden="true" />
          </a>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-4 select-none overflow-hidden whitespace-nowrap text-center text-[10vw] font-black leading-[0.8] tracking-[-0.09em] text-white/[0.07]"
        >
          AGUNG SUKSES
        </div>
      </div>
    </footer>
  );
}
