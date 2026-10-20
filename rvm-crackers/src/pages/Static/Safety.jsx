import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import '../Category/category.css';
import '../Product/product.css';
import './static.css';

export default function Safety() {
  usePageMeta('Safety Information', 'Fireworks safety guidance: safe handling, storage and first-aid basics for Diwali.');
  return (
    <div className="container static-pg">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Safety Information' }]} />
      <h1>Fireworks Safety Guide</h1>
      <p>Fireworks bring joy when handled with respect. Please read this before your celebration.</p>

      <h2>Before Lighting</h2>
      <div className="safety-box"><ul>
        <li>Store fireworks in a cool, dry place, away from heat sources and out of children’s reach.</li>
        <li>Choose an open outdoor space clear of buildings, vehicles, dry leaves and overhead wires.</li>
        <li>Keep a bucket of water and a bucket of sand ready before lighting anything.</li>
        <li>Wear snug cotton clothing; avoid loose synthetic garments.</li>
      </ul></div>

      <h2>While Lighting</h2>
      <div className="safety-box"><ul>
        <li>Light one piece at a time, at arm’s length, using an agarbatti or long lighter — never a short matchstick.</li>
        <li>Never hold lit fireworks in your hand or lean over them while lighting.</li>
        <li>Children must always be supervised by a responsible adult.</li>
        <li>Never relight a failed firework. Wait 15–20 minutes, then soak it in water.</li>
        <li>Keep spectators, especially children and elders, at a safe distance.</li>
      </ul></div>

      <h2>If Something Goes Wrong</h2>
      <div className="safety-box"><ul>
        <li>For minor burns, cool the area under clean running water for 10–20 minutes. Do not apply ice directly.</li>
        <li>Do not burst blisters or apply pastes/ointments on serious burns.</li>
        <li>For serious burns or eye injuries, seek medical help immediately.</li>
      </ul></div>

      <h2>Respect the Rules</h2>
      <p>
        Follow all local regulations on permitted products, timings and locations for bursting
        fireworks in your area, and be considerate of neighbours, elders, patients and animals.
      </p>
    </div>
  );
}
