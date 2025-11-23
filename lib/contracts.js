import { celo } from 'wagmi/chains';

export const chains = [celo]; // Sadece Celo Mainnet

export const contracts = {
  campaignFactory: {
    address: process.env.NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS,
    abi: [
      {
        "inputs": [
          {"internalType": "uint256", "name": "_goalAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "_duration", "type": "uint256"}
        ],
        "name": "createCampaign",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getDeployedCampaigns",
        "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "_creator", "type": "address"}],
        "name": "getCampaignsByCreator",
        "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getActiveCampaigns",
        "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "_campaignAddress", "type": "address"}],
        "name": "getCampaignDetails",
        "outputs": [
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "uint256", "name": "goalAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "deadline", "type": "uint256"},
          {"internalType": "uint256", "name": "pledgedAmount", "type": "uint256"},
          {"internalType": "enum Campaign.State", "name": "state", "type": "uint8"},
          {"internalType": "uint256", "name": "contributorCount", "type": "uint256"},
          {"internalType": "uint256", "name": "timeRemaining", "type": "uint256"},
          {"internalType": "uint256", "name": "progressPercentage", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  },
  campaign: {
    abi: [
      {
        "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
        "name": "contribute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "refund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCampaignInfo",
        "outputs": [
          {"internalType": "address", "name": "_creator", "type": "address"},
          {"internalType": "uint256", "name": "_goalAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "_deadline", "type": "uint256"},
          {"internalType": "uint256", "name": "_pledgedAmount", "type": "uint256"},
          {"internalType": "enum Campaign.State", "name": "_state", "type": "uint8"},
          {"internalType": "address", "name": "_tokenAddress", "type": "address"}
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "_contributor", "type": "address"}],
        "name": "getContribution",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getProgressPercentage",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTimeRemaining",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  },
  cUSD: {
    address: '0x765DE816845861e75A25fCA122bb6898B8B1282a', // Celo Mainnet cUSD
    abi: [
      {
        "inputs": [
          {"internalType": "address", "name": "spender", "type": "address"},
          {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {"internalType": "address", "name": "owner", "type": "address"},
          {"internalType": "address", "name": "spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  }
};

export const CAMPAIGN_STATES = {
  0: 'Active',
  1: 'Successful', 
  2: 'Expired'
};