"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import db from "../data/db.json";
export default function LogisticsFooter() {
  const [currentYear, setCurrentYear] = useState<number | string>("—");
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <div className="relative bg-[#E60000] pt-28 sm:pt-40 pb-8 sm:pb-10 px-4 sm:px-10 mt-16 sm:mt-20">
      {/* OUR BRANDS (Floating Overlay Container) */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[92%] sm:w-[90%] max-w-5xl rounded-[30px] sm:rounded-[50px] py-6 sm:py-8 px-6 sm:px-16 shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 z-20">
          <h3 className="text-[#E60000] text-3xl sm:text-5xl lg:text-[4.5rem] font-script leading-none md:w-1/3 text-center md:text-left">
            Our<br className="hidden md:inline"/><span className="text-2xl sm:text-4xl lg:text-[4rem]"> Brands</span>
          </h3>
          <div className="flex gap-4 sm:gap-8 items-center justify-center md:w-2/3 flex-wrap">
            <img src="/images/brand-brf.png" alt="BRF" className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition-all" />
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full border-2 border-yellow-500 flex items-center justify-center text-sm sm:text-base">🏆</div>
            <img src="/images/brand-halal.png" alt="Halal" className="h-10 sm:h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="/images/brand-doux.png" alt="Doux" className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition-all" />
          </div>
        </div> */}

      {/* FOOTER CONTENT */}
      <div
        id="contact"
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-white pt-6 sm:pt-10 border-b border-white/20 pb-8 sm:pb-10"
      >
        {/* Kolom 1: Logo & Catfish text */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="bg-white rounded-lg p-3 inline-flex items-center gap-2 mb-4 sm:mb-6 shadow-md text-brand-dark">
            <span className="font-bold text-lg sm:text-xl leading-none">
              🐔
            </span>
            <span className="font-black text-xs sm:text-sm uppercase tracking-widest border-l-2 border-black pl-2">
              catfish
              <br />
              <span className="text-[8px]">SUPPLY PARTNER</span>
            </span>
          </div>
          <p className="text-xs sm:text-[10px] opacity-90 leading-relaxed mb-4 text-justify">
            Kami berdedikasi untuk menyediakan potongan daging ayam terbaik
            serta ikan lele yang diperoleh dalam kondisi segar. Kualitas adalah
            prioritas kami, demi menjamin kebersihan dan cita rasa premium bagi
            seluruh mitra grosir kami.
          </p>
          <p className="text-[9px] opacity-60">
            {/* © {new Date().getFullYear()} COMPANY NAME INC. All Rights
              Reserved. */}
            ©2026 AGUNG SUKSES FARM FRESH. All Rights Reserved.
          </p>
        </div>

        {/* Kolom 2: Sitemap */}
        <div>
          <h4 className="font-bold text-xs uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <span className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center text-[8px]">
              📌
            </span>{" "}
            SITEMAP
          </h4>
          <ul className="text-xs sm:text-[11px] space-y-2.5 sm:space-y-4 opacity-90 font-medium">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="about" className="hover:underline">
                Brands
              </Link>
            </li>
            <li>
              <Link href="logistics" className="hover:underline">
                Logistics
              </Link>
            </li>
            <li>
              <Link href="contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Certifications */}
        <div>
          <h4 className="font-bold text-xs uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <span className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center text-[8px]">
              🏅
            </span>{" "}
            CERTIFICATIONS
          </h4>
          <div className="grid grid-cols-4 sm:grid-cols-3 gap-2 sm:gap-3 w-full sm:w-4/5">
            <div className="bg-white rounded-full p-2 aspect-square flex items-center justify-center shadow-md">
              <img src="/images/cert-iso.png" alt="ISO" className="w-full" />
            </div>
            <div className="bg-white rounded-full p-2 aspect-square flex items-center justify-center shadow-md">
              <img
                src="/images/cert-halal.png"
                alt="Halal"
                className="w-full"
              />
            </div>
            <div className="bg-white rounded-full p-2 aspect-square flex items-center justify-center shadow-md">
              <img src="/images/cert-gmp.png" alt="GMP" className="w-full" />
            </div>
            <div className="bg-white rounded-full p-2 aspect-square flex items-center justify-center shadow-md">
              <img
                src="/images/cert-haccp.png"
                alt="HACCP"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Kolom 4: Get In Touch */}
        <div>
          <h4 className="font-bold text-xs uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <span className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center text-[8px]">
              📞
            </span>{" "}
            GET IN TOUCH WITH US!
          </h4>

          <div className="mb-3 sm:mb-4">
            <span className="text-[9px] uppercase opacity-70 block mb-0.5">
              Telephone:
            </span>
            <p className="text-xs font-bold">+62 818-0482-3455 </p>
          </div>

          <div className="mb-3 sm:mb-4">
            <span className="text-[9px] uppercase opacity-70 block mb-0.5">
              Address:
            </span>
            <p className="text-xs sm:text-[11px] leading-tight">
              <br />
              Dusun IV, Pliken, Kec. Kembaran, Kabupaten Banyumas, Jawa Tengah
              53182
            </p>
          </div>

          <div>
            <span className="text-[9px] uppercase opacity-70 block mb-0.5">
              Email:
            </span>
            <p className="text-xs sm:text-[11px] underline">
              agungsuksesfarm@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
