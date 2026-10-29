"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Send, ArrowLeft, Check, User, FileText } from 'lucide-react';
import db from "../../data/db.json";

interface Product {
  id: number;
  nameEn: string;
  nameId: string;
  category: 'chicken' | 'catfish';
  image: string;
  price: number;
  unit: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function ProductsPage() {
  
  const products: Product[] = db.products as Product[];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Transfer Bank (BCA/Mandiri)',
    notes: ''
  });

  // UBAH NOMOR DI SINI (Gunakan kode negara, contoh 6281234567890)
  const whatsappNumber = "6281804823455";

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    setAddedNotice(product.nameEn);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // FUNGSI LANGSUNG KE WHATSAPP (DIRECT ACTION)
  const handleOrderViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Silakan pilih minimal 1 produk sebelum mengirim pesanan.");
      return;
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Mohon isi Nama Lengkap, Nomor HP/WA, dan Alamat Pengiriman!");
      return;
    }

    // 1. Susun Daftar Produk
    let itemsListText = "";
    cart.forEach((item, index) => {
      const subtotal = item.product.price * item.quantity;
      itemsListText += `${index + 1}. *${item.product.nameEn} (${item.product.nameId})*\n   Qty: ${item.quantity} ${item.product.unit} x Rp ${item.product.price.toLocaleString('id-ID')} = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    // 2. Format Template Pesan WA
    const messageTemplate = 
`Halo *Agung Sukses Farm Fresh*, saya ingin memesan produk berikut:

----------------------------------
*DAFTAR PESANAN:*
${itemsListText}
----------------------------------
*TOTAL ESTIMASI:* Rp ${totalAmount.toLocaleString('id-ID')}

*DATA PEMBELI:*
• Nama Lengkap: ${customerInfo.name}
• No. WhatsApp: ${customerInfo.phone}
• Alamat Pengiriman: ${customerInfo.address}
• Metode Pembayaran: ${customerInfo.paymentMethod}
• Catatan Khusus: ${customerInfo.notes || '-'}

Mohon konfirmasi ketersediaan stok dan rincian ongkos kirim. Terima kasih!`;

    // 3. Encode URI & Redirect ke WhatsApp Target
    const encodedMessage = encodeURIComponent(messageTemplate);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Buka WhatsApp di tab/aplikasi baru
    window.open(waUrl, '_blank');
  };

  return (
    <main className="w-full min-h-screen bg-[#0F1012] text-white font-sans overflow-x-hidden relative pb-20">
      
      {/* Toast Notification */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-cream px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce border border-cream/30">
          <Check size={18} />
          <span className="text-sm font-bold">{addedNotice} ditambahkan ke pesanan!</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <header className="relative bg-secondary pt-12 pb-16 px-4 sm:px-10 text-center border-b border-cream/20">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-cream/70 hover:text-cream mb-6 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Halaman Utama
          </Link>
          <h1 className="text-5xl sm:text-7xl font-script text-cream drop-shadow-lg mb-2">Our Products</h1>
          <p className="text-cream/90 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            High-Quality Poultry & Fresh Catfish for Your Every Need
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        
        {/* CHICKEN SECTION */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white text-secondary p-6 rounded-2xl shadow-xl mb-8 border-l-8 border-primary">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🐔</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-900">PREMIUM CHICKEN</h2>
              </div>
              <p className="text-sm text-gray-600 font-semibold ml-10">Ayam Potong</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-primary text-cream text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">100% Halal</span>
              <span className="bg-primary text-cream text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">Fresh Daily</span>
              <span className="bg-primary text-cream text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">Hygienic Process</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.filter(p => p.category === 'chicken').map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
                <div className="p-4 flex flex-col items-center">
                  <img src={product.image} alt={product.nameEn} className="w-28 h-28 object-contain mb-3 group-hover:scale-105 transition-transform" />
                  <h3 className="font-bold text-gray-900 text-xs text-center leading-tight">{product.nameEn}</h3>
                  <p className="text-[10px] text-gray-500 text-center">{product.nameId}</p>
                  <span className="text-xs font-black text-primary mt-2">Rp {product.price.toLocaleString('id-ID')}/{product.unit}</span>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="w-full bg-primary hover:bg-primary-hover text-cream py-2 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShoppingCart size={12} /> Tambah Ke Pesanan
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FORM HALAMAN PEMESANAN */}
        <section id="order-form" className="bg-white text-gray-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-primary">
          <div className="border-b border-gray-200 pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-gray-900 flex items-center justify-center sm:justify-start gap-3">
                <FileText className="text-primary" size={32} />
                Form Pemesanan Produk
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Lengkapi data di bawah ini untuk langsung terhubung dan mengirimkan pesanan ke WhatsApp mitra.
              </p>
            </div>
            <div className="bg-cream/40 text-primary px-4 py-2 rounded-xl text-xs font-bold border border-cream">
              Total Dipilih: {cart.reduce((sum, item) => sum + item.quantity, 0)} Item
            </div>
          </div>

          <form onSubmit={handleOrderViaWhatsApp} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* KIRI: Ringkasan Produk Dipilih */}
            <div className="lg:col-span-5 bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingCart size={18} className="text-primary" />
                  Ringkasan Pesanan Anda
                </h3>

                {cart.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300 p-6">
                    <ShoppingCart size={40} className="mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-semibold">Belum ada produk yang dipilih.</p>
                    <p className="text-[10px] text-gray-400 mt-1">Klik tombol "Tambah Ke Pesanan" pada produk di atas.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item.product.id} className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-3 shadow-sm">
                        <img src={item.product.image} alt={item.product.nameEn} className="w-12 h-12 object-contain bg-gray-50 rounded p-1" />
                        <div className="flex-1">
                          <h4 className="font-bold text-xs text-gray-800">{item.product.nameEn}</h4>
                          <p className="text-[10px] text-gray-500">Rp {item.product.price.toLocaleString('id-ID')}/{item.product.unit}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button type="button" onClick={() => updateQuantity(item.product.id, -1)} className="w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-xs font-bold cursor-pointer">-</button>
                            <span className="text-xs font-bold">{item.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.product.id, 1)} className="w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-xs font-bold cursor-pointer">+</button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-xs text-primary">Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}</span>
                          <button type="button" onClick={() => removeFromCart(item.product.id)} className="block text-gray-400 hover:text-primary mt-1 ml-auto cursor-pointer">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6">
                <div className="flex justify-between items-center text-gray-900">
                  <span className="font-bold text-sm">Total Estimasi:</span>
                  <span className="text-xl font-black text-primary">Rp {totalAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* KANAN: Form Input Pengiriman */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2 mb-2">
                  <User size={18} className="text-primary" />
                  Data Pemesan & Alamat Pengiriman
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">No. WhatsApp / Telepon *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Pengiriman Lengkap *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Nama Jalan, Nomor Rumah, RT/RW, Kecamatan, Kota"
                    value={customerInfo.address}
                    onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50 resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Opsi Pembayaran</label>
                    <select
                      value={customerInfo.paymentMethod}
                      onChange={e => setCustomerInfo({...customerInfo, paymentMethod: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                    >
                      <option value="Transfer Bank (BCA/Mandiri)">Transfer Bank (BCA/Mandiri)</option>
                      <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                      <option value="E-Wallet (Gopay/OVO/Dana)">E-Wallet (Gopay/OVO/Dana)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Catatan Tambahan (Opsional)</label>
                    <input
                      type="text"
                      placeholder="Contoh: Tolong potong ayam jadi 8 bagian"
                      value={customerInfo.notes}
                      onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* TOMBOL AKSI UTAMA DENGAN AKSI REDIRECT KE WA */}
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-green-600 active:scale-95 text-white py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all mt-6 cursor-pointer"
              >
                <Send size={20} /> Kirim Pesanan via WhatsApp
              </button>
            </div>

          </form>
        </section>

      </div>

    </main>
  );
}