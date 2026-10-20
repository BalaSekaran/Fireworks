import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { site } from '../../data/site';
import { formatINR } from '../../utils/format';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductImage from '../../components/common/ProductImage';
import QuantityStepper from '../../components/products/QuantityStepper';
import '../Category/category.css';
import './cart.css';

export default function Cart() {
  usePageMeta('Cart');
  const { cart, cartCount, subtotal, savings, setQty, removeFromCart, clearCart } = useStore();
  const belowMin = subtotal > 0 && subtotal < site.minOrder.tn;

  return (
    <div className="container cartpg">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <h1>Your Cart {cartCount > 0 && <small style={{ fontSize: 'var(--fs-base)', color: 'var(--c-muted)' }}>({cartCount} boxes)</small>}</h1>

      {cart.length === 0 ? (
        <div className="empty">
          <ShoppingCart size={44} />
          <h3>Your cart is empty</h3>
          <p>Browse the catalogue or use the Quick Order price list to build your Diwali order fast.</p>
          <Link to="/products" className="btn btn--primary" style={{ marginRight: 'var(--sp-3)' }}>Continue Shopping</Link>
          <Link to="/quick-order" className="btn btn--outline">Quick Order</Link>
        </div>
      ) : (
        <div className="cartpg__layout">
          <div>
            {cart.map(({ product, qty }) => (
              <div className="cartline" key={product.id}>
                <Link to={`/product/${product.slug}`} className="cartline__img" tabIndex={-1} aria-hidden="true">
                  <ProductImage src={product.images[0]} alt="" />
                </Link>
                <div>
                  <div className="cartline__name"><Link to={`/product/${product.slug}`}>{product.name}</Link></div>
                  <div className="cartline__pack">
                    {product.packInfo} · {product.originalPrice > product.price && <s>{formatINR(product.originalPrice)}</s>}{' '}
                    <b style={{ color: 'var(--c-primary)' }}>{formatINR(product.price)}</b>
                  </div>
                  <div className="cartline__controls">
                    <QuantityStepper value={qty} onChange={(v) => setQty(product.id, v)} label={`Quantity for ${product.name}`} />
                    <button className="cartline__remove" aria-label={`Remove ${product.name} from cart`} onClick={() => removeFromCart(product.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="cartline__total">
                  {formatINR(product.price * qty)}
                  {product.originalPrice > product.price && (
                    <span className="cartline__save">Save {formatINR((product.originalPrice - product.price) * qty)}</span>
                  )}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn--outline">Continue Shopping</Link>
              <button className="btn btn--outline" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>

          <aside className="summary" aria-label="Cart totals">
            <h2>Cart Totals</h2>
            <div className="summary__row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            {savings > 0 && <div className="summary__row"><span>Festive savings</span><span className="green">− {formatINR(savings)} already applied</span></div>}
            <div className="summary__row"><span>Shipping</span><span>Confirmed with enquiry</span></div>
            <div className="summary__row total"><span>Estimated Total</span><span>{formatINR(subtotal)}</span></div>

            {belowMin && (
              <p className="summary__note warn" role="status">
                Add {formatINR(site.minOrder.tn - subtotal)} more to reach the {formatINR(site.minOrder.tn)} Tamil Nadu
                minimum ({formatINR(site.minOrder.other)} for other states). You can still submit the enquiry — our
                team will advise.
              </p>
            )}
            <p className="summary__note">
              Coupons can be applied at checkout. Final shipping charges depend on your location and are
              confirmed by our team before any payment.
            </p>
            <Link to="/checkout" className="btn btn--primary btn--block">Proceed to Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
