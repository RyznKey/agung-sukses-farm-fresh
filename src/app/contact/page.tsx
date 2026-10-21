"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowLeft, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Nomor WhatsApp tujuan bisnis
  const targetWhatsappNumber = "6281123456789";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      alert("Mohon isi Nama Lengkap, Nomor WhatsApp, dan Pesan Anda!");
      return;
    }

    // Format template pesan pesan ke WA
    const messageTemplate = 
`Halo *Agung Sukses Farm Fresh*, saya ingin mengirimkan pertanyaan/pesan:

----------------------------------
*DETAIL PESAN / PERTANYAAN:*
• Nama Lengkap: ${formData.name}
• Email: ${formData.email || '-'}
• No. WhatsApp: ${formData.phone}

*Pesan:*
"${formData.message}"
----------------------------------
Mohon tanggapannya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(messageTemplate);
    const waUrl = `https://wa.me/${targetWhatsappNumber}?text=${encodedMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank');
  };

  return (
    <main className="w-full min-h-screen bg-[#0F1012] text-white font-sans overflow-x-hidden relative pb-16">
      
      {/* Tombol Kembali ke Beranda */}
      <div className="absolute top-6 left-6 z-30">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold bg-black/50 hover:bg-[#E60000] text-white px-4 py-2 rounded-full border border-white/20 transition-all backdrop-blur-sm"
        >
          <ArrowLeft size={16} /> Kembali ke Halaman Utama
        </Link>
      </div>

      {/* ================= 1. HERO / BANNER HEADER ================= */}
      <section className="relative bg-[#111111] pt-20 pb-16 px-6 sm:px-12 text-center overflow-hidden border-b-8 border-[#E60000]">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/dark-texture.png')] bg-cover mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl sm:text-7xl font-script text-white drop-shadow-lg mb-3">
            Hubungi Kami
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Kami Siap Melayani Kebutuhan Ayam & Lele Terbaik Anda
          </p>
        </div>
      </section>

      {/* ================= 2. MAIN CONTENT GRID (Dua Sisi: Kiri Putih & Kanan Merah) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        <div className="bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border-4 border-[#E60000]">
          
          {/* ================= SISI KIRI: INFORMASI KONTAK & JAM OPERASIONAL ================= */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between relative bg-white">
            
            {/* Header Judul Kiri */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                {/* Ornamen Merah Kiri */}
                <div className="w-3 h-10 bg-[#E60000] rounded-full"></div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Hubungi Kami
                </h2>
              </div>

              {/* Daftar Informasi Kontak */}
              <div className="space-y-6 mb-10">
                
                {/* Telepon / WA */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E60000] text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-tight">
                      +62 811-2345-6789
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-0.5">
                      Hubungi kami via chat atau telepon
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E60000] text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-tight">
                      info@ayandaleleterbaik.com
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-0.5">
                      Kirimkan pertanyaan Anda
                    </p>
                  </div>
                </div>

                {/* Alamat Kantor */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E60000] text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base sm:text-lg leading-tight">
                      Jl. Raya Industri No. 45, Jakarta, Indonesia
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-0.5">
                      Kunjungi kantor & gudang kami
                    </p>
                  </div>
                </div>

              </div>

              {/* Jam Operasional */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-extrabold text-gray-900 text-xl mb-4">
                  Jam Operasional
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E60000] text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30">
                    <Clock size={22} />
                  </div>
                  <div className="text-gray-800 text-sm font-bold space-y-1 pt-1">
                    <p>Senin - Sabtu: <span className="font-semibold text-gray-600">08.00 - 17.00 WIB</span></p>
                    <p>Minggu: <span className="text-[#E60000]">Tutup</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ilustrasi Maskot Ayam & Ikan Lele di Bawah Kiri */}
            <div className="mt-8 pt-4 flex items-end justify-between relative min-h-[140px]">
              <img 
                src="/images/mascot-chicken-phone.png" 
                alt="Maskot Ayam Telepon" 
                className="w-32 sm:w-40 object-contain drop-shadow-xl z-10" 
              />
              <img 
                src="/images/fresh-catfish-illustration.png" 
                alt="Ilustrasi Ikan Lele" 
                className="w-40 sm:w-56 object-contain drop-shadow-xl -ml-6" 
              />
            </div>

          </div>

          {/* ================= SISI KANAN: FORM KIRIM PESAN & MAP LOKASI ================= */}
          <div className="lg:col-span-6 bg-[#E60000] text-white p-6 sm:p-10 flex flex-col justify-between relative">
            
            {/* 1. Kirim Pesan Form */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                {/* Ornamen Elemen Angin / Gelombang */}
                <div className="text-white text-3xl font-bold">💨</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Kirim Pesan
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Nama Lengkap & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Nama Lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white text-gray-900 font-semibold placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-black/30 shadow-md"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white text-gray-900 font-semibold placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-black/30 shadow-md"
                  />
                </div>

                {/* Row 2: Nomor WhatsApp */}
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Nomor WhatsApp"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-900 font-semibold placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-black/30 shadow-md"
                />

                {/* Row 3: Pesan Anda */}
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-900 font-semibold placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-black/30 shadow-md resize-none"
                ></textarea>

                {/* Tombol Send Message */}
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 active:scale-95 text-[#E60000] font-black tracking-wider text-base sm:text-lg py-3.5 rounded-full shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                >
                  <Send size={20} /> SEND MESSAGE
                </button>
              </form>
            </div>

            {/* 2. Lokasi Kami (Google Maps Container) */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <h3 className="font-extrabold text-white text-2xl mb-4">
                Lokasi Kami
              </h3>

              {/* Map Box Component */}
              <div className="relative w-full h-48 sm:h-56 bg-gray-200 rounded-2xl overflow-hidden shadow-2xl border-2 border-white">
                
                {/* Embed Google Maps / Placeholder Map */}
                <iframe
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.3453525356113!2d109.2887025!3d-7.426980400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65595b020641c7%3A0xd47c2394eb6ad9d4!2sMega%20Cemerlang%20Purwokerto!5e0!3m2!1sid!2sid!4v1792583304463!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Badge Pin Kantor & Gudang Kami */}
                <div className="absolute top-3 right-3 bg-[#E60000] text-white px-3 py-1.5 rounded-lg text-xs font-black shadow-lg flex items-center gap-1.5 border border-white">
                  <MapPin size={14} /> KANTOR & GUDANG KAMI
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  );
}