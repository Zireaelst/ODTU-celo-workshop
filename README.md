# CeloImpact: Decentralized Crowdfunding Platform

![CeloImpact](https://img.shields.io/badge/Celo-Alfajores-35D07F?style=for-the-badge&logo=celo&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-2.19-yellow?style=for-the-badge&logo=hardhat&logoColor=white)

A decentralized crowdfunding platform built on **Celo Alfajores Testnet** using **Celo Composer** and **Composer Kit**. Create fundraising campaigns, donate cUSD to causes you care about, and ensure transparency through smart contracts.

## 🌟 Features

- **Create Campaigns**: Launch fundraising campaigns with transparent goals and deadlines
- **Support Causes**: Contribute cUSD tokens to campaigns you believe in
- **Smart Contract Security**: Automated fund management with transparent withdrawal/refund logic
- **Mobile-First Design**: Optimized for MiniPay and mobile wallets
- **Real-time Updates**: Live campaign progress tracking
- **Factory Pattern**: Efficient campaign deployment and management

## 🏗️ Architecture

### Smart Contracts
- **Campaign.sol**: Individual campaign contract with contribute/withdraw/refund functionality
- **CampaignFactory.sol**: Factory contract for deploying and tracking campaigns
- **OpenZeppelin Integration**: Using IERC20 and ReentrancyGuard for security

### Frontend
- **Next.js 14**: React framework with App Router
- **Wagmi + Viem**: Type-safe Ethereum interactions
- **RainbowKit**: Wallet connection with Celo support
- **Tailwind CSS**: Mobile-first responsive design
- **React Hot Toast**: User feedback and notifications

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- A Celo wallet (like Valora or MetaMask with Celo network)
- Some Alfajores CELO for gas fees ([Get from faucet](https://faucet.celo.org/alfajores))
- cUSD tokens for testing ([Get from faucet](https://faucet.celo.org/alfajores))

### 1. Clone and Install

```bash
git clone <your-repo>
cd ODTU-celo-workshop
npm install
```

### 2. Environment Setup

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
# Your 12-word mnemonic for deployment
MNEMONIC="your twelve word mnemonic phrase here for alfajores deployment"

# Get from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id"

# Will be filled after deployment
NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS=""
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Deploy to Alfajores

```bash
npm run deploy
```

After deployment, copy the **CampaignFactory address** from the output and add it to your `.env` file:

```env
NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS="0x..."
```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your dApp!

## 📱 Usage Guide

### For Campaign Creators

1. **Connect Wallet**: Use MetaMask, Valora, or any Celo-compatible wallet
2. **Create Campaign**: Click "Create Campaign" and fill in:
   - Goal amount in cUSD
   - Duration in days (1-365)
3. **Monitor Progress**: Track contributions and timeline
4. **Withdraw Funds**: Available when goal is reached before deadline

### For Contributors

1. **Browse Campaigns**: View all active campaigns on the dashboard
2. **Select Campaign**: Click on any campaign card for details
3. **Contribute**: 
   - Enter cUSD amount
   - Approve token spending (first time only)
   - Confirm contribution
4. **Track Impact**: See your contribution and campaign progress

### For All Users

- **Refunds**: Automatic refund eligibility if campaign fails to reach goal
- **Transparency**: All transactions are visible on [Celoscan](https://alfajores.celoscan.io/)
- **Real-time Updates**: Campaign status updates automatically

## 🔧 Development

### Project Structure

```
├── contracts/           # Solidity smart contracts
├── scripts/            # Deployment scripts
├── test/              # Contract tests
├── app/               # Next.js App Router pages
├── components/        # React components
├── hooks/             # Custom React hooks for Web3
├── lib/               # Utilities and configurations
└── hardhat.config.js  # Hardhat configuration
```

### Key Components

- **Dashboard.js**: Main campaign listing with filters
- **CampaignCard.js**: Individual campaign preview cards
- **CreateCampaignModal.js**: Campaign creation form
- **CampaignDetail**: Detailed campaign view with actions

### Custom Hooks

- **useCampaignFactory**: Factory contract interactions
- **useCampaign**: Individual campaign data and actions
- **useToken**: cUSD token operations (balance, approval, transfers)

### Testing

```bash
# Run contract tests
npm test

# Test on local Hardhat network
npx hardhat node
# In another terminal:
npm run deploy -- --network localhost
```

## 🔒 Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Input Validation**: Comprehensive parameter checking
- **State Management**: Campaign states (Active, Successful, Expired)
- **Access Controls**: Creator-only withdrawals
- **Automated Refunds**: Time-based refund eligibility

## 🌍 Celo Integration

### Why Celo?

- **Mobile-First**: Optimized for mobile wallets like MiniPay
- **Stable Tokens**: Using cUSD for price stability
- **Low Fees**: Minimal transaction costs
- **Fast Finality**: Quick transaction confirmation
- **Carbon Negative**: Environmentally sustainable blockchain

### Celo Mainnet

- **cUSD Token**: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- **Explorer**: [https://celoscan.io/](https://celoscan.io/)
- **RPC**: `https://forno.celo.org`
- **WebSocket**: `wss://forno.celo.org/ws`

## 🎯 Future Enhancements

- [ ] Campaign categories and tagging
- [ ] Campaign updates and progress posts
- [ ] Social media integration
- [ ] Multi-token support (cEUR, CELO)
- [ ] Campaign verification system
- [ ] Advanced analytics dashboard
- [ ] Push notifications
- [ ] Campaign sharing and referrals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Celo Foundation** for the amazing blockchain platform
- **OpenZeppelin** for secure smart contract libraries
- **Wagmi Team** for excellent Web3 React hooks
- **Vercel** for seamless deployment platform

## 📞 Support

- 📧 Email: support@celoimpact.com
- 💬 Discord: [Join our community](https://discord.gg/celo)
- 🐦 Twitter: [@CeloImpact](https://twitter.com/celoimpact)
- 📖 Documentation: [docs.celoimpact.com](https://docs.celoimpact.com)

---

**Built with ❤️ for the Celo ecosystem**

**Make an impact. Fund the future. 🌱**