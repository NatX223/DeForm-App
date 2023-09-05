const hre = require("hardhat");

async function main() {
  // const table = await hre.ethers.deployContract("userTables", [80001]);

  // await table.waitForDeployment();

  // console.log(
  //   `deployed to ${table.target}`
  // );
  try {
    console.log("deploying...");
  const table = await hre.ethers.deployContract("userTables", [80001]);

  await table.waitForDeployment();

  console.log(
    `deployed to ${table.target}`
  );
  } catch (error) {
    console.error(error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
