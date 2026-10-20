/* =====================================================================
   Order enquiries — DEMO STORAGE ONLY.
   saveOrder() writes to this browser's localStorage; nothing is sent
   anywhere. To go live, replace saveOrder with a POST to your backend
   (see README → "Payment & Backend Integration Boundary").
   ===================================================================== */

const ORDERS_KEY = 'rvm.orders.v1';

/* Kept in memory too, so the confirmation page works even if storage is blocked. */
let lastOrder = null;

function readAll() {
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function makeRef(date) {
  const ymd = date.toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RVM-${ymd}-${rand}`;
}

/**
 * Persist an enquiry and return it with a reference number.
 * @param {{ customer: object, items: Array, subtotal: number, discount: number, total: number, coupon: string|null }} data
 */
export function saveOrder(data) {
  const now = new Date();
  const order = {
    ref: makeRef(now),
    placedAt: now.toISOString(),
    status: 'Enquiry received — awaiting confirmation call',
    ...data,
  };
  const all = [order, ...readAll()];
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(all.slice(0, 50)));
  } catch {
    /* storage unavailable — order still returned so the flow completes */
  }
  lastOrder = order;
  return order;
}

export function getOrders() {
  return readAll();
}

export function getOrder(ref) {
  if (!ref) return null;
  if (lastOrder?.ref === ref) return lastOrder;
  return readAll().find((o) => o.ref === ref) || null;
}
