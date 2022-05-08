import { ethers } from "hardhat";
import { ethers as tsEthers } from "ethers";
import { expect } from "chai";
import { isAddress } from "ethers/lib/utils";
import {
  ContractERC721AA,
  ContractERC721AA__factory,
} from "../build/typechain";

let erc721AA: ContractERC721AA;
let deployer: tsEthers.Signer;
let user: tsEthers.Signer;

describe("ERC721AA NFT", () => {
  before(async () => {
    [deployer, user] = await ethers.getSigners();
    erc721AA = await new ContractERC721AA__factory(deployer).deploy(
      "ERC721AA",
      "nftAA"
    );
  });

  it("should deploy", async () => {
    const address = erc721AA.address;
    const verifyAddress = isAddress(address);
    expect(verifyAddress === true);
  });

  it("Should mint tokens,and get totalSupply", async () => {
    const userAddress = await user.getAddress();
    await erc721AA.safeMint(userAddress, 5);

    // User balance
    const balance = await erc721AA.balanceOf(userAddress);
    expect(balance).to.equal(5);
  });

  it("Should get total supply and total minted", async () => {
    // Total supply
    const totalSupply = await erc721AA.totalSupply();
    expect(totalSupply).to.equal(5);
  });

  it("Should get nft exists", async () => {
    //Check token exists
    const nftExists = await erc721AA.exists(1);
    expect(nftExists === true);
  });
});
