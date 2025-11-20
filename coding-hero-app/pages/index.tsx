import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                LearnForge
              </span>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#process" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>

            {/* CTA Button */}
            <Link href="/dashboard">
              <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-red-500 transition-all">
                Start App
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
              LearnForge
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6 font-light max-w-3xl mx-auto leading-relaxed">
            Where raw potential is <span className="text-orange-400 font-semibold">heated</span>, 
            <span className="text-red-400 font-semibold"> hammered</span>, and 
            <span className="text-yellow-400 font-semibold"> forged</span> into mastery
          </p>
          
          <div className="mb-12">
            <p className="text-lg md:text-xl text-gray-400">
              You are unique. Your learning should be too.
            </p>
          </div>
          
          <Link href="/dashboard">
            <button className="group relative px-10 py-4 text-xl font-bold text-white overflow-hidden rounded-lg transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 group-hover:from-orange-500 group-hover:via-red-500 group-hover:to-orange-500 transition-all" />
              <span className="relative flex items-center gap-2">
                Start Forging 
                <span className="text-2xl">⚡</span>
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* The Forging Process */}
      <section id="process" className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">
              Your personalized learning journey in five stages
            </p>
          </div>
          
          {/* Vertical Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 via-orange-500 to-yellow-400" />
            
            <div className="space-y-12">
              {/* Stage 1: Raw Material */}
              <div className="relative flex items-start gap-6">
                <div className="relative flex-shrink-0 w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-900 text-3xl z-10">
                  🪨
                </div>
                <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-lg p-6 hover:border-gray-400 transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-300 mb-2">Raw Material</h3>
                  <p className="text-gray-400">You bring your goals and ambitions. Every master craftsman starts with raw potential waiting to be shaped.</p>
                </div>
              </div>

              {/* Stage 2: Heat */}
              <div className="relative flex items-start gap-6">
                <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center border-4 border-gray-900 text-3xl animate-pulse z-10">
                  🔥
                </div>
                <div className="flex-1 bg-gradient-to-br from-orange-950 to-gray-900 border-2 border-orange-700 rounded-lg p-6 hover:border-orange-500 transition-all duration-300">
                  <h3 className="text-xl font-bold text-orange-400 mb-2">Heat the Forge</h3>
                  <p className="text-gray-400">We analyze your unique needs, learning style, and current knowledge. The forge must reach the perfect temperature before the work begins.</p>
                </div>
              </div>

              {/* Stage 3: Shape */}
              <div className="relative flex items-start gap-6">
                <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center border-4 border-gray-900 text-3xl z-10">
                  🔨
                </div>
                <div className="flex-1 bg-gradient-to-br from-red-950 to-gray-900 border-2 border-red-700 rounded-lg p-6 hover:border-red-500 transition-all duration-300">
                  <h3 className="text-xl font-bold text-red-400 mb-2">Hammer & Shape</h3>
                  <p className="text-gray-400">A custom study plan is crafted specifically for you. Each lesson, each challenge, carefully designed to build your skills.</p>
                </div>
              </div>

              {/* Stage 4: Temper */}
              <div className="relative flex items-start gap-6">
                <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center border-4 border-gray-900 text-3xl z-10">
                  💧
                </div>
                <div className="flex-1 bg-gradient-to-br from-orange-950 to-gray-900 border-2 border-orange-600 rounded-lg p-6 hover:border-orange-400 transition-all duration-300">
                  <h3 className="text-xl font-bold text-orange-300 mb-2">Temper & Refine</h3>
                  <p className="text-gray-400">Through practice, feedback, and continuous growth, your skills become stronger and more resilient with each challenge you overcome.</p>
                </div>
              </div>

              {/* Stage 5: Masterpiece */}
              <div className="relative flex items-start gap-6">
                <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-gray-900 text-3xl shadow-lg animate-pulse z-10">
                  ⚔️
                </div>
                <div className="flex-1 bg-gradient-to-br from-yellow-900 via-orange-900 to-gray-900 border-4 border-yellow-500 rounded-lg p-8 hover:border-yellow-400 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                    Masterpiece
                  </h3>
                  <p className="text-gray-300 font-medium">You achieve your goals. The transformation is complete. You're ready to face any challenge and seize new opportunities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA after process */}
          <div className="text-center mt-16">
            <Link href="/dashboard">
              <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-red-500 transition-all hover:scale-105">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section - Placeholder */}
      <section id="pricing" className="relative py-20 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Pricing
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Choose the plan that fits your learning journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-8 hover:border-gray-500 transition-all">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Free</h3>
              <div className="text-4xl font-black text-gray-300 mb-6">$0</div>
              <ul className="text-gray-400 text-left space-y-3 mb-8">
                <li>✓ Basic study plans</li>
                <li>✓ Limited resources</li>
                <li>✓ Community support</li>
              </ul>
              <Link href="/dashboard">
                <button className="w-full px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all">
                  Start Free
                </button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-orange-950 to-gray-900 border-4 border-orange-600 rounded-xl p-8 transform scale-105 shadow-[0_0_30px_rgba(234,88,12,0.3)]">
              <div className="inline-block bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Pro</h3>
              <div className="text-4xl font-black text-orange-300 mb-6">$29</div>
              <ul className="text-gray-300 text-left space-y-3 mb-8">
                <li>✓ Unlimited study plans</li>
                <li>✓ Full resource library</li>
                <li>✓ AI-powered mentor</li>
                <li>✓ Priority support</li>
              </ul>
              <Link href="/dashboard">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-red-500 transition-all">
                  Start Pro Trial
                </button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl p-8 hover:border-gray-500 transition-all">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Enterprise</h3>
              <div className="text-4xl font-black text-gray-300 mb-6">Custom</div>
              <ul className="text-gray-400 text-left space-y-3 mb-8">
                <li>✓ Everything in Pro</li>
                <li>✓ Team management</li>
                <li>✓ Custom integrations</li>
                <li>✓ Dedicated support</li>
              </ul>
              <button className="w-full px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Placeholder */}
      <section id="about" className="relative py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            About LearnForge
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            We believe that learning should be as unique as you are. LearnForge was built to transform 
            the way people learn by providing personalized, adaptive study plans that match your goals, 
            pace, and learning style.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Our mission is to forge better learners, one individual at a time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="text-2xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-3">
                LearnForge
              </div>
              <p className="text-gray-500 text-sm">
                Forging futures, one learner at a time.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-gray-300 font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#process" className="hover:text-gray-300 transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</a></li>
                <li><Link href="/dashboard" className="hover:text-gray-300 transition-colors">Start App</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-gray-300 font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#about" className="hover:text-gray-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-gray-300 font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} LearnForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
