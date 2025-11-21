import StatisticsClient from './StatisticsClient';

export async function generateStaticParams() {
  // Return a placeholder for static export compatibility
  return [{ id: 'placeholder' }];
}

export default function StatisticsPage() {
  return <StatisticsClient />;
}
