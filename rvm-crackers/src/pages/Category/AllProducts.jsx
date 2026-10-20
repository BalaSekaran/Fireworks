import { categories } from '../../data/categories';
import { products } from '../../data/products';
import usePageMeta from '../../hooks/usePageMeta';
import ProductListing from './ProductListing';

export default function AllProducts() {
  usePageMeta('All Products', 'Browse the complete range of Sivakasi crackers — sparklers, flower pots, chakkars, rockets and combos.');
  return (
    <ProductListing
      title="All Products"
      description="Browse the complete RVM Crackers range — demo catalogue shown until the live pricelist is loaded."
      crumbs={[{ label: 'Home', to: '/' }, { label: 'All Products' }]}
      products={products}
      categoryOptions={categories}
    />
  );
}
