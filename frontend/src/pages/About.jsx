import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, Sparkles } from 'lucide-react';
import { brandLogos } from '../data/mock';

const About = () => (
  <div>
    <section className="relative h-[420px] bg-neutral-100 overflow-hidden">
      <img src="https://www.unique-vintage.com/cdn/shop/files/1920s_954b735e-df8d-4fb0-a66b-24cddd7d902d.jpg?v=1723507792&width=1920" alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-white text-center px-4">
        <span className="uppercase-spaced text-[12px]">Our Story</span>
        <h1 className="font-display text-[44px] md:text-[60px] mt-3">25 Years of Vintage Love</h1>
        <p className="text-[14px] max-w-xl mt-3">A women-owned brand celebrating fashion across the decades — from the roaring '20s to the rebellious Y2K.</p>
      </div>
    </section>

    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="uppercase-spaced text-[11px] text-neutral-500">Est. 2000 · Los Angeles</span>
        <h2 className="font-display text-[30px] md:text-[40px] mt-3">Hello, darling.</h2>
        <p className="text-[15px] text-neutral-700 mt-5 leading-relaxed">Unique Vintage was founded with the belief that fashion's past is its future. From flapper-inspired fringe to mod minis and Y2K nostalgia, we curate vintage-inspired pieces designed for the modern muse — in sizes XS through 5X.</p>
        <p className="text-[15px] text-neutral-700 mt-4 leading-relaxed">Over a million customers later, our Los Angeles boutique still feels like a love letter to every decade we adore.</p>
      </div>
    </section>

    <section className="py-10 bg-[#faf5ee]">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: Calendar, t: 'Est. 2000', s: 'Celebrating 25 years' },
          { icon: Heart, t: 'Women Owned', s: '& proudly operated' },
          { icon: Sparkles, t: 'XS – 5X', s: 'Inclusive sizing' },
          { icon: MapPin, t: 'Los Angeles', s: 'Burbank flagship' },
        ].map((b) => (
          <div key={b.t} className="text-center">
            <div className="w-14 h-14 bg-white rounded-full mx-auto flex items-center justify-center border border-neutral-200"><b.icon size={22} className="text-[#c43a47]" /></div>
            <div className="font-display text-[18px] mt-3">{b.t}</div>
            <div className="text-[12px] text-neutral-500">{b.s}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <img src="https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-50s.jpg?v=1734546424&width=1200" alt="" className="w-full aspect-[4/5] object-cover" />
        <div>
          <span className="uppercase-spaced text-[11px] text-neutral-500">A Note from the Founder</span>
          <h3 className="font-display text-[28px] md:text-[34px] mt-3">Every era deserves a comeback.</h3>
          <p className="text-[14px] text-neutral-700 mt-4 leading-relaxed">Our collections are dreamed up by a tiny team of vintage obsessives. We hunt for the best fits, prints, and silhouettes — then we re-create them with modern fabrics, inclusive sizing, and a wink of nostalgia.</p>
          <Link to="/collections/new-arrivals" className="inline-block mt-6 bg-[#1a1a1a] text-white px-7 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Shop New Arrivals</Link>
        </div>
      </div>
    </section>

    <section className="py-12 border-t border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <div className="uppercase-spaced text-[11px] text-neutral-500 mb-6">Featured In</div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center">
          {brandLogos.map((b) => <img key={b.name} src={b.src} alt={b.name} className="h-7 object-contain opacity-70" />)}
        </div>
      </div>
    </section>
  </div>
);

export default About;
