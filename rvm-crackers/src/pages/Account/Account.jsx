import { Link } from 'react-router-dom';
import { ClipboardList, Heart, PackageSearch, UserRound } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { getOrders } from '../../utils/orders';
import { formatINR } from '../../utils/format';
import '../Category/category.css';
import '../Home/home.css';
import '../Static/static.css';

export default function Account() {
  usePageMeta('My Account', 'Your RVM Crackers account — enquiries, wishlist and profile.');
  const orders = getOrders();

  return (
    <div className="container static-pg" style={{ maxWidth: 'var(--container)' }}>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'My Account' }]} />
      <h1>My Account</h1>
      <p>
        <UserRound size={16} style={{ verticalAlign: '-3px' }} /> Guest mode — sign-in requires a backend
        and is UI-only for now. <Link to="/login">View the Login / Register screens →</Link>
      </p>

      <h2><ClipboardList size={20} style={{ verticalAlign: '-3px' }} /> My Order Enquiries</h2>
      {orders.length === 0 ? (
        <div className="empty">
          <PackageSearch size={44} />
          <h3>No enquiries yet</h3>
          <p>Enquiries you submit at checkout appear here (saved on this device).</p>
          <Link to="/products" className="btn btn--primary">Start Shopping</Link>
        </div>
      ) : (
        <div>
          {orders.map((o) => (
            <details className="faq-item" key={o.ref} style={{ marginBottom: 'var(--sp-3)' }}>
              <summary>
                <span><b>{o.ref}</b> · {new Date(o.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {formatINR(o.total)}</span>
              </summary>
              <div style={{ padding: '0 var(--sp-5) var(--sp-4)', fontSize: 'var(--fs-sm)' }}>
                <p style={{ margin: '0 0 var(--sp-2)' }}><b>Status:</b> {o.status}</p>
                <ul style={{ margin: 0 }}>
                  {o.items.map((i) => <li key={i.id}>{i.name} — {i.qty} × {formatINR(i.price)}</li>)}
                </ul>
                <p style={{ margin: 'var(--sp-2) 0 0' }}>
                  Deliver to: {o.customer.address}, {o.customer.city}, {o.customer.state} — {o.customer.pin}
                </p>
              </div>
            </details>
          ))}
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)' }}>
            Live order tracking requires the backend; today this list reads enquiries saved in this browser.
          </p>
        </div>
      )}

      <h2 style={{ marginTop: 'var(--sp-7)' }}><Heart size={20} style={{ verticalAlign: '-3px' }} /> Wishlist</h2>
      <Link to="/wishlist" className="btn btn--outline">Open My Wishlist</Link>
    </div>
  );
}
