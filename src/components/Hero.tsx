export default function Hero() {
  return (
    <section className="relative bg-brand-dark pt-24 pb-32 px-16 flex justify-center min-h-[65vh]">
      <div className="absolute  inset-0 mx-auto mb-5 bg-[url('/images/dark-texture.png')] bg-cover mix-blend-normal max-w-[93vw] drop-shadow-2xl ">
        <div className="absolute inset-0 z-0 ">
          <img src="/images/hero-chicken.webp" alt="Hero Chicken" className="w-full h-full object-cover object-right rounded-bl-4xl " />
        </div>
      </div>
      
      <div className="relative z-10 flex w-full max-w-6xl items-center justify-between">
        {/* Teks Tipografi Kiri[cite: 5] */}
        <div className="w-1/2 animate-fade-in-up  ">
          <h1 className="text-white text-[5.5rem] font-script leading-none drop-shadow-lg mb-2">
            Think chicken?
          </h1>
          <div className="inline-block bg-brand-red text-white px-8 py-2 rounded-[30px] transform -rotate-3 shadow-xl">
            <h2 className="text-[5.5rem] font-script leading-none">Think us</h2>
          </div>
        </div>
      </div>
    </section>
  );
}