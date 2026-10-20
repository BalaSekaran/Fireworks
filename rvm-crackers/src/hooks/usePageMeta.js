import { useEffect } from 'react';
import { site } from '../data/site';

const DEFAULT_DESCRIPTION =
  'Premium Sivakasi fireworks — sparklers, flower pots, chakkars, rockets and festive combo packs.';

/**
 * Set the document title and meta description for the current page.
 * usePageMeta('')              → "RVM Crackers — Premium Sivakasi Fireworks"
 * usePageMeta('Cart')          → "Cart | RVM Crackers"
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;

    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description || DEFAULT_DESCRIPTION);
  }, [title, description]);
}
