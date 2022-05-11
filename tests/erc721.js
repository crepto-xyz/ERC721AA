const { ethers } = require("hardhat");
const { expect } = require("chai");

let erc721;
let deployer;
let user;

describe("ERC721 NFT", () => {
  before(async () => {
    [deployer, user] = await ethers.getSigners();
    erc721 = await (await ethers.getContractFactory("TestERC721")).deploy();
  });

  it("Should get contract address after deploy", async () => {
    expect(erc721.address).not.equal("");
  });

  it("Should console log gas cost if mint 1/2/3/4/5", async () => {
    const mintOne = await (await erc721.mintTest(1)).wait();
    console.log(
      `Mint 1 nft gas cost: ${ethers.utils.formatUnits(mintOne.gasUsed, 0)}`
    );

    const mintTwo = await (await erc721.mintTest(2)).wait();
    console.log(
      `Mint 2 nft gas cost: ${ethers.utils.formatUnits(mintTwo.gasUsed, 0)}`
    );

    const mintThree = await (await erc721.mintTest(3)).wait();
    console.log(
      `Mint 3 nft gas cost: ${ethers.utils.formatUnits(mintThree.gasUsed, 0)}`
    );

    const mintFour = await (await erc721.mintTest(4)).wait();
    console.log(
      `Mint 4 nft gas cost: ${ethers.utils.formatUnits(mintFour.gasUsed, 0)}`
    );

    const mintFive = await (await erc721.mintTest(5)).wait();
    console.log(
      `Mint 5 nft gas cost: ${ethers.utils.formatUnits(mintFive.gasUsed, 0)}`
    );
  });
});
