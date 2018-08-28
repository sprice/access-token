require('dotenv').config();
const _ = require("lodash");
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

const networks = ["rinkeby", "kovan", "ropsten", "mainnet"];

const infuraNetworks = _.fromPairs(_.compact(networks.map((network) => {

  if(process.env.PRIVATE_KEY) {
    var privateKey = new Buffer(process.env.PRIVATE_KEY, "hex")
    var wallet = Wallet.fromPrivateKey(privateKey);
    var provider = new WalletProvider(wallet, `https://${network}.infura.io/${process.env.INFURA_API_KEY}`);

    return [
      network,
      {
        provider,
        network_id: "*",
        gasPrice: 20000000000
        
      }
    ];
  }
})));

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    ...infuraNetworks,
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
