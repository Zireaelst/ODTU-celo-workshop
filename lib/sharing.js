// Social Sharing Utilities
export const SOCIAL_PLATFORMS = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin',
  TELEGRAM: 'telegram',
  WHATSAPP: 'whatsapp',
  COPY_LINK: 'copy'
};

export const SOCIAL_CONFIG = {
  [SOCIAL_PLATFORMS.TWITTER]: {
    name: 'Twitter',
    icon: '𝕏',
    color: 'black',
    baseUrl: 'https://twitter.com/intent/tweet',
    getUrl: ({ url, title, description }) => {
      const text = `${title}\n\n${description}\n\nSupport this campaign on CeloImpact 🌱`;
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=CeloImpact,Crowdfunding,Celo,Blockchain`;
    }
  },
  [SOCIAL_PLATFORMS.FACEBOOK]: {
    name: 'Facebook',
    icon: '📘',
    color: 'blue',
    baseUrl: 'https://www.facebook.com/sharer/sharer.php',
    getUrl: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  [SOCIAL_PLATFORMS.LINKEDIN]: {
    name: 'LinkedIn',
    icon: '💼',
    color: 'blue',
    baseUrl: 'https://www.linkedin.com/sharing/share-offsite/',
    getUrl: ({ url, title }) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  },
  [SOCIAL_PLATFORMS.TELEGRAM]: {
    name: 'Telegram',
    icon: '✈️',
    color: 'sky',
    baseUrl: 'https://t.me/share/url',
    getUrl: ({ url, title, description }) => {
      const text = `${title}\n\n${description}\n\nSupport this campaign: `;
      return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    }
  },
  [SOCIAL_PLATFORMS.WHATSAPP]: {
    name: 'WhatsApp',
    icon: '📱',
    color: 'green',
    baseUrl: 'https://wa.me/',
    getUrl: ({ url, title, description }) => {
      const text = `${title}\n\n${description}\n\nCheck out this campaign on CeloImpact: ${url}`;
      return `https://wa.me/?text=${encodeURIComponent(text)}`;
    }
  }
};

// Share a campaign
export function shareCampaign(platform, campaignData) {
  const config = SOCIAL_CONFIG[platform];
  if (!config) {
    console.error('Unsupported platform:', platform);
    return false;
  }

  if (platform === SOCIAL_PLATFORMS.COPY_LINK) {
    return copyToClipboard(campaignData.url);
  }

  const shareUrl = config.getUrl(campaignData);
  
  // Open in new window with appropriate size
  const windowFeatures = 'width=600,height=400,scrollbars=yes,resizable=yes';
  window.open(shareUrl, '_blank', windowFeatures);
  
  return true;
}

// Copy text to clipboard
export async function copyToClipboard(text) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      textArea.remove();
      return true;
    } catch (err) {
      textArea.remove();
      console.error('Failed to copy text: ', err);
      return false;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

// Generate campaign share data
export function getCampaignShareData(campaign, campaignAddress, mockData) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://celoimpact.app';
  const campaignUrl = `${baseUrl}/campaign/${campaignAddress}`;
  
  return {
    url: campaignUrl,
    title: mockData?.title || `Campaign by ${campaign.creator?.slice(0, 6)}...`,
    description: mockData?.description || `Help support this campaign on CeloImpact. Goal: ${formatCurrency(campaign.goalAmount)} cUSD`,
    image: `${baseUrl}/api/og/campaign/${campaignAddress}`, // For future OG image generation
    hashtags: ['CeloImpact', 'Crowdfunding', 'Celo', 'Blockchain', 'DeFi'],
  };
}

// Social meta tags for better sharing
export function getSocialMetaTags(campaignData) {
  return {
    // OpenGraph
    'og:title': campaignData.title,
    'og:description': campaignData.description,
    'og:url': campaignData.url,
    'og:image': campaignData.image,
    'og:type': 'website',
    'og:site_name': 'CeloImpact',
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:site': '@CeloImpact',
    'twitter:title': campaignData.title,
    'twitter:description': campaignData.description,
    'twitter:image': campaignData.image,
    'twitter:url': campaignData.url,
    
    // Additional
    'author': 'CeloImpact Team',
    'keywords': campaignData.hashtags?.join(', ') || 'crowdfunding, celo, blockchain'
  };
}

// Track sharing analytics (future enhancement)
export function trackShare(platform, campaignAddress) {
  // This would integrate with analytics service
  console.log(`Shared campaign ${campaignAddress} on ${platform}`);
  
  // Example: Google Analytics event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: 'campaign',
      item_id: campaignAddress
    });
  }
}

// Helper to format currency for sharing
function formatCurrency(amount, decimals = 18, displayDecimals = 2) {
  if (!amount) return '0';
  
  const formatted = (Number(amount) / Math.pow(10, decimals)).toFixed(displayDecimals);
  return formatted.replace(/\.?0+$/, ''); // Remove trailing zeros
}

export default {
  SOCIAL_PLATFORMS,
  SOCIAL_CONFIG,
  shareCampaign,
  copyToClipboard,
  getCampaignShareData,
  getSocialMetaTags,
  trackShare
};