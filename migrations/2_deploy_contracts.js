const UsersStore = artifacts.require("UsersStore");
const StudentsStore = artifacts.require("StudentsStore");
const TokenStore = artifacts.require("TokenStore");
  
  module.exports = function(deployer) {
    deployer.deploy(TokenStore, "TokenName", "TOK", 2, 1000000).then(function() {
      return deployer.deploy(UsersStore);
    }).then(function() {
      return deployer.deploy(StudentsStore, UsersStore.address, TokenStore.address);
    });
  };
  
