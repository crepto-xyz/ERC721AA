import fs from "fs";
import path from "path";
import rlp from "rlp";
import keccak from "keccak";
const configPath = path.resolve(__dirname, "../contracts.json");
import { ethers } from "ethers";
import { LedgerSigner } from "@ethersproject/hardware-wallets";

export const getContractAddressFromNonce = async (
  signer,
  nonce
): Promise<string> => {
  const rlpEncoded = rlp.encode([signer.address.toString(), nonce]);
  const longContractAddress = keccak("keccak256")
    .update(rlpEncoded)
    .digest("hex");
  return longContractAddress.substring(24);
};

export const updateContractConfig = (network, newConfig): boolean => {
  const config = JSON.parse(fs.readFileSync(configPath).toString());
  config[network] = newConfig;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  return true;
};

const getDerivationPathForIndex = (i: number) => `44'/60'/0'/0/${i}`;

export const getLedgerSigner = (index: number, provider: any): LedgerSigner => {
  const signer = new LedgerSigner(
    provider,
    null,
    getDerivationPathForIndex(index)
  );
  // Fix signing for EIP-1559 while ethers.js isn't fixed.
  signer.signTransaction = ledgerSignTransaction;
  return signer;
};

/*
 * Fixes LedgerSigner for EIP1559 while ethers.js isn't fixed.
 * The package.json also uses "resolutions" to upgrade the ledger
 * dependencies to the correct version.
 */
export async function ledgerSignTransaction(
  transaction: ethers.providers.TransactionRequest
): Promise<string> {
  const tx = await ethers.utils.resolveProperties(transaction);
  const baseTx: ethers.utils.UnsignedTransaction = {
    chainId: tx.chainId || undefined,
    data: tx.data || undefined,
    gasLimit: tx.gasLimit || undefined,
    gasPrice: tx.gasPrice || undefined,
    nonce: tx.nonce ? ethers.BigNumber.from(tx.nonce).toNumber() : undefined,
    to: tx.to || undefined,
    value: tx.value || undefined
  };

  // The following three properties are not added to the baseTx above
  // like the other properties only because this results in failure on
  // the hardhat local network.
  if (tx.maxFeePerGas) baseTx.maxFeePerGas = tx.maxFeePerGas;
  if (tx.maxPriorityFeePerGas)
    baseTx.maxPriorityFeePerGas = tx.maxPriorityFeePerGas;
  if (tx.type) baseTx.type = tx.type;

  const unsignedTx = ethers.utils.serializeTransaction(baseTx).substring(2);
  // @ts-ignore
  const sig = await this._retry((eth) =>
    // @ts-ignore
    eth.signTransaction(this.path, unsignedTx)
  );

  return ethers.utils.serializeTransaction(baseTx, {
    v: ethers.BigNumber.from("0x" + sig.v).toNumber(),
    r: "0x" + sig.r,
    s: "0x" + sig.s
  });
}

export const getGasPriceFromEnv = (): ethers.BigNumber => {
  const gasPrice = ethers.BigNumber.from(
    process.env.DEPLOY_GAS_PRICE_WEI.toString()
  );
  if (!ethers.BigNumber.isBigNumber(gasPrice))
    throw new Error("Could not fetch gas price from DEPLOY_GAS_PRICE_WEI env");
  return gasPrice;
};
