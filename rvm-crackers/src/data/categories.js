/* Category `id` and `slug` are intentionally identical: products reference
   their category by this value, and URLs use it as /category/<slug>. */
export const categories = [
  { id: 'sparklers', slug: 'sparklers', name: 'Sparklers', blurb: 'Electric, colour and crackling sparklers in every length.' },
  { id: 'flower-pots', slug: 'flower-pots', name: 'Flower Pots', blurb: 'Fountains of golden and colour sparks from the ground.' },
  { id: 'chakkars', slug: 'chakkars', name: 'Ground Chakkars', blurb: 'Spinning ground wheels — a family favourite.' },
  { id: 'rockets', slug: 'rockets', name: 'Rockets', blurb: 'Sky rockets with whistles, crackles and colour bursts.' },
  { id: 'aerial-shots', slug: 'aerial-shots', name: 'Aerial Shots', blurb: 'Multi-shot cakes that paint the sky in sequence.' },
  { id: 'fancy', slug: 'fancy', name: 'Fancy Novelties', blurb: 'Pencils, twinklers, smoke and other kid-friendly items.' },
  { id: 'gift-packs', slug: 'gift-packs', name: 'Gift Packs', blurb: 'Ready-to-gift assortment boxes for friends and family.' },
  { id: 'combo-packs', slug: 'combo-packs', name: 'Combo Packs', blurb: 'Full-celebration bundles at the best value.' },
];

/** Look up a category by id or slug. Returns undefined if not found. */
export function getCategory(idOrSlug) {
  return categories.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}
