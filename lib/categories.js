// Campaign Categories Configuration
export const CAMPAIGN_CATEGORIES = [
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Tech startups, apps, software, and hardware projects',
    color: 'blue'
  },
  {
    id: 'social-impact',
    name: 'Social Impact',
    icon: '🌍',
    description: 'Projects that aim to create positive social change',
    color: 'green'
  },
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    description: 'Educational initiatives, courses, and learning platforms',
    color: 'purple'
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    icon: '🎨',
    description: 'Creative projects, art, music, and cultural initiatives',
    color: 'pink'
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    icon: '🏥',
    description: 'Healthcare, medical research, and wellness projects',
    color: 'red'
  },
  {
    id: 'environment',
    name: 'Environment',
    icon: '🌱',
    description: 'Environmental protection and sustainability projects',
    color: 'emerald'
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
    description: 'Startups, business ventures, and entrepreneurship',
    color: 'indigo'
  },
  {
    id: 'community',
    name: 'Community',
    icon: '🤝',
    description: 'Local community projects and initiatives',
    color: 'orange'
  }
];

// Mock category data - In real implementation, this would come from smart contract
export const CAMPAIGN_CATEGORY_MAP = {
  // Sample mappings - These would be stored in smart contract in real implementation
  '0x1234567890123456789012345678901234567890': 'technology',
  '0x2345678901234567890123456789012345678901': 'social-impact',
  '0x3456789012345678901234567890123456789012': 'education',
  '0x4567890123456789012345678901234567890123': 'arts',
  '0x5678901234567890123456789012345678901234': 'health',
  '0x6789012345678901234567890123456789012345': 'environment',
  '0x7890123456789012345678901234567890123456': 'business',
  '0x8901234567890123456789012345678901234567': 'community',
};

// Simulated category assignment based on campaign title/description
export function getCampaignCategory(campaignTitle = '', campaignDescription = '') {
  const text = `${campaignTitle} ${campaignDescription}`.toLowerCase();
  
  // Simple keyword-based categorization
  if (text.includes('tech') || text.includes('app') || text.includes('software') || 
      text.includes('ai') || text.includes('blockchain') || text.includes('digital')) {
    return 'technology';
  }
  
  if (text.includes('education') || text.includes('school') || text.includes('learning') ||
      text.includes('course') || text.includes('teach') || text.includes('university')) {
    return 'education';
  }
  
  if (text.includes('health') || text.includes('medical') || text.includes('hospital') ||
      text.includes('wellness') || text.includes('cure') || text.includes('treatment')) {
    return 'health';
  }
  
  if (text.includes('environment') || text.includes('green') || text.includes('climate') ||
      text.includes('sustain') || text.includes('eco') || text.includes('renewable')) {
    return 'environment';
  }
  
  if (text.includes('art') || text.includes('music') || text.includes('culture') ||
      text.includes('creative') || text.includes('design') || text.includes('film')) {
    return 'arts';
  }
  
  if (text.includes('community') || text.includes('local') || text.includes('neighborhood') ||
      text.includes('volunteer') || text.includes('charity') || text.includes('social')) {
    return 'social-impact';
  }
  
  if (text.includes('business') || text.includes('startup') || text.includes('company') ||
      text.includes('entrepreneur') || text.includes('market') || text.includes('revenue')) {
    return 'business';
  }
  
  // Default category
  return 'community';
}

export function getCategoryInfo(categoryId) {
  return CAMPAIGN_CATEGORIES.find(cat => cat.id === categoryId) || CAMPAIGN_CATEGORIES[7]; // Default to community
}

export function getCategoryColor(categoryId) {
  const category = getCategoryInfo(categoryId);
  return category.color;
}

export function getCategoryIcon(categoryId) {
  const category = getCategoryInfo(categoryId);
  return category.icon;
}

// Generate mock campaign titles and descriptions for demo purposes
export const MOCK_CAMPAIGN_DATA = [
  {
    title: "AI-Powered Learning Platform for Rural Schools",
    description: "Building an educational technology platform to bring AI-powered personalized learning to underserved communities",
    category: "education"
  },
  {
    title: "Sustainable Water Purification System",
    description: "Developing eco-friendly water purification technology using renewable energy sources for clean drinking water access",
    category: "environment"
  },
  {
    title: "Digital Art NFT Marketplace for Emerging Artists",
    description: "Creating a blockchain-based platform for digital artists to showcase and sell their creative works as NFTs",
    category: "arts"
  },
  {
    title: "Community Health Clinic Mobile App",
    description: "Mobile health application connecting rural communities with healthcare professionals through telemedicine",
    category: "health"
  },
  {
    title: "Local Food Delivery Cooperative",
    description: "Building a community-owned delivery platform supporting local restaurants and sustainable food practices",
    category: "business"
  },
  {
    title: "Solar-Powered Internet Cafes for Remote Areas",
    description: "Installing solar-powered internet access points in remote communities to bridge the digital divide",
    category: "technology"
  },
  {
    title: "Youth Mentorship Program Expansion",
    description: "Expanding our community mentorship program to help at-risk youth develop skills and career opportunities",
    category: "social-impact"
  },
  {
    title: "Urban Vertical Farm Initiative",
    description: "Creating vertical farming systems in urban areas to produce fresh food sustainably while reducing carbon footprint",
    category: "environment"
  }
];