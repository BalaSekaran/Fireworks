import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { site } from '../../data/site';
import '../Category/category.css';
import './static.css';

export default function About() {
  usePageMeta('About Us', 'About RVM Crackers — a Tamil Nadu fireworks retailer offering premium Sivakasi crackers.');
  return (
    <div className="container static-pg">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
      <h1>About {site.name}</h1>
      <p>
        {site.name} is a Tamil Nadu–based fireworks retailer offering premium Sivakasi crackers —
        sparklers, flower pots, chakkars, rockets, fancy items, gift boxes and festive combo packs —
        sourced from established, licensed manufacturers.
      </p>
      <p>
        {/* DEMO COPY — replace with the real business story, years in operation,
            license details and team information before going live. */}
        We work on a simple promise: genuine branded stock, honest festive pricing, careful packing,
        and delivery only through licensed transport to serviceable locations. Every order is
        personally confirmed by our team before payment, so you always know exactly what is coming
        and when.
      </p>
      <h2>How We Work</h2>
      <ul>
        <li>Browse the catalogue or use the Quick Order price list.</li>
        <li>Submit your order as an enquiry — no payment is taken online.</li>
        <li>Our team confirms stock, transport serviceability for your PIN code, and final charges by phone or WhatsApp.</li>
        <li>Your confirmed order is packed in sealed cartons and dispatched via licensed transport.</li>
      </ul>
      <h2>Our Commitment to Safety &amp; Compliance</h2>
      <p>
        Fireworks are regulated goods. We sell only permitted products, follow applicable licensing
        and transport rules, and include safety guidance with every product. Please celebrate
        responsibly and follow local regulations in your area.
      </p>
    </div>
  );
}
