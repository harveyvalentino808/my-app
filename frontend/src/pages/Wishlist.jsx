import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const Wishlist = () => {
  const { items, toggle } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (item) => {
    addItem({ id: item.product_id, slug: item.slug, title: item.title, price: item.price, images: [item.image], sizes: ['M'] });
    toast.success('Added to bag!');
  };

  return (
    <div className="max-w-[1480px] mx-auto px-4 lg:px-10 py-12">
      <nav className="text-[12px] text-neutral-500 mb-3"><Link to="/" className="hover:underline">Home</Link> / Wishlist</nav>
      <h1 className="font-display text-[34px] md:text-[44px]">My Wishlist</h1>
      <p className="text-[13px] text-neutral-500 mt-2">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <Heart size={44} className="mx-auto text-neutral-200 mb-4" />
          <p className="text-[15px] text-neutral-600">Your wishlist is empty.</p>
          <Link to="/" className="inline-block mt-6 bg-[#1a1a1a] text-white px-8 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Discover Pieces</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
          {items.map((item) => (
            <div key={item.product_id} className="group relative">
              <Link to={`/products/${item.slug}`} className="block aspect-[3/4] bg-neutral-100 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </Link>
              <button onClick={() => toggle({ id: item.product_id, slug: item.slug, title: item.title, price: item.price, images: [item.image] })}
                className="absolute top-2 right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-[#c43a47] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#c43a47] hover:text-white">
                <Trash2 size={14} />
              </button>
              <div className="mt-3">
                <Link to={`/products/${item.slug}`} className="font-display text-[14px] hover:text-[#c43a47] line-clamp-2 leading-snug">{item.title}</Link>
                <div className="text-[13px] mt-1">${item.price.toFixed(2)}</div>
                <button onClick={() => handleMoveToCart(item)}
                  className="mt-3 w-full border border-[#1a1a1a] text-[#1a1a1a] text-[11px] uppercase-spaced py-2.5 flex items-center justify-center gap-2 hover:bg-[#1a1a1a] hover:text-white transition-colors">
                  <ShoppingBag size={13} /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
