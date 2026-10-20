import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getProduct } from '../data/products';

/* Cart + wishlist state, persisted to localStorage on this device.
   Cart is stored as [{ id, qty }] and expanded to [{ product, qty }] for consumers. */

const CART_KEY = 'rvm.cart.v1';
const WISH_KEY = 'rvm.wishlist.v1';
const MAX_QTY = 99;

const StoreContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function persist(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked (private mode) — keep working in memory */
  }
}

const clampQty = (n) => Math.max(0, Math.min(MAX_QTY, Math.floor(Number(n) || 0)));

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    load(CART_KEY, []).filter((i) => getProduct(i.id) && clampQty(i.qty) > 0)
  );
  const [wishlist, setWishlist] = useState(() => load(WISH_KEY, []).filter((id) => getProduct(id)));
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => persist(CART_KEY, cartItems), [cartItems]);
  useEffect(() => persist(WISH_KEY, wishlist), [wishlist]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2400);
  }, []);

  const addToCart = useCallback((id, qty = 1) => {
    const product = getProduct(id);
    const n = clampQty(qty);
    if (!product || n === 0) return;
    setCartItems((items) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) => (i.id === product.id ? { ...i, qty: clampQty(i.qty + n) } : i));
      }
      return [...items, { id: product.id, qty: n }];
    });
    notify(`Added ${n} × ${product.name} to cart`);
  }, [notify]);

  const setQty = useCallback((id, qty) => {
    const n = clampQty(qty);
    setCartItems((items) =>
      n === 0 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, qty: n } : i))
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((items) => items.filter((i) => i.id !== id));
    const product = getProduct(id);
    if (product) notify(`Removed ${product.name}`);
  }, [notify]);

  const clearCart = useCallback(() => setCartItems([]), []);

  const inWishlist = useCallback((id) => wishlist.includes(id), [wishlist]);

  const toggleWishlist = useCallback((id) => {
    const product = getProduct(id);
    if (!product) return;
    const has = wishlist.includes(product.id);
    setWishlist((list) => (has ? list.filter((x) => x !== product.id) : [...new Set([...list, product.id])]));
    notify(has ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`);
  }, [wishlist, notify]);

  const value = useMemo(() => {
    const cart = cartItems
      .map(({ id, qty }) => ({ product: getProduct(id), qty }))
      .filter((line) => line.product);
    let cartCount = 0, subtotal = 0, savings = 0;
    for (const { product, qty } of cart) {
      cartCount += qty;
      subtotal += product.price * qty;
      if (product.originalPrice > product.price) savings += (product.originalPrice - product.price) * qty;
    }
    return {
      cart, cartCount, subtotal, savings,
      addToCart, setQty, removeFromCart, clearCart,
      wishlist, inWishlist, toggleWishlist,
      toast,
    };
  }, [cartItems, wishlist, toast, addToCart, setQty, removeFromCart, clearCart, inWishlist, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
