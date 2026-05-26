import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Minus, Plus, Truck, RotateCcw, ShieldCheck, ChevronDown } from 'lucide-react';
import { products } from '../data/mock';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { toast } from 'sonner';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between py-4 uppercase-spaced text-[11px]">
        {title} <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5 text-[13px] text-neutral-600 leading-relaxed">{children}</div>}
    </div>
  );
};

const Product = () => {
  const { slug } = useParams();
  const product = useMemo(() => products.find((p) => p.slug === slug) || products[0], [slug]);
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  React.useEffect(() => {
    setActiveImg(product.images[0]);
    setSize(product.sizes[0]);
    setQty(1);
  }, [product]);

  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.era === product.era)).slice(0, 8);

  return (
    <div className="max-w-[1480px] mx-auto px-4 lg:px-10 py-10">
      <nav className="text-[12px] text-neutral-500 mb-6">
        <Link to="/" className="hover:underline">Home</Link> / <Link to={`/collections/${product.category}`} className="hover:underline capitalize">{product.category}</Link> / <span className="text-neutral-700">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-3">
            {product.images.map((src) => (
              <button key={src} onClick={() => setActiveImg(src)} className={`aspect-[3/4] bg-neutral-100 border ${activeImg === src ? 'border-[#1a1a1a]' : 'border-transparent'}`}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="bg-neutral-100 aspect-[3/4] overflow-hidden">
            <img src={activeImg} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="lg:pl-6">
          <div className="uppercase-spaced text-[10px] text-neutral-500">{product.brand}</div>
          <h1 className="font-display text-[28px] md:text-[34px] leading-tight mt-2">{product.title}</h1>
          <div className="text-[20px] mt-3">${product.price.toFixed(2)}</div>
          <p className="text-[14px] text-neutral-600 mt-5 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="uppercase-spaced text-[10px]">Size: <span className="text-neutral-600">{size}</span></div>
              <button className="text-[11px] underline">Size guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`min-w-[48px] h-11 px-3 border text-[13px] ${size === s ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'border-neutral-300 hover:border-[#1a1a1a]'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-neutral-300">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-12 flex items-center justify-center"><Minus size={14} /></button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-12 flex items-center justify-center"><Plus size={14} /></button>
            </div>
            <button onClick={() => addItem(product, { size, qty })} className="flex-1 h-12 bg-[#1a1a1a] text-white uppercase-spaced text-[11px] flex items-center justify-center gap-2 hover:bg-[#c43a47] transition-colors">
              <ShoppingBag size={14} /> Add to Bag
            </button>
            <button onClick={() => { setWished((v) => !v); toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist'); }} className={`h-12 w-12 border ${wished ? 'border-[#c43a47] text-[#c43a47]' : 'border-neutral-300 text-neutral-700'} flex items-center justify-center hover:border-[#c43a47] hover:text-[#c43a47]`} aria-label="wishlist">
              <Heart size={16} fill={wished ? '#c43a47' : 'none'} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div><Truck size={20} className="mx-auto text-neutral-700" /><div className="text-[11px] mt-2">Free Shipping $150+</div></div>
            <div><RotateCcw size={20} className="mx-auto text-neutral-700" /><div className="text-[11px] mt-2">Easy Returns</div></div>
            <div><ShieldCheck size={20} className="mx-auto text-neutral-700" /><div className="text-[11px] mt-2">Secure Checkout</div></div>
          </div>

          <div className="mt-8">
            <Accordion title="Description" defaultOpen>{product.description} Made with love and a touch of vintage spirit. Imported.</Accordion>
            <Accordion title="Details & Care">Hand wash cold. Lay flat to dry. Do not bleach. Imported. Model is 5'9" wearing a size S.</Accordion>
            <Accordion title="Shipping & Returns">Free domestic shipping on orders $150+. Returns accepted within 30 days for unworn items with original tags.</Accordion>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-20">
        <h2 className="font-display text-[28px] md:text-[34px] mb-8">You may also love</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default Product;
