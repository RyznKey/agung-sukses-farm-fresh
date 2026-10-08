export default function Welcome() {
  return (
    <section className="bg-brand-dark text-white pt-10 pb-32 px-16 flex justify-center relative z-20 -mb-16">
      <div className="flex items-center justify-between max-w-6xl w-full">
        {/* Konten Teks[cite: 5] */}
        <div className="w-1/2 pr-16 animate-slide-in">
          <h3 className="text-brand-red text-[4rem] font-script mb-8 drop-shadow-md">Welcome...</h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-5 opacity-90">
            Every bit of chicken that leaves our processing plant delivers absolute quality. We are a wide range HALAL CHICKEN supplier to cater to your needs...
          </p>
          <p className="text-gray-400 text-xs leading-relaxed opacity-90">
            We apply advanced production standards and processing practices to ensure your satisfaction. Whether it is a tender or fresh chicken online purchase, we guarantee a reasonable cost.
          </p>
        </div>
        
        {/* Maskot Kanan[cite: 5] */}
        <div className="w-1/2 flex justify-center">
          <img 
            src="/images/maskot_1.webp" 
            alt="Chicken Mascot" 
            className="w-72 drop-shadow-xl hover:-translate-y-3 transition-transform duration-500 scale-200" 
          />
        </div>
      </div>
    </section>
  );
}