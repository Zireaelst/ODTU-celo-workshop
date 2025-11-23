'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-celo-green opacity-10 rounded-full blur-3xl animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-celo-gold opacity-10 rounded-full blur-3xl animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-celo-green/10 rounded-full mb-8 animate-fade-in">
            <span className="text-sm font-medium text-celo-green-dark">🌱 Powered by Celo Blockchain</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
            Make an Impact with{' '}
            <span className="bg-gradient-to-r from-celo-green via-celo-green-light to-celo-gold bg-clip-text text-transparent">
              CeloImpact
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            The future of decentralized crowdfunding. Create transparent campaigns, 
            support meaningful causes, and build a better world together on Celo.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col items-center mb-8">
            <ConnectButton />
            <p className="text-sm text-gray-500 mt-4">
              Connect your wallet to start creating and supporting campaigns
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="card card-hover p-8 group">
            <div className="w-16 h-16 bg-gradient-to-br from-celo-green to-celo-green-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create Campaigns</h3>
            <p className="text-gray-600 leading-relaxed">
              Launch your fundraising campaign with transparent goals, clear deadlines, 
              and automated smart contract management.
            </p>
          </div>

          <div className="card card-hover p-8 group">
            <div className="w-16 h-16 bg-gradient-to-br from-celo-gold to-celo-gold-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Support Causes</h3>
            <p className="text-gray-600 leading-relaxed">
              Contribute cUSD to campaigns you believe in and track the real-world 
              impact of your donations in real-time.
            </p>
          </div>

          <div className="card card-hover p-8 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Transparent</h3>
            <p className="text-gray-600 leading-relaxed">
              Smart contracts ensure complete transparency and security. 
              Automatic refunds if goals aren't met by deadlines.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-celo-green mb-2">$0+</div>
            <div className="text-gray-600 font-medium">Total Raised</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-celo-green mb-2">0+</div>
            <div className="text-gray-600 font-medium">Campaigns Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-celo-green mb-2">0+</div>
            <div className="text-gray-600 font-medium">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-celo-green mb-2">100%</div>
            <div className="text-gray-600 font-medium">Transparent</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="animate-slide-up" style={{ animationDelay: '1s' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the future of decentralized fundraising on Celo. Create your first campaign 
            or support existing causes in just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ConnectButton />
            <a 
              href="https://docs.celo.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Learn About Celo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}