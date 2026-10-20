import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, max = 50, label = 'Quantity' }) {
  const set = (v) => onChange(Math.max(min, Math.min(max, Math.floor(Number(v) || min))));
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => set(value - 1)}>
        <Minus size={14} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        aria-label={label}
        onChange={(e) => set(e.target.value)}
      />
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => set(value + 1)}>
        <Plus size={14} />
      </button>
    </div>
  );
}
