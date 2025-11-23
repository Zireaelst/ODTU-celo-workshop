'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CampaignCardSkeleton, LoadingSpinner } from './LoadingSkeletons';
import { formatCurrency, formatTimeRemaining, getCampaignStatusColor, getCampaignStatusText, truncateAddress } from '../lib/utils';
import { getCampaignCategory, getCategoryInfo, MOCK_CAMPAIGN_DATA } from '../lib/categories';

export default function CampaignCard({ campaign, index = 0 }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const {
    address,
    creator,
    goalAmount,
    pledgedAmount,
    state,
    timeRemaining,
    progressPercentage,
    contributorCount,
  } = campaign;

  const handleCardClick = () => {
    router.push(`/campaign/${address}`);
  };

  const statusColor = getCampaignStatusColor(state, timeRemaining);
  const statusText = getCampaignStatusText(state, timeRemaining);
  const progress = Math.min(Number(progressPercentage || 0), 100);

  // Get category info
  const mockIndex = index % MOCK_CAMPAIGN_DATA.length;
  const mockData = MOCK_CAMPAIGN_DATA[mockIndex];
  const categoryId = getCampaignCategory(mockData.title, mockData.description);
  const categoryInfo = getCategoryInfo(categoryId);

  // Get status badge styles
  const getStatusBadgeClass = () => {
    if (state === 0 && Number(timeRemaining) > 0) return 'badge-info';
    if (state === 1) return 'badge-success';
    return 'badge-danger';
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card card-hover cursor-pointer group animate-scale-in"
    >
      {/* Campaign Image/Header */}
      <div className="relative h-48 bg-gradient-to-br from-celo-green/10 via-celo-gold/10 to-celo-green/5 p-6 flex items-center justify-center">
        <div className="absolute top-4 left-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800 border border-${categoryInfo.color}-200`}>
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.name}</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className={`status-badge ${getStatusBadgeClass()}`}>
            {statusText}
          </div>
        </div>
        
        {/* Campaign Icon */}
        <div className={`w-16 h-16 bg-gradient-to-br from-celo-green to-celo-green-light rounded-2xl flex items-center justify-center shadow-celo transition-all duration-300 ${
          isHovered ? 'scale-110 rotate-3' : ''
        }`}>
          <span className="text-white font-bold text-2xl">
            {creator ? creator.slice(2, 4).toUpperCase() : '??'}
          </span>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-6 left-6 w-3 h-3 bg-celo-gold rounded-full animate-bounce-soft opacity-60"></div>
        <div className="absolute bottom-8 right-8 w-2 h-2 bg-celo-green rounded-full animate-bounce-soft opacity-40" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Campaign Content */}
      <div className="p-6 space-y-4">
        {/* Campaign Title & Description */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-celo-green transition-colors">
            {mockData.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {mockData.description}
          </p>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm">
              Created by {truncateAddress(creator)}
            </div>
            <div className="text-xs text-gray-500 font-mono">
              {truncateAddress(address)}
            </div>
          </div>
        </div>

        {/* Funding Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(pledgedAmount)}
                <span className="text-sm font-normal text-gray-500 ml-1">cUSD</span>
              </div>
              <div className="text-sm text-gray-600">
                raised of {formatCurrency(goalAmount)} cUSD goal
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-celo-green">
                {progress}%
              </div>
              <div className="text-xs text-gray-500">funded</div>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="progress-bar">
            <div 
              className={`progress-fill ${progress >= 100 ? 'progress-glow' : ''}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{Number(contributorCount || 0)}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatTimeRemaining(Number(timeRemaining || 0))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {state === 0 && Number(timeRemaining) > 0 ? (
            <button 
              className="btn-primary w-full group"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              <span className="flex items-center justify-center gap-2">
                Support This Campaign
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          ) : state === 1 ? (
            <div className="flex items-center justify-center py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl border border-emerald-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Campaign Successful
            </div>
          ) : (
            <div className="flex items-center justify-center py-3 bg-red-50 text-red-700 font-semibold rounded-xl border border-red-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Campaign Ended
            </div>
          )}
        </div>
      </div>
    </div>
  );
}