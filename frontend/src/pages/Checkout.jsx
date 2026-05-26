import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { toast } from 'sonner';

const Field = ({ label, error, className = '', ...props }) => (
  <div className={`space-y-1 ${className}`}>
    <label className="text-[12px] uppercase-spaced text-neutral-500">{label}</label>
    <input {...props} className={`w-full border ${error ? 'border-[#c43a47]' : 'border-neutral-300 focus:border-[#1a1a1a]'} px-3 h-11 text-[14px] outline-none`} />
    {error && <p className="text-[11px] text-[#c43a47]">{error}</p>}
  </div>
);

const STEPS = ['Contact', 'Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const shipping = subtotal >= 150 ? 0 : 9.95;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;

  const [contact, setContact] = useState({ email: user?.email || '', phone: '' });
  const [ship, setShip] = useState({ first_name: user?.first_name || '', last_name: user?.last_name || '', address1: '', address2: '', city: '', state: '', zip_code: '', country: 'US' });
  const [pay, setPay] = useState({ card_number: '', expiry: '', cvv: '', name_on_card: '' });

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-[28px]">Your bag is empty</h1>
        <Link to="/" className="inline-block mt-6 bg-[#1a1a1a] text-white px-8 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Continue Shopping</Link>
      </div>
    );
  }

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!contact.email || !contact.email.includes('@')) e.email = 'Valid email required';
    }
    if (s === 1) {
      if (!ship.first_name) e.first_name = 'Required';
      if (!ship.address1) e.address1 = 'Required';
      if (!ship.city) e.city = 'Required';
      if (!ship.state) e.state = 'Required';
      if (!ship.zip_code) e.zip_code = 'Required';
    }
    if (s === 2) {
      if (pay.card_number.replace(/\s/g, '').length < 16) e.card_number = 'Enter a valid card number';
      if (!pay.expiry) e.expiry = 'Required';
      if (!pay.cvv || pay.cvv.length < 3) e.cvv = 'Required';
      if (!pay.name_on_card) e.name_on_card = 'Required';
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setStep(s => s + 1);
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const orderItems = items.map(i => ({
        product_id: i.id,
        slug: i.slug,
        title: i.title,
        price: i.price,
        image: i.image,
        size: i.size,
        qty: i.qty,
      }));
      const order = await api.createOrder({
        items: orderItems,
        shipping_address: ship,
        payment_method: 'card',
        card_last4: pay.card_number.replace(/\s/g, '').slice(-4),
      });
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

  return (
    <div className="max-w-[1100px] mx-auto px-4 lg:px-10 py-10">
      {/* Breadcrumb steps */}
      <nav className="flex items-center gap-2 text-[12px] mb-10 overflow-x-auto no-scrollbar">
        <Link to="/cart" className="text-neutral-500 hover:underline uppercase-spaced">Cart</Link>
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <ChevronRight size={14} className="text-neutral-300 flex-shrink-0" />
            <button onClick={() => i < step && setStep(i)}
              className={`uppercase-spaced whitespace-nowrap ${i === step ? 'text-[#1a1a1a] font-semibold' : i < step ? 'text-neutral-500 hover:text-[#1a1a1a]' : 'text-neutral-300'}`}>
              {i < step && <Check size={11} className="inline mr-1" />}{s}
            </button>
          </React.Fragment>
        ))}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left: form */}
        <div className="lg:col-span-3 space-y-6">

          {/* Step 0: Contact */}
          {step === 0 && (
            <div>
              <h2 className="font-display text-[26px] mb-6">Contact</h2>
              {!user && (
                <p className="text-[13px] text-neutral-500 mb-4">
                  Already have an account? <Link to="/account" className="underline text-[#1a1a1a]">Sign in</Link>
                </p>
              )}
              <div className="space-y-4">
                <Field label="Email address" value={contact.email} onChange={e => setContact(c => ({...c, email: e.target.value}))} type="email" error={errors.email} required />
                <Field label="Phone (optional)" value={contact.phone} onChange={e => setContact(c => ({...c, phone: e.target.value}))} type="tel" />
                <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                  <input type="checkbox" className="accent-[#1a1a1a]" defaultChecked />
                  Email me with news and offers
                </label>
              </div>
              <button onClick={next} className="mt-6 w-full bg-[#1a1a1a] text-white py-3.5 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Continue to Shipping</button>
            </div>
          )}

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-[26px] mb-6">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" value={ship.first_name} onChange={e => setShip(s => ({...s, first_name: e.target.value}))} error={errors.first_name} />
                <Field label="Last name" value={ship.last_name} onChange={e => setShip(s => ({...s, last_name: e.target.value}))} />
                <Field label="Address" className="col-span-2" value={ship.address1} onChange={e => setShip(s => ({...s, address1: e.target.value}))} error={errors.address1} />
                <Field label="Apt, suite, etc." className="col-span-2" value={ship.address2} onChange={e => setShip(s => ({...s, address2: e.target.value}))} />
                <Field label="City" value={ship.city} onChange={e => setShip(s => ({...s, city: e.target.value}))} error={errors.city} />
                <Field label="State" value={ship.state} onChange={e => setShip(s => ({...s, state: e.target.value}))} error={errors.state} />
                <Field label="ZIP code" value={ship.zip_code} onChange={e => setShip(s => ({...s, zip_code: e.target.value}))} error={errors.zip_code} />
                <div className="space-y-1">
                  <label className="text-[12px] uppercase-spaced text-neutral-500">Country</label>
                  <select value={ship.country} onChange={e => setShip(s => ({...s, country: e.target.value}))} className="w-full border border-neutral-300 focus:border-[#1a1a1a] px-3 h-11 text-[14px] outline-none bg-white">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="ID">Indonesia</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="flex-1 border border-neutral-300 py-3.5 uppercase-spaced text-[11px] hover:bg-neutral-50">Back</button>
                <button onClick={next} className="flex-1 bg-[#1a1a1a] text-white py-3.5 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Continue to Payment</button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-[26px] mb-2">Payment</h2>
              <p className="text-[13px] text-neutral-500 mb-6 flex items-center gap-1.5"><Lock size={12} /> Transactions are encrypted and secure</p>
              <div className="border border-neutral-200 p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={18} className="text-neutral-600" />
                  <span className="text-[13px] uppercase-spaced">Credit / Debit Card</span>
                </div>
                <Field label="Name on card" value={pay.name_on_card} onChange={e => setPay(p => ({...p, name_on_card: e.target.value}))} error={errors.name_on_card} />
                <Field label="Card number" value={pay.card_number} onChange={e => setPay(p => ({...p, card_number: formatCard(e.target.value)}))} placeholder="1234 5678 9012 3456" error={errors.card_number} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry (MM/YY)" value={pay.expiry} onChange={e => setPay(p => ({...p, expiry: formatExpiry(e.target.value)}))} placeholder="MM/YY" error={errors.expiry} />
                  <Field label="CVV" value={pay.cvv} onChange={e => setPay(p => ({...p, cvv: e.target.value.replace(/\D/g, '').slice(0,4)}))} placeholder="•••" error={errors.cvv} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 border border-neutral-300 py-3.5 uppercase-spaced text-[11px] hover:bg-neutral-50">Back</button>
                <button onClick={next} className="flex-1 bg-[#1a1a1a] text-white py-3.5 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Review Order</button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-[26px] mb-6">Review Your Order</h2>
              <div className="space-y-4 text-[13px]">
                <div className="border border-neutral-200 p-4">
                  <div className="uppercase-spaced text-[10px] text-neutral-500 mb-2">Contact</div>
                  <div>{contact.email}</div>
                  {contact.phone && <div className="text-neutral-500">{contact.phone}</div>}
                  <button onClick={() => setStep(0)} className="text-[11px] underline mt-1">Edit</button>
                </div>
                <div className="border border-neutral-200 p-4">
                  <div className="uppercase-spaced text-[10px] text-neutral-500 mb-2">Ship to</div>
                  <div>{ship.first_name} {ship.last_name}</div>
                  <div className="text-neutral-500">{ship.address1}{ship.address2 ? `, ${ship.address2}` : ''}</div>
                  <div className="text-neutral-500">{ship.city}, {ship.state} {ship.zip_code}, {ship.country}</div>
                  <button onClick={() => setStep(1)} className="text-[11px] underline mt-1">Edit</button>
                </div>
                <div className="border border-neutral-200 p-4">
                  <div className="uppercase-spaced text-[10px] text-neutral-500 mb-2">Payment</div>
                  <div className="flex items-center gap-2"><CreditCard size={14} /> Card ending in {pay.card_number.replace(/\s/g, '').slice(-4)}</div>
                  <button onClick={() => setStep(2)} className="text-[11px] underline mt-1">Edit</button>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 border border-neutral-300 py-3.5 uppercase-spaced text-[11px] hover:bg-neutral-50">Back</button>
                <button onClick={placeOrder} disabled={loading} className="flex-1 bg-[#c43a47] text-white py-3.5 uppercase-spaced text-[11px] hover:bg-[#a02f39] disabled:opacity-60 flex items-center justify-center gap-2">
                  <Lock size={13} /> {loading ? 'Placing Order…' : `Place Order · $${total.toFixed(2)}`}
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 mt-3 text-center">By placing your order you agree to our Terms and Privacy Policy.</p>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <aside className="lg:col-span-2">
          <div className="bg-[#faf5ee] p-6 sticky top-24">
            <h3 className="uppercase-spaced text-[11px] mb-5">Order Summary</h3>
            <div className="space-y-4 mb-5 max-h-64 overflow-auto pretty-scroll">
              {items.map((it) => (
                <div key={`${it.id}-${it.size}`} className="flex gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-18 bg-neutral-200 overflow-hidden">
                      <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -top-1 -right-1 bg-[#1a1a1a] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">{it.qty}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-display leading-snug line-clamp-2">{it.title}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Size: {it.size}</div>
                  </div>
                  <div className="text-[13px]">${(it.price * it.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-300 pt-4 space-y-2 text-[13px]">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? <span className="text-green-700">Free</span> : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span>Tax (8.5%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="border-t border-neutral-300 pt-3 flex justify-between font-semibold text-[15px]">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            {subtotal < 150 && (
              <p className="text-[11px] text-neutral-500 mt-3 text-center">Add ${(150 - subtotal).toFixed(2)} more for free shipping</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
