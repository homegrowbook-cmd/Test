import { Metadata } from 'next';
import EditEntryClient from './EditEntryClient';

export const metadata: Metadata = {
  title: 'Edit Entry | homegrowbook',
  description: 'Edit your grow diary entry',
};

export default function EditEntryPage() {
  return <EditEntryClient />;
}
