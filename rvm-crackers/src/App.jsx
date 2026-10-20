import { Route, Routes } from 'react-router-dom';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

import Home from './pages/Home/Home';
import AllProducts from './pages/Category/AllProducts';
import Category from './pages/Category/Category';
import Product from './pages/Product/Product';
import Search from './pages/Search/Search';
import QuickOrder from './pages/QuickOrder/QuickOrder';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderConfirmation from './pages/Checkout/OrderConfirmation';
import Wishlist from './pages/Wishlist/Wishlist';
import Account from './pages/Account/Account';
import Auth from './pages/Account/Auth';
import About from './pages/Static/About';
import Contact from './pages/Static/Contact';
import Faq from './pages/Static/Faq';
import Safety from './pages/Static/Safety';
import Policy from './pages/Policies/Policy';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">Skip to content</a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/quick-order" element={<QuickOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/policies/:slug" element={<Policy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
