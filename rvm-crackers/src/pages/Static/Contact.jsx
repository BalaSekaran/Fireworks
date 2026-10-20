import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { site } from '../../data/site';
import '../Category/category.css';
import '../Checkout/checkout.css';
import './static.css';

export default function Contact() {
  usePageMeta('Contact Us', 'Contact RVM Crackers for orders, delivery serviceability and bulk enquiries.');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.';
    if (form.message.trim().length < 10) next.message = 'Please write a short message (10+ characters).';
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <div className="container static-pg" style={{ maxWidth: 'var(--container)' }}>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
      <h1>Contact Us</h1>
      <div className="contact-grid">
        <div className="contact-card">
          <h2 style={{ marginTop: 0 }}>Reach Us Directly</h2>
          <div className="line"><MapPin size={18} /> {site.address}</div>
          <div className="line"><Phone size={18} /> <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></div>
          <div className="line"><Mail size={18} /> <a href={`mailto:${site.email}`}>{site.email}</a></div>
          <p style={{ fontSize: 'var(--fs-sm)', marginTop: 'var(--sp-4)' }}>
            For fastest response during the Diwali season, call or WhatsApp with your PIN code and
            approximate order value — we will confirm serviceability immediately.
          </p>
        </div>

        {sent ? (
          <div className="empty">
            <h3>Message saved (demo)</h3>
            <p>
              No mail server is connected yet, so this form stores nothing and sends nothing — in
              production it will email {site.email}. For now, please call or email us directly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className={`field ${errors.name ? 'invalid' : ''}`} style={{ marginBottom: 'var(--sp-4)' }}>
              <label htmlFor="c-name">Your name *</label>
              <input id="c-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <span className="field__error" role="alert">{errors.name}</span>}
            </div>
            <div className={`field ${errors.email ? 'invalid' : ''}`} style={{ marginBottom: 'var(--sp-4)' }}>
              <label htmlFor="c-email">Email *</label>
              <input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <span className="field__error" role="alert">{errors.email}</span>}
            </div>
            <div className={`field ${errors.message ? 'invalid' : ''}`} style={{ marginBottom: 'var(--sp-4)' }}>
              <label htmlFor="c-msg">Message *</label>
              <textarea id="c-msg" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {errors.message && <span className="field__error" role="alert">{errors.message}</span>}
            </div>
            <button className="btn btn--primary" type="submit">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}
