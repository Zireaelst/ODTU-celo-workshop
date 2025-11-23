# 🌐 Celo Mainnet Configuration Guide

## ✅ Completed Mainnet Migration

Your CeloImpact project has been successfully configured for **Celo Mainnet only**.

### 🔗 Network Configuration

- **Network**: Celo Mainnet (42220)
- **RPC URL**: https://forno.celo.org  
- **WebSocket**: wss://forno.celo.org/ws
- **Explorer**: https://celoscan.io
- **cUSD Token**: `0x765DE816845861e75A25fCA122bb6898B8B1282a`

### 📂 Updated Files

1. **lib/providers.js** - RainbowKit mainnet-only configuration
2. **lib/contracts.js** - Mainnet cUSD address
3. **contracts/CampaignFactory.sol** - Mainnet cUSD token address
4. **hardhat.config.js** - Celo mainnet network settings
5. **scripts/deploy.js** - Mainnet deployment script with safety checks
6. **components/CeloNetworkSwitcher.js** - Mainnet-focused UI
7. **lib/celoNetworks.js** - Mainnet utilities
8. **package.json** - Deploy command updated
9. **README.md** - Documentation updated

### 🚀 Deployment Instructions

1. **Setup Environment Variables**:
   ```bash
   cp .env.mainnet.example .env
   # Edit .env with your real values
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Compile Contracts**:
   ```bash
   npm run compile
   ```

4. **Deploy to Mainnet** (⚠️ Use real funds):
   ```bash
   npm run deploy
   ```

5. **Update Frontend Configuration**:
   - Add deployed factory address to .env
   - Update NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS

6. **Build and Deploy Frontend**:
   ```bash
   npm run build
   npm start
   ```

### 💰 Required for Deployment

- **CELO tokens** for gas fees (minimum ~0.01 CELO)
- **Valid mnemonic phrase** with funded account
- **WalletConnect Project ID** from cloud.walletconnect.com

### 🔒 Security Checklist

- [ ] ✅ Testnet testing completed
- [ ] ⚠️  Mnemonic phrase is secure and backed up
- [ ] ⚠️  Environment variables are not committed to git
- [ ] ⚠️  Contract code has been audited (if handling significant funds)
- [ ] ✅ Factory pattern prevents individual contract vulnerabilities
- [ ] ✅ OpenZeppelin security patterns implemented

### 🎯 Supported Wallets on Mainnet

- ✅ **MetaMask** - Most popular
- ✅ **MiniPay** - Celo native mobile wallet
- ✅ **WalletConnect** - Mobile wallets
- ✅ **Coinbase Wallet**
- ✅ **Valora** - Celo ecosystem wallet

### 📊 Mainnet Benefits

1. **Real Value**: Actual cUSD transactions
2. **Production Ready**: Live user interactions
3. **Lower Fees**: Celo's efficient consensus
4. **Global Reach**: Accessible worldwide
5. **Mobile First**: MiniPay integration

### ⚠️ Important Notes

- **No Testnet Fallback**: Alfajores support completely removed
- **Real Funds**: All transactions use actual cUSD
- **Gas Costs**: Real CELO required for transactions
- **Irreversible**: Mainnet transactions are permanent
- **Security Critical**: Proper key management essential

### 🆘 Emergency Procedures

If issues arise:

1. **Contract Issues**: Factory pattern isolates problems to individual campaigns
2. **Frontend Issues**: Static build can be redeployed without affecting contracts
3. **Network Issues**: Multiple RPC endpoints available via providers
4. **Wallet Issues**: Multiple wallet options supported

### 📈 Next Steps

1. Deploy and verify contracts work correctly
2. Test with small amounts first
3. Monitor gas usage and optimize if needed
4. Consider implementing additional security features
5. Plan for user onboarding and support

---

**🎉 Your CeloImpact platform is now ready for Celo Mainnet!**

For any issues, refer to:
- [Celo Documentation](https://docs.celo.org)
- [Celoscan Explorer](https://celoscan.io)
- [Celo Discord](https://discord.gg/celo)