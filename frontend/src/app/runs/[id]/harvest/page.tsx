import HarvestClient from './HarvestClient';

export async function generateStaticParams() {
  // Return placeholder for static export compatibility
  return [{ id: 'placeholder' }];
}

export default function HarvestPage() {
  return <HarvestClient />;
}
