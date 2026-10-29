export default function Hero() {
  return (
    <section className="relative bg-brand-dark pt-12 md:pt-24 pb-20 md:pb-32 px-4 sm:px-6 md:px-8 flex justify-center min-h-[65vh]">
      <div className="absolute  inset-0 mx-auto mb-5 bg-[url('/images/chicken.webp')] bg-cover mix-blend-normal max-w-[93vw] drop-shadow-2xl ">
        <div className="absolute inset-0 z-0 ">
          <img src="/images/chicken.webp" alt="Hero Chicken" loading="lazy" className="w-full h-full object-cover object-right rounded-bl-4xl " />
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-6xl items-center justify-between">
        {/* Teks Tipografi Kiri[cite: 5] */}
        <div className="w-full md:w-1/2 animate-fade-in-up">
          <h1 className="text-white text-4xl md:text-5xl font-script leading-none drop-shadow-lg mb-2">
            Think chicken?
          </h1>
          <div className="inline-block bg-primary text-cream px-8 py-2 rounded-[30px] transform -rotate-3 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-script leading-none">Think us</h2>
          </div>
        </div>
      </div>
    </section>
  );
}