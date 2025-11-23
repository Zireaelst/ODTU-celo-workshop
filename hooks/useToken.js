import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { contracts } from '../lib/contracts';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function useCUSDBalance(userAddress) {
  const { data: balance, isLoading, refetch } = useContractRead({
    address: contracts.cUSD.address,
    abi: contracts.cUSD.abi,
    functionName: 'balanceOf',
    args: [userAddress],
    enabled: !!userAddress,
    watch: true,
  });

  return {
    balance: balance || 0n,
    isLoading,
    refetch,
  };
}

export function useCUSDAllowance(userAddress, spenderAddress) {
  const { data: allowance, isLoading, refetch } = useContractRead({
    address: contracts.cUSD.address,
    abi: contracts.cUSD.abi,
    functionName: 'allowance',
    args: [userAddress, spenderAddress],
    enabled: !!userAddress && !!spenderAddress,
    watch: true,
  });

  return {
    allowance: allowance || 0n,
    isLoading,
    refetch,
  };
}

export function useApproveCUSD(spenderAddress, amount) {
  const { config } = usePrepareContractWrite({
    address: contracts.cUSD.address,
    abi: contracts.cUSD.abi,
    functionName: 'approve',
    args: [spenderAddress, amount],
    enabled: !!spenderAddress && !!amount && amount > 0,
  });

  const { data, write, isLoading } = useContractWrite(config);

  const { isLoading: isTransactionLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('cUSD approval successful!');
    }
    if (isError) {
      toast.error('Approval failed. Please try again.');
    }
  }, [isSuccess, isError]);

  return {
    approve: write,
    isLoading: isLoading || isTransactionLoading,
    isSuccess,
    isError,
    data,
  };
}

export function useCreateCampaign(goalAmount, duration) {
  const { config } = usePrepareContractWrite({
    address: contracts.campaignFactory.address,
    abi: contracts.campaignFactory.abi,
    functionName: 'createCampaign',
    args: [goalAmount, duration],
    enabled: !!goalAmount && !!duration && goalAmount > 0 && duration > 0,
  });

  const { data, write, isLoading } = useContractWrite(config);

  const { isLoading: isTransactionLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Campaign created successfully!');
    }
    if (isError) {
      toast.error('Failed to create campaign. Please try again.');
    }
  }, [isSuccess, isError]);

  return {
    createCampaign: write,
    isLoading: isLoading || isTransactionLoading,
    isSuccess,
    isError,
    data,
  };
}