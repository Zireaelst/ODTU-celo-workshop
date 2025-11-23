// Performance optimization utilities
import dynamic from 'next/dynamic';
import { memo } from 'react';

// Lazy loaded components with loading fallbacks
export const DynamicShareButton = dynamic(
  () => import('../components/ShareButton'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 rounded-lg h-10 w-24"></div>
    ),
    ssr: false // Share buttons don't need SSR
  }
);

export const DynamicErrorBoundary = dynamic(
  () => import('../components/ErrorBoundary').then(mod => ({ default: mod.CampaignErrorBoundary })),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-100 rounded-lg h-64"></div>
    )
  }
);

// Memoized components for better re-render performance
export const MemoizedCampaignCard = memo(function CampaignCard(props) {
  // Import the actual component dynamically
  const Component = dynamic(() => import('../components/CampaignCard'), {
    loading: () => (
      <div className="card animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-xl"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  });
  
  return <Component {...props} />;
});

// Image optimization component
export const OptimizedImage = memo(function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false 
}) {
  const Image = dynamic(() => import('next/image'), {
    loading: () => (
      <div className={`bg-gray-200 animate-pulse ${className}`} style={{ width, height }} />
    )
  });
  
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      quality={75}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
});

// Virtualized list for large datasets
export const VirtualizedCampaignList = memo(function VirtualizedCampaignList({ 
  campaigns, 
  itemHeight = 400,
  containerHeight = 800 
}) {
  const { useState, useEffect, useMemo } = require('react');
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  
  const itemsPerPage = Math.ceil(containerHeight / itemHeight);
  
  const visibleItems = useMemo(() => {
    const start = Math.max(0, startIndex - 2); // Buffer items
    const end = Math.min(campaigns.length, endIndex + 2);
    return campaigns.slice(start, end);
  }, [campaigns, startIndex, endIndex]);
  
  useEffect(() => {
    setEndIndex(Math.min(itemsPerPage, campaigns.length));
  }, [campaigns.length, itemsPerPage]);
  
  const handleScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + itemsPerPage;
    
    setStartIndex(newStartIndex);
    setEndIndex(Math.min(newEndIndex, campaigns.length));
  };
  
  return (
    <div 
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: campaigns.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((campaign, index) => (
          <div
            key={campaign.address}
            style={{
              position: 'absolute',
              top: (startIndex + index - 2) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            <MemoizedCampaignCard campaign={campaign} index={startIndex + index} />
          </div>
        ))}
      </div>
    </div>
  );
});

// Debounced search hook for performance
export function useDebounce(value, delay) {
  const { useState, useEffect } = require('react');
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(options = {}) {
  const { useState, useRef, useEffect } = require('react');
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting];
}

// Bundle size analytics
export function getBundleStats() {
  if (typeof window !== 'undefined' && window.__NEXT_DATA__) {
    const buildId = window.__NEXT_DATA__.buildId;
    const page = window.__NEXT_DATA__.page;
    
    return {
      buildId,
      page,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }
  return null;
}

// Performance monitoring
export function measurePerformance(name, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  
  // Report to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name,
      value: Math.round(end - start)
    });
  }
  
  return result;
}

// Web Vitals monitoring
export function reportWebVitals(metric) {
  console.log(metric);
  
  // Report to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

export default {
  DynamicShareButton,
  DynamicErrorBoundary,
  MemoizedCampaignCard,
  OptimizedImage,
  VirtualizedCampaignList,
  useDebounce,
  useIntersectionObserver,
  getBundleStats,
  measurePerformance,
  reportWebVitals
};