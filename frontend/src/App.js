import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Cart from './pages/Cart';
import About from './pages/About';
import Account from './pages/Account';
import Search from './pages/Search';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App bg-white text-[#1a1a1a]">
      <CartProvider>
        <BrowserRouter>
          <Header />
          <CartDrawer />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections/:slug" element={<Collection />} />
              <Route path="/products/:slug" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-center" />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
