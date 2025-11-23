'use client';

import { MOCK_CAMPAIGN_DATA } from '../lib/categories';

export default function StatsSection() {
  // Calculate stats from mock data
  const totalCampaigns = MOCK_CAMPAIGN_DATA.length;
  const totalRaised = MOCK_CAMPAIGN_DATA.reduce((sum, campaign) => sum + parseFloat(campaign.pledgedAmount), 0);
  const totalContributors = MOCK_CAMPAIGN_DATA.reduce((sum, campaign) => sum + campaign.contributorCount, 0);
  const successfulCampaigns = MOCK_CAMPAIGN_DATA.filter(campaign => campaign.state === 1).length;
  const activeCampaigns = MOCK_CAMPAIGN_DATA.filter(campaign => campaign.state === 0).length;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Platform Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See the real impact our community is making through decentralized crowdfunding
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="card card-gradient p-6 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-celo-green to-celo-green-light rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{totalCampaigns}</div>
            <div className="text-sm text-gray-600">Total Campaigns</div>
          </div>

          <div className="card card-gradient p-6 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">${totalRaised.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Raised</div>
          </div>

          <div className="card card-gradient p-6 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{totalContributors.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Contributors</div>
          </div>

          <div className="card card-gradient p-6 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{activeCampaigns}</div>
            <div className="text-sm text-gray-600">Active Campaigns</div>
          </div>

          <div className="card card-gradient p-6 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{successfulCampaigns}</div>
            <div className="text-sm text-gray-600">Successful</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card p-8 bg-gradient-to-r from-celo-green/5 to-celo-gold/5 border-2 border-celo-green/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make an Impact?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of creators and supporters building a better future through transparent, decentralized crowdfunding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                🚀 Browse Campaigns
              </button>
              <button className="btn-secondary">
                ✨ Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}