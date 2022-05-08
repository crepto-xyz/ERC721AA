import { task } from "hardhat/config";
import { getGasPriceFromEnv, getLedgerSigner } from "../utils";

task("transfer-eth")
  .addParam("address")
  .addParam("amount")
  .addOptionalParam("ledgersigner")
  .setAction(async (args, hre) => {
    let signer;
    if (!args.ledgersigner) {
      signer = (await hre.ethers.getSigners())[0];
    } else {
      signer = getLedgerSigner(args.ledgersigner, hre.ethers.provider);
    }
    console.log(
      `transferring ${args.amount} ETH to ${
        args.address
      } from ${await signer.getAddress()}`
    );
    const amount = hre.ethers.utils.parseEther(args.amount);
    const tx = await signer.sendTransaction({
      to: args.address,
      value: amount,
      gasPrice: getGasPriceFromEnv()
    });
    console.log("waiting for confirmation...");
    await tx.wait(1);
  });
