const hre = require("hardhat");

async function main() {
  const Staking = await hre.ethers.getContractFactory("Staking")
  const staking = await Staking.deploy("0xd3106F16102e2AEF6AC5D3E371c121885aa4f82e");

  await staking.waitForDeployment()
  console.log("Contract address: ", await staking.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});