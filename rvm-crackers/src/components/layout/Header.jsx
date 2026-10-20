import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { mainNav, site } from '../../data/site';
import { categories } from '../../data/categories';
import { useStore } from '../../context/StoreContext';
import './layout.css';

export default function Header() {
  const { cartCount, wishlist, toast } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setDrawerOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="header__logo" aria-label={`${site.name} home`}>
            {/* Placeholder mark — swap for /public/images/logo.png when the real logo is uploaded */}
            <span className="header__logo-mark" aria-hidden="true">RVM</span>
            <span className="header__logo-text">
              <b>RVM</b>
              <span>Crackers</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {mainNav.map((item) =>
              item.dropdown ? (
                <div className="nav__item" key={item.label}>
                  <button className="nav__link" aria-haspopup="true">
                    {item.label} <ChevronDown size={16} aria-hidden="true" />
                  </button>
                  <div className="nav__dropdown">
                    {categories.map((c) => (
                      <Link key={c.id} to={`/category/${c.slug}`}>
                        {c.name}
                        <small>{c.blurb}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="nav__item" key={item.label}>
                  <NavLink to={item.to} className="nav__link" end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </div>
              )
            )}
          </nav>

          <div className="header__actions">
            <Link to="/search" className="icon-btn" aria-label="Search">
              <Search size={20} />
            </Link>
            <Link to="/account" className="icon-btn" aria-label="Account">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart size={20} />
              {wishlist.length > 0 && <span className="icon-btn__count">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label={`Cart, ${cartCount} items`}>
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="icon-btn__count">{cartCount}</span>}
            </Link>
            <button
              className="icon-btn header__burger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <aside className={`drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen} aria-label="Mobile menu">
        <button className="icon-btn drawer__close" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
          <X size={22} />
        </button>
        {mainNav.map((item) =>
          item.dropdown ? (
            <div key={item.label}>
              <NavLink to="/products">Shop by Category</NavLink>
              {categories.map((c) => (
                <NavLink key={c.id} to={`/category/${c.slug}`} className="drawer__sub">
                  {c.name}
                </NavLink>
              ))}
            </div>
          ) : (
            <NavLink key={item.label} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          )
        )}
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/account">Account</NavLink>
      </aside>

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
