import React, { useState } from 'react';
import { User, Mail, Lock, MapPin, Package, Heart, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const Account = () => {
  const [tab, setTab] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const em = f.get('email');
    if (!em || !String(em).includes('@')) return toast.error('Please enter a valid email');
    setName(String(em).split('@')[0]);
    setLoggedIn(true);
    toast.success('Welcome back, darling!');
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const em = f.get('email');
    const fn = f.get('firstName');
    if (!em || !String(em).includes('@')) return toast.error('Please enter a valid email');
    setName(String(fn || em.split('@')[0]));
    setLoggedIn(true);
    toast.success('Account created! Welcome to the family.');
  };

  if (loggedIn) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10 py-14">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-full bg-[#c43a47] text-white flex items-center justify-center font-display text-[22px]">{name?.[0]?.toUpperCase()}</div>
          <div>
            <h1 className="font-display text-[28px]">Hello, {name}</h1>
            <p className="text-[13px] text-neutral-500">Welcome to your vintage closet.</p>
          </div>
          <button onClick={() => setLoggedIn(false)} className="ml-auto text-[12px] underline">Sign out</button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Package, t: 'Orders', s: 'View past and pending orders' },
            { icon: Heart, t: 'Wishlist', s: '0 saved items' },
            { icon: MapPin, t: 'Addresses', s: 'Manage your delivery details' },
          ].map((c) => (
            <div key={c.t} className="border border-neutral-200 p-6 hover:border-[#1a1a1a] transition-colors">
              <c.icon size={22} className="text-[#c43a47]" />
              <div className="font-display text-[20px] mt-3">{c.t}</div>
              <div className="text-[13px] text-neutral-500 mt-1">{c.s}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto px-4 py-14">
      <h1 className="font-display text-[32px] text-center">My Account</h1>
      <div className="mt-6 grid grid-cols-2 border-b border-neutral-200">
        {[['login', 'Sign In'], ['register', 'Create Account']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`py-3 uppercase-spaced text-[11px] ${tab === k ? 'border-b-2 border-[#1a1a1a]' : 'text-neutral-500'}`}>{l}</button>
        ))}
      </div>
      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <Field icon={Mail} name="email" type="email" placeholder="Email" />
          <Field icon={Lock} name="password" type="password" placeholder="Password" />
          <div className="flex items-center justify-between text-[12px]">
            <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <a href="#" className="underline">Forgot password?</a>
          </div>
          <button className="w-full bg-[#1a1a1a] text-white uppercase-spaced text-[11px] py-3.5 hover:bg-[#c43a47] flex items-center justify-center gap-2"><LogIn size={14} /> Sign In</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field icon={User} name="firstName" placeholder="First name" />
            <Field icon={User} name="lastName" placeholder="Last name" />
          </div>
          <Field icon={Mail} name="email" type="email" placeholder="Email" />
          <Field icon={Lock} name="password" type="password" placeholder="Password" />
          <button className="w-full bg-[#1a1a1a] text-white uppercase-spaced text-[11px] py-3.5 hover:bg-[#c43a47]">Create Account</button>
          <p className="text-[11px] text-neutral-500 text-center">By creating an account you agree to our Terms and Privacy Policy.</p>
        </form>
      )}
    </div>
  );
};

const Field = ({ icon: Icon, ...props }) => (
  <div className="flex items-center border border-neutral-300 focus-within:border-[#1a1a1a] px-3 h-12">
    <Icon size={16} className="text-neutral-400 mr-2" />
    <input {...props} className="flex-1 outline-none text-[14px]" required />
  </div>
);

export default Account;
