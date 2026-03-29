// Deploy RoadCoin ERC-20 to Base (Coinbase L2)
// Uses CDP SDK for wallet management
// Gas cost: < $0.05 on Base

const { Coinbase, Wallet } = require("@coinbase/coinbase-sdk");

async function deploy() {
  console.log("🪙 Deploying RoadCoin (ROAD) to Base...\n");

  // Initialize CDP
  const coinbase = new Coinbase({
    apiKeyName: process.env.CDP_API_KEY_NAME,
    privateKey: process.env.CDP_PRIVATE_KEY,
  });

  // Create deployer wallet on Base
  console.log("Creating wallet on Base...");
  const wallet = await Wallet.create({ networkId: "base-mainnet" });
  console.log(`Wallet: ${wallet.getDefaultAddress()}`);

  // Fund wallet (needs a tiny amount of ETH for gas)
  console.log("Fund this wallet with ~0.001 ETH on Base for gas.");
  console.log(`Address: ${(await wallet.getDefaultAddress()).getId()}\n`);

  // Deploy contract
  // In production: compile with solc, deploy bytecode via CDP
  // For now: use the no-code deployer or hardhat

  console.log("Contract: RoadCoin.sol");
  console.log("Name: RoadCoin");
  console.log("Symbol: ROAD");
  console.log("Supply: 1,000,000,000");
  console.log("Network: Base (chain ID 8453)");
  console.log("Gas estimate: < $0.05\n");

  console.log("Deployment options:");
  console.log("1. CDP SDK: wallet.deployContract(RoadCoin.abi, RoadCoin.bytecode, [founderAddr, treasuryAddr])");
  console.log("2. No-code: https://www.smartcontracts.tools/token-generator/ (select Base network)");
  console.log("3. Hardhat: npx hardhat deploy --network base");
  console.log("\nAfter deployment:");
  console.log("- Set ROADCOIN_CONTRACT_ADDRESS in workers");
  console.log("- Verify on BaseScan");
  console.log("- Add to Coinbase asset listing");
}

deploy().catch(console.error);
