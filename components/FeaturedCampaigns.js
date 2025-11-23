'use client';

import Link from 'next/link';
import { MOCK_CAMPAIGN_DATA, getCampaignCategory, getCategoryInfo } from '../lib/categories';

export default function FeaturedCampaigns() {
  // Get 3 featured campaigns (successful, active high-progress, and newest)
  const featuredCampaigns = [
    MOCK_CAMPAIGN_DATA[1], // Successful water project
    MOCK_CAMPAIGN_DATA[7], // High progress vertical farm
    MOCK_CAMPAIGN_DATA[8], // Newest blockchain education
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Campaigns
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover inspiring projects making real impact in communities worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCampaigns.map((campaign, index) => {
            const category = getCampaignCategory(campaign.title, campaign.description);
            const categoryInfo = getCategoryInfo(category);
            const progress = Math.min(100, (parseFloat(campaign.pledgedAmount) / parseFloat(campaign.goalAmount)) * 100);
            const daysLeft = Math.ceil((campaign.deadline - Date.now()) / (1000 * 60 * 60 * 24));

            return (
              <Link 
                href={`/campaign/${campaign.creator}`} 
                key={index}
                className="group block"
              >
                <div className="card card-hover overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/95 backdrop-blur-sm border shadow-sm">
                        <span>{categoryInfo.icon}</span>
                        <span className="font-semibold text-gray-800">{categoryInfo.name}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        campaign.state === 1 
                          ? 'bg-green-100/95 text-green-800'
                          : progress > 75
                            ? 'bg-blue-100/95 text-blue-800'
                            : 'bg-yellow-100/95 text-yellow-800'
                      }`}>
                        {campaign.state === 1 
                          ? '✅ Successful'
                          : progress > 75
                            ? '🔥 Almost There'
                            : '🚀 Active'
                        }
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-celo-green transition-colors">
                      {campaign.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {campaign.description}
                    </p>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">
                          ${parseFloat(campaign.pledgedAmount).toLocaleString()}
                        </span>
                        <span className="text-gray-600">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Goal: ${parseFloat(campaign.goalAmount).toLocaleString()}</span>
                        <span>
                          {campaign.state === 1 
                            ? 'Completed'
                            : daysLeft > 0 
                              ? `${daysLeft} days left`
                              : 'Ended'
                          }
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{campaign.contributorCount} backers</span>
                      </div>
                      
                      <div className="text-xs font-medium text-celo-green group-hover:underline">
                        View Details →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/#campaigns" className="btn-primary">
            View All Campaigns
          </Link>
        </div>
      </div>
    </section>
  );
}