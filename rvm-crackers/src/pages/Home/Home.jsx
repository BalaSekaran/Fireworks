import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award, CircleDollarSign, Flame, Gift, Leaf, Lock, PartyPopper, Rocket,
  ShieldCheck, Sparkles, Sun, Truck,
} from 'lucide-react';
import { categories } from '../../data/categories';
import { bestSellers, combos } from '../../data/products';
import { faqs, site } from '../../data/site';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/format';
import useReveal from '../../hooks/useReveal';
import usePageMeta from '../../hooks/usePageMeta';
import ProductGrid from '../../components/products/ProductGrid';
import ProductImage from '../../components/common/ProductImage';
import PriceBlock from '../../components/products/PriceBlock';
import './home.css';

const catIcons = {
  sparklers: Sparkles, 'flower-pots': Sun, chakkars: PartyPopper, rockets: Rocket,
  'aerial-shots': Flame, fancy: PartyPopper, 'gift-packs': Gift, 'combo-packs': Gift,
};

function HeroArt() {
  return (
    <div className="hero__art" aria-hidden="true">
      <svg viewBox="0 0 400 320">
        {[
          [120, 110, 70], [290, 90, 50], [220, 230, 60],
        ].map(([cx, cy, r], i) => (
          <g className="hero__spark" key={i}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d9a441" strokeWidth="2" strokeDasharray="2 10" />
            <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke="#f3e2c4" strokeWidth="1.5" strokeDasharray="1 7" />
            <circle cx={cx} cy={cy} r="4" fill="#d9a441" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Section({ className = '', children }) {
  const ref = useReveal();
  return (
    <section ref={ref} className={`section reveal ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  usePageMeta('', 'Premium Sivakasi fireworks — sparklers, flower pots, chakkars, rockets and festive combo packs. Diwali pre-booking open.');
  const { addToCart } = useStore();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <span className="hero__eyebrow">Diwali 2026 Pre-Booking Open</span>
            <h1>
              Light up the night with <em>premium Sivakasi crackers</em>
            </h1>
            <p>
              Sparklers, flower pots, chakkars, rockets and curated combo packs —
              sourced from trusted Sivakasi makers and delivered through licensed transport.
            </p>
            <div className="hero__ctas">
              <Link to="/products" className="btn btn--gold">Shop Now</Link>
              <Link to="/quick-order" className="btn btn--outline" style={{ borderColor: 'var(--c-cream)', color: 'var(--c-cream)' }}>
                Quick Order Price List
              </Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust">
        <div className="container trust__row">
          {[
            [ShieldCheck, 'Quality Checked', 'Trusted Sivakasi makers'],
            [Leaf, 'Greener Options', 'Lower-emission ranges'],
            [Truck, 'Licensed Transport', 'Serviceable locations only'],
            [Award, 'Established Brands', 'Genuine branded stock'],
            [Lock, 'Enquiry-First Orders', 'Confirmed before payment'],
          ].map(([Icon, title, sub]) => (
            <div className="trust__item" key={title}>
              <Icon size={28} />
              <div><b>{title}</b><span>{sub}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <Section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Find Your Spark</span>
            <h2>Shop by Category</h2>
          </div>
          <div className="cats__row">
            {categories.map((c) => {
              const Icon = catIcons[c.id] || Sparkles;
              return (
                <Link to={`/category/${c.slug}`} className="cat-chip" key={c.id}>
                  <span className="cat-chip__circle"><Icon size={34} /></span>
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* COLLECTION BANNERS */}
      <Section>
        <div className="container collections">
          <div className="collection collection--maroon">
            <span className="eyebrow">Premium Collection</span>
            <h3>Gift Packs &amp; Assortments</h3>
            <p>Ready-to-gift boxes curated across our most-loved items.</p>
            <Link to="/category/gift-packs" className="btn btn--gold">View Gift Packs</Link>
          </div>
          <div className="collection collection--green">
            <span className="eyebrow">Best Value</span>
            <h3>Festive Combo Packs</h3>
            <p>Full-celebration bundles for families and apartments.</p>
            <Link to="/category/combo-packs" className="btn btn--gold">View Combos</Link>
          </div>
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section className="section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Customer Favourites</span>
            <h2>Our Best Sellers</h2>
          </div>
          <ProductGrid products={bestSellers.slice(0, 8)} />
          <div className="section-more">
            <Link to="/products" className="btn btn--outline">View All Products</Link>
          </div>
        </div>
      </Section>

      {/* COMBO SPOTLIGHT */}
      <Section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">One Click, Full Celebration</span>
            <h2>Popular Combo Packs</h2>
          </div>
          <div className="combo-list">
            {combos.map((p) => (
              <article className="combo" key={p.id}>
                <Link to={`/product/${p.slug}`} className="combo__media" aria-hidden="true" tabIndex={-1}>
                  <ProductImage src={p.images[0]} alt="" />
                </Link>
                <div>
                  <h3><Link to={`/product/${p.slug}`}>{p.name}</Link></h3>
                  <p>{p.description} <b>({p.packInfo})</b></p>
                  <PriceBlock price={p.price} originalPrice={p.originalPrice} large />
                  <button className="btn btn--primary" style={{ marginTop: 'var(--sp-3)' }} onClick={() => addToCart(p.id, 1)}>
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* WHY CHOOSE US */}
      <Section className="section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Celebrate with Confidence</span>
            <h2>Why Choose Us?</h2>
          </div>
          <div className="why__row">
            {[
              [ShieldCheck, 'Safe & Genuine', 'Carefully selected branded crackers with safety as our priority.'],
              [Award, 'Quality Products', 'A wide range of quality crackers from trusted manufacturers.'],
              [Truck, 'Reliable Delivery', 'Securely packed orders through licensed transport partners.'],
              [CircleDollarSign, 'Best Value', 'Honest festive pricing and value-packed combo bundles.'],
            ].map(([Icon, title, text]) => (
              <div className="why__card" key={title}>
                <span className="why__icon"><Icon size={26} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SAFETY TIPS */}
      <Section className="safety">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Celebrate Responsibly</span>
            <h2>Safety Tips for a Happy Diwali</h2>
          </div>
          <div className="safety__row">
            {[
              ['Keep Safe Distance', 'Maintain a safe distance while lighting and never hold lit fireworks.'],
              ['Adult Supervision', 'Children should use fireworks only under responsible adult supervision.'],
              ['Use Open Spaces', 'Light fireworks outdoors, clear of buildings and dry material.'],
              ['Keep Water Ready', 'Keep a bucket of water or sand nearby at all times.'],
              ['Follow Instructions', 'Read the safety instructions supplied with every product.'],
            ].map(([title, text], i) => (
              <div className="safety__card" key={title}>
                <span className="safety__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="safety__note">
            <b>Safety first:</b> follow local rules and the instructions supplied with each product.
            Never relight a failed firework. <Link to="/safety" style={{ color: 'var(--c-gold)' }}>Read full safety guide →</Link>
          </p>
        </div>
      </Section>

      {/* FAQ TEASER */}
      <Section>
        <div className="container faq-wrap">
          <div className="section-head">
            <span className="eyebrow">Good to Know</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          {faqs.slice(0, 3).map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <div className="section-more">
            <Link to="/faq" className="btn btn--outline">View All FAQs</Link>
          </div>
        </div>
      </Section>

      {/* NEWSLETTER */}
      <Section className="section--cream newsletter">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Stay in the Loop</span>
            <h2>Festive Offers &amp; Pre-Booking Alerts</h2>
          </div>
          <p>Minimum order {formatINR(site.minOrder.tn)} (Tamil Nadu) · {formatINR(site.minOrder.other)} (other states)</p>
          {subscribed ? (
            <p className="newsletter__ok" role="status">
              Thanks! Saved on this device — email delivery will activate once the backend is connected.
            </p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" required placeholder="Your email address" />
              <button className="btn btn--primary" type="submit">Notify Me</button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
