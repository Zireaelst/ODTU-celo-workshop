'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container-responsive py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-celo-green to-celo-green-dark bg-clip-text text-transparent">CeloImpact</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Empowering communities through decentralized crowdfunding on the Celo blockchain. 
              Transparent, secure, and accessible fundraising for everyone.
            </p>
          </div>

          {/* Mission Section */}
          <div className="card p-8 mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/3">
                <div className="w-32 h-32 bg-gradient-to-br from-celo-green to-celo-green-light rounded-full flex items-center justify-center shadow-lg mx-auto">
                  <span className="text-5xl">🌍</span>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  To democratize access to funding and enable anyone, anywhere to support causes they believe in. 
                  We leverage blockchain technology to create a transparent, efficient, and inclusive crowdfunding platform.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  By building on Celo, we ensure low transaction costs and mobile-first accessibility, 
                  making it easy for people worldwide to participate in the global economy.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent & Secure</h3>
              <p className="text-gray-600">
                All transactions are recorded on the blockchain, ensuring complete transparency and immutability.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-celo-green to-celo-green-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Low-Cost Transactions</h3>
              <p className="text-gray-600">
                Built on Celo for minimal fees and fast transactions, making micro-contributions viable.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-celo-gold to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Accessibility</h3>
              <p className="text-gray-600">
                Mobile-first design with MiniPay integration for global accessibility and inclusion.
              </p>
            </div>
          </div>

          {/* Technology Section */}
          <div className="card p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Built on Celo Blockchain</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Celo?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-celo-green rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Mobile-First:</strong> Designed for smartphone users worldwide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-celo-green rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Stable Currency:</strong> Uses cUSD for price stability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-celo-green rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Carbon Negative:</strong> Environmentally sustainable blockchain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-celo-green rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Low Fees:</strong> Near-zero transaction costs</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-celo-green/10 to-celo-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-32 h-32 bg-gradient-to-br from-celo-green to-celo-green-light rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold text-white">CELO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="card p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How CeloImpact Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Campaign</h3>
                <p className="text-gray-600">
                  Set your funding goal and deadline. Campaign details are stored immutably on the blockchain.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-celo-green to-celo-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Receive Contributions</h3>
                <p className="text-gray-600">
                  Supporters contribute using cUSD. All funds are held securely in smart contracts.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-celo-gold to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Withdraw or Refund</h3>
                <p className="text-gray-600">
                  If successful, withdraw funds. If unsuccessful, contributors get automatic refunds.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="card p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  Sustainability
                </h3>
                <p className="text-gray-700">
                  Supporting environmental and social sustainability through technology and community engagement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  Inclusivity
                </h3>
                <p className="text-gray-700">
                  Creating opportunities for everyone, regardless of location, background, or financial status.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Trust & Transparency
                </h3>
                <p className="text-gray-700">
                  Building trust through open-source code, transparent operations, and immutable records.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Innovation
                </h3>
                <p className="text-gray-700">
                  Continuously improving and innovating to serve our community better and more effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="card p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Built with ❤️</h2>
            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
                CeloImpact is built by developers and designers who believe in the power of 
                decentralized technology to create positive change in the world.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <span>💡</span>
                  <span className="text-sm font-medium">Open Source</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <span>🌍</span>
                  <span className="text-sm font-medium">Global Community</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <span>⚡</span>
                  <span className="text-sm font-medium">Continuous Innovation</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Make an Impact?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and supporters who are already using CeloImpact 
              to fund their dreams and support causes they care about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary text-lg px-8 py-4">
                🌟 Explore Campaigns
              </Link>
              <Link href="/create" className="btn-outline text-lg px-8 py-4">
                🚀 Create Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}