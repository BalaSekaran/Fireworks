const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** 1234.5 → "₹1,235" (Indian digit grouping: ₹1,00,000). */
export function formatINR(amount) {
  return inrFormatter.format(Math.round(Number(amount) || 0));
}

/** Whole-number discount percentage; 0 when there is no real discount. */
export function discountPct(price, originalPrice) {
  if (!originalPrice || !price || originalPrice <= price) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}
