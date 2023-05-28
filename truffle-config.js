const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "front-end/src/contracts"),
  compilers: {
    solc: {
      version: "0.8.0"
    }
  },
    networks: {
      development: {
        url: "HTTP://192.168.0.242:7345",
        network_id: "5777", // specify the network ID here
        Accounts: [
          {
            balance: "100000000000000000000", // 100 ETH
            privateKey: "0xd0d02ac2e1b73c676554ce40ca0ee687a584a82ff2f862dd970e5e67d4e6c959",
            address: "0x973F5f57FA0cac05672309909F42d97558eAb883",
          },
          {
            balance: "100000000000000000000", // 100 ETH
            privateKey: "0x0a316e54e49d78c0d4d24deadbd14086ea4ac749ce4ce645a28eebe009e1ed2e",
            address: "0xe479d8d39BbB25a22bD7cdA6630d593Bae8dbCca",
          },
          {
            balance: "100000000000000000000", // 100 ETH
            privateKey: "0x077b3f45ddc0ae74cd63b01e918ee5a2618eefbb9905cba96926749247683e8c",
            address: "0x5F1F0276455A7eD41AfA1c048957c3a0b068A060",
          },
          {
            balance: "100000000000000000000", // 100 ETH
            privateKey: "0xdef7b187fc9c52e5fceba9d96af2f353bc8450b0fec950354c02366c2472588d",
            address: "0xb7Ad8342D9A1F190d3898bC775BdC21218E5B793",
          },
          {
            balance: "100000000000000000000", // 100 ETH
            privateKey: "0xac9e417ffb165036751027049d9a9ad76a165de291d8d0458eb552442c330e97",
            address: "0x067f193c1f8cC8d7a8Da659cfA4719B05adcE060",
          },
        ],
      }
    }
  };
