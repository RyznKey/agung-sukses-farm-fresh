"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  Phone,
  Plus,
  Minus,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import db from "@/data/db.json";
import { useCart, Product } from "@/context/CartContext";
import { ImageFallback } from "@/lib/ImageFallback";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // Cari produk berdasarkan ID dari URL
  const productId = Number(params?.id);
  const product = (db.products as Product[]).find((p) => p.id === productId);

  // Produk terkait lainnya (mengecualikan produk yang sedang aktif)
  const relatedProducts = (db.products as Product[])
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  if (!product) {
    return (
      <main className="w-full min-h-screen bg-[#0F1012] text-white font-sans flex items-center justify-center p-6 pt-24 pb-20">
        <div className="max-w-md w-full bg-white text-gray-900 rounded-3xl p-8 text-center shadow-2xl border-2 border-primary">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
            <ShoppingCart size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Produk Tidak Ditemukan</h1>
          <p className="text-gray-500 text-xs mb-6 leading-relaxed">
            Maaf, produk yang Anda cari tidak tersedia atau mungkin telah diperbarui.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-cream px-6 py-3 rounded-full text-xs font-bold shadow-lg transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Katalog Produk
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/order");
  };

  // Label kategori ramah pengguna
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "chicken":
        return { name: "Ayam Potong Segar", icon: "🐔" };
      case "fish":
      case "catfish":
        return { name: "Perikanan (Ikan Lele)", icon: "🐟" };
      case "village-chicken":
      case "doc":
        return { name: "Bibit Unggas (DOC)", icon: "🐥" };
      case "eggs":
      case "egg":
        return { name: "Telur Segar", icon: "🥚" };
      default:
        return { name: "Produk Peternakan", icon: "🌾" };
    }
  };

  const categoryMeta = getCategoryLabel(product.category);

  return (
    <main className="w-full min-h-screen bg-[#0F1012] text-white font-sans overflow-x-hidden pt-20 pb-24">
      {/* Toast Notifikasi */}
      {showToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-secondary text-cream px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-cream/30 animate-bounce">
          <Check size={18} className="text-cream" />
          <span className="text-sm font-bold">
            {quantity} {product.unit || "item"} {product.nameId} ditambahkan ke keranjang!
          </span>
        </div>
      )}

      {/* HEADER BREADCRUMB */}
      <div className="bg-secondary/40 border-b border-cream/10 py-4 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-cream/70">
          <Link href="/" className="hover:text-cream transition-colors">
            Beranda
          </Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-cream transition-colors">
            Our Products
          </Link>
          <ChevronRight size={14} />
          <span className="text-cream font-bold truncate max-w-xs">{product.nameId}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-8">
        {/* Tombol Kembali */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-cream/80 hover:text-cream mb-6 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Katalog Produk
        </Link>

        {/* CARD UTAMA DETAIL PRODUK */}
        <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-primary grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* KOLOM KIRI: Foto & Badge (5 Kolom di LG) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-square rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center p-6 shadow-inner group">
              <ImageFallback
                src={product.image}
                alt={product.nameId}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
              />

              {/* Badge Halal & Kualitas di Atas Gambar */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-primary text-cream text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <ShieldCheck size={12} /> 100% Halal
                </span>
                <span className="bg-secondary text-cream text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles size={12} /> Segar Harian
                </span>
              </div>
            </div>

            {/* Info Keunggulan Layanan Cepat */}
            <div className="w-full mt-6 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-2.5">
                <Truck size={20} className="text-primary shrink-0" />
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-gray-900 block">Rantai Dingin</span>
                  <span className="text-gray-500">Kualitas & kesegaran terjaga</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-green-600 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-gray-900 block">Higienis & Sehat</span>
                  <span className="text-gray-500">Standar keamanan pangan</span>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Detail & Aksi Pemesanan (7 Kolom di LG) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Badge Kategori */}
              <div className="inline-flex items-center gap-1.5 bg-cream/50 text-primary border border-cream px-3 py-1 rounded-full text-xs font-bold mb-3">
                <span>{categoryMeta.icon}</span>
                <span>{categoryMeta.name}</span>
              </div>

              {/* Judul Produk */}
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight mb-1">
                {product.nameId}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mb-4">
                {product.nameEn}
              </p>

              {/* Tampilan Harga */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-6 flex items-baseline gap-2">
                {typeof product.price === "number" ? (
                  <>
                    <span className="text-3xl font-black text-primary">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-sm font-bold text-gray-500">
                      / {product.unit || "item"}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-black text-amber-700">
                    {product.price}
                  </span>
                )}
              </div>

              {/* Deskripsi Produk */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Deskripsi Produk
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description ||
                    "Produk peternakan dan perikanan segar bermutu tinggi langsung dari mitra binaan tepercaya kami. Diproses higienis untuk menjaga nutrisi dan rasa terbaik bagi Anda."}
                </p>
              </div>

              {/* Poin Keunggulan */}
              <div className="space-y-2 mb-8 bg-gray-50/60 p-4 rounded-2xl border border-gray-100">
                <h4 className="text-xs font-bold text-gray-700">Keunggulan Produk:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    <span>Dipanen & dipotong segar setiap hari</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    <span>Bebas pengawet & bahan kimia berbahaya</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    <span>Tersedia untuk eceran & grosir hotel/resto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    <span>Garansi mutu & kepuasan pelanggan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AKSI: Jumlah & Tombol Pesan */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700">Jumlah:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-xl bg-white overflow-hidden shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                    aria-label="Kurangi jumlah"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                    aria-label="Tambah jumlah"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  {product.unit ? `${quantity} ${product.unit}` : ""}
                </span>

                {typeof product.price === "number" && (
                  <div className="ml-auto text-right">
                    <span className="text-[10px] text-gray-400 block font-semibold">Subtotal</span>
                    <span className="text-base font-black text-primary">
                      Rp {(product.price * quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
              </div>

              {/* Tombol Tambah ke Keranjang & Beli Sekarang */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary-hover text-cream py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <ShoppingCart size={18} /> Tambah Ke Keranjang
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#25D366] hover:bg-green-600 text-white py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Check size={18} /> Pesan Sekarang
                </button>
              </div>

              {/* Link Konsultasi CS WhatsApp */}
              <a
                href={`https://wa.me/6281804823455?text=${encodeURIComponent(
                  `Halo CS Agung Sukses Farm Fresh, saya ingin menanyakan informasi tentang produk *${product.nameId}* (${product.nameEn}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs text-gray-500 hover:text-primary font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone size={14} /> Butuh bantuan atau pesanan khusus partai besar? Hubungi CS
              </a>
            </div>
          </div>
        </div>

        {/* PRODUK TERKAIT LAINNYA */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-script text-cream">Produk Pilihan Lainnya</h3>
                <p className="text-xs text-cream/70 font-semibold">
                  Jelajahi produk segar lainnya dari peternakan & tambak kami
                </p>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-cream hover:underline flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <Link
                    href={`/products/${item.id}`}
                    className="p-4 flex flex-col items-center flex-1 cursor-pointer"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3">
                      <ImageFallback
                        src={item.image}
                        alt={item.nameId}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 text-xs text-center leading-tight">
                      {item.nameId}
                    </h4>
                    <p className="text-[10px] text-gray-500 text-center mb-2">{item.nameEn}</p>
                    <span className="text-xs font-black text-primary mt-auto">
                      {typeof item.price === "number"
                        ? `Rp ${item.price.toLocaleString("id-ID")}/${item.unit || "item"}`
                        : item.price}
                    </span>
                  </Link>
                  <div className="p-3 pt-0">
                    <Link
                      href={`/products/${item.id}`}
                      className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-700 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <main
          className="w-full min-h-screen bg-[#0F1012] text-white font-sans flex items-center justify-center p-6 pt-24 pb-20"
          aria-busy="true"
        >
          <p className="text-sm text-cream/80">Memuat detail produk...</p>
        </main>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
