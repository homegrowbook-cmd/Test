import EditRunClient from './EditRunClient';

export async function generateStaticParams() {
  // Return placeholder for static export compatibility
  return [{ id: 'placeholder' }];
}

export default function EditRunPage() {
  return <EditRunClient />;
}
