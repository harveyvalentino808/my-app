import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/mock';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').toLowerCase();
  const results = q ? products.filter((p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.color.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))) : [];
  return (
    <div className="max-w-[1480px] mx-auto px-4 lg:px-10 py-10">
      <nav className="text-[12px] text-neutral-500 mb-3"><Link to="/">Home</Link> / Search</nav>
      <h1 className="font-display text-[32px] md:text-[40px]">Search results</h1>
      <p className="text-[14px] text-neutral-600 mt-2">{q ? `Showing ${results.length} results for "${q}"` : 'Type something in the search bar to discover treasures.'}</p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {results.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {q && results.length === 0 && (
        <div className="py-14 text-center">
          <div className="font-display text-[22px]">No matches found</div>
          <p className="text-[13px] text-neutral-500 mt-2">Try a different keyword or browse our collections.</p>
          <Link to="/collections/new-arrivals" className="inline-block mt-6 bg-[#1a1a1a] text-white px-6 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Shop New Arrivals</Link>
        </div>
      )}
    </div>
  );
};

export default Search;
