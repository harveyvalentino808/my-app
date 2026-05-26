import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, subtotal, updateQty, removeItem } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 9.95;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-[1480px] mx-auto px-4 lg:px-10 py-12">
      <h1 className="font-display text-[34px] md:text-[44px] text-center">Your Shopping Bag</h1>
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-[15px] text-neutral-600">Your bag is empty.</p>
          <Link to="/" className="inline-block mt-6 bg-[#1a1a1a] text-white px-8 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_60px] gap-4 pb-3 border-b border-neutral-200 uppercase-spaced text-[11px] text-neutral-500">
              <span>Product</span><span>Qty</span><span className="text-right">Price</span><span></span>
            </div>
            {items.map((it) => (
              <div key={`${it.id}-${it.size}`} className="grid grid-cols-[2fr_1fr_1fr_60px] gap-4 py-6 border-b border-neutral-200 items-center">
                <div className="flex gap-4">
                  <Link to={`/products/${it.slug}`} className="w-20 h-24 bg-neutral-100 flex-shrink-0">
                    <img src={it.image} alt="" className="w-full h-full object-cover" />
                  </Link>
                  <div>
                    <Link to={`/products/${it.slug}`} className="font-display text-[15px] hover:text-[#c43a47]">{it.title}</Link>
                    <div className="text-[12px] text-neutral-500 mt-1">Size: {it.size}</div>
                  </div>
                </div>
                <div className="flex items-center border border-neutral-300 w-fit">
                  <button onClick={() => updateQty(it.id, it.size, it.qty - 1)} className="w-8 h-9 flex items-center justify-center"><Minus size={12} /></button>
                  <span className="w-9 text-center text-[13px]">{it.qty}</span>
                  <button onClick={() => updateQty(it.id, it.size, it.qty + 1)} className="w-8 h-9 flex items-center justify-center"><Plus size={12} /></button>
                </div>
                <div className="text-[14px] text-right">${(it.price * it.qty).toFixed(2)}</div>
                <button onClick={() => removeItem(it.id, it.size)} className="text-neutral-400 hover:text-[#c43a47] justify-self-end"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          <aside className="bg-[#faf5ee] p-6 h-fit">
            <h2 className="uppercase-spaced text-[12px] mb-5">Order Summary</h2>
            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span>Estimated tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="border-t border-neutral-300 pt-3 flex justify-between text-[16px] font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button className="w-full mt-6 bg-[#1a1a1a] text-white uppercase-spaced text-[11px] py-3.5 hover:bg-[#c43a47] transition-colors">Checkout</button>
            <p className="text-[11px] text-neutral-500 mt-4 text-center">Free shipping on orders $150+</p>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
