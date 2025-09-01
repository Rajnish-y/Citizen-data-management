const hre = require("hardhat");

async function main() {
  const CitizenData = await hre.ethers.getContractFactory("CitizenData");

  // Deploy contract
  const citizenData = await CitizenData.deploy();

  // In ethers v6, you wait for deployment like this:
  await citizenData.waitForDeployment();

  console.log("CitizenData deployed to:", await citizenData.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//CitizenData deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3