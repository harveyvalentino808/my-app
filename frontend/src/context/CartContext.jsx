import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'uv_cart_v1';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, options = {}) => {
    const { size = product.sizes?.[0] || 'One Size', qty = 1 } = options;
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id && p.size === size);
      if (existing) {
        return prev.map((p) => (p.id === product.id && p.size === size ? { ...p, qty: p.qty + qty } : p));
      }
      return [
        ...prev,
        { id: product.id, slug: product.slug, title: product.title, price: product.price, image: product.images?.[0], size, qty },
      ];
    });
    setIsOpen(true);
  };

  const updateQty = (id, size, qty) => {
    setItems((prev) => prev.map((p) => (p.id === id && p.size === size ? { ...p, qty: Math.max(1, qty) } : p)));
  };

  const removeItem = (id, size) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
