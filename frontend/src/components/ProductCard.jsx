import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuickViewModal from './QuickViewModal';
import { toast } from 'sonner';

const ProductCard = ({ product, compact = false }) => {
  const { addItem } = useCart();
  const [qv, setQv] = useState(false);
  const [wished, setWished] = useState(false);
  const primary = product.images?.[0];
  const secondary = product.images?.[1] || product.images?.[0];

  return (
    <>
      <div className="group relative">
        <Link to={`/products/${product.slug}`} className="block product-img-stack aspect-[3/4] bg-neutral-100 overflow-hidden">
          <img src={primary} alt={product.title} className="img-primary" loading="lazy" />
          <img src={secondary} alt="" className="img-secondary" loading="lazy" />
          {/* Hover overlay actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.preventDefault(); setWished((v) => !v); toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist'); }}
              className={`w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-neutral-50 ${wished ? 'text-[#c43a47]' : 'text-neutral-700'}`}
              aria-label="wishlist"
            >
              <Heart size={16} fill={wished ? '#c43a47' : 'none'} />
            </button>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); setQv(true); }}
            className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur text-[#1a1a1a] uppercase-spaced text-[11px] py-3 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 hover:bg-white"
          >
            <Eye size={14} /> Quick View
          </button>
        </Link>
        <div className={`mt-3 ${compact ? 'text-[12px]' : ''}`}>
          <Link to={`/products/${product.slug}`}>
            <h3 className={`font-display ${compact ? 'text-[14px]' : 'text-[15px]'} leading-snug text-[#1a1a1a] hover:text-[#c43a47] line-clamp-2`}>{product.title}</h3>
          </Link>
          <div className={`mt-1.5 ${compact ? 'text-[13px]' : 'text-[14px]'} text-neutral-800`}>${product.price.toFixed(2)}</div>
        </div>
      </div>
      {qv && <QuickViewModal product={product} onClose={() => setQv(false)} onAdd={(opts) => { addItem(product, opts); setQv(false); }} />}
    </>
  );
};

export default ProductCard;
