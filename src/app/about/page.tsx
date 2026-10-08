import Header from '@/components/Header';
import { 
  CheckCircle, 
  Globe, 
  Building2, 
  Award,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function AboutUsPage() {
  const historyData = [
    { year: "2010", title: "Didirikan", desc: "Awal mula berdirinya peternakan dengan standar penyediaan daging ayam berkualitas.", icon: <Building2 size={24} className="text-brand-red" /> },
    { year: "2015", title: "Ekspansi Fasilitas", desc: "Memperluas area peternakan dan menambah kapasitas produksi untuk memenuhi permintaan.", icon: <Globe size={24} className="text-brand-red" /> },
    { year: "2015", title: "Sertifikasi Global", desc: "Mendapatkan pengakuan atas standar operasional dan kualitas manajemen mutu.", icon: <CheckCircle size={24} className="text-brand-red" /> },
    { year: "2020", title: "Sertifikasi Global", desc: "Sertifikasi keamanan pangan internasional untuk ekspansi jaringan logistik global.", icon: <Award size={24} className="text-brand-red" /> },
  ];

  return (
    <main className="w-full relative bg-brand-dark min-h-screen">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 px-10 md:px-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/dark-texture.png')] bg-cover mix-blend-overlay"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 animate-fade-in-up">
            <h1 className="text-white text-6xl md:text-7xl font-script leading-tight mb-2 drop-shadow-md">Tentang Kami</h1>
            <h2 className="text-white text-4xl md:text-5xl font-script leading-tight opacity-90 drop-shadow-md">- Think Chicken?<br/><span className="pl-8">Think Us!</span></h2>
          </div>
          <div className="md:w-1/2 flex justify-end mt-10 md:mt-0 animate-float">
            <img src="/images/about-hero-chicken.png" alt="Raw Chicken with Spices" className="w-full max-w-lg drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRO TEXT */}
      <section className="bg-brand-dark py-12 px-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center border-t border-gray-700 pt-12">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 opacity-90">
            <strong className="text-white">PT. Agung Sukses Farm Fresh</strong> adalah pemimpin dalam penyediaan daging ayam berkualitas tinggi. Kami berkomitmen dalam penyediaan produk segar dan aman, menerapkan standar modern untuk memastikan keamanan dan kualitas daging ayam yang kami suplai.
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed opacity-90">
            Visi kami adalah menjadi penyedia unggas terpercaya dengan jaringan logistik yang aman, inovatif, dan menjunjung tinggi kualitas dari hulu ke hilir untuk pemenuhan kebutuhan mitra kami.
          </p>
        </div>
      </section>

      {/* 3. SEJARAH KAMI[cite: 6] */}
      <section className="bg-brand-dark pt-16 pb-32 px-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-5xl md:text-6xl font-script text-center mb-16 drop-shadow-lg">Sejarah Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {historyData.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6 border border-red-100">
                  {item.icon}
                </div>
                <h3 className="text-brand-red font-bold text-2xl mb-1">{item.year}</h3>
                <h4 className="text-brand-dark font-bold text-lg mb-3">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TIM DAN KOMITMEN[cite: 6] */}
      <section className="bg-brand-red py-24 px-10 relative text-center">
        <h2 className="text-white text-5xl md:text-6xl font-script mb-16 drop-shadow-md">Tim dan Komitmen</h2>
        <div className="max-w-4xl mx-auto relative flex justify-center items-end">
          {/* Background Siluet Tim */}
          <img src="/images/team-silhouette.png" alt="Team Silhouettes" className="w-full opacity-60 mix-blend-multiply" />
          {/* Maskot Ayam di Tengah/Depan */}
          <img src="/images/chicken-mascot-pointing.png" alt="Mascot" className="absolute -bottom-10 left-1/4 w-64 drop-shadow-2xl hover:scale-105 transition-transform" />
        </div>
      </section>

      {/* 5. PIMPINAN MANAJEMEN[cite: 6] */}
      <section className="bg-white py-24 px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-brand-dark text-5xl md:text-6xl font-script mb-16">Pimpinan Manajemen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {['Direktur Utama', 'Kepala Pemrosesan', 'Manajer Kualitas'].map((title, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 flex flex-col items-center hover:-translate-y-2 transition-transform">
                <img src={`/images/profile-placeholder-${idx+1}.jpg`} alt={title} className="w-32 h-32 rounded-full object-cover mb-6 shadow-md border-4 border-white" />
                <h4 className="font-bold text-brand-dark text-lg">{title}</h4>
                <p className="text-gray-500 text-sm mt-1">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STANDAR KUALITAS & KEAMANAN[cite: 6] */}
      <section className="bg-gray-50 py-24 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-brand-dark text-5xl md:text-6xl font-script mb-10 leading-tight">Standar Kualitas<br/>& Keamanan</h2>
            <div className="flex gap-4 mb-8">
               {/* Icon Sertifikasi Placeholder */}
               <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 text-xs font-bold text-green-700">HALAL</div>
               <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 text-xs font-bold text-blue-700">ISO</div>
               <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 text-xs font-bold text-gray-700">GMP</div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-brand-red pl-4">
              Kontrol ketat dalam fasilitasi proses kami berstandar sertifikasi internasional. Kami memastikan keamanan mutu dan higienitas pada setiap tahap pemrosesan produk.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="/images/chicken-meat-quality.png" alt="Quality Chicken Meat" className="w-full rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}