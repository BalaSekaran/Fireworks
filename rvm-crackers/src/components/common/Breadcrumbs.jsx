import { Link } from 'react-router-dom';

/**
 * items: [{ label, to? }] — the last item (or any without `to`) renders as plain text.
 * Styles live in pages/Category/category.css (.crumbs).
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`}>
              {item.to && !last ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              )}
              {!last && <span aria-hidden="true" style={{ margin: '0 2px 0 6px' }}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
