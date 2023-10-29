const hre = require("hardhat");

async function main() {
  const Staking = await hre.ethers.getContractFactory("Staking")
  const staking = await Staking.deploy("86400", {value: ethers.parseEther("1")});

  await staking.waitForDeployment()
  console.log("Contract address: ", await staking.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});