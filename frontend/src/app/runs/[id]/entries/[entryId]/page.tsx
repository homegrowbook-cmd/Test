import EntryDetailClient from './EntryDetailClient';

export async function generateStaticParams() {
  // Return placeholder for static export compatibility
  return [{ id: 'placeholder', entryId: 'placeholder' }];
}

export default function EntryDetailPage() {
  return <EntryDetailClient />;
}
