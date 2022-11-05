// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

//contract: 0x9E3eCeA5e1F131BBe8E952F763724bCbA93CE377
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url:process.env.GOERLI_API,
      accounts:[process.env.PRIVATE_KEY]
    }
  },
  etherscan:{
    apiKey:process.env.ETHER_KEY
  }
};
