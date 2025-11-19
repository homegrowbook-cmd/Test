import RunDetailClient from './RunDetailClient';

export async function generateStaticParams() {
  // Return a placeholder for static export compatibility
  // In production with real data, fetch from API
  return [{ id: 'placeholder' }];
}

export default function RunDetailPage() {
  return <RunDetailClient />;
}
