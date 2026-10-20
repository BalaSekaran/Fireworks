/* =====================================================================
   DEMO CATALOGUE — sample names and prices for layout and flow testing.
   Replace with the real price list and set isDemo: false on each item.

   Images: drop files at public/images/products/<id>.jpg (and
   <id>-2.jpg for a second gallery image). Missing files automatically
   render a branded placeholder, so the site never shows a broken image.
   ===================================================================== */

const img = (id, count = 1) =>
  Array.from({ length: count }, (_, i) => `/images/products/${id}${i ? `-${i + 1}` : ''}.jpg`);

/**
 * Compact product factory.
 * @param {string} id          short SKU-like id (used in cart, wishlist, image file names)
 * @param {string} slug        URL slug for /product/<slug>
 * @param {string} name
 * @param {string} category    category id from data/categories.js
 * @param {number} price       selling price in ₹ per unit/box
 * @param {number} originalPrice  list price in ₹ (shown struck through when higher)
 * @param {string} packInfo    e.g. "1 box · 10 pcs"
 * @param {string} description
 * @param {Array<[string,string]>} specs
 * @param {object} [extra]     { inStock, isBestSeller, images }
 */
function p(id, slug, name, category, price, originalPrice, packInfo, description, specs, extra = {}) {
  return {
    id, slug, name, category, price, originalPrice, packInfo, description,
    specs: [['Pack', packInfo], ...specs],
    images: extra.images ?? img(id),
    inStock: extra.inStock ?? true,
    isBestSeller: extra.isBestSeller ?? false,
    isDemo: true,
  };
}

export const products = [
  /* ---------------- Sparklers ---------------- */
  p('sp01', '7cm-electric-sparklers', '7 cm Electric Sparklers', 'sparklers', 45, 90, '1 box · 10 pcs',
    'Short, bright electric sparklers — ideal for younger children under adult supervision.',
    [['Length', '7 cm'], ['Effect', 'Bright white sparks'], ['Burn time', '≈ 25 seconds each']],
    { isBestSeller: true }),
  p('sp02', '10cm-colour-sparklers', '10 cm Colour Sparklers', 'sparklers', 65, 130, '1 box · 10 pcs',
    'Medium-length sparklers that change through red, green and gold as they burn.',
    [['Length', '10 cm'], ['Effect', 'Multi-colour sparks'], ['Burn time', '≈ 35 seconds each']]),
  p('sp03', '12cm-green-sparklers', '12 cm Green Sparklers', 'sparklers', 85, 170, '1 box · 10 pcs',
    'Vivid green sparklers from our greener, lower-emission range.',
    [['Length', '12 cm'], ['Effect', 'Green sparks'], ['Range', 'Greener formulation']],
    { images: img('sp03', 2) }),
  p('sp04', '15cm-crackling-sparklers', '15 cm Crackling Sparklers', 'sparklers', 110, 220, '1 box · 10 pcs',
    'Gold sparklers with a gentle crackle — a festive classic for the doorstep.',
    [['Length', '15 cm'], ['Effect', 'Gold sparks with crackle'], ['Burn time', '≈ 50 seconds each']],
    { isBestSeller: true }),
  p('sp05', '30cm-electric-sparklers', '30 cm Electric Sparklers', 'sparklers', 240, 480, '1 box · 5 pcs',
    'Extra-long electric sparklers for photos and long-lasting sparkle.',
    [['Length', '30 cm'], ['Effect', 'Bright white sparks'], ['Burn time', '≈ 90 seconds each']]),
  p('sp06', '50cm-rainbow-sparklers', '50 cm Rainbow Sparklers', 'sparklers', 420, 840, '1 box · 5 pcs',
    'Our longest sparkler, cycling through rainbow colours.',
    [['Length', '50 cm'], ['Effect', 'Rainbow colour change'], ['Burn time', '≈ 2 minutes each']],
    { inStock: false }),

  /* ---------------- Flower Pots ---------------- */
  p('fp01', 'flower-pot-small', 'Flower Pot Small', 'flower-pots', 95, 190, '1 box · 10 pcs',
    'Compact golden fountains — perfect for lining the entrance.',
    [['Height of effect', '≈ 1.5 m'], ['Effect', 'Golden fountain'], ['Duration', '≈ 20 seconds']]),
  p('fp02', 'flower-pot-big', 'Flower Pot Big', 'flower-pots', 160, 320, '1 box · 10 pcs',
    'Taller golden fountains with a longer burn.',
    [['Height of effect', '≈ 2.5 m'], ['Effect', 'Golden fountain'], ['Duration', '≈ 30 seconds']],
    { isBestSeller: true, images: img('fp02', 2) }),
  p('fp03', 'flower-pot-special', 'Flower Pot Special', 'flower-pots', 240, 480, '1 box · 10 pcs',
    'Premium fountains with silver and gold tails.',
    [['Height of effect', '≈ 3 m'], ['Effect', 'Silver & gold'], ['Duration', '≈ 35 seconds']]),
  p('fp04', 'flower-pot-colour-koti', 'Colour Koti Flower Pot', 'flower-pots', 380, 760, '1 box · 10 pcs',
    'Large fountains that shift through red, green and gold.',
    [['Height of effect', '≈ 3.5 m'], ['Effect', 'Multi-colour fountain'], ['Duration', '≈ 45 seconds']]),
  p('fp05', 'flower-pot-asoka', 'Asoka Flower Pot', 'flower-pots', 520, 1040, '1 box · 5 pcs',
    'Extra-large showpiece fountain with a crackling finale.',
    [['Height of effect', '≈ 4 m'], ['Effect', 'Gold with crackle finale'], ['Duration', '≈ 60 seconds']]),

  /* ---------------- Ground Chakkars ---------------- */
  p('gc01', 'ground-chakkar-big', 'Ground Chakkar Big', 'chakkars', 120, 240, '1 box · 10 pcs',
    'Classic spinning wheel with golden sparks.',
    [['Effect', 'Golden spin'], ['Duration', '≈ 15 seconds']], { isBestSeller: true }),
  p('gc02', 'ground-chakkar-special', 'Ground Chakkar Special', 'chakkars', 180, 360, '1 box · 10 pcs',
    'Larger wheel with colour-changing sparks.',
    [['Effect', 'Colour spin'], ['Duration', '≈ 20 seconds']]),
  p('gc03', 'ground-chakkar-deluxe', 'Ground Chakkar Deluxe', 'chakkars', 290, 580, '1 box · 10 pcs',
    'Deluxe wheel with a bright silver ring and whistle.',
    [['Effect', 'Silver spin with whistle'], ['Duration', '≈ 25 seconds']]),
  p('gc04', 'spinner-wheel-colour', 'Colour Spinner Wheel', 'chakkars', 340, 680, '1 box · 5 pcs',
    'Pin-mounted wheel that spins vertically in colour.',
    [['Effect', 'Vertical colour wheel'], ['Mounting', 'Pin on wooden post']], { inStock: false }),

  /* ---------------- Rockets ---------------- */
  p('rk01', 'baby-rocket', 'Baby Rocket', 'rockets', 90, 180, '1 box · 10 pcs',
    'Small sky rockets with a gold trail — a gentle introduction to rockets.',
    [['Effect', 'Gold trail'], ['Launch', 'Bottle or launch tube']]),
  p('rk02', 'whistling-rocket', 'Whistling Rocket', 'rockets', 210, 420, '1 box · 10 pcs',
    'Rises with a long whistle and ends in a crackle.',
    [['Effect', 'Whistle + crackle'], ['Launch', 'Launch tube']], { isBestSeller: true }),
  p('rk03', 'colour-burst-rocket', 'Colour Burst Rocket', 'rockets', 320, 640, '1 box · 10 pcs',
    'Opens into a round multi-colour burst at height.',
    [['Effect', 'Multi-colour burst'], ['Launch', 'Launch tube']]),
  p('rk04', 'lunik-express-rocket', 'Lunik Express Rocket', 'rockets', 450, 900, '1 box · 10 pcs',
    'Large rockets with a crackling tail and bright report.',
    [['Effect', 'Crackling tail + burst'], ['Launch', 'Launch tube']]),

  /* ---------------- Aerial Shots ---------------- */
  p('as01', '7-shot-multicolour', '7 Shot Multicolour', 'aerial-shots', 220, 440, '1 piece',
    'Seven rising shots, each opening into a colour peony.',
    [['Shots', '7'], ['Effect', 'Colour peony'], ['Duration', '≈ 15 seconds']]),
  p('as02', '12-shot-crackling', '12 Shot Crackling', 'aerial-shots', 380, 760, '1 piece',
    'Twelve crackling gold shots in quick succession.',
    [['Shots', '12'], ['Effect', 'Gold crackle'], ['Duration', '≈ 20 seconds']], { isBestSeller: true }),
  p('as03', '30-shot-rainbow', '30 Shot Rainbow', 'aerial-shots', 890, 1780, '1 piece',
    'A thirty-shot cake alternating rainbow colours.',
    [['Shots', '30'], ['Effect', 'Rainbow sequence'], ['Duration', '≈ 40 seconds']],
    { images: img('as03', 2) }),
  p('as04', '60-shot-celebration', '60 Shot Celebration', 'aerial-shots', 1650, 3300, '1 piece',
    'Sixty shots with a mixed-effect finale.',
    [['Shots', '60'], ['Effect', 'Mixed effects with finale'], ['Duration', '≈ 75 seconds']]),
  p('as05', '120-shot-grand-finale', '120 Shot Grand Finale', 'aerial-shots', 3200, 6400, '1 piece',
    'Our biggest single cake — a full-sky finale for the end of the night.',
    [['Shots', '120'], ['Effect', 'Multi-effect finale'], ['Duration', '≈ 2.5 minutes']]),

  /* ---------------- Fancy Novelties ---------------- */
  p('fn01', 'magic-colour-pencil', 'Magic Colour Pencil', 'fancy', 70, 140, '1 box · 10 pcs',
    'Hand-held pencils with soft colour sparks — popular with kids.',
    [['Effect', 'Colour sparks'], ['Use', 'Hand-held, with supervision']], { isBestSeller: true }),
  p('fn02', 'twinkling-star', 'Twinkling Star', 'fancy', 55, 110, '1 box · 10 pcs',
    'Gentle twinkling sparks on a stick.',
    [['Effect', 'Twinkle'], ['Use', 'Hand-held, with supervision']]),
  p('fn03', 'snake-tablets', 'Snake Tablets', 'fancy', 40, 80, '1 box · 10 tablets',
    'Classic tablets that grow into curling ash “snakes”.',
    [['Effect', 'Growing ash'], ['Use', 'Light on a non-flammable surface']]),
  p('fn04', 'colour-smoke-tubes', 'Colour Smoke Tubes', 'fancy', 260, 520, '1 box · 5 pcs',
    'Daytime coloured smoke in five shades — great for photos.',
    [['Effect', 'Coloured smoke'], ['Duration', '≈ 45 seconds']]),
  p('fn05', 'peacock-feather-fountain', 'Peacock Feather Fountain', 'fancy', 310, 620, '1 box · 5 pcs',
    'A fan-shaped fountain that opens like a peacock’s tail.',
    [['Effect', 'Fan-shaped colour fountain'], ['Duration', '≈ 30 seconds']]),

  /* ---------------- Gift Packs ---------------- */
  p('gp01', 'mini-gift-box', 'Mini Gift Box', 'gift-packs', 650, 1300, '1 box · 15 items',
    'A compact starter box of sparklers, pencils and flower pots.',
    [['Items', '15 assorted'], ['Best for', 'Small families, gifting']]),
  p('gp02', 'kids-delight-box', 'Kids Delight Box', 'gift-packs', 990, 1980, '1 box · 25 items',
    'Child-friendly assortment focused on sparklers and novelties.',
    [['Items', '25 assorted'], ['Best for', 'Children with adult supervision']], { isBestSeller: true }),
  p('gp03', 'family-gift-box', 'Family Gift Box', 'gift-packs', 1850, 3700, '1 box · 40 items',
    'A balanced family assortment including ground and aerial items.',
    [['Items', '40 assorted'], ['Best for', 'Families']], { images: img('gp03', 2) }),
  p('gp04', 'premium-gold-box', 'Premium Gold Box', 'gift-packs', 3400, 6800, '1 box · 60 items',
    'Our premium gift box with a curated selection and gift-ready packaging.',
    [['Items', '60 assorted'], ['Best for', 'Premium and corporate gifting']]),

  /* ---------------- Combo Packs ---------------- */
  p('cp01', 'apartment-friendly-combo', 'Apartment Friendly Combo', 'combo-packs', 2490, 4980, '1 carton · 35 items',
    'Low-noise, compact-space selection built around sparklers, flower pots and chakkars.',
    [['Items', '35'], ['Best for', 'Apartments and small spaces']], { isBestSeller: true }),
  p('cp02', 'family-celebration-combo', 'Family Celebration Combo', 'combo-packs', 4290, 8580, '1 carton · 60 items',
    'A full evening for the whole family, from sparklers to a 30-shot finale.',
    [['Items', '60'], ['Best for', 'Families of 4–6']], { isBestSeller: true }),
  p('cp03', 'mega-diwali-combo', 'Mega Diwali Combo', 'combo-packs', 7990, 15980, '1 carton · 110 items',
    'Our largest combo, including a 60-shot cake and premium fountains.',
    [['Items', '110'], ['Best for', 'Large gatherings']]),
];

/** Find a product by id or slug. Extra arguments (e.g. from Array.map) are ignored. */
export function getProduct(idOrSlug) {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

/** All products in a category (by category id/slug). */
export function byCategory(categoryId) {
  return products.filter((p) => p.category === categoryId);
}

export const bestSellers = products.filter((p) => p.isBestSeller);
export const combos = byCategory('combo-packs');
