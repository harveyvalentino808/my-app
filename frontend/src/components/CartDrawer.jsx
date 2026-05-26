import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal } = useCart();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[55] bg-black/45" onClick={() => setIsOpen(false)}>
      <aside className="absolute right-0 top-0 bottom-0 w-full sm:w-[440px] bg-white flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 h-14 border-b border-neutral-200">
          <span className="uppercase-spaced text-[12px]">Your Bag ({items.length})</span>
          <button onClick={() => setIsOpen(false)}><X size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="font-display text-[24px]">Your bag is empty</div>
            <p className="text-[13px] text-neutral-500 mt-2">Time to discover your next favorite piece, darling.</p>
            <button onClick={() => setIsOpen(false)} className="mt-6 bg-[#1a1a1a] text-white px-6 py-3 uppercase-spaced text-[11px]">Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto pretty-scroll px-5 py-4 space-y-5">
              {items.map((it) => (
                <div key={`${it.id}-${it.size}`} className="flex gap-4">
                  <Link to={`/products/${it.slug}`} onClick={() => setIsOpen(false)} className="w-20 h-24 bg-neutral-100 flex-shrink-0">
                    <img src={it.image} alt="" className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/products/${it.slug}`} onClick={() => setIsOpen(false)} className="font-display text-[14px] leading-snug hover:text-[#c43a47]">{it.title}</Link>
                    <div className="text-[12px] text-neutral-500 mt-1">Size: {it.size}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-neutral-300">
                        <button onClick={() => updateQty(it.id, it.size, it.qty - 1)} className="w-7 h-7 flex items-center justify-center"><Minus size={12} /></button>
                        <span className="w-7 text-center text-[12px]">{it.qty}</span>
                        <button onClick={() => updateQty(it.id, it.size, it.qty + 1)} className="w-7 h-7 flex items-center justify-center"><Plus size={12} /></button>
                      </div>
                      <div className="text-[13px]">${(it.price * it.qty).toFixed(2)}</div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(it.id, it.size)} className="text-neutral-400 hover:text-[#c43a47]" aria-label="remove"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 px-5 py-4 space-y-3">
              <div className="flex justify-between text-[14px]">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="text-[11px] text-neutral-500">Shipping & taxes calculated at checkout. Free shipping on orders $150+.</div>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-center border border-[#1a1a1a] text-[#1a1a1a] uppercase-spaced text-[11px] py-3 hover:bg-neutral-50">View Cart</Link>
              <Link to="/checkout" onClick={() => setIsOpen(false)} className="block w-full bg-[#1a1a1a] text-white uppercase-spaced text-[11px] py-3 hover:bg-[#c43a47] transition-colors text-center">Checkout</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
