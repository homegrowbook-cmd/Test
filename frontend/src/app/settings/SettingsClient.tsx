'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/types';

interface UpdateUserData {
  bio?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  avatar?: string;
}

export default function SettingsClient() {
  const router = useRouter();
  const { user: currentUser, setUser } = useAuthStore();

  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    // Load current user data
    setBio(currentUser.bio || '');
    setWebsite(currentUser.website || '');
    setInstagram(currentUser.instagram || '');
    setTwitter(currentUser.twitter || '');
    setAvatar(currentUser.avatar || '');
    setAvatarError(false);
  }, [currentUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const updateData: UpdateUserData = {};
      
      if (bio !== currentUser?.bio) updateData.bio = bio;
      if (website !== currentUser?.website) updateData.website = website;
      if (instagram !== currentUser?.instagram) updateData.instagram = instagram;
      if (twitter !== currentUser?.twitter) updateData.twitter = twitter;
      if (avatar !== currentUser?.avatar) updateData.avatar = avatar;

      if (Object.keys(updateData).length === 0) {
        setError('No changes to save');
        setLoading(false);
        return;
      }

      const response = await api.put('/users/me', updateData);
      const updatedUser: User = response.data;

      // Update user in auth store
      setUser(updatedUser);

      setSuccess('Profile updated successfully!');
      
      // Redirect to profile after 2 seconds
      setTimeout(() => {
        router.push(`/users/${updatedUser.username}`);
      }, 2000);
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/users/${currentUser?.username}`);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                value={currentUser.username}
                disabled
                className="input bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Username cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={currentUser.email}
                disabled
                className="input bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="input min-h-[100px]"
                placeholder="Tell us about yourself..."
                maxLength={500}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {bio.length}/500 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Avatar URL
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => {
                  setAvatar(e.target.value);
                  setAvatarError(false);
                }}
                className="input"
                placeholder="https://example.com/avatar.jpg"
              />
              {avatar && !avatarError && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Preview:</p>
                  <img 
                    src={avatar} 
                    alt="Avatar preview" 
                    className="w-20 h-20 rounded-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                </div>
              )}
              {avatarError && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                  Failed to load image preview
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="input"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Instagram
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 mr-2">@</span>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="input flex-1"
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Twitter
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 mr-2">@</span>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="input flex-1"
                  placeholder="username"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary flex-1"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
