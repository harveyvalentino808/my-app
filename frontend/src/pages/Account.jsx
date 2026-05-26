import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Package, Heart, LogIn, Plus, Trash2, Edit2, Check, X, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

// ── Field helper
const Field = ({ icon: Icon, label, error, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-[12px] uppercase-spaced text-neutral-500">{label}</label>}
    <div className={`flex items-center border ${error ? 'border-[#c43a47]' : 'border-neutral-300 focus-within:border-[#1a1a1a]'} px-3 h-12`}>
      {Icon && <Icon size={16} className="text-neutral-400 mr-2 flex-shrink-0" />}
      <input {...props} className="flex-1 outline-none text-[14px] bg-transparent" />
    </div>
    {error && <p className="text-[11px] text-[#c43a47]">{error}</p>}
  </div>
);

// ── Login/Register Form
const AuthForm = () => {
  const { login, register } = useAuth();
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setErrors({});
    setLoading(true);
    try {
      await login(f.get('email'), f.get('password'));
      toast.success('Welcome back, darling!');
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs = {};
    if (!f.get('firstName')) errs.firstName = 'Required';
    if (!f.get('email')) errs.email = 'Required';
    if ((f.get('password') || '').length < 6) errs.password = 'Min 6 characters';
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      await register(f.get('email'), f.get('password'), f.get('firstName'), f.get('lastName') || '');
      toast.success('Account created! Welcome to the family.');
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-14">
      <h1 className="font-display text-[32px] text-center">My Account</h1>
      <div className="mt-6 grid grid-cols-2 border-b border-neutral-200">
        {[['login', 'Sign In'], ['register', 'Create Account']].map(([k, l]) => (
          <button key={k} onClick={() => { setTab(k); setErrors({}); }}
            className={`py-3 uppercase-spaced text-[11px] ${tab === k ? 'border-b-2 border-[#1a1a1a]' : 'text-neutral-500'}`}>{l}</button>
        ))}
      </div>

      {errors.form && <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-[13px]">{errors.form}</div>}

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <Field icon={Mail} name="email" type="email" placeholder="Email address" required />
          <div className="relative">
            <Field icon={Lock} name="password" type={showPass ? 'text' : 'password'} placeholder="Password" required />
            <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-3 text-neutral-400">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-[#1a1a1a]" /> Remember me</label>
            <button type="button" className="underline text-neutral-600">Forgot password?</button>
          </div>
          <button disabled={loading} className="w-full bg-[#1a1a1a] text-white uppercase-spaced text-[11px] py-3.5 hover:bg-[#c43a47] flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? 'Signing in…' : <><LogIn size={14} /> Sign In</>}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field icon={User} name="firstName" placeholder="First name" error={errors.firstName} required />
            <Field icon={User} name="lastName" placeholder="Last name" />
          </div>
          <Field icon={Mail} name="email" type="email" placeholder="Email address" error={errors.email} required />
          <div className="relative">
            <Field icon={Lock} name="password" type={showPass ? 'text' : 'password'} placeholder="Password (min 6 chars)" error={errors.password} required />
            <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-3 text-neutral-400">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button disabled={loading} className="w-full bg-[#1a1a1a] text-white uppercase-spaced text-[11px] py-3.5 hover:bg-[#c43a47] disabled:opacity-60">
            {loading ? 'Creating…' : 'Create Account'}
          </button>
          <p className="text-[11px] text-neutral-500 text-center">By creating an account you agree to our Terms and Privacy Policy.</p>
        </form>
      )}
    </div>
  );
};

// ── Order Status Badge
const StatusBadge = ({ status }) => {
  const map = { processing: 'bg-yellow-100 text-yellow-800', shipped: 'bg-blue-100 text-blue-800', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-700' };
  return <span className={`px-2 py-0.5 text-[11px] uppercase-spaced rounded ${map[status] || 'bg-neutral-100 text-neutral-600'}`}>{status}</span>;
};

// ── Address Form Modal
const AddressForm = ({ initial, onSave, onClose }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = {
      id: initial?.id || undefined,
      first_name: f.get('first_name'),
      last_name: f.get('last_name'),
      address1: f.get('address1'),
      address2: f.get('address2') || '',
      city: f.get('city'),
      state: f.get('state'),
      zip_code: f.get('zip_code'),
      country: f.get('country') || 'US',
      phone: f.get('phone') || '',
      is_default: f.get('is_default') === 'on',
    };
    setLoading(true);
    await onSave(data);
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-6 relative max-h-[90vh] overflow-auto">
        <button onClick={onClose} className="absolute top-4 right-4"><X size={20} /></button>
        <h2 className="font-display text-[22px] mb-6">{initial ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field name="first_name" placeholder="First name" defaultValue={initial?.first_name} required />
            <Field name="last_name" placeholder="Last name" defaultValue={initial?.last_name} required />
          </div>
          <Field name="address1" placeholder="Street address" defaultValue={initial?.address1} required />
          <Field name="address2" placeholder="Apt, suite, etc. (optional)" defaultValue={initial?.address2} />
          <div className="grid grid-cols-2 gap-3">
            <Field name="city" placeholder="City" defaultValue={initial?.city} required />
            <Field name="state" placeholder="State" defaultValue={initial?.state} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field name="zip_code" placeholder="ZIP code" defaultValue={initial?.zip_code} required />
            <Field name="country" placeholder="Country" defaultValue={initial?.country || 'US'} />
          </div>
          <Field name="phone" placeholder="Phone (optional)" defaultValue={initial?.phone} type="tel" />
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" name="is_default" defaultChecked={initial?.is_default} className="accent-[#1a1a1a]" />
            Set as default address
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-neutral-300 py-3 text-[12px] uppercase-spaced">Cancel</button>
            <button disabled={loading} className="flex-1 bg-[#1a1a1a] text-white py-3 text-[12px] uppercase-spaced hover:bg-[#c43a47] disabled:opacity-60">
              {loading ? 'Saving…' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Dashboard tabs
const TABS = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
];

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addrModal, setAddrModal] = useState(null); // null | 'new' | address obj
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getOrders().then(setOrders).catch(() => {});
    api.getWishlist().then(setWishlist).catch(() => {});
    api.getAddresses().then(setAddresses).catch(() => {});
  }, []);

  const handleSaveAddress = async (data) => {
    try {
      if (data.id) {
        const updated = await api.updateAddress(data.id, data);
        setAddresses(prev => prev.map(a => a.id === data.id ? updated : a));
        toast.success('Address updated');
      } else {
        const created = await api.addAddress(data);
        setAddresses(prev => [...prev, created]);
        toast.success('Address added');
      }
      setAddrModal(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteAddress = async (id) => {
    await api.deleteAddress(id);
    setAddresses(prev => prev.filter(a => a.id !== id));
    toast.success('Address deleted');
  };

  const handleRemoveWishlist = async (productId) => {
    await api.removeFromWishlist(productId);
    setWishlist(prev => prev.filter(w => w.product_id !== productId));
    toast.success('Removed from wishlist');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await api.updateProfile({ first_name: f.get('first_name'), last_name: f.get('last_name'), email: f.get('email') });
      updateUser({ first_name: f.get('first_name'), last_name: f.get('last_name'), email: f.get('email') });
      toast.success('Profile updated!');
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get('new_password') !== f.get('confirm_password')) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await api.updatePassword({ current_password: f.get('current_password'), new_password: f.get('new_password') });
      toast.success('Password updated!');
      e.target.reset();
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-10 py-14">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-full bg-[#c43a47] text-white flex items-center justify-center font-display text-[22px]">
          {user?.first_name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="font-display text-[28px]">Hello, {user?.first_name}</h1>
          <p className="text-[13px] text-neutral-500">{user?.email}</p>
        </div>
        <button onClick={() => { logout(); toast.success('Signed out'); }} className="ml-auto text-[12px] underline text-neutral-600 hover:text-[#c43a47]">
          Sign out
        </button>
      </div>

      {/* Tab Nav */}
      <div className="border-b border-neutral-200 mb-8 flex gap-6 overflow-x-auto no-scrollbar">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 pb-3 uppercase-spaced text-[11px] whitespace-nowrap border-b-2 transition-colors ${tab === id ? 'border-[#1a1a1a] text-[#1a1a1a]' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ORDERS */}
      {tab === 'orders' && (
        <div>
          <h2 className="font-display text-[22px] mb-6">Order History</h2>
          {orders.length === 0 ? (
            <div className="py-16 text-center">
              <Package size={36} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-[15px] text-neutral-500">No orders yet.</p>
              <Link to="/" className="inline-block mt-4 bg-[#1a1a1a] text-white px-6 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-neutral-200 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="font-display text-[16px]">Order #{order.order_number}</div>
                      <div className="text-[12px] text-neutral-500 mt-1">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <span className="font-semibold text-[15px]">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    {order.items.map((item, i) => (
                      <Link key={i} to={`/products/${item.slug}`} className="flex-shrink-0 w-16 h-20 bg-neutral-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 text-[12px] text-neutral-500">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''} · Shipped to {order.shipping_address.city}, {order.shipping_address.state}
                    {order.card_last4 && ` · •••• ${order.card_last4}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* WISHLIST */}
      {tab === 'wishlist' && (
        <div>
          <h2 className="font-display text-[22px] mb-6">My Wishlist ({wishlist.length})</h2>
          {wishlist.length === 0 ? (
            <div className="py-16 text-center">
              <Heart size={36} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-[15px] text-neutral-500">Your wishlist is empty.</p>
              <Link to="/" className="inline-block mt-4 bg-[#1a1a1a] text-white px-6 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47]">Discover Pieces</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {wishlist.map((item) => (
                <div key={item.product_id} className="group relative">
                  <Link to={`/products/${item.slug}`} className="block aspect-[3/4] bg-neutral-100 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <button onClick={() => handleRemoveWishlist(item.product_id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-[#c43a47] text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                  <div className="mt-3">
                    <Link to={`/products/${item.slug}`} className="font-display text-[14px] hover:text-[#c43a47] line-clamp-2">{item.title}</Link>
                    <div className="text-[13px] mt-1">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADDRESSES */}
      {tab === 'addresses' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-[22px]">Saved Addresses</h2>
            <button onClick={() => setAddrModal('new')} className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2.5 uppercase-spaced text-[11px] hover:bg-[#c43a47]">
              <Plus size={14} /> Add Address
            </button>
          </div>
          {addresses.length === 0 ? (
            <div className="py-16 text-center">
              <MapPin size={36} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-[15px] text-neutral-500">No saved addresses.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="border border-neutral-200 p-5 relative">
                  {addr.is_default && <span className="absolute top-3 right-3 text-[10px] uppercase-spaced bg-[#1a1a1a] text-white px-2 py-0.5">Default</span>}
                  <div className="text-[14px] font-medium">{addr.first_name} {addr.last_name}</div>
                  <div className="text-[13px] text-neutral-600 mt-1 space-y-0.5">
                    <div>{addr.address1}{addr.address2 ? `, ${addr.address2}` : ''}</div>
                    <div>{addr.city}, {addr.state} {addr.zip_code}</div>
                    <div>{addr.country}</div>
                    {addr.phone && <div>{addr.phone}</div>}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setAddrModal(addr)} className="flex items-center gap-1.5 text-[12px] uppercase-spaced text-neutral-600 hover:text-[#1a1a1a]">
                      <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => handleDeleteAddress(addr.id)} className="flex items-center gap-1.5 text-[12px] uppercase-spaced text-neutral-500 hover:text-[#c43a47]">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {addrModal && <AddressForm initial={addrModal === 'new' ? null : addrModal} onSave={handleSaveAddress} onClose={() => setAddrModal(null)} />}
        </div>
      )}

      {/* PROFILE */}
      {tab === 'profile' && (
        <div className="max-w-lg space-y-8">
          <div>
            <h2 className="font-display text-[22px] mb-5">Profile Details</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" name="first_name" defaultValue={user?.first_name} placeholder="First name" required />
                <Field label="Last name" name="last_name" defaultValue={user?.last_name} placeholder="Last name" />
              </div>
              <Field label="Email" icon={Mail} name="email" type="email" defaultValue={user?.email} placeholder="Email" required />
              <button disabled={loading} className="bg-[#1a1a1a] text-white px-6 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47] disabled:opacity-60">
                {loading ? 'Saving…' : 'Save Changes'}
              </button>
            </form>
          </div>
          <div className="border-t border-neutral-200 pt-8">
            <h3 className="font-display text-[20px] mb-5">Change Password</h3>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <Field label="Current password" icon={Lock} name="current_password" type="password" placeholder="Current password" required />
              <Field label="New password" icon={Lock} name="new_password" type="password" placeholder="New password (min 6)" required />
              <Field label="Confirm new password" icon={Lock} name="confirm_password" type="password" placeholder="Confirm new password" required />
              <button disabled={loading} className="bg-[#1a1a1a] text-white px-6 py-3 uppercase-spaced text-[11px] hover:bg-[#c43a47] disabled:opacity-60">
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Export
const Account = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-neutral-400 text-[13px]">Loading…</div></div>;
  return user ? <Dashboard /> : <AuthForm />;
};

export default Account;
