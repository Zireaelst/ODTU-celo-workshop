'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container-responsive py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of <span className="bg-gradient-to-r from-celo-green to-celo-green-dark bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Last updated: December 2024
            </p>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> CeloImpact is a decentralized application. Please read these terms carefully and understand the risks of using blockchain technology.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="#acceptance" className="text-celo-green hover:underline text-sm">1. Acceptance of Terms</a>
              <a href="#description" className="text-celo-green hover:underline text-sm">2. Service Description</a>
              <a href="#eligibility" className="text-celo-green hover:underline text-sm">3. Eligibility</a>
              <a href="#responsibilities" className="text-celo-green hover:underline text-sm">4. User Responsibilities</a>
              <a href="#risks" className="text-celo-green hover:underline text-sm">5. Risks & Disclaimers</a>
              <a href="#intellectual" className="text-celo-green hover:underline text-sm">6. Intellectual Property</a>
              <a href="#limitation" className="text-celo-green hover:underline text-sm">7. Limitation of Liability</a>
              <a href="#governing" className="text-celo-green hover:underline text-sm">8. Governing Law</a>
              <a href="#changes" className="text-celo-green hover:underline text-sm">9. Changes to Terms</a>
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  By accessing or using CeloImpact, you agree to be bound by these Terms of Service ("Terms"). 
                  If you disagree with any part of these terms, you may not access the service.
                </p>
                <p>
                  CeloImpact is a decentralized application (dApp) that facilitates crowdfunding through smart contracts 
                  on the Celo blockchain. These Terms apply to all users, including campaign creators and contributors.
                </p>
              </div>
            </section>

            {/* 2. Description of Service */}
            <section id="description" className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  CeloImpact provides a platform where users can:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create crowdfunding campaigns with specific goals and deadlines</li>
                  <li>Contribute to existing campaigns using cUSD (Celo Dollar)</li>
                  <li>Withdraw funds from successful campaigns</li>
                  <li>Claim refunds from unsuccessful campaigns</li>
                </ul>
                <p>
                  All transactions are executed through smart contracts on the Celo blockchain. 
                  We do not custody funds, control transactions, or have the ability to reverse blockchain operations.
                </p>
              </div>
            </section>

            {/* 3. Eligibility */}
            <section id="eligibility" className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  You must meet the following requirements to use CeloImpact:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be at least 18 years old (or the age of majority in your jurisdiction)</li>
                  <li>Have the legal capacity to enter into agreements</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not be located in a jurisdiction where cryptocurrency use is prohibited</li>
                </ul>
                <p>
                  By using CeloImpact, you represent and warrant that you meet these eligibility requirements.
                </p>
              </div>
            </section>

            {/* 4. User Responsibilities */}
            <section id="responsibilities" className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
              <div className="prose text-gray-700 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Campaign Creators:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful campaign information</li>
                  <li>Use funds for stated purposes</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not create fraudulent or misleading campaigns</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900">Contributors:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Conduct your own due diligence before contributing</li>
                  <li>Understand that contributions may not be recoverable if campaigns succeed</li>
                  <li>Comply with your local tax obligations</li>
                  <li>Only contribute what you can afford to lose</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900">All Users:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Secure your private keys and wallet access</li>
                  <li>Verify all transaction details before confirming</li>
                  <li>Report suspicious or fraudulent activity</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>
            </section>

            {/* 5. Risks and Disclaimers */}
            <section id="risks" className="card p-8 bg-amber-50 border border-amber-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Risks and Disclaimers</h2>
              <div className="prose text-gray-700 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Important Risks to Consider:</h4>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900">Blockchain Risks:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Immutability:</strong> Blockchain transactions cannot be reversed</li>
                  <li><strong>Technical Risk:</strong> Smart contract bugs or vulnerabilities</li>
                  <li><strong>Network Risk:</strong> Celo network downtime or congestion</li>
                  <li><strong>Key Management:</strong> Loss of private keys means permanent loss of funds</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900">Market Risks:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Volatility:</strong> Cryptocurrency prices can fluctuate</li>
                  <li><strong>Liquidity:</strong> Difficulty converting cryptocurrencies to fiat</li>
                  <li><strong>Regulatory:</strong> Changing laws may affect cryptocurrency use</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900">Campaign Risks:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Project Failure:</strong> Campaigns may not deliver promised outcomes</li>
                  <li><strong>Fraud:</strong> Malicious actors may create deceptive campaigns</li>
                  <li><strong>No Guarantees:</strong> We do not guarantee campaign success or legitimacy</li>
                </ul>
              </div>
            </section>

            {/* 6. Intellectual Property */}
            <section id="intellectual" className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <div className="prose text-gray-700 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Open Source:</h3>
                <p>
                  CeloImpact is open-source software. The source code is available under the MIT License, 
                  allowing you to use, modify, and distribute the code according to the license terms.
                </p>

                <h3 className="text-lg font-semibold text-gray-900">User Content:</h3>
                <p>
                  You retain ownership of content you submit (campaign descriptions, etc.). 
                  By submitting content, you grant us a non-exclusive license to display and distribute 
                  it as part of the service.
                </p>

                <h3 className="text-lg font-semibold text-gray-900">Trademarks:</h3>
                <p>
                  "CeloImpact" and related marks are our trademarks. You may not use them without permission.
                </p>
              </div>
            </section>

            {/* 7. Limitation of Liability */}
            <section id="limitation" className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <div className="prose text-gray-700 space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-yellow-800">
                    CeloImpact is provided "as is" without warranties of any kind.
                  </p>
                </div>

                <p>
                  To the maximum extent permitted by law, we disclaim all warranties and 
                  shall not be liable for any damages including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Loss of funds due to smart contract bugs or user error</li>
                  <li>Network downtime or transaction failures</li>
                  <li>Fraudulent campaigns or user misconduct</li>
                  <li>Regulatory changes affecting cryptocurrency use</li>
                  <li>Any indirect, incidental, or consequential damages</li>
                </ul>

                <p>
                  Your use of CeloImpact is at your own risk. We recommend only risking funds you can afford to lose.
                </p>
              </div>
            </section>

            {/* 8. Governing Law */}
            <section id="governing" className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  These Terms are governed by the laws of the jurisdiction in which the service operator 
                  is established, without regard to conflict of law principles.
                </p>
                <p>
                  Given the decentralized nature of blockchain technology, disputes may be complex. 
                  We encourage good faith resolution of any issues.
                </p>
              </div>
            </section>

            {/* 9. Changes to Terms */}
            <section id="changes" className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  We may update these Terms from time to time. Changes will be posted on this page 
                  with an updated "Last modified" date.
                </p>
                <p>
                  Your continued use of CeloImpact after changes constitutes acceptance of the new Terms. 
                  We recommend reviewing these Terms periodically.
                </p>
                <p>
                  For significant changes, we may provide additional notice through the application interface.
                </p>
              </div>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="card p-8 mt-8 text-center bg-gradient-to-br from-celo-green/5 to-celo-gold/5">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you have questions about these Terms of Service, please review our FAQ or 
              reach out to the community for clarification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/faq" className="btn-primary">
                📖 Read FAQ
              </Link>
              <Link href="/about" className="btn-outline">
                ℹ️ About CeloImpact
              </Link>
            </div>
          </div>

          {/* Acceptance Notice */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">By Using CeloImpact:</h3>
                <p className="text-sm text-blue-800">
                  You acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                  You also acknowledge the risks associated with blockchain technology and cryptocurrency transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}