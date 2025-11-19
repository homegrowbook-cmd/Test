import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-green-400 bg-clip-text text-transparent">
          homegrowbook 2.0
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Track, Share, and Learn from Your Growing Journey
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
          <Link href="/runs" className="btn-secondary text-lg px-8 py-3">
            Explore Diaries
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center">
          <div className="text-4xl mb-4">📔</div>
          <h3 className="text-xl font-semibold mb-2">Track Your Grows</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Document every stage of your grow with detailed entries, measurements, and photos.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold mb-2">Monitor Progress</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Track VPD, EC, pH, PPFD and other crucial metrics to optimize your setup.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Share your journey, get feedback, and learn from experienced growers.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="card bg-gradient-to-r from-primary-600 to-green-500 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Platform Stats</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-lg opacity-90">Active Growers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">5000+</div>
            <div className="text-lg opacity-90">Grow Diaries</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50000+</div>
            <div className="text-lg opacity-90">Updates</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">200+</div>
            <div className="text-lg opacity-90">Strains</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join thousands of growers documenting their grows
        </p>
        <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
          Create Free Account
        </Link>
      </div>
    </div>
  );
}
