'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is CeloImpact?',
        a: 'CeloImpact is a decentralized crowdfunding platform built on the Celo blockchain. It allows anyone to create campaigns to raise funds for projects, causes, or personal goals using cUSD (Celo Dollar).'
      },
      {
        q: 'How do I create a campaign?',
        a: 'Connect your wallet, click "Create Campaign", set your funding goal and deadline, then launch your campaign. Your campaign will be deployed as a smart contract on the Celo blockchain.'
      },
      {
        q: 'What wallet do I need?',
        a: 'You can use MetaMask, MiniPay, or any WalletConnect-compatible wallet. Make sure it\'s configured for the Celo network.'
      },
      {
        q: 'Is there a fee to create campaigns?',
        a: 'There are minimal transaction fees for blockchain operations (typically less than $0.01), but CeloImpact itself doesn\'t charge any platform fees.'
      }
    ]
  },
  {
    category: 'Campaigns & Contributions',
    questions: [
      {
        q: 'What currency is used for contributions?',
        a: 'All contributions are made in cUSD (Celo Dollar), a stable cryptocurrency pegged to the US Dollar. This ensures price stability for campaign creators and contributors.'
      },
      {
        q: 'Can I get a refund if a campaign fails?',
        a: 'Yes! If a campaign doesn\'t reach its funding goal by the deadline, all contributors can claim full refunds automatically through the smart contract.'
      },
      {
        q: 'Are there minimum or maximum contribution limits?',
        a: 'The minimum contribution is 0.01 cUSD. There\'s no maximum limit, but each campaign has its own funding goal.'
      },
      {
        q: 'Can I withdraw funds before the campaign ends?',
        a: 'Campaign creators can withdraw funds once they reach their funding goal, even before the deadline. Contributors cannot withdraw unless the campaign fails.'
      }
    ]
  },
  {
    category: 'Security & Trust',
    questions: [
      {
        q: 'How secure is CeloImpact?',
        a: 'Very secure! All funds are held in audited smart contracts on the Celo blockchain. The code is open-source and uses industry-standard security practices.'
      },
      {
        q: 'What happens to my funds?',
        a: 'Your funds are held securely in smart contracts. If a campaign succeeds, funds go to the creator. If it fails, you can claim a full refund.'
      },
      {
        q: 'Can campaign creators run away with funds?',
        a: 'No. Smart contracts automatically enforce the rules. Creators can only access funds if they meet their funding goal.'
      },
      {
        q: 'Is the platform audited?',
        a: 'Our smart contracts follow OpenZeppelin standards and best practices. We recommend reviewing the open-source code and conducting your own due diligence.'
      }
    ]
  },
  {
    category: 'Celo Blockchain',
    questions: [
      {
        q: 'Why is CeloImpact built on Celo?',
        a: 'Celo offers low transaction fees, mobile-first design, carbon-negative operations, and stable currencies like cUSD. This makes crowdfunding accessible globally.'
      },
      {
        q: 'How do I get cUSD?',
        a: 'You can get cUSD through various exchanges, use MiniPay, or swap other cryptocurrencies on Celo DEXs like Ubeswap.'
      },
      {
        q: 'What are the transaction fees?',
        a: 'Celo transaction fees are typically less than $0.01, making micro-contributions viable and keeping costs minimal for all users.'
      },
      {
        q: 'Is Celo environmentally friendly?',
        a: 'Yes! Celo is a carbon-negative blockchain that actively removes more carbon from the atmosphere than it produces.'
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'Is the code open source?',
        a: 'Yes! CeloImpact is fully open-source. You can view, audit, and contribute to the code on our GitHub repository.'
      },
      {
        q: 'How are smart contracts deployed?',
        a: 'Each campaign is deployed as an individual smart contract using a factory pattern. This ensures isolation and security between campaigns.'
      },
      {
        q: 'Can I integrate CeloImpact into my app?',
        a: 'The smart contracts are permissionless and can be integrated into other applications. Refer to our documentation for technical details.'
      },
      {
        q: 'What happens if there\'s a bug?',
        a: 'We follow security best practices and use battle-tested contracts. However, always review code and invest only what you can afford to lose.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState('Getting Started');
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container-responsive py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-celo-green to-celo-green-dark bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Find answers to common questions about CeloImpact, crowdfunding, and the Celo blockchain.
            </p>
          </div>

          {/* Quick Help Links */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Link href="/about" className="card p-6 hover:shadow-lg transition-shadow group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">About CeloImpact</h3>
                  <p className="text-sm text-gray-600">Learn about our mission</p>
                </div>
              </div>
            </Link>

            <Link href="/" className="card p-6 hover:shadow-lg transition-shadow group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-celo-green to-celo-green-light rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-celo-green transition-colors">Browse Campaigns</h3>
                  <p className="text-sm text-gray-600">Explore active campaigns</p>
                </div>
              </div>
            </Link>

            <Link href="/create" className="card p-6 hover:shadow-lg transition-shadow group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-celo-gold to-amber-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-celo-gold transition-colors">Create Campaign</h3>
                  <p className="text-sm text-gray-600">Start your campaign now</p>
                </div>
              </div>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Navigation */}
            <div className="lg:w-1/4">
              <div className="card p-4 lg:sticky lg:top-8">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <nav className="space-y-2">
                  {faqData.map((category) => (
                    <button
                      key={category.category}
                      onClick={() => setOpenCategory(category.category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        openCategory === category.category
                          ? 'bg-celo-green text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category.category}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:w-3/4">
              {faqData
                .filter(category => category.category === openCategory)
                .map((category) => (
                  <div key={category.category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                    <div className="space-y-4">
                      {category.questions.map((faq, index) => {
                        const isOpen = openQuestion === `${category.category}-${index}`;
                        return (
                          <div key={index} className="card overflow-hidden">
                            <button
                              onClick={() => setOpenQuestion(isOpen ? null : `${category.category}-${index}`)}
                              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                {faq.q}
                              </h3>
                              <div className={`flex-shrink-0 transform transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </div>
                            </button>
                            
                            {isOpen && (
                              <div className="px-6 pb-6 animate-fadeIn">
                                <div className="border-t border-gray-100 pt-4">
                                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {faq.a}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Still Have Questions Section */}
          <div className="card p-8 mt-12 text-center bg-gradient-to-br from-celo-green/5 to-celo-gold/5">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can\'t find what you\'re looking for? Our community is here to help. 
              Join our discussions or reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://discord.gg/celo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord Community
              </a>
              <a 
                href="https://github.com/celo-org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="card p-8 mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Start Guide</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Connect Wallet</h3>
                <p className="text-sm text-gray-600">Install MetaMask or MiniPay and connect to Celo</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-celo-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-celo-green font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get cUSD</h3>
                <p className="text-sm text-gray-600">Acquire cUSD through exchanges or MiniPay</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-celo-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-celo-gold font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Create or Support</h3>
                <p className="text-sm text-gray-600">Launch your campaign or support existing ones</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Make Impact</h3>
                <p className="text-sm text-gray-600">Achieve goals and create positive change</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}