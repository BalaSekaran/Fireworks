import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { getProduct } from '../../data/products';
import usePageMeta from '../../hooks/usePageMeta';
import ProductGrid from '../../components/products/ProductGrid';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import '../Category/category.css';

export default function Wishlist() {
  usePageMeta('Wishlist');
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <div className="container listing">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <h1>My Wishlist</h1>
      {items.length === 0 ? (
        <div className="empty">
          <Heart size={44} />
          <h3>Nothing saved yet</h3>
          <p>Tap the heart on any product to keep it here for later — saved on this device.</p>
          <Link to="/products" className="btn btn--primary">Browse Products</Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
