import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '../../data/site';
import { categories } from '../../data/categories';
import './layout.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <h4>{site.name}</h4>
            <p>
              Celebrate every special moment with premium-quality Sivakasi fireworks crafted for
              brighter, safer celebrations — sparklers, flower pots, chakkars, rockets and festive
              combo packs.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <Link to="/products">All Products</Link>
            <Link to="/quick-order">Quick Order</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/safety">Safety Information</Link>
          </div>

          <div>
            <h4>Collections</h4>
            {categories.slice(0, 6).map((c) => (
              <Link key={c.id} to={`/category/${c.slug}`}>{c.name}</Link>
            ))}
          </div>

          <div>
            <h4>Contact Us</h4>
            <div className="footer__contact-line"><MapPin size={16} /> {site.address}</div>
            <div className="footer__contact-line"><Phone size={16} /> {site.phone}</div>
            <div className="footer__contact-line"><Mail size={16} /> {site.email}</div>
          </div>
        </div>

        <p className="footer__disclaimer">
          Orders are received as enquiries and confirmed by our team subject to product availability,
          licensing and transport serviceability for your location. Fireworks are regulated goods —
          please follow all local rules and the safety instructions supplied with each product.
        </p>

        <div className="footer__legal">
          <span>© 2026 {site.name}. All rights reserved. Demo build — sample product data.</span>
          <span>
            <Link to="/policies/privacy">Privacy</Link>·
            <Link to="/policies/terms">Terms</Link>·
            <Link to="/policies/shipping">Shipping</Link>·
            <Link to="/policies/returns">Returns</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}