import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SearchX, X } from 'lucide-react';
import { products } from '../../data/products';
import { categories, getCategory } from '../../data/categories';
import { formatINR } from '../../utils/format';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductGrid from '../../components/products/ProductGrid';
import ProductImage from '../../components/common/ProductImage';
import '../Category/category.css';
import '../../components/products/products.css';
import './search.css';

const POPULAR = ['sparklers', 'flower pot', 'chakkar', 'rocket', 'shot', 'combo', 'gift box', 'green'];
const MAX_SUGGESTIONS = 6;

const normalise = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

/* Pre-compute a search index once. Name matches outrank category/description matches. */
const index = products.map((p) => ({
  product: p,
  name: normalise(p.name),
  rest: normalise(`${getCategory(p.category)?.name || ''} ${p.packInfo} ${p.description}`),
}));

function search(query) {
  const terms = normalise(query).split(' ').filter(Boolean);
  if (terms.length === 0) return [];
  const scored = [];
  for (const row of index) {
    let score = 0;
    let all = true;
    for (const t of terms) {
      if (row.name.startsWith(t)) score += 5;
      else if (row.name.includes(` ${t}`)) score += 4;
      else if (row.name.includes(t)) score += 3;
      else if (row.rest.includes(t)) score += 1;
      else { all = false; break; }
    }
    if (all) scored.push({ product: row.product, score });
  }
  return scored.sort((a, b) => b.score - a.score || a.product.price - b.product.price).map((s) => s.product);
}

export default function Search() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const committed = params.get('q') || '';
  const [text, setText] = useState(committed);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef(null);
  const listId = useId();

  usePageMeta(committed ? `Search: ${committed}` : 'Search', 'Search the RVM Crackers catalogue.');

  // Keep the box in sync when the URL changes from outside (back/forward, header links).
  useEffect(() => setText(committed), [committed]);

  const suggestions = useMemo(() => search(text).slice(0, MAX_SUGGESTIONS), [text]);
  const results = useMemo(() => search(committed), [committed]);
  const showList = open && text.trim().length > 0 && suggestions.length > 0;

  const commit = (q) => {
    const value = q.trim();
    setText(value);
    setOpen(false);
    setActive(-1);
    setParams(value ? { q: value } : {}, { replace: true });
  };

  const onKeyDown = (e) => {
    if (!showList) {
      if (e.key === 'ArrowDown' && suggestions.length) { setOpen(true); setActive(0); e.preventDefault(); }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (i + 1) % suggestions.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1)); }
    else if (e.key === 'Escape') { setOpen(false); setActive(-1); }
    else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      navigate(`/product/${suggestions[active].slug}`);
    }
  };

  return (
    <div className="container listing searchpg">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <h1>Search the catalogue</h1>

      <form
        className="searchbox"
        role="search"
        onSubmit={(e) => { e.preventDefault(); commit(text); }}
      >
        <SearchIcon size={20} className="searchbox__icon" aria-hidden="true" />
        <label htmlFor="search-input" className="sr-only">Search products</label>
        <input
          ref={inputRef}
          id="search-input"
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Try “sparklers”, “30 shot” or “combo”"
          value={text}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
          onChange={(e) => { setText(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
        />
        {text && (
          <button
            type="button"
            className="searchbox__clear"
            aria-label="Clear search"
            onClick={() => { setText(''); commit(''); inputRef.current?.focus(); }}
          >
            <X size={18} />
          </button>
        )}
        <button type="submit" className="btn btn--primary">Search</button>

        {showList && (
          <ul className="suggest" id={listId} role="listbox" aria-label="Suggestions">
            {suggestions.map((p, i) => (
              <li key={p.id} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <Link
                  to={`/product/${p.slug}`}
                  className={`suggest__item ${i === active ? 'active' : ''}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  tabIndex={-1}
                >
                  <span className="suggest__img"><ProductImage src={p.images[0]} alt="" /></span>
                  <span className="suggest__name">
                    {p.name}
                    <small>{getCategory(p.category)?.name}</small>
                  </span>
                  <b>{formatINR(p.price)}</b>
                </Link>
              </li>
            ))}
            <li role="presentation">
              <button type="submit" className="suggest__all" onMouseDown={(e) => e.preventDefault()}>
                See all results for “{text.trim()}”
              </button>
            </li>
          </ul>
        )}
      </form>

      {!committed ? (
        <div className="searchpg__browse">
          <h2>Popular searches</h2>
          <div className="chips">
            {POPULAR.map((term) => (
              <button key={term} type="button" className="chip" onClick={() => commit(term)}>{term}</button>
            ))}
          </div>
          <h2>Or browse a category</h2>
          <div className="chips">
            {categories.map((c) => (
              <Link key={c.id} to={`/category/${c.slug}`} className="chip">{c.name}</Link>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="empty">
          <SearchX size={44} />
          <h3>No products match “{committed}”</h3>
          <p>Check the spelling, try a shorter word like “pot” or “shot”, or browse everything.</p>
          <Link to="/products" className="btn btn--primary">View All Products</Link>
        </div>
      ) : (
        <>
          <p className="listing__count" role="status" style={{ display: 'inline-block', marginBottom: 'var(--sp-5)' }}>
            {results.length} {results.length === 1 ? 'product' : 'products'} for “{committed}”
          </p>
          <ProductGrid products={results} />
        </>
      )}
    </div>
  );
}
