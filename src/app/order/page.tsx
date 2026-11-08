"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Send,
  ArrowLeft,
  User,
  FileText,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ImageFallback } from "@/lib/ImageFallback";

export default function OrderPage() {
  const {
    cart,
    totalItems,
    totalAmount,
    hasUnpricedItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "Transfer Bank (BCA/Mandiri)",
    notes: "",
  });

  // Nomor WhatsApp tujuan CS Agung Sukses Farm Fresh
  const whatsappNumber = "6281804823455";

  // Fungsi pengiriman form via WhatsApp
  const handleOrderViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Silakan pilih minimal 1 produk ke keranjang sebelum mengirim pesanan.");
      return;
    }

    if (!customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()) {
      alert("Mohon isi Nama Lengkap, Nomor HP/WA, dan Alamat Pengiriman lengkap!");
      return;
    }

    // 1. Susun Rincian Pesanan
    let itemsListText = "";
    cart.forEach((item, index) => {
      const priceStr = typeof item.product.price === "number"
        ? `Rp ${item.product.price.toLocaleString("id-ID")}/${item.product.unit || "item"}`
        : `${item.product.price}`;
      const subtotalStr = typeof item.product.price === "number"
        ? `Rp ${(item.product.price * item.quantity).toLocaleString("id-ID")}`
        : `Menunggu Konfirmasi`;

      itemsListText += `${index + 1}. *${item.product.nameId}* (${item.product.nameEn})\n   Qty: ${item.quantity} ${item.product.unit || "item"} x ${priceStr} = *${subtotalStr}*\n`;
    });

    const totalText = `Rp ${totalAmount.toLocaleString("id-ID")}${
      hasUnpricedItems ? " (+ produk menunggu konfirmasi harga)" : ""
    }`;

    // 2. Susun Pesan WhatsApp Terformat
    const messageTemplate = `Halo *Agung Sukses Farm Fresh*, saya ingin memesan produk berikut:

----------------------------------
*RINCIAN PESANAN:*
${itemsListText}
----------------------------------
*TOTAL ESTIMASI:* ${totalText}

*DATA PEMESAN & PENGIRIMAN:*
• Nama Lengkap: ${customerInfo.name.trim()}
• No. WhatsApp: ${customerInfo.phone.trim()}
• Alamat Pengiriman: ${customerInfo.address.trim()}
• Opsi Pembayaran: ${customerInfo.paymentMethod}
• Catatan Tambahan: ${customerInfo.notes.trim() || "-"}

Mohon konfirmasi ketersediaan stok, ongkos kirim, dan waktu pengiriman. Terima kasih!`;

    // 3. Encode URI & Buka WhatsApp
    const encodedMessage = encodeURIComponent(messageTemplate);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(waUrl, "_blank");
  };

  return (
    <main className="w-full min-h-screen bg-[#0F1012] text-white font-sans overflow-x-hidden pt-20 pb-24">
      {/* HEADER SECTION */}
      <header className="relative bg-secondary pt-8 pb-14 px-4 sm:px-10 border-b border-cream/20">
        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cream/70 hover:text-cream mb-4 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Daftar Produk
          </Link>
          <h1 className="text-4xl sm:text-6xl font-script text-cream drop-shadow-lg mb-2">
            Form Pemesanan
          </h1>
          <p className="text-cream/90 text-xs sm:text-sm font-semibold tracking-wider">
            Konfirmasi pesanan grosir dan eceran langsung ke Customer Service via WhatsApp
          </p>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-8">
        <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-primary">
          <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                <FileText className="text-primary" size={30} />
                Checkout & Kirim Pesanan
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Periksa daftar produk Anda dan isi data pengiriman di bawah ini.
              </p>
            </div>
            <div className="bg-cream/50 text-primary px-4 py-2 rounded-xl text-xs font-bold border border-cream flex items-center gap-2">
              <ShoppingCart size={16} /> Total: {totalItems} Item
            </div>
          </div>

          <form onSubmit={handleOrderViaWhatsApp} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* SISI KIRI: Ringkasan Produk Dipilih (5 Kolom di LG) */}
            <div className="lg:col-span-5 bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                    <ShoppingCart size={18} className="text-primary" />
                    Daftar Pesanan Anda
                  </h3>
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[11px] text-red-600 hover:underline font-semibold cursor-pointer"
                    >
                      Kosongkan
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 p-6">
                    <ShoppingCart size={44} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-bold text-gray-700">Keranjang masih kosong</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Silakan pilih produk yang ingin Anda beli dari katalog kami.
                    </p>
                    <Link
                      href="/products"
                      className="mt-4 inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-cream px-5 py-2 rounded-full text-xs font-bold shadow-md transition-colors"
                    >
                      Pilih Produk Sekarang
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {cart.map((item) => {
                      const itemSubtotal = typeof item.product.price === "number"
                        ? item.product.price * item.quantity
                        : null;

                      return (
                        <div
                          key={item.product.id}
                          className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between gap-3 shadow-xs"
                        >
                          <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center p-1">
                            <ImageFallback
                              src={item.product.image}
                              alt={item.product.nameId}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-gray-800 truncate">
                              {item.product.nameId}
                            </h4>
                            <p className="text-[10px] text-gray-500 truncate mb-1">
                              {item.product.nameEn}
                            </p>
                            <p className="text-[11px] font-bold text-primary">
                              {typeof item.product.price === "number" ? (
                                `Rp ${item.product.price.toLocaleString("id-ID")}/${
                                  item.product.unit || "item"
                                }`
                              ) : (
                                <span className="text-amber-700">{item.product.price}</span>
                              )}
                            </p>

                            <div className="flex items-center gap-2 mt-1.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-xs font-bold cursor-pointer"
                                aria-label="Kurangi kuantitas"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-xs font-bold cursor-pointer"
                                aria-label="Tambah kuantitas"
                              >
                                <Plus size={12} />
                              </button>
                              <span className="text-[10px] text-gray-500">
                                {item.product.unit}
                              </span>
                            </div>
                          </div>

                          <div className="text-right flex flex-col justify-between items-end self-stretch">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                              aria-label="Hapus item"
                            >
                              <Trash2 size={15} />
                            </button>
                            <div className="mt-auto">
                              {itemSubtotal !== null ? (
                                <span className="font-bold text-xs text-primary">
                                  Rp {itemSubtotal.toLocaleString("id-ID")}
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-gray-500">
                                  Konfirmasi CS
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

              {/* Subtotal & Info Garansi */}
              <div className="pt-5 border-t border-gray-200 mt-6 space-y-3">
                <div className="flex justify-between items-center text-gray-900">
                  <span className="font-bold text-sm">Total Estimasi:</span>
                  <span className="text-xl font-black text-primary">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                {hasUnpricedItems && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    *Terdapat produk dengan harga yang akan dikonfirmasi langsung oleh CS via WhatsApp.
                  </p>
                )}

                <div className="pt-3 grid grid-cols-2 gap-2 text-[10px] text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-green-600 shrink-0" />
                    <span>100% Halal & Higienis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={14} className="text-blue-600 shrink-0" />
                    <span>Rantai Pasok Dingin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SISI KANAN: Form Input Data Pemesan (7 Kolom di LG) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2 pb-1 border-b border-gray-100">
                  <User size={18} className="text-primary" />
                  Data Pemesan & Alamat Pengiriman
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      No. WhatsApp / Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Alamat Pengiriman Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Nama Jalan, Nomor Rumah/Usaha, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, address: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <CreditCard size={14} /> Opsi Pembayaran
                    </label>
                    <select
                      value={customerInfo.paymentMethod}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                    >
                      <option value="Transfer Bank (BCA/Mandiri)">
                        Transfer Bank (BCA/Mandiri)
                      </option>
                      <option value="Cash on Delivery (COD)">
                        Cash on Delivery (COD - Khusus Area Tertentu)
                      </option>
                      <option value="E-Wallet (Gopay/OVO/Dana)">
                        E-Wallet (Gopay/OVO/Dana)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Catatan Tambahan (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Potong ayam jadi 8 bagian, kirim pagi"
                      value={customerInfo.notes}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, notes: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* TOMBOL AKSI UTAMA KE WHATSAPP */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    cart.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#25D366] hover:bg-green-600 active:scale-95 text-white"
                  }`}
                >
                  <Send size={20} /> Kirim Pesanan via WhatsApp
                </button>
                <p className="text-[11px] text-gray-500 text-center mt-2">
                  Setelah menekan tombol di atas, Anda akan langsung dialihkan ke obrolan WhatsApp resmi kami.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

