import { Phone, MapPin, Mail, ChevronRight} from 'lucide-react';

import { ImageFallback } from '@/lib/ImageFallback';

export default function Home() {
  const wholesaleItems = [
    { id: 1, name: "Whole Chicken", sub: "Premium Grade Quality", image: "/images/whole-chicken.png" },
    { id: 2, name: "Wings", sub: "Fresh Cut Daily", image: "/images/wings.png" },
    { id: 3, name: "Breasts", sub: "Skinless Boneless", image: "/images/breasts.png" },
    { id: 4, name: "Catfish Fillets", sub: "Farm Raised Fresh", image: "/images/catfish-fillet.png" },
    { id: 5, name: "Catfish Steaks", sub: "Thick Cut Prime", image: "/images/catfish-steak.png" },
    { id: 6, name: "Cubed Catfish", sub: "Ready to Cook", image: "/images/catfish-cubed.png" },
  ];
  return (
    <main className="w-full relative">
      <section className="relative bg-[#111111] pt-20 pb-32 px-16 flex justify-center min-h-[85vh] border-t-[12px] border-brand-dark">
        <div className="absolute inset-0 opacity-40 bg-[url('/images/dark-texture.png')] bg-cover mix-blend-overlay"></div>

        {/* Social Media Kiri */}
        {/* <div className="absolute left-6 top-1/3 flex flex-col gap-6 text-white text-sm z-20">
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-[#E60000] transition-colors cursor-pointer">
            <Facebook size={14} />
          </div>
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-[#E60000] transition-colors cursor-pointer">
            <Twitter size={14} />
          </div>
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-[#E60000] transition-colors cursor-pointer">
            <Instagram size={14} />
          </div>
        </div> */}

        {/* Pagination Dots Kanan */}
        <div className="absolute right-6 top-1/3 flex flex-col gap-3 z-20">
          <div className="w-2 h-2 rounded-full bg-[#E60000]"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mt-10">
          {/* Tipografi Hero */}
          <div className="text-center animate-fade-in-up flex flex-col items-center">
            <h1 className="text-white text-[6rem] font-script leading-none drop-shadow-2xl z-20 -mb-4">
              Think Quality?
            </h1>
            <div className="inline-block bg-[#E60000] text-white px-10 py-2 rounded-[40px] transform -rotate-2 shadow-2xl z-10">
              <h2 className="text-[5.5rem] font-script leading-none">
                Think Chicken
              </h2>
            </div>
            <h1 className="text-white text-[6rem] font-script leading-none drop-shadow-2xl z-20 -mt-6">
              & Catfish.
            </h1>
          </div>

          {/* Gambar Ayam & Lele */}
          <div className="relative mt-[-40px] w-full flex justify-center z-30 animate-float">
            <img
              src="/images/chicken-catfish-board.png"
              alt="Raw Chicken and Catfish on Wooden Board"
              className="w-full max-w-3xl drop-shadow-[0_30px_30px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </section>

      {/* ================= WELCOME SECTION ================= */}
      <section className="bg-[#111111] text-white pt-10 pb-24 px-16 flex justify-center relative z-20 border-t border-white/10">
        <div className="flex items-center justify-between max-w-5xl w-full">
          {/* Teks Welcome */}
          <div className="w-3/5 pr-12 text-center md:text-left">
            <h3 className="text-[#E60000] text-[5rem] font-script mb-6 drop-shadow-lg leading-none">
              Welcome...
            </h3>
            <p className="text-[#E60000] text-xs font-bold leading-relaxed mb-4">
              Welcome to [Company Name] - Premium wholesale supplier of fresh &
              frozen poultry and seafood.
              <br />
              Your Trusted Partner for Premium Chicken and Fresh Catfish Supply.
            </p>
            <p className="text-gray-400 text-[11px] leading-relaxed opacity-80">
              We take pride in delivering the highest quality products to our
              customers. Our robust supply chain ensures that whether you are
              ordering tender chicken or fresh catfish, you receive the best
              produce directly from trusted farms to your business at highly
              competitive rates.
            </p>
          </div>

          {/* Maskot Ayam Bawa Papan Ikan */}
          <div className="w-2/5 flex justify-end relative">
            {/* Outline siluet chef di background maskot */}
            <img
              src="/images/chef-sketch-bg.png"
              className="absolute -z-10 opacity-10 w-full top-10 right-0 pointer-events-none"
              alt=""
            />
            <img
              src="/images/mascot-fish-sign.png"
              alt="Chicken Mascot holding Fish Sign"
              className="w-80 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* ================= ONLINE WHOLESALE SECTION ================= */}
      <section
        id="products"
        className="bg-white relative z-10 pt-20 pb-32 px-10 overflow-hidden"
      >
        {/* Ornamen Merah Kiri Atas */}
        <img
          src="/images/red-swirl-ornament.png"
          alt=""
          className="absolute top-0 left-0 w-48 opacity-90"
        />
        {/* Ornamen Jaring Ikan Kanan Bawah */}
        <img
          src="/images/fishing-net.png"
          alt=""
          className="absolute bottom-0 right-0 w-72 opacity-20"
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative z-10">
          {/* Kiri: Teks & Peta */}
          <div className="md:w-1/3 flex flex-col">
            <div className="flex items-center gap-4 mb-6 mt-10">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white relative z-10">
                <img
                  src="/images/chicken-head-circle.png"
                  alt="Chicken Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h2 className="text-[4.5rem] font-script text-brand-dark leading-[0.9] -ml-6 z-0">
                Online <br />
                <span className="text-[#E60000]">Wholesale</span>
              </h2>
            </div>

            <div className="bg-brand-dark text-white px-6 py-2 rounded-full text-xs font-bold w-fit mb-8 shadow-lg">
              Poultry & Fish Supplier
            </div>

            <p className="text-gray-600 text-[11px] mb-4 leading-relaxed font-semibold">
              The finest selection of farm-fresh poultry and premium catfish,
              sourced locally for guaranteed freshness.
            </p>
            <p className="text-gray-500 text-[10px] mb-8 leading-relaxed">
              We guarantee the best value for your wholesale needs. Fast
              delivery, strict quality control, and excellent customer service
              are our top priorities. Order now and get the freshest items
              straight to your doorstep.
            </p>

            <button className="bg-[#E60000] text-white w-fit px-8 py-2.5 rounded-full text-[11px] font-bold shadow-lg hover:bg-red-800 transition-colors flex items-center gap-2 mb-10">
              View All Products <ChevronRight size={14} />
            </button>

            {/* Peta Siluet Hitam */}
            <img
              src="/images/black-map-silhouette.png"
              alt="Map"
              className="w-full max-w-[250px] opacity-90"
            />
          </div>

          {/* Kanan: Grid Produk 3x2 */}
          <div className="md:w-2/3 flex flex-col">
            <h3 className="text-center font-script text-4xl mb-8 text-brand-dark relative">
              <span className="bg-white px-6 relative z-10">
                Fresh Chicken & Fish
              </span>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-0"></div>
            </h3>

            <div className="grid grid-cols-3 gap-6">
              {wholesaleItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-end bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300"
                >
                  {/* Badge Hitam S&K */}
                  <div className="absolute top-0 right-4 bg-brand-dark text-white text-[8px] font-bold px-2 py-2 rounded-b-md z-10 text-center">
                    S&K
                    <br />
                    APPLY
                  </div>
                  {/* Gambar Produk */}
                  <div className="p-6 flex justify-center items-center h-40 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                    />
                  </div>
                  {/* Box Merah */}
                  <div className="bg-[#E60000] text-white p-3 text-center min-h-[70px] flex flex-col justify-center">
                    <h4 className="font-bold text-xs tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-[8px] opacity-80 mt-1 leading-tight">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner Teks di Bawah Grid */}
            <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
              <div className="md:w-3/4">
                <h4 className="text-brand-dark font-bold text-lg leading-tight mb-2">
                  Sourcing Directly from Local
                  <br />
                  Poultry Farms and Catfish Ponds
                  <br />
                  for Guaranteed Freshness.
                </h4>
              </div>
              <button className="bg-[#E60000] text-white px-6 py-2 rounded-full text-[10px] font-bold shadow-md whitespace-nowrap">
                View All Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOGISTICS SECTION ================= */}
      <section
        id="logistics"
        className="bg-[#15161A] text-white py-24 px-16 relative overflow-hidden"
      >
        {/* Background Sketch Ayam */}
        <img
          src="/images/chicken-sketch-dark.png"
          alt=""
          className="absolute right-0 top-0 h-full opacity-10 pointer-events-none"
        />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          {/* Kiri: Kardus & Ayam Mentah */}
          <div className="md:w-5/12 flex justify-center relative">
            <img
              src="/images/logistics-boxes-chicken.png"
              alt="Cardboard Boxes with Raw Chicken"
              className="w-full max-w-sm drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Kanan: Teks Logistics */}
          <div className="md:w-7/12">
            <h2 className="text-[#E60000] text-[5rem] font-script mb-6 drop-shadow-md leading-none">
              Logistics
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed mb-4 pr-12">
              Providing top-tier cold chain logistics to ensure our poultry and
              seafood products arrive in pristine condition. We manage a robust
              fleet dedicated to timely and safe deliveries across the region.
            </p>
            <p className="text-gray-400 text-xs leading-relaxed mb-8 pr-12 opacity-80">
              Our transport systems maintain strict temperature controls,
              ensuring that every batch of chicken and catfish retains its
              guaranteed freshness from our facilities straight to your
              establishment.
            </p>
            <button className="bg-white text-[#E60000] px-8 py-2.5 rounded-full text-[11px] font-bold hover:bg-[#E60000] hover:text-white transition-colors shadow-lg flex items-center gap-2">
              Logistics <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
