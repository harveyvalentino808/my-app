import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { navMenu } from '../data/mock';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const AnnouncementBar = () => {
  const target = new Date();
  target.setHours(target.getHours() + 18, 22, 41);
  const [time, setTime] = useState({ h: '18', m: '22', s: '41' });
  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      let diff = Math.max(0, Math.floor((target - now) / 1000));
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setTime({ h, m, s });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-[#1a1a1a] text-white text-[12px] tracking-[0.18em] uppercase">
      <div className="max-w-[1480px] mx-auto px-4 h-9 flex items-center justify-center gap-4">
        <span className="hidden sm:inline">30% Off Sitewide ends in</span>
        <span className="sm:hidden">Sale ends in</span>
        <span className="flex items-center gap-1 font-mono tracking-wider">
          <Box>{time.h}</Box>:<Box>{time.m}</Box>:<Box>{time.s}</Box>
        </span>
      </div>
    </div>
  );
};

const Box = ({ children }) => (
  <span className="inline-block bg-white text-[#1a1a1a] px-1.5 py-0.5 rounded-sm text-[11px] font-semibold">{children}</span>
);

const MegaMenu = ({ item, open }) => {
  if (!open) return null;
  return (
    <div className="fade-down absolute left-0 right-0 top-full bg-white shadow-[0_18px_30px_-12px_rgba(0,0,0,0.18)] border-t border-neutral-200 z-40">
      <div className="max-w-[1480px] mx-auto px-10 py-10 grid grid-cols-12 gap-10">
        <div className="col-span-9 grid grid-cols-3 gap-10">
          {item.columns.map((col) => (
            <div key={col.title}>
              <div className="uppercase-spaced text-[11px] text-neutral-500 mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link to={`/collections/${l.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-[14px] text-neutral-800 link-underline">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="col-span-3">
          <Link to={item.feature.href} className="block group">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
              <img src={item.feature.image} alt={item.feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-display text-[18px]">{item.feature.title}</span>
              <ChevronRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const { count, setIsOpen } = useCart();
  const { user } = useAuth();
  const { count: wishCount } = useWishlist();
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
    setQ('');
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <AnnouncementBar />
      <div className="border-b border-neutral-200">
        <div className="max-w-[1480px] mx-auto px-4 lg:px-10 h-[72px] grid grid-cols-3 items-center">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden" aria-label="menu"><Menu size={22} /></button>
            <button onClick={() => setSearchOpen((v) => !v)} className="hidden lg:flex items-center gap-2 text-[13px] text-neutral-700 hover:text-black">
              <Search size={18} /> Search
            </button>
          </div>
          {/* Center: logo */}
          <Link to="/" className="justify-self-center flex flex-col items-center leading-none">
            <span className="font-display text-[26px] sm:text-[30px] tracking-[0.02em]">unique vintage</span>
            <span className="uppercase-spaced text-[9px] text-neutral-500 mt-0.5">est. 2000 · los angeles</span>
          </Link>
          {/* Right: icons */}
          <div className="flex items-center gap-5 justify-self-end text-neutral-800">
            <Link to="/account" className="hidden sm:flex items-center gap-2 text-[13px] hover:text-black">
              <User size={18} />
              <span className="hidden md:inline">{user ? user.first_name : 'Account'}</span>
            </Link>
            <Link to="/wishlist" className="hidden md:flex items-center gap-2 text-[13px] hover:text-black relative">
              <Heart size={18} />
              <span className="hidden lg:inline">Wishlist</span>
              {wishCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c43a47] text-white text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center">{wishCount}</span>
              )}
            </Link>
            <button onClick={() => setIsOpen(true)} className="relative flex items-center gap-2 text-[13px]" aria-label="open cart">
              <ShoppingBag size={20} />
              <span className="hidden md:inline">Cart</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c43a47] text-white text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center">{count}</span>
              )}
            </button>
            <button onClick={() => setSearchOpen((v) => !v)} className="lg:hidden"><Search size={20} /></button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-neutral-200 bg-white fade-down">
            <form onSubmit={submitSearch} className="max-w-[1480px] mx-auto px-4 lg:px-10 h-14 flex items-center gap-3">
              <Search size={18} className="text-neutral-500" />
              <input value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="What are you looking for, darling?" className="flex-1 outline-none text-[14px]" />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="close"><X size={18} /></button>
            </form>
          </div>
        )}

        {/* Desktop Nav */}
        <nav className="hidden lg:block relative" onMouseLeave={() => setActive(null)}>
          <ul className="max-w-[1480px] mx-auto px-10 h-12 flex items-center justify-center gap-8">
            {navMenu.map((item) => (
              <li key={item.label} onMouseEnter={() => setActive(item.label)} className="h-full flex items-center">
                <Link to={item.href} className={`uppercase-spaced text-[12px] py-2 ${item.label === 'Sale' ? 'text-[#c43a47]' : 'text-neutral-800'} hover:text-black border-b-2 ${active === item.label ? 'border-[#1a1a1a]' : 'border-transparent'}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {navMenu.map((item) => (active === item.label ? <MegaMenu key={item.label} item={item} open /> : null))}
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white p-5 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-[22px]">unique vintage</span>
              <button onClick={() => setMobileOpen(false)}><X size={20} /></button>
            </div>
            <ul className="space-y-1">
              {navMenu.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center justify-between py-3 border-b border-neutral-200 uppercase-spaced text-[12px] ${item.label === 'Sale' ? 'text-[#c43a47]' : ''}`}>
                    {item.label} <ChevronRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 text-[13px]">
              <Link to="/account" onClick={() => setMobileOpen(false)} className="block">{user ? `My Account (${user.first_name})` : 'Sign In / Register'}</Link>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block">Wishlist {wishCount > 0 && `(${wishCount})`}</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="block">About Us</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
