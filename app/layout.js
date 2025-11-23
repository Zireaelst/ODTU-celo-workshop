import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '../lib/providers';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'CeloImpact - Decentralized Crowdfunding',
  description: 'Create and fund campaigns on Celo blockchain with transparency and security',
  keywords: 'Celo, crowdfunding, blockchain, cUSD, decentralized, fundraising, DeFi',
  authors: [{ name: 'CeloImpact Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <Providers>
            <div className="min-h-screen bg-gradient-to-br from-celo-gray-50 via-white to-celo-gray-100">
              {/* Background Pattern */}
              <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
              
              {/* Header */}
              <ErrorBoundary>
                <Header />
              </ErrorBoundary>
              
              {/* Main Content */}
              <main className="relative z-10">
                <div className="container-responsive py-8">
                  <ErrorBoundary>
                    {children}
                  </ErrorBoundary>
                </div>
              </main>
              
              {/* Footer */}
              <ErrorBoundary>
                <Footer />
              </ErrorBoundary>
            </div>
            
            {/* Toast Notifications */}
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                className: 'animate-slide-up',
              style: {
                background: 'rgba(30, 41, 59, 0.95)',
                color: '#ffffff',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '14px',
                padding: '12px 16px',
              },
              success: {
                iconTheme: {
                  primary: '#35D07F',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}