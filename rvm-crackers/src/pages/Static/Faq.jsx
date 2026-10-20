import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { faqs } from '../../data/site';
import '../Category/category.css';
import '../Home/home.css';
import './static.css';

export default function Faq() {
  usePageMeta('FAQ', 'Answers about ordering, minimum order values, delivery and cancellation at RVM Crackers.');
  return (
    <div className="container static-pg">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
      <h1>Frequently Asked Questions</h1>
      {faqs.map((f) => (
        <details className="faq-item" key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
