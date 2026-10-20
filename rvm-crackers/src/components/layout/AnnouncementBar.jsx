import { site } from '../../data/site';

export default function AnnouncementBar() {
  return (
    <div className="announce" role="status">
      <strong>Diwali 2026:</strong> {site.announcement.replace('Diwali 2026 pre-booking open · ', 'Pre-booking open · ')}
    </div>
  );
}
