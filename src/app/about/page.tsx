"use client";

import Link from 'next/link';
import { 
  ArrowLeft, 
  Store, 
  Users, 
  Fish, 
  Globe, 
  Target, 
  Eye, 
  ThumbsUp, 
  ShieldCheck, 
  Handshake, 
  Lightbulb 
} from 'lucide-react';

export default function AboutPage() {
  // Data Sejarah & Jejak Langkah Kami
  const timelineData = [
    {
      year: "2024",
      title: "Awal Mula",
      desc: "Perusahaan didirikan sebagai peternakan ayam potong skala kecil yang fokus pada kualitas.",
      icon: <Store size={22} className="text-white" />
    },
    // {
    //   year: "2018",
    //   title: "Ekspansi Pasar",
    //   desc: "Mulai menyuplai ke berbagai pasar tradisional, restoran, dan industri kuliner skala menengah.",
    //   icon: <Users size={22} className="text-white" />
    // },
    // {
    //   year: "2021",
    //   title: "Budidaya Lele",
    //   desc: "Memperluas bisnis dengan membuka fasilitas budidaya ikan lele modern dan higienis.",
    //   icon: <Fish size={22} className="text-white" />
    // },
    {
      year: "2025",
      title: "Go Digital & Distribusi Luas",
      desc: "Mengadopsi teknologi distribusi modern untuk menjangkau pelanggan lebih luas secara online dan offline.",
      icon: <Globe size={22} className="text-white" />
    }
  ];

  // Data Nilai-Nilai Utama Kami
  const valuesData = [
    {
      title: "Kualitas Terbaik",
      desc: "Hanya menyediakan ayam dan lele yang sehat, segar, dan diproses dengan standar ketat.",
      icon: <ThumbsUp size={32} className="text-[#E60000]" />
    },
    {
      title: "Higienis & Halal",
      desc: "Seluruh proses dari kandang/kolam hingga ke tangan konsumen dijamin bersih, higienis, dan 100% halal.",
      icon: <ShieldCheck size={32} className="text-[#E60000]" />
    },
    {
      title: "Mitra Terpercaya",
      desc: "Membangun hubungan yang erat dan jujur dengan para pelanggan, mitra, dan peternak lokal.",
      icon: <Handshake size={32} className="text-[#E60000]" />
    },
    {
      title: "Inovasi & Keberlanjutan",
      desc: "Menggunakan metode peternakan dan budidaya yang ramah lingkungan serta adaptif terhadap teknologi.",
      icon: <Lightbulb size={32} className="text-[#E60000]" />
    }
  ];

  // Data Tim Kami & Dedikasi
  const teamData = [
    {
      name: "Direktur Utama",
      role: "Direktur Utama",
      image: "/images/team-1.jpg"
    },
    {
      name: "Kepala Operasional",
      role: "Kepala Operasional",
      image: "/images/team-2.jpg"
    },
    {
      name: "Kepala Pemrosesan",
      role: "Kepala Pemrosesan",
      image: "/images/team-3.jpg"
    },
    {
      name: "Quality Control",
      role: "Quality Control",
      image: "/images/team-4.jpg"
    }
  ];

  return (
    <main className="w-full min-h-screen bg-[#0F1012] text-white font-sans overflow-x-hidden relative pb-12">
      
      {/* Tombol Navigasi Kembali */}
      <div className="absolute top-6 left-6 z-30">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold bg-black/50 hover:bg-[#E60000] text-white px-4 py-2 rounded-full border border-white/20 transition-all backdrop-blur-sm">
          <ArrowLeft size={16} /> Kembali ke Halaman Utama
        </Link>
      </div>

      {/* ================= 1. HERO / TENTANG KAMI SECTION ================= */}
      <section className="relative bg-[#111111] pt-20 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden border-b-8 border-[#E60000]">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Teks Kiri */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl sm:text-7xl font-script text-white drop-shadow-lg mb-4">
              Tentang Kami
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
              Cerita & Dedikasi Kami untuk Menyediakan Ayam & Lele Terbaik
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-90">
              Sejarah singkat perusahaan yang lahir dari dedikasi untuk ayam dan lele dari perusahaan untuk memenuhi kebutuhan pangan masyarakat dengan produk segar dan higienis.
            </p>
          </div>

          {/* Ilustrasi Isometrik Peternakan Ayam & Kolam Lele Kanan */}
          {/* <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative max-w-lg w-full">
              <img 
                src="/images/farm-illustration-3d.png" 
                alt="Peternakan Ayam dan Kolam Lele Isometrik" 
                className="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transform hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div> */}
        </div>
      </section>

      {/* ================= 2. SEJARAH & JEJAK LANGKAH KAMI SECTION ================= */}
      <section className="bg-white text-gray-900 py-20 px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 text-center lg:text-left mb-16 uppercase tracking-tight">
            Sejarah & Jejak Langkah Kami
          </h2>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Garis Horizontal Penghubung (Desktop) */}
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-1 bg-red-200 -z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative z-10">
              {timelineData.map((item, index) => (
                <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                  {/* Icon Circle Red */}
                  <div className="w-12 h-12 rounded-full bg-[#E60000] shadow-lg shadow-red-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  {/* Year & Title */}
                  <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 mb-2">
                    {item.year} - {item.title}
                  </h3>
                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. VISI & MISI KAMI SECTION ================= */}
      <section className="bg-[#111111] text-white py-20 px-6 sm:px-12 lg:px-20 relative overflow-hidden -skew-y-1">
        <div className="max-w-7xl mx-auto skew-y-1">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white text-center lg:text-left mb-12 uppercase tracking-tight">
            Visi & Misi Kami
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* VISI */}
            <div className="flex items-start gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-[#E60000] flex items-center justify-center shrink-0 shadow-lg">
                <Eye size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-3 text-white">Visi</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Menjadi penyedia produk ayam potong dan ikan lele segar terpercaya nomor satu yang mengedepankan kualitas, higienitas, dan keberlanjutan untuk masyarakat luas.
                </p>
              </div>
            </div>

            {/* MISI */}
            <div className="flex items-start gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-[#E60000] flex items-center justify-center shrink-0 shadow-lg">
                <Target size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-3 text-white">Misi</h3>
                <ul className="text-gray-300 text-xs sm:text-sm space-y-2 list-disc list-inside leading-relaxed">
                  <li>Menerapkan standar peternakan dan budidaya yang higienis.</li>
                  <li>Memberikan pelayanan terbaik dengan pengiriman cepat.</li>
                  <li>Mendukung keberlanjutan pangan lokal dan bermitra dengan peternak lokal.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. NILAI-NILAI UTAMA KAMI SECTION ================= */}
      <section className="bg-white text-gray-900 py-20 px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 text-center lg:text-left mb-16 uppercase tracking-tight">
            Nilai-Nilai Utama Kami
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesData.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="p-4 rounded-full bg-red-50 mb-6 group-hover:bg-[#E60000] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-lg text-gray-900 mb-3">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. TIM KAMI & DEDIKASI SECTION ================= */}
      {/* <section className="bg-[#111111] text-white py-20 px-6 sm:px-12 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12"> */}
          
          {/* Teks Kiri */}
          {/* <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 uppercase leading-none">
              Tim Kami <br />
              <span className="text-[#E60000]">& Dedikasi</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Yang hangat, menuntun perusahaan pada penelitian kemajuan kawasan dedikasi untuk tumbuh bersama us!
            </p>
          </div> */}

          {/* Foto Anggota Tim Kanan */}
          {/* <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {teamData.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#E60000] shadow-2xl mb-4 group-hover:scale-105 transition-transform">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-sm text-white">{member.name}</h3>
                <p className="text-[11px] text-gray-400">{member.role}</p>
              </div>
            ))}
          </div> */}

        {/* </div>
      </section> */}

    </main>
  );
}