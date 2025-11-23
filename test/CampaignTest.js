const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaignFactory and Campaign", function () {
  let campaignFactory;
  let campaign;
  let mockToken;
  let owner;
  let creator;
  let contributor1;
  let contributor2;

  const GOAL_AMOUNT = ethers.utils.parseEther("1000"); // 1000 cUSD
  const DURATION = 30 * 24 * 60 * 60; // 30 days in seconds
  const CONTRIBUTION_AMOUNT = ethers.utils.parseEther("100"); // 100 cUSD

  beforeEach(async function () {
    [owner, creator, contributor1, contributor2] = await ethers.getSigners();

    // Deploy a mock ERC20 token for testing
    const MockToken = await ethers.getContractFactory("MockERC20");
    mockToken = await MockToken.deploy("Test cUSD", "cUSD", ethers.utils.parseEther("1000000"));

    // Deploy CampaignFactory
    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    campaignFactory = await CampaignFactory.deploy();

    // Mint tokens to contributors
    await mockToken.mint(contributor1.address, ethers.utils.parseEther("10000"));
    await mockToken.mint(contributor2.address, ethers.utils.parseEther("10000"));
  });

  describe("CampaignFactory", function () {
    it("Should create a new campaign", async function () {
      const tx = await campaignFactory.connect(creator).createCampaign(GOAL_AMOUNT, DURATION);
      const receipt = await tx.wait();

      const campaigns = await campaignFactory.getDeployedCampaigns();
      expect(campaigns.length).to.equal(1);

      const campaignAddress = campaigns[0];
      campaign = await ethers.getContractAt("Campaign", campaignAddress);

      const [campaignCreator, goalAmount, , , ,] = await campaign.getCampaignInfo();
      expect(campaignCreator).to.equal(creator.address);
      expect(goalAmount).to.equal(GOAL_AMOUNT);
    });

    it("Should track campaigns by creator", async function () {
      await campaignFactory.connect(creator).createCampaign(GOAL_AMOUNT, DURATION);
      await campaignFactory.connect(creator).createCampaign(GOAL_AMOUNT.div(2), DURATION);

      const creatorCampaigns = await campaignFactory.getCampaignsByCreator(creator.address);
      expect(creatorCampaigns.length).to.equal(2);
    });

    it("Should reject invalid campaign parameters", async function () {
      await expect(
        campaignFactory.connect(creator).createCampaign(0, DURATION)
      ).to.be.revertedWith("Goal amount must be greater than 0");

      await expect(
        campaignFactory.connect(creator).createCampaign(GOAL_AMOUNT, 0)
      ).to.be.revertedWith("Duration must be greater than 0");
    });
  });

  describe("Campaign", function () {
    beforeEach(async function () {
      // Create a campaign for testing
      await campaignFactory.connect(creator).createCampaign(GOAL_AMOUNT, DURATION);
      const campaigns = await campaignFactory.getDeployedCampaigns();
      const campaignAddress = campaigns[0];
      campaign = await ethers.getContractAt("Campaign", campaignAddress);
    });

    it("Should allow contributions", async function () {
      await mockToken.connect(contributor1).approve(campaign.address, CONTRIBUTION_AMOUNT);
      await campaign.connect(contributor1).contribute(CONTRIBUTION_AMOUNT);

      const contribution = await campaign.getContribution(contributor1.address);
      expect(contribution).to.equal(CONTRIBUTION_AMOUNT);

      const pledgedAmount = await campaign.pledgedAmount();
      expect(pledgedAmount).to.equal(CONTRIBUTION_AMOUNT);
    });

    it("Should allow creator to withdraw when goal is met", async function () {
      // Multiple contributions to meet the goal
      await mockToken.connect(contributor1).approve(campaign.address, GOAL_AMOUNT);
      await campaign.connect(contributor1).contribute(GOAL_AMOUNT);

      const initialBalance = await mockToken.balanceOf(creator.address);
      await campaign.connect(creator).withdraw();
      const finalBalance = await mockToken.balanceOf(creator.address);

      expect(finalBalance.sub(initialBalance)).to.equal(GOAL_AMOUNT);
    });

    it("Should allow refunds when campaign expires without meeting goal", async function () {
      await mockToken.connect(contributor1).approve(campaign.address, CONTRIBUTION_AMOUNT);
      await campaign.connect(contributor1).contribute(CONTRIBUTION_AMOUNT);

      // Fast forward time past deadline
      await ethers.provider.send("evm_increaseTime", [DURATION + 1]);
      await ethers.provider.send("evm_mine");

      const initialBalance = await mockToken.balanceOf(contributor1.address);
      await campaign.connect(contributor1).refund();
      const finalBalance = await mockToken.balanceOf(contributor1.address);

      expect(finalBalance.sub(initialBalance)).to.equal(CONTRIBUTION_AMOUNT);
    });

    it("Should calculate progress percentage correctly", async function () {
      await mockToken.connect(contributor1).approve(campaign.address, CONTRIBUTION_AMOUNT);
      await campaign.connect(contributor1).contribute(CONTRIBUTION_AMOUNT);

      const progress = await campaign.getProgressPercentage();
      const expectedProgress = CONTRIBUTION_AMOUNT.mul(100).div(GOAL_AMOUNT);
      expect(progress).to.equal(expectedProgress);
    });
  });
});