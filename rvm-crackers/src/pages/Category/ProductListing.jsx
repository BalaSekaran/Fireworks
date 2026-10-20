import { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import { discountPct } from '../../utils/format';
import ProductGrid from '../../components/products/ProductGrid';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import './category.css';

const PAGE_SIZE = 12;

const PRICE_BANDS = [
  { id: 'all', label: 'All prices', test: () => true },
  { id: 'u100', label: 'Under ₹100', test: (p) => p.price < 100 },
  { id: '100-500', label: '₹100 – ₹500', test: (p) => p.price >= 100 && p.price <= 500 },
  { id: '500-1500', label: '₹500 – ₹1,500', test: (p) => p.price > 500 && p.price <= 1500 },
  { id: '1500+', label: 'Above ₹1,500', test: (p) => p.price > 1500 },
];

const SORTS = {
  default: { label: 'Default sorting', fn: () => 0 },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  discount: { label: 'Biggest discount', fn: (a, b) => discountPct(b.price, b.originalPrice) - discountPct(a.price, a.originalPrice) },
  name: { label: 'Name A–Z', fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function ProductListing({ title, description, crumbs, products, categoryOptions = null }) {
  const [sort, setSort] = useState('default');
  const [band, setBand] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [catFilter, setCatFilter] = useState('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const bandTest = PRICE_BANDS.find((b) => b.id === band).test;
    const list = products.filter(
      (p) =>
        bandTest(p) &&
        (!inStockOnly || p.inStock) &&
        (catFilter === 'all' || p.category === catFilter)
    );
    return [...list].sort(SORTS[sort].fn);
  }, [products, sort, band, inStockOnly, catFilter]);

  const resetFilters = () => {
    setBand('all'); setInStockOnly(false); setCatFilter('all'); setSort('default'); setVisible(PAGE_SIZE);
  };

  const shown = filtered.slice(0, visible);

  return (
    <div className="container listing">
      <Breadcrumbs items={crumbs} />
      <div className="listing__banner">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      <div className="listing__toolbar">
        <span className="listing__count" role="status">
          Showing {shown.length} of {filtered.length} products
        </span>
        <span className="spacer" />
        <label className="sr-only" htmlFor="sort">Sort products</label>
        <select id="sort" className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
          {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div className="listing__layout">
        <aside className="filters" aria-label="Product filters">
          <h2>Filters</h2>
          <fieldset>
            <legend>Price</legend>
            {PRICE_BANDS.map((b) => (
              <label key={b.id}>
                <input type="radio" name="price" checked={band === b.id} onChange={() => { setBand(b.id); setVisible(PAGE_SIZE); }} />
                {b.label}
              </label>
            ))}
          </fieldset>
          {categoryOptions && (
            <fieldset>
              <legend>Category</legend>
              <label>
                <input type="radio" name="cat" checked={catFilter === 'all'} onChange={() => { setCatFilter('all'); setVisible(PAGE_SIZE); }} />
                All categories
              </label>
              {categoryOptions.map((c) => (
                <label key={c.id}>
                  <input type="radio" name="cat" checked={catFilter === c.slug} onChange={() => { setCatFilter(c.slug); setVisible(PAGE_SIZE); }} />
                  {c.name}
                </label>
              ))}
            </fieldset>
          )}
          <fieldset>
            <legend>Availability</legend>
            <label>
              <input type="checkbox" checked={inStockOnly} onChange={(e) => { setInStockOnly(e.target.checked); setVisible(PAGE_SIZE); }} />
              In stock only
            </label>
          </fieldset>
          <button className="btn btn--outline btn--block" onClick={resetFilters}>Reset Filters</button>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="empty">
              <SearchX size={44} />
              <h3>No products match these filters</h3>
              <p>Try widening the price range or clearing the filters.</p>
              <button className="btn btn--primary" onClick={resetFilters}>Reset Filters</button>
            </div>
          ) : (
            <>
              <ProductGrid products={shown} />
              {visible < filtered.length && (
                <div className="section-more">
                  <button className="btn btn--outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Load More ({filtered.length - visible} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
