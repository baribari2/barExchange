const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("barToken", function () {

  it("Should return balance of contract deployer", async function () {
    const [owner] = await ethers.getSigners();
  
    const barToken = await ethers.getContractFactory("barToken");
    const bartoken = await barToken.deploy();
    await bartoken.deployed();
    const mintTokens = await bartoken.connect(owner).mint('10000');
    await mintTokens.wait();
    
    const balance = await bartoken.balanceOf(owner.address );
    console.log(ethers.utils.formatEther(balance));
  });
});
