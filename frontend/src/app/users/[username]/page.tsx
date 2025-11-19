import UserProfileClient from './UserProfileClient';

// Required for static export
export function generateStaticParams() {
  return [];
}

export default function UserProfilePage() {
  return <UserProfileClient />;
}
