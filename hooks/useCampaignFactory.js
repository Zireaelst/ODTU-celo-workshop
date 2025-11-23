import { useContractRead, useContractReads } from 'wagmi';
import { contracts } from '../lib/contracts';

export function useCampaignFactory() {
  // Get all deployed campaigns
  const { data: campaignAddresses, isLoading: campaignsLoading, refetch: refetchCampaigns } = useContractRead({
    address: contracts.campaignFactory.address,
    abi: contracts.campaignFactory.abi,
    functionName: 'getDeployedCampaigns',
    watch: true,
  });

  // Get active campaigns
  const { data: activeCampaignAddresses, isLoading: activeLoading } = useContractRead({
    address: contracts.campaignFactory.address,
    abi: contracts.campaignFactory.abi,
    functionName: 'getActiveCampaigns',
    watch: true,
  });

  return {
    campaignAddresses: campaignAddresses || [],
    activeCampaignAddresses: activeCampaignAddresses || [],
    isLoading: campaignsLoading || activeLoading,
    refetchCampaigns,
  };
}

export function useCampaignDetails(campaignAddresses) {
  // Get details for multiple campaigns
  const contracts_calls = (campaignAddresses || []).map((address) => ({
    address: contracts.campaignFactory.address,
    abi: contracts.campaignFactory.abi,
    functionName: 'getCampaignDetails',
    args: [address],
  }));

  const { data: campaignDetails, isLoading } = useContractReads({
    contracts: contracts_calls,
    watch: true,
    enabled: campaignAddresses && campaignAddresses.length > 0,
  });

  // Transform the data into a more usable format
  const formattedCampaigns = campaignAddresses?.map((address, index) => {
    const details = campaignDetails?.[index]?.result;
    if (!details) return null;

    const [creator, goalAmount, deadline, pledgedAmount, state, contributorCount, timeRemaining, progressPercentage] = details;

    return {
      address,
      creator,
      goalAmount,
      deadline,
      pledgedAmount,
      state,
      contributorCount,
      timeRemaining,
      progressPercentage,
    };
  }).filter(Boolean) || [];

  return {
    campaigns: formattedCampaigns,
    isLoading,
  };
}

export function useCampaignsByCreator(creatorAddress) {
  const { data: campaignAddresses, isLoading } = useContractRead({
    address: contracts.campaignFactory.address,
    abi: contracts.campaignFactory.abi,
    functionName: 'getCampaignsByCreator',
    args: [creatorAddress],
    enabled: !!creatorAddress,
    watch: true,
  });

  return {
    campaignAddresses: campaignAddresses || [],
    isLoading,
  };
}