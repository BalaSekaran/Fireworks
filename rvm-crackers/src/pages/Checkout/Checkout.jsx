import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { site } from '../../data/site';
import { applyCoupon } from '../../data/coupons';
import { saveOrder } from '../../utils/orders';
import { formatINR } from '../../utils/format';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductImage from '../../components/common/ProductImage';
import '../Category/category.css';
import '../Cart/cart.css';
import './checkout.css';

const STATES = ['Tamil Nadu', 'Puducherry', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Maharashtra', 'Other'];

const validators = {
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email address.'),
  firstName: (v) => (v.trim() ? '' : 'First name is required.'),
  lastName: () => '',
  phone: (v) => (/^[6-9]\d{9}$/.test(v.replace(/\s/g, '')) ? '' : 'Enter a valid 10-digit Indian mobile number.'),
  address: (v) => (v.trim().length >= 8 ? '' : 'Enter your full street address.'),
  city: (v) => (v.trim() ? '' : 'City is required.'),
  state: (v) => (v ? '' : 'Select a state.'),
  pin: (v) => (/^\d{6}$/.test(v) ? '' : 'Enter a valid 6-digit PIN code.'),
};

/* Defined OUTSIDE the page component so inputs keep focus across re-renders. */
function Field({ k, label, error, full = false, children }) {
  return (
    <div className={`field ${full ? 'full' : ''} ${error ? 'invalid' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      {children}
      {error && <span className="field__error" role="alert">{error}</span>}
    </div>
  );
}

export default function Checkout() {
  usePageMeta('Checkout');
  const { cart, subtotal, savings, clearCart } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', state: 'Tamil Nadu', pin: '', note: '',
  });
  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (cart.length === 0 && !submitted) return <Navigate to="/cart" replace />;

  const discount = couponState?.ok ? couponState.discount : 0;
  const total = subtotal - discount;
  const minOrder = ['Tamil Nadu', 'Puducherry'].includes(form.state) ? site.minOrder.tn : site.minOrder.other;

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: validators[k]?.(e.target.value) ?? '' }));
  };

  const tryCoupon = () => setCouponState(applyCoupon(couponCode, subtotal));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    for (const [k, fn] of Object.entries(validators)) {
      const msg = fn(form[k] ?? '');
      if (msg) next[k] = msg;
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.querySelector('.field.invalid input, .field.invalid select')?.focus();
      return;
    }
    const order = saveOrder({
      customer: form,
      items: cart.map(({ product, qty }) => ({ id: product.id, name: product.name, price: product.price, qty })),
      subtotal, discount, total,
      coupon: couponState?.ok ? couponState.coupon.code : null,
    });
    setSubmitted(true);
    navigate(`/order-confirmation?ref=${order.ref}`);
    clearCart();
  };

  return (
    <div className="container checkout">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1>Checkout</h1>

      <form className="checkout__layout" onSubmit={submit} noValidate>
        <div>
          <section className="form-section">
            <h2>Contact Information</h2>
            <div className="form-grid">
              <Field k="email" label="Email address *" error={errors.email} full>
                <input id="f-email" type="email" value={form.email} onChange={set('email')} onBlur={set('email')} autoComplete="email" />
              </Field>
              <Field k="phone" label="Mobile number *" error={errors.phone} full>
                <input id="f-phone" type="tel" inputMode="numeric" value={form.phone} onChange={set('phone')} onBlur={set('phone')} autoComplete="tel" placeholder="10-digit mobile" />
              </Field>
            </div>
          </section>

          <section className="form-section">
            <h2>Delivery Address</h2>
            <div className="form-grid">
              <Field k="firstName" label="First name *" error={errors.firstName}>
                <input id="f-firstName" value={form.firstName} onChange={set('firstName')} onBlur={set('firstName')} autoComplete="given-name" />
              </Field>
              <Field k="lastName" label="Last name" error={errors.lastName}>
                <input id="f-lastName" value={form.lastName} onChange={set('lastName')} autoComplete="family-name" />
              </Field>
              <Field k="address" label="Street address *" error={errors.address} full>
                <input id="f-address" value={form.address} onChange={set('address')} onBlur={set('address')} autoComplete="street-address" />
              </Field>
              <Field k="city" label="City *" error={errors.city}>
                <input id="f-city" value={form.city} onChange={set('city')} onBlur={set('city')} autoComplete="address-level2" />
              </Field>
              <Field k="state" label="State *" error={errors.state}>
                <select id="f-state" value={form.state} onChange={set('state')}>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field k="pin" label="PIN code *" error={errors.pin}>
                <input id="f-pin" inputMode="numeric" maxLength={6} value={form.pin} onChange={set('pin')} onBlur={set('pin')} autoComplete="postal-code" />
              </Field>
            </div>
          </section>

          <section className="form-section">
            <h2>Payment</h2>
            <label className="pay-option">
              <input type="radio" name="pay" checked readOnly />
              <span>
                <b>Submit Order Enquiry</b>
                <p>
                  Your enquiry is reviewed by our team, who confirm stock, delivery serviceability to PIN {form.pin || 'your PIN'},
                  and final shipping charges by phone/WhatsApp before any payment is collected.
                </p>
              </span>
            </label>
            <div className="pay-option pay-option--disabled" aria-disabled="true">
              <span>
                <b>Online Payment (Razorpay) — not yet active</b>
                <p>Appears here once the payment backend is connected. This demo never simulates a successful payment.</p>
              </span>
            </div>
          </section>

          <section className="form-section field">
            <label htmlFor="f-note">Order note (optional)</label>
            <textarea id="f-note" rows={3} value={form.note} onChange={set('note')} placeholder="Delivery instructions, preferred call time…" />
          </section>

          <p style={{ fontSize: 'var(--fs-sm)' }}>
            By submitting you agree to our <Link to="/policies/terms">Terms &amp; Conditions</Link> and{' '}
            <Link to="/policies/privacy">Privacy Policy</Link>.
          </p>
          <button type="submit" className="btn btn--primary btn--block">Submit Order Enquiry</button>
        </div>

        <aside className="ordersum" aria-label="Order summary">
          <h2>Order Summary</h2>
          {cart.map(({ product, qty }) => (
            <div className="ordersum__line" key={product.id}>
              <ProductImage src={product.images[0]} alt="" />
              <span className="grow">{product.name}<small>{qty} × {formatINR(product.price)}</small></span>
              <b>{formatINR(product.price * qty)}</b>
            </div>
          ))}

          <div className="coupon">
            <label className="sr-only" htmlFor="coupon">Coupon code</label>
            <input id="coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon (try DIWALI5)" />
            <button type="button" className="btn btn--outline" onClick={tryCoupon}>Apply</button>
          </div>
          {couponState && (
            <p className={`coupon-msg ${couponState.ok ? 'ok' : 'err'}`} role="status">{couponState.message}</p>
          )}

          <div className="summary__row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
          {savings > 0 && <div className="summary__row"><span>Festive savings</span><span className="green">− {formatINR(savings)} applied</span></div>}
          {discount > 0 && <div className="summary__row"><span>Coupon</span><span className="green">− {formatINR(discount)}</span></div>}
          <div className="summary__row"><span>Shipping &amp; taxes</span><span>Confirmed by team</span></div>
          <div className="summary__row total"><span>Total</span><span>{formatINR(total)}</span></div>
          {total < minOrder && (
            <p className="summary__note warn" role="status">
              Below the {formatINR(minOrder)} minimum for {form.state}. You may still submit — our team will advise options.
            </p>
          )}
        </aside>
      </form>
    </div>
  );
}
