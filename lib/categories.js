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

// Generate comprehensive mock campaign data for demo purposes
export const MOCK_CAMPAIGN_DATA = [
  {
    title: "AI-Powered Learning Platform for Rural Schools",
    description: "Building an educational technology platform to bring AI-powered personalized learning to underserved communities worldwide",
    category: "education",
    creator: "0x742d35Cc4Bf3e395B3B0c57A2Bf8B8C7D4f8E9A3",
    goalAmount: "25000",
    pledgedAmount: "18750",
    state: 0, // Active
    deadline: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
    contributorCount: 47,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
  },
  {
    title: "Sustainable Water Purification System",
    description: "Developing eco-friendly water purification technology using renewable energy sources for clean drinking water access in developing regions",
    category: "environment",
    creator: "0x8b3f4c2d1e5a9b7c3d2e1f4a5b6c7d8e9f0a1b2c",
    goalAmount: "50000",
    pledgedAmount: "52000",
    state: 1, // Successful
    deadline: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 days ago
    contributorCount: 89,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
  },
  {
    title: "Digital Art NFT Marketplace for Emerging Artists",
    description: "Creating a blockchain-based platform for digital artists to showcase and sell their creative works as NFTs with fair royalty distribution",
    category: "arts",
    creator: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    goalAmount: "15000",
    pledgedAmount: "8900",
    state: 0, // Active
    deadline: Date.now() + (45 * 24 * 60 * 60 * 1000), // 45 days from now
    contributorCount: 34,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
  },
  {
    title: "Community Health Clinic Mobile App",
    description: "Mobile health application connecting rural communities with healthcare professionals through telemedicine and AI-powered diagnostics",
    category: "health",
    creator: "0x9f8e7d6c5b4a3928f7e6d5c4b3a29f8e7d6c5b4a",
    goalAmount: "35000",
    pledgedAmount: "42000",
    state: 1, // Successful
    deadline: Date.now() - (10 * 24 * 60 * 60 * 1000), // 10 days ago
    contributorCount: 125,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
  },
  {
    title: "Local Food Delivery Cooperative",
    description: "Building a community-owned delivery platform supporting local restaurants and sustainable food practices while ensuring fair wages",
    category: "business",
    creator: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    goalAmount: "20000",
    pledgedAmount: "12500",
    state: 0, // Active
    deadline: Date.now() + (20 * 24 * 60 * 60 * 1000), // 20 days from now
    contributorCount: 68,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop"
  },
  {
    title: "Solar-Powered Internet Cafes for Remote Areas",
    description: "Installing solar-powered internet access points in remote communities to bridge the digital divide and enable online education",
    category: "technology",
    creator: "0x5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e",
    goalAmount: "40000",
    pledgedAmount: "15000",
    state: 0, // Active
    deadline: Date.now() + (60 * 24 * 60 * 60 * 1000), // 60 days from now
    contributorCount: 23,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
  },
  {
    title: "Youth Mentorship Program Expansion",
    description: "Expanding our community mentorship program to help at-risk youth develop skills and career opportunities through professional guidance",
    category: "social-impact",
    creator: "0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
    goalAmount: "12000",
    pledgedAmount: "3200",
    state: 2, // Expired/Failed
    deadline: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
    contributorCount: 15,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop"
  },
  {
    title: "Urban Vertical Farm Initiative",
    description: "Creating vertical farming systems in urban areas to produce fresh food sustainably while reducing carbon footprint and transportation costs",
    category: "environment",
    creator: "0x0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    goalAmount: "75000",
    pledgedAmount: "67500",
    state: 0, // Active
    deadline: Date.now() + (15 * 24 * 60 * 60 * 1000), // 15 days from now
    contributorCount: 156,
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop"
  },
  {
    title: "Blockchain Education Platform for Universities",
    description: "Developing a comprehensive blockchain education curriculum and platform for universities to teach Web3 technologies and smart contract development",
    category: "education",
    creator: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    goalAmount: "30000",
    pledgedAmount: "22500",
    state: 0, // Active
    deadline: Date.now() + (40 * 24 * 60 * 60 * 1000), // 40 days from now
    contributorCount: 78,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"
  },
  {
    title: "Mental Health Support App for Students",
    description: "Creating a mental health support application specifically designed for students with AI-powered mood tracking and peer support networks",
    category: "health",
    creator: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    goalAmount: "18000",
    pledgedAmount: "9500",
    state: 0, // Active
    deadline: Date.now() + (25 * 24 * 60 * 60 * 1000), // 25 days from now
    contributorCount: 42,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
  },
  {
    title: "Open Source Music Production Suite",
    description: "Building a completely open-source digital audio workstation for musicians worldwide, with collaborative features and blockchain-based licensing",
    category: "arts",
    creator: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a",
    goalAmount: "60000",
    pledgedAmount: "38000",
    state: 0, // Active
    deadline: Date.now() + (50 * 24 * 60 * 60 * 1000), // 50 days from now
    contributorCount: 91,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
  },
  {
    title: "Green Energy Microfinance Platform",
    description: "Decentralized platform for microfinance focused on green energy projects in developing countries with transparent impact tracking",
    category: "business",
    creator: "0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b",
    goalAmount: "100000",
    pledgedAmount: "125000",
    state: 1, // Successful
    deadline: Date.now() - (15 * 24 * 60 * 60 * 1000), // 15 days ago
    contributorCount: 203,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop"
  }
];

// Generate mock campaign with realistic data
export function generateMockCampaign(index) {
  const mockData = MOCK_CAMPAIGN_DATA[index % MOCK_CAMPAIGN_DATA.length];
  const now = Date.now();
  const timeRemaining = Math.max(0, mockData.deadline - now);
  const progressPercentage = Math.min(100, (parseFloat(mockData.pledgedAmount) / parseFloat(mockData.goalAmount)) * 100);
  
  return {
    address: `0x${Math.random().toString(16).substr(2, 40)}`,
    creator: mockData.creator,
    goalAmount: mockData.goalAmount + '000000000000000000', // Convert to wei (18 decimals)
    pledgedAmount: mockData.pledgedAmount + '000000000000000000', // Convert to wei
    deadline: Math.floor(mockData.deadline / 1000), // Convert to seconds
    state: mockData.state,
    timeRemaining,
    progressPercentage: Math.round(progressPercentage),
    contributorCount: mockData.contributorCount,
    mockData: mockData
  };
}