import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ product, onClose, onAdd }) => {
  const [size, setSize] = useState(product.sizes?.[0] || 'One Size');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.images?.[0]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/55 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white max-w-4xl w-full grid md:grid-cols-2 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-neutral-100">
          <img src={activeImg} alt={product.title} className="w-full h-full object-cover aspect-[4/5]" />
          {product.images?.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto no-scrollbar">
              {product.images.slice(0, 5).map((src) => (
                <button key={src} onClick={() => setActiveImg(src)} className={`w-14 h-14 flex-shrink-0 border ${activeImg === src ? 'border-[#1a1a1a]' : 'border-white'} bg-white`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 md:p-8 relative">
          <button onClick={onClose} className="absolute right-4 top-4" aria-label="close"><X size={20} /></button>
          <div className="uppercase-spaced text-[10px] text-neutral-500">{product.brand}</div>
          <h2 className="font-display text-[24px] mt-2 leading-tight">{product.title}</h2>
          <div className="text-[18px] mt-3">${product.price.toFixed(2)}</div>
          <p className="text-[13px] text-neutral-600 mt-4 leading-relaxed line-clamp-4">{product.description}</p>

          <div className="mt-6">
            <div className="uppercase-spaced text-[10px] mb-3">Size: <span className="text-neutral-500">{size}</span></div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`min-w-[44px] h-10 px-3 border text-[12px] ${size === s ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'border-neutral-300 hover:border-[#1a1a1a]'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-neutral-300">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-11 flex items-center justify-center"><Minus size={14} /></button>
              <span className="w-10 text-center text-[14px]">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-11 flex items-center justify-center"><Plus size={14} /></button>
            </div>
            <button onClick={() => onAdd({ size, qty })} className="flex-1 h-11 bg-[#1a1a1a] text-white uppercase-spaced text-[11px] flex items-center justify-center gap-2 hover:bg-[#c43a47] transition-colors">
              <ShoppingBag size={14} /> Add to Bag
            </button>
          </div>
          <Link to={`/products/${product.slug}`} onClick={onClose} className="mt-4 inline-block text-[12px] underline">View full details</Link>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
