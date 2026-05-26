import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { heroBanners, categoryBanners, splitBanners, eras, promoSplits, products, instagramPosts } from '../data/mock';
import ProductCard from '../components/ProductCard';

const Hero = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroBanners.length), 6000);
    return () => clearInterval(t);
  }, []);
  const slide = heroBanners[idx];
  return (
    <section className="relative">
      <Link to={slide.href} className="block relative h-[420px] sm:h-[520px] md:h-[620px] overflow-hidden bg-neutral-100">
        {heroBanners.map((b, i) => (
          <img key={b.id} src={b.image} alt={b.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </Link>
      <button onClick={() => setIdx((idx - 1 + heroBanners.length) % heroBanners.length)} className="hero-arrow absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white rounded-full flex items-center justify-center shadow" aria-label="prev"><ChevronLeft size={20} /></button>
      <button onClick={() => setIdx((idx + 1) % heroBanners.length)} className="hero-arrow absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white rounded-full flex items-center justify-center shadow" aria-label="next"><ChevronRight size={20} /></button>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {heroBanners.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? 'bg-white w-8' : 'bg-white/60 w-1.5'}`} aria-label={`slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
};

const CategoryGrid = () => (
  <section className="py-12">
    <div className="max-w-[1480px] mx-auto px-4 lg:px-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {categoryBanners.map((b) => (
          <Link to={b.href} key={b.title} className="group block">
            <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <h3 className="mt-4 text-center font-display text-[20px] md:text-[24px] capitalize">{b.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const SplitBanners = ({ items }) => (
  <section className="py-6">
    <div className="max-w-[1480px] mx-auto px-4 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {items.map((b) => (
        <Link to={b.href} key={b.title} className="relative group overflow-hidden block">
          <div className="aspect-[16/10] bg-neutral-100">
            <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const Eras = () => (
  <section className="py-14 bg-[#faf5ee]">
    <div className="max-w-[1480px] mx-auto px-4 lg:px-10">
      <h2 className="text-center font-display text-[30px] md:text-[40px] mb-10">Shop by Era</h2>
      <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
        {eras.map((e) => (
          <Link to={e.href} key={e.name} className="group text-center">
            <div className="aspect-square overflow-hidden bg-white">
              <img src={e.image} alt={e.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="mt-3 uppercase-spaced text-[11px]">{e.name}</div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Section = ({ title, items, cta }) => {
  const ref = React.useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 600, behavior: 'smooth' });
  return (
    <section className="py-12">
      <div className="max-w-[1480px] mx-auto px-4 lg:px-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-[28px] md:text-[34px]">{title}</h2>
          <div className="flex items-center gap-4">
            {cta && <Link to={cta.href} className="text-[12px] uppercase-spaced underline">{cta.label}</Link>}
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(-1)} className="w-9 h-9 border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-100"><ChevronLeft size={16} /></button>
              <button onClick={() => scroll(1)} className="w-9 h-9 border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-100"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
        <div ref={ref} className="flex gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
          {items.map((p) => (
            <div key={p.id} className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Instagrid = () => (
  <section className="py-14">
    <div className="max-w-[1480px] mx-auto px-4 lg:px-10 text-center">
      <div className="flex items-center justify-center gap-2 text-neutral-500"><Instagram size={18} /><span className="uppercase-spaced text-[11px]">@uniquevintage</span></div>
      <h2 className="font-display text-[30px] md:text-[40px] mt-3">Well, Aren't You Darling!</h2>
      <p className="text-[13px] text-neutral-500 mt-2">Tag @uniquevintage to be featured.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 mt-8">
        {instagramPosts.map((p) => (
          <a key={p.id} href="#" className="group relative aspect-square overflow-hidden bg-neutral-100">
            <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 p-3 text-center">
              <Instagram size={20} />
              <div className="text-[11px] mt-2 line-clamp-3">{p.caption}</div>
              <div className="text-[10px] mt-1 opacity-80">{p.date}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  const newArrivals = products.slice(0, 12);
  const recommended = [...products].sort(() => 0.5 - Math.random()).slice(0, 12);
  return (
    <>
      <Hero />
      <CategoryGrid />
      <SplitBanners items={splitBanners} />
      <Section title="New Arrivals" items={newArrivals} cta={{ label: 'See all', href: '/collections/new-arrivals' }} />
      <Eras />
      <SplitBanners items={promoSplits} />
      <Section title="Recommended For You" items={recommended} cta={{ label: 'See all', href: '/collections/best-sellers' }} />
      <Instagrid />
    </>
  );
};

export default Home;
