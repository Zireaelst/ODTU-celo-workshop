'use client';

import { Component } from 'react';
import Link from 'next/link';

// Main Error Boundary Component
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log to console for development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you might want to log this to a service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <DefaultErrorFallback 
          onRetry={this.handleRetry}
          onReload={this.handleReload}
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
        />
      );
    }

    return this.props.children;
  }
}

// Default Error Fallback UI
function DefaultErrorFallback({ onRetry, onReload, error, errorInfo, errorId }) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-8 shadow-xl">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Error Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>

          {/* Error Description */}
          <p className="text-lg text-gray-600 mb-6">
            We encountered an unexpected error. This has been logged and we'll look into it.
          </p>

          {/* Error ID (for support) */}
          {errorId && (
            <div className="bg-gray-100 rounded-lg p-3 mb-6">
              <p className="text-sm text-gray-600">
                <strong>Error ID:</strong> <code className="font-mono">{errorId}</code>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Please include this ID when reporting the issue
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={onRetry}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            
            <button
              onClick={onReload}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reload Page
            </button>

            <Link href="/" className="btn-ghost flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
          </div>

          {/* Development Error Details */}
          {isDev && error && (
            <details className="text-left bg-gray-50 rounded-lg p-4">
              <summary className="cursor-pointer font-semibold text-red-700 mb-2">
                🔍 Development Error Details (Click to expand)
              </summary>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900">Error Message:</h4>
                  <pre className="text-sm text-red-600 bg-red-50 p-2 rounded font-mono overflow-x-auto">
                    {error.toString()}
                  </pre>
                </div>
                {errorInfo && (
                  <div>
                    <h4 className="font-semibold text-gray-900">Stack Trace:</h4>
                    <pre className="text-xs text-gray-600 bg-gray-100 p-2 rounded font-mono overflow-x-auto max-h-40 overflow-y-auto">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          {/* Help Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
            <Link href="/faq" className="text-sm text-blue-600 hover:underline">
              📖 FAQ
            </Link>
            <Link href="/about" className="text-sm text-blue-600 hover:underline">
              ℹ️ About
            </Link>
            <a 
              href="https://github.com/celo-org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              🐛 Report Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Specific Error Boundaries for different components

// Campaign Error Boundary
export class CampaignErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Campaign Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="card p-6 text-center border-2 border-red-200 bg-red-50">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Campaign Error</h3>
          <p className="text-red-700 mb-4">
            Unable to load campaign data. This might be a network issue or the campaign may not exist.
          </p>
          <button onClick={this.handleRetry} className="btn-outline text-red-600 border-red-300 hover:bg-red-100">
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Dashboard Error Boundary
export class DashboardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <div className="card p-8 max-w-md mx-auto border-2 border-yellow-200 bg-yellow-50">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-yellow-900 mb-3">Dashboard Loading Error</h3>
            <p className="text-yellow-800 mb-6">
              We're having trouble loading the campaigns. This might be a network connectivity issue.
            </p>
            <div className="space-y-3">
              <button onClick={this.handleRetry} className="btn-primary w-full">
                Retry Loading
              </button>
              <Link href="/create" className="btn-outline w-full">
                Create Campaign Instead
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wallet Error Boundary
export class WalletErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Wallet Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-900 mb-1">Wallet Connection Error</h3>
              <p className="text-sm text-orange-800 mb-3">
                There was an issue connecting to your wallet or loading wallet data.
              </p>
              <div className="flex gap-2">
                <button onClick={this.handleRetry} className="btn-sm btn-outline border-orange-300 text-orange-700">
                  Retry
                </button>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn-sm btn-ghost text-orange-700"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for manually triggering error boundaries (for testing)
export function useErrorHandler() {
  return (error, errorInfo) => {
    throw new Error(error);
  };
}

export default ErrorBoundary;