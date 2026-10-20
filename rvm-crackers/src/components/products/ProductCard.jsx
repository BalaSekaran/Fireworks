import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { discountPct } from '../../utils/format';
import { getCategory } from '../../data/categories';
import ProductImage from '../common/ProductImage';
import PriceBlock from './PriceBlock';
import QuantityStepper from './QuantityStepper';
import './products.css';

export default function ProductCard({ product }) {
  const { addToCart, inWishlist, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const off = discountPct(product.price, product.originalPrice);
  const cat = getCategory(product.category);

  return (
    <article className="pcard">
      <div className="pcard__badges">
        {off > 0 && <span className="badge badge--off">{off}% OFF</span>}
        {product.isBestSeller && <span className="badge badge--best">Best Seller</span>}
        {product.isDemo && <span className="badge badge--demo">Demo</span>}
      </div>
      <button
        type="button"
        className={`pcard__wish ${inWishlist(product.id) ? 'active' : ''}`}
        aria-label={inWishlist(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={inWishlist(product.id)}
        onClick={() => toggleWishlist(product.id)}
      >
        <Heart size={18} fill={inWishlist(product.id) ? 'currentColor' : 'none'} />
      </button>

      <Link to={`/product/${product.slug}`} className="pcard__media" tabIndex={-1} aria-hidden="true">
        <ProductImage src={product.images[0]} alt="" />
      </Link>

      <div className="pcard__body">
        <span className="pcard__cat">{cat?.name || product.category}</span>
        <h3 className="pcard__name">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <span className="pcard__pack">{product.packInfo}</span>
        <PriceBlock price={product.price} originalPrice={product.originalPrice} />
        <div className="pcard__actions">
          <QuantityStepper value={qty} onChange={setQty} label={`Quantity for ${product.name}`} />
          <button type="button" className="btn btn--primary" onClick={() => addToCart(product.id, qty)}>
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
