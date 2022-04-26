require('dotenv').config();
 require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-etherscan");
 
 const {ETHERSCAN_API_KEY, ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY } = process.env;
 
 module.exports = {
    solidity: "0.8.13",
    defaultNetwork: "rinkeby",
    networks: {
     hardhat: {},
     rinkeby: {
       url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
       accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
     }
   },
   etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
 }