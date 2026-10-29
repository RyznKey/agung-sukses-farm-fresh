"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import db from "../data/db.json";
import Link from "next/link";

export default function Home() {
  // State untuk Side Pagination Hero (Aktif)
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // Data Slide Hero
  const heroSlides = db.heroSlides;
  const currentHeroSlide = heroSlides[activeHeroSlide] ?? heroSlides[0];

  // Tampilkan produk dengan ID 1, 2, 3, 7, 8, dan 9 dari db.json.
  const wholesaleItems = db.products
    .filter((product) => [1, 2, 3, 6, 7].includes(product.id))
    .map((product) => ({
      ...product,
      name: product.nameId,
      sub: `${product.nameEn} • Rp${product.price.toLocaleString("id-ID")}/${product.unit}`,
    }));
  useEffect(() => {
    if (heroSlides.length < 2) return;

    const timer = setInterval(() => {
      setActiveHeroSlide((prevIdx) => (prevIdx + 1) % heroSlides.length);
    }, 5000);

    // Membersihkan timer agar tidak duplikat saat slide diklik manual
    return () => clearInterval(timer);
  }, [activeHeroSlide, heroSlides.length]);
  return (
    <main className="w-full relative bg-brand-dark min-h-screen overflow-x-hidden font-sans">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative bg-[#111111] bg-cover bg-center pt-12 sm:pt-20 pb-16 sm:pb-32 px-4 sm:px-10 lg:px-16 flex justify-center min-h-[70vh] lg:min-h-[85vh] border-t-[8px] sm:border-t-[12px] border-brand-dark"
        style={{
          backgroundImage: currentHeroSlide
            ? `linear-gradient(rgba(17, 17, 17, 0.55), rgba(17, 17, 17, 0.55)), url('${currentHeroSlide.image}')`
            : undefined,
        }}
      >
        <div className="absolute inset-0 opacity-40 bg-[url('/images/dark-texture.png')] bg-cover mix-blend-overlay"></div>

        {/* AKTIF: Pagination Dots Kanan Hero (Interactive) */}
        <div className="hidden xl:flex absolute right-6 top-1/3 flex-col gap-4 z-20 bg-black/40 p-2 rounded-full border border-cream/20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHeroSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                activeHeroSlide === idx
                  ? "w-3 h-3 bg-primary scale-125 shadow-[0_0_10px_var(--color-primary)]"
                  : "w-2.5 h-2.5 bg-cream/40 hover:bg-cream"
              }`}
              title={`Go to slide ${idx + 1}`}
              aria-label={`Go to hero slide ${idx + 1}`}
              aria-current={activeHeroSlide === idx ? "true" : undefined}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mt-4 sm:mt-10">
          {/* Tipografi Hero */}
          <div className="text-center animate-fade-in-up flex flex-col items-center">
            <h1 className="text-white text-3xl sm:text-6xl md:text-7xl lg:text-[6rem] font-script leading-none drop-shadow-2xl z-20 mb-2 sm:mb-4">
              {currentHeroSlide.title1}
            </h1>
            <div className="inline-block bg-primary text-cream px-4 sm:px-10 py-1 sm:py-2 rounded-[20px] sm:rounded-[40px] transform -rotate-2 shadow-2xl z-10 my-1 sm:my-0">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-script leading-none">
                {currentHeroSlide.title2}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WELCOME SECTION ================= */}
      <section
        id="about"
        className="bg-secondary text-white pt-6 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-10 lg:px-16 flex justify-center relative z-20 border-t border-cream/10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-5xl w-full gap-8 lg:gap-0">
          {/* Teks Welcome */}
          <div className="w-full lg:w-3/5 lg:pr-12 text-center lg:text-left">
            <h3 className="text-cream text-4xl sm:text-6xl lg:text-[5rem] font-script mb-4 sm:mb-6 drop-shadow-lg leading-none">
              Welcome...
            </h3>
            <p className="text-cream text-xs sm:text-sm font-bold leading-relaxed mb-3 sm:mb-4">
              Selamat datang di Agung Sukses Farm Fresh - Pemasok grosir premium
              untuk produk unggas dan makanan laut, baik segar maupun beku.
              <br className="hidden sm:inline" />
              Mitra tepercaya Anda untuk pasokan ayam premium
            </p>
            <p className="text-gray-400 text-xs sm:text-[11px] leading-relaxed opacity-80">
              Kami bangga dapat menghadirkan produk dengan kualitas terbaik bagi
              para pelanggan kami. Rantai pasok kami yang tangguh memastikan
              bahwa, baik Anda memesan daging ayam yang empuk, Anda akan
              menerima produk terbaik langsung dari peternakan tepercaya ke
              tempat usaha Anda dengan harga yang sangat kompetitif.
            </p>
          </div>

          {/* Maskot Ayam Bawa Papan Ikan */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end relative">
            <img
              src="/images/maskot_1.webp"
              alt="Chicken Mascot holding Fish Sign"
              className="w-48 sm:w-64 lg:w-80 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* ================= ONLINE WHOLESALE SECTION ================= */}
      <section
        id="products"
        className="bg-white relative z-10 pt-12 sm:pt-20 pb-20 sm:pb-32 px-4 sm:px-8 lg:px-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10">
          {/* Kiri: Teks & Peta */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-4 sm:mb-6 mt-4 sm:mt-10">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-2 sm:border-4 border-white relative z-10 shrink-0">
                <img
                  src="/images/logo.webp"
                  alt="Chicken Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-[4.5rem] font-script text-brand-dark leading-[0.9] -ml-2 sm:-ml-6 z-0">
                Online <br />
                <span className="text-primary">Wholesale</span>
              </h2>
            </div>

            {/* <div className="bg-secondary text-cream px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold w-fit mb-4 sm:mb-8 shadow-lg">
              Poultry & Fish Su
            </div> */}

            <p className="text-gray-600 text-xs sm:text-[11px] mb-3 sm:mb-4 leading-relaxed font-semibold">
              The finest selection of farm-fresh poultry and premium catfish,
              sourced locally for guaranteed freshness.
            </p>
            <p className="text-gray-500 text-xs sm:text-[10px] mb-6 sm:mb-8 leading-relaxed">
              We guarantee the best value for your wholesale needs. Fast
              delivery, strict quality control, and excellent customer service
              are our top priorities. Order now and get the freshest items
              straight to your doorstep.
            </p>

            <Link
              href="/products"
              className="bg-primary hover:bg-primary-hover text-cream w-fit px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-[11px] font-bold shadow-lg transition-colors flex items-center gap-2 mb-8 cursor-pointer"
            >
              View All Products <ChevronRight size={14} />
            </Link>

            {/* Peta Siluet Hitam */}
            <img
              src="/images/black-map-silhouette.png"
              alt="Map"
              className="w-full max-w-50 sm:max-w-62.5 opacity-90"
            />
          </div>

          {/* Kanan: Grid Produk (Responsive Grid: 1 col on XS, 2 on SM, 3 on LG) */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <h3 className="text-center font-script text-2xl sm:text-4xl mb-6 sm:mb-8 text-secondary relative">
              <span className="bg-white px-4 sm:px-6 relative z-10 text-secondary">
                Fresh Chicken
              </span>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-0"></div>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {wholesaleItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-end bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300"
                >
                  {/* Badge Hitam S&K */}
                  <div className="absolute top-0 right-4 bg-secondary text-cream text-[8px] font-bold px-2 py-2 rounded-b-md z-10 text-center">
                    S&K
                    <br />
                    APPLY
                  </div>
                  {/* Gambar Produk */}
                  <div className="p-4 sm:p-6 flex justify-center items-center h-36 sm:h-40 bg-gray-50 group-hover:bg-cream/10 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                    />
                  </div>
                  {/* Box Bordo (Primary) */}
                  <div className="bg-primary text-white p-3 text-center min-h-[60px] sm:min-h-[70px] flex flex-col justify-center">
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide text-cream">
                      {item.name}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-cream/90 mt-0.5 sm:mt-1 leading-tight">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner Teks di Bawah Grid */}
            {/* <div className="mt-8 sm:mt-10 bg-cream/20 border border-cream/50 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-center sm:text-left">
              <div className="w-full sm:w-3/4">
                <h4 className="text-secondary font-bold text-sm sm:text-lg leading-snug">
                  Sourcing Directly from Local Poultry Farms and Catfish Ponds
                  for Guaranteed Freshness.
                </h4>
              </div>
              <button className="bg-primary hover:bg-primary-hover text-cream px-5 py-2.5 rounded-full text-xs sm:text-[10px] font-bold shadow-md whitespace-nowrap w-full sm:w-auto cursor-pointer transition-colors">
                View All Collections
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* ================= LOGISTICS SECTION ================= */}
      {/* <section id="logistics" className="bg-[#15161A] text-white py-12 sm:py-24 px-4 sm:px-10 lg:px-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10"> */}
      {/* Kiri: Kardus & Ayam Mentah */}
      {/* <div className="w-full lg:w-5/12 flex justify-center relative">
            <img 
              src="/images/logistics-boxes-chicken.png" 
              alt="Cardboard Boxes with Raw Chicken" 
              className="w-full max-w-xs sm:max-w-sm drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
            />
          </div> */}

      {/* Kanan: Teks Logistics */}
      {/* <div className="w-full lg:w-7/12 text-center lg:text-left">
            <h2 className="text-primary text-4xl sm:text-6xl lg:text-[5rem] font-script mb-4 sm:mb-6 drop-shadow-md leading-none">Logistics</h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 lg:pr-12">
              Providing top-tier cold chain logistics to ensure our poultry and seafood products arrive in pristine condition. We manage a robust fleet dedicated to timely and safe deliveries across the region.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 lg:pr-12 opacity-80">
              Our transport systems maintain strict temperature controls, ensuring that every batch of chicken and catfish retains its guaranteed freshness from our facilities straight to your establishment.
            </p>
            <button className="bg-white text-primary px-6 sm:px-8 py-2.5 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto lg:mx-0">
              Logistics <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      </section> */}
    </main>
  );
}
