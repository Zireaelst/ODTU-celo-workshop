// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Campaign is ReentrancyGuard {
    enum State { Active, Successful, Expired }
    
    address public creator;
    uint256 public goalAmount;
    uint256 public deadline;
    uint256 public pledgedAmount;
    State public state;
    IERC20 public token; // cUSD token
    
    mapping(address => uint256) public contributions;
    address[] public contributors;
    
    event ContributionMade(address indexed contributor, uint256 amount);
    event FundsWithdrawn(address indexed creator, uint256 amount);
    event RefundClaimed(address indexed contributor, uint256 amount);
    event CampaignStateChanged(State newState);
    
    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator can call this function");
        _;
    }
    
    modifier onlyActive() {
        require(state == State.Active, "Campaign is not active");
        _;
    }
    
    modifier campaignEnded() {
        require(block.timestamp > deadline, "Campaign has not ended yet");
        _;
    }
    
    constructor(
        address _creator,
        uint256 _goalAmount,
        uint256 _duration,
        address _tokenAddress
    ) {
        creator = _creator;
        goalAmount = _goalAmount;
        deadline = block.timestamp + _duration;
        token = IERC20(_tokenAddress);
        state = State.Active;
        pledgedAmount = 0;
    }
    
    function contribute(uint256 _amount) external onlyActive nonReentrant {
        require(_amount > 0, "Contribution must be greater than 0");
        require(block.timestamp <= deadline, "Campaign deadline has passed");
        
        // Transfer tokens from contributor to this contract
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );
        
        // Update contributor's balance
        if (contributions[msg.sender] == 0) {
            contributors.push(msg.sender);
        }
        contributions[msg.sender] += _amount;
        pledgedAmount += _amount;
        
        // Check if goal is reached
        if (pledgedAmount >= goalAmount) {
            state = State.Successful;
            emit CampaignStateChanged(State.Successful);
        }
        
        emit ContributionMade(msg.sender, _amount);
    }
    
    function withdraw() external onlyCreator nonReentrant {
        require(
            pledgedAmount >= goalAmount || block.timestamp > deadline,
            "Cannot withdraw yet"
        );
        
        if (pledgedAmount >= goalAmount) {
            state = State.Successful;
        } else {
            state = State.Expired;
        }
        
        require(state == State.Successful, "Campaign did not meet its goal");
        
        uint256 amount = pledgedAmount;
        pledgedAmount = 0;
        
        require(
            token.transfer(creator, amount),
            "Token transfer failed"
        );
        
        emit CampaignStateChanged(State.Successful);
        emit FundsWithdrawn(creator, amount);
    }
    
    function refund() external campaignEnded nonReentrant {
        require(pledgedAmount < goalAmount, "Campaign was successful, no refunds");
        require(contributions[msg.sender] > 0, "No contributions to refund");
        
        if (state == State.Active) {
            state = State.Expired;
            emit CampaignStateChanged(State.Expired);
        }
        
        uint256 amount = contributions[msg.sender];
        contributions[msg.sender] = 0;
        pledgedAmount -= amount;
        
        require(
            token.transfer(msg.sender, amount),
            "Token transfer failed"
        );
        
        emit RefundClaimed(msg.sender, amount);
    }
    
    function getCampaignInfo() external view returns (
        address _creator,
        uint256 _goalAmount,
        uint256 _deadline,
        uint256 _pledgedAmount,
        State _state,
        address _tokenAddress
    ) {
        return (
            creator,
            goalAmount,
            deadline,
            pledgedAmount,
            state,
            address(token)
        );
    }
    
    function getContributorCount() external view returns (uint256) {
        return contributors.length;
    }
    
    function getContribution(address _contributor) external view returns (uint256) {
        return contributions[_contributor];
    }
    
    function getTimeRemaining() external view returns (uint256) {
        if (block.timestamp >= deadline) {
            return 0;
        }
        return deadline - block.timestamp;
    }
    
    function getProgressPercentage() external view returns (uint256) {
        if (goalAmount == 0) {
            return 0;
        }
        return (pledgedAmount * 100) / goalAmount;
    }
}