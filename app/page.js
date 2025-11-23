'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import Dashboard from '../components/Dashboard';
import CreateCampaignModal from '../components/CreateCampaignModal';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import FeaturedCampaigns from '../components/FeaturedCampaigns';

export default function Home() {
  const { isConnected } = useAccount();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (!isConnected) {
    return (
      <>
        <Hero />
        <StatsSection />
        <FeaturedCampaigns />
        <div id="campaigns">
          <Dashboard />
        </div>
        <CreateCampaignModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center px-4 py-2 bg-celo-green/10 rounded-full mb-6">
          <div className="w-2 h-2 bg-celo-green rounded-full animate-pulse mr-2"></div>
          <span className="text-sm font-medium text-celo-green-dark">Connected to Celo</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Welcome back to <span className="bg-gradient-to-r from-celo-green to-celo-green-light bg-clip-text text-transparent">CeloImpact</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Discover amazing campaigns and make a real impact on the Celo blockchain
        </p>
        
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Campaign
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Explore Campaigns
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card card-gradient p-6 text-center group hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-celo-green to-celo-green-light rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">Active</div>
          <div className="text-gray-600">Browse live campaigns</div>
        </div>
        
        <div className="card card-gradient p-6 text-center group hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-celo-gold to-celo-gold-light rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">Secure</div>
          <div className="text-gray-600">Transparent funding</div>
        </div>
        
        <div className="card card-gradient p-6 text-center group hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">Community</div>
          <div className="text-gray-600">Global impact</div>
        </div>
      </div>

      {/* Dashboard */}
      <Dashboard />
      
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}