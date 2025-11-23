'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { HeaderSkeleton, LoadingSpinner } from './LoadingSkeletons';
import CeloNetworkSwitcher from './CeloNetworkSwitcher';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-soft' 
        : 'bg-transparent'
    }`}>
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-celo-green to-celo-green-light rounded-xl flex items-center justify-center shadow-celo group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-celo-green to-celo-green-dark bg-clip-text text-transparent">
                CeloImpact
              </span>
              <div className="text-xs text-gray-500 font-medium">
                Decentralized Crowdfunding
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="btn-ghost text-sm font-medium">
              Campaigns
            </Link>
            <Link href="/create" className="btn-ghost text-sm font-medium">
              Create
            </Link>
            <Link href="/about" className="btn-ghost text-sm font-medium">
              About
            </Link>
          </nav>

          {/* Network & Connect */}
          <div className="flex items-center space-x-3">
            {/* Network Switcher */}
            {isConnected && (
              <div className="hidden lg:block">
                <CeloNetworkSwitcher />
              </div>
            )}
            
            {/* Connection Status */}
            {isConnected && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-celo-green/10 rounded-lg">
                <div className="w-2 h-2 bg-celo-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-celo-green-dark">Connected</span>
              </div>
            )}
            
            {/* Connect Button */}
            <div className="transform transition-transform hover:scale-105">
              <ConnectButton 
                chainStatus="icon"
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full',
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <nav className="flex items-center justify-center space-x-6">
            <Link href="/" className="btn-ghost text-sm">
              Campaigns
            </Link>
            <Link href="/create" className="btn-ghost text-sm">
              Create
            </Link>
            <Link href="/about" className="btn-ghost text-sm">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}