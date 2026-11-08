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
    <main className="w-full min-h-screen bg-[#f8f6f4] text-gray-900 font-sans overflow-x-hidden relative pb-24">
      {/* HEADER SECTION */}
      <header className="relative bg-secondary pt-16 pb-20 px-4 sm:px-10 text-center border-b border-cream/20">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block bg-primary text-cream text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md mb-4">
            Katalog Resmi Agung Sukses Farm Fresh
          </div>
          <h1 className="text-5xl sm:text-7xl font-script text-cream drop-shadow-lg mb-3">
            Our Products
          </h1>
          <p className="text-cream/90 text-xs sm:text-sm font-semibold tracking-wider max-w-2xl mx-auto">
            Pasokan Daging Ayam Potong Segar, Ikan Lele Konsumsi, Bibit DOC, & Telur Ayam Kampung Berkualitas Tinggi
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        {/* TAB FILTER KATEGORI */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs ${
                selectedCategory === cat.key
                  ? "bg-primary text-cream shadow-md scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* SECTION HEADER DESKRIPSI */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Kualitas Terjamin & Segar Harian
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-secondary mt-1 font-bold">
              {selectedCategory === "all"
                ? "Daftar Seluruh Produk"
                : categories.find((c) => c.key === selectedCategory)?.label}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Menampilkan {filteredProducts.length} produk pilihan langsung dari peternakan & tambak binaan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-white text-gray-600 text-[10px] font-semibold px-3 py-1.5 rounded-full border border-gray-200 shadow-xs">
              100% Halal
            </span>
            <span className="bg-white text-gray-600 text-[10px] font-semibold px-3 py-1.5 rounded-full border border-gray-200 shadow-xs">
              Rantai Pasok Dingin
            </span>
            <span className="bg-white text-gray-600 text-[10px] font-semibold px-3 py-1.5 rounded-full border border-gray-200 shadow-xs">
              Diproses Higienis
            </span>
          </div>
        </div>

        {/* GRID PRODUK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isPriceNumber = typeof product.price === "number";

            return (
              <div
                key={product.id}
                className="bg-white shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Gambar Produk dengan Link ke Detail */}
                <Link
                  href={`/products/${product.id}`}
                  className="relative aspect-4/3 overflow-hidden bg-gray-50 block cursor-pointer"
                >
                  <ImageFallback
                    src={product.image}
                    alt={product.nameId}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-sm"
                    aria-hidden="true"
                  >
                    <Check size={14} />
                  </span>

                  {/* Badge Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Eye size={14} /> Lihat Detail
                    </span>
                  </div>
                </Link>

                {/* Deskripsi & Harga Produk */}
                <div className="p-4 sm:p-5 flex flex-1 flex-col">
                  <div>
                    <Link
                      href={`/products/${product.id}`}
                      className="block font-serif font-medium text-lg text-stone-700 group-hover:text-primary transition-colors leading-snug"
                    >
                      {product.nameId}
                    </Link>
                    <p className="text-[11px] text-gray-500 mt-0.5">{product.nameEn}</p>

                    <div className="mt-2">
                      {isPriceNumber ? (
                        <div className="text-sm font-semibold text-stone-700">
                          Rp {product.price.toLocaleString("id-ID")}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            / {product.unit || "item"}
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm font-bold text-amber-700">
                          {product.price}
                        </div>
                      )}
                    </div>
                    {product.description && (
                      <p className="mt-2 text-[10px] italic leading-relaxed text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Tombol Aksi */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="mx-auto flex items-center justify-center gap-1.5 rounded-full border border-primary px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-cream cursor-pointer"
                    >
                      <ShoppingCart size={13} /> Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA BANNER PEMESANAN & CHECKOUT DI BAWAH KATALOG */}
        <section className="mt-20 bg-secondary text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-cream/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="bg-primary text-cream text-[11px] font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
                <Sparkles size={14} /> Pesan Mudah & Cepat
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-cream leading-tight">
                Siap Melakukan Pemesanan?
              </h3>
              <p className="text-xs sm:text-sm text-cream/80 mt-2 leading-relaxed">
                Produk yang Anda tambahkan dapat ditinjau di keranjang belanja. Klik tombol di bawah untuk melengkapi alamat pengiriman dan langsung terhubung dengan Customer Service kami di WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-cream px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold border border-cream/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={16} /> Buka Keranjang ({totalItems})
              </button>

              <Link
                href="/order"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-green-600 text-white px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
              >
                Halaman Pemesanan <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* BANTUAN KONTAK CEPAT */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Ada pertanyaan seputar pasokan grosir, pengiriman, atau kemitraan restoran?{" "}
            <a
              href="https://wa.me/6281804823455?text=Halo%20CS%20Agung%20Sukses%20Farm%20Fresh,%20saya%20ingin%20konsultasi%20pemesanan%20produk."
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline inline-flex items-center gap-1"
            >
              <Phone size={12} /> Hubungi WhatsApp Kami
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
