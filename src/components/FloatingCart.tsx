"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ImageFallback } from "@/lib/ImageFallback";

export default function FloatingCart() {
  const {
    cart,
    totalItems,
    totalAmount,
    hasUnpricedItems,
    isCartOpen,
    setIsCartOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    addedNotice,
  } = useCart();

  // Mencegah scroll pada body saat popup terbuka di mobile
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Toast Notifikasi Penambahan Produk */}
      {addedNotice && (
        <div className="fixed bottom-24 right-6 z-50 bg-secondary text-cream px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-cream/30 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
            <Check size={14} />
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-tight">Ditambahkan ke Keranjang!</p>
            <p className="text-[11px] text-cream/80 truncate max-w-50">{addedNotice}</p>
          </div>
        </div>
      )}

      {/* Tombol Keranjang Melayang (Fixed Kanan Bawah) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={toggleCart}
          aria-label="Buka Keranjang Belanja"
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-primary hover:bg-primary3 text-white shadow-2xl border-2 border-cream/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ShoppingCart size={26} className="group-hover:rotate-6 transition-transform" />

          {/* Badge Jumlah Item */}
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-secondary text-cream text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white animate-pulse">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Pop Up Modal Keranjang Belanja */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6">
          {/* Backdrop Blur Gelap */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Konten Pop Up Dialog */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="relative w-full sm:max-w-md bg-white text-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] z-10 animate-fade-in-up"
          >
            {/* Header Pop Up */}
            <div className="bg-secondary text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-cream shadow-inner">
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <h3 id="cart-title" className="text-base font-bold text-cream">
                    Keranjang Belanja
                  </h3>
                  <p className="text-[11px] text-cream/70 font-medium">
                    {totalItems} item dipilih
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup keranjang"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body Pop Up: Daftar Produk */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
              {cart.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center text-gray-400">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mb-3">
                    <ShoppingCart size={32} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-700">Keranjang Masih Kosong</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-[220px]">
                    Belum ada produk yang ditambahkan. Silakan pilih produk dari katalog kami.
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-5 inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-cream text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-colors"
                  >
                    Jelajahi Produk
                  </Link>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cart.map((item) => {
                    const itemSubtotal = typeof item.product.price === "number"
                      ? item.product.price * item.quantity
                      : null;

                    return (
                      <div
                        key={item.product.id}
                        className="bg-gray-50/80 hover:bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-3 transition-colors"
                      >
                        {/* Gambar Produk */}
                        <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                          <ImageFallback
                            src={item.product.image}
                            alt={item.product.nameId}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Info Produk */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="block font-bold text-xs text-gray-900 truncate hover:text-primary transition-colors"
                          >
                            {item.product.nameId}
                          </Link>
                          <p className="text-[10px] text-gray-500 truncate mb-1.5">
                            {item.product.nameEn}
                          </p>
                          <div className="text-xs font-semibold text-primary">
                            {typeof item.product.price === "number" ? (
                              <span>
                                Rp {item.product.price.toLocaleString("id-ID")}{" "}
                                <span className="text-[10px] text-gray-500">
                                  /{item.product.unit || "item"}
                                </span>
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-amber-600">
                                {item.product.price}
                              </span>
                            )}
                          </div>

                          {/* Tombol Kuantitas (+ / -) */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-xs">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                                aria-label="Kurangi jumlah"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                                aria-label="Tambah jumlah"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="text-[10px] text-gray-500">
                              {item.product.unit ? `${item.quantity} ${item.product.unit}` : ""}
                            </span>
                          </div>
                        </div>

                        {/* Subtotal & Hapus */}
                        <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                            title="Hapus dari keranjang"
                            aria-label={`Hapus ${item.product.nameId}`}
                          >
                            <Trash2 size={16} />
                          </button>

                          <div className="text-right mt-auto">
                            {itemSubtotal !== null ? (
                              <span className="text-xs font-black text-gray-900">
                                Rp {itemSubtotal.toLocaleString("id-ID")}
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-gray-500">
                                Menunggu CS
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Pop Up: Total & Tombol Checkout */}
            {cart.length > 0 && (
              <div className="bg-gray-50 p-5 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-gray-900">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">
                      Total Estimasi
                    </span>
                    <span className="text-lg font-black text-primary">
                      Rp {totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  {hasUnpricedItems && (
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                      + Konfirmasi Harga CS
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full py-2.5 px-3 text-xs font-bold text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-xl transition-colors border border-gray-300 cursor-pointer text-center"
                  >
                    Kosongkan
                  </button>
                  <Link
                    href="/order"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-green-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    Lanjut Pesan <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

