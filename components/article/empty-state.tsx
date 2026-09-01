import { Radio } from 'lucide-react';
export function EmptyState({
  title = 'Fresh stories are on the way',
  message = 'AILooma is connected to the newsroom. New reporting will appear here as soon as it is published.',
}) {
  return (
    <div className="empty-state">
      <Radio />
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
