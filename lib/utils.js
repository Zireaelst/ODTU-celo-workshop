import { formatEther, parseEther } from 'viem';
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount, decimals = 18, displayDecimals = 2) => {
  try {
    const formatted = formatEther(BigInt(amount || 0));
    return Number(formatted).toFixed(displayDecimals);
  } catch (error) {
    return '0.00';
  }
};

export const parseCurrency = (amount) => {
  try {
    return parseEther(amount.toString());
  } catch (error) {
    return BigInt(0);
  }
};

export const formatTimeRemaining = (seconds) => {
  if (!seconds || seconds <= 0) return 'Expired';
  
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export const formatDate = (timestamp) => {
  try {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

export const truncateAddress = (address, startLength = 6, endLength = 4) => {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const getCampaignStatusColor = (state, timeRemaining) => {
  switch (state) {
    case 0: // Active
      return timeRemaining > 0 ? 'text-celo-green' : 'text-red-500';
    case 1: // Successful
      return 'text-celo-green';
    case 2: // Expired
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const getCampaignStatusText = (state, timeRemaining) => {
  switch (state) {
    case 0: // Active
      return timeRemaining > 0 ? 'Active' : 'Expired';
    case 1: // Successful
      return 'Successful';
    case 2: // Expired
      return 'Failed';
    default:
      return 'Unknown';
  }
};