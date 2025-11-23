'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useCampaign, useContribute, useWithdraw, useRefund, useContribution } from '../../../hooks/useCampaign';
import { useCUSDBalance, useCUSDAllowance, useApproveCUSD } from '../../../hooks/useToken';
import { formatCurrency, formatTimeRemaining, formatDate, getCampaignStatusColor, getCampaignStatusText, truncateAddress, parseCurrency } from '../../../lib/utils';
import toast from 'react-hot-toast';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-6">
            You need to connect your wallet to view campaign details.
          </p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !campaignInfo) {
    return (
      <div className="mobile-container mx-auto py-8">
        <div className="card p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-32 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
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
    <div className="mobile-container mx-auto py-8">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="btn-secondary mb-6 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Campaigns
      </button>

      <div className="space-y-6">
        {/* Campaign Header */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-celo-green rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {creator ? creator.slice(2, 4).toUpperCase() : '??'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Campaign Details</h1>
                <p className="text-gray-600">
                  Created by {truncateAddress(creator)}
                </p>
              </div>
            </div>
            
            <div className={`status-badge ${statusColor} bg-opacity-10`}>
              <span className={statusColor}>{statusText}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-4">
            Contract: {truncateAddress(campaignAddress)}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress: {Number(progressPercentage || 0)}%</span>
              <span>{formatCurrency(pledgedAmount)} / {formatCurrency(goalAmount)} cUSD</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(Number(progressPercentage || 0), 100)}%` }}
              />
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-celo-green">
                {formatCurrency(pledgedAmount)}
              </div>
              <div className="text-sm text-gray-600">Raised</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {formatTimeRemaining(Number(timeRemaining || 0))}
              </div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
          </div>
        </div>

        {/* User Status */}
        {isCreator && (
          <div className="card p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">👤</span>
              <span className="font-medium text-blue-800">You are the creator of this campaign</span>
            </div>
          </div>
        )}

        {hasContributed && !isCreator && (
          <div className="card p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-green-600">💝</span>
                <span className="font-medium text-green-800">Your contribution</span>
              </div>
              <span className="font-bold text-green-800">
                {formatCurrency(userContribution)} cUSD
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          
          {canContribute && (
            <div className="space-y-4">
              <button
                onClick={() => setIsContributeModalOpen(true)}
                className="btn-primary w-full"
              >
                Support This Campaign
              </button>
              <p className="text-sm text-gray-600 text-center">
                Your cUSD balance: {formatCurrency(userBalance)} cUSD
              </p>
            </div>
          )}

          {canWithdraw && (
            <button
              onClick={() => withdraw?.()}
              disabled={withdrawLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {withdrawLoading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {withdrawLoading ? 'Withdrawing...' : 'Withdraw Funds'}
            </button>
          )}

          {canRefund && (
            <button
              onClick={() => refund?.()}
              disabled={refundLoading}
              className="btn-outline w-full flex items-center justify-center gap-2"
            >
              {refundLoading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {refundLoading ? 'Claiming...' : 'Claim Refund'}
            </button>
          )}

          {!canContribute && !canWithdraw && !canRefund && (
            <div className="text-center py-8 text-gray-500">
              {state === 1 ? (
                <div>
                  <span className="text-4xl mb-2 block">🎉</span>
                  <p>Campaign was successful!</p>
                </div>
              ) : state === 2 || Number(timeRemaining) <= 0 ? (
                <div>
                  <span className="text-4xl mb-2 block">⏰</span>
                  <p>Campaign has ended</p>
                </div>
              ) : (
                <p>No actions available</p>
              )}
            </div>
          )}
        </div>

        {/* Campaign Information */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Campaign Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Goal Amount:</span>
              <span className="font-medium">{formatCurrency(goalAmount)} cUSD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">End Date:</span>
              <span className="font-medium">{formatDate(deadline)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Creator:</span>
              <span className="font-medium font-mono">{truncateAddress(creator)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Contract:</span>
              <span className="font-medium font-mono">{truncateAddress(campaignAddress)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contribute Modal */}
      {isContributeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Support Campaign</h3>
              <button
                onClick={() => setIsContributeModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Amount (cUSD)
                </label>
                <input
                  type="number"
                  value={contributeAmount}
                  onChange={(e) => setContributeAmount(e.target.value)}
                  placeholder="Enter amount"
                  step="0.01"
                  min="0.01"
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available: {formatCurrency(userBalance)} cUSD
                </p>
              </div>
              
              <div className="flex gap-3">
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
                   needsApproval ? 'Approve & Contribute' : 'Contribute'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}