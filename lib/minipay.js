/**
 * MiniPay Integration for Celo
 * Özellikle mobil kullanıcılar için optimize edilmiş Celo wallet
 */

export const isMiniPay = () => {
  return typeof window !== 'undefined' && 
         window.ethereum && 
         window.ethereum.isMiniPay;
};

export const getMiniPayInfo = () => {
  if (!isMiniPay()) return null;
  
  return {
    name: 'MiniPay',
    icon: '📱',
    isInstalled: true,
    isMobile: true,
    supportsCelo: true
  };
};

export const connectMiniPay = async () => {
  if (!isMiniPay()) {
    throw new Error('MiniPay not detected');
  }
  
  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    
    return accounts[0];
  } catch (error) {
    console.error('MiniPay connection failed:', error);
    throw error;
  }
};

// MiniPay özel özellikleri
export const miniPayFeatures = {
  // MiniPay kullanıcı bilgilerini al
  getUserInfo: async () => {
    if (!isMiniPay()) return null;
    
    try {
      return await window.ethereum.request({
        method: 'eth_getAccounts'
      });
    } catch (error) {
      console.error('Failed to get MiniPay user info:', error);
      return null;
    }
  },
  
  // Celo optimizasyonları
  optimizeForCelo: () => {
    return {
      preferredCurrency: 'cUSD',
      gasOptimization: true,
      mobileFirst: true
    };
  }
};