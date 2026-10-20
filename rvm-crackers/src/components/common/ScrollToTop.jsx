import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Scroll to the top on route change (but not when only the query string
   changes, e.g. typing on the Search page), and honour #hash links. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
