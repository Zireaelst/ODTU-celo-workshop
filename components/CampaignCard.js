'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Users, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CampaignCardSkeleton, LoadingSpinner } from './LoadingSkeletons';
import { formatCurrency, formatTimeRemaining, getCampaignStatusColor, getCampaignStatusText, truncateAddress } from '../lib/utils';
import { getCampaignCategory, getCategoryInfo, MOCK_CAMPAIGN_DATA } from '../lib/categories';
import ShareButton from './ShareButton';

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
  const mockData = campaign.mockData || MOCK_CAMPAIGN_DATA[index % MOCK_CAMPAIGN_DATA.length];
  const categoryId = getCampaignCategory(mockData.title, mockData.description);
  const categoryInfo = getCategoryInfo(categoryId);

  // Get status badge styles
  const getStatusBadgeClass = () => {
    if (state === 0 && Number(timeRemaining) > 0) return 'badge-info';
    if (state === 1) return 'badge-success';
    return 'badge-danger';
  };

  return (
    <Card
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
    >
      {/* Campaign Image/Header */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-celo-green/10 via-celo-gold/10 to-celo-green/5">
        {/* Campaign Image */}
        <img 
          src={mockData.image} 
          alt={mockData.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
        
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm border shadow-sm">
            <span className="mr-1">{categoryInfo.icon}</span>
            {categoryInfo.name}
          </Badge>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
          <Badge variant={state === 0 && Number(timeRemaining) > 0 ? "info" : state === 1 ? "success" : "destructive"}>
            {statusText}
          </Badge>
        </div>
        
        {/* Fallback Campaign Icon */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          mockData.image ? 'opacity-0' : 'opacity-100'
        }`}>
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
      </div>

      {/* Campaign Content */}
      <CardContent className="space-y-4">
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
            <Users className="w-4 h-4 text-gray-600" />
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
          <Progress value={progress} className="h-2" />

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{Number(contributorCount || 0)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeRemaining(Number(timeRemaining || 0))}</span>
                </div>
              </div>
              
              <div onClick={(e) => e.stopPropagation()}>
                <ShareButton
                  campaign={campaign}
                  campaignAddress={address}
                  mockData={mockData}
                  variant="compact"
                  showLabels={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {state === 0 && Number(timeRemaining) > 0 ? (
            <Button 
              className="w-full group"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              <Target className="w-4 h-4 mr-2" />
              Support This Campaign
              <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : state === 1 ? (
            <div className="flex items-center justify-center py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl border border-emerald-200">
              <TrendingUp className="w-5 h-5 mr-2" />
              Campaign Successful
            </div>
          ) : (
            <div className="flex items-center justify-center py-3 bg-red-50 text-red-700 font-semibold rounded-xl border border-red-200">
              <Clock className="w-5 h-5 mr-2" />
              Campaign Ended
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}