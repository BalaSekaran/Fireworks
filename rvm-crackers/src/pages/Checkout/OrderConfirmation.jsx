import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, PhoneCall } from 'lucide-react';
import { getOrder } from '../../utils/orders';
import { site } from '../../data/site';
import { formatINR } from '../../utils/format';
import usePageMeta from '../../hooks/usePageMeta';
import './checkout.css';

export default function OrderConfirmation() {
  usePageMeta('Enquiry Received');
  const [params] = useSearchParams();
  const order = getOrder(params.get('ref'));
  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="container confirm">
      <span className="confirm__icon"><CheckCircle2 size={38} /></span>
      <h1>Enquiry Received</h1>
      <p className="confirm__ref">Reference: {order.ref}</p>
      <p>
        Thank you, {order.customer.firstName}. Your order enquiry has been recorded
        <b> on this device</b> (demo build — no server is connected yet, so nothing was transmitted).
        In production, our team would call <b>{order.customer.phone}</b> to confirm stock, delivery to
        PIN {order.customer.pin}, shipping charges and payment.
      </p>

      <div className="confirm__box">
        <b>Summary</b>
        <ul>
          {order.items.map((i) => (
            <li key={i.id}>{i.name} — {i.qty} × {formatINR(i.price)}</li>
          ))}
        </ul>
        {order.discount > 0 && <p>Coupon {order.coupon}: − {formatINR(order.discount)}</p>}
        <p><b>Total: {formatINR(order.total)}</b> (excl. shipping, confirmed on call)</p>
      </div>

      <p><PhoneCall size={16} style={{ verticalAlign: '-3px' }} /> Questions now? Call us at {site.phone}.</p>
      <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--sp-4)' }}>
        <Link to="/account" className="btn btn--outline">View My Enquiries</Link>
        <Link to="/products" className="btn btn--primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
