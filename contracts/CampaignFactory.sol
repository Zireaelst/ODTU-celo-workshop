// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;
    address public constant CUSD_TOKEN = 0x765DE816845861e75A25fCA122bb6898B8B1282a; // Celo Mainnet cUSD
    
    mapping(address => address[]) public campaignsByCreator;
    mapping(address => bool) public isCampaign;
    
    event CampaignCreated(
        address indexed campaignAddress,
        address indexed creator,
        uint256 goalAmount,
        uint256 duration,
        uint256 deadline
    );
    
    function createCampaign(
        uint256 _goalAmount,
        uint256 _duration
    ) external returns (address) {
        require(_goalAmount > 0, "Goal amount must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        require(_duration <= 365 days, "Duration cannot exceed 1 year");
        
        Campaign newCampaign = new Campaign(
            msg.sender,
            _goalAmount,
            _duration,
            CUSD_TOKEN
        );
        
        address campaignAddress = address(newCampaign);
        
        deployedCampaigns.push(campaignAddress);
        campaignsByCreator[msg.sender].push(campaignAddress);
        isCampaign[campaignAddress] = true;
        
        emit CampaignCreated(
            campaignAddress,
            msg.sender,
            _goalAmount,
            _duration,
            block.timestamp + _duration
        );
        
        return campaignAddress;
    }
    
    function getDeployedCampaigns() external view returns (address[] memory) {
        return deployedCampaigns;
    }
    
    function getCampaignsByCreator(address _creator) external view returns (address[] memory) {
        return campaignsByCreator[_creator];
    }
    
    function getCampaignsCount() external view returns (uint256) {
        return deployedCampaigns.length;
    }
    
    function getCampaignsPaginated(
        uint256 _start,
        uint256 _limit
    ) external view returns (address[] memory) {
        require(_start < deployedCampaigns.length, "Start index out of bounds");
        
        uint256 end = _start + _limit;
        if (end > deployedCampaigns.length) {
            end = deployedCampaigns.length;
        }
        
        address[] memory paginatedCampaigns = new address[](end - _start);
        for (uint256 i = _start; i < end; i++) {
            paginatedCampaigns[i - _start] = deployedCampaigns[i];
        }
        
        return paginatedCampaigns;
    }
    
    function getActiveCampaigns() external view returns (address[] memory) {
        uint256 activeCount = 0;
        
        // First pass: count active campaigns
        for (uint256 i = 0; i < deployedCampaigns.length; i++) {
            Campaign campaign = Campaign(deployedCampaigns[i]);
            if (campaign.state() == Campaign.State.Active && 
                campaign.getTimeRemaining() > 0) {
                activeCount++;
            }
        }
        
        // Second pass: populate active campaigns array
        address[] memory activeCampaigns = new address[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < deployedCampaigns.length; i++) {
            Campaign campaign = Campaign(deployedCampaigns[i]);
            if (campaign.state() == Campaign.State.Active && 
                campaign.getTimeRemaining() > 0) {
                activeCampaigns[currentIndex] = deployedCampaigns[i];
                currentIndex++;
            }
        }
        
        return activeCampaigns;
    }
    
    function getCampaignDetails(address _campaignAddress) 
        external 
        view 
        returns (
            address creator,
            uint256 goalAmount,
            uint256 deadline,
            uint256 pledgedAmount,
            Campaign.State state,
            uint256 contributorCount,
            uint256 timeRemaining,
            uint256 progressPercentage
        ) 
    {
        require(isCampaign[_campaignAddress], "Invalid campaign address");
        
        Campaign campaign = Campaign(_campaignAddress);
        (creator, goalAmount, deadline, pledgedAmount, state,) = campaign.getCampaignInfo();
        contributorCount = campaign.getContributorCount();
        timeRemaining = campaign.getTimeRemaining();
        progressPercentage = campaign.getProgressPercentage();
    }
}