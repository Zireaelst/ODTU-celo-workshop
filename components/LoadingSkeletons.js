// Loading skeleton components for better UX
export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-6">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-16 mb-2 animate-shimmer" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 animate-shimmer" />
          </div>
        ))}
      </div>

      {/* Controls Skeleton */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-full lg:w-80 animate-shimmer" />
        <div className="flex gap-2">
          <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-32 animate-shimmer" />
          <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-24 animate-shimmer" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-28 animate-shimmer" />
        ))}
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CampaignCardSkeleton key={i} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}

export function CampaignCardSkeleton({ delay = 0 }) {
  return (
    <div className="card overflow-hidden animate-pulse" style={{ animationDelay: `${delay}ms` }}>
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer">
        <div className="absolute top-4 right-4">
          <div className="w-20 h-6 bg-white/20 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="w-8 h-8 bg-white/20 rounded-full" />
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Creator */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer" />
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 animate-shimmer" />
        </div>
        
        {/* Goal and Progress */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 animate-shimmer" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 animate-shimmer" />
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full w-1/3 animate-shimmer" />
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mb-1 animate-shimmer" />
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-shimmer" />
          </div>
          <div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mb-1 animate-shimmer" />
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 animate-shimmer" />
          </div>
        </div>
        
        {/* Button */}
        <div className="pt-2">
          <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function WalletConnectionSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white animate-pulse">
      <div className="container-responsive py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl mx-auto animate-shimmer" />
          <div className="space-y-4">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-3/4 mx-auto animate-shimmer" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full animate-shimmer" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6 mx-auto animate-shimmer" />
          </div>
          <div className="space-y-3">
            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-full animate-shimmer" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 mx-auto animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40 animate-pulse">
      <div className="container-responsive">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer" />
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32 animate-shimmer" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 animate-shimmer" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 animate-shimmer" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-12 animate-shimmer" />
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-32 animate-shimmer" />
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-28 animate-shimmer" />
          </div>
        </div>
      </div>
    </header>
  );
}

export function EmptyStateSkeleton() {
  return (
    <div className="text-center py-12 animate-pulse">
      <div className="mobile-container mx-auto">
        <div className="card p-8 space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full mx-auto animate-shimmer" />
          <div className="space-y-4">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl w-3/4 mx-auto animate-shimmer" />
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full animate-shimmer" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 mx-auto animate-shimmer" />
            </div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 mx-auto animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md', color = 'celo-green' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    'celo-green': 'text-celo-green',
    'celo-gold': 'text-celo-gold',
    'white': 'text-white',
    'gray': 'text-gray-600'
  };

  return (
    <svg 
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}