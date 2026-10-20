import { useParams } from 'react-router-dom';
import { getCategory } from '../../data/categories';
import { byCategory } from '../../data/products';
import usePageMeta from '../../hooks/usePageMeta';
import ProductListing from './ProductListing';
import NotFound from '../NotFound/NotFound';

export default function Category() {
  const { slug } = useParams();
  const category = getCategory(slug);
  usePageMeta(category ? category.name : 'Category', category?.blurb);
  if (!category) return <NotFound />;

  return (
    <ProductListing
      title={category.name}
      description={category.blurb}
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Categories', to: '/products' }, { label: category.name }]}
      products={byCategory(slug)}
    />
  );
}
