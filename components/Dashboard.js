'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useCampaignFactory, useCampaignDetails } from '../hooks/useCampaignFactory';
import CampaignCard from './CampaignCard';
import { DashboardSkeleton, EmptyStateSkeleton } from './LoadingSkeletons';
import { DashboardErrorBoundary, CampaignErrorBoundary } from './ErrorBoundary';
import { formatCurrency } from '../lib/utils';

const ITEMS_PER_PAGE = 6;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all'); // funding status filter
  const [progressFilter, setProgressFilter] = useState('all'); // progress range filter

  const { campaignAddresses, activeCampaignAddresses, isLoading: factoryLoading } = useCampaignFactory();
  const { campaigns, isLoading: campaignsLoading } = useCampaignDetails(campaignAddresses);

  const isLoading = factoryLoading || campaignsLoading;

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm, activeTab, sortBy, filterBy, progressFilter]);

  // Filter and search campaigns
  const filteredCampaigns = useMemo(() => {
    let filtered = [...campaigns];

    // Filter by tab
    if (activeTab === 'active') {
      filtered = filtered.filter(campaign => 
        campaign.state === 0 && Number(campaign.timeRemaining) > 0
      );
    } else if (activeTab === 'successful') {
      filtered = filtered.filter(campaign => campaign.state === 1);
    } else if (activeTab === 'expired') {
      filtered = filtered.filter(campaign => 
        campaign.state === 2 || (campaign.state === 0 && Number(campaign.timeRemaining) <= 0)
      );
    }

    // Filter by search term (search in creator address and campaign address)
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(campaign =>
        campaign.creator?.toLowerCase().includes(searchLower) ||
        campaign.address?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by funding status
    if (filterBy === 'funded') {
      filtered = filtered.filter(campaign => 
        Number(campaign.progressPercentage || 0) >= 100
      );
    } else if (filterBy === 'underfunded') {
      filtered = filtered.filter(campaign => 
        Number(campaign.progressPercentage || 0) < 100
      );
    } else if (filterBy === 'ending-soon') {
      filtered = filtered.filter(campaign => 
        campaign.state === 0 && 
        Number(campaign.timeRemaining) > 0 && 
        Number(campaign.timeRemaining) <= 7 * 24 * 60 * 60 // 7 days
      );
    }

    // Filter by progress range
    if (progressFilter === '0-25') {
      filtered = filtered.filter(campaign => 
        Number(campaign.progressPercentage || 0) < 25
      );
    } else if (progressFilter === '25-50') {
      filtered = filtered.filter(campaign => 
        Number(campaign.progressPercentage || 0) >= 25 && 
        Number(campaign.progressPercentage || 0) < 50
      );
    } else if (progressFilter === '50-75') {
      filtered = filtered.filter(campaign => 
        Number(campaign.progressPercentage || 0) >= 50 && 
        Number(campaign.progressPercentage || 0) < 75
      );
    } else if (progressFilter === '75-100') {
      filtered = filtered.filter(campaign => 
        Number(campaign.progressPercentage || 0) >= 75 && 
        Number(campaign.progressPercentage || 0) < 100
      );
    } else if (progressFilter === '100+') {
      filtered = filtered.filter(campaign => 
        Number(campaign.progressPercentage || 0) >= 100
      );
    }

    // Sort campaigns
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return Number(b.deadline) - Number(a.deadline);
        case 'oldest':
          return Number(a.deadline) - Number(b.deadline);
        case 'progress':
          return Number(b.progressPercentage || 0) - Number(a.progressPercentage || 0);
        case 'goal':
          return Number(b.goalAmount || 0) - Number(a.goalAmount || 0);
        case 'raised':
          return Number(b.pledgedAmount || 0) - Number(a.pledgedAmount || 0);
        case 'ending-soon':
          return Number(a.timeRemaining || 0) - Number(b.timeRemaining || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [campaigns, activeTab, debouncedSearchTerm, sortBy, filterBy, progressFilter]);

  // Paginate campaigns
  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const paginatedCampaigns = filteredCampaigns.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const tabs = [
    { id: 'all', label: 'All Campaigns', count: campaigns.length },
    { id: 'active', label: 'Active', count: campaigns.filter(c => c.state === 0 && Number(c.timeRemaining) > 0).length },
    { id: 'successful', label: 'Successful', count: campaigns.filter(c => c.state === 1).length },
    { id: 'expired', label: 'Expired', count: campaigns.filter(c => c.state === 2 || (c.state === 0 && Number(c.timeRemaining) <= 0)).length },
  ];

  // Calculate totals
  const totalRaised = campaigns.reduce((sum, campaign) => sum + Number(campaign.pledgedAmount || 0), 0);
  const totalContributors = campaigns.reduce((sum, campaign) => sum + Number(campaign.contributorCount || 0), 0);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!campaigns.length) {
    return (
      <div className="text-center py-12">
        <div className="mobile-container mx-auto">
          <div className="card p-8">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Campaigns Yet</h3>
            <p className="text-gray-600 mb-6">
              Be the first to create a campaign and start making an impact!
            </p>
            <p className="text-sm text-gray-500">
              Click "Create Campaign" to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardErrorBoundary>
      <div className="space-y-8">
      {/* Campaign Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card card-gradient p-6 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{campaigns.length}</div>
              <div className="text-sm text-gray-600">Total Campaigns</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-celo-green to-celo-green-light rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card card-gradient p-6 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {campaigns.filter(c => c.state === 0 && Number(c.timeRemaining) > 0).length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card card-gradient p-6 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-600">
                {formatCurrency(totalRaised, 18, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Raised (cUSD)</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card card-gradient p-6 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{totalContributors}</div>
              <div className="text-sm text-gray-600">Contributors</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Controls */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search campaigns by creator or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 pr-4"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field min-w-[160px]"
              title="Sort campaigns by"
            >
              <option value="newest">📅 Newest First</option>
              <option value="oldest">📅 Oldest First</option>
              <option value="progress">📊 By Progress</option>
              <option value="raised">💰 Most Raised</option>
              <option value="goal">🎯 Highest Goal</option>
              <option value="ending-soon">⏰ Ending Soon</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="input-field min-w-[140px]"
              title="Filter by status"
            >
              <option value="all">All Campaigns</option>
              <option value="funded">✅ Fully Funded</option>
              <option value="underfunded">📈 Needs Funding</option>
              <option value="ending-soon">⚡ Ending Soon</option>
            </select>

            {/* Progress Filter */}
            <select
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              className="input-field min-w-[140px]"
              title="Filter by progress"
            >
              <option value="all">Any Progress</option>
              <option value="0-25">🟥 0-25%</option>
              <option value="25-50">🟧 25-50%</option>
              <option value="50-75">🟨 50-75%</option>
              <option value="75-100">🟩 75-100%</option>
              <option value="100+">🎉 Over-funded</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(debouncedSearchTerm || filterBy !== 'all' || progressFilter !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600 font-medium">Active filters:</span>
            
            {debouncedSearchTerm && (
              <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <span>Search: "{debouncedSearchTerm}"</span>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {filterBy !== 'all' && (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <span>Status: {filterBy}</span>
                <button
                  onClick={() => setFilterBy('all')}
                  className="text-green-600 hover:text-green-800"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {progressFilter !== 'all' && (
              <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                <span>Progress: {progressFilter}%</span>
                <button
                  onClick={() => setProgressFilter('all')}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
                setProgressFilter('all');
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentPage(0);
            }}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-celo-green to-celo-green-light text-white shadow-celo transform scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Results Summary */}
      {filteredCampaigns.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-blue-900">
                Showing {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
              </div>
              <div className="text-sm text-blue-700">
                {totalPages > 1 && `Page ${currentPage + 1} of ${totalPages} • `}
                {(debouncedSearchTerm || filterBy !== 'all' || progressFilter !== 'all') ? 'Filtered results' : 'All campaigns'}
              </div>
            </div>
          </div>
          
          {totalPages > 1 && (
            <div className="text-sm text-blue-600 font-medium">
              {ITEMS_PER_PAGE * currentPage + 1}-{Math.min(ITEMS_PER_PAGE * (currentPage + 1), filteredCampaigns.length)} 
              {' '}of {filteredCampaigns.length}
            </div>
          )}
        </div>
      )}

      {/* Campaign Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-celo-green/10 to-celo-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl">
                {searchTerm ? '🔍' : activeTab === 'active' ? '⚡' : activeTab === 'successful' ? '🎉' : activeTab === 'expired' ? '⏰' : '📋'}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {(debouncedSearchTerm || filterBy !== 'all' || progressFilter !== 'all') 
                ? 'No matching campaigns found' 
                : `No ${activeTab === 'all' ? '' : activeTab} campaigns`}
            </h3>
            <p className="text-gray-600 mb-6">
              {(debouncedSearchTerm || filterBy !== 'all' || progressFilter !== 'all') ? (
                'Try adjusting your search terms and filters, or browse all campaigns.'
              ) : activeTab === 'active' ? (
                'There are no active campaigns at the moment. Be the first to create one!'
              ) : activeTab === 'successful' ? (
                'No campaigns have reached their goals yet. Support active campaigns to make them successful!'
              ) : activeTab === 'expired' ? (
                'No campaigns have expired yet.'
              ) : (
                'No campaigns have been created yet. Be the first to make an impact!'
              )}
            </p>
            {!searchTerm && (
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openCreateModal'))}
                className="btn-primary"
              >
                Create First Campaign
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedCampaigns.map((campaign, index) => (
              <div 
                key={campaign.address} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CampaignErrorBoundary>
                  <CampaignCard campaign={campaign} />
                </CampaignErrorBoundary>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="btn-secondary disabled:opacity-50"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-8 h-8 rounded ${
                      currentPage === index
                        ? 'bg-celo-green text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="btn-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      </div>
    </DashboardErrorBoundary>
  );
}