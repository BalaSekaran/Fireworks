import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, RotateCcw, ShieldAlert, ShoppingCart, Truck, Zap } from 'lucide-react';
import { byCategory, getProduct } from '../../data/products';
import { getCategory } from '../../data/categories';
import { faqs, site } from '../../data/site';
import { useStore } from '../../context/StoreContext';
import { discountPct, formatINR } from '../../utils/format';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductImage from '../../components/common/ProductImage';
import PriceBlock from '../../components/products/PriceBlock';
import QuantityStepper from '../../components/products/QuantityStepper';
import ProductGrid from '../../components/products/ProductGrid';
import NotFound from '../NotFound/NotFound';
import '../Category/category.css';
import '../Home/home.css';
import './product.css';

/* Keyed by slug so quantity and the selected gallery image reset when the
   shopper moves from one product to another (e.g. via "You may also like"). */
export default function Product() {
  const { slug } = useParams();
  return <ProductPage key={slug} slug={slug} />;
}

function ProductPage({ slug }) {
  const navigate = useNavigate();
  const product = getProduct(slug);
  const { addToCart, inWishlist, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  usePageMeta(product ? product.name : 'Product', product?.description);

  if (!product) return <NotFound />;

  const category = getCategory(product.category);
  const off = discountPct(product.price, product.originalPrice);
  const related = byCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);

  const buyNow = () => {
    addToCart(product.id, qty);
    navigate('/checkout');
  };

  return (
    <div className="container pdp">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: category.name, to: `/category/${category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="pdp__grid">
        <div className="pdp__gallery">
          <div className="pdp__main-img">
            <ProductImage src={product.images[imgIdx]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="pdp__thumbs" role="group" aria-label="Product images">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  className={`pdp__thumb ${i === imgIdx ? 'active' : ''}`}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === imgIdx}
                  onClick={() => setImgIdx(i)}
                >
                  <ProductImage src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="pdp__meta">
            {off > 0 && <span className="badge badge--off">{off}% OFF</span>}
            {product.isBestSeller && <span className="badge badge--best">Best Seller</span>}
            {product.isDemo && <span className="badge badge--demo">Demo Data</span>}
            <span className="pdp__sku">SKU: {product.id.toUpperCase()} · <Link to={`/category/${category.slug}`}>{category.name}</Link></span>
          </div>

          <h1>{product.name}</h1>
          <PriceBlock price={product.price} originalPrice={product.originalPrice} large />
          {off > 0 && (
            <p className="pdp__save">You save {formatINR((product.originalPrice - product.price))} per box</p>
          )}
          <p className="pdp__pack">{product.packInfo}</p>
          <p className={`pdp__stock ${product.inStock ? 'in' : 'out'}`}>
            {product.inStock ? '● In stock — pre-booking open' : '● Currently out of stock'}
          </p>
          <p>{product.description}</p>

          <div className="pdp__buy">
            <QuantityStepper value={qty} onChange={setQty} label={`Quantity for ${product.name}`} />
            <button className="btn btn--primary" disabled={!product.inStock} onClick={() => addToCart(product.id, qty)}>
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button className="btn btn--gold" disabled={!product.inStock} onClick={buyNow}>
              <Zap size={16} /> Buy Now
            </button>
            <button
              className="btn btn--outline"
              aria-pressed={inWishlist(product.id)}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={16} fill={inWishlist(product.id) ? 'currentColor' : 'none'} />
              {inWishlist(product.id) ? 'Saved' : 'Wishlist'}
            </button>
          </div>

          <div className="pdp__info-card">
            <Truck size={18} />
            <span>
              Delivery through licensed transport to serviceable PIN codes only. Minimum order{' '}
              {formatINR(site.minOrder.tn)} (TN &amp; PY) / {formatINR(site.minOrder.other)} (other states).
              Serviceability is confirmed with your order enquiry.
            </span>
          </div>
          <div className="pdp__info-card">
            <RotateCcw size={18} />
            <span>
              Free cancellation any time before dispatch confirmation. Fireworks cannot be returned after
              dispatch for safety and legal reasons — see our{' '}
              <Link to="/policies/returns">Return &amp; Cancellation Policy</Link>.
            </span>
          </div>
        </div>
      </div>

      <section className="pdp__section">
        <h2>Specifications</h2>
        <table className="spec-table">
          <tbody>
            {product.specs.map(([k, v]) => (
              <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="pdp__section">
        <h2><ShieldAlert size={20} style={{ verticalAlign: '-3px' }} /> Safety Instructions</h2>
        <div className="safety-box">
          <ul>
            <li>Read the instructions printed on the box before lighting.</li>
            <li>Light outdoors in an open space, away from buildings, vehicles and dry material.</li>
            <li>Light at arm’s length and step back immediately; never lean over the product.</li>
            <li>Children must use fireworks only under responsible adult supervision.</li>
            <li>Keep a bucket of water or sand nearby. Never relight a product that failed to ignite — soak it in water.</li>
            <li>Follow local rules on permitted timings and products in your area.</li>
          </ul>
          <Link to="/safety">Read the full safety guide</Link>
        </div>
      </section>

      <section className="pdp__section">
        <h2>Common Questions</h2>
        {faqs.slice(0, 4).map((f) => (
          <details className="faq-item" key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
        <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-sm)' }}>
          More questions? <Link to="/faq">See all FAQs</Link> or call us at {site.phone}.
        </p>
      </section>

      {related.length > 0 && (
        <section className="pdp__section">
          <h2>You May Also Like</h2>
          <ProductGrid products={related} />
        </section>
      )}

      {/* Mobile sticky buy bar (shown ≤ 900px via product.css) */}
      <div className="buybar" role="region" aria-label="Quick purchase">
        <PriceBlock price={product.price} originalPrice={product.originalPrice} />
        <button className="btn btn--primary" disabled={!product.inStock} onClick={() => addToCart(product.id, qty)}>
          <ShoppingCart size={16} /> Add {qty > 1 ? qty : ''}
        </button>
        <button className="btn btn--gold" disabled={!product.inStock} onClick={buyNow}>
          <Zap size={16} /> Buy Now
        </button>
      </div>
    </div>
  );
}
