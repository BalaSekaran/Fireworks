import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import '../Category/category.css';
import '../Cart/cart.css';
import '../Checkout/checkout.css';
import '../Static/static.css';

export default function Auth() {
  usePageMeta('Login / Register');
  const [mode, setMode] = useState('login');
  const isLogin = mode === 'login';

  return (
    <div className="container static-pg" style={{ maxWidth: 480 }}>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: isLogin ? 'Login' : 'Register' }]} />
      <h1>{isLogin ? 'Login' : 'Create Account'}</h1>
      <p className="summary__note" role="note">
        UI preview only — authentication activates once the backend is connected. Submitting does nothing yet;
        you can shop and submit enquiries as a guest meanwhile.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        {!isLogin && (
          <div className="field" style={{ marginBottom: 'var(--sp-4)' }}>
            <label htmlFor="a-name">Full name</label>
            <input id="a-name" autoComplete="name" />
          </div>
        )}
        <div className="field" style={{ marginBottom: 'var(--sp-4)' }}>
          <label htmlFor="a-email">Email</label>
          <input id="a-email" type="email" autoComplete="email" />
        </div>
        <div className="field" style={{ marginBottom: 'var(--sp-4)' }}>
          <label htmlFor="a-pass">Password</label>
          <input id="a-pass" type="password" autoComplete={isLogin ? 'current-password' : 'new-password'} />
        </div>
        <button className="btn btn--primary btn--block" type="submit" disabled>
          {isLogin ? 'Login' : 'Register'} (backend required)
        </button>
      </form>
      <p style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-sm)' }}>
        {isLogin ? 'New here? ' : 'Already have an account? '}
        <button className="btn btn--outline" style={{ padding: '6px 14px' }} onClick={() => setMode(isLogin ? 'register' : 'login')}>
          {isLogin ? 'Create an account' : 'Login instead'}
        </button>
      </p>
      <p style={{ fontSize: 'var(--fs-sm)' }}><Link to="/account">← Back to My Account</Link></p>
    </div>
  );
}
