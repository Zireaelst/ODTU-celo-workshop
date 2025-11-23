'use client';

import { useState, useEffect } from 'react';
import { useCreateCampaign } from '../hooks/useToken';
import { parseCurrency } from '../lib/utils';
import toast from 'react-hot-toast';

export default function CreateCampaignModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    goalAmount: '',
    duration: '',
  });
  const [errors, setErrors] = useState({});

  const goalAmountWei = formData.goalAmount ? parseCurrency(formData.goalAmount) : 0n;
  const durationSeconds = formData.duration ? Number(formData.duration) * 24 * 60 * 60 : 0; // Convert days to seconds

  const { createCampaign, isLoading, isSuccess, isError } = useCreateCampaign(
    goalAmountWei,
    durationSeconds
  );

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      setFormData({ goalAmount: '', duration: '' });
      setErrors({});
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to create campaign. Please check your inputs and try again.');
    }
  }, [isError]);

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate goal amount
    if (!formData.goalAmount || formData.goalAmount === '') {
      newErrors.goalAmount = 'Goal amount is required';
    } else if (isNaN(Number(formData.goalAmount)) || Number(formData.goalAmount) <= 0) {
      newErrors.goalAmount = 'Goal amount must be a positive number';
    } else if (Number(formData.goalAmount) < 1) {
      newErrors.goalAmount = 'Minimum goal amount is 1 cUSD';
    } else if (Number(formData.goalAmount) > 1000000) {
      newErrors.goalAmount = 'Maximum goal amount is 1,000,000 cUSD';
    }

    // Validate duration
    if (!formData.duration || formData.duration === '') {
      newErrors.duration = 'Duration is required';
    } else if (isNaN(Number(formData.duration)) || Number(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be a positive number';
    } else if (Number(formData.duration) < 1) {
      newErrors.duration = 'Minimum duration is 1 day';
    } else if (Number(formData.duration) > 365) {
      newErrors.duration = 'Maximum duration is 365 days';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!createCampaign) {
      toast.error('Unable to create campaign. Please check your wallet connection.');
      return;
    }

    createCampaign?.();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-scaleIn transform">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-celo-green/5 to-celo-gold/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-celo-green to-celo-green-light rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Campaign</h2>
              <p className="text-sm text-gray-600">Launch your fundraising campaign</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Goal Amount */}
          <div className="form-group">
            <label htmlFor="goalAmount" className="form-label flex items-center gap-2">
              <svg className="w-4 h-4 text-celo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Goal Amount (cUSD)
            </label>
            <div className="relative">
              <input
                type="number"
                id="goalAmount"
                value={formData.goalAmount}
                onChange={(e) => handleInputChange('goalAmount', e.target.value)}
                placeholder="e.g., 1000"
                step="0.01"
                min="1"
                max="1000000"
                className={`form-input ${errors.goalAmount ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'focus:ring-celo-green/20 focus:border-celo-green'} pl-10`}
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm font-medium">$</span>
              </div>
            </div>
            {errors.goalAmount ? (
              <p className="error-message flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.goalAmount}
              </p>
            ) : (
              <p className="help-text">
                The total amount you want to raise in cUSD (minimum $1)
              </p>
            )}
          </div>

          {/* Duration */}
          <div className="form-group">
            <label htmlFor="duration" className="form-label flex items-center gap-2">
              <svg className="w-4 h-4 text-celo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duration (Days)
            </label>
            <div className="relative">
              <input
                type="number"
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 30"
                min="1"
                max="365"
                className={`form-input ${errors.duration ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'focus:ring-celo-green/20 focus:border-celo-green'} pl-10`}
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {errors.duration ? (
              <p className="error-message flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.duration}
              </p>
            ) : (
              <p className="help-text">
                How long the campaign should run (1-365 days)
              </p>
            )}
          </div>

          {/* Campaign Preview */}
          {formData.goalAmount && formData.duration && (
            <div className="preview-card border-l-4 border-l-celo-green">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-celo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Campaign Preview</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="preview-stat">
                  <div className="preview-stat-value text-celo-green">${formData.goalAmount}</div>
                  <div className="preview-stat-label">Funding Goal</div>
                </div>
                <div className="preview-stat">
                  <div className="preview-stat-value text-celo-gold">{formData.duration} days</div>
                  <div className="preview-stat-label">Campaign Length</div>
                </div>
                <div className="preview-stat sm:col-span-2">
                  <div className="preview-stat-value text-gray-700 text-base">
                    {formData.duration ? 
                      new Date(Date.now() + Number(formData.duration) * 24 * 60 * 60 * 1000)
                        .toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                      : 'Not set'
                    }
                  </div>
                  <div className="preview-stat-label">Campaign End Date</div>
                </div>
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="info-card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-blue-900">Campaign Rules</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3 text-sm text-blue-800">
                <svg className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Withdraw funds only after reaching your goal</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-blue-800">
                <svg className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Contributors get automatic refunds if goal isn't met</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-blue-800">
                <svg className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Powered by cUSD on Celo blockchain</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-blue-800">
                <svg className="w-4 h-4 mt-0.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Campaign details are permanent once created</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="btn-secondary flex-1 py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.goalAmount || !formData.duration}
              className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-celo-green-light/20 animate-pulse"></div>
              )}
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Campaign...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Launch Campaign</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}