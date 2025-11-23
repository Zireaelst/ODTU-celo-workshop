/**
 * Celo Network Configuration & Utilities
 * Testnet ve Mainnet arasında geçiş için
 */

export const CELO_NETWORKS = {
  ALFAJORES: {
    id: 44787,
    name: 'Celo Alfajores Testnet',
    network: 'celo-alfajores',
    nativeCurrency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://alfajores-forno.celo-testnet.org'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Celoscan',
        url: 'https://alfajores.celoscan.io',
      },
    },
    contracts: {
      cUSD: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      cEUR: '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F',
      cREAL: '0xE4D517785D091D3c54818832dB6094bcc2744545',
    },
    testnet: true,
    faucet: 'https://faucet.celo.org/alfajores',
  },
  
  MAINNET: {
    id: 42220,
    name: 'Celo Mainnet',
    network: 'celo',
    nativeCurrency: {
      name: 'Celo',
      symbol: 'CELO', 
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://forno.celo.org'],
        webSocket: ['wss://forno.celo.org/ws'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Celoscan',
        url: 'https://celoscan.io',
      },
    },
    contracts: {
      cUSD: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
      cEUR: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73',
      cREAL: '0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787',
    },
    testnet: false,
  },
};

// Hangi network kullanıyoruz?
export const getCurrentNetwork = () => {
  return CELO_NETWORKS.MAINNET; // Sadece Mainnet kullan
};

// cUSD adresi - Sadece Mainnet
export const getCUSDAddress = (chainId) => {
  return CELO_NETWORKS.MAINNET.contracts.cUSD; // Her zaman Mainnet cUSD
};

// Network geçiş utility'si
export const switchToCelo = async (targetNetwork = 'alfajores') => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Ethereum provider not found');
  }
  
  const network = targetNetwork === 'mainnet' 
    ? CELO_NETWORKS.MAINNET 
    : CELO_NETWORKS.ALFAJORES;
  
  try {
    // Network'ü değiştirmeyi dene
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${network.id.toString(16)}` }],
    });
  } catch (switchError) {
    // Network yoksa ekle
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${network.id.toString(16)}`,
              chainName: network.name,
              nativeCurrency: network.nativeCurrency,
              rpcUrls: network.rpcUrls.default.http,
              blockExplorerUrls: [network.blockExplorers.default.url],
            },
          ],
        });
      } catch (addError) {
        console.error('Network eklenemedi:', addError);
        throw addError;
      }
    } else {
      console.error('Network değiştirilemedi:', switchError);
      throw switchError;
    }
  }
};

// Network status component'i için
export const getNetworkInfo = (chainId) => {
  const network = Object.values(CELO_NETWORKS).find(n => n.id === chainId);
  
  if (!network) {
    return {
      isSupported: false,
      name: 'Unknown Network',
      isTestnet: false,
      needsSwitch: true,
    };
  }
  
  return {
    isSupported: true,
    name: network.name,
    isTestnet: network.testnet,
    needsSwitch: false,
    faucet: network.faucet,
    explorer: network.blockExplorers.default.url,
  };
};

// Development helper
export const logNetworkInfo = () => {
  const current = getCurrentNetwork();
  console.log('🌐 Current Celo Network:', current.name);
  console.log('💰 cUSD Address:', current.contracts.cUSD);
  console.log('🔗 RPC URL:', current.rpcUrls.default.http[0]);
  console.log('📊 Explorer:', current.blockExplorers.default.url);
  
  if (current.testnet) {
    console.log('🚰 Faucet:', current.faucet);
  }
};