"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Check,
  ArrowRight,
  Sparkles,
  Phone,
  Eye,
} from "lucide-react";
import db from "@/data/db.json";
import { useCart, Product } from "@/context/CartContext";
import { ImageFallback } from "@/lib/ImageFallback";

export default function ProductsPage() {
  const products: Product[] = db.products as Product[];
  const { addToCart, setIsCartOpen, totalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "Semua Produk", icon: "🌾" },
    { key: "chicken", label: "Ayam Potong", icon: "🐔" },
    { key: "fish", label: "Ikan Lele", icon: "🐟" },
    { key: "village-chicken", label: "DOC Ayam Kampung", icon: "🐥" },
    { key: "eggs", label: "Telur Ayam Kampung", icon: "🥚" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => {
          if (selectedCategory === "fish") {
            return p.category === "fish" || p.category === "catfish";
          }
          if (selectedCategory === "village-chicken") {
            return p.category === "village-chicken" || p.category === "doc";
          }
          if (selectedCategory === "eggs") {
            return p.category === "eggs" || p.category === "egg";
          }
          return p.category === selectedCategory;
        });

  return (
    <main
      className="relative w-full min-h-screen overflow-hidden bg-[#f2eadc] bg-cover bg-center bg-fixed pb-20 font-sans text-[#183d31]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(12, 29, 21, 0.48), rgba(12, 29, 21, 0.58)), url('/images/slideHero/slideHero3.jpeg')",
      }}
    >
      <header className="relative flex min-h-[440px] items-center justify-center overflow-hidden px-5 pb-14 pt-28 text-center text-white sm:min-h-[520px] sm:px-10">
        
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-lime-200 sm:text-xs">
            Agung Sukses Farm Fresh
          </p>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            Segar dari
            <br />
            peternakan kami.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-xs leading-6 text-white/85 sm:text-sm sm:leading-7">
            Pilihan ayam, ikan lele, DOC, dan telur berkualitas untuk kebutuhan rumah maupun usaha.
          </p>
          <a
            href="#featured-products"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 text-xs font-bold text-[#183d31] shadow-lg transition hover:bg-lime-200"
          >
            Lihat Produk <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      <section
        id="featured-products"
        className="relative z-10 mx-auto -mt-5 max-w-6xl rounded-t-[2rem] bg-[#f2eadc]/95 px-4 pb-8 pt-2 shadow-2xl backdrop-blur-sm sm:-mt-8 sm:rounded-t-[3rem] sm:px-8 lg:px-10"
      >
        <div className="py-9 text-center sm:py-12">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7b8669]">
            Pilihan segar setiap hari
          </p>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#183d31] sm:text-3xl">
            Produk Unggulan
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-[#687267] sm:text-sm">
            Produk peternakan pilihan dengan pasokan yang dapat diandalkan.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-bold transition-all sm:px-5 sm:text-xs ${
                selectedCategory === cat.key
                  ? "border-[#183d31] bg-[#183d31] text-[#f2eadc] shadow-md"
                  : "border-[#d9d2c4] bg-[#f8f4eb] text-[#506054] hover:border-[#183d31]/40 hover:bg-white"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="hidden shrink-0 cursor-pointer items-center gap-2 rounded-full border border-[#183d31]/20 bg-white/70 px-4 py-2.5 text-xs font-bold text-[#183d31] transition hover:bg-white sm:inline-flex"
          >
            <ShoppingCart size={15} aria-hidden="true" />
            Keranjang ({totalItems})
          </button>
        </div>

        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h3 className="font-heading text-xl font-bold text-[#183d31] sm:text-2xl">
              {selectedCategory === "all"
                ? "Semua Produk"
                : categories.find((c) => c.key === selectedCategory)?.label}
            </h3>
            <p className="mt-1 text-xs text-[#687267]">
              Menampilkan {filteredProducts.length} produk pilihan.
            </p>
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7b8669]">
            Segar · Terpilih · Terpercaya
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const isPriceNumber = typeof product.price === "number";

            return (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#ded6c8] bg-[#fbf8f0] shadow-[0_8px_24px_rgba(29,48,34,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(29,48,34,0.14)]"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative block aspect-[1.45/1] cursor-pointer overflow-hidden bg-[#e7e1d5]"
                >
                  <ImageFallback
                    src={product.image}
                    alt={product.nameId}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#fbf8f0]/95 text-[#426147] shadow-sm"
                    aria-hidden="true"
                  >
                    <Check size={14} />
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center bg-[#10271d]/35 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-full bg-[#fbf8f0]/95 px-3 py-1.5 text-xs font-bold text-[#183d31] shadow-md">
                      <Eye size={14} /> Lihat Detail
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex-1">
                    <Link
                      href={`/products/${product.id}`}
                      className="block font-heading text-base font-bold leading-snug text-[#183d31] transition-colors group-hover:text-[#678246] sm:text-lg"
                    >
                      {product.nameId}
                    </Link>
                    <p className="mt-1 text-[10px] text-[#899084]">{product.nameEn}</p>
                    <div className="mt-3">
                      {isPriceNumber ? (
                        <div className="text-sm font-bold text-[#516c3d]">
                          Rp{product.price.toLocaleString("id-ID")}
                          <span className="ml-1 text-xs font-normal text-[#899084]">/ {product.unit || "item"}</span>
                        </div>
                      ) : (
                        <div className="text-xs font-bold uppercase tracking-wide text-[#9a6a37]">
                          {product.price}
                        </div>
                      )}
                    </div>
                    {product.description && (
                      <p className="mt-3 line-clamp-2 text-[11px] leading-5 text-[#737b70]">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#183d31] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#f2eadc] transition-colors hover:bg-[#285440]"
                  >
                    <ShoppingCart size={14} aria-hidden="true" />
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2">
          <div className="relative min-h-[190px] overflow-hidden rounded-2xl bg-[#193d31]">
            <img
              src="/images/fresh-chicken.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#10271d]/95 via-[#10271d]/70 to-transparent" />
            <div className="relative z-10 flex h-full min-h-[190px] max-w-sm flex-col items-start justify-center p-6 text-white sm:p-8">
              <span className="mb-2 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-lime-200">
                <Sparkles size={13} aria-hidden="true" /> Pasokan pilihan
              </span>
              <h3 className="font-heading text-xl font-bold sm:text-2xl">Untuk kebutuhan usaha</h3>
              <p className="mt-2 text-[11px] leading-5 text-white/75">Pesan produk segar untuk restoran dan kebutuhan grosir.</p>
              <Link href="/order" className="mt-4 inline-flex items-center gap-2 rounded-full bg-lime-300 px-4 py-2 text-[10px] font-bold text-[#183d31] transition hover:bg-lime-200">
                Mulai Pesan <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[190px] overflow-hidden rounded-2xl bg-[#e4d7bf]">
            <img
              src="/images/produk/leleV2.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f2eadc]/95 via-[#f2eadc]/80 to-[#f2eadc]/20" />
            <div className="relative z-10 flex h-full min-h-[190px] max-w-sm flex-col items-start justify-center p-6 text-[#183d31] sm:p-8">
              <span className="mb-2 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7b4e]">
                <Phone size={13} aria-hidden="true" /> Perlu bantuan?
              </span>
              <h3 className="font-heading text-xl font-bold sm:text-2xl">Konsultasi produk</h3>
              <p className="mt-2 text-[11px] leading-5 text-[#566356]">Tanyakan ketersediaan produk dan informasi pasokan.</p>
              <a href="https://wa.me/6281804823455?text=Halo%20CS%20Agung%20Sukses%20Farm%20Fresh,%20saya%20ingin%20konsultasi%20pemesanan%20produk." target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#183d31] px-4 py-2 text-[10px] font-bold text-white transition hover:bg-[#285440]">
                Hubungi WhatsApp <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#183d31]/25 bg-[#fbf8f0] px-5 py-3 text-xs font-bold text-[#183d31] transition hover:bg-white"
          >
            <ShoppingCart size={15} aria-hidden="true" />
            Buka Keranjang ({totalItems})
          </button>
        </div>
      </section>
    </main>
  );
}
