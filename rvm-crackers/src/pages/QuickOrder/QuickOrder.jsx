import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { site } from '../../data/site';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/format';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductImage from '../../components/common/ProductImage';
import '../Category/category.css';
import './quickorder.css';

export default function QuickOrder() {
  usePageMeta('Quick Order Price List', 'Order the full crackers pricelist in one go — the fastest way to build a big Diwali order.');
  const { addToCart } = useStore();
  const navigate = useNavigate();
  const [qtys, setQtys] = useState({});

  const setQty = (id, v) => {
    const n = Math.max(0, Math.min(99, Math.floor(Number(v) || 0)));
    setQtys((q) => ({ ...q, [id]: n }));
  };

  const { total, itemCount } = useMemo(() => {
    let total = 0, itemCount = 0;
    for (const p of products) {
      const q = qtys[p.id] || 0;
      if (q > 0) { total += p.price * q; itemCount += q; }
    }
    return { total, itemCount };
  }, [qtys]);

  const submit = () => {
    for (const p of products) {
      const q = qtys[p.id] || 0;
      if (q > 0) addToCart(p.id, q);
    }
    navigate('/cart');
  };

  return (
    <div className="container listing qorder">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Quick Order' }]} />
      <div className="listing__banner">
        <h1>Quick Order — Full Price List</h1>
        <p>
          The fastest way to build a big Diwali order: enter quantities against the complete list and
          add everything to your cart in one go. Minimum order {formatINR(site.minOrder.tn)} (Tamil Nadu &amp; PY)
          · {formatINR(site.minOrder.other)} (other states).
        </p>
      </div>

      <div className="qorder__tablewrap">
        <table className="qorder__table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          {categories.map((cat) => {
            const rows = products.filter((p) => p.category === cat.id);
            if (rows.length === 0) return null;
            return (
              <tbody key={cat.id}>
                <tr className="qorder__cat-row">
                  <th colSpan={5} scope="rowgroup">{cat.name}</th>
                </tr>
                {rows.map((p) => {
                  const q = qtys[p.id] || 0;
                  return (
                    <tr key={p.id}>
                      <td className="qorder__img"><ProductImage src={p.images[0]} alt="" /></td>
                      <td>
                        <Link to={`/product/${p.slug}`}>{p.name}</Link>
                        <small>{p.packInfo}</small>
                      </td>
                      <td>
                        {p.originalPrice > p.price && <s>{formatINR(p.originalPrice)}</s>}
                        <b>{formatINR(p.price)}</b>
                      </td>
                      <td>
                        <label className="sr-only" htmlFor={`q-${p.id}`}>Quantity for {p.name}</label>
                        <input
                          id={`q-${p.id}`}
                          type="number" inputMode="numeric" min="0" max="99"
                          value={q === 0 ? '' : q}
                          placeholder="0"
                          onChange={(e) => setQty(p.id, e.target.value)}
                        />
                      </td>
                      <td className="qorder__amt">{q > 0 ? formatINR(p.price * q) : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>

      <div className="qorder__bar">
        <div className="container qorder__bar-inner">
          <span role="status">
            <b>Grand Total: {formatINR(total)}</b>
            {itemCount > 0 && <small> · {itemCount} boxes</small>}
            {total > 0 && total < site.minOrder.tn && (
              <small className="qorder__min"> · add {formatINR(site.minOrder.tn - total)} to reach the TN minimum</small>
            )}
          </span>
          <button className="btn btn--gold" disabled={itemCount === 0} onClick={submit}>
            Add {itemCount > 0 ? `${itemCount} Boxes` : ''} to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
