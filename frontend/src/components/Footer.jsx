import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Send, Heart, Sparkles, Award, PartyPopper } from 'lucide-react';
import { footerLinks, whyUs, brandLogos } from '../data/mock';
import { toast } from 'sonner';

const icons = { Heart, Sparkles, Award, PartyPopper };

const Footer = () => {
  const [email, setEmail] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    toast.success('Welcome to the Unique Vintage family! Check your inbox for 20% off.');
    setEmail('');
  };

  return (
    <footer className="mt-16">
      {/* Why Us strip */}
      <section className="bg-[#faf5ee] py-14">
        <div className="max-w-[1480px] mx-auto px-4 lg:px-10">
          <h3 className="text-center font-display text-[28px] md:text-[34px] mb-10">Why Unique Vintage?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyUs.map((w) => {
              const Icon = icons[w.icon] || Heart;
              return (
                <div key={w.title} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-4">
                    <Icon size={26} className="text-[#c43a47]" />
                  </div>
                  <div className="font-display text-[18px]">{w.title}</div>
                  <div className="uppercase-spaced text-[10px] text-neutral-500 mt-1">{w.subtitle}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* As featured */}
      <section className="py-10 border-t border-neutral-200">
        <div className="max-w-[1480px] mx-auto px-4 lg:px-10">
          <div className="uppercase-spaced text-[11px] text-neutral-500 text-center mb-6">As Featured In</div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center">
            {brandLogos.map((b) => (
              <img key={b.name} src={b.src} alt={b.name} className="h-7 object-contain opacity-70 hover:opacity-100 transition" />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#1a1a1a] text-white py-14">
        <div className="max-w-[760px] mx-auto px-4 text-center">
          <h3 className="font-display text-[32px] md:text-[40px]">Get 20% Off Your First Order</h3>
          <p className="text-[14px] text-neutral-300 mt-3">Subscribe for exclusive drops, vintage style guides & insider sales.</p>
          <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="flex-1 bg-transparent border border-neutral-600 px-4 py-3 text-[14px] placeholder:text-neutral-500 focus:border-white outline-none" />
            <button className="bg-white text-[#1a1a1a] px-6 py-3 uppercase-spaced text-[11px] font-semibold flex items-center gap-2 justify-center hover:bg-neutral-200">Subscribe <Send size={14} /></button>
          </form>
        </div>
      </section>

      {/* Links */}
      <section className="py-14 border-t border-neutral-200">
        <div className="max-w-[1480px] mx-auto px-4 lg:px-10 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="font-display text-[26px]">unique vintage</div>
            <p className="text-[13px] text-neutral-600 mt-4 leading-relaxed max-w-xs">A women-owned brand celebrating 25 years of vintage-inspired fashion from the 1920s through Y2K. Sizes XS–5X.</p>
            <div className="flex items-center gap-4 mt-5 text-neutral-700">
              <a aria-label="instagram" href="#" className="hover:text-[#c43a47]"><Instagram size={20} /></a>
              <a aria-label="facebook" href="#" className="hover:text-[#c43a47]"><Facebook size={20} /></a>
              <a aria-label="youtube" href="#" className="hover:text-[#c43a47]"><Youtube size={20} /></a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="uppercase-spaced text-[11px] mb-4">{title}</div>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}><Link to={`/collections/${l.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-[13px] text-neutral-600 hover:text-[#c43a47] link-underline">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 py-6">
        <div className="max-w-[1480px] mx-auto px-4 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-neutral-500">
          <div>© {new Date().getFullYear()} Unique Vintage. Replica for demonstration purposes.</div>
          <div className="flex gap-5"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a></div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
