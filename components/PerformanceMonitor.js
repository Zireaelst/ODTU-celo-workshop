'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '../lib/performance';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined') {
      // Import web-vitals dynamically to avoid SSR issues
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
      });
      
      // Performance observer for custom metrics
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              console.log('Navigation timing:', {
                domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
                loadComplete: entry.loadEventEnd - entry.loadEventStart,
                domInteractive: entry.domInteractive - entry.navigationStart,
                firstPaint: entry.fetchStart - entry.navigationStart
              });
            }
            
            if (entry.entryType === 'paint') {
              console.log(`${entry.name}: ${entry.startTime}ms`);
            }
            
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('LCP:', entry.startTime);
            }
          });
        });

        try {
          observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
        } catch (e) {
          // Some browsers might not support all entry types
          console.log('Performance observation not supported');
        }
      }
    }
  }, []);

  return null; // This component doesn't render anything
}