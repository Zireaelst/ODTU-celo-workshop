'use client';

import { useState, useEffect } from 'react';
import { 
  SOCIAL_PLATFORMS, 
  SOCIAL_CONFIG, 
  shareCampaign, 
  copyToClipboard, 
  getCampaignShareData,
  trackShare
} from '../lib/sharing';

const ShareButton = ({ 
  campaign, 
  campaignAddress, 
  mockData, 
  variant = 'default', // 'default', 'compact', 'floating'
  showLabels = true,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareData, setShareData] = useState(null);

  useEffect(() => {
    const data = getCampaignShareData(campaign, campaignAddress, mockData);
    setShareData(data);
  }, [campaign, campaignAddress, mockData]);

  const handleShare = async (platform) => {
    if (!shareData) return;

    trackShare(platform, campaignAddress);

    if (platform === SOCIAL_PLATFORMS.COPY_LINK) {
      const success = await copyToClipboard(shareData.url);
      if (success) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } else {
      shareCampaign(platform, shareData);
    }
    
    setIsOpen(false);
  };

  const shareOptions = [
    SOCIAL_PLATFORMS.TWITTER,
    SOCIAL_PLATFORMS.FACEBOOK,
    SOCIAL_PLATFORMS.LINKEDIN,
    SOCIAL_PLATFORMS.TELEGRAM,
    SOCIAL_PLATFORMS.WHATSAPP,
    SOCIAL_PLATFORMS.COPY_LINK
  ];

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {isOpen && (
          <div className="mb-4 space-y-2">
            {shareOptions.map((platform) => {
              if (platform === SOCIAL_PLATFORMS.COPY_LINK) {
                return (
                  <button
                    key={platform}
                    onClick={() => handleShare(platform)}
                    className="flex items-center justify-center w-12 h-12 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                    title={copiedLink ? 'Copied!' : 'Copy Link'}
                  >
                    {copiedLink ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                );
              }
              
              const config = SOCIAL_CONFIG[platform];
              return (
                <button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  className={`flex items-center justify-center w-12 h-12 bg-${config.color}-500 text-white rounded-full shadow-lg hover:bg-${config.color}-600 transition-all duration-200 hover:scale-110`}
                  title={`Share on ${config.name}`}
                >
                  <span className="text-xl">{config.icon}</span>
                </button>
              );
            })}
          </div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 bg-celo-green text-white rounded-full shadow-lg hover:bg-celo-green-dark transition-all duration-200 hover:scale-110"
          title="Share Campaign"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          {showLabels && <span className="text-sm">Share</span>}
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10 min-w-48">
            <div className="space-y-1">
              {shareOptions.map((platform) => {
                if (platform === SOCIAL_PLATFORMS.COPY_LINK) {
                  return (
                    <button
                      key={platform}
                      onClick={() => handleShare(platform)}
                      className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {copiedLink ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                      <span className="text-sm text-gray-700">
                        {copiedLink ? 'Copied!' : 'Copy Link'}
                      </span>
                    </button>
                  );
                }

                const config = SOCIAL_CONFIG[platform];
                return (
                  <button
                    key={platform}
                    onClick={() => handleShare(platform)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span className="text-lg">{config.icon}</span>
                    <span className="text-sm text-gray-700">{config.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default variant - horizontal buttons
  return (
    <div className={`space-y-3 ${className}`}>
      {showLabels && (
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share this campaign
        </h4>
      )}
      
      <div className="flex flex-wrap gap-2">
        {shareOptions.map((platform) => {
          if (platform === SOCIAL_PLATFORMS.COPY_LINK) {
            return (
              <button
                key={platform}
                onClick={() => handleShare(platform)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:scale-105"
                title={copiedLink ? 'Copied!' : 'Copy Link'}
              >
                {copiedLink ? (
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
                {showLabels && (
                  <span className="text-sm font-medium">
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </span>
                )}
              </button>
            );
          }

          const config = SOCIAL_CONFIG[platform];
          return (
            <button
              key={platform}
              onClick={() => handleShare(platform)}
              className={`flex items-center gap-2 px-4 py-2 bg-${config.color}-500 hover:bg-${config.color}-600 text-white rounded-lg transition-all duration-200 hover:scale-105`}
              title={`Share on ${config.name}`}
            >
              <span className="text-lg">{config.icon}</span>
              {showLabels && (
                <span className="text-sm font-medium">{config.name}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShareButton;