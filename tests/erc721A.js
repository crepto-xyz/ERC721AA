const { ethers } = require("hardhat");
const { expect } = require("chai");

let erc721a;
let deployer;
let user;

describe("ERC721A NFT", () => {
  before(async () => {
    [deployer, user] = await ethers.getSigners();
    erc721a = await (await ethers.getContractFactory("TestERC721A")).deploy();
  });

  it("Should get contract address after deploy", async () => {
    expect(erc721a.address).not.equal("");
  });

  it("Should console log gas cost if mint 1/2/3/4/5", async () => {
    const mintOne = await (await erc721a.mintTest(1)).wait();
    console.log(
      `Mint 1 nft gas cost: ${ethers.utils.formatUnits(mintOne.gasUsed, 0)}`
    );

    const mintTwo = await (await erc721a.mintTest(2)).wait();
    console.log(
      `Mint 2 nft gas cost: ${ethers.utils.formatUnits(mintTwo.gasUsed, 0)}`
    );

    const mintThree = await (await erc721a.mintTest(3)).wait();
    console.log(
      `Mint 3 nft gas cost: ${ethers.utils.formatUnits(mintThree.gasUsed, 0)}`
    );

    const mintFour = await (await erc721a.mintTest(4)).wait();
    console.log(
      `Mint 4 nft gas cost: ${ethers.utils.formatUnits(mintFour.gasUsed, 0)}`
    );

    const mintFive = await (await erc721a.mintTest(5)).wait();
    console.log(
      `Mint 5 nft gas cost: ${ethers.utils.formatUnits(mintFive.gasUsed, 0)}`
    );
  });
});
