import { useEffect, useState } from 'react';

/* Renders the product photo, or — if the file is missing or fails to load —
   a branded firework-burst placeholder so the layout never shows a broken image.
   The placeholder's colour is derived from the image path, so different products
   (and gallery images) get visibly different placeholders. */

const PALETTE = [
  ['#a3161d', '#d9a441'], // crimson + gold
  ['#d9a441', '#a3161d'], // gold + crimson
  ['#2f7d43', '#d9a441'], // green + gold
  ['#3b4fa0', '#f3c969'], // royal blue + pale gold
  ['#b0307a', '#f3c969'], // magenta + pale gold
  ['#5a0f13', '#e6b65a'], // maroon + gold
];

function hash(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function Placeholder({ seed, alt }) {
  const h = hash(seed);
  const [main, accent] = PALETTE[h % PALETTE.length];
  const rays = 12 + (h % 3) * 2;
  const rotate = h % 30;
  const a11y = alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true };

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...a11y}>
      <circle cx="100" cy="100" r="88" fill={main} opacity="0.08" />
      <g transform={`rotate(${rotate} 100 100)`} stroke={main} strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: rays }, (_, i) => {
          const ang = (i / rays) * Math.PI * 2;
          const r1 = 26, r2 = i % 2 ? 62 : 76;
          return (
            <line
              key={i}
              x1={100 + Math.cos(ang) * r1} y1={100 + Math.sin(ang) * r1}
              x2={100 + Math.cos(ang) * r2} y2={100 + Math.sin(ang) * r2}
            />
          );
        })}
      </g>
      <g fill={accent}>
        {Array.from({ length: rays }, (_, i) => {
          const ang = ((i + 0.5) / rays) * Math.PI * 2 + (rotate * Math.PI) / 180;
          return <circle key={i} cx={100 + Math.cos(ang) * 84} cy={100 + Math.sin(ang) * 84} r="3.5" />;
        })}
      </g>
      <circle cx="100" cy="100" r="14" fill={accent} />
      <circle cx="100" cy="100" r="6" fill={main} />
    </svg>
  );
}

export default function ProductImage({ src, alt = '' }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => setFailed(!src), [src]);

  if (failed) return <Placeholder seed={src || alt} alt={alt} />;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
