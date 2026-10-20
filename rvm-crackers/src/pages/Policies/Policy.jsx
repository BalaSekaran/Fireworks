import { useParams } from 'react-router-dom';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import NotFound from '../NotFound/NotFound';
import '../Category/category.css';
import '../Static/static.css';

/* DEMO POLICY DRAFTS — written to match the enquiry-based model, but these are
   templates. Have them reviewed/edited by the business (and ideally a lawyer)
   before production. */
const policies = {
  shipping: {
    title: 'Shipping & Delivery Policy',
    sections: [
      ['Serviceability', 'Fireworks are transported only through licensed transport partners. We confirm whether your PIN code is serviceable when processing your order enquiry — some locations cannot be served due to transport regulations.'],
      ['Minimum Order', 'Minimum order value is ₹3,000 for Tamil Nadu & Puducherry and ₹5,000 for other serviceable states, reflecting transport requirements.'],
      ['Charges & Timelines', 'Shipping charges depend on location and order volume and are quoted during order confirmation, before any payment. Typical dispatch is 2–5 working days after confirmation; Diwali-season timelines are communicated at confirmation.'],
      ['Packing', 'Orders are packed in sealed cartons. Please verify the carton seal on receipt and report any damage within 24 hours with photos.'],
    ],
  },
  returns: {
    title: 'Return, Refund & Cancellation Policy',
    sections: [
      ['Cancellation', 'You may cancel free of charge any time before dispatch confirmation by calling or messaging us with your reference number. If any advance was paid, it is refunded in full to the original method within 5–7 working days.'],
      ['Returns', 'Due to the regulated and hazardous nature of fireworks, products cannot be returned or exchanged after dispatch.'],
      ['Damaged or Missing Items', 'If the carton arrives damaged or items are missing, report it within 24 hours of delivery with photos of the carton and contents. Verified claims are resolved by replacement or refund of the affected items.'],
      ['Non-Serviceable Orders', 'If we cannot serve your location after your enquiry, the order is cancelled with no obligation and any advance is fully refunded.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['What We Collect', 'When you submit an order or contact enquiry we collect your name, phone number, email and delivery address — only what is needed to process your order.'],
      ['How We Use It', 'Your details are used to confirm orders, arrange delivery and respond to enquiries. We do not sell or share your personal data with third parties except transport partners, and only as needed for delivery.'],
      ['Storage', 'In this demo build, cart, wishlist and enquiry data are stored only in your own browser (localStorage) and are not transmitted to any server. In production, data will be stored securely and this policy updated with specifics.'],
      ['Your Choices', 'You may ask us to delete your enquiry data at any time by contacting us. Clearing your browser storage removes all locally saved data.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      ['Orders Are Enquiries', 'Submitting a checkout form places an order enquiry, not a confirmed sale. A contract forms only when our team confirms stock, serviceability and charges with you, and payment terms are agreed.'],
      ['Pricing', 'Prices shown include the advertised festive discount on list price. Prices and availability may change until your order is confirmed. Obvious listing errors may be corrected before confirmation.'],
      ['Legal Compliance', 'Products are sold only where permitted and only through licensed transport. Buyers are responsible for complying with local regulations on use, timing and location of fireworks.'],
      ['Safe Use', 'Fireworks are hazardous goods. Follow the safety instructions supplied with each product and on our Safety page. We are not liable for injury or damage arising from misuse.'],
      ['Demo Notice', 'This website currently runs with sample product data and an enquiry-only checkout for demonstration. No payments are collected online.'],
    ],
  },
};

export default function Policy() {
  const { slug } = useParams();
  const policy = policies[slug];
  usePageMeta(policy?.title || 'Policy');
  if (!policy) return <NotFound />;

  return (
    <div className="container static-pg">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: policy.title }]} />
      <h1>{policy.title}</h1>
      <p><em>Draft template for review — last updated October 2026 (demo).</em></p>
      {policy.sections.map(([h, body]) => (
        <section key={h}><h2>{h}</h2><p>{body}</p></section>
      ))}
    </div>
  );
}
