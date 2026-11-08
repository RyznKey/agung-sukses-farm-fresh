"use client";

import { Suspense } from 'react';
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import db from "../data/db.json";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-coverflow";

export default function Home() {
  // State untuk Side Pagination Hero (Aktif)
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // Data Slide Hero
  const heroSlides = db.heroSlides;
  const currentHeroSlide = heroSlides[activeHeroSlide] ?? heroSlides[0];

  // Tampilkan produk unggulan (ayam, lele, DOC, telur) dari db.json.
  const wholesaleItems = db.products
    .filter((product) => [1, 2, 6, 8, 9, 10].includes(product.id))
    .map((product) => {
      const priceText =
        typeof product.price === "number"
          ? `Rp${product.price.toLocaleString("id-ID")}/${product.unit || "item"}`
          : product.price;

      return {
        ...product,
        name: product.nameId,
        sub: `${product.nameEn} • ${priceText}`,
      };
    });
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
        className="relative bg-[#111111] bg-cover bg-center py-14 sm:py-20 lg:py-24 px-4 sm:px-10 lg:px-16 flex items-center justify-center min-h-[70svh] lg:min-h-[85svh] border-brand-dark"
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
              className={`transition-all duration-300 rounded-full ${activeHeroSlide === idx
                ? "w-3 h-3 bg-primary scale-125 shadow-[0_0_10px_var(--color-primary)]"
                : "w-2.5 h-2.5 bg-cream/40 hover:bg-cream"
                }`}
              title={`Go to slide ${idx + 1}`}
              aria-label={`Go to hero slide ${idx + 1}`}
              aria-current={activeHeroSlide === idx ? "true" : undefined}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl">
          {/* Tipografi Hero */}
          <div className="w-full text-center animate-fade-in-up flex flex-col items-center">
            <h1 className="w-full text-white text-[clamp(2.5rem,9vw,6rem)] font-script leading-tight drop-shadow-2xl z-20 mb-2 sm:mb-4">
              {currentHeroSlide.title1}
            </h1>
            <div className="inline-block max-w-full bg-primary text-cream px-4 sm:px-10 py-2 sm:py-3 rounded-[20px] sm:rounded-[40px] transform -rotate-2 shadow-2xl z-10 my-1 sm:my-0">
              <h2 className="text-[clamp(1.5rem,7vw,5.5rem)] font-script leading-tight text-center break-words">
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
              Selamat datang di Agung Sukses Farm Fresh – Pemasok Grosir Produk Peternakan dan Perikanan Berkualitas.
              <br className="hidden sm:inline" />
              Kami menyediakan berbagai kebutuhan unggas dan perikanan, mulai dari ayam potong segar, DOC (anak ayam), telur ayam kampung, ikan lele konsumsi, hingga pakan ternak, khususnya pakan ayam. Kami berkomitmen menghadirkan produk berkualitas dengan pasokan terpercaya untuk memenuhi kebutuhan pelanggan.
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
      className="relative z-10 bg-[#000000] py-14 text-white overflow-hidden sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Text */}
        <div className="mb-8 px-4 text-center sm:mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-stone-400 sm:text-xs">
            Agung Sukses Farm Fresh
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Produk pilihan, segar <br className="hidden sm:block" />
            langsung dari peternakan
          </h2>
        </div>

        {/* 3D Coverflow Carousel Container */}
        <div className="relative w-full py-6">
          <Suspense fallback={<div className="h-[360px] w-full animate-pulse bg-[#121212] rounded-3xl" />}>
          
            <Swiper
              modules={[EffectCoverflow, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView="auto"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              coverflowEffect={{
                rotate: 35,       // Kemiringan rotasi 3D kartu samping
                stretch: 0,        // Jarak regangan
                depth: 250,        // Kedalaman perspektif 3D
                modifier: 1,       // Intensitas efek
                slideShadows: true, // Bayangan kegelapan pada slide samping
              }}
              className="w-full !overflow-visible"
            >
              {wholesaleItems.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="!w-[240px] sm:!w-[280px] lg:!w-[300px]"
                >
                  <Link
                    href={`/products/${item.id}`}
                    aria-label={`${item.name}: ${item.sub}`}
                    className="group relative flex h-[360px] sm:h-[420px] w-full flex-col justify-end overflow-hidden rounded-3xl bg-[#121212] shadow-2xl transition-transform duration-500"
                  >
                    {/* Background Gambar */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay Gelap agar teks terbaca murni di atas gambar */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Konten Teks di Atas Gambar */}
                    <div className="relative z-10 p-6 text-center">
                      <h3 className="font-serif text-xl sm:text-2xl font-medium leading-tight text-white drop-shadow-md">
                        {item.name}
                      </h3>
                      {item.sub && (
                        <p className="mt-2 text-xs text-stone-300 line-clamp-2">
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Suspense>
        </div>

        {/* Tombol Lihat Semua Produk */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Lihat Semua Produk <ChevronRight size={14} />
          </Link>
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
