require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },

    ropsten: {
      provider: () => new HDWalletProvider(process.env.REACT_APP_SECRET_WORDS, process.env.REACT_APP_INFURA_ROPSTEN_NODE),
      network_id: 3,
      gas: 3000000,
      gasPrice: 10000000000
    }
  }
};