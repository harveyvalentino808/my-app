import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { products } from '../data/mock';
import ProductCard from '../components/ProductCard';

const FilterGroup = ({ title, options, selected, onToggle, max = 6 }) => {
  const [open, setOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? options : options.slice(0, max);
  return (
    <div className="border-b border-neutral-200 py-4">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between uppercase-spaced text-[11px]">
        {title}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          {list.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-[13px] text-neutral-700 cursor-pointer">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => onToggle(opt)} className="accent-[#1a1a1a]" />
              {opt}
            </label>
          ))}
          {options.length > max && (
            <button onClick={() => setShowAll((v) => !v)} className="text-[12px] underline mt-1">{showAll ? 'Show less' : `+ Show ${options.length - max} more`}</button>
          )}
        </div>
      )}
    </div>
  );
};

const formatTitle = (slug = '') => slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const Collection = () => {
  const { slug } = useParams();
  const title = formatTitle(slug);

  const all = useMemo(() => {
    const s = (slug || '').toLowerCase();
    if (s.includes('new')) return products;
    if (s.includes('dress')) return products.filter((p) => p.category === 'dresses');
    if (s.includes('top') || s.includes('shirt') || s.includes('sweater') || s.includes('blouse')) return products.filter((p) => p.category === 'tops');
    if (s.includes('shoe') || s.includes('heel') || s.includes('flat')) return products.filter((p) => p.category === 'shoes');
    if (s.includes('accessor') || s.includes('bag') || s.includes('sunglass') || s.includes('hair')) return products.filter((p) => p.category === 'accessories');
    if (s.includes('plus')) return products.filter((p) => p.tags.includes('plus'));
    if (/19\d0s|y2k/.test(s)) {
      const era = s.includes('y2k') ? 'Y2K' : s.match(/19\d0s/)?.[0];
      return products.filter((p) => p.era === era);
    }
    return products;
  }, [slug]);

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [cats, setCats] = useState([]);
  const [sort, setSort] = useState('new');

  const toggle = (set, val, setter) => setter(set.includes(val) ? set.filter((v) => v !== val) : [...set, val]);

  let filtered = all;
  if (sizes.length) filtered = filtered.filter((p) => p.sizes.some((s) => sizes.includes(s)));
  if (colors.length) filtered = filtered.filter((p) => colors.includes(p.color));
  if (cats.length) filtered = filtered.filter((p) => cats.includes(p.category));
  if (sort === 'priceAsc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'priceDesc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'az') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
  const allColors = Array.from(new Set(products.map((p) => p.color)));
  const allCats = Array.from(new Set(products.map((p) => p.category)));

  const hasFilters = Boolean(sizes.length || colors.length || cats.length);
  const clearAll = () => { setSizes([]); setColors([]); setCats([]); };

  return (
    <div>
      <div className="bg-[#faf5ee] py-10">
        <div className="max-w-[1480px] mx-auto px-4 lg:px-10">
          <nav className="text-[12px] text-neutral-500 mb-3">
            <Link to="/" className="hover:underline">Home</Link> / <span className="text-neutral-700">{title}</span>
          </nav>
          <h1 className="font-display text-[34px] md:text-[44px]">{title}</h1>
          <p className="text-[13px] text-neutral-600 mt-3 max-w-2xl">Add the hottest new pieces to your wardrobe with vintage-inspired styles from Verdant Clothier — spanning the 1920s through Y2K.</p>
        </div>
      </div>

      <div className="max-w-[1480px] mx-auto px-4 lg:px-10 grid grid-cols-12 gap-8 py-10">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="flex items-center justify-between mb-2">
            <div className="uppercase-spaced text-[12px]">Filters</div>
            {hasFilters ? (
              <button onClick={clearAll} className="text-[12px] underline">Clear all</button>
            ) : null}
          </div>
          <FilterGroup title="Size" options={allSizes} selected={sizes} onToggle={(v) => toggle(sizes, v, setSizes)} max={8} />
          <FilterGroup title="Category" options={allCats} selected={cats} onToggle={(v) => toggle(cats, v, setCats)} />
          <FilterGroup title="Color" options={allColors} selected={colors} onToggle={(v) => toggle(colors, v, setColors)} />
        </aside>

        {/* Grid */}
        <section className="col-span-12 lg:col-span-9">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="text-[13px] text-neutral-600">{filtered.length} products</div>
            <div className="flex items-center gap-2">
              <label className="text-[12px] text-neutral-500">Sort:</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-neutral-300 px-3 py-2 text-[13px] bg-white">
                <option value="new">Date, new to old</option>
                <option value="priceAsc">Price, low to high</option>
                <option value="priceDesc">Price, high to low</option>
                <option value="az">Alphabetical A–Z</option>
              </select>
            </div>
          </div>

          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {[...sizes.map((s) => ['size', s, () => toggle(sizes, s, setSizes)]), ...colors.map((c) => ['color', c, () => toggle(colors, c, setColors)]), ...cats.map((c) => ['cat', c, () => toggle(cats, c, setCats)])].map(([k, v, fn]) => (
                <button key={`${k}-${v}`} onClick={fn} className="flex items-center gap-1.5 border border-neutral-300 px-3 py-1.5 text-[12px] hover:bg-neutral-50">{v} <X size={12} /></button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <div className="font-display text-[22px]">No products match your filters</div>
              <button onClick={clearAll} className="mt-4 underline text-[13px]">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Collection;
