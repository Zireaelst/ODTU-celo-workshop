const { ethers } = require("hardhat");

async function main() {
  const networkName = hre.network.name;
  console.log(`🚀 Starting deployment to Celo ${networkName === 'celo' ? 'Mainnet' : networkName}...`);

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Check deployer balance
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "CELO");

  // Warning for mainnet
  if (networkName === 'celo') {
    console.log("\n⚠️  WARNING: Deploying to MAINNET with REAL funds!");
    console.log("⚠️  Make sure you have tested on testnet first!");
    console.log("⚠️  Press Ctrl+C to cancel or wait 10 seconds to continue...\n");
    await new Promise(resolve => setTimeout(resolve, 10000));
  }

  // Deploy CampaignFactory
  console.log("\n📦 Deploying CampaignFactory...");
  const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();

  console.log("✅ CampaignFactory deployed to:", campaignFactory.address);
  console.log("📋 Transaction hash:", campaignFactory.deployTransaction.hash);

  // Verify the cUSD token address is correct
  const cusdAddress = await campaignFactory.CUSD_TOKEN();
  console.log("📍 cUSD token address:", cusdAddress);
  
  if (networkName === 'celo') {
    console.log("🌍 Explorer link:", `https://celoscan.io/address/${campaignFactory.address}`);
  }
  
  console.log("✅ Deployment completed successfully!");

  // Save deployment information
  const deploymentInfo = {
    network: networkName === 'celo' ? 'mainnet' : networkName,
    campaignFactory: campaignFactory.address,
    cusdToken: cusdAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    transactionHash: campaignFactory.deployTransaction.hash,
    explorerUrl: networkName === 'celo' ? `https://celoscan.io/address/${campaignFactory.address}` : null,
  };

  console.log("\n📄 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  // Instructions for updating frontend
  console.log("\n🔧 Next Steps:");
  console.log("1. Copy the CampaignFactory address:", campaignFactory.address);
  console.log("2. Update your .env file with:");
  console.log(`   NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS=${campaignFactory.address}`);
  console.log("3. Verify the contract on Celoscan:");
  console.log(`   https://alfajores.celoscan.io/address/${campaignFactory.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });