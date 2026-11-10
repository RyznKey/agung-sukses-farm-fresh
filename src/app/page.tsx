"use client";

import { Suspense } from 'react';
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Drumstick,
  Egg,
  Fish,
  Leaf,
} from "lucide-react";
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

  const addressParts = db.company.address.split(", ");
  const district = addressParts.find((part) =>
    /^(Kabupaten|Kota)\s/.test(part),
  );
  const province = addressParts.at(-1)?.replace(/\s+\d{5}$/, "") ?? "Lokasi";
  const heroStats = [
    { value: db.products.length, label: "Pilihan produk" },
    {
      value: new Set(db.products.map((product) => product.category)).size,
      label: "Kategori utama",
    },
    { value: db.company.hours, label: "Jam operasional" },
    {
      value: district?.replace(/^(Kabupaten|Kota)\s/, "") ?? db.company.address,
      label: province,
    },
  ];

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
        className="relative flex min-h-190 items-center overflow-hidden bg-[#101713] bg-cover bg-center px-4 pb-24 pt-25 text-white sm:px-8 sm:pt-32 lg:min-h-195 lg:px-16 lg:pb-28"
        style={{
          backgroundImage: currentHeroSlide
            ? `linear-gradient(90deg, rgba(8, 17, 12, 0.94) 0%, rgba(8, 17, 12, 0.76) 48%, rgba(8, 17, 12, 0.30) 100%), linear-gradient(0deg, rgba(8, 17, 12, 0.78), transparent 38%), url('${currentHeroSlide.image}')`
            : undefined,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_45%,rgba(172,211,89,0.12),transparent_42%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-12 lg:min-h-125">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
            <div className="max-w-3xl animate-fade-in-up">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-200/20 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-lime-200 sm:text-xs">
                <Leaf size={14} aria-hidden="true" />
                Agung Sukses Farm Fresh
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
                Nurturing Nature.
                <br />
                <span className="text-lime-300">Empowering Farmers.</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Kebutuhan ayam, ikan lele, DOC, telur ayam kampung, hingga pakan ternak dalam satu tempat. Pasokan pilihan untuk rumah, usaha, dan kebutuhan grosir Anda.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-3 text-xs font-bold text-[#172016] shadow-lg shadow-lime-950/30 transition hover:bg-lime-200 sm:px-6 sm:text-sm"
                >
                  Jelajahi Produk <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-xs font-semibold text-white transition hover:border-lime-200 hover:text-lime-200 sm:px-6 sm:text-sm"
                >
                  Kenali Kami <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#111a15]/75 p-5 shadow-2xl shadow-black/30 backdrop-blur-md lg:justify-self-end">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-white">Pilihan produk</p>
                  <p className="mt-1 text-[11px] text-white/55">Dari Agung Sukses Farm Fresh</p>
                </div>
                <span className="rounded-full bg-lime-300/15 px-2.5 py-1 text-[10px] font-semibold text-lime-200">
                  4 kategori
                </span>
              </div>
              <ul className="mt-2 divide-y divide-white/10">
                {[
                  "Ayam potong segar",
                  "Ikan lele konsumsi",
                  "DOC ayam kampung",
                  "Telur ayam kampung",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 py-3 text-xs text-white/80">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-300/15 text-lime-200">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-5 sm:grid-cols-4 sm:gap-6">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-lime-300" />
                <div className="min-w-0">
                  <p className="wrap-break-word text-sm font-bold leading-tight text-white sm:text-xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] text-white/55 sm:text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-1/2 right-5 z-20 hidden translate-y-1/2 flex-col gap-3 rounded-full border border-white/15 bg-black/30 p-2.5 backdrop-blur-sm xl:flex">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHeroSlide(idx)}
              className={`rounded-full transition-all duration-300 ${
                activeHeroSlide === idx
                  ? "h-3 w-3 bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.7)]"
                  : "h-2.5 w-2.5 bg-white/40 hover:bg-white"
              }`}
              title={`Go to slide ${idx + 1}`}
              aria-label={`Go to hero slide ${idx + 1}`}
              aria-current={activeHeroSlide === idx ? "true" : undefined}
            />
          ))}
        </div>
      </section>

      {/* ================= WELCOME SECTION ================= */}
      <section id="about" className="relative z-20 bg-[#0d1712] px-4 py-16 text-white sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-lime-300 sm:text-xs">
                Apa yang kami sediakan
              </p>
              <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Solusi segar untuk setiap kebutuhan.
              </h2>
            </div>
            <p className="max-w-2xl text-xs leading-6 text-white/60 sm:text-sm sm:leading-7 md:justify-self-end">
              Agung Sukses Farm Fresh menyediakan produk peternakan dan perikanan pilihan dengan pasokan terpercaya untuk pelanggan rumah tangga maupun pelaku usaha.
            </p>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {[
              {
                title: "Ayam potong segar",
                description: "Pilihan potongan ayam untuk kebutuhan harian dan usaha kuliner.",
                href: "/products/1",
                Icon: Drumstick,
              },
              {
                title: "Ikan lele konsumsi",
                description: "Lele konsumsi dari budidaya terawat, siap untuk berbagai olahan.",
                href: "/products/8",
                Icon: Fish,
              },
              {
                title: "DOC ayam kampung",
                description: "Bibit DOC ayam kampung pilihan untuk kebutuhan peternakan.",
                href: "/products/9",
                Icon: Leaf,
              },
              {
                title: "Telur ayam kampung",
                description: "Telur segar bernutrisi untuk konsumsi keluarga dan usaha.",
                href: "/products/10",
                Icon: Egg,
              },
            ].map(({ title, description, href, Icon }) => (
              <Link
                key={title}
                href={href}
                className="group flex min-h-52 flex-col rounded-2xl border border-white/8 bg-[#142019] p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-300/30 hover:bg-[#19271d] sm:p-6"
              >
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300 transition group-hover:bg-lime-300 group-hover:text-[#172016]">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
                <p className="mt-2 flex-1 text-[11px] leading-5 text-white/55 sm:text-xs">{description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold text-lime-300">
                  Lihat produk <ArrowRight size={13} aria-hidden="true" className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ONLINE WHOLESALE SECTION ================= */}
      <section
      id="products"
      className="relative z-10 bg-[#0D1712] py-14 text-white overflow-hidden sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Text */}
        <div className="mb-8 px-4 text-center sm:mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-stone-400 sm:text-xs">
            Agung Sukses Farm Fresh
          </p>
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Produk pilihan, segar <br className="hidden sm:block" />
            langsung dari peternakan
          </h2>
        </div>

        {/* 3D Coverflow Carousel Container */}
        <div className="relative w-full py-6">
          <Suspense fallback={<div className="h-90 w-full animate-pulse bg-[#121212] rounded-3xl" />}>
          
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
              className="w-full overflow-visible!"
            >
              {wholesaleItems.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="w-60! sm:w-70! lg:w-75!"
                >
                  <Link
                    href={`/products/${item.id}`}
                    aria-label={`${item.name}: ${item.sub}`}
                    className="group relative flex h-90 sm:h-105 w-full flex-col justify-end overflow-hidden rounded-3xl bg-[#121212] shadow-2xl transition-transform duration-500"
                  >
                    {/* Background Gambar */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay Gelap agar teks terbaca murni di atas gambar */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Konten Teks di Atas Gambar */}
                    <div className="relative z-10 p-6 text-center">
                      <h3 className="font-heading text-xl sm:text-2xl font-bold leading-tight text-white drop-shadow-md">
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
            Lihat Semua Produk <ArrowRight size={14} />
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
