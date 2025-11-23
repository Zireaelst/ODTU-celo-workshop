/**
 * Celo Composer Style Enhanced Provider
 * Celo ekosistemi için optimize edilmiş provider
 */

'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, walletConnectWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { isMiniPay, getMiniPayInfo } from './minipay';

// Gelişmiş Celo chain konfigürasyonu
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [celoAlfajores, celo], // Testnet önce (development için)
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const rpcUrls = {
          [celoAlfajores.id]: 'https://alfajores-forno.celo-testnet.org',
          [celo.id]: 'https://forno.celo.org',
        };
        
        return {
          http: rpcUrls[chain.id] || rpcUrls[celoAlfajores.id],
          webSocket: chain.id === celo.id ? 'wss://forno.celo.org/ws' : undefined,
        };
      },
    }),
    publicProvider(),
  ]
);

// MiniPay özel connector'ı (eğer varsa)
const miniPayWallet = () => ({
  id: 'minipay',
  name: 'MiniPay',
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMzNUQwN0YiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz4KPC9zdmc+CjxzdHlsZT4KICA8IVtDREFUQVsKICAgIC5zdDAge2ZpbGw6IHJnYig1MywgMjI5LCAxNjIpO30KICA+XQo8L3N0eWxlPgo8L3N2Zz4K',
  iconBackground: '#35D07F',
  installed: isMiniPay(),
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=org.celo.mobile.alfajores', 
    ios: 'https://apps.apple.com/app/alfajores-wallet/id1482389446',
    qrCode: 'https://celo.org/minipay',
  },
  
  createConnector: ({ chains: configuredChains, options }) => {
    return {
      id: 'minipay',
      name: 'MiniPay',
      type: 'injected',
      
      async connect() {
        if (!isMiniPay()) {
          throw new Error('MiniPay not detected');
        }
        
        const provider = window.ethereum;
        const accounts = await provider.request({
          method: 'eth_requestAccounts'
        });
        
        const account = accounts[0];
        const chainId = await provider.request({ method: 'eth_chainId' });
        
        return {
          account,
          chain: configuredChains.find(c => c.id === parseInt(chainId, 16)) || configuredChains[0],
          provider,
        };
      },
      
      async disconnect() {
        // MiniPay disconnect (usually not needed for mobile)
      },
      
      async getAccount() {
        if (!isMiniPay()) return null;
        
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });
        
        return accounts[0] || null;
      },
      
      async getChainId() {
        if (!isMiniPay()) return configuredChains[0].id;
        
        const chainId = await window.ethereum.request({ 
          method: 'eth_chainId' 
        });
        
        return parseInt(chainId, 16);
      },
      
      async isAuthorized() {
        if (!isMiniPay()) return false;
        
        const account = await this.getAccount();
        return !!account;
      },
      
      onAccountsChanged(accounts) {
        if (accounts.length === 0) {
          this.onDisconnect();
        } else {
          this.onConnect({ account: accounts[0] });
        }
      },
      
      onChainChanged(chainId) {
        const chain = configuredChains.find(c => c.id === parseInt(chainId, 16));
        if (chain) {
          this.onConnect({ chain });
        }
      },
      
      onDisconnect() {
        // Handle disconnect
      },
    };
  },
});

// Wallet'ları prioritye göre sırala
const walletList = [
  // Celo native wallet'ı önce
  ...(isMiniPay() ? [miniPayWallet] : []),
  
  // Sonra popüler wallet'lar
  metaMaskWallet({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo', chains }),
  walletConnectWallet({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo', chains }),
  coinbaseWallet({ appName: 'CeloImpact', chains }),
];

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended for Celo',
    wallets: walletList,
  },
]);

// Enhanced Wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// Celo teması
const celoTheme = {
  blurs: {
    modalOverlay: 'blur(4px)',
  },
  colors: {
    accentColor: '#35D07F',
    accentColorForeground: 'white',
    actionButtonBorder: 'rgba(53, 208, 127, 0.04)',
    actionButtonBorderMobile: 'rgba(53, 208, 127, 0.06)', 
    actionButtonSecondaryBackground: 'rgba(53, 208, 127, 0.04)',
    closeButton: 'rgba(60, 66, 66, 0.8)',
    closeButtonBackground: 'rgba(255, 255, 255, 0.08)',
    connectButtonBackground: '#35D07F',
    connectButtonBackgroundError: '#FF494A',
    connectButtonInnerBackground: 'linear-gradient(0deg, rgba(53, 208, 127, 0.03), rgba(53, 208, 127, 0.06))',
    connectButtonText: 'white',
    connectButtonTextError: 'white',
    connectionIndicator: '#30E000',
    downloadBottomCardBackground: 'linear-gradient(126deg, rgba(53, 208, 127, 0.4) 9.49%, rgba(251, 204, 92, 0.26) 71.04%), #FFFFFF',
    downloadTopCardBackground: 'linear-gradient(126deg, rgba(251, 204, 92, 0.4) 9.49%, rgba(53, 208, 127, 0.26) 71.04%), #FFFFFF',
    error: '#FF494A',
    generalBorder: 'rgba(255, 255, 255, 0.08)',
    generalBorderDim: 'rgba(255, 255, 255, 0.04)',
    menuItemBackground: 'rgba(60, 66, 66, 0.1)',
    modalBackdrop: 'rgba(0, 0, 0, 0.3)',
    modalBackground: 'white',
    modalBorder: 'rgba(255, 255, 255, 0.08)',
    modalText: '#1A202C',
    modalTextDim: 'rgba(60, 66, 66, 0.3)',
    modalTextSecondary: 'rgba(60, 66, 66, 0.6)',
    profileAction: 'rgba(255, 255, 255, 0.1)',
    profileActionHover: 'rgba(255, 255, 255, 0.2)',
    profileForeground: 'white',
    selectedOptionBorder: 'rgba(53, 208, 127, 0.2)',
    standby: '#FBCC5C',
  },
  fonts: {
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  radii: {
    actionButton: '12px',
    connectButton: '16px',
    menuButton: '12px',
    modal: '24px',
    modalMobile: '24px',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(53, 208, 127, 0.15)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
    selectedOption: '0px 2px 6px rgba(53, 208, 127, 0.24)',
    selectedWallet: '0px 2px 6px rgba(53, 208, 127, 0.12)',
    walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
  },
};

export function CeloEnhancedProviders({ children }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains}
        theme={{
          lightMode: celoTheme,
          darkMode: {
            ...celoTheme,
            colors: {
              ...celoTheme.colors,
              modalBackground: '#1A202C',
              modalText: 'white',
              modalTextSecondary: 'rgba(255, 255, 255, 0.6)',
            },
          },
        }}
        coolMode={true} // Fun Celo animations! 🎉
        showRecentTransactions={true}
        appInfo={{
          appName: 'CeloImpact',
          disclaimer: ({ Link }) => (
            <div style={{ color: '#64748B', fontSize: '14px', textAlign: 'center', marginTop: '16px' }}>
              CeloImpact projesi, Celo blockchain üzerinde güvenli crowdfunding sağlar.{' '}
              <Link href="https://celo.org" target="_blank">
                Celo hakkında daha fazla bilgi
              </Link>
            </div>
          ),
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export { chains as celoChains, wagmiConfig as celoWagmiConfig };