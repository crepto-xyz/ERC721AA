import { ethers } from "hardhat";
import { ethers as tsEthers } from "ethers";
import { expect } from "chai";
import { isAddress } from "ethers/lib/utils";
import { ContractERC721A, ContractERC721A__factory } from "../build/typechain";

let erc721A: ContractERC721A;
let deployer: tsEthers.Signer;
let user: tsEthers.Signer;

describe("ERC721A NFT", () => {
  before(async () => {
    [deployer, user] = await ethers.getSigners();
    erc721A = await new ContractERC721A__factory(deployer).deploy(
      "ERC721A",
      "nftA"
    );
  });

  it("should deploy", async () => {
    const address = erc721A.address;
    const verifyAddress = isAddress(address);
    expect(verifyAddress === true);
  });

  it("Should mint tokens,and get totalSupply", async () => {
    const userAddress = await user.getAddress();
    await erc721A.safeMint(userAddress, 5);

    // User balance
    const balance = await erc721A.balanceOf(userAddress);
    expect(balance).to.equal(5);
  });

  it("Should get total supply and total minted", async () => {
    // Total supply
    const totalSupply = await erc721A.totalSupply();
    expect(totalSupply).to.equal(5);

    //Check total minted
    const total = await erc721A.totalMinted();
    expect(total === ethers.utils.parseEther("5"));
  });

  it("Should get nft exists", async () => {
    //Check token exists
    const nftExists = await erc721A.exists(1);
    expect(nftExists === true);
  });
});
