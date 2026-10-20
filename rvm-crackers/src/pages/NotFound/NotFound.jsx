import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';
import '../Category/category.css';
import '../../components/products/products.css';

export default function NotFound() {
  usePageMeta('Page Not Found');
  return (
    <div className="container section">
      <div className="empty">
        <Compass size={44} />
        <h1 style={{ fontSize: 'var(--fs-2xl)' }}>404 — This page fizzled out</h1>
        <p>The page you’re looking for doesn’t exist or may have moved.</p>
        <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--primary">Go Home</Link>
          <Link to="/products" className="btn btn--outline">Browse Products</Link>
          <Link to="/search" className="btn btn--outline">Search</Link>
        </div>
      </div>
    </div>
  );
}
