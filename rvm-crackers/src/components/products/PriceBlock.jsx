import { formatINR } from '../../utils/format';

export default function PriceBlock({ price, originalPrice, large = false }) {
  const hasDiscount = originalPrice && originalPrice > price;
  return (
    <div className={`price ${large ? 'price--lg' : ''}`}>
      {hasDiscount && <s className="price__original">{formatINR(originalPrice)}</s>}
      <span className="price__current">{formatINR(price)}</span>
    </div>
  );
}
