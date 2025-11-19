import UserProfileClient from './UserProfileClient';

export async function generateStaticParams() {
  // Return placeholder for static export compatibility
  return [{ username: 'placeholder' }];
}

export default function UserProfilePage() {
  return <UserProfileClient />;
}
