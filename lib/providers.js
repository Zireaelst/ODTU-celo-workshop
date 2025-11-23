'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { isMiniPay } from './minipay';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [celo], // Sadece Celo Mainnet
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'https://forno.celo.org',
        webSocket: 'wss://forno.celo.org/ws',
      }),
    }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'CeloImpact Crowdfunding',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }) {
  // MiniPay detection için bildirim
  const showMiniPayInfo = isMiniPay();
  
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains}
        theme={{
          lightMode: {
            fonts: {
              body: 'Inter, sans-serif',
            },
            colors: {
              accentColor: '#35D07F',
              accentColorForeground: '#ffffff',
              connectButtonBackground: '#35D07F',
              connectButtonText: '#ffffff',
            },
          },
        }}
        coolMode={true}
        showRecentTransactions={true}
        appInfo={{
          appName: 'CeloImpact - Decentralized Crowdfunding',
          disclaimer: ({ Link }) => (
            <div style={{ 
              color: '#64748B', 
              fontSize: '14px', 
              textAlign: 'center', 
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px'
            }}>
              {showMiniPayInfo && (
                <div style={{ 
                  color: '#35D07F', 
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  📱 MiniPay Detected! Perfect for Celo Mainnet transactions.
                </div>
              )}
              CeloImpact - Celo Mainnet üzerinde güvenli crowdfunding platformu.{' '}
              <Link href="https://celo.org" target="_blank" style={{ color: '#35D07F' }}>
                Celo hakkında bilgi alın
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