const UsersStore = artifacts.require("UsersStore");
const StudentsStore = artifacts.require("StudentsStore");

module.exports = function(deployer) {
  deployer.deploy(UsersStore).then(function() {
    return deployer.deploy(StudentsStore, UsersStore.address);
  });
}