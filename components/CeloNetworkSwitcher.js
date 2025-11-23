'use client';

import { useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { CELO_NETWORKS, getNetworkInfo, switchToCelo } from '../lib/celoNetworks';

export default function CeloNetworkSwitcher() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [isLoading, setIsLoading] = useState(false);
  
  const currentNetworkInfo = getNetworkInfo(chain?.id);
  
  const handleNetworkSwitch = async () => {
    setIsLoading(true);
    try {
      if (switchNetwork) {
        // Wagmi kullan - sadece mainnet
        switchNetwork(CELO_NETWORKS.MAINNET.id);
      } else {
        // Manual switch - sadece mainnet
        await switchToCelo('mainnet');
      }
    } catch (error) {
      console.error('Network switch failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!chain) {
    return (
      <div className="network-status connecting">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600">Connecting...</span>
        </div>
      </div>
    );
  }
  
  if (!currentNetworkInfo.isSupported) {
    return (
      <div className="network-status error">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-red-800">Unsupported Network</div>
            <div className="text-xs text-red-600">Please switch to Celo</div>
          </div>
          <button
            onClick={handleNetworkSwitch}
            disabled={isLoading}
            className="btn-secondary text-xs px-3 py-1"
          >
            Switch to Celo Mainnet
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="network-status supported">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-celo-green"></div>
          <div>
            <div className="text-sm font-medium text-gray-800">
              {currentNetworkInfo.name}
            </div>
            <div className="text-xs text-celo-green font-medium">
              Mainnet Active
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <a
            href={currentNetworkInfo.explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            title="View on Celoscan"
          >
            📊 Celoscan
          </a>
        </div>
      </div>
    </div>
  );
}