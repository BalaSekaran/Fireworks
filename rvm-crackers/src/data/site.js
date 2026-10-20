/* Business information — edit these before going live. */
const minOrder = {
  tn: 2500,    // Tamil Nadu & Puducherry
  other: 5000, // all other states
};

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

export const site = {
  name: 'RVM Crackers',
  tagline: 'Premium Sivakasi Fireworks',
  // DEMO CONTACT DETAILS — replace with the real business details.
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'orders@rvmcrackers.example',
  address: 'Sattur Road, Sivakasi, Virudhunagar District, Tamil Nadu 626123',
  hours: 'Mon–Sun, 9:00 AM – 9:00 PM (Diwali season)',
  minOrder,
  // AnnouncementBar strips the leading "Diwali 2026 pre-booking open · " and
  // re-renders it with a bold label, so keep that prefix intact.
  announcement: `Diwali 2026 pre-booking open · Min. order ${inr(minOrder.tn)} in TN & PY · Confirmed by phone before payment`,
};

/* Primary navigation. Items with `dropdown: true` render the category menu. */
export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'Shop', dropdown: true },
  { label: 'Quick Order', to: '/quick-order' },
  { label: 'About', to: '/about' },
  { label: 'Safety', to: '/safety' },
  { label: 'Contact', to: '/contact' },
];

export const faqs = [
  {
    q: 'How does ordering work? Do I pay online?',
    a: 'You submit your cart as an order enquiry — no payment is taken online. Our team calls or WhatsApps you to confirm stock, delivery to your PIN code and the final shipping charge. Payment is collected only after you confirm.',
  },
  {
    q: 'What is the minimum order value?',
    a: `${inr(minOrder.tn)} for Tamil Nadu and Puducherry, and ${inr(minOrder.other)} for other states. Licensed fireworks transport is booked per consignment, which is why a minimum applies.`,
  },
  {
    q: 'Which locations do you deliver to?',
    a: 'We deliver only through licensed transport operators, and only to locations where the sale and transport of fireworks is permitted. Serviceability depends on your PIN code and is confirmed when we call you about your enquiry.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Typically 3–7 days within Tamil Nadu and 5–12 days to other states after confirmation. During the final week before Diwali transport slots fill quickly, so pre-booking early is strongly recommended.',
  },
  {
    q: 'Can I cancel or change my order?',
    a: 'Yes — free of charge any time before we confirm dispatch. After dispatch, fireworks cannot be returned for safety and legal reasons. Damaged or missing items must be reported within 48 hours of delivery with photos.',
  },
  {
    q: 'Do you sell green crackers?',
    a: 'Yes. Products in our greener range are made to lower-emission formulations from established manufacturers. Product availability follows current regulations, which can vary by state and city.',
  },
  {
    q: 'Are the prices shown final?',
    a: 'Product prices shown are the festive prices, with the listed discount already applied. Shipping depends on your location and order size and is confirmed by our team before you pay.',
  },
  {
    q: 'Do you take bulk or corporate gifting orders?',
    a: 'Yes. Use the Quick Order price list for large orders, or contact us with your quantity and delivery location for a custom quote on gift boxes.',
  },
];
