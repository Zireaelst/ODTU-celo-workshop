/**
 * Enhanced Celo Wallet Provider
 * RainbowKit'e ek Celo özelleştirilmiş wallet desteği
 */

'use client';

import { createConfig } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { isMiniPay } from './minipay';

// Celo özelleştirilmiş chain konfigürasyonu
export const celoChains = [
  {
    ...celoAlfajores,
    name: 'Celo Alfajores Testnet',
    nativeCurrency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://alfajores-forno.celo-testnet.org'],
      },
      public: {
        http: ['https://alfajores-forno.celo-testnet.org'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Celoscan',
        url: 'https://alfajores.celoscan.io',
      },
    },
    testnet: true,
  },
  {
    ...celo,
    name: 'Celo Mainnet',
    nativeCurrency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://forno.celo.org'],
      },
      public: {
        http: ['https://forno.celo.org'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Celoscan',
        url: 'https://celoscan.io',
      },
    },
  },
];

// MiniPay connector (özel)
export const miniPayConnector = {
  id: 'minipay',
  name: 'MiniPay',
  type: 'injected',
  icon: '📱',
  
  async connect() {
    if (!isMiniPay()) {
      throw new Error('MiniPay not detected. Please use MiniPay browser.');
    }
    
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    
    return {
      account: accounts[0],
      chain: celoAlfajores,
    };
  },
  
  async disconnect() {
    // MiniPay disconnect logic
  },
  
  async getAccount() {
    if (!isMiniPay()) return null;
    
    const accounts = await window.ethereum.request({
      method: 'eth_accounts'
    });
    
    return accounts[0] || null;
  },
  
  async isAuthorized() {
    if (!isMiniPay()) return false;
    
    const account = await this.getAccount();
    return !!account;
  },
};

// Gelişmiş Celo wallet konfigürasyonu
export const createCeloWalletConfig = (projectId) => {
  const { connectors } = getDefaultWallets({
    appName: 'CeloImpact - Decentralized Crowdfunding',
    projectId: projectId || 'demo',
    chains: celoChains,
  });

  // MiniPay varsa connector'lara ekle
  const allConnectors = isMiniPay() 
    ? [...connectors, miniPayConnector]
    : connectors;

  return createConfig({
    autoConnect: true,
    connectors: allConnectors,
  });
};

// Celo özel utilities
export const celoUtils = {
  // cUSD token adresi (Alfajores)
  CUSD_ADDRESS_ALFAJORES: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
  
  // cUSD token adresi (Mainnet)
  CUSD_ADDRESS_MAINNET: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
  
  // Hangi network'de olduğumuzu kontrol et
  getCUSDAddress: (chainId) => {
    switch (chainId) {
      case celoAlfajores.id:
        return celoUtils.CUSD_ADDRESS_ALFAJORES;
      case celo.id:
        return celoUtils.CUSD_ADDRESS_MAINNET;
      default:
        return celoUtils.CUSD_ADDRESS_ALFAJORES; // Default testnet
    }
  },
  
  // Gas optimizasyonları
  getGasSettings: (chainId) => ({
    gasPrice: chainId === celoAlfajores.id ? '500000000' : '1000000000', // 0.5 Gwei testnet, 1 Gwei mainnet
    gasLimit: '500000',
  }),
  
  // Celo specific transaction options
  getTxOptions: (chainId) => ({
    ...celoUtils.getGasSettings(chainId),
    // Celo'da fee currency olarak cUSD kullanabiliriz
    feeCurrency: celoUtils.getCUSDAddress(chainId),
  }),
};