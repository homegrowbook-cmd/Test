import NewEntryClient from './NewEntryClient';

export async function generateStaticParams() {
  // Return placeholder for static export compatibility
  return [{ id: 'placeholder' }];
}

export default function NewEntryPage() {
  return <NewEntryClient />;
}
