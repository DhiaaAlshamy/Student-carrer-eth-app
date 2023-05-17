const StudentsStore = artifacts.require("StudentsStore");
const UsersStore = artifacts.require("UsersStore");

module.exports = function(deployer) {
  deployer.deploy(StudentsStore);
  deployer.deploy(UsersStore);
};