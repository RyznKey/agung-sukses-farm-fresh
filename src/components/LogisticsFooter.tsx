export default function LogisticsFooter() {
  return (
    <div className="flex flex-col relative z-0">
      {/* Area Logistics Hitam Miring[cite: 5] */}
      <section
        id="logistics"
        className="bg-brand-dark text-white py-40 px-16 -skew-y-3 -mt-20 pb-48"
      >
        <div className="max-w-6xl mx-auto flex items-center gap-16 skew-y-3">
          <div className="w-1/2 flex justify-center relative">
            <img
              src="/images/logistics-boxes.png"
              alt="Chicken Delivery Boxes"
              className="w-full max-w-md drop-shadow-2xl hover:scale-105 transition-transform duration-500 relative z-10"
            />
            {/* Siluet Ayam Latar Belakang[cite: 5] */}
            <img
              src="/images/chicken-silhouette.png"
              alt="Silhouette"
              className="absolute -right-10 bottom-0 opacity-10 w-64 grayscale pointer-events-none"
            />
          </div>
          <div className="w-1/2 pl-10">
            <h2 className="text-brand-red text-[4rem] font-script mb-6 drop-shadow-md">
              Logistics
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed mb-8 pr-12">
              A smooth and secure supply chain ensures our poultry products
              arrive fresh and on time. We handle bulk and wholesale delivery
              efficiently to your doorstep.
            </p>
            <button className="bg-brand-red text-white px-8 py-3 rounded-full text-[11px] font-bold hover:bg-white hover:text-brand-red transition-colors shadow-lg flex items-center gap-2">
              Read More <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Merah dengan Banner Brands Putih Oval[cite: 5] */}
      <section className="bg-brand-red pt-36 pb-16 px-16 relative -mt-24">
        {/* Banner Oval 'Our Brands'[cite: 5] */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-10/12 max-w-5xl rounded-[60px] py-8 px-16 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-between z-20">
          <h3 className="text-brand-red text-[4rem] font-script leading-none">
            Our
            <br />
            <span className="text-[3rem]">Brands</span>
          </h3>
          <div className="flex gap-10 items-center">
            {/* Placeholder Logos[cite: 5] */}
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Konten Footer Bawah[cite: 5] */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/20 pb-12 mb-8">
          <div className="col-span-1">
            <div className="w-24 h-12 bg-white rounded flex items-center justify-center font-bold text-brand-dark mb-6">
              LOGO
            </div>
            <p className="text-[11px] opacity-80 leading-relaxed">
              PT. Agung Sukses Farm Fresh.
              <br />
              Menyediakan produk olahan ayam terpercaya dengan komitmen mutu dan
              higienitas tinggi.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase mb-6 tracking-widest">
              Sitemap
            </h4>
            <ul className="text-[11px] space-y-3 opacity-80">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Brands
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Logistics
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase mb-6 tracking-widest">
              Certifications
            </h4>
            <div className="grid grid-cols-3 gap-2 w-3/4">
              <div className="w-10 h-10 bg-white rounded shadow-sm"></div>
              <div className="w-10 h-10 bg-white rounded shadow-sm"></div>
              <div className="w-10 h-10 bg-white rounded shadow-sm"></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase mb-6 tracking-widest">
              Get In Touch
            </h4>
            <p className="text-[11px] opacity-80 mb-2 font-bold">
              +65 11 4849-3550
            </p>
            <p className="text-[11px] opacity-80 leading-relaxed">
              Jalan Peternakan Raya No. 123,
              <br />
              Kawasan Industri, Indonesia
            </p>
          </div>
        </div>
        <div className="text-center text-[10px] opacity-70 font-sans">
          &copy; {new Date().getFullYear()} PT. Agung Sukses Farm Fresh. All
          rights reserved.
        </div>
      </section>
    </div>
  );
}
