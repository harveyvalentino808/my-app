import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.getOrder(orderId).then(setOrder).catch(() => {}).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId, user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-neutral-400">Loading…</div></div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-14 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle size={56} className="text-green-500" />
      </div>
      <h1 className="font-display text-[36px] md:text-[44px]">Thank You!</h1>
      <p className="text-[15px] text-neutral-600 mt-3">Your order has been placed and is being processed.</p>

      {order && (
        <div className="mt-8 text-left space-y-4">
          <div className="bg-[#faf5ee] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="uppercase-spaced text-[11px] text-neutral-500">Order Number</span>
              <span className="font-display text-[18px] text-[#c43a47]">{order.order_number}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <div className="uppercase-spaced text-[10px] text-neutral-500 mb-1">Status</div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 text-[11px] uppercase-spaced capitalize">{order.status}</span>
              </div>
              <div>
                <div className="uppercase-spaced text-[10px] text-neutral-500 mb-1">Total</div>
                <div className="font-semibold text-[15px]">${order.total.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border border-neutral-200 p-5">
            <div className="flex items-center gap-2 mb-4 uppercase-spaced text-[10px] text-neutral-500"><Package size={14} /> Items</div>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-14 h-18 bg-neutral-100 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-display leading-snug">{item.title}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Size: {item.size} · Qty: {item.qty}</div>
                  </div>
                  <div className="text-[13px]">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 mt-4 pt-3 space-y-1.5 text-[13px]">
              <div className="flex justify-between text-neutral-500"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-neutral-500"><span>Shipping</span><span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-neutral-500"><span>Tax</span><span>${order.tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-[15px] pt-1"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
            </div>
          </div>

          {/* Shipping */}
          <div className="border border-neutral-200 p-5">
            <div className="flex items-center gap-2 mb-3 uppercase-spaced text-[10px] text-neutral-500"><MapPin size={14} /> Shipping To</div>
            <div className="text-[13px] text-neutral-700 space-y-0.5">
              <div>{order.shipping_address.first_name} {order.shipping_address.last_name}</div>
              <div>{order.shipping_address.address1}{order.shipping_address.address2 ? `, ${order.shipping_address.address2}` : ''}</div>
              <div>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip_code}</div>
              <div>{order.shipping_address.country}</div>
            </div>
          </div>

          {/* Payment */}
          <div className="border border-neutral-200 p-5">
            <div className="flex items-center gap-2 mb-3 uppercase-spaced text-[10px] text-neutral-500"><CreditCard size={14} /> Payment</div>
            <div className="text-[13px] text-neutral-700">Card ending in {order.card_last4}</div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        {user && (
          <Link to="/account" className="flex items-center justify-center gap-2 border border-[#1a1a1a] text-[#1a1a1a] px-6 py-3 uppercase-spaced text-[11px] hover:bg-neutral-50">
            View Orders
          </Link>
        )}
        <Link to="/" className="flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47]">
          Continue Shopping <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
