import { Leaf } from 'lucide-react';
import { ImageFallback } from '@/lib/ImageFallback';
import db from '@/data/db.json';

export default function ProductSection() {
  return (
    <section id="products" className="py-20 px-8 bg-white text-center">
      <div className="mb-12 animate-fade-in-up">
        <h4 className="text-farm-yellow font-bold text-xs tracking-widest mb-3 uppercase">Our Products</h4>
        <h2 className="text-4xl font-serif font-bold text-gray-900">Premium Poultry Products</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {db.products.map((product, index) => (
          <div 
            key={product.id} 
            className="group flex flex-col items-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Image Container with Floating Icon[cite: 1] */}
            <div className="relative w-full h-56 mb-8 rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
              {/* Ikon Hijau di Tengah Bawah[cite: 1] */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-farm-green text-white p-3 rounded-full border-[6px] border-white z-10 transition-transform duration-300 group-hover:-translate-y-2">
                <Leaf size={18} />
              </div>
            </div>
            
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2 mt-2">{product.name}</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-5 px-4 h-12">
              {product.description}
            </p>
            
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-xs font-bold tracking-wide hover:border-farm-green hover:bg-farm-green hover:text-white transition-all duration-300 w-fit">
              LEARN MORE
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}