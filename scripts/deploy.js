// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("barToken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("barToken deployed to:", token.address);

  const Exchange = await hre.ethers.getContractFactory("barExchange");
  const barexchange = await Exchange.deploy();
  await barexchange.deployed();
  console.log('barExchange deployed to:', barexchange.address);

  // const accounts = await hre.ethers.getSigners();
  // const mintTokens = await token.connect(accounts[0]).mint('10000');
  // const getBalance = await token.balanceOf('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');
  // console.log(getBalance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
