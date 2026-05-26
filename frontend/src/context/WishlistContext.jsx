import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

const LOCAL_KEY = 'uv_wishlist_v1';

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch { return []; }
  });

  // Sync from backend when logged in
  useEffect(() => {
    if (user) {
      api.getWishlist().then(setItems).catch(() => {});
    }
  }, [user]);

  // Persist locally
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  }, [items]);

  const isWished = useCallback((productId) => items.some((w) => w.product_id === productId), [items]);

  const toggle = useCallback(async (product) => {
    const wished = isWished(product.id);
    if (wished) {
      setItems((prev) => prev.filter((w) => w.product_id !== product.id));
      if (user) api.removeFromWishlist(product.id).catch(() => {});
    } else {
      const item = { product_id: product.id, slug: product.slug, title: product.title, price: product.price, image: product.images?.[0] };
      setItems((prev) => [...prev, item]);
      if (user) api.addToWishlist(item).catch(() => {});
    }
    return !wished;
  }, [isWished, user]);

  const clear = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, isWished, toggle, clear, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
