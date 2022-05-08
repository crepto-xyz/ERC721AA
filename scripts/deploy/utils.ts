import { ethers, upgrades } from "hardhat";
import { ethers as tsEthers } from "ethers";
import { getLedgerSigner } from "../utils";

export const deployContract = async (
  contractName: string,
  constructorArguments: any[],
  signer?: tsEthers.Signer,
  waitCount = 1
) => {
  signer = signer ?? (await getSignerForDeployer());
  const Contract = (await ethers.getContractFactory(contractName)).connect(
    signer
  );
  const contract = await Contract.deploy(...constructorArguments);
  await contract.deployTransaction.wait(waitCount);
  return contract;
};

/**
 * Returns a contract address given a contract name within an address config object.
 * @param key The contract name.
 * @param configForNetwork The config object holding contract addresses.
 */
export const getContractAddressFromConfigKey = (
  key: string,
  configForNetwork
) => {
  if (key?.length === 42) return key;
  const searchInObject = (object) => {
    const keys = Object.keys(object);
    if (!keys.includes(key)) return null;
    return object[key];
  };
  const rootResult = searchInObject(configForNetwork);
  if (rootResult != null) return rootResult;
  // Search in inner config objects, i.e. thirdPartyContracts.
  for (const key in configForNetwork) {
    const object = configForNetwork[key];
    if (typeof object !== "object" || object == null) continue;
    const result = searchInObject(object);
    if (result != null) return result;
  }
  return null;
};

export const deployProxy = async (
  contractName,
  constructorArguments,
  signer?: tsEthers.Signer,
  waitCount = 1
) => {
  signer = signer ?? (await getSignerForDeployer());
  const Contract = (await ethers.getContractFactory(contractName)).connect(
    signer
  );
  const contract = await upgrades.deployProxy(Contract, constructorArguments, {
    kind: "uups"
  });
  await contract.deployTransaction.wait(waitCount);
  return contract;
};

export const upgradeProxy = async (
  contractName,
  currentAddress,
  signer?: tsEthers.Signer,
  waitCount = 1
) => {
  signer = signer ?? (await getSignerForDeployer());
  const Contract = (await ethers.getContractFactory(contractName)).connect(
    signer
  );
  const contract = await upgrades.upgradeProxy(currentAddress, Contract);
  await contract.deployTransaction.wait(waitCount);
  return contract;
};

/**
 * Returns the signer derivation index to use during deployment.
 * The index is to be passed with a `signer=` process argument
 * to this script. e.g. deploy.ts signer=15 will use the 16th
 * (as it is zero-indexed) key via the derivation path.
 */
export const getSignerIndex = () => {
  const prefix = "signer=";
  for (let arg of process.argv) {
    arg = arg.toLowerCase();
    if (!arg.startsWith(prefix)) continue;
    const i = parseInt(arg.substring(prefix.length, arg.length));
    if (!i) return 0;
    return i;
  }
  return 0;
};

/**
 * Fetches the correct signer object to use with deployment.
 * Either a private key or mnemonic set via environment variables
 * or hardhat configuration, or a ledger signer if the process
 * was invoked with the `ledger` argument.
 */
export const getSignerForDeployer = async (): Promise<tsEthers.Signer> => {
  let deployer: tsEthers.Signer;
  const deployerIndex = getSignerIndex();
  if (process.argv.includes("ledger")) {
    deployer = getLedgerSigner(deployerIndex, ethers.provider);
  } else {
    const deployers = await ethers.getSigners();
    deployer = deployers[deployerIndex];
    if (!deployer)
      throw new Error(`Could not fetch signer for index ${deployerIndex}`);
  }
  return deployer;
};
