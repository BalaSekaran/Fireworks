/* DEMO COUPONS — client-side only. Real coupon validation must happen on the
   server when the backend is connected, or anyone can invent discounts. */
export const coupons = [
  { code: 'DIWALI5', type: 'percent', value: 5, minSubtotal: 2000, maxDiscount: 500, label: '5% off (up to ₹500)' },
  { code: 'FLAT200', type: 'flat', value: 200, minSubtotal: 3000, label: '₹200 off' },
];

const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/**
 * Validate a coupon against a subtotal.
 * @returns {{ ok: false, message: string } | { ok: true, coupon: object, discount: number, message: string }}
 */
export function applyCoupon(rawCode, subtotal) {
  const code = String(rawCode || '').trim().toUpperCase();
  if (!code) return { ok: false, message: 'Enter a coupon code.' };

  const coupon = coupons.find((c) => c.code === code);
  if (!coupon) return { ok: false, message: `“${code}” is not a valid coupon.` };

  if (subtotal < coupon.minSubtotal) {
    return { ok: false, message: `${coupon.code} needs a subtotal of at least ${inr(coupon.minSubtotal)}.` };
  }

  let discount = coupon.type === 'percent' ? (subtotal * coupon.value) / 100 : coupon.value;
  if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  discount = Math.min(Math.round(discount), subtotal);

  return { ok: true, coupon, discount, message: `${coupon.code} applied — you save ${inr(discount)}.` };
}
