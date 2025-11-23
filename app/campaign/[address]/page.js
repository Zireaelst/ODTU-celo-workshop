'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useCampaign, useContribute, useWithdraw, useRefund, useContribution } from '../../../hooks/useCampaign';
import { useCUSDBalance, useCUSDAllowance, useApproveCUSD } from '../../../hooks/useToken';
import { CampaignErrorBoundary, WalletErrorBoundary } from '../../../components/ErrorBoundary';
import { formatCurrency, formatTimeRemaining, formatDate, getCampaignStatusColor, getCampaignStatusText, truncateAddress, parseCurrency } from '../../../lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CampaignDetail() {
  const params = useParams();
  const router = useRouter();
  const { address: userAddress, isConnected } = useAccount();
  
  const [contributeAmount, setContributeAmount] = useState('');
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  const campaignAddress = params?.address;

  // Campaign data
  const { campaignInfo, progressPercentage, timeRemaining, isLoading, refetch } = useCampaign(campaignAddress);
  
  // User's contribution to this campaign
  const { contribution: userContribution } = useContribution(campaignAddress, userAddress);
  
  // User's cUSD balance and allowance
  const { balance: userBalance } = useCUSDBalance(userAddress);
  const { allowance } = useCUSDAllowance(userAddress, campaignAddress);
  
  // Contract interactions
  const contributeAmountWei = contributeAmount ? parseCurrency(contributeAmount) : 0n;
  const { approve, isLoading: approveLoading, isSuccess: approveSuccess } = useApproveCUSD(campaignAddress, contributeAmountWei);
  const { contribute, isLoading: contributeLoading, isSuccess: contributeSuccess } = useContribute(campaignAddress, contributeAmountWei);
  const { withdraw, isLoading: withdrawLoading, isSuccess: withdrawSuccess } = useWithdraw(campaignAddress);
  const { refund, isLoading: refundLoading, isSuccess: refundSuccess } = useRefund(campaignAddress);

  // Handle successful transactions
  useEffect(() => {
    if (contributeSuccess || withdrawSuccess || refundSuccess) {
      refetch();
      setContributeAmount('');
      setIsContributeModalOpen(false);
    }
  }, [contributeSuccess, withdrawSuccess, refundSuccess, refetch]);

  // Auto-contribute after approval
  useEffect(() => {
    if (approveSuccess && contributeAmountWei > 0) {
      contribute?.();
    }
  }, [approveSuccess, contribute, contributeAmountWei]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container-responsive py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-celo-green to-celo-green-light rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Connect your wallet to view campaign details and participate in crowdfunding.
            </p>
            <div className="space-y-3">
              <Link href="/" className="btn-primary w-full">
                Back to Campaigns
              </Link>
              <p className="text-sm text-gray-500">
                Supported: MetaMask, MiniPay, WalletConnect
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !campaignInfo) {
    return <CampaignDetailSkeleton />;
  }

  const [creator, goalAmount, deadline, pledgedAmount, state] = campaignInfo;
  const isCreator = userAddress && creator && userAddress.toLowerCase() === creator.toLowerCase();
  const hasContributed = userContribution && userContribution > 0n;
  const needsApproval = allowance < contributeAmountWei;
  const statusColor = getCampaignStatusColor(state, timeRemaining);
  const statusText = getCampaignStatusText(state, timeRemaining);

  const handleContribute = () => {
    if (!contributeAmount || Number(contributeAmount) <= 0) {
      toast.error('Please enter a valid contribution amount');
      return;
    }

    if (contributeAmountWei > userBalance) {
      toast.error('Insufficient cUSD balance');
      return;
    }

    if (needsApproval) {
      approve?.();
    } else {
      contribute?.();
    }
  };

  const canWithdraw = isCreator && (state === 1 || pledgedAmount >= goalAmount);
  const canRefund = hasContributed && (state === 2 || (state === 0 && Number(timeRemaining) <= 0 && pledgedAmount < goalAmount));
  const canContribute = state === 0 && Number(timeRemaining) > 0 && !isCreator;

  return (
    <CampaignErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container-responsive py-8">
        {/* Back Navigation */}
        <nav className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="btn-ghost flex items-center gap-2 text-gray-600 hover:text-celo-green transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Campaigns
          </button>
        </nav>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Campaign Hero Section */}
          <div className="card p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Campaign Info */}
              <div className="flex-1 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-celo-green to-celo-green-light rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">
                        {creator ? creator.slice(2, 4).toUpperCase() : '??'}
                      </span>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Details</h1>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Created by {truncateAddress(creator)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    statusColor === 'text-green-600' ? 'bg-green-100 text-green-700' :
                    statusColor === 'text-yellow-600' ? 'bg-yellow-100 text-yellow-700' :
                    statusColor === 'text-red-600' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {statusText}
                  </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
                    <span className="text-sm text-gray-600">
                      {Number(progressPercentage || 0)}% completed
                    </span>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill progress-glow"
                      style={{ width: `${Math.min(Number(progressPercentage || 0), 100)}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Raised: <span className="font-semibold text-celo-green">{formatCurrency(pledgedAmount)} cUSD</span>
                    </span>
                    <span className="text-gray-600">
                      Goal: <span className="font-semibold">{formatCurrency(goalAmount)} cUSD</span>
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="stat-card">
                    <div className="stat-value text-celo-green">
                      {formatCurrency(pledgedAmount)}
                    </div>
                    <div className="stat-label">Total Raised</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value text-gray-700">
                      {formatTimeRemaining(Number(timeRemaining || 0))}
                    </div>
                    <div className="stat-label">Time Remaining</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value text-celo-gold">
                      {Number(progressPercentage || 0)}%
                    </div>
                    <div className="stat-label">Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Status Alerts */}
          {isCreator && (
            <div className="info-card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Campaign Creator</div>
                  <div className="text-sm text-blue-700">You created this campaign and can manage its funds</div>
                </div>
              </div>
            </div>
          )}

          {hasContributed && !isCreator && (
            <div className="info-card bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-green-900">Thank you for contributing!</div>
                    <div className="text-sm text-green-700">Your support helps make this campaign possible</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-800 text-lg">
                    {formatCurrency(userContribution)}
                  </div>
                  <div className="text-sm text-green-600">cUSD contributed</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contribution Actions */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-celo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Actions
              </h3>
              
              {canContribute && (
                <div className="space-y-4">
                  <button
                    onClick={() => setIsContributeModalOpen(true)}
                    className="btn-primary w-full py-4 text-lg font-semibold"
                  >
                    🚀 Support This Campaign
                  </button>
                  <div className="text-center text-sm text-gray-600">
                    Your balance: <span className="font-semibold text-celo-green">{formatCurrency(userBalance)} cUSD</span>
                  </div>
                </div>
              )}

              {canWithdraw && (
                <button
                  onClick={() => withdraw?.()}
                  disabled={withdrawLoading}
                  className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2"
                >
                  {withdrawLoading && (
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  💰 {withdrawLoading ? 'Withdrawing Funds...' : 'Withdraw Campaign Funds'}
                </button>
              )}

              {canRefund && (
                <button
                  onClick={() => refund?.()}
                  disabled={refundLoading}
                  className="btn-outline w-full py-4 text-lg font-semibold flex items-center justify-center gap-2"
                >
                  {refundLoading && (
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  🔄 {refundLoading ? 'Claiming Refund...' : 'Claim Your Refund'}
                </button>
              )}

              {!canContribute && !canWithdraw && !canRefund && (
                <div className="text-center py-12">
                  {state === 1 ? (
                    <div className="space-y-3">
                      <div className="text-6xl">🎉</div>
                      <h4 className="text-xl font-semibold text-green-600">Campaign Successful!</h4>
                      <p className="text-gray-600">This campaign has reached its funding goal.</p>
                    </div>
                  ) : state === 2 || Number(timeRemaining) <= 0 ? (
                    <div className="space-y-3">
                      <div className="text-6xl">⏰</div>
                      <h4 className="text-xl font-semibold text-gray-600">Campaign Ended</h4>
                      <p className="text-gray-600">This campaign is no longer active.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-6xl">ℹ️</div>
                      <h4 className="text-xl font-semibold text-gray-600">No Actions Available</h4>
                      <p className="text-gray-600">Check back later for updates.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Campaign Information */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-celo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Campaign Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Funding Goal</span>
                  <span className="font-semibold text-lg">{formatCurrency(goalAmount)} cUSD</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">End Date</span>
                  <span className="font-semibold">{formatDate(deadline)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Creator Address</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {truncateAddress(creator)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Contract Address</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {truncateAddress(campaignAddress)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Network</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-celo-green rounded-full"></div>
                    <span className="font-semibold">Celo Mainnet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contribute Modal */}
        {isContributeModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scaleIn">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Support Campaign</h3>
                  <p className="text-gray-600 text-sm">Help make this campaign successful</p>
                </div>
                <button
                  onClick={() => setIsContributeModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="form-group">
                  <label className="form-label">
                    Contribution Amount (cUSD)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={contributeAmount}
                      onChange={(e) => setContributeAmount(e.target.value)}
                      placeholder="Enter amount to contribute"
                      step="0.01"
                      min="0.01"
                      className="form-input pl-10"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm font-medium">$</span>
                    </div>
                  </div>
                  <p className="help-text">
                    Available balance: {formatCurrency(userBalance)} cUSD
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Quick amounts:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10', '50', '100'].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setContributeAmount(amount)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-celo-green hover:text-celo-green transition-colors"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsContributeModalOpen(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleContribute}
                    disabled={!contributeAmount || Number(contributeAmount) <= 0 || approveLoading || contributeLoading}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {(approveLoading || contributeLoading) && (
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {approveLoading ? 'Approving...' : 
                     contributeLoading ? 'Contributing...' : 
                     needsApproval ? 'Approve & Contribute' : 'Contribute Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </CampaignErrorBoundary>
  );
}

// Skeleton Loading Component
function CampaignDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container-responsive py-8">
        {/* Back Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded-xl w-40 mb-8 animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section Skeleton */}
          <div className="card p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
                  <div className="space-y-3 flex-1">
                    <div className="h-8 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="card p-4">
                      <div className="h-8 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards Skeleton */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
            </div>
            
            <div className="card p-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between py-3">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}