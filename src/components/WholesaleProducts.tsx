export default function WholesaleProducts() {
  const products = [
    { id: 1, name: "Whole Chicken", sub: "Broiler", image: "/images/whole-chicken.png" },
    { id: 2, name: "Boneless Wings", sub: "Skinless/Skin On", image: "/images/wings.png" },
    { id: 3, name: "Skinless Boneless", sub: "Chicken Breast", image: "/images/breast-1.png" },
    { id: 4, name: "Skinless Boneless", sub: "Breast Without Inner Fillet", image: "/images/breast-2.png" },
  ];

  return (
    <section id="products" className="bg-white relative z-10 skew-y-3 pb-24 shadow-2xl">
      <div className="flex flex-col md:flex-row -skew-y-3">
        
        {/* Sisi Kiri: Latar Merah Muda[cite: 5] */}
        <div className="md:w-5/12 bg-brand-pink pt-40 pb-28 px-16 flex flex-col justify-center rounded-br-[100px]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-brand-red">
               <img src="/images/chicken-logo-circle.png" alt="Chicken Logo" className="w-16 h-16" />
            </div>
            <h2 className="text-6xl font-script text-brand-dark leading-[1.1]">
              Online <br/>
              <span className="text-brand-red">Wholesale</span>
            </h2>
          </div>
          
          <div className="bg-brand-dark text-white px-5 py-1.5 rounded-full text-[10px] font-bold w-fit mb-8 shadow-md tracking-wider">
            FROZEN CHICKEN SUPPLIER
          </div>
          
          <p className="text-gray-600 text-xs mb-8 leading-relaxed pr-10">
            We are one of the renowned halal chicken suppliers in the city... We aim to deliver prime quality goods through our robust supply chain before serving it to you.
          </p>
          
          <button className="bg-brand-red text-white w-fit px-8 py-3 rounded-full text-[11px] font-bold shadow-lg hover:bg-red-800 transition-colors flex items-center gap-3 group">
            View All Products <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Sisi Kanan: Grid Produk Putih[cite: 5] */}
        <div className="md:w-7/12 pt-40 pb-20 px-16 grid grid-cols-2 gap-x-10 gap-y-14 bg-white">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col justify-end bg-white border border-gray-100 rounded-lg shadow-xl hover:-translate-y-2 transition-transform duration-300">
              {/* Badge Diskon Hitam[cite: 5] */}
              <div className="absolute top-0 right-4 bg-brand-dark text-white text-[9px] font-bold px-2 py-3 rounded-b-sm z-10 text-center leading-tight">
                20%<br/>OFF
              </div>

              <div className="p-8 flex justify-center items-center h-52 bg-white">
                <img src={product.image} alt={product.name} className="w-36 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
              </div>
              
              {/* Box Merah Deskripsi[cite: 5] */}
              <div className="bg-brand-red text-white p-5 text-center transition-colors">
                <h4 className="font-bold text-sm tracking-wide">{product.name}</h4>
                <p className="text-[10px] opacity-80 mt-1">({product.sub})</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}