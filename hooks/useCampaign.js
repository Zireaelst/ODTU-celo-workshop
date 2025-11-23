import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { contracts } from '../lib/contracts';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export function useCampaign(campaignAddress) {
  // Get campaign information
  const { data: campaignInfo, isLoading: infoLoading, refetch: refetchInfo } = useContractRead({
    address: campaignAddress,
    abi: contracts.campaign.abi,
    functionName: 'getCampaignInfo',
    enabled: !!campaignAddress,
    watch: true,
  });

  // Get progress percentage
  const { data: progressPercentage } = useContractRead({
    address: campaignAddress,
    abi: contracts.campaign.abi,
    functionName: 'getProgressPercentage',
    enabled: !!campaignAddress,
    watch: true,
  });

  // Get time remaining
  const { data: timeRemaining } = useContractRead({
    address: campaignAddress,
    abi: contracts.campaign.abi,
    functionName: 'getTimeRemaining',
    enabled: !!campaignAddress,
    watch: true,
  });

  return {
    campaignInfo,
    progressPercentage,
    timeRemaining,
    isLoading: infoLoading,
    refetch: refetchInfo,
  };
}

export function useContribute(campaignAddress, amount) {
  const { config } = usePrepareContractWrite({
    address: campaignAddress,
    abi: contracts.campaign.abi,
    functionName: 'contribute',
    args: [amount],
    enabled: !!campaignAddress && !!amount && amount > 0,
  });

  const { data, write, isLoading } = useContractWrite(config);

  const { isLoading: isTransactionLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Contribution successful!');
    }
  }, [isSuccess]);

  return {
    contribute: write,
    isLoading: isLoading || isTransactionLoading,
    isSuccess,
    data,
  };
}

export function useWithdraw(campaignAddress) {
  const { config } = usePrepareContractWrite({
    address: campaignAddress,
    abi: contracts.campaign.abi,
    functionName: 'withdraw',
    enabled: !!campaignAddress,
  });

  const { data, write, isLoading } = useContractWrite(config);

  const { isLoading: isTransactionLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Funds withdrawn successfully!');
    }
  }, [isSuccess]);

  return {
    withdraw: write,
    isLoading: isLoading || isTransactionLoading,
    isSuccess,
    data,
  };
}

export function useRefund(campaignAddress) {
  const { config } = usePrepareContractWrite({
    address: campaignAddress,
    abi: contracts.campaign.abi,
    functionName: 'refund',
    enabled: !!campaignAddress,
  });

  const { data, write, isLoading } = useContractWrite(config);

  const { isLoading: isTransactionLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Refund claimed successfully!');
    }
  }, [isSuccess]);

  return {
    refund: write,
    isLoading: isLoading || isTransactionLoading,
    isSuccess,
    data,
  };
}

export function useContribution(campaignAddress, userAddress) {
  const { data: contribution, isLoading } = useContractRead({
    address: campaignAddress,
    abi: contracts.campaign.abi,
    functionName: 'getContribution',
    args: [userAddress],
    enabled: !!campaignAddress && !!userAddress,
    watch: true,
  });

  return {
    contribution: contribution || 0n,
    isLoading,
  };
}