import { Metadata } from 'next';
import EditEntryClient from './EditEntryClient';

export const metadata: Metadata = {
  title: 'Edit Entry | homegrowbook',
  description: 'Edit your grow diary entry',
};

export async function generateStaticParams() {
  // Return placeholder for static export compatibility
  return [{ id: 'placeholder', entryId: 'placeholder' }];
}

export default function EditEntryPage() {
  return <EditEntryClient />;
}
