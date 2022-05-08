import { task } from "hardhat/config";
import contracts from "../../contracts.json";
import { ethers as tsEthers } from "ethers";
import { getLedgerSigner } from "../utils";

task("read-balance")
  .addParam("address")
  .setAction(async (args, hre) => {
    const contractAddress = contracts[hre.network.name].token;
    console.log(`network is ${hre.network.name}`);
    console.log(`token address is ${contractAddress}`);
    const token = (await hre.ethers.getContractFactory("Token")).attach(
      contractAddress
    );
    const balance = await token.balanceOf(args.address);
    console.log(
      `balance is ${balance.toString()} wei for address ${args.address}`
    );
  });

task("mint")
  .addParam("address")
  .addParam("amount")
  .addOptionalParam("ledgersigner")
  .setAction(async (args, hre) => {
    let signer: tsEthers.Signer;
    if (!args.ledgersigner) {
      signer = (await hre.ethers.getSigners())[0];
    } else {
      signer = getLedgerSigner(args.ledgersigner, hre.ethers.provider);
    }
    const contractAddress = contracts[hre.network.name].token;
    console.log(`network is ${hre.network.name}`);
    console.log(`token address is ${contractAddress}`);
    const token = (await hre.ethers.getContractFactory("Token"))
      .attach(contractAddress)
      .connect(signer);
    const decimals = await token.decimals();
    // Mint with the correct decimals.
    const mintAmount = hre.ethers.utils.parseUnits(args.amount, decimals);
    const receipt = await token.mint(args.address, mintAmount);
    console.log("waiting for confirmation...");
    await receipt.wait(1);
    console.log(`minted ${args.amount} for address ${args.address}`);
  });
