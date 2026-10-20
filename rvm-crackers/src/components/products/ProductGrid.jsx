import ProductCard from './ProductCard';
import './products.css';

export default function ProductGrid({ products }) {
  return (
    <div className="pgrid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
